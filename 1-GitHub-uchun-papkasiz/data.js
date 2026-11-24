/* =========================================================
   SAYYOH TRAVEL — sayt sozlamalari va turlar bazasi
   Bu faylni tahrirlab yangi tur, narx, sana qo'shishingiz mumkin.
   ========================================================= */
window.SITE = {
  brand: "Mo'jaz",
  brandSub: "travel & adventures",
  youtubeId: "y-46aImm6uA",
  phone: "+998 91 810 05 35",
  whatsapp: "998918100535",
  telegram: "mujaz_",          // t.me/<username>
  email: "gulsevarmamatkarimova11@gmail.com",
  address: { uz: "Jizzax sh., Jizzaxlik MFY, Ulug'bek ko'chasi", en: "Ulugbek St, Jizzakhlik mahalla, Jizzakh, Uzbekistan", ru: "г. Джизак, махалля Джизаклик, ул. Улугбека" },
  license: "Litsenziya № T-0000 (O'zbekiston Turizm qo'mitasi)",
  rating: 4.9, reviewsCount: 1240,
  depositPercent: 30,
  rates: { UZS: 12800, USD: 1, EUR: 0.92 },
  socials: { instagram: "https://instagram.com/", facebook: "https://facebook.com/", youtube: "https://youtube.com/", telegram: "https://t.me/mujaz_" }
};

/* ---------- YO'NALISHLAR (Destinations) ---------- */
window.DESTINATIONS = [
  { id: "samarkand", scene: "city", hue: 0, name: { uz: "Samarqand", en: "Samarkand", ru: "Самарканд" } },
  { id: "bukhara", scene: "city2", hue: 1, name: { uz: "Buxoro", en: "Bukhara", ru: "Бухара" } },
  { id: "khiva", scene: "fortress", hue: 0, name: { uz: "Xiva va Xorazm", en: "Khiva & Khorezm", ru: "Хива и Хорезм" } },
  { id: "tashkent", scene: "modern", hue: 0, name: { uz: "Toshkent", en: "Tashkent", ru: "Ташкент" }, sub: { uz: "Chorsu bozori · metro", en: "Chorsu Bazaar · metro", ru: "Базар Чорсу · метро" } },
  { id: "chimgan", scene: "mountain", hue: 0, name: { uz: "Chimyon va Chorvoq", en: "Chimgan & Charvak", ru: "Чимган и Чарвак" } },
  { id: "urungach", scene: "lake", hue: 0, name: { uz: "Urungʻoch · Nefrit koʻli", en: "Urungach · Jade Lake", ru: "Урунгач · Нефритовое озеро" } },
  { id: "fergana", scene: "valley", hue: 0, name: { uz: "Farg'ona vodiysi", en: "Fergana Valley", ru: "Ферганская долина" } },
  { id: "nurata", scene: "desert", hue: 0, name: { uz: "Nurota va Aydarko'l", en: "Nurata & Aydarkul", ru: "Нурата и Айдаркуль" } },
  { id: "karakalpakstan", scene: "aral", hue: 0, name: { uz: "Qoraqalpog'iston", en: "Karakalpakstan", ru: "Каракалпакстан" } },
  { id: "surkhandarya", scene: "ruins", hue: 0, name: { uz: "Surxondaryo", en: "Surkhandarya", ru: "Сурхандарья" } },
  { id: "zaamin", scene: "forest", hue: 0, name: { uz: "Zomin", en: "Zaamin", ru: "Заамин" } },
  { id: "shahrisabz", scene: "city3", hue: 0, name: { uz: "Shahrisabz", en: "Shakhrisabz", ru: "Шахрисабз" } }
];

/* ---------- FAOLIYATLAR (Activities) ---------- */
window.ACTIVITIES = [
  { id: "trekking", scene: "mountain", icon: "🥾", name: { uz: "Treking", en: "Trekking", ru: "Треккинг" } },
  { id: "hiking", scene: "forest", icon: "🌲", name: { uz: "Piyoda sayr (hiking)", en: "Hiking", ru: "Хайкинг" } },
  { id: "cycling", scene: "valley", icon: "🚴", name: { uz: "Velosayohat", en: "Cycling", ru: "Велотуры" } },
  { id: "horse", scene: "valley", icon: "🐎", name: { uz: "Ot minish", en: "Horse Riding", ru: "Конные туры" } },
  { id: "daytrip", scene: "lake", icon: "☀️", name: { uz: "Bir kunlik sayohat", en: "Day Trips", ru: "Однодневные туры" } },
  { id: "culture", scene: "city2", icon: "🕌", name: { uz: "Madaniy tur", en: "Culture Tours", ru: "Культурные туры" } },
  { id: "adventure", scene: "river", icon: "🧗", name: { uz: "Sarguzasht turi", en: "Adventure Tours", ru: "Приключенческие туры" } },
  { id: "desert", scene: "desert", icon: "🐪", name: { uz: "Tuya va cho'l", en: "Camel & Desert", ru: "Верблюды и пустыня" } },
  { id: "food", scene: "ikat", icon: "🍲", name: { uz: "Osh va taomlar", en: "Food Tours", ru: "Гастро-туры" } },
  { id: "crafts", scene: "ikat2", icon: "🧵", name: { uz: "Hunarmandchilik", en: "Crafts", ru: "Ремёсла" } },
  { id: "ski", scene: "snow", icon: "⛷️", name: { uz: "Tog' chang'isi", en: "Skiing", ru: "Горные лыжи" } },
  { id: "rafting", scene: "river", icon: "🛶", name: { uz: "Rafting", en: "Rafting", ru: "Рафтинг" } },
  { id: "pilgrimage", scene: "city3", icon: "🤲", name: { uz: "Ziyorat", en: "Pilgrimage", ru: "Паломничество" } },
  { id: "photo", scene: "aral", icon: "📷", name: { uz: "Foto-tur", en: "Photo Tours", ru: "Фототуры" } }
];

/* ---------- TO'PLAMLAR (Collections) ---------- */
window.COLLECTIONS = [
  { id: "bestsellers", scene: "city", name: { uz: "Eng ko'p sotilgan", en: "Best Sellers", ru: "Хиты продаж" } },
  { id: "new", scene: "river", name: { uz: "Yangi sayohatlar", en: "New Adventures", ru: "Новые туры" } },
  { id: "premium", scene: "lake", name: { uz: "Premium", en: "Premium", ru: "Премиум" } },
  { id: "silkroad", scene: "city2", name: { uz: "Ipak yo'li klassikasi", en: "Silk Road Classics", ru: "Классика Шёлкового пути" } },
  { id: "navruz", scene: "ikat", name: { uz: "Navro'z bayrami", en: "Navruz Festival", ru: "Праздник Навруз" } },
  { id: "winter", scene: "snow", name: { uz: "Qishki sarguzasht", en: "Winter Escapes", ru: "Зимние приключения" } },
  { id: "weekend", scene: "forest", name: { uz: "Dam olish kunlari", en: "Weekend Breaks", ru: "Туры выходного дня" } },
  { id: "solo", scene: "desert", name: { uz: "Yakka sayohatchilar uchun", en: "Solo-friendly", ru: "Для соло-путешественников" } },
  { id: "family", scene: "valley", name: { uz: "Oilaviy", en: "Family", ru: "Семейные" } },
  { id: "ultimate", scene: "aral", name: { uz: "Ulkan sarguzashtlar", en: "Ultimate Adventures", ru: "Большие экспедиции" } }
];

