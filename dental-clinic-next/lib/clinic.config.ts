/* =====================================================================
   CLINIC CONFIG — the only file you need to edit for a new client.
   Every text field that the visitor sees has az / ru / en versions.
   ===================================================================== */
import type { ClinicConfig } from "./types";

export const clinic: ClinicConfig = {
  // Final public address of the site (used for SEO, sitemap, hreflang)
  siteUrl: "https://smiledental.az",

  // ---- Brand ---------------------------------------------------------
  name: "Smile Dental",
  logoText: "Smile",
  logoAccent: "Dental",
  logoImage: "", // e.g. "/images/logo.svg" — if set, replaces the text logo

  theme: {
    primary: "#0f8b8d",     // main brand colour (buttons, links)
    primaryDark: "#0a6567", // hover / dark sections
    accent: "#f2b84b",      // stars, small highlights
  },

  defaultLang: "az", // language for visitors whose browser language isn't az/ru/en

  // ---- Contact -------------------------------------------------------
  phone: "+994 12 555 12 34",
  phoneRaw: "+994125551234",
  whatsapp: "994505551234", // digits only, no "+"
  email: "info@smiledental.az",
  address: {
    az: "Nizami küç. 123, Səbail r., Bakı",
    ru: "ул. Низами 123, Сабаильский р-н, Баку",
    en: "123 Nizami St, Sabail district, Baku",
  },
  landmark: {
    az: "«28 May» metrosundan 5 dəqiqə",
    ru: "5 минут от метро «28 Мая»",
    en: "5 min walk from “28 May” metro",
  },
  // Google Maps → Share → Embed a map → copy the src="..." URL
  mapEmbed: "https://www.google.com/maps?q=40.3795,49.8484&z=16&output=embed",
  mapLink: "https://maps.google.com/?q=40.3795,49.8484",
  geo: { lat: 40.3795, lng: 49.8484 },

  // schemaDays (English day names) feeds Google's structured data
  hours: [
    { days: { az: "B.e. – Cümə", ru: "Пн – Пт", en: "Mon – Fri" }, time: "09:00 – 20:00",
      schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
    { days: { az: "Şənbə", ru: "Суббота", en: "Saturday" }, time: "10:00 – 18:00", schemaDays: ["Saturday"] },
    { days: { az: "Bazar", ru: "Воскресенье", en: "Sunday" }, time: null }, // null = closed
  ],

  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "",
  },

  // ---- Hero ----------------------------------------------------------
  hero: {
    title: {
      az: "Sağlam gülüş — <span>ağrısız</span> və rahat",
      ru: "Здоровая улыбка — <span>без боли</span> и стресса",
      en: "A healthy smile — <span>pain-free</span> and calm",
    },
    subtitle: {
      az: "Bakının mərkəzində müasir stomatologiya klinikası. Implantasiya, breketlər, estetik müalicə və uşaq stomatologiyası — hamısı bir ünvanda.",
      ru: "Современная стоматология в центре Баку. Имплантация, брекеты, эстетическое лечение и детская стоматология — всё в одном месте.",
      en: "A modern dental clinic in central Baku. Implants, braces, cosmetic treatment and kids’ dentistry — all under one roof.",
    },
    image: "", // e.g. "/images/hero.jpg" — leave empty for the illustrated version
  },

  stats: [
    { value: "12+", label: { az: "il təcrübə", ru: "лет опыта", en: "years of practice" } },
    { value: "15 000+", label: { az: "razı pasiyent", ru: "довольных пациентов", en: "happy patients" } },
    { value: "4.9", label: { az: "Google reytinqi", ru: "рейтинг Google", en: "Google rating" } },
  ],

  // ---- Services (icon: tooth | implant | braces | sparkle | shield | child | crown | xray)
  currency: "₼",
  services: [
    {
      icon: "shield", price: 40,
      name: { az: "Peşəkar gigiyena", ru: "Профгигиена", en: "Professional cleaning" },
      desc: { az: "Ultrasəs təmizləmə, Air-Flow və cilalama.", ru: "Ультразвуковая чистка, Air-Flow и полировка.", en: "Ultrasonic scaling, Air-Flow and polishing." },
    },
    {
      icon: "tooth", price: 50,
      name: { az: "Kariyes müalicəsi", ru: "Лечение кариеса", en: "Fillings & caries" },
      desc: { az: "Fotopolimer plomblar, mikroskop altında kanal müalicəsi.", ru: "Светоотверждаемые пломбы, лечение каналов под микроскопом.", en: "Composite fillings and root canals under a microscope." },
    },
    {
      icon: "implant", price: 900,
      name: { az: "İmplantasiya", ru: "Имплантация", en: "Dental implants" },
      desc: { az: "İsveçrə və Koreya implantları, ömürlük zəmanət.", ru: "Швейцарские и корейские импланты, пожизненная гарантия.", en: "Swiss & Korean implants with a lifetime warranty." },
    },
    {
      icon: "braces", price: 1200,
      name: { az: "Breketlər və eleynerlər", ru: "Брекеты и элайнеры", en: "Braces & aligners" },
      desc: { az: "Metal, keramik breketlər və şəffaf kapalar.", ru: "Металлические, керамические брекеты и прозрачные капы.", en: "Metal and ceramic braces, clear aligners." },
    },
    {
      icon: "sparkle", price: 250,
      name: { az: "Ağartma", ru: "Отбеливание", en: "Teeth whitening" },
      desc: { az: "Bir seansda 8 tona qədər ağ diş.", ru: "До 8 тонов светлее за один визит.", en: "Up to 8 shades whiter in one visit." },
    },
    {
      icon: "crown", price: 350,
      name: { az: "Vinirlər və tac", ru: "Виниры и коронки", en: "Veneers & crowns" },
      desc: { az: "Sirkonium və E-max — təbii görünüş.", ru: "Цирконий и E-max — естественный вид.", en: "Zirconia and E-max for a natural look." },
    },
    {
      icon: "child", price: 30,
      name: { az: "Uşaq stomatologiyası", ru: "Детская стоматология", en: "Kids’ dentistry" },
      desc: { az: "Uşaqlar üçün qorxusuz, oyun formatında qəbul.", ru: "Приём без страха в игровой форме.", en: "Fear-free visits in a playful format." },
    },
    {
      icon: "xray", price: 20,
      name: { az: "3D rentgen (KT)", ru: "3D-снимок (КТ)", en: "3D X-ray (CBCT)" },
      desc: { az: "Dəqiq diaqnostika, nəticə 10 dəqiqəyə.", ru: "Точная диагностика, результат за 10 минут.", en: "Precise diagnostics, results in 10 minutes." },
    },
  ],

  // ---- Why us --------------------------------------------------------
  features: [
    {
      title: { az: "Ağrısız müalicə", ru: "Лечение без боли", en: "Pain-free treatment" },
      text: { az: "Müasir anesteziya və sakit mühit.", ru: "Современная анестезия и спокойная атмосфера.", en: "Modern anaesthesia and a calm environment." },
    },
    {
      title: { az: "Şəffaf qiymətlər", ru: "Прозрачные цены", en: "Transparent prices" },
      text: { az: "Müalicə planı və qiymət əvvəlcədən razılaşdırılır.", ru: "План лечения и стоимость согласуются заранее.", en: "Treatment plan and cost agreed upfront." },
    },
    {
      title: { az: "Steril təhlükəsizlik", ru: "Стерильность", en: "Sterile safety" },
      text: { az: "B sinif avtoklav və birdəfəlik alətlər.", ru: "Автоклав класса B и одноразовые инструменты.", en: "Class B autoclave and single-use tools." },
    },
    {
      title: { az: "Hissə-hissə ödəniş", ru: "Рассрочка", en: "Instalments" },
      text: { az: "0% faizlə 12 aya qədər taksit (Birkart, Tamkart).", ru: "Рассрочка до 12 месяцев под 0% (Birkart, Tamkart).", en: "0% instalments up to 12 months (Birkart, Tamkart)." },
    },
  ],

  // ---- Doctors (photo optional — initials are shown if empty) --------
  doctors: [
    {
      name: "Dr. Leyla Məmmədova", photo: "",
      role: { az: "Baş həkim, ortoped", ru: "Главный врач, ортопед", en: "Chief dentist, prosthodontist" },
      exp: 18,
    },
    {
      name: "Dr. Rəşad Əliyev", photo: "",
      role: { az: "Cərrah-implantoloq", ru: "Хирург-имплантолог", en: "Implant surgeon" },
      exp: 14,
    },
    {
      name: "Dr. Nigar Hüseynova", photo: "",
      role: { az: "Ortodont", ru: "Ортодонт", en: "Orthodontist" },
      exp: 10,
    },
    {
      name: "Dr. Elvin Quliyev", photo: "",
      role: { az: "Uşaq stomatoloqu", ru: "Детский стоматолог", en: "Paediatric dentist" },
      exp: 8,
    },
  ],

  // ---- Reviews -------------------------------------------------------
  reviews: [
    {
      name: "Aynur K.", rating: 5, source: "Google",
      text: {
        az: "İmplant qoydurdum, heç ağrı hiss etmədim. Həkimlər çox diqqətlidir, hər addımı izah etdilər.",
        ru: "Ставила имплант — совсем не было больно. Врачи очень внимательные, объясняли каждый шаг.",
        en: "Got an implant and felt no pain at all. The doctors were very attentive and explained every step.",
      },
    },
    {
      name: "Тимур Р.", rating: 5, source: "Instagram",
      text: {
        az: "Uşağımı ilk dəfə stomatoloqa apardım — qorxmadı, hətta yenə gəlmək istəyir!",
        ru: "Впервые привёл ребёнка к стоматологу — не испугался и даже хочет прийти снова!",
        en: "First dentist visit for my son — he wasn’t scared and even wants to come back!",
      },
    },
    {
      name: "Kamran M.", rating: 5, source: "Google",
      text: {
        az: "Qiymətlər əvvəlcədən deyildi, sonradan heç bir sürpriz olmadı. Klinika çox təmiz və rahatdır.",
        ru: "Цены назвали заранее, никаких сюрпризов потом. Клиника очень чистая и уютная.",
        en: "Prices were clear upfront with no surprises later. Very clean and comfortable clinic.",
      },
    },
  ],

  // ---- FAQ -----------------------------------------------------------
  faq: [
    {
      q: { az: "İlk konsultasiya pulsuzdur?", ru: "Первая консультация бесплатная?", en: "Is the first consultation free?" },
      a: { az: "Bəli, ilk müayinə və müalicə planı pulsuzdur.", ru: "Да, первичный осмотр и план лечения бесплатны.", en: "Yes, the first check-up and treatment plan are free." },
    },
    {
      q: { az: "Taksitlə ödəmək olar?", ru: "Можно оплатить в рассрочку?", en: "Can I pay in instalments?" },
      a: { az: "Bəli, Birkart və Tamkart ilə 12 aya qədər 0% taksit mümkündür.", ru: "Да, рассрочка до 12 месяцев под 0% по картам Birkart и Tamkart.", en: "Yes, 0% instalments for up to 12 months with Birkart and Tamkart." },
    },
    {
      q: { az: "Təcili ağrı ilə gələ bilərəm?", ru: "Можно прийти с острой болью?", en: "Can I come in with acute pain?" },
      a: { az: "Bəli, təcili hallarda eyni gün qəbul edirik — sadəcə zəng edin.", ru: "Да, при острой боли принимаем в тот же день — просто позвоните.", en: "Yes, we see emergencies the same day — just call us." },
    },
    {
      q: { az: "İmplantlara zəmanət verirsiniz?", ru: "Даёте гарантию на импланты?", en: "Do you guarantee implants?" },
      a: { az: "Bəli, implantlara istehsalçının ömürlük zəmanəti, işə isə klinikanın zəmanəti var.", ru: "Да, на импланты — пожизненная гарантия производителя, на работу — гарантия клиники.", en: "Yes — lifetime manufacturer warranty on implants plus our clinic warranty on the work." },
    },
  ],

  // ---- SEO -----------------------------------------------------------
  seo: {
    title: {
      az: "Smile Dental — Bakıda stomatologiya klinikası",
      ru: "Smile Dental — стоматология в Баку",
      en: "Smile Dental — Dental clinic in Baku",
    },
    description: {
      az: "Bakının mərkəzində müasir stomatologiya: implant, breket, ağartma, uşaq stomatologiyası. Pulsuz konsultasiya.",
      ru: "Современная стоматология в центре Баку: импланты, брекеты, отбеливание, детская стоматология. Бесплатная консультация.",
      en: "Modern dentistry in central Baku: implants, braces, whitening, kids’ dentistry. Free consultation.",
    },
  },
};
