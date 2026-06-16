const modal = document.querySelector("#authModal");
const checkoutModal = document.querySelector("#checkoutModal");
const accountModal = document.querySelector("#accountModal");
const openLogin = document.querySelector("#openLogin");
const heroLogin = document.querySelector("#heroLogin");
const closeLogin = document.querySelector("#closeLogin");
const closeCheckout = document.querySelector("#closeCheckout");
const closeAccount = document.querySelector("#closeAccount");
const logoutAccount = document.querySelector("#logoutAccount");
const authForm = document.querySelector("#authForm");
const authTitle = document.querySelector("#authTitle");
const authSubmit = document.querySelector("#authSubmit");
const authStatus = document.querySelector("#authStatus");
const authTabs = document.querySelectorAll("[data-auth-mode]");
const confirmField = document.querySelector("#confirmField");
const emailField = document.querySelector("#emailField");
const langPicker = document.querySelector("#langPicker");
const langSwitch = document.querySelector("#langSwitch");
const langMenu = document.querySelector("#langMenu");
const langOptions = document.querySelectorAll("[data-lang]");
const currentLang = document.querySelector("#currentLang");
const productGrid = document.querySelector("#productGrid");
const checkoutForm = document.querySelector("#checkoutForm");
const checkoutTitle = document.querySelector("#checkoutTitle");
const checkoutDescription = document.querySelector("#checkoutDescription");
const checkoutKicker = document.querySelector("#checkoutKicker");
const checkoutProductLabel = document.querySelector("#checkoutProductLabel");
const checkoutProductName = document.querySelector("#checkoutProductName");
const checkoutPriceLabel = document.querySelector("#checkoutPriceLabel");
const checkoutPrice = document.querySelector("#checkoutPrice");
const checkoutFunPayText = document.querySelector("#checkoutFunPayText");
const checkoutYooKassaText = document.querySelector("#checkoutYooKassaText");
const checkoutEmailLabel = document.querySelector("#checkoutEmailLabel");
const checkoutPromoLabel = document.querySelector("#checkoutPromoLabel");
const checkoutStatus = document.querySelector("#checkoutStatus");
const checkoutSubmit = document.querySelector("#checkoutSubmit");
const accountPanel = document.querySelector(".account-panel");
const accountTitle = document.querySelector("#accountTitle");
const accountSubtitle = document.querySelector("#accountSubtitle");
const accountStandard = document.querySelector("#accountStandard");
const accountAvatar = document.querySelector("#accountAvatar");
const accountAvatarButton = document.querySelector("#accountAvatarButton");
const accountAvatarInput = document.querySelector("#accountAvatarInput");
const accountName = document.querySelector("#accountName");
const accountEmail = document.querySelector("#accountEmail");
const accountId = document.querySelector("#accountId");
const accountGroup = document.querySelector("#accountGroup");
const accountLogin = document.querySelector("#accountLogin");
const accountMail = document.querySelector("#accountMail");
const accountCreated = document.querySelector("#accountCreated");
const accountHwid = document.querySelector("#accountHwid");
const accountLauncher = document.querySelector("#accountLauncher");
const subscriptionTitle = document.querySelector("#subscriptionTitle");
const subscriptionMeta = document.querySelector("#subscriptionMeta");
const ordersList = document.querySelector("#ordersList");
const keyForm = document.querySelector("#keyForm");
const keyStatus = document.querySelector("#keyStatus");
const passwordForm = document.querySelector("#passwordForm");
const passwordStatus = document.querySelector("#passwordStatus");
const accountProductLinks = document.querySelectorAll("#accountToProducts, #accountFooterProducts");
const adminEntry = document.querySelector("#adminEntry");
const openAdminPanel = document.querySelector("#openAdminPanel");
const adminPanel = document.querySelector("#adminPanel");
const backToAccount = document.querySelector("#backToAccount");
const adminUserActionForm = document.querySelector("#adminUserActionForm");
const adminUserSelect = document.querySelector("#adminUserSelect");
const adminActionSelect = document.querySelector("#adminActionSelect");
const adminActionProduct = document.querySelector("#adminActionProduct");
const adminActionGroup = document.querySelector("#adminActionGroup");
const adminActionDuration = document.querySelector("#adminActionDuration");
const adminActionValue = document.querySelector("#adminActionValue");
const adminActionStatus = document.querySelector("#adminActionStatus");
const adminKeyGenerateForm = document.querySelector("#adminKeyGenerateForm");
const adminKeyProduct = document.querySelector("#adminKeyProduct");
const adminKeyStatus = document.querySelector("#adminKeyStatus");
const adminGeneratedKeys = document.querySelector("#adminGeneratedKeys");
const adminPromoForm = document.querySelector("#adminPromoForm");
const adminPromoStatus = document.querySelector("#adminPromoStatus");
const adminPromosList = document.querySelector("#adminPromosList");
const adminUsersList = document.querySelector("#adminUsersList");
const adminKeysList = document.querySelector("#adminKeysList");

document.body.appendChild(langMenu);

const dictionaries = {
  RU: {
    locale: "ru",
    title: "Stellar - выбор победителей",
    nav: { modules: "Модули", prices: "Цены", support: "Поддержка" },
    hero: {
      word1: "выбор",
      word2: "победителей",
      subtitle: "Мощный клиент для уверенной игры и стабильного результата на серверах Minecraft.",
    },
    modules: {
      title: "Мы предоставляем только<br />лучшие функции.",
      subtitle: "Постоянно растущий функционал с огромным количеством обходов",
      cards: {
        killaura: "Быстрая и стабильная работа в PvP сценариях.",
        spider: "Лучший из лучших, выполняет свою работу очень быстро и отлично.",
        speed: "Ускорение с настройками для разных игровых ситуаций.",
      },
    },
    products: {
      title: "Товары.",
      subtitle: "Выберите подходящий тариф.",
      buy: "Купить",
      pending: "Заявка...",
      done: "Готово",
      error: "Ошибка",
      items: {
        month: ["Месяц", "Базовый пакет со всеми основными возможностями клиента."],
        year: ["Год", "Лучший тариф для активного использования в течение года."],
        lifetime: ["Навсегда", "Пожизненный доступ с приоритетной очередью и обновлениями."],
        "hwid-reset": ["Сброс HWID", "Единоразовый сброс привязки оборудования."],
      },
    },
    auth: {
      login: "Войти",
      account: "Личный кабинет",
      register: "Регистрация",
      username: "Логин",
      email: "Почта",
      password: "Пароль",
      confirmPassword: "Повторите пароль",
      close: "Закрыть",
      create: "Зарегистрироваться",
    },
    messages: {
      checking: "Проверяем данные...",
      creating: "Создаем аккаунт...",
      passwordsMismatch: "Пароли не совпадают",
      loginError: "Неверный логин или пароль",
      loginFailed: "Ошибка входа",
      registered: "Аккаунт создан.",
      ready: "Готово, {name}.",
      registerRequired: "Зарегистрируйтесь, чтобы купить тариф.",
      usernameInvalid: "Логин должен быть от 3 до 24 символов",
      emailInvalid: "Введите корректную почту с @",
      emailTaken: "Такая почта уже занята",
      passwordInvalid: "Пароль должен быть не короче 4 символов",
      usernameTaken: "Такой логин уже занят",
    },
  },
  UA: {
    locale: "uk",
    title: "Stellar - вибір переможців",
    nav: { modules: "Модулі", prices: "Ціни", support: "Підтримка" },
    hero: {
      word1: "вибір",
      word2: "переможців",
      subtitle: "Потужний клієнт для впевненої гри та стабільного результату на серверах Minecraft.",
    },
    modules: {
      title: "Ми надаємо тільки<br />найкращі функції.",
      subtitle: "Постійно зростаючий функціонал з великою кількістю обходів",
      cards: {
        killaura: "Швидка та стабільна робота у PvP сценаріях.",
        spider: "Найкращий з найкращих, виконує свою роботу дуже швидко й відмінно.",
        speed: "Прискорення з налаштуваннями для різних ігрових ситуацій.",
      },
    },
    products: {
      title: "Товари.",
      subtitle: "Оберіть відповідний тариф.",
      buy: "Купити",
      pending: "Заявка...",
      done: "Готово",
      error: "Помилка",
      items: {
        month: ["Місяць", "Базовий пакет з усіма основними можливостями клієнта."],
        year: ["Рік", "Найкращий тариф для активного використання протягом року."],
        lifetime: ["Назавжди", "Довічний доступ з пріоритетною чергою та оновленнями."],
        "hwid-reset": ["Скидання HWID", "Одноразове скидання прив'язки обладнання."],
      },
    },
    auth: {
      login: "Увійти",
      account: "Особистий кабінет",
      register: "Реєстрація",
      username: "Логін",
      email: "Пошта",
      password: "Пароль",
      confirmPassword: "Повторіть пароль",
      close: "Закрити",
      create: "Зареєструватися",
    },
    messages: {
      checking: "Перевіряємо дані...",
      creating: "Створюємо акаунт...",
      passwordsMismatch: "Паролі не збігаються",
      loginError: "Неправильний логін або пароль",
      loginFailed: "Помилка входу",
      registered: "Акаунт створено.",
      ready: "Готово, {name}.",
      registerRequired: "Зареєструйтесь, щоб купити тариф.",
      usernameInvalid: "Логін має бути від 3 до 24 символів",
      emailInvalid: "Введіть коректну пошту з @",
      emailTaken: "Така пошта вже зайнята",
      passwordInvalid: "Пароль має бути не коротшим за 4 символи",
      usernameTaken: "Такий логін уже зайнятий",
    },
  },
  EN: {
    locale: "en",
    title: "Stellar - choice of winners",
    nav: { modules: "Modules", prices: "Prices", support: "Support" },
    hero: {
      word1: "choice",
      word2: "of winners",
      subtitle: "A powerful client for confident play and consistent results on Minecraft servers.",
    },
    modules: {
      title: "We provide only<br />the best features.",
      subtitle: "A constantly growing feature set with a large number of bypasses",
      cards: {
        killaura: "Fast and stable performance in PvP scenarios.",
        spider: "Best of the best, performs its job very quickly and cleanly.",
        speed: "Acceleration with settings for different game situations.",
      },
    },
    products: {
      title: "Products.",
      subtitle: "Choose the right plan.",
      buy: "Buy",
      pending: "Creating...",
      done: "Done",
      error: "Error",
      items: {
        month: ["Month", "Basic package with all core client features."],
        year: ["Year", "The best plan for active use throughout the year."],
        lifetime: ["Lifetime", "Lifetime access with priority queue and updates."],
        "hwid-reset": ["HWID Reset", "One-time hardware binding reset."],
      },
    },
    auth: {
      login: "Log in",
      account: "Account",
      register: "Register",
      username: "Username",
      email: "Email",
      password: "Password",
      confirmPassword: "Repeat password",
      close: "Close",
      create: "Create account",
    },
    messages: {
      checking: "Checking credentials...",
      creating: "Creating account...",
      passwordsMismatch: "Passwords do not match",
      loginError: "Invalid username or password",
      loginFailed: "Login failed",
      registered: "Account created.",
      ready: "Done, {name}.",
      registerRequired: "Register to buy this plan.",
      usernameInvalid: "Username must be 3 to 24 characters",
      emailInvalid: "Enter a valid email with @",
      emailTaken: "This email is already taken",
      passwordInvalid: "Password must be at least 4 characters",
      usernameTaken: "This username is already taken",
    },
  },
  PL: {
    locale: "pl",
    title: "Stellar - wybór zwycięzców",
    nav: { modules: "Moduły", prices: "Ceny", support: "Wsparcie" },
    hero: {
      word1: "wybór",
      word2: "zwycięzców",
      subtitle: "Potężny klient do pewnej gry i stabilnych wyników na serwerach Minecraft.",
    },
    modules: {
      title: "Dostarczamy tylko<br />najlepsze funkcje.",
      subtitle: "Stale rosnąca funkcjonalność z ogromną liczbą obejść",
      cards: {
        killaura: "Szybkie i stabilne działanie w scenariuszach PvP.",
        spider: "Najlepszy z najlepszych, działa bardzo szybko i świetnie.",
        speed: "Przyspieszenie z ustawieniami dla różnych sytuacji w grze.",
      },
    },
    products: {
      title: "Produkty.",
      subtitle: "Wybierz odpowiedni plan.",
      buy: "Kup",
      pending: "Tworzenie...",
      done: "Gotowe",
      error: "Błąd",
      items: {
        month: ["Miesiąc", "Podstawowy pakiet ze wszystkimi głównymi funkcjami klienta."],
        year: ["Rok", "Najlepszy plan do aktywnego używania przez cały rok."],
        lifetime: ["Na zawsze", "Dożywotni dostęp z priorytetową kolejką i aktualizacjami."],
        "hwid-reset": ["Reset HWID", "Jednorazowy reset przypisania sprzętu."],
      },
    },
    auth: {
      login: "Zaloguj",
      account: "Konto",
      register: "Rejestracja",
      username: "Login",
      email: "Email",
      password: "Hasło",
      confirmPassword: "Powtórz hasło",
      close: "Zamknij",
      create: "Zarejestruj się",
    },
    messages: {
      checking: "Sprawdzamy dane...",
      creating: "Tworzymy konto...",
      passwordsMismatch: "Hasła nie są zgodne",
      loginError: "Nieprawidłowy login lub hasło",
      loginFailed: "Błąd logowania",
      registered: "Konto utworzone.",
      ready: "Gotowe, {name}.",
      registerRequired: "Zarejestruj się, aby kupić ten plan.",
      usernameInvalid: "Login musi mieć od 3 do 24 znaków",
      emailInvalid: "Wpisz poprawny email z @",
      emailTaken: "Ten email jest już zajęty",
      passwordInvalid: "Hasło musi mieć co najmniej 4 znaki",
      usernameTaken: "Ten login jest już zajęty",
    },
  },
};