/* ---------- TURLAR ----------
   type: "inbound" (xorijliklar uchun kirish turizmi) | "domestic" (ichki turizm)
   price: USD da, kishi boshiga. singleSup: yakka xona qo'shimcha to'lovi.
   every: necha kunda bir jo'nash (sanalar avtomatik yaratiladi), weekday: 6 = shanba
   img: ixtiyoriy — "xxx.jpg" qo'ysangiz SVG o'rniga foto chiqadi.
------------------------------------------------------------- */
window.TOURS = [
  {
    id: "silk-road-classic", type: ["inbound", "domestic"], scene: "city", img: "",
    regions: ["tashkent", "samarkand", "bukhara", "khiva"], activities: ["culture", "food", "photo"],
    collections: ["bestsellers", "silkroad", "solo"], days: 8, difficulty: 1, group: 12, price: 1290, oldPrice: 1450, singleSup: 240,
    rating: 4.9, reviews: 318, every: 7, start: "Toshkent",
    title: { uz: "Buyuk Ipak yo'li klassikasi", en: "Great Silk Road Classic", ru: "Классика Великого Шёлкового пути" },
    summary: { uz: "Toshkent, Samarqand, Buxoro va Xiva — to'rt afsonaviy shahar, tezyurar Afrosiyob poyezdi va mahalliy oilada osh tayyorlash.", en: "Tashkent, Samarkand, Bukhara and Khiva — four legendary cities, the high-speed Afrosiyob train and a home-cooked plov masterclass.", ru: "Ташкент, Самарканд, Бухара и Хива — четыре легендарных города, скоростной «Афросиёб» и мастер-класс по плову в семье." },
    highlights: { uz: ["Registon maydonida quyosh botishi", "Buxoroning tirik muzey-shahri", "Ichan-qal'a devorlarida tun", "Mahalliy oilada osh ustaxonasi"], en: ["Sunset at Registan Square", "Bukhara's living museum city", "A night inside Itchan Kala walls", "Plov masterclass with a local family"] },
    itinerary: [
      { uz: ["Toshkentga xush kelibsiz", "Aeroportda kutib olish, Chorsu bozori, Hazrati Imom majmuasi va kechki ziyofat."], en: ["Welcome to Tashkent", "Airport pick-up, Chorsu Bazaar, Hazrati Imam complex and welcome dinner."] },
      { uz: ["Afrosiyob poyezdida Samarqandga", "Registon, Go'ri Amir, Shohi Zinda ansambli."], en: ["Afrosiyob train to Samarkand", "Registan, Gur-e-Amir and Shah-i-Zinda necropolis."] },
      { uz: ["Samarqand: qog'oz va ipak", "Konigil qog'oz ustaxonasi, Ulug'bek rasadxonasi, osh ustaxonasi."], en: ["Samarkand: paper & silk", "Konigil paper mill, Ulugbek Observatory, plov masterclass."] },
      { uz: ["Buxoroga yo'l", "Labi Hovuz, Poi Kalon, savdo gumbazlari."], en: ["Onward to Bukhara", "Lyabi-Hauz, Poi Kalyan and trading domes."] },
      { uz: ["Buxoro to'liq kun", "Ark qal'asi, Sitorai Mohi Xosa, hunarmandlar mahallasi."], en: ["Bukhara in full", "The Ark, Sitorai Mohi Khosa palace and artisan quarter."] },
      { uz: ["Qizilqum orqali Xivaga", "Amudaryo bo'ylab manzarali yo'l."], en: ["Across Kyzylkum to Khiva", "Scenic drive along the Amu Darya."] },
      { uz: ["Ichan-qal'a", "Kalta minor, Juma masjidi, quyosh botishini devordan kuzatish."], en: ["Itchan Kala", "Kalta Minor, Juma Mosque and sunset from the walls."] },
      { uz: ["Xayrlashuv", "Urganch aeroportiga transfer."], en: ["Farewell", "Transfer to Urgench airport."] }
    ]
  },
  {
    id: "chimgan-trek", type: ["domestic"], scene: "mountain", img: "",
    regions: ["chimgan"], activities: ["trekking"], collections: ["weekend", "solo", "bestsellers"],
    days: 2, difficulty: 3, group: 16, price: 95, singleSup: 20, rating: 4.8, reviews: 412, every: 7, weekday: 6, start: "Toshkent",
    title: { uz: "Katta Chimyon cho'qqisiga treking", en: "Big Chimgan Summit Trek", ru: "Треккинг на Большой Чимган" },
    summary: { uz: "3309 m balandlikdagi cho'qqiga chiqish, tog' lagerida tun va Chorvoq suv omboriga panorama.", en: "Summit the 3,309 m peak, overnight at a mountain camp and enjoy panoramic Charvak views.", ru: "Восхождение на пик 3309 м, ночь в горном лагере и панорама Чарвака." },
    highlights: { uz: ["3309 m cho'qqi", "Gulxan atrofida kechki ovqat", "Professional tog' gidi", "Barcha jihozlar ijarasi"], en: ["3,309 m summit", "Campfire dinner", "Certified mountain guide", "All gear available to rent"] },
    itinerary: [
      { uz: ["Toshkent — Chimyon", "Ertalab jo'nash, Gulkam soyligiga yurish, lagerda tun."], en: ["Tashkent — Chimgan", "Morning departure, hike to Gulkam gorge, camp overnight."] },
      { uz: ["Cho'qqi kuni", "Tongda cho'qqiga hujum, tushdan keyin Toshkentga qaytish."], en: ["Summit day", "Dawn summit push, return to Tashkent in the afternoon."] }
    ]
  },
  {
    id: "aydarkul-yurt", type: ["domestic", "inbound"], scene: "desert", img: "",
    regions: ["nurata"], activities: ["desert", "photo", "horse"], collections: ["weekend", "family", "solo"],
    days: 2, difficulty: 1, group: 14, price: 140, singleSup: 30, rating: 4.9, reviews: 276, every: 7, weekday: 6, start: "Samarqand",
    title: { uz: "Aydarko'l va yurtada tun", en: "Aydarkul Lake & Yurt Camp", ru: "Айдаркуль и ночь в юрте" },
    summary: { uz: "Qizilqum cho'li, tuyada sayr, ko'l bo'yida cho'milish va yulduzlar ostida oqin qo'shiqlari.", en: "Kyzylkum desert, camel rides, a swim in the lake and akyn songs beneath the stars.", ru: "Пустыня Кызылкум, катание на верблюдах, купание в озере и песни акына под звёздами." },
    highlights: { uz: ["Tuyada sayr", "Ko'lda cho'milish", "Qozoq yurtasida tun", "Gulxan va oqin"], en: ["Camel ride", "Swim in Aydarkul", "Night in a Kazakh yurt", "Campfire with a folk singer"] },
    itinerary: [
      { uz: ["Nurota — yurta lageri", "Nurota buloq-masjidi, cho'lga yo'l, tuyada sayr, gulxan."], en: ["Nurata — yurt camp", "Nurata spring mosque, desert drive, camel ride, campfire."] },
      { uz: ["Aydarko'l", "Tong, ko'lda cho'milish, baliqli tushlik va qaytish."], en: ["Aydarkul Lake", "Sunrise, lake swim, fish lunch and return."] }
    ]
  },
  {
    id: "fergana-crafts", type: ["inbound", "domestic"], scene: "ikat2", img: "",
    regions: ["fergana"], activities: ["crafts", "culture", "food"], collections: ["new", "family"],
    days: 4, difficulty: 1, group: 12, price: 420, singleSup: 90, rating: 4.8, reviews: 98, every: 14, start: "Toshkent",
    title: { uz: "Farg'ona vodiysi hunarmandlari", en: "Fergana Valley Artisans", ru: "Мастера Ферганской долины" },
    summary: { uz: "Marg'ilon atlas fabrikasi, Rishton kulollari va Qo'qon xon saroyi — qo'l mehnati sirlari bilan tanishuv.", en: "Margilan silk workshops, Rishtan potters and the Kokand Khan's palace — meet the masters of handcraft.", ru: "Шёлк Маргилана, керамика Риштана и дворец Худояр-хана в Коканде." },
    highlights: { uz: ["Yodgorlik atlas fabrikasi", "Rishton kulolchilik ustaxonasi", "Xudoyorxon saroyi", "Qamchiq dovoni manzarasi"], en: ["Yodgorlik silk factory", "Rishtan pottery class", "Khudayar Khan Palace", "Kamchik pass views"] },
    itinerary: [
      { uz: ["Qamchiq dovoni orqali", "Toshkentdan vodiyga manzarali yo'l, Qo'qon."], en: ["Over the Kamchik Pass", "Scenic drive from Tashkent into the valley, Kokand."] },
      { uz: ["Marg'ilon", "Atlas va adras to'qish, Kumtepa bozori."], en: ["Margilan", "Ikat silk weaving and Kumtepa bazaar."] },
      { uz: ["Rishton", "Ustoz kulol bilan o'z piyolangizni yasang."], en: ["Rishtan", "Throw your own bowl with a master potter."] },
      { uz: ["Qaytish", "Farg'ona — Toshkent poyezdi."], en: ["Return", "Fergana — Tashkent train."] }
    ]
  },
  {
    id: "khiva-karakalpak", type: ["inbound"], scene: "fortress", img: "",
    regions: ["khiva", "karakalpakstan"], activities: ["culture", "photo", "desert"], collections: ["ultimate", "silkroad"],
    days: 5, difficulty: 2, group: 10, price: 690, singleSup: 140, rating: 4.9, reviews: 121, every: 14, start: "Urganch",
    title: { uz: "Xorazm qal'alari va Orol dengizi", en: "Desert Fortresses & the Aral Sea", ru: "Крепости Хорезма и Аральское море" },
    summary: { uz: "Elliq-qal'a qadimiy qal'alari, Mo'ynoqdagi kemalar qabristoni va Savitskiy muzeyi.", en: "Ancient Elliq-Kala fortresses, the ship graveyard of Muynak and the Savitsky Museum.", ru: "Древние крепости Эллик-Калы, кладбище кораблей в Муйнаке и музей Савицкого." },
    highlights: { uz: ["Ayozqal'ada yurtada tun", "Mo'ynoq kemalari", "Savitskiy muzeyi", "Ichan-qal'a"], en: ["Yurt night at Ayaz-Kala", "Muynak ship graveyard", "Savitsky Museum", "Itchan Kala"] },
    itinerary: [
      { uz: ["Xiva", "Ichan-qal'a bo'ylab sayr."], en: ["Khiva", "Walking tour of Itchan Kala."] },
      { uz: ["Elliq-qal'a", "Tuproqqal'a, Qizilqal'a, Ayozqal'ada yurtada tun."], en: ["Elliq-Kala", "Toprak-Kala, Kyzyl-Kala, yurt camp at Ayaz-Kala."] },
      { uz: ["Nukus", "Savitskiy san'at muzeyi."], en: ["Nukus", "Savitsky art museum."] },
      { uz: ["Mo'ynoq", "Kemalar qabristoni va Orol tarixi muzeyi."], en: ["Muynak", "Ship graveyard and Aral history museum."] },
      { uz: ["Yakun", "Nukus aeroportiga transfer."], en: ["Departure", "Transfer to Nukus airport."] }
    ]
  },
  {
    id: "zaamin-hike", type: ["domestic"], scene: "forest", img: "",
    regions: ["zaamin"], activities: ["trekking", "horse"], collections: ["new", "family", "weekend"],
    days: 3, difficulty: 2, group: 14, price: 160, singleSup: 35, rating: 4.7, reviews: 87, every: 7, weekday: 5, start: "Toshkent",
    title: { uz: "Zomin archazorlari bo'ylab", en: "Zaamin Juniper Forest Hike", ru: "Хайкинг по арчевым лесам Заамина" },
    summary: { uz: "\"O'zbek Shveytsariyasi\" — archa o'rmonlari, tog' sharsharalari va otda sayr.", en: "The \"Uzbek Switzerland\" — juniper forests, mountain waterfalls and horseback rides.", ru: "«Узбекская Швейцария» — арчовые леса, водопады и конные прогулки." },
    highlights: { uz: ["Zomin milliy bog'i", "Otda sayr", "Tog' sharsharasi", "Sanatoriyda dam"], en: ["Zaamin National Park", "Horseback ride", "Mountain waterfall", "Spa resort stay"] },
    itinerary: [
      { uz: ["Zominga yo'l", "Tushdan keyin o'rmonga yengil yurish."], en: ["Drive to Zaamin", "Easy afternoon forest walk."] },
      { uz: ["Sharshara treki", "12 km yurish, piknik tushlik."], en: ["Waterfall trek", "12 km hike with picnic lunch."] },
      { uz: ["Otda sayr va qaytish", ""], en: ["Horse ride & return", ""] }
    ]
  },
  {
    id: "amirsoy-ski", type: ["domestic", "inbound"], scene: "snow", img: "",
    regions: ["chimgan"], activities: ["ski"], collections: ["winter", "premium", "family"],
    days: 3, difficulty: 2, group: 20, price: 310, singleSup: 80, rating: 4.8, reviews: 154, every: 7, weekday: 5, start: "Toshkent", season: [12, 1, 2, 3],
    title: { uz: "Amirsoy: tog' chang'isi dam olishi", en: "Amirsoy Ski Weekend", ru: "Амирсой: горнолыжный уикенд" },
    summary: { uz: "Zamonaviy kurort, instruktor bilan darslar, gondola va issiq choy bilan tog' kafesi.", en: "Modern resort, lessons with instructors, gondola rides and a cosy mountain café.", ru: "Современный курорт, занятия с инструктором, гондола и уютное горное кафе." },
    highlights: { uz: ["2 kunlik ski-pass", "Instruktor bilan dars", "Shale mehmonxona", "Transfer"], en: ["2-day ski pass", "Lesson with instructor", "Chalet hotel", "Transfers"] },
    itinerary: [
      { uz: ["Kurortga yetib kelish", "Jihozlarni olish, birinchi tushish."], en: ["Arrive at the resort", "Gear fitting and first runs."] },
      { uz: ["To'liq chang'i kuni", "Instruktor bilan dars, kechqurun SPA."], en: ["Full ski day", "Lesson with instructor, evening spa."] },
      { uz: ["Ertalabki tushish va qaytish", ""], en: ["Morning runs & return", ""] }
    ]
  },
  {
    id: "termez-boysun", type: ["inbound", "domestic"], scene: "ruins", img: "",
    regions: ["surkhandarya"], activities: ["culture", "pilgrimage", "trekking"], collections: ["new", "ultimate"],
    days: 4, difficulty: 2, group: 12, price: 480, singleSup: 100, rating: 4.8, reviews: 63, every: 14, start: "Termiz",
    title: { uz: "Termiz va Boysun: Buddizm izlari", en: "Termez & Boysun: Buddhist Trail", ru: "Термез и Байсун: буддийский след" },
    summary: { uz: "Fayoztepa va Qoratepa buddaviy ibodatxonalari, Al-Hakim at-Termiziy maqbarasi va UNESCO e'tirof etgan Boysun madaniyati.", en: "Fayaz Tepe and Kara Tepe Buddhist monasteries, the Al-Hakim at-Termizi mausoleum and Boysun's UNESCO-listed culture.", ru: "Буддийские монастыри Фаяз-тепа и Кара-тепа, мавзолей ат-Термизи и культура Байсуна (ЮНЕСКО)." },
    highlights: { uz: ["Fayoztepa", "Sulton Saodat majmuasi", "Boysun qishlog'ida mehmondorchilik", "Darband darasi"], en: ["Fayaz Tepe", "Sultan Saodat complex", "Village homestay in Boysun", "Darband gorge"] },
    itinerary: [
      { uz: ["Termiz", "Arxeologiya muzeyi, Al-Hakim at-Termiziy."], en: ["Termez", "Archaeology museum, Al-Hakim at-Termizi."] },
      { uz: ["Buddaviy yodgorliklar", "Fayoztepa, Qoratepa, Zurmala stupasi."], en: ["Buddhist sites", "Fayaz Tepe, Kara Tepe, Zurmala stupa."] },
      { uz: ["Boysun", "Tog' qishlog'i, folklor dasturi, uyda tunash."], en: ["Boysun", "Mountain village, folk show, homestay."] },
      { uz: ["Qaytish", ""], en: ["Return", ""] }
    ]
  },
  {
    id: "samarkand-weekend", type: ["domestic"], scene: "city3", img: "",
    regions: ["samarkand", "shahrisabz"], activities: ["culture", "food"], collections: ["weekend", "bestsellers", "family"],
    days: 2, difficulty: 1, group: 20, price: 180, singleSup: 40, rating: 4.9, reviews: 530, every: 7, weekday: 6, start: "Toshkent",
    title: { uz: "Samarqand dam olish kunlari", en: "Samarkand Weekend Escape", ru: "Самарканд на выходные" },
    summary: { uz: "Afrosiyob poyezdi, Registondagi yorug'lik shousi, \"Abadiy shahar\" va Shahrisabzdagi Oqsaroy.", en: "Afrosiyob train, the Registan light show, the Eternal City and Ak-Saray in Shakhrisabz.", ru: "«Афросиёб», световое шоу на Регистане, «Вечный город» и Ак-Сарай в Шахрисабзе." },
    highlights: { uz: ["Tezyurar poyezd", "Registon yorug'lik shousi", "Abadiy shahar", "Oqsaroy"], en: ["High-speed train", "Registan light show", "Eternal City", "Ak-Saray palace"] },
    itinerary: [
      { uz: ["Samarqand", "Registon, Bibixonim, Siyob bozori, kechki shou."], en: ["Samarkand", "Registan, Bibi-Khanym, Siab bazaar, evening show."] },
      { uz: ["Shahrisabz", "Amir Temur vatani, qaytish poyezdi."], en: ["Shakhrisabz", "Tamerlane's birthplace, evening train back."] }
    ]
  },
  {
    id: "gastro-uzbekistan", type: ["inbound"], scene: "ikat", img: "",
    regions: ["tashkent", "samarkand", "bukhara"], activities: ["food", "culture", "crafts"], collections: ["premium", "new"],
    days: 6, difficulty: 1, group: 10, price: 890, singleSup: 180, rating: 5.0, reviews: 44, every: 14, start: "Toshkent",
    title: { uz: "O'zbek oshxonasi gastro-sayohati", en: "Flavours of Uzbekistan", ru: "Вкусы Узбекистана" },
    summary: { uz: "Osh markazi, tandir non, Samarqand vinochiligi va Buxoroda choyxona an'analari — ta'mlar orqali tarix.", en: "The Plov Center, tandoor bread, Samarkand wineries and Bukhara tea-house rituals — history through taste.", ru: "Центр плова, тандырные лепёшки, винодельни Самарканда и чайханы Бухары — история через вкус." },
    highlights: { uz: ["Besh qozon osh markazi", "Xovrenko vino zavodi", "Non yopish ustaxonasi", "Choyxona kechasi"], en: ["Besh Kazan Plov Center", "Khovrenko winery tasting", "Bread-baking workshop", "Tea-house evening"] },
    itinerary: [
      { uz: ["Toshkent ta'mlari", "Chorsu bozori va Besh qozon."], en: ["Tastes of Tashkent", "Chorsu Bazaar and Besh Kazan."] },
      { uz: ["Samarqand", "Non yopish, Xovrenko vino degustatsiyasi."], en: ["Samarkand", "Bread baking, Khovrenko wine tasting."] },
      { uz: ["Urgut", "Qishloq oilasida tushlik."], en: ["Urgut", "Lunch with a village family."] },
      { uz: ["Buxoro", "Choyxona, shirinliklar ustaxonasi."], en: ["Bukhara", "Tea-house, sweets workshop."] },
      { uz: ["Buxoro oshpazlik darsi", ""], en: ["Bukhara cooking class", ""] },
      { uz: ["Xayrlashuv", ""], en: ["Farewell", ""] }
    ]
  },
  {
    id: "bukhara-seven-pirs", type: ["domestic", "inbound"], scene: "city2", img: "",
    regions: ["bukhara"], activities: ["pilgrimage", "culture"], collections: ["bestsellers", "family"],
    days: 3, difficulty: 1, group: 25, price: 260, singleSup: 50, rating: 4.9, reviews: 389, every: 7, weekday: 4, start: "Toshkent",
    title: { uz: "Buxoro: Yetti pir ziyorati", en: "Bukhara: Seven Saints Pilgrimage", ru: "Бухара: паломничество к Семи святым" },
    summary: { uz: "Bahouddin Naqshband, Abduxoliq G'ijduvoniy va boshqa avliyolar maqbaralariga ziyorat, malakali ziyorat gidi bilan.", en: "Visit the shrines of Bahauddin Naqshband, Abdulkhaliq Gijduvani and other saints with an expert guide.", ru: "Посещение мавзолеев Бахауддина Накшбанда, Гиждувани и других святых с опытным гидом." },
    highlights: { uz: ["7 ta maqbara", "Ziyorat gidi", "Halol ovqatlanish", "Poyezd chiptalari"], en: ["7 sacred shrines", "Pilgrimage guide", "Halal meals", "Train tickets"] },
    itinerary: [
      { uz: ["Buxoroga poyezd", "Kechqurun eski shahar."], en: ["Train to Bukhara", "Evening in the old town."] },
      { uz: ["Yetti pir", "To'liq ziyorat kuni."], en: ["Seven Saints", "Full pilgrimage day."] },
      { uz: ["Qaytish", ""], en: ["Return", ""] }
    ]
  },
  {
    id: "chatkal-rafting", type: ["domestic"], scene: "river", img: "",
    regions: ["chimgan"], activities: ["rafting"], collections: ["weekend", "new", "solo"],
    days: 1, difficulty: 3, group: 24, price: 55, singleSup: 0, rating: 4.7, reviews: 201, every: 7, weekday: 0, start: "Toshkent", season: [5, 6, 7, 8, 9],
    title: { uz: "Chotqol daryosida rafting", en: "Chatkal River Rafting", ru: "Рафтинг по реке Чаткал" },
    summary: { uz: "II–III toifali ostonalar, tajribali instruktorlar va daryo bo'yida shashlik.", en: "Class II–III rapids, experienced instructors and a riverside barbecue.", ru: "Пороги II–III категории, опытные инструкторы и шашлык у реки." },
    highlights: { uz: ["12 km rafting", "Barcha jihozlar", "Shashlik tushlik", "Transfer"], en: ["12 km of rapids", "All equipment", "BBQ lunch", "Transfers"] },
    itinerary: [{ uz: ["Rafting kuni", "Ertalab jo'nash, brifing, 3 soat daryoda, tushlik, qaytish."], en: ["Rafting day", "Morning departure, briefing, 3 hours on the river, lunch, return."] }]
  },
  {
    id: "grand-uzbekistan", type: ["inbound"], scene: "lake", img: "",
    regions: ["tashkent", "samarkand", "bukhara", "khiva", "fergana", "chimgan"], activities: ["culture", "food", "crafts", "trekking"],
    collections: ["premium", "ultimate", "silkroad"], days: 12, difficulty: 2, group: 8, price: 2890, singleSup: 620,
    rating: 5.0, reviews: 57, every: 21, start: "Toshkent",
    title: { uz: "Premium: Butun O'zbekiston", en: "Premium Grand Uzbekistan", ru: "Премиум: весь Узбекистан" },
    summary: { uz: "Butik mehmonxonalar, shaxsiy gidlar va tog'dan cho'lgacha — mamlakatning eng yaxshi tomonlari bitta safarda.", en: "Boutique hotels, private guides and mountains to desert — the very best of the country in one journey.", ru: "Бутик-отели, частные гиды, от гор до пустыни — лучшее в одном путешествии." },
    highlights: { uz: ["Butik mehmonxonalar", "Kichik guruh (8 kishi)", "Ichki parvozlar", "Chimyonda shale"], en: ["Boutique hotels", "Small group (max 8)", "Domestic flights", "Mountain chalet stay"] },
    itinerary: [
      { uz: ["Toshkent", "Kutib olish, shahar bo'ylab kechki sayr."], en: ["Tashkent", "Arrival, evening city walk."] },
      { uz: ["Chimyon", "Tog'larda yengil treking."], en: ["Chimgan", "Easy mountain trek."] },
      { uz: ["Farg'ona", "Marg'ilon atlas ustaxonasi."], en: ["Fergana", "Margilan silk workshop."] },
      { uz: ["Rishton va Qo'qon", ""], en: ["Rishtan & Kokand", ""] },
      { uz: ["Samarqand", "Registon, Shohi Zinda."], en: ["Samarkand", "Registan, Shah-i-Zinda."] },
      { uz: ["Samarqand", "Vino degustatsiyasi."], en: ["Samarkand", "Wine tasting."] },
      { uz: ["Cho'l lageri", "Aydarko'l, yurta."], en: ["Desert camp", "Aydarkul, yurt."] },
      { uz: ["Buxoro", ""], en: ["Bukhara", ""] },
      { uz: ["Buxoro", "Shaxsiy tadbir: Nodir Devonbegi madrasasida kechki ovqat."], en: ["Bukhara", "Private dinner at Nadir Divan-Begi."] },
      { uz: ["Xivaga parvoz", ""], en: ["Fly to Khiva", ""] },
      { uz: ["Xiva", ""], en: ["Khiva", ""] },
      { uz: ["Xayrlashuv", ""], en: ["Farewell", ""] }
    ]
  },
  {
    id: "navruz-festival", type: ["inbound", "domestic"], scene: "ikat", img: "navruz.jpg",
    regions: ["samarkand", "bukhara", "tashkent"], activities: ["culture", "food"], collections: ["navruz", "bestsellers"],
    days: 7, difficulty: 1, group: 16, price: 1090, singleSup: 210, rating: 4.9, reviews: 76, every: 365, fixedDates: ["03-16"], start: "Toshkent",
    title: { uz: "Navro'z bayrami sayohati", en: "Navruz Spring Festival Tour", ru: "Тур на праздник Навруз" },
    summary: { uz: "Sumalak pishirish, ko'pkari, xalq sayillari va bahor nafasi — Navro'zni xalq bilan birga nishonlang.", en: "Cook sumalak overnight, watch kupkari horse games and celebrate the spring equinox with locals.", ru: "Сумаляк, улак-кпкари, народные гуляния — встречайте весну вместе с местными." },
    highlights: { uz: ["Sumalak kechasi", "Ko'pkari", "Navro'z sayli", "Milliy liboslar"], en: ["Sumalak night", "Kupkari horse game", "Navruz fair", "Traditional costumes"] },
    itinerary: [
      { uz: ["Toshkent", ""], en: ["Tashkent", ""] },
      { uz: ["Samarqand", ""], en: ["Samarkand", ""] },
      { uz: ["Sumalak kechasi", "Mahalla bilan birga."], en: ["Sumalak night", "With a local mahalla."] },
      { uz: ["Ko'pkari", ""], en: ["Kupkari", ""] },
      { uz: ["Buxoro", ""], en: ["Bukhara", ""] },
      { uz: ["Navro'z sayli", ""], en: ["Navruz fair", ""] },
      { uz: ["Xayrlashuv", ""], en: ["Farewell", ""] }
    ]
  }
];

