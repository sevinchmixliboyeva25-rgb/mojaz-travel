-- Cloudflare D1 jadvali: buyurtmalar, shaxsiy tur so'rovlari va obunalar
CREATE TABLE IF NOT EXISTS requests (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  code         TEXT UNIQUE,
  kind         TEXT NOT NULL,              -- booking | custom | newsletter
  status       TEXT NOT NULL DEFAULT 'new',-- new | contacted | paid | confirmed | cancelled
  tour_id      TEXT,
  tour_title   TEXT,
  departure    TEXT,
  adults       INTEGER,
  children     INTEGER,
  total_usd    REAL,
  due_now_usd  REAL,
  pay_option   TEXT,
  pay_channel  TEXT,
  name         TEXT,
  email        TEXT,
  phone        TEXT,
  country      TEXT,
  notes        TEXT,
  lang         TEXT,
  payload      TEXT,
  ip_country   TEXT,
  created_at   TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_requests_kind ON requests(kind, id);
CREATE INDEX IF NOT EXISTS idx_requests_departure ON requests(tour_id, departure);