const interfaceDictionaries = {
  RU: {
    roles: { user: "Пользователь", admin: "Админ" },
    common: { yes: "Да", no: "Нет", until: "до", forever: "навсегда", active: "Активна" },
    accountText: {
      loading: "Загружаем данные...",
      noOrders: "Заказов пока нет.",
      noSubscription: "Нет активных подписок",
      choosePlan: "Выберите тариф в магазине.",
      activeUntil: "Активна до {date}",
      activateEmpty: "Введите ключ активации",
      activateChecking: "Проверяем ключ...",
      activateSuccess: "Ключ активирован.",
      activateNotFound: "Ключ не найден.",
      activateUsed: "Ключ уже использован.",
      activateError: "Не удалось активировать ключ.",
      passwordMismatch: "Новые пароли не совпадают",
      passwordShort: "Новый пароль должен быть не короче 4 символов",
      passwordSuccess: "Пароль изменён.",
      passwordError: "Не удалось сменить пароль",
    },
    adminText: {
      loading: "Загружаем admin-данные...",
      usersEmpty: "Пользователей пока нет.",
      keysEmpty: "Ключей пока нет.",
      actionDone: "Действие выполнено.",
      keyDone: "Ключи сгенерированы.",
      requestError: "Не удалось выполнить запрос.",
      keyDeleted: "Ключ удалён.",
      keySaved: "Ключ изменён.",
      newPassword: "Новый пароль",
      deleteKeyConfirm: "Удалить ключ {key}?",
    },
    checkout: {
      kicker: "Оформление покупки",
      description: "Выберите способ оплаты и укажите почту для чека.",
      product: "Товар",
      total: "К оплате",
      methodAria: "Способ оплаты",
      funpay: "Оплата через маркетплейс FunPay.",
      yookassa: "Банковская карта и электронные способы оплаты.",
      email: "Почта для чека",
      emailPlaceholder: "mail@example.com",
      promo: "Промокод",
      promoPlaceholder: "Если есть",
      submit: "Оформить заказ",
      opening: "Оформляем заказ...",
      success: "Заказ оформлен. Способ оплаты: {provider}. Чек будет отправлен на {email}.",
      emailInvalid: "Введите корректную почту для чека.",
      providerInvalid: "Выберите способ оплаты.",
      orderError: "Не удалось оформить заказ.",
      providers: { funpay: "FunPay", yookassa: "ЮKassa" },
      discount: "Скидка {percent}%",
      promoApplied: "Промокод применён",
      promoUnknown: "Промокод сохранён, скидка не применена",
      pendingPayment: "ожидает оплаты",
    },
    account: {
      title: "Личный кабинет",
      subtitle: "Управление аккаунтом, подпиской и заказами.",
      close: "Закрыть",
      activeSubscriptions: "Активные подписки",
      personalData: "Личные данные",
      id: "ID",
      group: "Группа",
      login: "Логин",
      email: "Почта",
      createdAt: "Дата регистрации",
      hwid: "HWID",
      uid: "UID",
      subscription: "Подписка",
      orders: "Заказы",
      ban: "Бан",
      noOrdersShort: "Нет заказов",
      noSubscriptionShort: "Нет подписки",
      uidNotIssued: "Не выдан",
      unboundHwid: "Не привязан",
      downloadLauncher: "Скачать лаунчер",
      logout: "Выйти",
      adminSectionTitle: "Администрирование",
      adminPanelTitle: "Админ-панель",
      adminPanelDescription: "Пользователи, подписки, баны, UID, HWID и ключи.",
      open: "Открыть",
      activationTitle: "Активация ключа",
      activationPlaceholder: "Введите ключ активации",
      activateButton: "Активировать ключ",
      passwordTitle: "Смена пароля",
      currentPassword: "Текущий пароль",
      nextPassword: "Новый пароль",
      repeatPassword: "Повторите пароль",
      changePassword: "Сменить пароль",
      recentOrders: "Последние заказы",
      footerTitle: "Готов убивать?",
      footerText: "Предоставляем лучшие решения для вашего комфорта.",
      productsButton: "Перейти к продуктам",
      banned: "Забанен",
      avatarChange: "Изменить аватар",
      avatarTooLarge: "Файл аватарки должен быть до 700 КБ.",
      avatarError: "Не удалось обновить аватар.",
    },
    admin: {
      title: "Админ-панель",
      subtitle: "Управление пользователями, подписками, банами и ключами.",
      panelSection: "Панель администратора",
      siteManagement: "Управление сайтом",
      panelDescription: "Выдача подписок, генерация ключей и обслуживание аккаунтов.",
      back: "Назад",
      userActionTitle: "Действие с пользователем",
      userLabel: "Пользователь",
      actionLabel: "Действие",
      productLabel: "Продукт",
      groupLabel: "Группа",
      durationPlaceholder: "Дней: пусто = срок продукта, 0 = навсегда",
      actionValuePlaceholder: "Значение / причина / новый пароль",
      run: "Выполнить",
      keyGenerationTitle: "Генерация ключей",
      amountPlaceholder: "Количество",
      maxActivationsPlaceholder: "Активаций на ключ",
      keyTitlePlaceholder: "Название ключа, необязательно",
      generate: "Сгенерировать",
      registeredUsers: "Зарегистрированные пользователи",
      recentKeys: "Последние ключи",
    },
    adminActions: {
      "issue-subscription": "Выдать подписку",
      "revoke-subscription": "Снять подписку",
      ban: "Забанить",
      unban: "Разбанить",
      "reset-hwid": "Сбросить HWID",
      "set-uid": "Выдать / сменить UID",
      "reset-password": "Сбросить пароль",
      "reset-email": "Сбросить почту",
      "set-group": "Изменить группу",
      "delete-account": "Удалить аккаунт",
    },
    adminPlaceholders: {
      subscriptionTitle: "Название подписки, необязательно",
      banReason: "Причина бана, необязательно",
      uid: "Новый UID, пусто = сгенерировать",
      password: "Новый пароль, пусто = сгенерировать",
      email: "Новая почта, пусто = username@stellar.local",
    },
    keys: {
      days: "{days} дн.",
      activations: "активации {used}/{max}",
      activationsWithUsers: "активации {used}/{max}: {users}",
      productAria: "Продукт для ключа",
      limitAria: "Лимит активаций",
      save: "Изменить",
      delete: "Удалить",
    },
    footer: {
      description: "Мощный клиент для уверенной игры и стабильного результата на серверах Minecraft.",
      product: "Продукт",
      buy: "Покупка",
      support: "Поддержка",
      legal: "Правовая информация",
      terms: "Условия пользования",
      privacy: "Политика конфиденциальности",
      copyright: "© 2026 - stellarmanage. Все права защищены.",
    },
  },
  UA: {
    roles: { user: "Користувач", admin: "Адмін" },
    common: { yes: "Так", no: "Ні", until: "до", forever: "назавжди", active: "Активна" },
    accountText: {
      loading: "Завантажуємо дані...",
      noOrders: "Замовлень поки немає.",
      noSubscription: "Немає активних підписок",
      choosePlan: "Оберіть тариф у магазині.",
      activeUntil: "Активна до {date}",
      activateEmpty: "Введіть ключ активації",
      activateChecking: "Перевіряємо ключ...",
      activateSuccess: "Ключ активовано.",
      activateNotFound: "Ключ не знайдено.",
      activateUsed: "Ключ уже використано.",
      activateError: "Не вдалося активувати ключ.",
      passwordMismatch: "Нові паролі не збігаються",
      passwordShort: "Новий пароль має бути не коротшим за 4 символи",
      passwordSuccess: "Пароль змінено.",
      passwordError: "Не вдалося змінити пароль",
    },
    adminText: {
      loading: "Завантажуємо admin-дані...",
      usersEmpty: "Користувачів поки немає.",
      keysEmpty: "Ключів поки немає.",
      actionDone: "Дію виконано.",
      keyDone: "Ключі згенеровано.",
      requestError: "Не вдалося виконати запит.",
      keyDeleted: "Ключ видалено.",
      keySaved: "Ключ змінено.",
      newPassword: "Новий пароль",
      deleteKeyConfirm: "Видалити ключ {key}?",
    },
    checkout: {
      kicker: "Оформлення покупки",
      description: "Оберіть спосіб оплати та вкажіть пошту для чека.",
      product: "Товар",
      total: "До сплати",
      methodAria: "Спосіб оплати",
      funpay: "Оплата через маркетплейс FunPay.",
      yookassa: "Банківська картка та електронні способи оплати.",
      email: "Пошта для чека",
      emailPlaceholder: "mail@example.com",
      promo: "Промокод",
      promoPlaceholder: "Якщо є",
      submit: "Оформити замовлення",
      opening: "Оформлюємо замовлення...",
      success: "Замовлення оформлено. Спосіб оплати: {provider}. Чек буде надіслано на {email}.",
      emailInvalid: "Введіть коректну пошту для чека.",
      providerInvalid: "Оберіть спосіб оплати.",
      orderError: "Не вдалося оформити замовлення.",
      providers: { funpay: "FunPay", yookassa: "ЮKassa" },
      discount: "Знижка {percent}%",
      promoApplied: "Промокод застосовано",
      promoUnknown: "Промокод збережено, знижку не застосовано",
      pendingPayment: "очікує оплати",
    },
    account: {
      title: "Особистий кабінет",
      subtitle: "Керування акаунтом, підпискою та замовленнями.",
      close: "Закрити",
      activeSubscriptions: "Активні підписки",
      personalData: "Особисті дані",
      id: "ID",
      group: "Група",
      login: "Логін",
      email: "Пошта",
      createdAt: "Дата реєстрації",
      hwid: "HWID",
      uid: "UID",
      subscription: "Підписка",
      orders: "Замовлення",
      ban: "Бан",
      noOrdersShort: "Немає замовлень",
      noSubscriptionShort: "Немає підписки",
      uidNotIssued: "Не видано",
      unboundHwid: "Не прив'язано",
      downloadLauncher: "Завантажити лаунчер",
      logout: "Вийти",
      adminSectionTitle: "Адміністрування",
      adminPanelTitle: "Адмін-панель",
      adminPanelDescription: "Користувачі, підписки, бани, UID, HWID і ключі.",
      open: "Відкрити",
      activationTitle: "Активація ключа",
      activationPlaceholder: "Введіть ключ активації",
      activateButton: "Активувати ключ",
      passwordTitle: "Зміна пароля",
      currentPassword: "Поточний пароль",
      nextPassword: "Новий пароль",
      repeatPassword: "Повторіть пароль",
      changePassword: "Змінити пароль",
      recentOrders: "Останні замовлення",
      footerTitle: "Готовий перемагати?",
      footerText: "Надаємо найкращі рішення для вашого комфорту.",
      productsButton: "Перейти до продуктів",
      banned: "Забанено",
      avatarChange: "Змінити аватар",
      avatarTooLarge: "Файл аватарки має бути до 700 КБ.",
      avatarError: "Не вдалося оновити аватар.",
    },
    admin: {
      title: "Адмін-панель",
      subtitle: "Керування користувачами, підписками, банами та ключами.",
      panelSection: "Панель адміністратора",
      siteManagement: "Керування сайтом",
      panelDescription: "Видача підписок, генерація ключів і обслуговування акаунтів.",
      back: "Назад",
      userActionTitle: "Дія з користувачем",
      userLabel: "Користувач",
      actionLabel: "Дія",
      productLabel: "Продукт",
      groupLabel: "Група",
      durationPlaceholder: "Днів: пусто = строк продукту, 0 = назавжди",
      actionValuePlaceholder: "Значення / причина / новий пароль",
      run: "Виконати",
      keyGenerationTitle: "Генерація ключів",
      amountPlaceholder: "Кількість",
      maxActivationsPlaceholder: "Активацій на ключ",
      keyTitlePlaceholder: "Назва ключа, необов'язково",
      generate: "Згенерувати",
      registeredUsers: "Зареєстровані користувачі",
      recentKeys: "Останні ключі",
    },
    adminActions: {
      "issue-subscription": "Видати підписку",
      "revoke-subscription": "Зняти підписку",
      ban: "Забанити",
      unban: "Розбанити",
      "reset-hwid": "Скинути HWID",
      "set-uid": "Видати / змінити UID",
      "reset-password": "Скинути пароль",
      "reset-email": "Скинути пошту",
      "set-group": "Змінити групу",
      "delete-account": "Видалити акаунт",
    },
    adminPlaceholders: {
      subscriptionTitle: "Назва підписки, необов'язково",
      banReason: "Причина бану, необов'язково",
      uid: "Новий UID, пусто = згенерувати",
      password: "Новий пароль, пусто = згенерувати",
      email: "Нова пошта, пусто = username@stellar.local",
    },
    keys: {
      days: "{days} дн.",
      activations: "активації {used}/{max}",
      activationsWithUsers: "активації {used}/{max}: {users}",
      productAria: "Продукт для ключа",
      limitAria: "Ліміт активацій",
      save: "Змінити",
      delete: "Видалити",
    },
    footer: {
      description: "Потужний клієнт для впевненої гри та стабільного результату на серверах Minecraft.",
      product: "Продукт",
      buy: "Покупка",
      support: "Підтримка",
      legal: "Правова інформація",
      terms: "Умови користування",
      privacy: "Політика конфіденційності",
      copyright: "© 2026 - stellarmanage. Усі права захищені.",
    },
  },
  EN: {
    roles: { user: "User", admin: "Admin" },
    common: { yes: "Yes", no: "No", until: "until", forever: "forever", active: "Active" },
    accountText: {
      loading: "Loading data...",
      noOrders: "No orders yet.",
      noSubscription: "No active subscriptions",
      choosePlan: "Choose a plan in the store.",
      activeUntil: "Active until {date}",
      activateEmpty: "Enter an activation key",
      activateChecking: "Checking key...",
      activateSuccess: "Key activated.",
      activateNotFound: "Key not found.",
      activateUsed: "Key has already been used.",
      activateError: "Could not activate the key.",
      passwordMismatch: "New passwords do not match",
      passwordShort: "New password must be at least 4 characters",
      passwordSuccess: "Password changed.",
      passwordError: "Could not change password",
    },
    adminText: {
      loading: "Loading admin data...",
      usersEmpty: "No users yet.",
      keysEmpty: "No keys yet.",
      actionDone: "Action completed.",
      keyDone: "Keys generated.",
      requestError: "Could not complete the request.",
      keyDeleted: "Key deleted.",
      keySaved: "Key changed.",
      newPassword: "New password",
      deleteKeyConfirm: "Delete key {key}?",
    },
    checkout: {
      kicker: "Checkout",
      description: "Choose a payment method and enter the receipt email.",
      product: "Product",
      total: "Total",
      methodAria: "Payment method",
      funpay: "Payment through the FunPay marketplace.",
      yookassa: "Bank card and electronic payment methods.",
      email: "Receipt email",
      emailPlaceholder: "mail@example.com",
      promo: "Promo code",
      promoPlaceholder: "If you have one",
      submit: "Place order",
      opening: "Placing order...",
      success: "Order placed. Payment method: {provider}. The receipt will be sent to {email}.",
      emailInvalid: "Enter a valid receipt email.",
      providerInvalid: "Choose a payment method.",
      orderError: "Could not place the order.",
      providers: { funpay: "FunPay", yookassa: "YooKassa" },
      discount: "{percent}% discount",
      promoApplied: "Promo code applied",
      promoUnknown: "Promo code saved, no discount applied",
      pendingPayment: "pending payment",
    },
    account: {
      title: "Account",
      subtitle: "Manage your account, subscription, and orders.",
      close: "Close",
      activeSubscriptions: "Active subscriptions",
      personalData: "Personal data",
      id: "ID",
      group: "Group",
      login: "Username",
      email: "Email",
      createdAt: "Registration date",
      hwid: "HWID",
      uid: "UID",
      subscription: "Subscription",
      orders: "Orders",
      ban: "Ban",
      noOrdersShort: "No orders",
      noSubscriptionShort: "No subscription",
      uidNotIssued: "Not issued",
      unboundHwid: "Not bound",
      downloadLauncher: "Download launcher",
      logout: "Log out",
      adminSectionTitle: "Administration",
      adminPanelTitle: "Admin panel",
      adminPanelDescription: "Users, subscriptions, bans, UID, HWID, and keys.",
      open: "Open",
      activationTitle: "Key activation",
      activationPlaceholder: "Enter activation key",
      activateButton: "Activate key",
      passwordTitle: "Change password",
      currentPassword: "Current password",
      nextPassword: "New password",
      repeatPassword: "Repeat password",
      changePassword: "Change password",
      recentOrders: "Recent orders",
      footerTitle: "Ready to play?",
      footerText: "We provide the best solutions for your comfort.",
      productsButton: "Go to products",
      banned: "Banned",
      avatarChange: "Change avatar",
      avatarTooLarge: "Avatar file must be up to 700 KB.",
      avatarError: "Could not update avatar.",
    },
    admin: {
      title: "Admin panel",
      subtitle: "Manage users, subscriptions, bans, and keys.",
      panelSection: "Administrator panel",
      siteManagement: "Site management",
      panelDescription: "Issue subscriptions, generate keys, and maintain accounts.",
      back: "Back",
      userActionTitle: "User action",
      userLabel: "User",
      actionLabel: "Action",
      productLabel: "Product",
      groupLabel: "Group",
      durationPlaceholder: "Days: empty = product duration, 0 = forever",
      actionValuePlaceholder: "Value / reason / new password",
      run: "Run",
      keyGenerationTitle: "Key generation",
      amountPlaceholder: "Amount",
      maxActivationsPlaceholder: "Activations per key",
      keyTitlePlaceholder: "Key title, optional",
      generate: "Generate",
      registeredUsers: "Registered users",
      recentKeys: "Recent keys",
    },
    adminActions: {
      "issue-subscription": "Issue subscription",
      "revoke-subscription": "Revoke subscription",
      ban: "Ban",
      unban: "Unban",
      "reset-hwid": "Reset HWID",
      "set-uid": "Issue / change UID",
      "reset-password": "Reset password",
      "reset-email": "Reset email",
      "set-group": "Change group",
      "delete-account": "Delete account",
    },
    adminPlaceholders: {
      subscriptionTitle: "Subscription title, optional",
      banReason: "Ban reason, optional",
      uid: "New UID, empty = generate",
      password: "New password, empty = generate",
      email: "New email, empty = username@stellar.local",
    },
    keys: {
      days: "{days} days",
      activations: "activations {used}/{max}",
      activationsWithUsers: "activations {used}/{max}: {users}",
      productAria: "Product for key",
      limitAria: "Activation limit",
      save: "Change",
      delete: "Delete",
    },
    footer: {
      description: "A powerful client for confident play and consistent results on Minecraft servers.",
      product: "Product",
      buy: "Purchase",
      support: "Support",
      legal: "Legal information",
      terms: "Terms of use",
      privacy: "Privacy policy",
      copyright: "© 2026 - stellarmanage. All rights reserved.",
    },
  },
  PL: {
    roles: { user: "Użytkownik", admin: "Admin" },
    common: { yes: "Tak", no: "Nie", until: "do", forever: "na zawsze", active: "Aktywna" },
    accountText: {
      loading: "Ładujemy dane...",
      noOrders: "Brak zamówień.",
      noSubscription: "Brak aktywnych subskrypcji",
      choosePlan: "Wybierz plan w sklepie.",
      activeUntil: "Aktywna do {date}",
      activateEmpty: "Wpisz klucz aktywacyjny",
      activateChecking: "Sprawdzamy klucz...",
      activateSuccess: "Klucz aktywowany.",
      activateNotFound: "Nie znaleziono klucza.",
      activateUsed: "Klucz został już użyty.",
      activateError: "Nie udało się aktywować klucza.",
      passwordMismatch: "Nowe hasła nie są zgodne",
      passwordShort: "Nowe hasło musi mieć co najmniej 4 znaki",
      passwordSuccess: "Hasło zmienione.",
      passwordError: "Nie udało się zmienić hasła",
    },
    adminText: {
      loading: "Ładujemy dane admina...",
      usersEmpty: "Brak użytkowników.",
      keysEmpty: "Brak kluczy.",
      actionDone: "Działanie wykonane.",
      keyDone: "Klucze wygenerowane.",
      requestError: "Nie udało się wykonać żądania.",
      keyDeleted: "Klucz usunięty.",
      keySaved: "Klucz zmieniony.",
      newPassword: "Nowe hasło",
      deleteKeyConfirm: "Usunąć klucz {key}?",
    },
    checkout: {
      kicker: "Finalizacja zakupu",
      description: "Wybierz metodę płatności i podaj email do paragonu.",
      product: "Produkt",
      total: "Do zapłaty",
      methodAria: "Metoda płatności",
      funpay: "Płatność przez marketplace FunPay.",
      yookassa: "Karta bankowa i elektroniczne metody płatności.",
      email: "Email do paragonu",
      emailPlaceholder: "mail@example.com",
      promo: "Kod promocyjny",
      promoPlaceholder: "Jeśli posiadasz",
      submit: "Złóż zamówienie",
      opening: "Składamy zamówienie...",
      success: "Zamówienie złożone. Metoda płatności: {provider}. Paragon zostanie wysłany na {email}.",
      emailInvalid: "Wpisz poprawny email do paragonu.",
      providerInvalid: "Wybierz metodę płatności.",
      orderError: "Nie udało się złożyć zamówienia.",
      providers: { funpay: "FunPay", yookassa: "YooKassa" },
      discount: "Rabat {percent}%",
      promoApplied: "Kod promocyjny zastosowany",
      promoUnknown: "Kod zapisany, rabat nie został zastosowany",
      pendingPayment: "oczekuje na płatność",
    },
    account: {
      title: "Konto",
      subtitle: "Zarządzanie kontem, subskrypcją i zamówieniami.",
      close: "Zamknij",
      activeSubscriptions: "Aktywne subskrypcje",
      personalData: "Dane osobowe",
      id: "ID",
      group: "Grupa",
      login: "Login",
      email: "Email",
      createdAt: "Data rejestracji",
      hwid: "HWID",
      uid: "UID",
      subscription: "Subskrypcja",
      orders: "Zamówienia",
      ban: "Ban",
      noOrdersShort: "Brak zamówień",
      noSubscriptionShort: "Brak subskrypcji",
      uidNotIssued: "Nie wydano",
      unboundHwid: "Nie przypisano",
      downloadLauncher: "Pobierz launcher",
      logout: "Wyloguj",
      adminSectionTitle: "Administracja",
      adminPanelTitle: "Panel admina",
      adminPanelDescription: "Użytkownicy, subskrypcje, bany, UID, HWID i klucze.",
      open: "Otwórz",
      activationTitle: "Aktywacja klucza",
      activationPlaceholder: "Wpisz klucz aktywacyjny",
      activateButton: "Aktywuj klucz",
      passwordTitle: "Zmiana hasła",
      currentPassword: "Aktualne hasło",
      nextPassword: "Nowe hasło",
      repeatPassword: "Powtórz hasło",
      changePassword: "Zmień hasło",
      recentOrders: "Ostatnie zamówienia",
      footerTitle: "Gotowy do gry?",
      footerText: "Dostarczamy najlepsze rozwiązania dla twojej wygody.",
      productsButton: "Przejdź do produktów",
      banned: "Zbanowany",
      avatarChange: "Zmień avatar",
      avatarTooLarge: "Plik avatara musi mieć do 700 KB.",
      avatarError: "Nie udało się zaktualizować avatara.",
    },
    admin: {
      title: "Panel admina",
      subtitle: "Zarządzanie użytkownikami, subskrypcjami, banami i kluczami.",
      panelSection: "Panel administratora",
      siteManagement: "Zarządzanie stroną",
      panelDescription: "Wydawanie subskrypcji, generowanie kluczy i obsługa kont.",
      back: "Wstecz",
      userActionTitle: "Działanie na użytkowniku",
      userLabel: "Użytkownik",
      actionLabel: "Działanie",
      productLabel: "Produkt",
      groupLabel: "Grupa",
      durationPlaceholder: "Dni: puste = czas produktu, 0 = na zawsze",
      actionValuePlaceholder: "Wartość / powód / nowe hasło",
      run: "Wykonaj",
      keyGenerationTitle: "Generowanie kluczy",
      amountPlaceholder: "Liczba",
      maxActivationsPlaceholder: "Aktywacje na klucz",
      keyTitlePlaceholder: "Nazwa klucza, opcjonalnie",
      generate: "Wygeneruj",
      registeredUsers: "Zarejestrowani użytkownicy",
      recentKeys: "Ostatnie klucze",
    },
    adminActions: {
      "issue-subscription": "Wydaj subskrypcję",
      "revoke-subscription": "Cofnij subskrypcję",
      ban: "Zbanuj",
      unban: "Odbanuj",
      "reset-hwid": "Resetuj HWID",
      "set-uid": "Wydaj / zmień UID",
      "reset-password": "Resetuj hasło",
      "reset-email": "Resetuj email",
      "set-group": "Zmień grupę",
      "delete-account": "Usuń konto",
    },
    adminPlaceholders: {
      subscriptionTitle: "Nazwa subskrypcji, opcjonalnie",
      banReason: "Powód bana, opcjonalnie",
      uid: "Nowy UID, puste = wygeneruj",
      password: "Nowe hasło, puste = wygeneruj",
      email: "Nowy email, puste = username@stellar.local",
    },
    keys: {
      days: "{days} dni",
      activations: "aktywacje {used}/{max}",
      activationsWithUsers: "aktywacje {used}/{max}: {users}",
      productAria: "Produkt dla klucza",
      limitAria: "Limit aktywacji",
      save: "Zmień",
      delete: "Usuń",
    },
    footer: {
      description: "Potężny klient do pewnej gry i stabilnych wyników na serwerach Minecraft.",
      product: "Produkt",
      buy: "Zakup",
      support: "Wsparcie",
      legal: "Informacje prawne",
      terms: "Warunki użytkowania",
      privacy: "Polityka prywatności",
      copyright: "© 2026 - stellarmanage. Wszelkie prawa zastrzeżone.",
    },
  },
};