/* ---------- SHARHLAR ---------- */
window.REVIEWS = [
  { name: "Emma W.", country: "🇬🇧 UK", tour: "silk-road-classic", stars: 5, text: { uz: "Hayotimdagi eng yaxshi sayohat! Gidimiz Dilshod har bir binoning tarixini ertakdek so'zlab berdi.", en: "Best trip of my life! Our guide Dilshod told the story of every building like a fairy tale.", ru: "Лучшее путешествие в моей жизни! Гид Дилшод рассказывал историю каждого здания как сказку." } },
  { name: "Aziza R.", country: "🇺🇿 Toshkent", tour: "chimgan-trek", stars: 5, text: { uz: "Yolg'iz bordim, do'stlar bilan qaytdim. Tashkilot a'lo, gidlar juda ehtiyotkor.", en: "Went alone, came back with friends. Perfect organisation, very careful guides.", ru: "Поехала одна — вернулась с друзьями. Отличная организация, внимательные гиды." } },
  { name: "Hans M.", country: "🇩🇪 Germany", tour: "khiva-karakalpak", stars: 5, text: { uz: "Ayozqal'adagi yulduzli tun — unutilmas. Viza masalasida ham yordam berishdi.", en: "The starry night at Ayaz-Kala was unforgettable. They also helped with all the paperwork.", ru: "Звёздная ночь в Аяз-кале незабываема. Помогли и с документами." } },
  { name: "Olga S.", country: "🇰🇿 Kazakhstan", tour: "gastro-uzbekistan", stars: 5, text: { uz: "Osh ustaxonasi va vino degustatsiyasi — ajoyib! Yana albatta kelaman.", en: "The plov masterclass and wine tasting were amazing! Will definitely come back.", ru: "Мастер-класс по плову и дегустация вина — восторг! Обязательно вернусь." } },
  { name: "Javohir T.", country: "🇺🇿 Samarqand", tour: "aydarkul-yurt", stars: 5, text: { uz: "Oila bilan bordik, bolalar tuyalardan juda xursand bo'lishdi. Narxi ham hamyonbop.", en: "Went with family, kids loved the camels. Great value too.", ru: "Ездили семьёй, дети в восторге от верблюдов. И цена доступная." } },
  { name: "Yuki T.", country: "🇯🇵 Japan", tour: "fergana-crafts", stars: 5, text: { uz: "Rishtonda o'z piyolamni yasadim — eng yaxshi esdalik sovg'a!", en: "I made my own bowl in Rishtan — the best souvenir ever!", ru: "В Риштане я сделала свою пиалу — лучший сувенир!" } }
];

