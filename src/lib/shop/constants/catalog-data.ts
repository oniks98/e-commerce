export interface CatalogCategory {
  id: string;
  name: string;
  href: string;
  subcategories?: CatalogSubcategory[];
}

export interface CatalogSubcategory {
  id: string;
  name: string;
  href: string;
}

export const catalogData: CatalogCategory[] = [
  {
    id: 'sistema-rozumnij-budinok',
    name: 'Система Розумний будинок',
    href: '/catalog/sistema-rozumnij-budinok',
    subcategories: [
      { id: 'obladnannya-dlya-sistemi-rozumnij-budinok', name: 'Обладнання для системи Розумний будинок', href: '/catalog/sistema-rozumnij-budinok/obladnannya-dlya-sistemi-rozumnij-budinok' },
      { id: 'ustanovka-sistemi-rozumnij-budinok', name: 'Установка системи Розумний будинок', href: '/catalog/sistema-rozumnij-budinok/ustanovka-sistemi-rozumnij-budinok' },
      { id: 'sistema-rozumnij-budinok-dlya-zhitlovih-kompleksiv', name: 'Система Розумний будинок для житлових комплексів', href: '/catalog/sistema-rozumnij-budinok/sistema-rozumnij-budinok-dlya-zhitlovih-kompleksiv' },
    ],
  },
  {
    id: 'videosposterezhennya',
    name: 'Відеоспостереження',
    href: '/catalog/videosposterezhennya',
    subcategories: [
      { id: 'videokameri-dlya-videosposterezhennya', name: 'Відеокамери для відеоспостереження', href: '/catalog/videosposterezhennya/videokameri-dlya-videosposterezhennya' },
      { id: 'videoreyestratori', name: 'Відеореєстратори', href: '/catalog/videosposterezhennya/videoreyestratori' },
      { id: 'nakopichuvachi-dlya-videosposterezhennya', name: 'Накопичувачі для відеоспостереження', href: '/catalog/videosposterezhennya/nakopichuvachi-dlya-videosposterezhennya' },
      { id: 'komplektuyuchi-dlya-videosposterezhennya', name: 'Комплектуючі для відеоспостереження', href: '/catalog/videosposterezhennya/komplektuyuchi-dlya-videosposterezhennya' },
    ],
  },
  {
    id: 'domofoni',
    name: 'Домофони',
    href: '/catalog/domofoni',
    subcategories: [
      { id: 'videodomofoni', name: 'Відеодомофони', href: '/catalog/domofoni/videodomofoni' },
      { id: 'viklichni-videopaneli', name: 'Викличні відеопанелі', href: '/catalog/domofoni/viklichni-videopaneli' },
      { id: 'peregovorni-pristroyi', name: 'Переговорні пристрої', href: '/catalog/domofoni/peregovorni-pristroyi' },
      { id: 'komplektuyuchi-dlya-domofoniv', name: 'Комплектуючі для домофонів', href: '/catalog/domofoni/komplektuyuchi-dlya-domofoniv' },
    ],
  },
  {
    id: 'teplovizori-ratsiyi-droni',
    name: 'Тепловізори, рації, дрони',
    href: '/catalog/teplovizori-ratsiyi-droni',
    subcategories: [
      { id: 'teplovizori', name: 'Тепловізори', href: '/catalog/teplovizori-ratsiyi-droni/teplovizori' },
      { id: 'ratsiyi', name: 'Рації', href: '/catalog/teplovizori-ratsiyi-droni/ratsiyi' },
      { id: 'droni', name: 'Дрони', href: '/catalog/teplovizori-ratsiyi-droni/droni' },
    ],
  },
  {
    id: 'ohoronno-pozhezhna-signalizatsiya',
    name: 'Охоронно-пожежна сигналізація',
    href: '/catalog/ohoronno-pozhezhna-signalizatsiya',
    subcategories: [
      { id: 'signalizatsiya-lun', name: 'Сигналізація Лунь', href: '/catalog/ohoronno-pozhezhna-signalizatsiya/signalizatsiya-lun' },
      { id: 'signalizatsiya-ajax', name: 'Сигналізація Ajax', href: '/catalog/ohoronno-pozhezhna-signalizatsiya/signalizatsiya-ajax' },
      { id: 'signalizatsiya-dahua-technology', name: 'Сигналізація Dahua Technology', href: '/catalog/ohoronno-pozhezhna-signalizatsiya/signalizatsiya-dahua-technology' },
      { id: 'signalizatsiya-hikvision', name: 'Сигналізація Hikvision', href: '/catalog/ohoronno-pozhezhna-signalizatsiya/signalizatsiya-hikvision' },
      { id: 'komplektuyuchi-dlya-signalizatsiyi', name: 'Комплектуючі для сигналізації', href: '/catalog/ohoronno-pozhezhna-signalizatsiya/komplektuyuchi-dlya-signalizatsiyi' },
    ],
  },
  {
    id: 'sistemi-kontrolyu-dostupu-i-obliku-robochogo-chasu',
    name: 'Системи контролю доступу і обліку робочого часу',
    href: '/catalog/sistemi-kontrolyu-dostupu-i-obliku-robochogo-chasu',
    subcategories: [
        { id: 'zamki-i-turniketi', name: 'Замки и турнікети', href: '/catalog/sistemi-kontrolyu-dostupu-i-obliku-robochogo-chasu/zamki-i-turniketi' },
        { id: 'karti-breloki', name: 'Карти, брелоки', href: '/catalog/sistemi-kontrolyu-dostupu-i-obliku-robochogo-chasu/karti-breloki' },
        { id: 'terminali', name: 'Термінали', href: '/catalog/sistemi-kontrolyu-dostupu-i-obliku-robochogo-chasu/terminali' },
        { id: 'knopki-vihodu', name: 'Кнопки виходу', href: '/catalog/sistemi-kontrolyu-dostupu-i-obliku-robochogo-chasu/knopki-vihodu' },
        { id: 'zchituvachi', name: 'Зчитувачі', href: '/catalog/sistemi-kontrolyu-dostupu-i-obliku-robochogo-chasu/zchituvachi' },
        { id: 'kontroleri', name: 'Контролери', href: '/catalog/sistemi-kontrolyu-dostupu-i-obliku-robochogo-chasu/kontroleri' },
        { id: 'komplektuyuchi-dlya-kontrolyu-dostupu', name: 'Комплектуючі для контролю доступу', href: '/catalog/sistemi-kontrolyu-dostupu-i-obliku-robochogo-chasu/komplektuyuchi-dlya-kontrolyu-dostupu' },
    ],
  },
  {
    id: 'merezheve-obladnannya',
    name: 'Мережеве обладнання',
    href: '/catalog/merezheve-obladnannya',
    subcategories: [
        { id: 'serverni-shafi', name: 'Серверні шафи', href: '/catalog/merezheve-obladnannya/serverni-shafi' },
        { id: 'serverni-stiyki', name: 'Серверні стійки', href: '/catalog/merezheve-obladnannya/serverni-stiyki' },
        { id: 'patch-paneli', name: 'Патч-панелі', href: '/catalog/merezheve-obladnannya/patch-paneli' },
        { id: 'kabel-vita-para', name: 'Кабель вита пара', href: '/catalog/merezheve-obladnannya/kabel-vita-para' },
        { id: 'komutatori', name: 'Комутатори', href: '/catalog/merezheve-obladnannya/komutatori' },
        { id: 'marshrutizatori', name: 'Маршрутизатори', href: '/catalog/merezheve-obladnannya/marshrutizatori' },
        { id: 'tochki-dostupu', name: 'Точки доступу', href: '/catalog/merezheve-obladnannya/tochki-dostupu' },
    ],
  },
  {
    id: 'suputnikove-telebachennya',
    name: 'Супутникове телебачення',
    href: '/catalog/suputnikove-telebachennya',
    subcategories: [
        { id: 'suputnikovi-tyuneri', name: 'Супутникові тюнери', href: '/catalog/suputnikove-telebachennya/suputnikovi-tyuneri' },
        { id: 'suputnikovi-anteni', name: 'Супутникові антени', href: '/catalog/suputnikove-telebachennya/suputnikovi-anteni' },
        { id: 'konvertori-dlya-suputnikovogo-tv', name: 'Конвертори для супутникового ТВ', href: '/catalog/suputnikove-telebachennya/konvertori-dlya-suputnikovogo-tv' },
        { id: 'komplektuyuchi-dlya-suputnikovogo-tv', name: 'Комплектуючі для супутникового ТВ', href: '/catalog/suputnikove-telebachennya/komplektuyuchi-dlya-suputnikovogo-tv' },
    ],
  },
  {
    id: 't2-tsifrove-telebachennya',
    name: 'Т2 цифрове телебачення',
    href: '/catalog/t2-tsifrove-telebachennya',
    subcategories: [
        { id: 'tyuner-t2-pristavka', name: 'Тюнер Т2 приставка', href: '/catalog/t2-tsifrove-telebachennya/tyuner-t2-pristavka' },
        { id: 'antena-t2', name: 'Антена т2', href: '/catalog/t2-tsifrove-telebachennya/antena-t2' },
        { id: 'komplektuyuchi-dlya-t2', name: 'Комплектуючі для т2', href: '/catalog/t2-tsifrove-telebachennya/komplektuyuchi-dlya-t2' },
    ],
  },
  {
    id: 'pristavka-smart-tv-android',
    name: 'Приставка смарт тв Android',
    href: '/catalog/pristavka-smart-tv-android',
    subcategories: [],
  },
  {
    id: 'dzherela-zhivlennya',
    name: 'Джерела живлення',
    href: '/catalog/dzherela-zhivlennya',
    subcategories: [
        { id: 'dzherela-bezperebiynogo-zhivlennya-12-24v', name: 'Джерела безперебійного живлення 12-24В', href: '/catalog/dzherela-zhivlennya/dzherela-bezperebiynogo-zhivlennya-12-24v' },
        { id: 'dbzh-invertori-stabilizatori-220v', name: 'ДБЖ, інвертори, стабілізатори 220В', href: '/catalog/dzherela-zhivlennya/dbzh-invertori-stabilizatori-220v' },
        { id: 'bloki-zhivlennya', name: 'Блоки живлення', href: '/catalog/dzherela-zhivlennya/bloki-zhivlennya' },
        { id: 'svintsevi-akumulyatori', name: 'Свинцеві акумулятори', href: '/catalog/dzherela-zhivlennya/svintsevi-akumulyatori' },
        { id: 'litievi-akumulyatori', name: 'Літієві акумулятори', href: '/catalog/dzherela-zhivlennya/litievi-akumulyatori' },
        { id: 'sistemi-nakopichennya-energiyi-bess', name: 'Системи накопичення енергії ВЕЅЅ', href: '/catalog/dzherela-zhivlennya/sistemi-nakopichennya-energiyi-bess' },
        { id: 'invertori', name: 'Інвертори', href: '/catalog/dzherela-zhivlennya/invertori' },
        { id: 'avtonomni-sistemi-zhivlennya', name: 'Автономні системи живлення', href: '/catalog/dzherela-zhivlennya/avtonomni-sistemi-zhivlennya' },
        { id: 'zaryadni-stantsiyi', name: 'Зарядні станції', href: '/catalog/dzherela-zhivlennya/zaryadni-stantsiyi' },
    ],
  },
  {
    id: 'vstanovlennya-i-remont-obladnannya',
    name: 'Встановлення і ремонт обладнання',
    href: '/catalog/vstanovlennya-i-remont-obladnannya',
    subcategories: [
      { id: 'ustanovka-videosposterezhennya', name: 'Установка відеоспостереження', href: '/catalog/vstanovlennya-i-remont-obladnannya/ustanovka-videosposterezhennya' },
      { id: 'ustanovka-domofoniv', name: 'Установка домофонів', href: '/catalog/vstanovlennya-i-remont-obladnannya/ustanovka-domofoniv' },
      { id: 'vstanovlennya-ohoronno-pozhezhnoyi-signalizatsiyi', name: 'Встановлення охоронно-пожежної сигналізації', href: '/catalog/vstanovlennya-i-remont-obladnannya/vstanovlennya-ohoronno-pozhezhnoyi-signalizatsiyi' },
      { id: 'vstanovlennya-kontrolyu-dostupu-obliku-chasu', name: 'Встановлення контролю доступу, обліку часу', href: '/catalog/vstanovlennya-i-remont-obladnannya/vstanovlennya-kontrolyu-dostupu-obliku-chasu' },
      { id: 'ozvuchuvannya-primischen', name: 'Озвучування приміщень', href: '/catalog/vstanovlennya-i-remont-obladnannya/ozvuchuvannya-primischen' },
      { id: 'ustanovka-anten', name: 'Установка антен', href: '/catalog/vstanovlennya-i-remont-obladnannya/ustanovka-anten' },
      { id: 'montazh-kompyuternih-merezh', name: "Монтаж комп'ютерних мереж", href: '/catalog/vstanovlennya-i-remont-obladnannya/montazh-kompyuternih-merezh' },
      { id: 'remont-audio-video-ohoronnih-sistem', name: 'Ремонт аудіо, відео, охоронних систем', href: '/catalog/vstanovlennya-i-remont-obladnannya/remont-audio-video-ohoronnih-sistem' },
    ],
  },
  {
    id: 'tovari-na-rozetka',
    name: 'Товари на розетка',
    href: '/catalog/tovari-na-rozetka',
    subcategories: [],
  },
  {
    id: 'tovari-na-prom',
    name: 'Товари на пром',
    href: '/catalog/tovari-na-prom',
    subcategories: [
        { id: 'signalizatsiya-lun', name: 'Сигналізація Лунь', href: '/catalog/tovari-na-prom/signalizatsiya-lun' },
        { id: 'telebachennya', name: 'Телебачення', href: '/catalog/tovari-na-prom/telebachennya' },
        { id: 'merezheve-obladnannya', name: 'Мережеве обладнання', href: '/catalog/tovari-na-prom/merezheve-obladnannya' },
        { id: 'bezpeka-i-rozumnij-budinok', name: 'Безпека і Розумний Будинок', href: '/catalog/tovari-na-prom/bezpeka-i-rozumnij-budinok' },
    ],
  },
];