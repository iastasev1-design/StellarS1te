import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import pkg from 'pg';
const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = Number(process.env.PORT || 3000);

// ========== ПОДКЛЮЧЕНИЕ К POSTGRESQL ==========
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// ========== ДАННЫЕ ==========
const USER_GROUP = "Пользователь";
const ADMIN_GROUP = "Админ";
const UNBOUND_HWID = "Не привязан";
const sessions = new Map();

const products = [
  { id: "month", name: "Месяц", description: "Базовый пакет со всеми основными возможностями клиента.", price: 199 },
  { id: "year", name: "Год", description: "Лучший тариф для активного использования в течение года.", price: 449 },
  { id: "lifetime", name: "Навсегда", description: "Пожизненный доступ с приоритетной очередью и обновлениями.", price: 599 },
  { id: "hwid-reset", name: "Сброс HWID", description: "Единоразовый сброс привязки оборудования.", price: 149 },
];

const defaultActivationKeys = [
  { key: "STLR-MONTH-2026", productId: "month", title: "Stellar Месяц", durationDays: 30, usedBy: null, usedAt: null },
  { key: "STLR-YEAR-2026", productId: "year", title: "Stellar Год", durationDays: 365, usedBy: null, usedAt: null },
  { key: "STLR-LIFETIME-2026", productId: "lifetime", title: "Stellar Навсегда", durationDays: null, usedBy: null, usedAt: null },
];

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
function hashPassword(password) {
  return crypto.createHash("sha256").update(String(password)).digest("hex");
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => { body += chunk; if (body.length > 2_000_000) { request.destroy(); reject(new Error("Payload too large")); } });
    request.on("end", () => { try { resolve(body ? JSON.parse(body) : {}); } catch { reject(new Error("Invalid JSON")); } });
  });
}

async function dbQuery(text, params) {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (err) {
    console.error('DB Query Error:', err.message);
    throw err;
  }
}

// ========== ФУНКЦИИ РАБОТЫ С ПОЛЬЗОВАТЕЛЯМИ ==========
async function readUsers() {
  const result = await dbQuery('SELECT * FROM users ORDER BY username');
  return result.rows;
}

async function writeUsers(users) {
  for (const user of users) {
    await dbQuery(
      `INSERT INTO users (id, username, passwordHash, name, email, "group", "createdAt", hwid, uid, banned, banReason, subscription, avatar, "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       ON CONFLICT (id) DO UPDATE SET
         username = EXCLUDED.username,
         passwordHash = EXCLUDED.passwordHash,
         name = EXCLUDED.name,
         email = EXCLUDED.email,
         "group" = EXCLUDED."group",
         "createdAt" = EXCLUDED."createdAt",
         hwid = EXCLUDED.hwid,
         uid = EXCLUDED.uid,
         banned = EXCLUDED.banned,
         banReason = EXCLUDED.banReason,
         subscription = EXCLUDED.subscription,
         avatar = EXCLUDED.avatar,
         "updatedAt" = EXCLUDED."updatedAt"`,
      [user.id, user.username, user.passwordHash, user.name, user.email, user.group, user.createdAt, user.hwid, user.uid, user.banned, user.banReason, user.subscription, user.avatar, user.updatedAt]
    );
  }
}

async function readKeys() {
  const result = await dbQuery('SELECT * FROM keys ORDER BY "createdAt" DESC');
  return result.rows;
}