/* ---------- ILHOM (blog) ---------- */
window.POSTS = [
  { scene: "city", tag: { uz: "Qo'llanma", en: "Guide", ru: "Гид" }, title: { uz: "O'zbekistonga birinchi safar: 10 ta maslahat", en: "First time in Uzbekistan: 10 tips", ru: "Впервые в Узбекистане: 10 советов" }, min: 6 },
  { scene: "mountain", tag: { uz: "Treking", en: "Trekking", ru: "Треккинг" }, title: { uz: "Toshkent atrofidagi eng yaxshi 7 ta tog' marshruti", en: "7 best hikes near Tashkent", ru: "7 лучших маршрутов рядом с Ташкентом" }, min: 5 },
  { scene: "ikat", tag: { uz: "Gastronomiya", en: "Food", ru: "Еда" }, title: { uz: "Oshning 60 xili: qayerda nima yeyish kerak", en: "60 kinds of plov: where to eat what", ru: "60 видов плова: где что есть" }, min: 8 },
  { scene: "desert", tag: { uz: "Mavsum", en: "Seasons", ru: "Сезоны" }, title: { uz: "Qachon borish kerak? Mavsumlar kalendari", en: "When to go: a seasonal calendar", ru: "Когда ехать: календарь сезонов" }, min: 4 }
];