Object.entries(interfaceDictionaries).forEach(([lang, values]) => {
  Object.assign(dictionaries[lang], values);
});

const adminPromoTranslations = {
  RU: {
    adminText: {
      promosEmpty: "Промокодов пока нет.",
      promoCreated: "Промокод создан.",
      promoDeleted: "Промокод удалён.",
      deletePromoConfirm: "Удалить промокод {code}?",
      promoUses: "активации {used}/{max}",
      promoDiscount: "скидка {percent}%",
      promoExpires: "до {date}",
      promoNoExpiry: "без срока",
      promoExpired: "истёк",
    },
    admin: {
      promocodesTitle: "Промокоды",
      promoCodePlaceholder: "Промокод",
      promoNamePlaceholder: "Название промокода",
      promoDiscountPlaceholder: "Скидка %",
      promoMaxActivationsPlaceholder: "Активации",
      promoExpiresPlaceholder: "Срок действия",
      promoCreate: "Создать промокод",
    },
  },
  UA: {
    adminText: {
      promosEmpty: "Промокодів поки немає.",
      promoCreated: "Промокод створено.",
      promoDeleted: "Промокод видалено.",
      deletePromoConfirm: "Видалити промокод {code}?",
      promoUses: "активації {used}/{max}",
      promoDiscount: "знижка {percent}%",
      promoExpires: "до {date}",
      promoNoExpiry: "без строку",
      promoExpired: "закінчився",
    },
    admin: {
      promocodesTitle: "Промокоди",
      promoCodePlaceholder: "Промокод",
      promoNamePlaceholder: "Назва промокоду",
      promoDiscountPlaceholder: "Знижка %",
      promoMaxActivationsPlaceholder: "Активації",
      promoExpiresPlaceholder: "Строк дії",
      promoCreate: "Створити промокод",
    },
  },
  EN: {
    adminText: {
      promosEmpty: "No promo codes yet.",
      promoCreated: "Promo code created.",
      promoDeleted: "Promo code deleted.",
      deletePromoConfirm: "Delete promo code {code}?",
      promoUses: "uses {used}/{max}",
      promoDiscount: "{percent}% discount",
      promoExpires: "until {date}",
      promoNoExpiry: "no expiry",
      promoExpired: "expired",
    },
    admin: {
      promocodesTitle: "Promo codes",
      promoCodePlaceholder: "Promo code",
      promoNamePlaceholder: "Promo code name",
      promoDiscountPlaceholder: "Discount %",
      promoMaxActivationsPlaceholder: "Activations",
      promoExpiresPlaceholder: "Expiry date",
      promoCreate: "Create promo code",
    },
  },
  PL: {
    adminText: {
      promosEmpty: "Brak kodów promocyjnych.",
      promoCreated: "Kod promocyjny utworzony.",
      promoDeleted: "Kod promocyjny usunięty.",
      deletePromoConfirm: "Usunąć kod promocyjny {code}?",
      promoUses: "użycia {used}/{max}",
      promoDiscount: "rabat {percent}%",
      promoExpires: "do {date}",
      promoNoExpiry: "bez terminu",
      promoExpired: "wygasł",
    },
    admin: {
      promocodesTitle: "Kody promocyjne",
      promoCodePlaceholder: "Kod promocyjny",
      promoNamePlaceholder: "Nazwa kodu",
      promoDiscountPlaceholder: "Rabat %",
      promoMaxActivationsPlaceholder: "Aktywacje",
      promoExpiresPlaceholder: "Termin ważności",
      promoCreate: "Utwórz kod",
    },
  },
};