async function writeKeys(keys) {
  for (const key of keys) {
    await dbQuery(
      `INSERT INTO keys (key, productId, title, durationDays, maxActivations, activations, usedBy, usedAt, createdBy, "createdAt", updatedBy, "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       ON CONFLICT (key) DO UPDATE SET
         productId = EXCLUDED.productId,
         title = EXCLUDED.title,
         durationDays = EXCLUDED.durationDays,
         maxActivations = EXCLUDED.maxActivations,
         activations = EXCLUDED.activations,
         usedBy = EXCLUDED.usedBy,
         usedAt = EXCLUDED.usedAt,
         createdBy = EXCLUDED.createdBy,
         "createdAt" = EXCLUDED."createdAt",
         updatedBy = EXCLUDED.updatedBy,
         "updatedAt" = EXCLUDED."updatedAt"`,
      [key.key, key.productId, key.title, key.durationDays, key.maxActivations, key.activations || [], key.usedBy, key.usedAt, key.createdBy, key.createdAt, key.updatedBy, key.updatedAt]
    );
  }
}

async function readPromocodes() {
  const result = await dbQuery('SELECT * FROM promocodes ORDER BY "createdAt" DESC');
  return result.rows;
}

async function writePromocodes(promocodes) {
  for (const promo of promocodes) {
    await dbQuery(
      `INSERT INTO promocodes (id, code, title, discountPercent, maxActivations, activations, expiresAt, createdBy, "createdAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (id) DO UPDATE SET
         code = EXCLUDED.code,
         title = EXCLUDED.title,
         discountPercent = EXCLUDED.discountPercent,
         maxActivations = EXCLUDED.maxActivations,
         activations = EXCLUDED.activations,
         expiresAt = EXCLUDED.expiresAt,
         createdBy = EXCLUDED.createdBy,
         "createdAt" = EXCLUDED."createdAt"`,
      [promo.id, promo.code, promo.title, promo.discountPercent, promo.maxActivations, promo.activations || [], promo.expiresAt, promo.createdBy, promo.createdAt]
    );
  }
}

async function appendOrder(order) {
  await dbQuery(
    `INSERT INTO orders (id, productId, productName, price, totalPrice, paymentProvider, receiptEmail, promoCode, promo, contact, "createdAt", status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    [order.id, order.productId, order.productName, order.price, order.totalPrice, order.paymentProvider, order.receiptEmail, order.promoCode, order.promo, order.contact, order.createdAt, order.status]
  );
}

async function readJsonFile(filePath) {
  return JSON.parse((await readFile(filePath, "utf8")).replace(/^\uFEFF/, ""));
}

function createUid() {
  return `STLR-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
}

function normalizeUid(value) {
  return String(value || "").trim().toUpperCase();
}

function isValidUid(value) {
  return /^[A-Z0-9][A-Z0-9_-]{3,31}$/.test(normalizeUid(value));
}

function createUniqueUid(users = [], currentUser = null) {
  let uid = "";
  do {
    uid = createUid();
  } while (
    users.some((user) => user !== currentUser && normalizeUid(user.uid) === uid)
  );
  return uid;
}

function createActivationKey(productId, existingKeys) {
  const prefix = String(productId || "KEY")
    .replace(/[^a-z0-9]/gi, "")
    .slice(0, 10)
    .toUpperCase() || "KEY";

  let key = "";
  do {
    key = `STLR-${prefix}-${crypto.randomBytes(5).toString("hex").toUpperCase()}`;
  } while (existingKeys.some((item) => String(item.key || "").toUpperCase() === key));

  return key;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+$/i.test(String(email || "").trim());
}

function isAdminUser(user) {
  if (String(user?.group || "").trim() === ADMIN_GROUP) return true;
  const normalizedGroup = String(user?.group || "").trim().toLowerCase();
  if (["админ", "администратор"].includes(normalizedGroup)) return true;
  return false;
}

function productDurationDays(productId) {
  if (productId === "month") return 30;
  if (productId === "year") return 365;
  if (productId === "lifetime") return null;
  return null;
}

function normalizePaymentProvider(value) {
  const provider = String(value || "").trim().toLowerCase();
  return provider === "funpay" ? provider : "";
}

function normalizePromoCode(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_-]/g, "")
    .slice(0, 32);
}

function parsePercent(value, fallback = 0) {
  const percent = Number(value);
  if (!Number.isFinite(percent)) return fallback;
  return Math.min(Math.max(Math.round(percent), 1), 100);
}

