import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = Number(process.env.PORT || 3000);
const dataDir = path.join(__dirname, "data");
const ordersFile = path.join(dataDir, "orders.json");
const usersFile = path.join(dataDir, "users.json");
const keysFile = path.join(dataDir, "keys.json");
const promocodesFile = path.join(dataDir, "promocodes.json");
const USER_GROUP = "Пользователь";
const ADMIN_GROUP = "Админ";
const UNBOUND_HWID = "Не привязан";
const sessions = new Map();

const products = [
  {
    id: "month",
    name: "Месяц",
    description: "Базовый пакет со всеми основными возможностями клиента.",
    price: 199,
  },
  {
    id: "year",
    name: "Год",
    description: "Лучший тариф для активного использования в течение года.",
    price: 449,
  },
  {
    id: "lifetime",
    name: "Навсегда",
    description: "Пожизненный доступ с приоритетной очередью и обновлениями.",
    price: 599,
  },
  {
    id: "hwid-reset",
    name: "Сброс HWID",
    description: "Единоразовый сброс привязки оборудования.",
    price: 149,
  },
];

const defaultActivationKeys = [
  {
    key: "STLR-MONTH-2026",
    productId: "month",
    title: "Stellar Месяц",
    durationDays: 30,
    usedBy: null,
    usedAt: null,
  },
  {
    key: "STLR-YEAR-2026",
    productId: "year",
    title: "Stellar Год",
    durationDays: 365,
    usedBy: null,
    usedAt: null,
  },
  {
    key: "STLR-LIFETIME-2026",
    productId: "lifetime",
    title: "Stellar Навсегда",
    durationDays: null,
    usedBy: null,
    usedAt: null,
  },
];

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

await mkdir(dataDir, { recursive: true });
if (!existsSync(ordersFile)) {
  await writeFile(ordersFile, "[]\n", "utf8");
}
if (!existsSync(usersFile)) {
  await writeFile(
    usersFile,
    `${JSON.stringify(
      [
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
      ],
      null,
      2,
    )}\n`,
    "utf8",
  );
}
if (!existsSync(keysFile)) {
  await writeFile(keysFile, `${JSON.stringify(defaultActivationKeys, null, 2)}\n`, "utf8");
}
if (!existsSync(promocodesFile)) {
  await writeFile(promocodesFile, "[]\n", "utf8");
}

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

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) {
        request.destroy();
        reject(new Error("Payload too large"));
      }
    });

    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}

async function appendOrder(order) {
  const orders = await readJsonFile(ordersFile);
  orders.push(order);
  await writeFile(ordersFile, `${JSON.stringify(orders, null, 2)}\n`, "utf8");
}

async function readJsonFile(filePath) {
  return JSON.parse((await readFile(filePath, "utf8")).replace(/^\uFEFF/, ""));
}

async function readUsers() {
  return readJsonFile(usersFile);
}

async function writeUsers(users) {
  await writeFile(usersFile, `${JSON.stringify(users, null, 2)}\n`, "utf8");
}

async function readKeys() {
  return readJsonFile(keysFile);
}

async function writeKeys(keys) {
  await writeFile(keysFile, `${JSON.stringify(keys, null, 2)}\n`, "utf8");
}

async function readPromocodes() {
  return readJsonFile(promocodesFile);
}

async function writePromocodes(promocodes) {
  await writeFile(promocodesFile, `${JSON.stringify(promocodes, null, 2)}\n`, "utf8");
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
  if (["admin", "админ", "администратор", "administrator", "owner"].includes(String(user?.group || "").trim().toLowerCase())) {
    return true;
  }
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
  if (promo.code !== code) {
    promo.code = code;
    changed = true;
  }
  if (!promo.title) {
    promo.title = code || "PROMO";
    changed = true;
  }
  const discountPercent = parsePercent(promo.discountPercent, 1);
  if (promo.discountPercent !== discountPercent) {
    promo.discountPercent = discountPercent;
    changed = true;
  }
  const maxActivations = parseActivationLimit(promo.maxActivations, 1);
  if (promo.maxActivations !== maxActivations) {
    promo.maxActivations = maxActivations;
    changed = true;
  }
  if (!Array.isArray(promo.activations)) {
    promo.activations = [];
    changed = true;
  }
  if (!("expiresAt" in promo)) {
    promo.expiresAt = null;
    changed = true;
  }
  return changed;
}