Object.entries(adminPromoTranslations).forEach(([lang, values]) => {
  Object.entries(values).forEach(([section, sectionValues]) => {
    dictionaries[lang][section] = { ...(dictionaries[lang][section] || {}), ...sectionValues };
  });
});

let selectedLang = dictionaries[localStorage.getItem("core_site_web_lang")] ? localStorage.getItem("core_site_web_lang") : "RU";
let authMode = "login";
let productsCache = [];
let adminData = { users: [], products: [], keys: [], promocodes: [] };
let lastAccountOrders = [];
let currentCheckoutProduct = null;
let authCloseTimer = 0;
let authSwitchTimer = 0;
let accountCloseTimer = 0;
let checkoutCloseTimer = 0;
currentLang.textContent = selectedLang;

const t = (path) => path.split(".").reduce((value, key) => value?.[key], dictionaries[selectedLang]) ?? path;
const tr = (path, replacements = {}) =>
  Object.entries(replacements).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, String(value)), String(t(path)));
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+$/i.test(String(value || "").trim());

const accountTextFallback = {
  loading: "Загружаем данные...",
  noOrders: "Заказов пока нет.",
  noSubscription: "Нет активных подписок",
  choosePlan: "Выберите тариф в магазине.",
  activeUntil: "Активна до {date}",
  activateEmpty: "Введите ключ активации",
  activateChecking: "Проверяем ключ...",
  activateSuccess: "Ключ активирован.",
  activateNotFound: "Ключ не найден.",
  activateUsed: "Ключ уже использован.",
  activateError: "Не удалось активировать ключ.",
  passwordMismatch: "Новые пароли не совпадают",
  passwordShort: "Новый пароль должен быть не короче 4 символов",
  passwordSuccess: "Пароль изменен.",
  passwordError: "Не удалось сменить пароль",
};

const adminTextFallback = {
  loading: "Загружаем admin-данные...",
  usersEmpty: "Пользователей пока нет.",
  keysEmpty: "Ключей пока нет.",
  actionDone: "Действие выполнено.",
  keyDone: "Ключи сгенерированы.",
  requestError: "Не удалось выполнить запрос.",
};

const accountText = new Proxy(accountTextFallback, {
  get: (fallback, key) => t(`accountText.${String(key)}`) || fallback[key],
});
const adminText = new Proxy(adminTextFallback, {
  get: (fallback, key) => t(`adminText.${String(key)}`) || fallback[key],
});

function getSavedUser() {
  return JSON.parse(sessionStorage.getItem("core_user") || "null");
}

function setAuthButtons(loggedIn) {
  const label = loggedIn ? t("auth.account") : t("auth.login");
  const heroLabel = heroLogin.querySelector("span");
  openLogin.textContent = label;
  if (heroLabel) {
    heroLabel.textContent = label;
  }
  heroLogin.setAttribute("aria-label", label);
}

function setSavedUser(user) {
  sessionStorage.setItem("core_user", JSON.stringify(user));
  setAuthButtons(true);
}

function setLoggedOutView() {
  sessionStorage.removeItem("core_auth_token");
  sessionStorage.removeItem("core_user");
  setAuthButtons(false);
}