function parseFutureDate(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function normalizePromocode(promo) {
  let changed = false;
  const code = normalizePromoCode(promo.code);
  if (promo.code !== code) { promo.code = code; changed = true; }
  if (!promo.title) { promo.title = code || "PROMO"; changed = true; }
  const discountPercent = parsePercent(promo.discountPercent, 1);
  if (promo.discountPercent !== discountPercent) { promo.discountPercent = discountPercent; changed = true; }
  const maxActivations = parseActivationLimit(promo.maxActivations, 1);
  if (promo.maxActivations !== maxActivations) { promo.maxActivations = maxActivations; changed = true; }
  if (!Array.isArray(promo.activations)) { promo.activations = []; changed = true; }
  if (!("expiresAt" in promo)) { promo.expiresAt = null; changed = true; }
  return changed;
}

function normalizePromocodes(promocodes) {
  let changed = false;
  promocodes.forEach((promo) => { if (normalizePromocode(promo)) changed = true; });
  return changed;
}

function isPromocodeActive(promo, now = new Date()) {
  if (!promo?.code) return false;
  if (promo.expiresAt && new Date(promo.expiresAt).getTime() <= now.getTime()) return false;
  return promo.activations.length < promo.maxActivations;
}

function isValidAvatarData(value) {
  return /^data:image\/(?:png|jpeg|jpg|webp|gif);base64,[a-z0-9+/=]+$/i.test(String(value || "")) && String(value || "").length <= 1_100_000;
}

function parseDurationDays(value, fallback = null) {
  if (value === undefined || value === null || value === "") return fallback;
  const normalized = String(value).trim().toLowerCase();
  if (!normalized || normalized === "default") return fallback;
  if (["forever", "lifetime", "null", "0", "навсегда"].includes(normalized)) return null;
  const days = Number(normalized);
  if (!Number.isFinite(days) || days < 0) return fallback;
  return Math.round(days);
}

function parseActivationLimit(value, fallback = 1) {
  if (value === undefined || value === null || value === "") return fallback;
  const limit = Number(value);
  if (!Number.isFinite(limit)) return fallback;
  return Math.min(Math.max(Math.round(limit), 1), 10000);
}

function normalizeKey(key) {
  let changed = false;
  if (!Array.isArray(key.activations)) { key.activations = []; changed = true; }

  const normalizedActivations = [];
  for (const activation of key.activations) {
    const username = String(activation?.username || activation?.usedBy || "").trim();
    if (!username) continue;
    normalizedActivations.push({
      username,
      activatedAt: activation?.activatedAt || activation?.usedAt || key.usedAt || key.createdAt || new Date().toISOString(),
    });
  }

  const legacyUser = String(key.usedBy || "").trim();
  if (legacyUser && !normalizedActivations.some((a) => a.username.toLowerCase() === legacyUser.toLowerCase())) {
    normalizedActivations.push({ username: legacyUser, activatedAt: key.usedAt || key.createdAt || new Date().toISOString() });
  }

  if (JSON.stringify(normalizedActivations) !== JSON.stringify(key.activations)) {
    key.activations = normalizedActivations;
    changed = true;
  }

  const nextLimit = Math.max(parseActivationLimit(key.maxActivations, 1), key.activations.length || 0, 1);
  if (key.maxActivations !== nextLimit) { key.maxActivations = nextLimit; changed = true; }

  const firstActivation = key.activations[0] || null;
  if (key.usedBy !== (firstActivation?.username || null)) { key.usedBy = firstActivation?.username || null; changed = true; }
  if (key.usedAt !== (firstActivation?.activatedAt || null)) { key.usedAt = firstActivation?.activatedAt || null; changed = true; }

  return changed;
}

function normalizeKeys(keys) {
  let changed = false;
  keys.forEach((key) => { if (normalizeKey(key)) changed = true; });
  return changed;
}

function productTitle(productId) {
  const product = products.find((item) => item.id === productId);
  return product?.name || productId;
}

function buildSubscription(key, activatedAt) {
  const durationDays = key.durationDays === null || key.durationDays === undefined ? null : Number(key.durationDays);
  const expiresAt = Number.isFinite(durationDays)
    ? new Date(new Date(activatedAt).getTime() + durationDays * 24 * 60 * 60 * 1000).toISOString()
    : null;

  return { productId: key.productId, title: key.title, activatedAt, expiresAt };
}

function buildSubscriptionFromProduct(productId, durationDays, activatedAt, title) {
  const normalizedDuration = durationDays === null || durationDays === undefined ? null : Number(durationDays);
  const expiresAt = Number.isFinite(normalizedDuration)
    ? new Date(new Date(activatedAt).getTime() + normalizedDuration * 24 * 60 * 60 * 1000).toISOString()
    : null;

  return { productId, title: title || productTitle(productId), activatedAt, expiresAt };
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name || user.username,
    username: user.username,
    email: user.email || `${user.username}@stellar.local`,
    group: user.group || USER_GROUP,
    createdAt: user.createdAt || new Date().toISOString(),
    hwid: user.hwid || UNBOUND_HWID,
    uid: user.uid || null,
    avatar: typeof user.avatar === "string" ? user.avatar : "",
    banned: Boolean(user.banned),
    banReason: user.banReason || "",
    subscription: user.subscription || null,
  };
}