function normalizePromocodes(promocodes) {
  let changed = false;
  promocodes.forEach((promo) => {
    if (normalizePromocode(promo)) changed = true;
  });
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

  if (!Array.isArray(key.activations)) {
    key.activations = [];
    changed = true;
  }

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
  if (legacyUser && !normalizedActivations.some((activation) => activation.username.toLowerCase() === legacyUser.toLowerCase())) {
    normalizedActivations.push({
      username: legacyUser,
      activatedAt: key.usedAt || key.createdAt || new Date().toISOString(),
    });
  }

  if (JSON.stringify(normalizedActivations) !== JSON.stringify(key.activations)) {
    key.activations = normalizedActivations;
    changed = true;
  }

  const nextLimit = Math.max(parseActivationLimit(key.maxActivations, 1), key.activations.length || 0, 1);
  if (key.maxActivations !== nextLimit) {
    key.maxActivations = nextLimit;
    changed = true;
  }

  const firstActivation = key.activations[0] || null;
  if (key.usedBy !== (firstActivation?.username || null)) {
    key.usedBy = firstActivation?.username || null;
    changed = true;
  }
  if (key.usedAt !== (firstActivation?.activatedAt || null)) {
    key.usedAt = firstActivation?.activatedAt || null;
    changed = true;
  }

  return changed;
}

function normalizeKeys(keys) {
  let changed = false;
  keys.forEach((key) => {
    if (normalizeKey(key)) changed = true;
  });
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

  return {
    productId: key.productId,
    title: key.title,
    activatedAt,
    expiresAt,
  };
}

function buildSubscriptionFromProduct(productId, durationDays, activatedAt, title) {
  const normalizedDuration = durationDays === null || durationDays === undefined ? null : Number(durationDays);
  const expiresAt = Number.isFinite(normalizedDuration)
    ? new Date(new Date(activatedAt).getTime() + normalizedDuration * 24 * 60 * 60 * 1000).toISOString()
    : null;

  return {
    productId,
    title: title || productTitle(productId),
    activatedAt,
    expiresAt,
  };
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
  if (!user.name) {
    user.name = user.username;
    changed = true;
  }
  if (!user.email) {
    user.email = `${user.username}@stellar.local`;
    changed = true;
  }
  if (!user.group) {
    user.group = USER_GROUP;
    changed = true;
  }
  if (!user.createdAt) {
    user.createdAt = new Date().toISOString();
    changed = true;
  }
  if (!user.hwid) {
    user.hwid = UNBOUND_HWID;
    changed = true;
  }
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
  if (typeof user.banned !== "boolean") {
    user.banned = false;
    changed = true;
  }
  if (typeof user.banReason !== "string") {
    user.banReason = "";
    changed = true;
  }
  if (typeof user.avatar !== "string") {
    user.avatar = "";
    changed = true;
  }
  if (!("subscription" in user)) {
    user.subscription = null;
    changed = true;
  }
  return changed;
}

async function migrateData() {
  const users = await readUsers();
  let usersChanged = false;
  users.forEach((user, index) => {
    if (normalizeUser(user, users, index)) usersChanged = true;
  });
  if (usersChanged) {
    await writeUsers(users);
  }

  const keys = await readKeys();
  if (normalizeKeys(keys)) {
    await writeKeys(keys);
  }

  const promocodes = await readPromocodes();
  if (normalizePromocodes(promocodes)) {
    await writePromocodes(promocodes);
  }
}