/* ---------- FAQ ---------- */
window.FAQ = [
  { q: { uz: "O'zbekistonga kirish uchun viza kerakmi?", en: "Do I need a visa for Uzbekistan?", ru: "Нужна ли виза в Узбекистан?" }, a: { uz: "90 dan ortiq davlat fuqarolari uchun 30 kungacha vizasiz rejim amal qiladi. Boshqa davlatlar uchun e-viza olishda bepul yordam beramiz.", en: "Citizens of 90+ countries enjoy visa-free entry for up to 30 days. For others we help with the e-visa free of charge.", ru: "Для граждан 90+ стран действует безвизовый режим до 30 дней. Для остальных бесплатно поможем с e-визой." } },
  { q: { uz: "Yolg'iz sayohat qilsam bo'ladimi?", en: "Can I travel solo?", ru: "Можно ли путешествовать одному?" }, a: { uz: "Albatta! Guruhlarimizning qariyb yarmi yakka sayohatchilardan iborat. Xohlasangiz, bir jinsdagi sherik bilan xona bo'lishamiz — yakka xona to'lovisiz.", en: "Absolutely! Around half of our travellers join solo. Choose a room-share and we'll pair you with a same-gender traveller — no single supplement.", ru: "Конечно! Около половины наших путешественников едут одни. Можно поселиться с попутчиком своего пола без доплаты." } },
  { q: { uz: "Qanday to'lash mumkin?", en: "How can I pay?", ru: "Как оплатить?" }, a: { uz: "Payme, Click, Uzum, Visa/Mastercard, bank o'tkazmasi yoki ofisda naqd. Band qilish uchun 30% oldindan to'lov kifoya.", en: "Payme, Click, Uzum, Visa/Mastercard, bank transfer or cash at our office. A 30% deposit secures your place.", ru: "Payme, Click, Uzum, Visa/Mastercard, банковский перевод или наличными в офисе. Для брони достаточно 30% предоплаты." } },
  { q: { uz: "Bekor qilish shartlari qanday?", en: "What is your cancellation policy?", ru: "Каковы условия отмены?" }, a: { uz: "Jo'nashga 30 kundan ko'p qolganda — to'liq qaytarish. 14–30 kun — 50%. Sanani bir marta bepul o'zgartirish mumkin.", en: "More than 30 days before departure — full refund. 14–30 days — 50%. One free date change.", ru: "Более 30 дней до выезда — полный возврат. 14–30 дней — 50%. Одна бесплатная смена даты." } },
  { q: { uz: "Guruh qanchalik katta bo'ladi?", en: "How big are the groups?", ru: "Каков размер группы?" }, a: { uz: "O'rtacha 8–14 kishi. Premium turlar — 8 kishigacha. Shaxsiy (individual) tur ham tashkil qilamiz.", en: "Typically 8–14 people. Premium trips max 8. Private tours are also available.", ru: "Обычно 8–14 человек. Премиум — до 8. Возможны индивидуальные туры." } },
  { q: { uz: "Jismoniy tayyorgarlik kerakmi?", en: "How fit do I need to be?", ru: "Нужна ли физическая подготовка?" }, a: { uz: "Har bir turda 1 dan 5 gacha qiyinlik darajasi ko'rsatilgan. 1–2 daraja hamma uchun mos.", en: "Each trip shows a 1–5 difficulty rating. Levels 1–2 suit everyone.", ru: "У каждого тура указана сложность от 1 до 5. Уровни 1–2 подходят всем." } }
];

/* =========================================================
   TRENDDAGI ICHKI TURLAR (bosh sahifadagi alohida bo'lim)
   trend: nima uchun trendda, forWho: kimlar uchun, spots: Top-3 Instagram nuqtasi
   escape: "Bir kunlik qochish" — juma oqshomi / shanba tongi jo'nab, yakshanba qaytish
   ========================================================= */
