/**
 * Cloudflare Pages Function: /api/bookings
 *
 *  POST  /api/bookings                 — yangi buyurtma / so'rov / obuna (ochiq)
 *  GET   /api/bookings?kind=booking    — ro'yxat (Authorization: Bearer ADMIN_TOKEN)
 *  PATCH /api/bookings  {id, status}   — holatni o'zgartirish (admin)
 *
 * Bog'lanishlar (Cloudflare Pages > Settings):
 *   DB                  — D1 database (schema.sql)
 *   ADMIN_TOKEN         — secret, admin panel uchun parol
 *   TELEGRAM_BOT_TOKEN  — secret (ixtiyoriy), yangi buyurtma haqida xabar
 *   TELEGRAM_CHAT_ID    — o'zgaruvchi (ixtiyoriy), menejerlar chati ID si (bir nechta bo'lsa vergul bilan: 111,222)
 */

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });

const clip = (v, n = 500) => (v === undefined || v === null ? null : String(v).slice(0, n));
const KINDS = ["booking", "custom", "newsletter"];
const STATUSES = ["new", "contacted", "paid", "confirmed", "cancelled"];

function isAdmin(request, env) {
  const h = request.headers.get("Authorization") || "";
  return env.ADMIN_TOKEN && h === `Bearer ${env.ADMIN_TOKEN}`;
}

function makeCode() {
  const a = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const b = crypto.getRandomValues(new Uint8Array(6));
  return "SY-" + [...b].map(x => a[x % a.length]).join("");
}

async function notifyTelegram(env, r) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;
  const title = { booking: "🆕 Yangi buyurtma", custom: "🗺 Shaxsiy tur so'rovi", newsletter: "📬 Yangi obunachi" }[r.kind];
  const e = v => String(v).replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
  const lines = [
    `<b>${title}</b>` + (r.code ? ` · <code>${e(r.code)}</code>` : ""),
    r.tour_title && `🧭 ${e(r.tour_title)}`,
    r.departure && `📅 ${e(r.departure)}`,
    r.adults != null && `👥 ${r.adults} katta, ${r.children || 0} bola`,
    r.total_usd != null && `💵 Jami: $${r.total_usd} · Hozir: $${r.due_now_usd || 0} (${e(r.pay_option)}/${e(r.pay_channel)})`,
    r.name && `👤 ${e(r.name)}`,
    r.phone && `📞 ${e(r.phone)}`,
    r.email && `✉️ ${e(r.email)}`,
    r.country && `🌍 ${e(r.country)}`,
    r.notes && `📝 ${e(r.notes)}`
  ].filter(Boolean);
  try {
    // TELEGRAM_CHAT_ID da bir nechta ID ni vergul bilan yozish mumkin: "111,222,-100333"
    const ids = String(env.TELEGRAM_CHAT_ID).split(",").map(s => s.trim()).filter(Boolean);
    await Promise.all(ids.map(id => fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: id, text: lines.join("\n"), parse_mode: "HTML" })
    }).catch(() => {})));
  } catch (e) { /* xabar yuborilmasa ham buyurtma saqlanadi */ }
}

export async function onRequestPost({ request, env, waitUntil }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
  const kind = KINDS.includes(body.kind) ? body.kind : "custom";

  // Oddiy tekshiruvlar
  if (kind === "booking" && (!body.name || !body.phone || !body.tour_id || !body.departure)) return json({ error: "Missing fields" }, 422);
  if (kind === "newsletter" && !/^\S+@\S+\.\S+$/.test(body.email || "")) return json({ error: "Invalid email" }, 422);
  if (body.website) return json({ ok: true }); // honeypot

  const rec = {
    code: kind === "newsletter" ? null : makeCode(),
    kind,
    status: "new",
    tour_id: clip(body.tour_id, 80),
    tour_title: clip(body.tour_title, 200),
    departure: clip(body.departure, 20),
    adults: Number.isFinite(+body.adults) ? Math.max(0, Math.min(99, +body.adults)) : null,
    children: Number.isFinite(+body.children) ? Math.max(0, Math.min(99, +body.children)) : null,
    total_usd: Number.isFinite(+body.total_usd) ? +body.total_usd : null,
    due_now_usd: Number.isFinite(+body.due_now_usd) ? +body.due_now_usd : null,
    pay_option: clip(body.pay_option, 20),
    pay_channel: clip(body.pay_channel, 20),
    name: clip(body.name, 120),
    email: clip(body.email, 160),
    phone: clip(body.phone, 40),
    country: clip(body.country, 80),
    notes: clip(body.notes || body.message, 2000),
    lang: clip(body.lang, 5),
    payload: clip(JSON.stringify(body), 8000),
    ip_country: request.cf && request.cf.country ? request.cf.country : null,
    created_at: new Date().toISOString()
  };

  if (!env.DB) return json({ error: "Database not configured" }, 503);

  const cols = Object.keys(rec);
  await env.DB.prepare(`INSERT INTO requests (${cols.join(",")}) VALUES (${cols.map(() => "?").join(",")})`)
    .bind(...cols.map(c => rec[c])).run();

  waitUntil(notifyTelegram(env, rec));
  return json({ ok: true, code: rec.code });
}

export async function onRequestGet({ request, env }) {
  if (!isAdmin(request, env)) return json({ error: "Unauthorized" }, 401);
  if (!env.DB) return json({ error: "Database not configured" }, 503);
  const url = new URL(request.url);
  const kind = url.searchParams.get("kind");
  const limit = Math.min(500, +url.searchParams.get("limit") || 200);
  const stmt = kind && KINDS.includes(kind)
    ? env.DB.prepare("SELECT * FROM requests WHERE kind = ? ORDER BY id DESC LIMIT ?").bind(kind, limit)
    : env.DB.prepare("SELECT * FROM requests ORDER BY id DESC LIMIT ?").bind(limit);
  const { results } = await stmt.all();
  return json({ results });
}

export async function onRequestPatch({ request, env }) {
  if (!isAdmin(request, env)) return json({ error: "Unauthorized" }, 401);
  if (!env.DB) return json({ error: "Database not configured" }, 503);
  const { id, status } = await request.json().catch(() => ({}));
  if (!id || !STATUSES.includes(status)) return json({ error: "Bad request" }, 400);
  await env.DB.prepare("UPDATE requests SET status = ? WHERE id = ?").bind(status, id).run();
  return json({ ok: true });
}