function formatAccountDate(value) {
  if (!value) return "-";
  const locales = { RU: "ru-RU", UA: "uk-UA", EN: "en-US", PL: "pl-PL" };
  return new Intl.DateTimeFormat(locales[selectedLang] || "ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function shortAccountId(id) {
  return String(id || "-").replace(/-/g, "").slice(0, 4).toUpperCase() || "-";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getAuthHeaders(json = false) {
  const token = sessionStorage.getItem("core_auth_token");
  return {
    ...(json ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function isAdminUser(user) {
  const normalizedGroup = String(user?.group || "").trim().toLowerCase();
  if (["админ", "администратор"].includes(normalizedGroup)) return true;
  return ["admin", "админ", "администратор", "administrator", "owner"].includes(String(user?.group || "").trim().toLowerCase());
}

function groupLabel(group) {
  const normalized = String(group || "").trim().toLowerCase();
  if (isAdminUser({ group })) return t("roles.admin");
  if (!normalized || ["user", "пользователь", "користувач", "użytkownik"].includes(normalized)) return t("roles.user");
  return group;
}

function productDisplayName(productId, fallback = "") {
  const translated = t(`products.items.${productId}`);
  return Array.isArray(translated) ? translated[0] : fallback || productId || "-";
}

function formatPrice(value) {
  return `${Number(value || 0).toLocaleString(dictionaries[selectedLang]?.locale || "ru-RU")} ₽`;
}

function adminProductSelectOptions(selectedProductId) {
  const products = adminData.products.length ? adminData.products : productsCache;
  return products
    .map((product) => {
      const selected = product.id === selectedProductId ? " selected" : "";
      return `<option value="${escapeHtml(product.id)}"${selected}>${escapeHtml(productDisplayName(product.id, product.name))}</option>`;
    })
    .join("");
}

function keyActivations(key) {
  if (Array.isArray(key.activations)) return key.activations;
  if (key.usedBy) return [{ username: key.usedBy, activatedAt: key.usedAt }];
  return [];
}

function subscriptionLabel(subscription) {
  if (!subscription?.title) return t("account.noSubscriptionShort");
  const expires = subscription.expiresAt
    ? `${t("common.until")} ${formatAccountDate(subscription.expiresAt)}`
    : t("common.forever");
  return `${subscription.title} (${expires})`;
}

function hasActiveSubscription(subscription) {
  if (!subscription?.title) return false;
  if (!subscription.expiresAt) return true;
  return new Date(subscription.expiresAt).getTime() > Date.now();
}

function uidLabel(value) {
  return value || t("account.uidNotIssued");
}

function translateError(response, fallback) {
  const message = String(fallback || "").toLowerCase();
  if (response.status === 401) return t("messages.loginError");
  if (response.status === 409 && (message.includes("почт") || message.includes("email"))) return t("messages.emailTaken");
  if (response.status === 409) return t("messages.usernameTaken");
  if (response.status === 400 && (message.includes("почт") || message.includes("email") || message.includes("@"))) return t("messages.emailInvalid");
  if (response.status === 400 && message.includes("парол")) return t("messages.passwordInvalid");
  if (response.status === 400) return t("messages.usernameInvalid");
  return fallback || t("messages.loginFailed");
}

function updateLangMenuPosition() {
  const rect = langSwitch.getBoundingClientRect();
  const menuWidth = 164;
  const margin = 10;
  const left = Math.min(Math.max(rect.left + rect.width / 2, menuWidth / 2 + margin), window.innerWidth - menuWidth / 2 - margin);
  langMenu.style.setProperty("--lang-menu-left", `${left}px`);
  langMenu.style.setProperty("--lang-menu-top", `${rect.bottom + 9}px`);
}

function setLangMenuOpen(open) {
  if (open) {
    updateLangMenuPosition();
  }
  langPicker.classList.toggle("is-open", open);
  langMenu.classList.toggle("is-open", open);
  langSwitch.setAttribute("aria-expanded", String(open));
}

function updateLanguageOptions() {
  langOptions.forEach((option) => {
    const active = option.dataset.lang === selectedLang;
    option.classList.toggle("is-active", active);
    option.setAttribute("aria-checked", String(active));
  });
}

function renderProducts() {
  if (!productGrid || !productsCache.length) return;
  productGrid.innerHTML = productsCache
    .map((product, index) => {
      const translated = t(`products.items.${product.id}`);
      const [name, description] = Array.isArray(translated) ? translated : [product.name, product.description];
      return `
        <article class="product-card">
          <span class="card-index">0 ${index + 1}</span>
          <h3>${name}</h3>
          <p>${description}</p>
          <span class="price">${escapeHtml(formatPrice(product.price))}</span>
          <button class="buy-button" type="button" data-product="${product.id}">${t("products.buy")}</button>
        </article>
      `;
    })
    .join("");
  const cards = prepareWaveReveal(productGrid.querySelectorAll(".product-card"), "card-reveal", 95, 360);
  cards.forEach((element) => {
    if (window.coreWaveObserver) {
      window.coreWaveObserver.observe(element);
      return;
    }
    element.classList.add("is-visible");
  });
}

function honorFooterHash() {
  if (window.location.hash !== "#footer") return;
  requestAnimationFrame(() => {
    document.querySelector("#footer")?.scrollIntoView({ block: "start" });
  });
}

function renderOrders(orders) {
  if (!orders?.length) {
    ordersList.textContent = accountText.noOrders;
    return;
  }

  ordersList.innerHTML = orders
    .map((order) => {
      const translated = t(`products.items.${order.productId}`);
      const productName = Array.isArray(translated) ? translated[0] : order.productName || order.productId;
      const provider = order.paymentProvider ? t(`checkout.providers.${order.paymentProvider}`) : "";
      const total = order.totalPrice !== undefined ? formatPrice(order.totalPrice) : "";
      const paidLabels = { RU: "оплачено", UA: "оплачено", EN: "paid", PL: "opłacone" };
      const completedLabels = { RU: "выполнено", UA: "виконано", EN: "completed", PL: "wykonano" };
      const status = order.status === "pending_payment"
        ? t("checkout.pendingPayment")
        : order.status === "paid"
          ? paidLabels[selectedLang] || "paid"
          : order.status === "completed"
            ? completedLabels[selectedLang] || "completed"
            : order.status || "new";
      const meta = [provider, total, status].filter(Boolean).join(" · ");
      return `
        <div class="order-row">
          <span><strong>${productName}</strong> · ${formatAccountDate(order.createdAt)}</span>
          <span>${escapeHtml(meta)}</span>
        </div>
      `;
    })
    .join("");
}

function renderAdminProductOptions() {
  const products = adminData.products.length ? adminData.products : productsCache;
  const options = products
    .map((product) => `<option value="${escapeHtml(product.id)}">${escapeHtml(productDisplayName(product.id, product.name))}</option>`)
    .join("");

  if (adminActionProduct) adminActionProduct.innerHTML = options;
  if (adminKeyProduct) adminKeyProduct.innerHTML = options;
}

function renderAdminUsers() {
  if (!adminUsersList || !adminUserSelect) return;

  if (!adminData.users.length) {
    adminUsersList.textContent = adminText.usersEmpty;
    adminUserSelect.innerHTML = "";
    return;
  }

  adminUserSelect.innerHTML = adminData.users
    .map((user) => `<option value="${escapeHtml(user.id)}">${escapeHtml(user.username)} · ${escapeHtml(groupLabel(user.group))}</option>`)
    .join("");

  adminUsersList.innerHTML = adminData.users
    .map((user) => {
      const group = groupLabel(user.group);
      const lastOrder = user.lastOrderAt ? formatAccountDate(user.lastOrderAt) : t("account.noOrdersShort");
      return `
        <article class="admin-user-card${user.banned ? " is-banned" : ""}">
          <div class="admin-user-top">
            <div>
              <strong>${escapeHtml(user.username)}</strong>
              <span>${escapeHtml(user.email)} · ${escapeHtml(user.id)}</span>
            </div>
            ${user.banned ? `<span class="admin-badge is-banned">${escapeHtml(t("account.banned"))}</span>` : ""}
          </div>
          <dl class="admin-user-data">
            <div><dt>${escapeHtml(t("account.uid"))}</dt><dd>${escapeHtml(uidLabel(user.uid))}</dd></div>
            <div><dt>${escapeHtml(t("account.group"))}</dt><dd><span class="admin-group-pill">${escapeHtml(group)}</span></dd></div>
            <div><dt>${escapeHtml(t("account.hwid"))}</dt><dd>${escapeHtml(user.hwid || t("account.unboundHwid"))}</dd></div>
            <div><dt>${escapeHtml(t("account.createdAt"))}</dt><dd>${escapeHtml(formatAccountDate(user.createdAt))}</dd></div>
            <div><dt>${escapeHtml(t("account.subscription"))}</dt><dd>${escapeHtml(subscriptionLabel(user.subscription))}</dd></div>
            <div><dt>${escapeHtml(t("account.orders"))}</dt><dd>${escapeHtml(String(user.orderCount || 0))} · ${escapeHtml(lastOrder)}</dd></div>
            <div><dt>${escapeHtml(t("account.ban"))}</dt><dd>${escapeHtml(user.banned ? user.banReason || t("common.yes") : t("common.no"))}</dd></div>
          </dl>
        </article>
      `;
    })
    .join("");
}

function renderAdminKeys(keys = adminData.keys, target = adminKeysList) {
  if (!target) return;

  if (!keys?.length) {
    target.textContent = adminText.keysEmpty;
    return;
  }

  const withControls = target === adminKeysList;
  target.innerHTML = keys
    .map((key) => {
      const duration = key.durationDays === null || key.durationDays === undefined
        ? t("common.forever")
        : tr("keys.days", { days: key.durationDays });
      const activations = keyActivations(key);
      const maxActivations = Math.max(Number(key.maxActivations || 1), activations.length || 0, 1);
      const users = activations.map((activation) => activation.username).filter(Boolean);
      const status = users.length
        ? tr("keys.activationsWithUsers", { used: activations.length, max: maxActivations, users: users.slice(-3).join(", ") })
        : tr("keys.activations", { used: 0, max: maxActivations });
      return `
        <div class="admin-key-row">
          <div class="admin-key-main">
            <code>${escapeHtml(key.key)}</code>
            <span>${escapeHtml(productDisplayName(key.productId, key.title))} · ${escapeHtml(duration)} · ${escapeHtml(status)}</span>
          </div>
          ${
            withControls
              ? `<div class="admin-key-controls">
                  <select data-key-product="${escapeHtml(key.key)}" aria-label="${escapeHtml(t("keys.productAria"))}">
                    ${adminProductSelectOptions(key.productId)}
                  </select>
                  <input data-key-activations="${escapeHtml(key.key)}" type="number" min="${activations.length || 1}" max="10000" value="${maxActivations}" aria-label="${escapeHtml(t("keys.limitAria"))}" />
                  <button class="account-secondary" type="button" data-key-action="save" data-key="${escapeHtml(key.key)}">${escapeHtml(t("keys.save"))}</button>
                  <button class="account-secondary is-danger" type="button" data-key-action="delete" data-key="${escapeHtml(key.key)}">${escapeHtml(t("keys.delete"))}</button>
                </div>`
              : ""
          }
        </div>
      `;
    })
    .join("");
}

function renderAdminPromos(promocodes = adminData.promocodes) {
  if (!adminPromosList) return;

  if (!promocodes?.length) {
    adminPromosList.textContent = adminText.promosEmpty;
    return;
  }

  adminPromosList.innerHTML = promocodes
    .map((promo) => {
      const activations = Array.isArray(promo.activations) ? promo.activations : [];
      const maxActivations = Math.max(Number(promo.maxActivations || 1), activations.length || 0, 1);
      const expired = promo.expiresAt && new Date(promo.expiresAt).getTime() <= Date.now();
      const expires = promo.expiresAt
        ? expired
          ? `${tr("adminText.promoExpires", { date: formatAccountDate(promo.expiresAt) })} (${adminText.promoExpired})`
          : tr("adminText.promoExpires", { date: formatAccountDate(promo.expiresAt) })
        : adminText.promoNoExpiry;
      const details = [
        tr("adminText.promoDiscount", { percent: promo.discountPercent || 0 }),
        tr("adminText.promoUses", { used: activations.length, max: maxActivations }),
        expires,
      ];

      return `
        <div class="admin-promo-row${expired ? " is-expired" : ""}">
          <div class="admin-promo-main">
            <code>${escapeHtml(promo.code)}</code>
            <span>${escapeHtml(promo.title || promo.code)} &middot; ${escapeHtml(details.join(" · "))}</span>
          </div>
          <div class="admin-promo-controls">
            <button class="account-secondary is-danger" type="button" data-promo-action="delete" data-promo="${escapeHtml(promo.code)}">${escapeHtml(t("keys.delete"))}</button>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderAdminOverview() {
  renderAdminProductOptions();
  renderAdminUsers();
  renderAdminKeys();
  renderAdminPromos();
}

function renderAccount(user, orders = []) {
  lastAccountOrders = orders;
  const email = user.email || `${user.username}@stellar.local`;
  accountAvatar.textContent = (user.username || "S").slice(0, 1).toUpperCase();
  if (accountAvatarButton) {
    if (user.avatar) {
      accountAvatarButton.style.backgroundImage = `url("${String(user.avatar).replace(/"/g, "%22")}")`;
      accountAvatarButton.classList.add("has-image");
    } else {
      accountAvatarButton.style.backgroundImage = "";
      accountAvatarButton.classList.remove("has-image");
    }
  }
  accountName.textContent = user.username || "-";
  accountEmail.textContent = email;
  accountId.textContent = shortAccountId(user.id);
  accountGroup.textContent = groupLabel(user.group);
  accountLogin.textContent = user.username || "-";
  accountMail.textContent = email;
  accountCreated.textContent = formatAccountDate(user.createdAt);
  accountHwid.textContent = user.hwid || t("account.unboundHwid");

  // ✅ КНОПКА ЛАУНЧЕРА ДОСТУПНА ВСЕМ ПОЛЬЗОВАТЕЛЯМ (БЕЗ ПРОВЕРКИ ПОДПИСКИ)
  if (accountLauncher) {
    accountLauncher.hidden = false;
    accountLauncher.disabled = false;
  }

  const subscriptionActive = hasActiveSubscription(user.subscription);
  if (subscriptionActive) {
    subscriptionTitle.textContent = user.subscription.title;
    subscriptionMeta.textContent = user.subscription.expiresAt
      ? tr("accountText.activeUntil", { date: formatAccountDate(user.subscription.expiresAt) })
      : t("common.active");
  } else {
    subscriptionTitle.textContent = accountText.noSubscription;
    subscriptionMeta.textContent = accountText.choosePlan;
  }

  if (adminEntry) {
    adminEntry.hidden = !isAdminUser(user);
  }
  if (!isAdminUser(user)) {
    closeAdminView();
  }

  renderOrders(orders);
}

async function loadAccount() {
  const user = getSavedUser();
  if (!user?.username) return;

  renderAccount(user, []);
  ordersList.textContent = accountText.loading;

  try {
    const response = await fetch(`/api/v1/account?username=${encodeURIComponent(user.username)}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Account request failed");
    const result = await response.json();
    setSavedUser(result.user);
    renderAccount(result.user, result.orders);
  } catch {
    renderAccount(user, []);
  }
}

function setAccountView(adminView) {
  accountPanel?.classList.toggle("is-admin-view", adminView);
  if (adminPanel) adminPanel.hidden = !adminView;
  if (accountStandard) accountStandard.hidden = adminView;
  if (accountTitle) accountTitle.textContent = adminView ? t("admin.title") : t("account.title");
  if (accountSubtitle) {
    accountSubtitle.textContent = adminView ? t("admin.subtitle") : t("account.subtitle");
  }
}

function closeAdminView() {
  setAccountView(false);
}

async function loadAdminOverview() {
  if (!adminUsersList) return;
  adminUsersList.textContent = adminText.loading;
  adminKeysList.textContent = adminText.loading;
  if (adminPromosList) adminPromosList.textContent = adminText.loading;

  try {
    const response = await fetch("/api/v1/admin/overview", {
      headers: getAuthHeaders(),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || adminText.requestError);

    adminData = {
      users: result.users || [],
      products: result.products || [],
      keys: result.keys || [],
      promocodes: result.promocodes || [],
    };

    if (result.admin) {
      setSavedUser(result.admin);
    }
    renderAdminOverview();
  } catch (error) {
    adminUsersList.textContent = error.message || adminText.requestError;
    adminKeysList.textContent = "";
    if (adminPromosList) adminPromosList.textContent = "";
  }
}

function openAdminView() {
  const user = getSavedUser();
  if (!isAdminUser(user)) return;
  setAccountView(true);
  renderAdminProductOptions();
  loadAdminOverview();
}

const openAccount = () => {
  const user = getSavedUser();
  if (!sessionStorage.getItem("core_auth_token") || !user?.username) {
    openAuth("login");
    return;
  }

  window.clearTimeout(accountCloseTimer);
  accountModal.classList.remove("is-closing");
  if (!accountModal.open) {
    if (typeof accountModal.showModal === "function") {
      accountModal.showModal();
    } else {
      accountModal.setAttribute("open", "");
    }
  }
  closeAdminView();
  loadAccount();
};

const closeAccountModal = () => {
  if (!accountModal.open || accountModal.classList.contains("is-closing")) return;
  accountModal.classList.add("is-closing");
  window.clearTimeout(accountCloseTimer);
  accountCloseTimer = window.setTimeout(() => {
    accountModal.classList.remove("is-closing");
    accountModal.close();
  }, 180);
};

function setText(selector, key) {
  const element = document.querySelector(selector);
  if (element) element.textContent = t(key);
}

function setAttr(selector, attr, key) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attr, t(key));
}

function setButtonLabel(element, text) {
  if (!element) return;
  const textNode = Array.from(element.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  if (textNode) {
    textNode.textContent = ` ${text}`;
  } else {
    element.append(` ${text}`);
  }
}

function setPlaceholder(selector, key) {
  const element = document.querySelector(selector);
  if (element) element.placeholder = t(key);
}

function applyInterfaceTranslations() {
  if (checkoutKicker) checkoutKicker.textContent = t("checkout.kicker");
  if (checkoutDescription) checkoutDescription.textContent = t("checkout.description");
  if (checkoutProductLabel) checkoutProductLabel.textContent = t("checkout.product");
  if (checkoutPriceLabel) checkoutPriceLabel.textContent = t("checkout.total");
  if (checkoutFunPayText) checkoutFunPayText.textContent = t("checkout.funpay");
  if (checkoutYooKassaText) checkoutYooKassaText.textContent = t("checkout.yookassa");
  if (checkoutEmailLabel) checkoutEmailLabel.textContent = t("checkout.email");
  if (checkoutPromoLabel) checkoutPromoLabel.textContent = t("checkout.promo");
  setAttr(".checkout-methods", "aria-label", "checkout.methodAria");
  setAttr("#closeCheckout", "aria-label", "account.close");
  setPlaceholder("#checkoutForm input[name='receiptEmail']", "checkout.emailPlaceholder");
  setPlaceholder("#checkoutForm input[name='promoCode']", "checkout.promoPlaceholder");
  if (checkoutSubmit) checkoutSubmit.textContent = t("checkout.submit");

  setAttr("#closeAccount", "aria-label", "account.close");
  setAttr("#accountAvatarButton", "aria-label", "account.avatarChange");
  setText(".site-footer .footer-brand p", "footer.description");
  setText(".footer-column:nth-of-type(1) span", "footer.product");
  setText(".footer-column:nth-of-type(1) a:nth-of-type(1)", "footer.buy");
  setText(".footer-column:nth-of-type(1) a:nth-of-type(2)", "footer.support");
  setAttr(".footer-column:nth-of-type(1)", "aria-label", "footer.product");
  setText(".footer-column:nth-of-type(2) span", "footer.legal");
  setText(".footer-column:nth-of-type(2) a:nth-of-type(1)", "footer.terms");
  setText(".footer-column:nth-of-type(2) a:nth-of-type(2)", "footer.privacy");
  setAttr(".footer-column:nth-of-type(2)", "aria-label", "footer.legal");
  setText(".footer-bottom span", "footer.copyright");

  const accountSectionTitles = accountStandard?.querySelectorAll(".account-section-title") || [];
  const accountTitleKeys = [
    "account.activeSubscriptions",
    "account.personalData",
    "account.adminSectionTitle",
    "account.activationTitle",
    "account.passwordTitle",
    "account.recentOrders",
  ];
  accountSectionTitles.forEach((element, index) => {
    if (accountTitleKeys[index]) element.textContent = t(accountTitleKeys[index]);
  });

  const accountDataLabels = accountStandard?.querySelectorAll(".account-data dt") || [];
  ["account.id", "account.group", "account.login", "account.email", "account.createdAt", "account.hwid"].forEach((key, index) => {
    if (accountDataLabels[index]) accountDataLabels[index].textContent = t(key);
  });

  setText("#accountToProducts", "account.productsButton");
  setText("#accountFooterProducts", "account.productsButton");
  setText("#adminEntry strong", "account.adminPanelTitle");
  setText("#adminEntry span", "account.adminPanelDescription");
  setText("#openAdminPanel", "account.open");
  setButtonLabel(accountLauncher, t("account.downloadLauncher"));
  setButtonLabel(logoutAccount, t("account.logout"));
  setPlaceholder("#keyForm input[name='activationKey']", "account.activationPlaceholder");
  setText("#keyForm button", "account.activateButton");
  setPlaceholder("#passwordForm input[name='currentPassword']", "account.currentPassword");
  setPlaceholder("#passwordForm input[name='nextPassword']", "account.nextPassword");
  setPlaceholder("#passwordForm input[name='repeatPassword']", "account.repeatPassword");
  setText("#passwordForm button", "account.changePassword");
  setText(".account-footer strong", "account.footerTitle");
  setText(".account-footer span", "account.footerText");

  setText(".admin-panel-head .account-section-title", "admin.panelSection");
  setText(".admin-panel-head h3", "admin.siteManagement");
  setText(".admin-panel-head p", "admin.panelDescription");
  setText("#backToAccount", "admin.back");
  const adminSectionTitles = adminPanel?.querySelectorAll(":scope > .account-section > .account-section-title") || [];
  ["admin.userActionTitle", "admin.keyGenerationTitle", "admin.promocodesTitle", "admin.registeredUsers", "admin.recentKeys"].forEach((key, index) => {
    if (adminSectionTitles[index]) adminSectionTitles[index].textContent = t(key);
  });
  setAttr("#adminUserSelect", "aria-label", "admin.userLabel");
  setAttr("#adminActionSelect", "aria-label", "admin.actionLabel");
  setAttr("#adminActionProduct", "aria-label", "admin.productLabel");
  setAttr("#adminActionGroup", "aria-label", "admin.groupLabel");
  setAttr("#adminKeyProduct", "aria-label", "admin.productLabel");
  Array.from(adminActionSelect?.options || []).forEach((option) => {
    option.textContent = t(`adminActions.${option.value}`);
  });
  if (adminActionGroup) {
    const selected = adminActionGroup.value;
    adminActionGroup.innerHTML = `
      <option value="user">${t("roles.user")}</option>
      <option value="admin">${t("roles.admin")}</option>
    `;
    adminActionGroup.value = selected === "admin" ? "admin" : "user";
  }
  setPlaceholder("#adminActionDuration", "admin.durationPlaceholder");
  setPlaceholder("#adminActionValue", "admin.actionValuePlaceholder");
  setText("#adminUserActionForm button[type='submit']", "admin.run");
  setPlaceholder("#adminKeyGenerateForm input[name='durationDays']", "admin.durationPlaceholder");
  setPlaceholder("#adminKeyGenerateForm input[name='amount']", "admin.amountPlaceholder");
  setPlaceholder("#adminKeyGenerateForm input[name='maxActivations']", "admin.maxActivationsPlaceholder");
  setPlaceholder("#adminKeyGenerateForm input[name='title']", "admin.keyTitlePlaceholder");
  setText("#adminKeyGenerateForm button[type='submit']", "admin.generate");
  setPlaceholder("#adminPromoForm input[name='code']", "admin.promoCodePlaceholder");
  setPlaceholder("#adminPromoForm input[name='title']", "admin.promoNamePlaceholder");
  setPlaceholder("#adminPromoForm input[name='discountPercent']", "admin.promoDiscountPlaceholder");
  setPlaceholder("#adminPromoForm input[name='maxActivations']", "admin.promoMaxActivationsPlaceholder");
  setPlaceholder("#adminPromoForm input[name='expiresAt']", "admin.promoExpiresPlaceholder");
  setText("#adminPromoForm button[type='submit']", "admin.promoCreate");
}

function applyTranslations() {
  const dictionary = dictionaries[selectedLang];
  document.documentElement.lang = dictionary.locale;
  document.title = dictionary.title;
  currentLang.textContent = selectedLang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = t(element.dataset.i18nHtml);
  });
  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attr, key] = pair.split(":");
      element.setAttribute(attr, t(key));
    });
  });

  applyInterfaceTranslations();
  updateLanguageOptions();
  setAuthMode(authMode, authStatus.textContent);
  const savedUser = getSavedUser();
  setAuthButtons(Boolean(sessionStorage.getItem("core_auth_token") && savedUser?.username));
  renderProducts();
  updateAdminActionFields();
  setAccountView(Boolean(accountPanel?.classList.contains("is-admin-view")));
  if (accountModal?.open && savedUser?.username) {
    renderAccount(savedUser, lastAccountOrders);
  }
  if (accountPanel?.classList.contains("is-admin-view")) {
    renderAdminOverview();
  }
}

const savedUser = getSavedUser();
if (savedUser?.username) {
  setAuthButtons(Boolean(sessionStorage.getItem("core_auth_token")));
}

function updateAuthTabIndicator() {
  const activeTab = Array.from(authTabs).find((tab) => tab.dataset.authMode === authMode);
  if (!activeTab) return;
  const tabsRect = activeTab.parentElement.getBoundingClientRect();
  const activeRect = activeTab.getBoundingClientRect();
  activeTab.parentElement.style.setProperty("--auth-tab-left", `${activeRect.left - tabsRect.left}px`);
  activeTab.parentElement.style.setProperty("--auth-tab-width", `${activeRect.width}px`);
}

const setAuthMode = (mode, message = "", animate = modal.open) => {
  const isChanging = authMode !== mode;
  authMode = mode;
  const isRegister = mode === "register";
  const confirmInput = confirmField.querySelector("input");
  const emailInput = emailField.querySelector("input");
  authForm.classList.toggle("is-register", isRegister);
  authTitle.textContent = isRegister ? t("auth.register") : t("auth.login");
  authSubmit.textContent = isRegister ? t("auth.create") : t("auth.login");
  emailField.setAttribute("aria-hidden", String(!isRegister));
  emailInput.required = isRegister;
  emailInput.disabled = !isRegister;
  emailInput.tabIndex = isRegister ? 0 : -1;
  confirmField.setAttribute("aria-hidden", String(!isRegister));
  confirmInput.required = isRegister;
  confirmInput.disabled = !isRegister;
  confirmInput.tabIndex = isRegister ? 0 : -1;
  if (!isRegister) {
    emailInput.value = "";
    confirmInput.value = "";
  }
  authTabs.forEach((tab) => {
    const active = tab.dataset.authMode === mode;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  authStatus.textContent = message;
  authStatus.className = "auth-status";
  requestAnimationFrame(updateAuthTabIndicator);
  if (animate && isChanging) {
    authForm.classList.remove("is-switching");
    void authForm.offsetWidth;
    authForm.classList.add("is-switching");
    window.clearTimeout(authSwitchTimer);
    authSwitchTimer = window.setTimeout(() => authForm.classList.remove("is-switching"), 280);
  }
};

const openAuth = (mode = "login", message = "") => {
  setAuthMode(mode, message, false);
  window.clearTimeout(authCloseTimer);
  modal.classList.remove("is-closing");
  if (modal.open) return;
  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.setAttribute("open", "");
  }
  requestAnimationFrame(updateAuthTabIndicator);
};

const closeAuth = () => {
  if (!modal.open || modal.classList.contains("is-closing")) return;
  modal.classList.add("is-closing");
  window.clearTimeout(authCloseTimer);
  authCloseTimer = window.setTimeout(() => {
    modal.classList.remove("is-closing");
    modal.close();
  }, 170);
};

openLogin.addEventListener("click", () => {
  if (sessionStorage.getItem("core_auth_token") && getSavedUser()?.username) {
    openAccount();
    return;
  }
  openAuth("login");
});
heroLogin.addEventListener("click", () => {
  if (sessionStorage.getItem("core_auth_token") && getSavedUser()?.username) {
    openAccount();
    return;
  }
  openAuth("login");
});
closeLogin.addEventListener("click", closeAuth);
closeAccount.addEventListener("click", closeAccountModal);
logoutAccount.addEventListener("click", () => {
  setLoggedOutView();
  closeAdminView();
  closeAccountModal();
});
accountAvatarButton?.addEventListener("click", () => {
  accountAvatarInput?.click();
});
accountAvatarInput?.addEventListener("change", async () => {
  const file = accountAvatarInput.files?.[0];
  const user = getSavedUser();
  if (!file || !user?.username) return;

  if (file.size > 700 * 1024) {
    passwordStatus.textContent = t("account.avatarTooLarge");
    passwordStatus.className = "account-status is-error";
    accountAvatarInput.value = "";
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", async () => {
    try {
      const response = await fetch("/api/v1/account/avatar", {
        method: "POST",
        headers: getAuthHeaders(true),
        body: JSON.stringify({
          username: user.username,
          avatar: String(reader.result || ""),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || t("account.avatarError"));
      setSavedUser(result.user);
      renderAccount(result.user, lastAccountOrders);
      passwordStatus.textContent = "";
      passwordStatus.className = "account-status";
    } catch (error) {
      passwordStatus.textContent = error.message || t("account.avatarError");
      passwordStatus.className = "account-status is-error";
    } finally {
      accountAvatarInput.value = "";
    }
  });
  reader.readAsDataURL(file);
});
accountModal.addEventListener("click", (event) => {
  if (event.target === accountModal) closeAccountModal();
});
accountModal.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeAccountModal();
});
accountProductLinks.forEach((link) => {
  link.addEventListener("click", () => closeAccountModal());
});
openAdminPanel?.addEventListener("click", openAdminView);
backToAccount?.addEventListener("click", closeAdminView);
authTabs.forEach((tab) => {
  tab.addEventListener("click", () => setAuthMode(tab.dataset.authMode));
});
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeAuth();
});
modal.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeAuth();
});

langSwitch.addEventListener("click", () => {
  setLangMenuOpen(!langPicker.classList.contains("is-open"));
});

langOptions.forEach((option) => {
  option.addEventListener("click", () => {
    selectedLang = option.dataset.lang;
    localStorage.setItem("core_site_web_lang", selectedLang);
    setLangMenuOpen(false);
    applyTranslations();
  });
});

document.addEventListener("click", (event) => {
  if (!langPicker.contains(event.target) && !langMenu.contains(event.target)) {
    setLangMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setLangMenuOpen(false);
  }
});

window.addEventListener("resize", () => {
  if (langPicker.classList.contains("is-open")) {
    updateLangMenuPosition();
  }
  if (modal.open) {
    updateAuthTabIndicator();
  }
});

window.addEventListener(
  "scroll",
  () => {
    if (langPicker.classList.contains("is-open")) {
      updateLangMenuPosition();
    }
  },
  { passive: true },
);

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  authStatus.textContent = authMode === "register" ? t("messages.creating") : t("messages.checking");
  authStatus.className = "auth-status";
  authSubmit.disabled = true;

  const formData = new FormData(authForm);
  const payload = {
    username: String(formData.get("username") || "").trim(),
    password: String(formData.get("password") || ""),
  };

  try {
    if (authMode === "register") {
      const email = String(formData.get("email") || "").trim();
      if (!isValidEmail(email)) {
        throw new Error(t("messages.emailInvalid"));
      }
      if (payload.password !== String(formData.get("confirmPassword") || "")) {
        throw new Error(t("messages.passwordsMismatch"));
      }
      payload.email = email;
    }

    const endpoint = authMode === "register" ? "/api/v1/auth/register" : "/api/v1/auth/login";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(translateError(response, result.message));
    }

    sessionStorage.setItem("core_auth_token", result.token);
    setSavedUser(result.user);
    authStatus.textContent = authMode === "register" ? t("messages.registered") : t("messages.ready").replace("{name}", result.user.name);
    authStatus.classList.add("is-success");
    setTimeout(closeAuth, 700);
  } catch (error) {
    authStatus.textContent = error.message;
    authStatus.classList.add("is-error");
  } finally {
    authSubmit.disabled = false;
  }
});

async function loadProducts() {
  if (!productGrid) return;

  try {
    const response = await fetch("/api/v1/web/store/products");
    productsCache = await response.json();
    renderProducts();
    renderAdminProductOptions();
    honorFooterHash();
  } catch {
    productGrid.innerHTML = "";
  }
}

function getCheckoutProduct(productId) {
  return productsCache.find((product) => product.id === productId) || null;
}

function openCheckout(productId) {
  const product = getCheckoutProduct(productId);
  if (!product || !checkoutModal || !checkoutForm) return;

  currentCheckoutProduct = product;
  const translated = t(`products.items.${product.id}`);
  const productName = Array.isArray(translated) ? translated[0] : product.name;
  const user = getSavedUser() || {};

  checkoutForm.reset();
  checkoutTitle.textContent = productName;
  checkoutProductName.textContent = productName;
  checkoutPrice.textContent = formatPrice(product.price);
  checkoutStatus.textContent = "";
  checkoutStatus.className = "checkout-status";
  const emailInput = checkoutForm.elements.receiptEmail;
  if (emailInput) {
    emailInput.value = user.email || "";
  }

  window.clearTimeout(checkoutCloseTimer);
  checkoutModal.classList.remove("is-closing");
  if (!checkoutModal.open) {
    if (typeof checkoutModal.showModal === "function") {
      checkoutModal.showModal();
    } else {
      checkoutModal.setAttribute("open", "");
    }
  }
}

function closeCheckoutModal() {
  if (!checkoutModal?.open || checkoutModal.classList.contains("is-closing")) return;
  checkoutModal.classList.add("is-closing");
  window.clearTimeout(checkoutCloseTimer);
  checkoutCloseTimer = window.setTimeout(() => {
    checkoutModal.classList.remove("is-closing");
    checkoutModal.close();
  }, 170);
}

productGrid?.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-product]");
  if (!button) return;

  const token = sessionStorage.getItem("core_auth_token");
  if (!token) {
    openAuth("register", t("messages.registerRequired"));
    return;
  }

  openCheckout(button.dataset.product);
});

closeCheckout?.addEventListener("click", closeCheckoutModal);
checkoutModal?.addEventListener("click", (event) => {
  if (event.target === checkoutModal) closeCheckoutModal();
});

// ⚠️ ИЗМЕНЕНО: только FunPay, редирект на https://funpay.com/users/15116287/
checkoutForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentCheckoutProduct) return;

  const user = getSavedUser() || {};
  const formData = new FormData(checkoutForm);
  const receiptEmail = String(formData.get("receiptEmail") || "").trim();
  const promoCode = String(formData.get("promoCode") || "").trim();

  checkoutStatus.className = "checkout-status";
  
  if (!isValidEmail(receiptEmail)) {
    checkoutStatus.textContent = t("checkout.emailInvalid");
    checkoutStatus.classList.add("is-error");
    return;
  }

  // Всегда используем FunPay
  const paymentProvider = "funpay";

  checkoutSubmit.disabled = true;
  checkoutStatus.textContent = t("checkout.opening");

  try {
    const response = await fetch("/api/v1/orders", {
      method: "POST",
      headers: getAuthHeaders(true),
      body: JSON.stringify({
        productId: currentCheckoutProduct.id,
        contact: user.username || receiptEmail,
        paymentProvider: "funpay",
        receiptEmail: receiptEmail,
        promoCode: promoCode,
      }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || t("checkout.orderError"));
    if (result.user) {
      setSavedUser(result.user);
    }

    // ✅ Перенаправляем на FunPay
    window.location.href = "https://funpay.com/users/15116287/";
    
  } catch (error) {
    checkoutStatus.textContent = error.message || t("checkout.orderError");
    checkoutStatus.classList.add("is-error");
    checkoutSubmit.disabled = false;
  }
});

const adminActionFields = {
  "issue-subscription": {
    product: { required: true },
    duration: { placeholderKey: "admin.durationPlaceholder" },
    value: { placeholderKey: "adminPlaceholders.subscriptionTitle" },
  },
  "revoke-subscription": {},
  ban: {
    value: { placeholderKey: "adminPlaceholders.banReason" },
  },
  unban: {},
  "reset-hwid": {},
  "set-uid": {
    value: { placeholderKey: "adminPlaceholders.uid" },
  },
  "reset-password": {
    value: { placeholderKey: "adminPlaceholders.password" },
  },
  "reset-email": {
    value: { placeholderKey: "adminPlaceholders.email" },
  },
  "set-group": {
    group: { required: true },
  },
  "delete-account": {},
};

function setAdminActionField(element, config) {
  if (!element) return;
  const visible = Boolean(config);
  if (!element.dataset.fieldName && element.name) {
    element.dataset.fieldName = element.name;
  }

  element.hidden = !visible;
  element.disabled = !visible;
  element.required = Boolean(config?.required);
  element.setAttribute("aria-hidden", String(!visible));

  if (visible) {
    element.name = element.dataset.fieldName || element.name;
    if ((config?.placeholder || config?.placeholderKey) && "placeholder" in element) {
      element.placeholder = config.placeholderKey ? t(config.placeholderKey) : config.placeholder;
    }
    if (element.tagName === "SELECT" && !element.value && element.options.length) {
      element.selectedIndex = 0;
    }
    return;
  }

  element.value = "";
  element.required = false;
  element.removeAttribute("name");
}

function updateAdminActionFields() {
  if (!adminActionSelect) return;
  const fields = adminActionFields[adminActionSelect.value] || {};

  setAdminActionField(adminActionProduct, fields.product);
  setAdminActionField(adminActionGroup, fields.group);
  setAdminActionField(adminActionDuration, fields.duration);
  setAdminActionField(adminActionValue, fields.value);
}

adminActionSelect?.addEventListener("change", () => {
  updateAdminActionFields();
  if (adminActionStatus) {
    adminActionStatus.className = "account-status";
    adminActionStatus.textContent = "";
  }
});
updateAdminActionFields();

adminUserActionForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(adminUserActionForm);
  const action = String(formData.get("action") || "");
  const fields = adminActionFields[action] || {};
  const payload = {
    targetUserId: String(formData.get("targetUserId") || ""),
    action,
  };
  if (fields.product) payload.productId = String(formData.get("productId") || "");
  if (fields.duration) payload.durationDays = String(formData.get("durationDays") || "").trim();
  if (fields.group) payload.value = String(formData.get("group") || "").trim();
  if (fields.value) payload.value = String(formData.get("value") || "").trim();

  const submitButton = adminUserActionForm.querySelector("button");
  adminActionStatus.className = "account-status";
  adminActionStatus.textContent = adminText.loading;
  submitButton.disabled = true;

  try {
    const response = await fetch("/api/v1/admin/users/action", {
      method: "POST",
      headers: getAuthHeaders(true),
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || adminText.requestError);

    adminActionStatus.textContent = result.temporaryPassword
      ? `${adminText.actionDone} ${adminText.newPassword}: ${result.temporaryPassword}`
      : adminText.actionDone;
    adminActionStatus.classList.add("is-success");
    adminUserActionForm.reset();
    updateAdminActionFields();
    await loadAdminOverview();
  } catch (error) {
    adminActionStatus.textContent = error.message || adminText.requestError;
    adminActionStatus.classList.add("is-error");
  } finally {
    submitButton.disabled = false;
  }
});

adminKeyGenerateForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(adminKeyGenerateForm);
  const payload = {
    productId: String(formData.get("productId") || ""),
    durationDays: String(formData.get("durationDays") || "").trim(),
    amount: String(formData.get("amount") || "1").trim(),
    maxActivations: String(formData.get("maxActivations") || "1").trim(),
    title: String(formData.get("title") || "").trim(),
  };
  const submitButton = adminKeyGenerateForm.querySelector("button");
  adminKeyStatus.className = "account-status";
  adminKeyStatus.textContent = adminText.loading;
  adminGeneratedKeys.innerHTML = "";
  submitButton.disabled = true;

  try {
    const response = await fetch("/api/v1/admin/keys", {
      method: "POST",
      headers: getAuthHeaders(true),
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || adminText.requestError);

    adminKeyStatus.textContent = adminText.keyDone;
    adminKeyStatus.classList.add("is-success");
    renderAdminKeys(result.keys || [], adminGeneratedKeys);
    adminKeyGenerateForm.reset();
    await loadAdminOverview();
  } catch (error) {
    adminKeyStatus.textContent = error.message || adminText.requestError;
    adminKeyStatus.classList.add("is-error");
  } finally {
    submitButton.disabled = false;
  }
});

adminPromoForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(adminPromoForm);
  const payload = {
    code: String(formData.get("code") || "").trim(),
    title: String(formData.get("title") || "").trim(),
    discountPercent: String(formData.get("discountPercent") || "10").trim(),
    maxActivations: String(formData.get("maxActivations") || "1").trim(),
    expiresAt: String(formData.get("expiresAt") || "").trim(),
  };
  const submitButton = adminPromoForm.querySelector("button");
  adminPromoStatus.className = "account-status";
  adminPromoStatus.textContent = adminText.loading;
  submitButton.disabled = true;

  try {
    const response = await fetch("/api/v1/admin/promocodes", {
      method: "POST",
      headers: getAuthHeaders(true),
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || adminText.requestError);

    adminPromoStatus.textContent = adminText.promoCreated;
    adminPromoStatus.classList.add("is-success");
    adminPromoForm.reset();
    const discountInput = adminPromoForm.elements.discountPercent;
    const activationsInput = adminPromoForm.elements.maxActivations;
    if (discountInput) discountInput.value = "10";
    if (activationsInput) activationsInput.value = "1";
    await loadAdminOverview();
  } catch (error) {
    adminPromoStatus.textContent = error.message || adminText.requestError;
    adminPromoStatus.classList.add("is-error");
  } finally {
    submitButton.disabled = false;
  }
});

adminPromosList?.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-promo-action]");
  if (!button) return;

  const code = String(button.dataset.promo || "").trim();
  if (!code) return;

  adminPromoStatus.className = "account-status";
  if (!window.confirm(tr("adminText.deletePromoConfirm", { code }))) {
    adminPromoStatus.textContent = "";
    return;
  }

  adminPromoStatus.textContent = adminText.loading;
  button.disabled = true;

  try {
    const response = await fetch("/api/v1/admin/promocodes", {
      method: "DELETE",
      headers: getAuthHeaders(true),
      body: JSON.stringify({ code }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || adminText.requestError);

    adminPromoStatus.textContent = adminText.promoDeleted;
    adminPromoStatus.classList.add("is-success");
    await loadAdminOverview();
  } catch (error) {
    adminPromoStatus.textContent = error.message || adminText.requestError;
    adminPromoStatus.classList.add("is-error");
  } finally {
    button.disabled = false;
  }
});

adminKeysList?.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-key-action]");
  if (!button) return;

  const row = button.closest(".admin-key-row");
  const key = String(button.dataset.key || "").trim();
  const action = button.dataset.keyAction;
  if (!row || !key) return;

  adminKeyStatus.className = "account-status";
  adminKeyStatus.textContent = adminText.loading;
  button.disabled = true;

  try {
    if (action === "delete") {
      if (!window.confirm(tr("adminText.deleteKeyConfirm", { key }))) {
        adminKeyStatus.textContent = "";
        return;
      }

      const response = await fetch("/api/v1/admin/keys", {
        method: "DELETE",
        headers: getAuthHeaders(true),
        body: JSON.stringify({ key }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || adminText.requestError);
      adminKeyStatus.textContent = adminText.keyDeleted;
    } else if (action === "save") {
      const productId = row.querySelector("[data-key-product]")?.value || "";
      const maxActivations = row.querySelector("[data-key-activations]")?.value || "1";
      const productName = productDisplayName(productId);
      const response = await fetch("/api/v1/admin/keys", {
        method: "PATCH",
        headers: getAuthHeaders(true),
        body: JSON.stringify({
          key,
          productId,
          maxActivations,
          title: productName,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || adminText.requestError);
      adminKeyStatus.textContent = adminText.keySaved;
    }

    adminKeyStatus.classList.add("is-success");
    await loadAdminOverview();
  } catch (error) {
    adminKeyStatus.textContent = error.message || adminText.requestError;
    adminKeyStatus.classList.add("is-error");
  } finally {
    button.disabled = false;
  }
});

keyForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const user = getSavedUser();
  const formData = new FormData(keyForm);
  const activationKey = String(formData.get("activationKey") || "").trim();
  const submitButton = keyForm.querySelector("button");
  keyStatus.className = "account-status";
  keyForm.classList.remove("is-error", "is-success");

  if (!activationKey) {
    keyStatus.textContent = accountText.activateEmpty;
    keyStatus.classList.add("is-error");
    keyForm.classList.add("is-error");
    return;
  }

  keyStatus.textContent = accountText.activateChecking;
  submitButton.disabled = true;

  try {
    const response = await fetch("/api/v1/account/activate-key", {
      method: "POST",
      headers: getAuthHeaders(true),
      body: JSON.stringify({
        username: user?.username,
        key: activationKey,
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      if (response.status === 404) throw new Error(accountText.activateNotFound);
      if (response.status === 409) throw new Error(result.message || accountText.activateUsed);
      throw new Error(result.message || accountText.activateError);
    }

    setSavedUser(result.user);
    renderAccount(result.user, result.orders || []);
    keyStatus.textContent = accountText.activateSuccess;
    keyStatus.classList.add("is-success");
    keyForm.classList.add("is-success");
    keyForm.reset();
  } catch (error) {
    keyStatus.textContent = error.message || accountText.activateError;
    keyStatus.classList.add("is-error");
    keyForm.classList.add("is-error");
  } finally {
    submitButton.disabled = false;
  }
});

passwordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const user = getSavedUser();
  const formData = new FormData(passwordForm);
  const currentPassword = String(formData.get("currentPassword") || "");
  const nextPassword = String(formData.get("nextPassword") || "");
  const repeatPassword = String(formData.get("repeatPassword") || "");
  passwordStatus.className = "account-status";

  if (nextPassword !== repeatPassword) {
    passwordStatus.textContent = accountText.passwordMismatch;
    passwordStatus.classList.add("is-error");
    return;
  }

  if (nextPassword.length < 4) {
    passwordStatus.textContent = accountText.passwordShort;
    passwordStatus.classList.add("is-error");
    return;
  }

  try {
    const response = await fetch("/api/v1/account/change-password", {
      method: "POST",
      headers: getAuthHeaders(true),
      body: JSON.stringify({
        username: user.username,
        currentPassword,
        nextPassword,
      }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || accountText.passwordError);
    setSavedUser(result.user);
    passwordStatus.textContent = accountText.passwordSuccess;
    passwordStatus.classList.add("is-success");
    passwordForm.reset();
  } catch (error) {
    passwordStatus.textContent = error.message || accountText.passwordError;
    passwordStatus.classList.add("is-error");
  }
});

function createParticleField() {
  const canvas = document.querySelector("#particleField");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const particles = [
    { x: 0.008, y: 0.188, radius: 0.9, alpha: 0.11, speed: 0.06 },
    { x: 0.089, y: 0.427, radius: 3.0, alpha: 0.16, speed: 0.05 },
    { x: 0.31, y: 0.456, radius: 2.8, alpha: 0.19, speed: 0.045 },
    { x: 0.54, y: 0.272, radius: 1.2, alpha: 0.15, speed: 0.04 },
    { x: 0.68, y: 0.316, radius: 2.1, alpha: 0.13, speed: 0.055 },
    { x: 0.683, y: 0.353, radius: 2.9, alpha: 0.18, speed: 0.05 },
    { x: 0.815, y: 0.338, radius: 1.1, alpha: 0.14, speed: 0.05 },
    { x: 0.922, y: 0.303, radius: 1.0, alpha: 0.11, speed: 0.045 },
    { x: 0.116, y: 0.646, radius: 2.0, alpha: 0.15, speed: 0.052 },
    { x: 0.15, y: 0.535, radius: 1.2, alpha: 0.13, speed: 0.045 },
    { x: 0.13, y: 0.559, radius: 1.1, alpha: 0.11, speed: 0.047 },
    { x: 0.296, y: 0.54, radius: 1.8, alpha: 0.13, speed: 0.06 },
    { x: 0.255, y: 0.74, radius: 2.8, alpha: 0.12, speed: 0.05 },
    { x: 0.571, y: 0.869, radius: 1.6, alpha: 0.1, speed: 0.042 },
    { x: 0.761, y: 0.843, radius: 2.9, alpha: 0.16, speed: 0.044 },
  ];
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  const start = performance.now();

  const resize = () => {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * pixelRatio);
    canvas.height = Math.floor(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const draw = () => {
    const elapsed = (performance.now() - start) / 1000;
    ctx.clearRect(0, 0, width, height);

    particles.forEach((point, index) => {
      const floatY = Math.sin(elapsed * point.speed + index) * 7;
      const pulse = Math.sin(elapsed * 0.65 + index * 0.7) * 0.025;
      const x = point.x * width;
      const y = point.y * height + floatY;

      ctx.beginPath();
      ctx.arc(x, y, point.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(142, 150, 180, ${Math.max(0.035, point.alpha + pulse)})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener("resize", resize);
}

function prepareWaveReveal(targets, className = "wave-reveal", delayStep = 90, maxDelay = 360) {
  const elements = Array.from(targets).filter(Boolean);
  elements.forEach((element, index) => {
    element.classList.add(className);
    element.style.setProperty("--wave-delay", `${Math.min(index * delayStep, maxDelay)}ms`);
  });
  return elements;
}

function setupWaveReveal() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = [
    ...prepareWaveReveal([document.querySelector(".nav-shell"), document.querySelector(".hero-copy")], "soft-reveal", 80, 160),
    ...prepareWaveReveal(document.querySelectorAll(".section-panel"), "panel-reveal", 100, 220),
    ...prepareWaveReveal(document.querySelectorAll(".section-heading"), "wave-reveal", 120, 260),
    ...prepareWaveReveal(document.querySelectorAll(".info-card"), "card-reveal", 95, 320),
  ];

  if (reduceMotion || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".soft-reveal, .panel-reveal, .wave-reveal, .card-reveal").forEach((element) => {
      element.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealTargets.forEach((element) => observer.observe(element));
  window.coreWaveObserver = observer;
}

createParticleField();
applyTranslations();
setupWaveReveal();
loadProducts();
honorFooterHash();