window.TOURS.unshift({
  id: "nefrit-adrenaline", type: ["domestic"], scene: "lake", img: "urungach.jpg",
  regions: ["urungach", "chimgan"], activities: ["trekking", "hiking", "adventure", "daytrip", "photo"], collections: ["bestsellers", "new", "weekend", "solo"],
  days: 2, difficulty: 3, group: 16, price: 85, singleSup: 15, rating: 4.9, reviews: 264, every: 7, weekday: 6, start: "Toshkent", season: [4, 5, 6, 7, 8, 9, 10], escape: true,
  title: { uz: "\"Togʻ va Adrenalin\": Chimyon, Urungʻoch va Nefrit koʻli", en: "Mountains & Adrenaline: Chimgan, Urungach & Jade Lake", ru: "«Горы и адреналин»: Чимган, Урунгач и Нефритовое озеро" },
  summary: { uz: "Zumraddek yashil-moviy Nefrit ko'li, Pskem tizmasi manzaralari va Chimyon-Qizilsuv yo'laklari — tabiat qo'ynida 1–2 kunlik faol dam.", en: "Emerald-blue Jade Lake, Pskem range views and the Chimgan–Kyzylsu trails — 1–2 days of active escape in nature.", ru: "Изумрудное Нефритовое озеро, виды Пскемского хребта и тропы Чимгана — 1–2 дня активного отдыха на природе." },
  trend: { uz: "Tabiat qo'ynida yurish, toza havo va o'ta go'zal manzaralar. Nefrit ko'li suvining zumraddek rangi uchun hozir barcha blogerlar va sayyohlar shu yerda.", en: "Hiking in nature, fresh air and stunning scenery. Every blogger is heading to Jade Lake for its emerald water.", ru: "Прогулки на природе, чистый воздух и потрясающие виды. Все блогеры едут к Нефритовому озеру ради его изумрудной воды." },
  route: { uz: "Toshkent viloyati, Boʻstonliq tumani · Pskem tizmasi", en: "Tashkent region, Bostanliq district · Pskem range", ru: "Ташкентская обл., Бостанлыкский р-н · Пскемский хребет" },
  points: { uz: ["Nefrit ko'li (Urungʻoch) — yoz va kuzda trekking uchun eng mukammal joy", "Chimyon / Qizilsuv — yengil va o'rta darajadagi bir kunlik yurishlar"], en: ["Jade Lake (Urungach) — perfect for summer & autumn treks", "Chimgan / Kyzylsu — easy to moderate day hikes"], ru: ["Нефритовое озеро (Урунгач) — идеально летом и осенью", "Чимган / Кызылсу — лёгкие и средние однодневные маршруты"] },
  forWho: { uz: "Faol dam olishni, togʻda yurishni va chiroyli suratga tushishni yaxshi ko'radigan yoshlar hamda oilalar.", en: "Young people and families who love active rest, mountain walks and great photos.", ru: "Молодёжь и семьи, любящие активный отдых, горы и красивые фото." },
  spots: { uz: ["Nefrit ko'li qirg'og'idagi toshlar", "Urungʻoch qoyasi ustidan panorama", "Qizilsuv yo'lagidagi ko'prik"], en: ["Jade Lake shore rocks", "Urungach cliff panorama", "Kyzylsu trail bridge"], ru: ["Камни у Нефритового озера", "Панорама со скалы Урунгач", "Мостик на тропе Кызылсу"] },
  highlights: { uz: ["Nefrit ko'li", "Pskem tizmasi manzarasi", "Gid va transfer", "Piknik tushlik"], en: ["Jade Lake", "Pskem range views", "Guide & transfer", "Picnic lunch"] },
  itinerary: [
    { uz: ["Toshkent — Urungʻoch", "Shanba tongi jo'nash, Nefrit ko'liga treking, suratga tushish, tog'da tunash."], en: ["Tashkent — Urungach", "Saturday dawn departure, trek to Jade Lake, photo stops, night in the mountains."] },
    { uz: ["Chimyon / Qizilsuv", "Yengil yurish, tushlik va yakshanba kechqurun Toshkentga qaytish."], en: ["Chimgan / Kyzylsu", "Easy hike, lunch and Sunday evening return to Tashkent."] }
  ]
});
const patchTour = (id, o) => Object.assign(window.TOURS.find(t => t.id === id), o);
patchTour("amirsoy-ski", {
  season: null, escape: true, activities: ["ski", "adventure", "daytrip"], collections: ["premium", "winter", "family", "weekend"], days: 2, price: 220,
  title: { uz: "Premium dam olish: Amirsoy Resort", en: "Premium Escape: Amirsoy Resort", ru: "Премиум-отдых: Amirsoy Resort" },
  summary: { uz: "O'zbekistondagi eng zamonaviy tog'-chang'i kurorti: qishda chang'i, yoz va kuzda kanat yo'llari, hovuzlar va terassalar.", en: "Uzbekistan's most modern mountain resort: skiing in winter, cable cars, pools and terraces in summer and autumn.", ru: "Самый современный горный курорт Узбекистана: лыжи зимой, канатки, бассейны и террасы летом и осенью." },
  trend: { uz: "Qishda chang'i, yoz va kuzda osma kanat yo'llari, hovuzlar va terassalarda dam olish uchun 1-raqamli tanlov.", en: "No.1 choice: skiing in winter, cable cars, pools and terraces in summer and autumn.", ru: "Выбор №1: лыжи зимой, канатные дороги, бассейны и террасы летом и осенью." },
  route: { uz: "Boʻstonliq tumani, Chimyon-Amirsoy hududi", en: "Bostanliq district, Chimgan–Amirsoy area", ru: "Бостанлыкский р-н, Чимган–Амирсой" },
  points: { uz: ["Kanat yo'llari (gondola va kresloli) — cho'qqidan panorama", "Zamonaviy chalelar, restoranlar va ochiq havodagi dam olish zonalari"], en: ["Gondola & chairlift — summit panoramas", "Modern chalets, restaurants and open-air lounges"], ru: ["Гондола и кресельная канатка — панорама с вершины", "Шале, рестораны и зоны отдыха под открытым небом"] },
  forWho: { uz: "Qulaylikni, yevropacha servisni va estetik dam olishni afzal ko'radiganlar.", en: "Those who love comfort, European-style service and aesthetic rest.", ru: "Для ценителей комфорта, европейского сервиса и эстетики." },
  spots: { uz: ["Gondola kabinasidan manzara", "Cho'qqidagi kuzatuv maydoni", "Chale terassasi"], en: ["View from the gondola", "Summit viewpoint", "Chalet terrace"], ru: ["Вид из гондолы", "Смотровая на вершине", "Терраса шале"] }
});
patchTour("zaamin-hike", {
  escape: true, days: 2, activities: ["hiking", "trekking", "adventure", "cycling", "horse"], collections: ["new", "family", "weekend", "bestsellers"],
  title: { uz: "Zomin Milliy bog'i va osma ko'prik", en: "Zaamin National Park & Sky Bridge", ru: "Зааминский нацпарк и подвесной мост" },
  summary: { uz: "\"O'zbek Shveytsariyasi\": archazorlar, bulutlar uzra yurish hissini beruvchi shisha osma ko'prik va so'lim tabiat.", en: "The \"Uzbek Switzerland\": juniper forests, a glass sky bridge above the clouds and serene nature.", ru: "«Узбекская Швейцария»: арчовые леса, стеклянный подвесной мост над облаками и тишина гор." },
  trend: { uz: "Archazorlar, shisha osma ko'prik va so'lim tabiati bilan barchaning e'tiborini tortmoqda.", en: "Juniper forests, a glass suspension bridge and serene nature are drawing everyone's attention.", ru: "Арчовые леса, стеклянный мост и спокойная природа привлекают всех." },
  route: { uz: "Zomin tumani, Jizzax viloyati", en: "Zaamin district, Jizzakh region", ru: "Зааминский р-н, Джизакская обл." },
  points: { uz: ["Zomin osma ko'prigi — bulutlar uzra yurish hissi", "Milliy tabiat bog'i va shifoxonalar hududi — archazorlar orasida tonggi treking"], en: ["Zaamin sky bridge — walk above the clouds", "National park & sanatorium area — morning treks among junipers"], ru: ["Подвесной мост — прогулка над облаками", "Нацпарк и санатории — утренний трекинг среди арчи"] },
  forWho: { uz: "Shahar shovqinidan qochib, togʻ bag'rida sokinlik va hayajonli manzaralarni izlayotganlar.", en: "Those escaping the city noise for mountain calm and thrilling views.", ru: "Для тех, кто ищет тишину гор и захватывающие виды." },
  spots: { uz: ["Shisha osma ko'prik o'rtasi", "Archazor yo'lagi", "Tong otishdagi vodiy manzarasi"], en: ["Middle of the glass bridge", "Juniper trail", "Valley at sunrise"], ru: ["Середина стеклянного моста", "Арчовая тропа", "Долина на рассвете"] }
});
patchTour("aydarkul-yurt", {
  escape: true, activities: ["desert", "photo", "horse", "adventure"],
  title: { uz: "Choʻl va Voha: Aydarkoʻl va oʻtovlar", en: "Desert & Oasis: Aydarkul Lake & Yurts", ru: "Пустыня и оазис: Айдаркуль и юрты" },
  trend: { uz: "Togʻlardan zerikkanlar uchun eng zoʻr kontrast — qumliklar, tuya minish, o'tovda tunash va ko'l bo'yida baliq.", en: "The perfect contrast to the mountains — dunes, camel rides, a night in a yurt and lakeside fish.", ru: "Идеальный контраст горам — пески, верблюды, ночь в юрте и рыба у озера." },
  route: { uz: "Jizzax / Navoiy viloyatlari chegarasi, Aydarkoʻl", en: "Jizzakh / Navoi border, Aydarkul", ru: "Граница Джизакской и Навоийской обл., Айдаркуль" },
  points: { uz: ["Aydarko'l bo'yida piknik va quyosh botishi", "Milliy o'tov lagerida gulxan atrofida kechki ovqat va tunash"], en: ["Lakeside picnic & sunset", "Campfire dinner and night in a yurt camp"], ru: ["Пикник и закат у озера", "Ужин у костра и ночь в юрточном лагере"] },
  forWho: { uz: "O'zgacha kolorit, milliy an'analar va noodatiy tajribani xohlaydiganlar.", en: "Those seeking local colour, traditions and an unusual experience.", ru: "Для любителей колорита, традиций и необычных впечатлений." },
  spots: { uz: ["Qum barxanlari ustida tuya bilan", "O'tov lageri gulxan yonida", "Aydarko'lda quyosh botishi"], en: ["Camel on the dunes", "Yurt camp by the fire", "Sunset at Aydarkul"], ru: ["Верблюд на барханах", "Юрты у костра", "Закат на Айдаркуле"] }
});
patchTour("chatkal-rafting", { activities: ["rafting", "adventure", "daytrip"] });
patchTour("fergana-crafts", { activities: ["crafts", "culture", "food", "cycling"] });
patchTour("silk-road-classic", { activities: ["culture", "food", "photo", "daytrip"] });
window.TRENDING = ["nefrit-adrenaline", "amirsoy-ski", "zaamin-hike", "aydarkul-yurt"];

/* =========================================================
   BESTSELLER — 7 TA TUR (Eng ko'p sotilganlar to'plami)
   best: "Nima uchun bestseller?", assets: "Asosiy aktivlar"
   ========================================================= */
window.DESTINATIONS.push({ id: "kashkadarya", scene: "ruins", hue: 0, name: { uz: "Qashqadaryo togʻlari", en: "Kashkadarya Mountains", ru: "Горы Кашкадарьи" }, sub: { uz: "Langar ota · Koʻksaroy", en: "Langar Ota · Koksaroy", ru: "Лангар-ата · Коксарай" } });

// Avvalgi "bestsellers" belgilarini tozalaymiz — to'plamda faqat quyidagi 7 ta tur bo'ladi
window.TOURS.forEach(t => { t.collections = t.collections.filter(c => c !== "bestsellers"); });