function adminUser(user, orders) {
  const userOrders = orders.filter((order) => String(order.contact || "").toLowerCase() === String(user.username || "").toLowerCase());
  const normalized = publicUser(user);

  return {
    ...normalized,
    orderCount: userOrders.length,
    lastOrderAt: userOrders.at(-1)?.createdAt || null,
    orders: userOrders.slice(-5).reverse(),
  };
}

function normalizeUser(user, users = [], currentIndex = -1) {
  let changed = false;
  const currentUser = currentIndex >= 0 ? users[currentIndex] : user;
  if (!user.name) { user.name = user.username; changed = true; }
  if (!user.email) { user.email = `${user.username}@stellar.local`; changed = true; }
  if (!user.group) { user.group = USER_GROUP; changed = true; }
  if (!user.createdAt) { user.createdAt = new Date().toISOString(); changed = true; }
  if (!user.hwid) { user.hwid = UNBOUND_HWID; changed = true; }
  
  const normalizedUid = normalizeUid(user.uid);
  const uidTaken = normalizedUid
    ? users.some((item, index) => index !== currentIndex && item !== user && normalizeUid(item.uid) === normalizedUid)
    : false;
  if (!normalizedUid || !isValidUid(normalizedUid) || uidTaken) {
    user.uid = createUniqueUid(users, currentUser);
    changed = true;
  } else if (user.uid !== normalizedUid) {
    user.uid = normalizedUid;
    changed = true;
  }
  if (typeof user.banned !== "boolean") { user.banned = false; changed = true; }
  if (typeof user.banReason !== "string") { user.banReason = ""; changed = true; }
  if (typeof user.avatar !== "string") { user.avatar = ""; changed = true; }
  if (!("subscription" in user)) { user.subscription = null; changed = true; }
  
  return changed;
}

function createSession(user) {
  const token = crypto.randomBytes(24).toString("hex");
  sessions.set(token, { username: user.username, createdAt: new Date().toISOString() });
  return token;
}

function getBearerToken(request) {
  const authorization = String(request.headers.authorization || "");
  if (authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.slice(7).trim();
  }
  return "";
}

function dropSessionsForUsername(username, keepToken = "") {
  const normalized = String(username || "").toLowerCase();
  for (const [token, session] of sessions.entries()) {
    if (token !== keepToken && String(session.username || "").toLowerCase() === normalized) {
      sessions.delete(token);
    }
  }
}

