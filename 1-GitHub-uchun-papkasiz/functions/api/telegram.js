/**
 * Cloudflare Pages Function: /api/telegram  (Telegram bot webhook)
 *
 * Botga /start yozilganda salomlashadi va menyu tugmalarini chiqaradi:
 *   📅 Bugungi xabarlar · 📬 Obunalar · 🆕 Yangi buyurtmalar
 *
 * Bog'lanishlar (Cloudflare Pages > Settings):
 *   DB                       — D1 database
 *   TELEGRAM_BOT_TOKEN       — secret
 *   TELEGRAM_CHAT_ID         — adminlar ID si (vergul bilan: 111,222,-100333). Faqat shular botdan foydalana oladi
 *   TELEGRAM_WEBHOOK_SECRET  — secret, o'zingiz o'ylab topgan kalit (faqat harf, raqam, _ va -)
 */

const TZ_OFFSET_H = 5; // Toshkent UTC+5

const MENU = {
  keyboard: [
    [{ text: "📅 Bugungi xabarlar" }, { text: "📬 Obunalar" }],
    [{ text: "🆕 Yangi buyurtmalar" }]
  ],
  resize_keyboard: true,
  is_persistent: true
};

const esc = v => String(v ?? "").replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));

async function send(env, chatId, text, extra = {}) {
  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: text.slice(0, 4000), parse_mode: "HTML", disable_web_page_preview: true, ...extra })
  });
  if (!res.ok) console.log("Telegram sendMessage xato:", res.status, await res.text());
}

function allowedIds(env) {
  return String(env.TELEGRAM_CHAT_ID || "").split(",").map(s => s.trim()).filter(Boolean);
}

// Toshkent bo'yicha bugungi kun boshlanishi (UTC ISO ko'rinishida)
function todayStartISO() {
  const local = new Date(Date.now() + TZ_OFFSET_H * 3600 * 1000);
  const d = local.toISOString().slice(0, 10);
  return new Date(`${d}T00:00:00+05:00`).toISOString();
}

function hhmm(iso) {
  const d = new Date(new Date(iso).getTime() + TZ_OFFSET_H * 3600 * 1000);
  return d.toISOString().slice(11, 16);
}
function ddmm(iso) {
  const d = new Date(new Date(iso).getTime() + TZ_OFFSET_H * 3600 * 1000);
  return d.toISOString().slice(5, 10).split("-").reverse().join(".");
}

const KIND = { booking: "🆕", custom: "🗺", newsletter: "📬" };

function line(r) {
  const who = r.kind === "newsletter" ? esc(r.email) : `${esc(r.name)} · ${esc(r.phone)}`;
  const what = r.tour_title ? ` · ${esc(r.tour_title)}` : "";
  const code = r.code ? ` <code>${esc(r.code)}</code>` : "";
  return `${KIND[r.kind] || "•"} ${hhmm(r.created_at)}${code} ${who}${what}`;
}

async function showToday(env, chatId) {
  const since = todayStartISO();
  const { results } = await env.DB.prepare(
    "SELECT kind, code, name, phone, email, tour_title, created_at FROM requests WHERE created_at >= ? ORDER BY id DESC LIMIT 30"
  ).bind(since).all();
  if (!results.length) return send(env, chatId, "📅 Bugun hali xabar yo'q.", { reply_markup: MENU });
  const c = k => results.filter(r => r.kind === k).length;
  const head = `📅 <b>Bugungi xabarlar</b>: ${results.length} ta\n🆕 buyurtma: ${c("booking")} · 🗺 so'rov: ${c("custom")} · 📬 obuna: ${c("newsletter")}\n`;
  return send(env, chatId, head + "\n" + results.map(line).join("\n"), { reply_markup: MENU });
}

