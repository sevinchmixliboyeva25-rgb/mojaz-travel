# Mo'jaz — O'zbekiston bo'ylab sarguzasht sayohatlari

Turistik agentlik uchun reklama sayti va onlayn band qilish platformasi.
**Ichki turizm** (O'zbekiston fuqarolari uchun) va **kirish turizmi** (xorijiy mehmonlar uchun) ikkalasini ham qamrab oladi.
Cloudflare Pages (statik sayt) + Pages Functions (API) + D1 (ma'lumotlar bazasi) asosida ishlaydi.

## Imkoniyatlar

| Bo'lim | Nima bor |
|---|---|
| Bosh sahifa | YouTube fon videosi (ovoz/pauza tugmalari), "Yo'nalishlar / Faoliyatlar / To'plamlar" tablari va suriladigan karusel, animatsion statistika, ichki va kirish turizmi bloklari, eng ko'p sotilgan turlar, taymerli aksiya, "Nega biz", "Qanday ishlaydi", yaqin jo'nashlar jadvali (oy bo'yicha filtr), sharhlar karuseli, blog, FAQ, shaxsiy tur so'rovi formasi, email obuna |
| Turlar ro'yxati | Turizm turi, yo'nalish, faoliyat, to'plam, davomiylik, qiyinlik, narx bo'yicha filtrlar; qidiruv; saralash; URL orqali ulashiladigan filtrlar; mobil filtr oynasi |
| Tur sahifasi | Ko'rinish, kunlik marshrut, narxga kiradi/kirmaydi, sanalar va narxlar (holati: kafolatlangan / oz joy qoldi / joy qolmadi), sharhlar, FAQ, o'xshash turlar, yopishqoq band qilish kartasi |
| Band qilish | 4 bosqich: sana → sayohatchilar (kattalar, bolalar -30%, yakka xona, qo'shimcha xizmatlar) → ma'lumotlar → tasdiqlash (30% oldindan / to'liq / ofisda; Payme, Click, Uzum, Visa) → buyurtma raqami |
| Umumiy | 3 til (O'zbek / English / Русский), 4 valyuta (UZS, USD, EUR, RUB), sevimlilar (♥), "Mening buyurtmalarim", sayt bo'ylab qidiruv, mega-menyu, Telegram/WhatsApp yordam tugmasi, mobilga moslashgan |
| Admin panel | `/admin.html` — buyurtmalar, shaxsiy tur so'rovlari va obunachilar; holatni o'zgartirish; CSV eksport |
| Xabarnoma | Har bir yangi buyurtma menejerlar Telegram chatiga keladi (ixtiyoriy) |

## Fayllar tuzilishi

```
public/                 ← Cloudflare Pages shu papkani joylaydi
  index.html            bosh sahifa
  tours.html            turlar ro'yxati
  tour.html             tur sahifasi (?id=...)
  admin.html            admin panel
  assets/js/data.js     ★ TURLAR, NARXLAR, KONTAKTLAR — shu faylni tahrirlang
  assets/js/i18n.js     interfeys matnlari (uz/en/ru)
  assets/css/style.css  dizayn (ranglar :root ichida)
  assets/img/           haqiqiy fotolar uchun
functions/api/bookings.js  API: buyurtmalarni saqlash, admin, Telegram
schema.sql              D1 jadvali
wrangler.toml           Cloudflare sozlamasi
```

## Kontent qanday o'zgartiriladi

- **Kontaktlar, video, valyuta kurslari** — `data.js` boshidagi `SITE` obyekti (`youtubeId`, `phone`, `telegram`, `rates` ...).
- **Yangi tur** — `TOURS` ro'yxatiga mavjud turdan nusxa olib qo'shing. `type: ["domestic"]` yoki `["inbound"]` yoki ikkalasi.
  Sanalar avtomatik yaratiladi: `every: 7, weekday: 6` = har shanba; `fixedDates: ["03-16"]` = har yili 16-mart; `season: [5,6,7]` = faqat shu oylarda.
- **Fotosuratlar** — `public/assets/img/` ga joylang va turga `img: "assets/img/fayl.jpg"` yozing. Foto bo'lmasa chizilgan SVG manzara chiqadi.

## Lokal ishga tushirish

```bash
npm install
```

```bash
cp .dev.vars.example .dev.vars
```

```bash
npm run db:init:local
```

```bash
npm run dev
```

Sayt `http://localhost:8788` da ochiladi. (API ishlamasa ham sayt ishlayveradi — buyurtmalar brauzerda saqlanib turadi.)

## Cloudflare'ga joylash

### 1-usul: GitHub orqali (tavsiya etiladi)

1. Shu loyihani GitHub repoga yuklang.
2. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git** → repongizni tanlang.
3. Build sozlamalari: *Framework preset* — **None**, *Build command* — bo'sh, *Build output directory* — **public**.
4. D1 bazasini yarating:
   ```bash
   npx wrangler d1 create sayyoh-db
   ```
   Chiqqan `database_id` ni `wrangler.toml` ga yozing, so'ng jadvalni yarating:
   ```bash
   npm run db:init
   ```
5. Pages loyiha → **Settings → Bindings → Add → D1 database**: nomi `DB`, baza `sayyoh-db`.
6. **Settings → Variables and Secrets**:
   - `ADMIN_TOKEN` (Secret) — admin panel paroli
   - `TELEGRAM_BOT_TOKEN` (Secret, ixtiyoriy) — @BotFather bergan token
   - `TELEGRAM_CHAT_ID` (ixtiyoriy) — menejerlar guruhi ID si
7. Qayta deploy qiling. Har `git push` da sayt avtomatik yangilanadi.

### 2-usul: GitHub Actions

`.github/workflows/deploy.yml` tayyor. Repo **Settings → Secrets → Actions** ga `CLOUDFLARE_API_TOKEN` va `CLOUDFLARE_ACCOUNT_ID` qo'shing — `main` ga har push'da deploy bo'ladi.

## To'lovlar haqida

Hozir mijoz to'lov usulini tanlaydi va menejer to'lov havolasini yuboradi (bu O'zbekistondagi agentliklarda keng tarqalgan jarayon).
Avtomatik onlayn to'lov uchun Payme / Click merchant shartnomasi kerak — shundan so'ng `functions/api/` ga to'lov havolasini yaratuvchi endpoint qo'shiladi.

## Eslatma

`data.js` dagi kontaktlar, litsenziya raqami, sharhlar va statistika — **namuna**. Saytni ishga tushirishdan oldin haqiqiy ma'lumotlar bilan almashtiring.