async function requireAdmin(request, response) {
  const token = getBearerToken(request);
  const session = sessions.get(token);

  if (!session) {
    sendJson(response, 401, { message: "Требуется авторизация" });
    return null;
  }

  const users = await readUsers();
  const userIndex = users.findIndex((item) => item.username.toLowerCase() === String(session.username || "").toLowerCase());
  const user = userIndex === -1 ? null : users[userIndex];

  if (!user) {
    sessions.delete(token);
    sendJson(response, 401, { message: "Сессия недействительна" });
    return null;
  }

  const changed = normalizeUser(user, users, userIndex);
  if (user.banned) {
    sessions.delete(token);
    if (changed) await writeUsers(users);
    sendJson(response, 403, { message: "Аккаунт заблокирован" });
    return null;
  }

  if (!isAdminUser(user)) {
    if (changed) await writeUsers(users);
    sendJson(response, 403, { message: "Недостаточно прав" });
    return null;
  }

  if (changed) {
    await writeUsers(users);
  }

  return { token, user, users };
}

async function serveStatic(request, response, pathname) {
  const normalizedPath = pathname === "/" ? "/fronted.html" : pathname;
  const filePath = path.normalize(path.join(__dirname, normalizedPath));
  const relativePath = path.relative(__dirname, filePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    sendJson(response, 403, { message: "Forbidden" });
    return;
  }

  try {
    const content = await readFile(filePath);
    const ext = path.extname(filePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(content);
  } catch {
    if (path.extname(normalizedPath)) {
      sendJson(response, 404, { message: "Not found" });
      return;
    }

    const fallback = await readFile(path.join(__dirname, "fronted.html"));
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
    response.end(fallback);
  }
}

// ========== ИНИЦИАЛИЗАЦИЯ: СОЗДАНИЕ ТАБЛИЦ И ДЕФОЛТНЫХ ДАННЫХ ==========
async function initializeDatabase() {
  try {
    console.log('🔄 Creating tables...');
    
    // Создаём таблицу users
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        passwordHash TEXT NOT NULL,
        name TEXT,
        email TEXT,
        "group" TEXT DEFAULT 'Пользователь',
        "createdAt" TIMESTAMP DEFAULT NOW(),
        hwid TEXT DEFAULT 'Не привязан',
        uid TEXT UNIQUE,
        banned BOOLEAN DEFAULT FALSE,
        banReason TEXT DEFAULT '',
        subscription JSONB,
        avatar TEXT,
        "updatedAt" TIMESTAMP
      )
    `);
    console.log('✅ Table "users" created');

    // Создаём таблицу keys
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS keys (
        key TEXT PRIMARY KEY,
        productId TEXT NOT NULL,
        title TEXT,
        durationDays INTEGER,
        maxActivations INTEGER DEFAULT 1,
        activations JSONB DEFAULT '[]',
        usedBy TEXT,
        usedAt TIMESTAMP,
        createdBy TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        updatedBy TEXT,
        "updatedAt" TIMESTAMP
      )
    `);
    console.log('✅ Table "keys" created');

    // Создаём таблицу orders
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        productId TEXT NOT NULL,
        productName TEXT,
        price INTEGER,
        totalPrice NUMERIC,
        paymentProvider TEXT,
        receiptEmail TEXT,
        promoCode TEXT,
        promo JSONB,
        contact TEXT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        status TEXT DEFAULT 'pending_payment'
      )
    `);
    console.log('✅ Table "orders" created');

    // Создаём таблицу promocodes
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS promocodes (
        id TEXT PRIMARY KEY,
        code TEXT UNIQUE NOT NULL,
        title TEXT,
        discountPercent INTEGER DEFAULT 10,
        maxActivations INTEGER DEFAULT 1,
        activations JSONB DEFAULT '[]',
        expiresAt TIMESTAMP,
        createdBy TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Table "promocodes" created');

    console.log('✅ All tables created successfully');

    // ========== ДОБАВЛЯЕМ ДЕФОЛТНЫХ ПОЛЬЗОВАТЕЛЕЙ ==========
    const users = await readUsers();
    if (users.length === 0) {
      const defaultUsers = [
        {
          id: "yanacujy",
          username: "yanacujy",
          passwordHash: hashPassword("Vfrcbvrf89022917901"),
          name: "yanacujy",
          email: "gua1mis6@mail.ru",
          group: ADMIN_GROUP,
          createdAt: new Date().toISOString(),
          hwid: UNBOUND_HWID,
          uid: createUid(),
          banned: false,
          banReason: "",
          subscription: null,
        },
        {
          id: "mef",
          username: "mef",
          passwordHash: hashPassword("wehaus"),
          name: "mef",
          email: "sserii627@gmail.com",
          group: ADMIN_GROUP,
          createdAt: new Date().toISOString(),
          hwid: UNBOUND_HWID,
          uid: createUid(),
          banned: false,
          banReason: "",
          subscription: null,
        },
      ];
      for (const user of defaultUsers) {
        await dbQuery(
          `INSERT INTO users (id, username, passwordHash, name, email, "group", "createdAt", hwid, uid, banned, banReason, subscription)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [user.id, user.username, user.passwordHash, user.name, user.email, user.group, user.createdAt, user.hwid, user.uid, user.banned, user.banReason, user.subscription]
        );
      }
      console.log('✅ Default users added');
    }

    // ========== ДОБАВЛЯЕМ ДЕФОЛТНЫЕ КЛЮЧИ ==========
    const keys = await readKeys();
    if (keys.length === 0) {
      for (const key of defaultActivationKeys) {
        await dbQuery(
          `INSERT INTO keys (key, productId, title, durationDays, maxActivations, activations, usedBy, usedAt, "createdAt")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [key.key, key.productId, key.title, key.durationDays, 1, [], key.usedBy, key.usedAt, new Date().toISOString()]
        );
      }
      console.log('✅ Default keys added');
    }

    console.log('✅ Database initialized successfully');
  } catch (err) {
    console.error('❌ Database initialization error:', err.message);
  }
}

// ========== ЗАПУСК ИНИЦИАЛИЗАЦИИ ==========
await initializeDatabase();

// ========== HTTP СЕРВЕР ==========
const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  // ========== CORS ==========
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (request.method === 'OPTIONS') {
    response.writeHead(200);
    response.end();
    return;
  }

  try {
    // ========== HEALTH CHECK ==========
    if (request.method === "GET" && url.pathname === "/api/v1/health") {
      sendJson(response, 200, { ok: true, service: "stellar-site", time: new Date().toISOString() });
      return;
    }

    // ========== PRODUCTS ==========
    if (request.method === "GET" && url.pathname === "/api/v1/web/store/products") {
      sendJson(response, 200, products);
      return;
    }

    // ========== LOGIN ==========
    if (request.method === "POST" && url.pathname === "/api/v1/auth/login") {
      const body = await parseBody(request);
      const users = await readUsers();
      const username = String(body.username || "").trim();
      const passwordHash = hashPassword(body.password || "");
      const userIndex = users.findIndex((item) => item.username.toLowerCase() === username.toLowerCase() && item.passwordHash === passwordHash);
      const user = userIndex === -1 ? null : users[userIndex];

      if (!user) {
        sendJson(response, 401, { message: "Неверный логин или пароль" });
        return;
      }

      if (normalizeUser(user, users, userIndex)) {
        await writeUsers(users);
      }

      if (user.banned) {
        sendJson(response, 403, { message: user.banReason || "Аккаунт заблокирован" });
        return;
      }

      sendJson(response, 200, {
        token: createSession(user),
        user: publicUser(user),
      });
      return;
    }

    // ========== REGISTER ==========
    if (request.method === "POST" && url.pathname === "/api/v1/auth/register") {
      const body = await parseBody(request);
      const username = String(body.username || "").trim();
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");

      if (!/^[a-zA-Z0-9_а-яА-ЯёЁ-]{3,24}$/.test(username)) {
        sendJson(response, 400, { message: "Логин должен быть от 3 до 24 символов" });
        return;
      }

      if (!isValidEmail(email)) {
        sendJson(response, 400, { message: "Введите корректную почту с @" });
        return;
      }

      if (password.length < 4) {
        sendJson(response, 400, { message: "Пароль должен быть не короче 4 символов" });
        return;
      }

      const users = await readUsers();
      if (users.some((item) => item.username.toLowerCase() === username.toLowerCase())) {
        sendJson(response, 409, { message: "Такой логин уже занят" });
        return;
      }
      if (users.some((item) => String(item.email || "").toLowerCase() === email)) {
        sendJson(response, 409, { message: "Такая почта уже занята" });
        return;
      }

      const user = {
        id: crypto.randomUUID(),
        username,
        passwordHash: hashPassword(password),
        name: username,
        email,
        group: USER_GROUP,
        createdAt: new Date().toISOString(),
        hwid: UNBOUND_HWID,
        uid: createUniqueUid(users),
        banned: false,
        banReason: "",
        subscription: null,
      };
      users.push(user);
      await writeUsers(users);

      sendJson(response, 201, {
        token: createSession(user),
        user: publicUser(user),
      });
      return;
    }

    // ========== GET ACCOUNT ==========
    if (request.method === "GET" && url.pathname === "/api/v1/account") {
      const username = String(url.searchParams.get("username") || "").trim();
      const users = await readUsers();
      const userIndex = users.findIndex((item) => item.username.toLowerCase() === username.toLowerCase());
      const user = userIndex === -1 ? null : users[userIndex];

      if (!user) {
        sendJson(response, 404, { message: "Пользователь не найден" });
        return;
      }

      if (normalizeUser(user, users, userIndex)) {
        await writeUsers(users);
      }

      const orders = await readJsonFile(ordersFile);
      sendJson(response, 200, {
        user: publicUser(user),
        orders: orders.filter((order) => String(order.contact || "").toLowerCase() === user.username.toLowerCase()).slice(-8).reverse(),
      });
      return;
    }

    // ========== CHECK BETA KEY ==========
    if (request.method === "POST" && url.pathname === "/api/v1/auth/check-beta-key") {
      const body = await parseBody(request);
      const key = String(body.key || "").trim().toUpperCase();
      
      if (!key) {
        sendJson(response, 200, { valid: false, message: "Ключ не указан" });
        return;
      }
      
      const keys = await readKeys();
      normalizeKeys(keys);
      const foundKey = keys.find((item) => String(item.key || "").trim().toUpperCase() === key);
      
      if (!foundKey) {
        sendJson(response, 200, { valid: false, message: "Ключ не найден" });
        return;
      }
      
      const activations = foundKey.activations || [];
      const maxActivations = foundKey.maxActivations || 1;
      if (activations.length >= maxActivations) {
        sendJson(response, 200, { valid: false, message: "Лимит активаций исчерпан" });
        return;
      }
      
      sendJson(response, 200, { 
        valid: true, 
        message: "Ключ действителен",
        productId: foundKey.productId,
        title: foundKey.title,
        durationDays: foundKey.durationDays
      });
      return;
    }

    // ========== SERVE STATIC ==========
    if (request.method !== "GET") {
      sendJson(response, 405, { message: "Method not allowed" });
      return;
    }

    await serveStatic(request, response, url.pathname);
  } catch (error) {
    console.error('Server error:', error);
    sendJson(response, 500, { message: error.message || "Internal server error" });
  }
});

server.listen(port, () => {
  console.log(`🚀 Stellar site is running at http://localhost:${port}`);
});