window.TOURS.push(
  {
    id: "tashkent-mountains", type: ["domestic"], scene: "lake", img: "urungach.jpg",
    regions: ["chimgan", "urungach"], activities: ["trekking", "hiking", "adventure", "daytrip"], collections: ["bestsellers", "weekend", "family"],
    days: 2, difficulty: 2, group: 18, price: 95, singleSup: 20, rating: 4.9, reviews: 612, every: 7, weekday: 6, start: "Toshkent", escape: true,
    title: { uz: "Toshkent viloyati togʻlari: Chimyon, Urungʻoch va Amirsoy", en: "Tashkent Mountains: Chimgan, Urungach & Amirsoy", ru: "Горы Ташкентской области: Чимган, Урунгач и Амирсой" },
    summary: { uz: "Poytaxtga eng yaqin, tabiat va zamonaviy qulaylik uygʻunlashgan hudud: Urungʻochning zumrad suvi va Amirsoydagi estetik dam olish.", en: "The closest escape from the capital: Urungach's emerald water and stylish rest at Amirsoy.", ru: "Ближайший к столице отдых: изумрудная вода Урунгача и эстетичный Амирсой." },
    best: { uz: "Poytaxt va unga yaqin hudud aholisi uchun eng tez yetib boriladigan, tabiat va zamonaviy qulaylik uygʻunlashgan hudud. Urungʻochning zumrad suvi va Amirsoydagi estetik dam olish har mavsumda birinchi raqamli tanlov.", en: "The fastest getaway from the capital where nature meets modern comfort. Urungach's emerald water and Amirsoy's stylish rest are the No.1 choice every season.", ru: "Самое быстрое направление из столицы, где природа сочетается с комфортом. Изумрудный Урунгач и эстетичный Амирсой — выбор №1 в любой сезон." },
    assets: { uz: ["Osma kanat yoʻllari", "Nefrit koʻliga trekking", "Togʻda piknik"], en: ["Cable cars", "Trek to Jade Lake", "Mountain picnic"], ru: ["Канатные дороги", "Треккинг к Нефритовому озеру", "Пикник в горах"] },
    highlights: { uz: ["Osma kanat yoʻllari", "Nefrit koʻli", "Togʻda piknik", "Transfer va gid"], en: ["Cable cars", "Jade Lake", "Mountain picnic", "Transfer & guide"] },
    itinerary: [
      { uz: ["Toshkent — Urungʻoch", "Nefrit koʻliga trekking, togʻda piknik."], en: ["Tashkent — Urungach", "Trek to Jade Lake, mountain picnic."] },
      { uz: ["Amirsoy — Toshkent", "Kanat yoʻllari, choʻqqidan manzara, kechqurun qaytish."], en: ["Amirsoy — Tashkent", "Cable cars, summit views, evening return."] }
    ]
  },
  {
    id: "samarkand-bukhara-3", type: ["domestic", "inbound"], scene: "city", img: "",
    regions: ["samarkand", "bukhara"], activities: ["culture", "food", "photo"], collections: ["bestsellers", "silkroad", "family"],
    days: 3, difficulty: 1, group: 20, price: 230, singleSup: 50, rating: 4.9, reviews: 744, every: 7, weekday: 5, start: "Toshkent",
    title: { uz: "Afsonaviy Ipak Yoʻli klassikasi: Samarqand va Buxoro", en: "Legendary Silk Road: Samarkand & Bukhara", ru: "Легендарный Шёлковый путь: Самарканд и Бухара" },
    summary: { uz: "Ichki turizmning eng qadimiy va oʻzgarmas klassikasi — bayram va uzoq dam olish kunlari uchun oilaviy marshrut.", en: "The timeless classic of local travel — the go-to family route for holidays and long weekends.", ru: "Неизменная классика внутреннего туризма — главный семейный маршрут на праздники." },
    best: { uz: "Oʻzbekiston ichki turizmida eng qadimiy va oʻzgarmas klassika. Ayniqsa, bayramlar va uzoq dam olish kunlarida oilaviy yoki doʻstlar bilan boriladigan eng asosiy marshrut.", en: "The oldest, unchanging classic of domestic travel — the main route for families and friends on holidays and long weekends.", ru: "Старейшая неизменная классика: главный маршрут для семей и друзей на праздники и длинные выходные." },
    assets: { uz: ["Registon maydoni", "Shohi Zinda", "Labi Hovuz", "Minorai Kalon", "Milliy osh turlari"], en: ["Registan Square", "Shah-i-Zinda", "Lyabi-Hauz", "Kalyan Minaret", "Regional plov"], ru: ["Регистан", "Шахи-Зинда", "Ляби-Хауз", "Минарет Калян", "Виды плова"] },
    highlights: { uz: ["Registon", "Shohi Zinda", "Labi Hovuz", "Minorai Kalon"], en: ["Registan", "Shah-i-Zinda", "Lyabi-Hauz", "Kalyan Minaret"] },
    itinerary: [
      { uz: ["Samarqand", "Afrosiyob poyezdi, Registon, Shohi Zinda, samarqandcha osh."], en: ["Samarkand", "Afrosiyob train, Registan, Shah-i-Zinda, Samarkand plov."] },
      { uz: ["Buxoro", "Labi Hovuz, Minorai Kalon, savdo gumbazlari."], en: ["Bukhara", "Lyabi-Hauz, Kalyan Minaret, trading domes."] },
      { uz: ["Buxoro — Toshkent", "Ark qalʼasi, buxorocha osh, kechki poyezd."], en: ["Bukhara — Tashkent", "The Ark, Bukhara plov, evening train."] }
    ]
  },
  {
    id: "charvak-loop", type: ["domestic"], scene: "lake", img: "",
    regions: ["chimgan"], activities: ["daytrip", "food", "photo"], collections: ["bestsellers", "weekend", "family"],
    days: 1, difficulty: 1, group: 20, price: 35, singleSup: 0, rating: 4.8, reviews: 538, every: 7, weekday: 0, start: "Toshkent", escape: true, season: [4, 5, 6, 7, 8, 9, 10, 11],
    title: { uz: "Koʻchmanchilar ruhi: Chorvoq va Bogʻiston–Burchmulla halqasi", en: "Nomad Spirit: Charvak & Bogiston–Burchmulla Loop", ru: "Дух кочевников: Чарвак и кольцо Богистан–Бурчмулла" },
    summary: { uz: "Koʻk suv va togʻ manzarali eng qulay bir kunlik avtotur: Chorvoq boʻyida baliq va qishloqlar boʻylab sayr.", en: "The easiest one-day drive: blue water, mountain views, lakeside fish and village roads.", ru: "Самый удобный однодневный автотур: голубая вода, горы, рыба у озера и сёла." },
    best: { uz: "\"Chorvoq atrofini aylanish\" — har bir oʻzbekistonlik yoz va kuz faslida kamida bir marta qiladigan odati. Mashinada qisqa vaqt ichida aylanib chiqish mumkin boʻlgan eng qulay yoʻnalish.", en: "\"Driving around Charvak\" is a summer-and-autumn ritual for every Uzbek — the most convenient loop of blue water and mountains.", ru: "«Объехать Чарвак» — традиция каждого узбекистанца летом и осенью: самое удобное кольцо с голубой водой и горами." },
    assets: { uz: ["Chorvoq boʻyida baliq (shashlik)", "Yumaloq togʻ", "Qishloqlar boʻylab avtotur"], en: ["Lakeside fish & shashlik", "Yumaloq Mountain", "Village road trip"], ru: ["Рыба и шашлык у Чарвака", "Гора Юмалак", "Автотур по сёлам"] },
    highlights: { uz: ["Chorvoq suv ombori", "Bogʻiston", "Burchmulla", "Baliq tushligi"], en: ["Charvak reservoir", "Bogiston", "Burchmulla", "Fish lunch"] },
    itinerary: [{ uz: ["Chorvoq halqasi", "Toshkent — Chorvoq — Bogʻiston — Burchmulla — Yumaloq togʻ — Toshkent."], en: ["Charvak loop", "Tashkent — Charvak — Bogiston — Burchmulla — Yumaloq — Tashkent."] }]
  },
  {
    id: "langar-ota", type: ["domestic", "inbound"], scene: "ruins", img: "",
    regions: ["kashkadarya", "shahrisabz"], activities: ["trekking", "pilgrimage", "adventure", "photo"], collections: ["bestsellers", "new", "ultimate"],
    days: 2, difficulty: 3, group: 14, price: 180, singleSup: 35, rating: 4.9, reviews: 189, every: 14, weekday: 5, start: "Qarshi", season: [4, 5, 6, 9, 10],
    title: { uz: "Markaziy Osiyo Grand Kanyoni: Koʻksaroy va Langar ota", en: "Central Asia's Grand Canyon: Koksaroy & Langar Ota", ru: "Гранд-каньон Средней Азии: Коксарай и Лангар-ата" },
    summary: { uz: "Qashqadaryo togʻlari, oʻziga xos kanyonlar va qadimiy Langar ota qishlogʻi — \"yashirin xazina\"dan trendga aylangan yoʻnalish.", en: "Kashkadarya's mountains, unique canyons and the ancient village of Langar Ota — a hidden gem turned trend.", ru: "Горы Кашкадарьи, каньоны и древний кишлак Лангар-ата — из «скрытой жемчужины» в тренд." },
    best: { uz: "Qashqadaryoning togʻli hududlari va qadimiy Langar ota qishlogʻi (oq masjid va qadimiy Qurʼon saqlanadigan joy) hamda oʻziga xos kanyonlar \"hidden gem\" maqomidan chiqib, eng koʻp izlanayotgan trendga aylandi.", en: "Kashkadarya's highlands, the ancient village of Langar Ota (white mosque and ancient Quran) and its canyons have gone from hidden gem to the most searched trend.", ru: "Горы Кашкадарьи, древний Лангар-ата (белая мечеть и древний Коран) и каньоны превратились из «скрытой жемчужины» в самый популярный тренд." },
    assets: { uz: ["Hazrati Sulton choʻqqisi", "Langar ota ziyoratgohi", "Togʻ trekkingi"], en: ["Hazrat Sultan Peak", "Langar Ota shrine", "Mountain trekking"], ru: ["Пик Хазрати Султан", "Святыня Лангар-ата", "Горный треккинг"] },
    highlights: { uz: ["Koʻksaroy kanyoni", "Langar ota", "Hazrati Sulton", "Togʻ qishlogʻida tunash"], en: ["Koksaroy canyon", "Langar Ota", "Hazrat Sultan", "Village stay"] },
    itinerary: [
      { uz: ["Qarshi — Langar ota", "Koʻksaroy kanyoni, Langar ota ziyoratgohi, qishloqda tunash."], en: ["Karshi — Langar Ota", "Koksaroy canyon, Langar Ota shrine, village stay."] },
      { uz: ["Hazrati Sulton", "Togʻ trekkingi va qaytish."], en: ["Hazrat Sultan", "Mountain trek and return."] }
    ]
  },
  {
    id: "khiva-itchan-kala", type: ["domestic", "inbound"], scene: "fortress", img: "khiva-itchan.jpg",
    regions: ["khiva"], activities: ["culture", "food", "photo"], collections: ["bestsellers", "silkroad"],
    days: 3, difficulty: 1, group: 16, price: 290, singleSup: 60, rating: 4.9, reviews: 402, every: 7, weekday: 4, start: "Urganch",
    title: { uz: "Moziyga sayohat: Qadimiy Xiva va Ichan Qalʼa", en: "Journey into the Past: Ancient Khiva & Itchan Kala", ru: "Путешествие в прошлое: древняя Хива и Ичан-Кала" },
    summary: { uz: "Ertaknamo shaharcha, sahro muhiti, Kalta Minor va xorazmcha tuxum barak — avia va poyezd bilan endi yanada yaqin.", en: "A fairy-tale town, desert air, Kalta Minor and Khorezm tukhum barak — now closer by plane and train.", ru: "Сказочный город, дух пустыни, Кальта-Минор и хорезмский тухум-барак — теперь ближе на самолёте и поезде." },
    best: { uz: "Garchi uzoqroq masofada joylashgan boʻlsa-da, qulay avia va poyezd reyslari yoʻlga qoʻyilgandan beri Xorazmga sayohatlar eng ommabop bestsellerlarga kirdi. Ertaknamo shaharcha va sahro muhiti hammaga birdek yoqadi.", en: "Despite the distance, convenient flights and trains have made Khorezm a top bestseller. Everyone loves the fairy-tale town and desert atmosphere.", ru: "Несмотря на расстояние, удобные рейсы и поезда сделали Хорезм бестселлером. Сказочный город и атмосфера пустыни нравятся всем." },
    assets: { uz: ["Ichan Qalʼa muzey-qoʻriqxonasi", "Kalta Minor", "Xorazmcha tuxum barak"], en: ["Itchan Kala museum-reserve", "Kalta Minor", "Khorezm tukhum barak"], ru: ["Музей-заповедник Ичан-Кала", "Кальта-Минор", "Хорезмский тухум-барак"] },
    highlights: { uz: ["Ichan Qalʼa", "Kalta Minor", "Tuxum barak", "Devordan quyosh botishi"], en: ["Itchan Kala", "Kalta Minor", "Tukhum barak", "Sunset from the walls"] },
    itinerary: [
      { uz: ["Urganch — Xiva", "Aeroport/vokzaldan kutib olish, kechki Ichan Qalʼa."], en: ["Urgench — Khiva", "Pick-up, evening walk in Itchan Kala."] },
      { uz: ["Ichan Qalʼa", "Kalta Minor, Juma masjidi, tuxum barak ustaxonasi."], en: ["Itchan Kala", "Kalta Minor, Juma Mosque, tukhum barak class."] },
      { uz: ["Xayrlashuv", "Ertalabki sayr va qaytish."], en: ["Farewell", "Morning walk and return."] }
    ]
  }
);