async function showSubscribers(env, chatId) {
  const total = await env.DB.prepare("SELECT COUNT(*) AS n FROM requests WHERE kind = 'newsletter'").first();
  const { results } = await env.DB.prepare(
    "SELECT email, created_at FROM requests WHERE kind = 'newsletter' ORDER BY id DESC LIMIT 20"
  ).all();
  if (!results.length) return send(env, chatId, "📬 Hozircha obunachilar yo'q.", { reply_markup: MENU });
  const rows = results.map(r => `• ${esc(r.email)} <i>(${ddmm(r.created_at)})</i>`).join("\n");
  return send(env, chatId, `📬 <b>Obunalar</b>: jami ${total.n} ta\nOxirgi ${results.length} tasi:\n\n${rows}`, { reply_markup: MENU });
}

async function showNew(env, chatId) {
  const { results } = await env.DB.prepare(
    "SELECT kind, code, name, phone, email, tour_title, created_at FROM requests WHERE kind IN ('booking','custom') AND status = 'new' ORDER BY id DESC LIMIT 15"
  ).all();
  if (!results.length) return send(env, chatId, "🆕 Yangi (ko'rilmagan) buyurtmalar yo'q.", { reply_markup: MENU });
  const rows = results.map(r => `${line(r).replace(/^(\S+) (\d\d:\d\d)/, `$1 ${ddmm(r.created_at)} $2`)}`).join("\n");
  return send(env, chatId, `🆕 <b>Yangi buyurtmalar</b> (${results.length} ta):\n\n${rows}`, { reply_markup: MENU });
}

export async function onRequestPost({ request, env }) {
  // Faqat Telegram yuborgan so'rovlarni qabul qilamiz
  if (!env.TELEGRAM_WEBHOOK_SECRET || request.headers.get("X-Telegram-Bot-Api-Secret-Token") !== env.TELEGRAM_WEBHOOK_SECRET)
    return new Response("forbidden", { status: 403 });
  if (!env.TELEGRAM_BOT_TOKEN) return new Response("ok");

  let update;
  try { update = await request.json(); } catch { return new Response("ok"); }
  const msg = update.message;
  if (!msg || !msg.chat) return new Response("ok");

  const chatId = msg.chat.id;
  const userId = msg.from && msg.from.id;
  const text = (msg.text || "").trim();

  try {
    const ids = allowedIds(env);
    const allowed = ids.includes(String(chatId)) || (userId && ids.includes(String(userId)));
    if (!allowed) {
      await send(env, chatId, `⛔ Sizda ruxsat yo'q.\nSizning ID: <code>${esc(userId || chatId)}</code>\nShu raqamni admin <b>TELEGRAM_CHAT_ID</b> ro'yxatiga qo'shishi kerak.`);
      return new Response("ok");
    }

    if (/^\/(start|menu|help)/i.test(text)) {
      const name = msg.from && msg.from.first_name ? `, ${esc(msg.from.first_name)}` : "";
      await send(env, chatId,
        `👋 Xush kelibsiz${name}!\n\n<b>Mo'jaz Travel</b> botiga ulandingiz. Yangi buyurtma, shaxsiy tur so'rovi va obuna bo'lsa, shu yerga xabar keladi.\n\nQuyidagi menyudan tanlang:`,
        { reply_markup: MENU });
    } else if (/bugungi/i.test(text) || /^\/today/i.test(text)) {
      await showToday(env, chatId);
    } else if (/obuna/i.test(text) || /^\/subs/i.test(text)) {
      await showSubscribers(env, chatId);
    } else if (/yangi/i.test(text) || /^\/new/i.test(text)) {
      await showNew(env, chatId);
    } else {
      await send(env, chatId, "Quyidagi menyudan tanlang 👇", { reply_markup: MENU });
    }
  } catch (e) {
    console.log("telegram webhook xato:", e && e.message);
    try { await send(env, chatId, "⚠️ Xatolik yuz berdi. Keyinroq urinib ko'ring."); } catch {}
  }
  return new Response("ok");
}