function createSession(user) {
  const token = crypto.randomBytes(24).toString("hex");
  sessions.set(token, {
    username: user.username,
    createdAt: new Date().toISOString(),
  });
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

await migrateData();

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  try {
    if (request.method === "GET" && url.pathname === "/api/v1/health") {
      sendJson(response, 200, { ok: true, service: "stellar-site", time: new Date().toISOString() });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/web/store/products") {
      sendJson(response, 200, products);
      return;
    }

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

    if (request.method === "POST" && url.pathname === "/api/v1/account/activate-key") {
      const body = await parseBody(request);
      const username = String(body.username || "").trim();
      const activationKey = String(body.key || "").trim().toUpperCase();

      if (!username || !activationKey) {
        sendJson(response, 400, { message: "Введите ключ активации" });
        return;
      }

      const users = await readUsers();
      const userIndex = users.findIndex((item) => item.username.toLowerCase() === username.toLowerCase());
      const user = userIndex === -1 ? null : users[userIndex];

      if (!user) {
        sendJson(response, 404, { message: "Пользователь не найден" });
        return;
      }

      if (user.banned) {
        sendJson(response, 403, { message: user.banReason || "Аккаунт заблокирован" });
        return;
      }

      const keys = await readKeys();
      const keysChanged = normalizeKeys(keys);
      const key = keys.find((item) => String(item.key || "").trim().toUpperCase() === activationKey);

      if (!key) {
        if (keysChanged) await writeKeys(keys);
        sendJson(response, 404, { message: "Ключ не найден" });
        return;
      }

      const usernameLower = user.username.toLowerCase();
      if (key.activations.some((activation) => String(activation.username || "").toLowerCase() === usernameLower)) {
        if (keysChanged) await writeKeys(keys);
        sendJson(response, 409, { message: "Этот аккаунт уже активировал ключ" });
        return;
      }

      if (key.activations.length >= key.maxActivations) {
        if (keysChanged) await writeKeys(keys);
        sendJson(response, 409, { message: "Лимит активаций ключа исчерпан" });
        return;
      }

      const activatedAt = new Date().toISOString();
      key.activations.push({ username: user.username, activatedAt });
      key.usedBy = key.activations[0]?.username || user.username;
      key.usedAt = key.activations[0]?.activatedAt || activatedAt;
      key.updatedAt = activatedAt;
      user.subscription = buildSubscription(key, activatedAt);
      normalizeUser(user, users, userIndex);

      await writeKeys(keys);
      await writeUsers(users);

      const orders = await readJsonFile(ordersFile);
      sendJson(response, 200, {
        ok: true,
        user: publicUser(user),
        orders: orders.filter((order) => String(order.contact || "").toLowerCase() === user.username.toLowerCase()).slice(-8).reverse(),
      });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/v1/account/change-password") {
      const body = await parseBody(request);
      const username = String(body.username || "").trim();
      const currentPassword = String(body.currentPassword || "");
      const nextPassword = String(body.nextPassword || "");
      const users = await readUsers();
      const userIndex = users.findIndex((item) => item.username.toLowerCase() === username.toLowerCase());
      const user = userIndex === -1 ? null : users[userIndex];

      if (!user || user.passwordHash !== hashPassword(currentPassword)) {
        sendJson(response, 401, { message: "Текущий пароль указан неверно" });
        return;
      }

      if (user.banned) {
        sendJson(response, 403, { message: user.banReason || "Аккаунт заблокирован" });
        return;
      }

      if (nextPassword.length < 4) {
        sendJson(response, 400, { message: "Новый пароль должен быть не короче 4 символов" });
        return;
      }

      user.passwordHash = hashPassword(nextPassword);
      normalizeUser(user, users, userIndex);
      await writeUsers(users);
      sendJson(response, 200, { ok: true, user: publicUser(user) });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/v1/account/avatar") {
      const body = await parseBody(request);
      const username = String(body.username || "").trim();
      const avatar = String(body.avatar || "").trim();
      const token = getBearerToken(request);
      const session = sessions.get(token);

      if (session && String(session.username || "").toLowerCase() !== username.toLowerCase()) {
        sendJson(response, 401, { message: "Требуется авторизация" });
        return;
      }

      const users = await readUsers();
      const userIndex = users.findIndex((item) => item.username.toLowerCase() === username.toLowerCase());
      const user = userIndex === -1 ? null : users[userIndex];

      if (!user) {
        sendJson(response, 404, { message: "Пользователь не найден" });
        return;
      }

      if (user.banned) {
        sendJson(response, 403, { message: user.banReason || "Аккаунт заблокирован" });
        return;
      }

      if (avatar && !isValidAvatarData(avatar)) {
        sendJson(response, 400, { message: "Некорректная аватарка" });
        return;
      }

      user.avatar = avatar;
      user.updatedAt = new Date().toISOString();
      normalizeUser(user, users, userIndex);
      await writeUsers(users);
      sendJson(response, 200, { ok: true, user: publicUser(user) });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/admin/overview") {
      const context = await requireAdmin(request, response);
      if (!context) return;

      let usersChanged = false;
      context.users.forEach((user, index) => {
        if (normalizeUser(user, context.users, index)) usersChanged = true;
      });
      if (usersChanged) {
        await writeUsers(context.users);
      }

      const orders = await readJsonFile(ordersFile);
      const keys = await readKeys();
      if (normalizeKeys(keys)) {
        await writeKeys(keys);
      }
      const promocodes = await readPromocodes();
      if (normalizePromocodes(promocodes)) {
        await writePromocodes(promocodes);
      }
      sendJson(response, 200, {
        ok: true,
        admin: publicUser(context.user),
        products,
        users: context.users.map((user) => adminUser(user, orders)),
        keys: keys.slice(-100).reverse(),
        promocodes: promocodes.slice(-100).reverse(),
      });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/v1/admin/keys") {
      const context = await requireAdmin(request, response);
      if (!context) return;

      const body = await parseBody(request);
      const productId = String(body.productId || "").trim();
      const product = products.find((item) => item.id === productId);

      if (!product) {
        sendJson(response, 400, { message: "Продукт не найден" });
        return;
      }

      const requestedAmount = Number(body.amount || 1);
      const amount = Number.isFinite(requestedAmount) ? Math.min(Math.max(Math.round(requestedAmount), 1), 50) : 1;
      const durationDays = parseDurationDays(body.durationDays, productDurationDays(productId));
      const maxActivations = parseActivationLimit(body.maxActivations, 1);
      const title = String(body.title || "").trim() || product.name;
      const keys = await readKeys();
      normalizeKeys(keys);
      const createdAt = new Date().toISOString();
      const generated = [];

      for (let index = 0; index < amount; index += 1) {
        const key = {
          key: createActivationKey(productId, keys.concat(generated)),
          productId,
          title,
          durationDays,
          maxActivations,
          activations: [],
          usedBy: null,
          usedAt: null,
          createdBy: context.user.username,
          createdAt,
        };
        generated.push(key);
      }

      keys.push(...generated);
      await writeKeys(keys);
      sendJson(response, 201, { ok: true, keys: generated });
      return;
    }

    if (request.method === "PATCH" && url.pathname === "/api/v1/admin/keys") {
      const context = await requireAdmin(request, response);
      if (!context) return;

      const body = await parseBody(request);
      const keyValue = String(body.key || "").trim().toUpperCase();
      const productId = String(body.productId || "").trim();
      const product = products.find((item) => item.id === productId);

      if (!keyValue) {
        sendJson(response, 400, { message: "Ключ не указан" });
        return;
      }

      if (!product) {
        sendJson(response, 400, { message: "Продукт не найден" });
        return;
      }

      const keys = await readKeys();
      normalizeKeys(keys);
      const target = keys.find((item) => String(item.key || "").trim().toUpperCase() === keyValue);

      if (!target) {
        sendJson(response, 404, { message: "Ключ не найден" });
        return;
      }

      const maxActivations = parseActivationLimit(body.maxActivations, target.maxActivations || 1);
      if (maxActivations < target.activations.length) {
        sendJson(response, 400, { message: "Лимит меньше уже использованных активаций" });
        return;
      }

      target.productId = productId;
      target.title = String(body.title || "").trim() || product.name;
      target.durationDays = parseDurationDays(body.durationDays, productDurationDays(productId));
      target.maxActivations = maxActivations;
      target.updatedBy = context.user.username;
      target.updatedAt = new Date().toISOString();
      normalizeKey(target);

      await writeKeys(keys);
      sendJson(response, 200, { ok: true, key: target });
      return;
    }

    if (request.method === "DELETE" && url.pathname === "/api/v1/admin/keys") {
      const context = await requireAdmin(request, response);
      if (!context) return;

      const body = await parseBody(request);
      const keyValue = String(body.key || "").trim().toUpperCase();

      if (!keyValue) {
        sendJson(response, 400, { message: "Ключ не указан" });
        return;
      }

      const keys = await readKeys();
      normalizeKeys(keys);
      const keyIndex = keys.findIndex((item) => String(item.key || "").trim().toUpperCase() === keyValue);

      if (keyIndex === -1) {
        sendJson(response, 404, { message: "Ключ не найден" });
        return;
      }

      keys.splice(keyIndex, 1);
      await writeKeys(keys);
      sendJson(response, 200, { ok: true, deleted: true });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/v1/admin/promocodes") {
      const context = await requireAdmin(request, response);
      if (!context) return;

      const body = await parseBody(request);
      const code = normalizePromoCode(body.code || crypto.randomBytes(4).toString("hex"));
      const title = String(body.title || "").trim() || code;
      const discountPercent = parsePercent(body.discountPercent, 10);
      const maxActivations = parseActivationLimit(body.maxActivations, 1);
      const expiresAt = parseFutureDate(body.expiresAt);

      if (!code || code.length < 3) {
        sendJson(response, 400, { message: "Некорректный промокод" });
        return;
      }

      const promocodes = await readPromocodes();
      normalizePromocodes(promocodes);
      if (promocodes.some((promo) => promo.code === code)) {
        sendJson(response, 409, { message: "Такой промокод уже существует" });
        return;
      }

      const promo = {
        id: crypto.randomUUID(),
        code,
        title,
        discountPercent,
        maxActivations,
        activations: [],
        expiresAt,
        createdBy: context.user.username,
        createdAt: new Date().toISOString(),
      };
      promocodes.push(promo);
      await writePromocodes(promocodes);
      sendJson(response, 201, { ok: true, promo });
      return;
    }

    if (request.method === "DELETE" && url.pathname === "/api/v1/admin/promocodes") {
      const context = await requireAdmin(request, response);
      if (!context) return;

      const body = await parseBody(request);
      const code = normalizePromoCode(body.code);
      const promocodes = await readPromocodes();
      normalizePromocodes(promocodes);
      const index = promocodes.findIndex((promo) => promo.code === code);

      if (index === -1) {
        sendJson(response, 404, { message: "Промокод не найден" });
        return;
      }

      promocodes.splice(index, 1);
      await writePromocodes(promocodes);
      sendJson(response, 200, { ok: true, deleted: true });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/v1/admin/users/action") {
      const context = await requireAdmin(request, response);
      if (!context) return;

      const body = await parseBody(request);
      const action = String(body.action || "").trim();
      const targetId = String(body.targetUserId || body.username || "").trim();
      const targetIndex = context.users.findIndex(
        (item) => item.id === targetId || item.username.toLowerCase() === targetId.toLowerCase(),
      );

      if (targetIndex === -1) {
        sendJson(response, 404, { message: "Пользователь не найден" });
        return;
      }

      const target = context.users[targetIndex];
      if (target.id === context.user.id && ["ban", "delete-account"].includes(action)) {
        sendJson(response, 400, { message: "Нельзя заблокировать или удалить текущий admin-аккаунт" });
        return;
      }

      normalizeUser(target, context.users, targetIndex);
      const value = String(body.value || "").trim();
      let temporaryPassword = null;

      if (action === "issue-subscription") {
        const productId = String(body.productId || "").trim();
        const product = products.find((item) => item.id === productId);
        if (!product) {
          sendJson(response, 400, { message: "Продукт не найден" });
          return;
        }

        const durationDays = parseDurationDays(body.durationDays, productDurationDays(productId));
        target.subscription = buildSubscriptionFromProduct(productId, durationDays, new Date().toISOString(), value || product.name);
      } else if (action === "revoke-subscription") {
        target.subscription = null;
      } else if (action === "ban") {
        target.banned = true;
        target.banReason = value || "Аккаунт заблокирован администратором";
        dropSessionsForUsername(target.username, context.token);
      } else if (action === "unban") {
        target.banned = false;
        target.banReason = "";
      } else if (action === "reset-hwid") {
        target.hwid = UNBOUND_HWID;
      } else if (action === "set-uid") {
        const nextUid = value ? normalizeUid(value) : createUniqueUid(context.users, target);
        if (!isValidUid(nextUid)) {
          sendJson(response, 400, { message: "Некорректный UID. Используйте 4-32 символа: A-Z, 0-9, _ или -" });
          return;
        }
        if (context.users.some((item, index) => index !== targetIndex && normalizeUid(item.uid) === nextUid)) {
          sendJson(response, 409, { message: "Такой UID уже выдан другому пользователю" });
          return;
        }
        target.uid = nextUid;
      } else if (action === "reset-password") {
        temporaryPassword = value || crypto.randomBytes(5).toString("hex");
        target.passwordHash = hashPassword(temporaryPassword);
        dropSessionsForUsername(target.username, context.token);
      } else if (action === "reset-email") {
        const nextEmail = value || `${target.username}@stellar.local`;
        if (!isValidEmail(nextEmail)) {
          sendJson(response, 400, { message: "Некорректная почта" });
          return;
        }
        if (
          context.users.some(
            (item, index) => index !== targetIndex && String(item.email || "").toLowerCase() === nextEmail.toLowerCase(),
          )
        ) {
          sendJson(response, 409, { message: "Такая почта уже занята" });
          return;
        }
        target.email = nextEmail;
      } else if (action === "set-group") {
        target.group = value || USER_GROUP;
      } else if (action === "delete-account") {
        dropSessionsForUsername(target.username, context.token);
        context.users.splice(targetIndex, 1);
        await writeUsers(context.users);
        sendJson(response, 200, { ok: true, deleted: true });
        return;
      } else {
        sendJson(response, 400, { message: "Неизвестное действие" });
        return;
      }

      target.updatedAt = new Date().toISOString();
      normalizeUser(target, context.users, targetIndex);
      await writeUsers(context.users);

      const orders = await readJsonFile(ordersFile);
      sendJson(response, 200, {
        ok: true,
        user: adminUser(target, orders),
        temporaryPassword,
      });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/v1/orders") {
      const body = await parseBody(request);
      const product = products.find((item) => item.id === body.productId);
      const paymentProvider = normalizePaymentProvider(body.paymentProvider);
      const receiptEmail = String(body.receiptEmail || "").trim().toLowerCase();
      const rawPromoCode = String(body.promoCode || "").trim();
      const promoCode = normalizePromoCode(rawPromoCode);

      if (!product || typeof body.contact !== "string" || body.contact.trim().length < 3) {
        sendJson(response, 400, { message: "Некорректная заявка" });
        return;
      }

      if (!paymentProvider) {
        sendJson(response, 400, { message: "Выберите способ оплаты" });
        return;
      }

      if (!isValidEmail(receiptEmail)) {
        sendJson(response, 400, { message: "Введите корректную почту для чека" });
        return;
      }

      if (rawPromoCode && !promoCode) {
        sendJson(response, 400, { message: "Некорректный промокод" });
        return;
      }

      const token = getBearerToken(request);
      const session = sessions.get(token);

      const users = await readUsers();
      const sessionUsername = String(session?.username || body.contact || "").trim();
      const userIndex = users.findIndex((item) => item.username.toLowerCase() === sessionUsername.toLowerCase());
      const user = userIndex === -1 ? null : users[userIndex];

      if (!user) {
        if (session) sessions.delete(token);
        sendJson(response, 401, { message: "Сессия недействительна" });
        return;
      }

      if (user.banned) {
        if (session) sessions.delete(token);
        sendJson(response, 403, { message: user.banReason || "Аккаунт заблокирован" });
        return;
      }

      normalizeUser(user, users, userIndex);
      let promocodes = null;
      let promo = null;
      let discountPercent = 0;

      if (promoCode) {
        promocodes = await readPromocodes();
        const promocodesChanged = normalizePromocodes(promocodes);
        promo = promocodes.find((item) => item.code === promoCode) || null;

        if (!promo) {
          if (promocodesChanged) await writePromocodes(promocodes);
          sendJson(response, 404, { message: "Промокод не найден" });
          return;
        }

        if (!isPromocodeActive(promo)) {
          if (promocodesChanged) await writePromocodes(promocodes);
          sendJson(response, 409, { message: "Промокод недоступен" });
          return;
        }

        discountPercent = promo.discountPercent;
      }

      // ⚠️ ВАЖНО: заказ всегда создаётся со статусом "pending_payment"
      const orderStatus = "pending_payment";
      const totalPrice = Math.max(Math.round(product.price * (100 - discountPercent)) / 100, 0);
      const order = {
        id: crypto.randomUUID(),
        productId: product.id,
        productName: product.name,
        price: product.price,
        totalPrice,
        paymentProvider,
        receiptEmail,
        promoCode: promoCode || "",
        promo: {
          code: promoCode || "",
          title: promo?.title || "",
          discountPercent,
          applied: Boolean(promo),
        },
        contact: user.username,
        createdAt: new Date().toISOString(),
        status: orderStatus,
      };
      if (promo) {
        promo.activations.push({
          orderId: order.id,
          username: user.username,
          receiptEmail,
          usedAt: order.createdAt,
        });
        promo.updatedAt = order.createdAt;
      }

      // ⚠️ ВАЖНО: подписка НЕ выдаётся при создании заказа!
      // Подписка будет выдана только когда админ вручную изменит статус заказа
      // через админ-панель (нужно добавить функционал подтверждения оплаты)

      user.updatedAt = order.createdAt;
      normalizeUser(user, users, userIndex);
      await writeUsers(users);
      await appendOrder(order);
      if (promocodes) {
        await writePromocodes(promocodes);
      }
      sendJson(response, 201, { ...order, user: publicUser(user) });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/v1/orders") {
      const orders = await readJsonFile(ordersFile);
      sendJson(response, 200, orders);
      return;
    }

    if (request.method !== "GET") {
      sendJson(response, 405, { message: "Method not allowed" });
      return;
    }

    await serveStatic(request, response, url.pathname);
  } catch (error) {
    sendJson(response, 500, { message: error.message || "Internal server error" });
  }
});

server.listen(port, () => {
  console.log(`Stellar site is running at http://localhost:${port}`);
});