patchTour("zaamin-hike", {
  collections: ["bestsellers", "new", "family", "weekend"],
  title: { uz: "\"Oʻzbek Shveytsariyasi\": Zomin va Osma koʻprik", en: "\"Uzbek Switzerland\": Zaamin & the Sky Bridge", ru: "«Узбекская Швейцария»: Заамин и подвесной мост" },
  best: { uz: "Soʻnggi yillarda Jizzaxdagi Zomin milliy bogʻi va shisha osma koʻprik ochilgach, bu yoʻnalish haqiqiy bumga aylandi. Archazorlar va bulutlar uzra yurgandek taassurot qoldiradigan joy har bir oʻzbekistonlik bormoqchi boʻlgan lokatsiyaga aylandi.", en: "Since the glass sky bridge opened, Zaamin National Park has boomed — juniper forests and a walk above the clouds everyone wants to experience.", ru: "После открытия стеклянного моста Заамин стал настоящим бумом — арчовые леса и прогулка над облаками, куда хочет попасть каждый." },
  assets: { uz: ["Osma koʻprik", "Kanat yoʻli", "Zomin sanatoriysi atrofi", "Archali togʻ yoʻlaklarida yurish"], en: ["Sky bridge", "Cable car", "Zaamin sanatorium area", "Juniper mountain trails"], ru: ["Подвесной мост", "Канатная дорога", "Окрестности санатория", "Арчовые тропы"] }
});
patchTour("aydarkul-yurt", {
  collections: ["bestsellers", "weekend", "family", "solo"],
  title: { uz: "Choʻl va Ekstremal romantika: Aydarkoʻl va Oʻtov lagerlari", en: "Desert Romance: Aydarkul & Yurt Camps", ru: "Романтика пустыни: Айдаркуль и юрточные лагеря" },
  best: { uz: "Togʻlardan zerikkanlar uchun eng zoʻr kontrast. Jizzax va Navoiy chegarasidagi bu koʻl boʻyida oʻtovlarda tunash, choʻlda tuya minish va ochiq osmon ostida gulxan atrofida oʻtirish yoshlar va sayyohlar orasida juda ommalashgan.", en: "The perfect contrast to the mountains: yurt nights by the lake, camel rides and campfires under open skies are hugely popular.", ru: "Идеальный контраст горам: ночи в юртах у озера, верблюды и костёр под открытым небом очень популярны." },
  assets: { uz: ["Aydarkoʻlda qayiqda suzish yoki baliq ovlash", "Tuya minish", "Choʻl landshaftida foto/video kontent"], en: ["Boating or fishing on Aydarkul", "Camel riding", "Desert photo & video content"], ru: ["Лодка или рыбалка на Айдаркуле", "Катание на верблюдах", "Фото и видео в пустыне"] }
});
window.BESTSELLERS = ["tashkent-mountains", "zaamin-hike", "samarkand-bukhara-3", "aydarkul-yurt", "charvak-loop", "langar-ota", "khiva-itchan-kala"];

/* =========================================================
   QISHKI SARGUZASHT va DAM OLISH KUNLARI rasmlari
   ========================================================= */
patchTour("amirsoy-ski", { img: "amirsoy.jpg" });
window.TOURS.push({
  id: "silkroad-samarkand-weekend", type: ["domestic", "inbound"], scene: "city3", img: "silkroad-samarkand.jpg",
  regions: ["samarkand"], activities: ["culture", "food", "daytrip"], collections: ["weekend", "family", "new"],
  days: 2, difficulty: 1, group: 30, price: 150, singleSup: 35, rating: 4.9, reviews: 96, every: 7, weekday: 6, start: "Toshkent", escape: true,
  title: { uz: "Samarqanddagi yangi dam olish majmuasi: Silk Road Samarkand", en: "Samarkand's New Leisure Resort: Silk Road Samarkand", ru: "Новый курорт Самарканда: Silk Road Samarkand" },
  summary: { uz: "Kanallar va katta bog' bilan o'ralgan yangi majmua: tug'ilgan kun va tadbirlar, baliq ovlash zonasi, bolalar uchun bepul joylar.", en: "A new complex wrapped in canals and a large park: birthday parties and events, a fishing zone and free kids' areas.", ru: "Новый комплекс среди каналов и большого парка: дни рождения и мероприятия, зона рыбалки и бесплатные детские зоны." },
  trend: { uz: "Samarqandda yaqinda ochilgan, butun oila uchun dam olish joyi — kechqurun chiroqlar yoqilganda ertakdagi shaharga aylanadi.", en: "Recently opened in Samarkand, a place for the whole family that turns into a fairy-tale city when the lights come on at night.", ru: "Недавно открытое место для всей семьи, которое вечером превращается в сказочный город." },
  route: { uz: "Samarqand shahri, Silk Road Samarkand turistik markazi", en: "Samarkand, Silk Road Samarkand tourist centre", ru: "Самарканд, туристический центр Silk Road Samarkand" },
  points: { uz: ["Har qanday tug'ilgan kun va tadbirlar", "Baliq ovlash zonasi (Fishing zone)", "Bolalar uchun bepul joylar", "Katta bog' va kanal bo'yida sayr"], en: ["Birthday parties & any events", "Fishing zone", "Free kids' areas", "Large park & canal-side walks"], ru: ["Дни рождения и любые мероприятия", "Зона рыбалки", "Бесплатные детские зоны", "Большой парк и прогулки у каналов"] },
  forWho: { uz: "Oilalar, bolali sayohatchilar va bayram yoki tug'ilgan kunni o'zgacha nishonlamoqchi bo'lganlar.", en: "Families, travellers with kids and anyone celebrating a birthday or special day.", ru: "Семьи, путешественники с детьми и все, кто хочет отметить праздник по-особенному." },
  spots: { uz: ["Kanal ustidagi ko'prik", "Oltin gumbazli bino oldi", "Kechki chiroqlar bilan qal'a devori"], en: ["Bridge over the canal", "In front of the golden hall", "Fortress walls at night"], ru: ["Мост над каналом", "У золотого зала", "Стены крепости вечером"] },
  assets: { uz: ["Tug'ilgan kun va tadbirlar", "Fishing zone", "Bolalar uchun bepul joylar", "Katta bog'"], en: ["Birthdays & events", "Fishing zone", "Free kids' areas", "Large park"], ru: ["Дни рождения и события", "Рыбалка", "Бесплатные детские зоны", "Большой парк"] },
  highlights: { uz: ["Boqiy shahar ko'chalari", "Kanal bo'yida kechki sayr", "Baliq ovlash", "Bolalar maydonchalari"], en: ["Eternal City streets", "Evening canal walk", "Fishing", "Kids' playgrounds"] },
  itinerary: [
    { uz: ["Toshkent — Samarqand", "Afrosiyob poyezdi, majmuaga joylashish, kanal bo'yida kechki sayr va chiroqlar shousi."], en: ["Tashkent — Samarkand", "Afrosiyob train, check-in, evening canal walk and light show."] },
    { uz: ["Dam olish kuni", "Baliq ovlash, bolalar maydonchalari, bog'da sayr, kechqurun Toshkentga qaytish."], en: ["Leisure day", "Fishing, kids' areas, park walk, evening return to Tashkent."] }
  ]
});
