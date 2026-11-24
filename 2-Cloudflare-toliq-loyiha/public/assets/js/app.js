/* =========================================================
   Umumiy funksiyalar: til, valyuta, header/footer, kartalar,
   karusel, sevimlilar, buyurtmalar, API
   ========================================================= */
(function () {
  const LS = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { } }
  };
  const qs = new URLSearchParams(location.search);
  let lang = qs.get("lang") || LS.get("sy_lang", null) || ((navigator.language || "uz").slice(0, 2) === "ru" ? "ru" : (navigator.language || "").startsWith("en") ? "en" : "uz");
  if (!I18N[lang]) lang = "uz";
  let currency = LS.get("sy_cur", lang === "uz" ? "UZS" : "USD");
  if (!SITE.rates[currency]) currency = "USD";
  document.documentElement.lang = lang;

  const t = k => (I18N[lang] && I18N[lang][k]) || I18N.uz[k] || k;
  const tx = o => (o ? (o[lang] || o.en || o.uz || "") : "");
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function price(usd) {
    const rate = SITE.rates[currency] || 1, v = usd * rate;
    if (currency === "UZS") return Math.round(v / 1000).toLocaleString("ru-RU").replace(/,/g, " ") + " ming so'm";
    const sym = { USD: "$", EUR: "€" }[currency] || "";
    const n = Math.round(v).toLocaleString("en-US");
    return sym + n;
  }
  const MONTHS = {
    uz: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"],
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    ru: ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
  };
  const MONTHS_FULL = {
    uz: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    ru: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
  };
  const fmtDate = (d, year) => lang === "en" ? `${d.getDate()} ${MONTHS.en[d.getMonth()]}${year ? " " + d.getFullYear() : ""}` : `${d.getDate()} ${MONTHS[lang][d.getMonth()]}${year ? " " + d.getFullYear() : ""}`;
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const hash = s => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h); };

  /* ---------- Jo'nash sanalari (avtomatik) ---------- */
  function departures(tour, n = 8) {
    const out = [], today = new Date(); today.setHours(0, 0, 0, 0);
    const minDate = new Date(today); minDate.setDate(minDate.getDate() + 5);
    let candidates = [];
    if (tour.fixedDates) {
      for (let y = today.getFullYear(); y <= today.getFullYear() + 2; y++) tour.fixedDates.forEach(md => candidates.push(new Date(`${y}-${md}T00:00:00`)));
    } else {
      let d = new Date(minDate);
      if (tour.weekday !== undefined) while (d.getDay() !== tour.weekday) d.setDate(d.getDate() + 1);
      else d.setDate(d.getDate() + (hash(tour.id) % tour.every));
      for (let i = 0; i < 200 && candidates.length < Math.max(n * 3, 60); i++) { candidates.push(new Date(d)); d.setDate(d.getDate() + tour.every); }
    }
    for (const d of candidates) {
      if (d < minDate) continue;
      if (tour.season && !tour.season.includes(d.getMonth() + 1)) continue;
      const m = d.getMonth() + 1, end = new Date(d); end.setDate(end.getDate() + tour.days - 1);
      let mult = [4, 5, 9, 10].includes(m) ? 1.08 : ([12, 1, 2].includes(m) && !tour.collections.includes("winter") ? 0.92 : 1);
      const h = hash(tour.id + iso(d)) % 10, idx = out.length;
      let status = h <= 2 ? "few" : h <= 5 ? "guaranteed" : "available";
      if (h === 9 && idx > 0) status = "soldout";
      const seats = status === "few" ? 2 + (h % 3) : status === "soldout" ? 0 : 5 + (h % 6);
      out.push({ start: d, end, date: iso(d), price: Math.round(tour.price * mult / 5) * 5, status, seats });
      if (out.length >= n) break;
    }
    return out;
  }

  /* ---------- Sevimlilar ---------- */
  const wish = {
    all: () => LS.get("sy_wish", []),
    has: id => wish.all().includes(id),
    toggle(id) { const w = wish.all(); const i = w.indexOf(id); i >= 0 ? w.splice(i, 1) : w.push(id); LS.set("sy_wish", w); updateCounts(); return i < 0; }
  };
  function updateCounts() { $$("[data-wish-count]").forEach(el => { const n = wish.all().length; el.textContent = n || ""; el.dataset.n = n; }); }

  /* ---------- Ikonkalar ---------- */
  const IC = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.6-4.6"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 20.5s-7.5-4.6-9.2-9.4C1.6 7.6 4 4.5 7.3 4.5c2 0 3.6 1.1 4.7 2.7 1.1-1.6 2.7-2.7 4.7-2.7 3.3 0 5.7 3.1 4.5 6.6-1.7 4.8-9.2 9.4-9.2 9.4z"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="7.5" r="3.8"/><path d="M4.5 20.5c.8-4 3.8-6 7.5-6s6.7 2 7.5 6z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 21a9 9 0 1 0-8.1-5.1L3 21l5.1-.9A9 9 0 0 0 12 21z"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.5"/><circle cx="12" cy="16.6" r=".6" fill="currentColor"/></svg>',
    clock: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    users: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18.5 14.8c1.7.7 2.8 2.4 3 5.2"/></svg>',
    sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
    mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5l12 7-12 7z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8z"/></svg>',
    yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8zM10 15.2V8.8l5.2 3.2z"/></svg>',
    tg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 3.6L2.9 10.8c-1.3.5-1.2 1.3-.2 1.6l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.4l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.6zM9 13.4l9.3-5.9c.4-.3.8-.1.5.2l-7.6 6.9-.3 3.2z"/></svg>'
  };
  const LOGO = '<svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M7 42V22a17 17 0 0 1 34 0v20" fill="none" stroke="var(--c)" stroke-width="5.5" stroke-linecap="round"/><path d="M16.5 42V27a7.5 7.5 0 0 1 15 0v15z" fill="#e8613c"/><path d="M24 2.5l1.9 4 4.3.6-3.1 3 .8 4.3L24 12.3l-3.9 2.1.8-4.3-3.1-3 4.3-.6z" fill="#f2b134"/></svg>';

  /* ---------- Bayroqlar va til/valyuta tugmalari ---------- */
  const FLAGS = {
    uz: '<svg viewBox="0 0 30 20" class="flag-ico"><rect width="30" height="20" fill="#fff"/><rect width="30" height="6.4" fill="#0099b5"/><rect y="13.6" width="30" height="6.4" fill="#1eb53a"/><rect y="6.4" width="30" height=".6" fill="#ce1126"/><rect y="13" width="30" height=".6" fill="#ce1126"/><circle cx="5" cy="3.2" r="2.2" fill="#fff"/><circle cx="5.9" cy="3.2" r="2.2" fill="#0099b5"/><g fill="#fff"><circle cx="9" cy="1.6" r=".45"/><circle cx="10.6" cy="1.6" r=".45"/><circle cx="12.2" cy="1.6" r=".45"/><circle cx="9" cy="3.2" r=".45"/><circle cx="10.6" cy="3.2" r=".45"/><circle cx="12.2" cy="3.2" r=".45"/><circle cx="10.6" cy="4.8" r=".45"/><circle cx="12.2" cy="4.8" r=".45"/></g></svg>',
    en: '<svg viewBox="0 0 30 20" class="flag-ico"><rect width="30" height="20" fill="#fff"/><g fill="#b22234">' + [0, 2, 4, 6, 8, 10, 12].map(i => `<rect y="${i * 20 / 13}" width="30" height="${20 / 13}"/>`).join("") + '</g><rect width="12" height="10.77" fill="#3c3b6e"/><g fill="#fff">' + [1, 2, 3].map(r => [1, 2, 3, 4].map(c => `<circle cx="${c * 2.6 - 0.8}" cy="${r * 3 - 0.9}" r=".5"/>`).join("")).join("") + '</g></svg>',
    ru: '<svg viewBox="0 0 30 20" class="flag-ico"><rect width="30" height="6.67" fill="#fff"/><rect y="6.67" width="30" height="6.67" fill="#0039a6"/><rect y="13.33" width="30" height="6.67" fill="#d52b1e"/></svg>'
  };
  const LANG_LABEL = { uz: "UZB", en: "ENG", ru: "RUS" };
  function switchers(extra = "") {
    return `<div class="lang-switch ${extra}" role="group" aria-label="${t("language")}">${["uz", "en", "ru"].map(l => `<button type="button" data-lang="${l}" class="${l === lang ? "active" : ""}" aria-pressed="${l === lang}">${FLAGS[l]}<span>${LANG_LABEL[l]}</span></button>`).join("")}</div>
      <div class="cur-switch ${extra}" role="group" aria-label="${t("currency")}">${Object.keys(SITE.rates).map(c => `<button type="button" data-cur="${c}" class="${c === currency ? "active" : ""}" aria-pressed="${c === currency}">${{ UZS: "so'm", USD: "$", EUR: "€" }[c]}<small>${c}</small></button>`).join("")}</div>`;
  }
  function bindSwitchers(root) {
    $$("[data-lang]", root).forEach(b => b.onclick = () => { LS.set("sy_lang", b.dataset.lang); const u = new URL(location.href); u.searchParams.delete("lang"); location.href = u.toString(); });
    $$("[data-cur]", root).forEach(b => b.onclick = () => { LS.set("sy_cur", b.dataset.cur); location.reload(); });
  }

  /* ---------- Header ---------- */
  function megaCol(list, key) {
    return list.map(x => `<a href="tours.html?${key}=${x.id}">${x.icon ? x.icon + " " : ""}${esc(tx(x.name))}<small>${countTours(key, x.id)} ${tripsWord(countTours(key, x.id))}</small></a>`).join("");
  }
  const tripsWord = n => lang === "en" && n === 1 ? "trip" : lang === "ru" && n % 10 === 1 && n % 100 !== 11 ? "тур" : lang === "ru" && [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? "тура" : t("tours_count");
  function countTours(key, id) {
    const field = { region: "regions", activity: "activities", collection: "collections", type: "type" }[key];
    return TOURS.filter(tr => tr[field].includes(id)).length;
  }
  function renderHeader(opts = {}) {
    const page = location.pathname.split("/").pop() || "index.html";
    const h = document.createElement("header");
    h.className = "site-header" + (opts.transparent ? " transparent" : "");
    h.innerHTML = `
      <div class="header-inner">
        <a class="logo" href="index.html" aria-label="${SITE.brand}">${LOGO}<span><b>${SITE.brand}</b><small>${SITE.brandSub}</small></span></a>
        <nav class="main-nav" aria-label="Main">
          <div class="has-mega"><a href="tours.html" data-mega="region">${t("nav_dest")}</a><div class="mega"><div class="mega-grid">${megaCol(DESTINATIONS, "region")}</div></div></div>
          <div class="has-mega"><a href="tours.html" data-mega="activity">${t("nav_act")}</a><div class="mega"><div class="mega-grid">${megaCol(ACTIVITIES, "activity")}</div></div></div>
          <div class="has-mega"><a href="tours.html">${t("nav_col")}</a><div class="mega"><div class="mega-grid">${megaCol(COLLECTIONS, "collection")}</div></div></div>
          <a href="index.html#inspiration">${t("nav_insp")}</a>
          <a href="index.html#why">${t("nav_about")}</a>
          <a href="index.html#deals">${t("nav_deals")}</a>
        </nav>
        <div class="header-tools">
          ${switchers("in-header")}
          <button class="icon-btn" id="openSearch" aria-label="Search">${IC.search}</button>
          <a class="icon-btn" href="tours.html?wishlist=1" aria-label="${t("wishlist")}">${IC.heart}<span class="badge-count" data-wish-count></span></a>
          <button class="icon-btn" id="openAccount" aria-label="${t("my_bookings")}">${IC.user}</button>
          <button class="icon-btn menu-toggle" id="openMenu" aria-label="Menu">${IC.menu}</button>
        </div>
      </div>`;
    document.body.prepend(h);
    if (opts.transparent) {
      const onScroll = () => h.classList.toggle("transparent", scrollY < 60);
      addEventListener("scroll", onScroll, { passive: true }); onScroll();
    }
    bindSwitchers(h);
    $("#openSearch", h).onclick = openSearch;
    $("#openMenu", h).onclick = () => openDrawer("menuDrawer");
    $("#openAccount", h).onclick = () => { renderMyBookings(); openDrawer("accDrawer"); };

    // Mobile drawer + account drawer + search overlay + help
    document.body.insertAdjacentHTML("beforeend", `
      <div class="drawer" id="menuDrawer"><div class="drawer-backdrop" data-close></div><div class="drawer-panel">
        <div class="drawer-head"><a class="logo" href="index.html">${LOGO}<span><b>${SITE.brand}</b></span></a><button class="icon-btn" data-close aria-label="${t("close")}">${IC.close}</button></div>
        <div class="drawer-body"><nav class="mobile-nav">
          <a href="tours.html">${t("tours_title")}</a>
          <a href="tours.html?type=domestic">${t("t_domestic")}</a>
          <a href="tours.html?type=inbound">${t("t_inbound")}</a>
          <a href="index.html#explore">${t("nav_dest")}</a>
          <a href="index.html#inspiration">${t("nav_insp")}</a>
          <a href="index.html#why">${t("nav_about")}</a>
          <a href="index.html#deals">${t("nav_deals")}</a>
          <a href="index.html#custom">${t("hero_custom")}</a>
        </nav>
        <div class="drawer-switch">${switchers("in-drawer")}</div></div></div></div>
      <div class="drawer" id="accDrawer"><div class="drawer-backdrop" data-close></div><div class="drawer-panel">
        <div class="drawer-head"><h3>${t("my_bookings")}</h3><button class="icon-btn" data-close aria-label="${t("close")}">${IC.close}</button></div>
        <div class="drawer-body" id="myBookings"></div></div></div>
      <div class="search-overlay" id="searchOverlay" role="dialog" aria-modal="true">
        <button class="icon-btn search-close" id="closeSearch" aria-label="${t("close")}">${IC.close}</button>
        <div class="container"><input id="searchInput" placeholder="${t("search_ph")}" autocomplete="off"><div class="search-results" id="searchResults"></div></div>
      </div>`);
    bindSwitchers($("#menuDrawer"));
    $$(".drawer [data-close]").forEach(b => b.onclick = () => b.closest(".drawer").classList.remove("open"));
    $("#closeSearch").onclick = closeSearch;
    $("#searchInput").oninput = e => renderSearch(e.target.value);
    addEventListener("keydown", e => { if (e.key === "Escape") { closeSearch(); $$(".drawer.open").forEach(d => d.classList.remove("open")); } });
    updateCounts();
  }
  function openDrawer(id) { $("#" + id).classList.add("open"); }
  function openSearch() { $("#searchOverlay").classList.add("open"); document.body.style.overflow = "hidden"; setTimeout(() => $("#searchInput").focus(), 50); renderSearch(""); }
  function closeSearch() { const o = $("#searchOverlay"); if (o) o.classList.remove("open"); document.body.style.overflow = ""; }
  function matchTour(tr, q) {
    q = q.toLowerCase().trim(); if (!q) return true;
    const hay = [tx(tr.title), tx(tr.summary), tr.title.uz, tr.title.en, ...tr.regions.map(r => { const d = DESTINATIONS.find(x => x.id === r); return d ? Object.values(d.name).join(" ") : ""; }),
      ...tr.activities.map(a => { const d = ACTIVITIES.find(x => x.id === a); return d ? Object.values(d.name).join(" ") : ""; })].join(" ").toLowerCase();
    return q.split(/\s+/).every(w => hay.includes(w));
  }
  function renderSearch(q) {
    const res = TOURS.filter(tr => matchTour(tr, q)).slice(0, 8);
    $("#searchResults").innerHTML = res.map(tr => `<a href="tour.html?id=${tr.id}"><span class="thumb media">${media(tr, hash(tr.id))}</span><span><b>${esc(tx(tr.title))}</b><br><small>${tr.days} ${t("days")} · ${t("from")} ${price(tr.price)}</small></span></a>`).join("") || `<p style="opacity:.7">${t("no_results")}</p>`;
  }

  /* ---------- Mening buyurtmalarim ---------- */
  function renderMyBookings() {
    const list = LS.get("sy_bookings", []);
    $("#myBookings").innerHTML = list.length ? list.slice().reverse().map(b => `<div class="mb-item"><b>${esc(b.tour_title)}</b>
      <small>${esc(b.code)} · ${esc(b.departure)} · ${b.adults + b.children} ${t("travellers")}</small><br>
      <small>${t("total")}: <b style="display:inline">${price(b.total_usd)}</b> · ${b.offline ? "⏳ offline" : "✓"}</small></div>`).join("") : `<p style="color:var(--muted)">${t("no_bookings")}</p>`;
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    const f = document.createElement("footer");
    f.className = "site-footer";
    f.innerHTML = `
      <div class="container">
        <div class="foot-grid">
          <div>
            <a class="logo" href="index.html">${LOGO}<span><b>${SITE.brand}</b><small>${SITE.brandSub}</small></span></a>
            <p style="margin-top:18px;max-width:340px">${t("foot_about")}</p>
            <div class="socials">
              <a href="${SITE.socials.instagram}" aria-label="Instagram" target="_blank" rel="noopener">${IC.ig}</a>
              <a href="${SITE.socials.facebook}" aria-label="Facebook" target="_blank" rel="noopener">${IC.fb}</a>
              <a href="${SITE.socials.youtube}" aria-label="YouTube" target="_blank" rel="noopener">${IC.yt}</a>
              <a href="https://t.me/${SITE.telegram}" aria-label="Telegram" target="_blank" rel="noopener">${IC.tg}</a>
            </div>
          </div>
          <div><h4>${t("foot_company")}</h4><ul>
            <li><a href="index.html#why">${t("l_about")}</a></li><li><a href="index.html#why">${t("l_guides")}</a></li>
            <li><a href="index.html#custom">${t("l_careers")}</a></li><li><a href="index.html#custom">${t("l_partners")}</a></li>
            <li><a href="tours.html?type=domestic">${t("t_domestic")}</a></li><li><a href="tours.html?type=inbound">${t("t_inbound")}</a></li></ul></div>
          <div><h4>${t("foot_help")}</h4><ul>
            <li><a href="index.html#faq">${t("l_faq")}</a></li><li><a href="index.html#faq">${t("l_terms")}</a></li>
            <li><a href="index.html#faq">${t("l_privacy")}</a></li><li><a href="index.html#faq">${t("l_cancel")}</a></li>
            <li><a href="#" data-open-account>${t("l_mybookings")}</a></li></ul></div>
          <div><h4>${t("foot_contact")}</h4><ul>
            <li><a href="tel:${SITE.phone.replace(/\s/g, "")}">📞 ${SITE.phone}</a></li>
            <li><a href="mailto:${SITE.email}">✉️ ${SITE.email}</a></li>
            <li><a href="https://t.me/${SITE.telegram}" target="_blank" rel="noopener">✈️ @${SITE.telegram}</a></li>
            <li>📍 ${esc(tx(SITE.address))}</li></ul>
            <h4 style="margin-top:22px">${t("foot_pay")}</h4>
            <div class="paylogos"><span style="color:#00baf2">Payme</span><span style="color:#0079fe">Click</span><span style="color:#7000ff">Uzum</span><span style="color:#1a1f71">VISA</span><span style="color:#eb001b">Mastercard</span><span style="color:#0d6b3a">Humo</span><span style="color:#004b8d">UzCard</span></div>
          </div>
        </div>
        <div class="foot-bottom"><span>© ${new Date().getFullYear()} ${SITE.brand}. ${t("rights")}</span><span>${SITE.license}</span></div>
      </div>`;
    document.body.append(f);
    fx();
    $$("[data-open-account]").forEach(a => a.onclick = e => { e.preventDefault(); renderMyBookings(); openDrawer("accDrawer"); });

    // Help FAB
    document.body.insertAdjacentHTML("beforeend", `
      <button class="help-fab" id="helpFab" aria-label="${t("help_title")}">${IC.help}</button>
      <div class="help-pop" id="helpPop"><header><b>${t("help_title")}</b><small>${t("help_text")}</small></header>
        <div class="opts">
          <a href="https://t.me/${SITE.telegram}" target="_blank" rel="noopener"><i>✈️</i> Telegram</a>
          <a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener"><i>💬</i> WhatsApp</a>
          <a href="tel:${SITE.phone.replace(/\s/g, "")}"><i>📞</i> ${SITE.phone}</a>
          <a href="index.html#custom"><i>🗺️</i> ${t("hero_custom")}</a>
        </div></div>`);
    $("#helpFab").onclick = () => $("#helpPop").classList.toggle("open");
    document.addEventListener("click", e => { if (!e.target.closest("#helpPop,#helpFab")) $("#helpPop").classList.remove("open"); });
  }

  /* ---------- Kartalar ---------- */
  function diffBars(n) { return `<span class="diff" title="${t("difficulty")} ${n}/5">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= n ? "on" : ""}"></i>`).join("")}</span>`; }
  function tourCard(tr) {
    const flags = [];
    if (tr.oldPrice) flags.push(`<span class="flag coral">-${Math.round((1 - tr.price / tr.oldPrice) * 100)}%</span>`);
    if (tr.collections.includes("new")) flags.push(`<span class="flag gold">${tx(COLLECTIONS.find(c => c.id === "new").name)}</span>`);
    if (tr.collections.includes("bestsellers")) flags.push(`<span class="flag">★ ${tx(COLLECTIONS.find(c => c.id === "bestsellers").name)}</span>`);
    if (tr.collections.includes("premium")) flags.push(`<span class="flag teal">Premium</span>`);
    const region = tr.regions.map(r => tx((DESTINATIONS.find(d => d.id === r) || {}).name)).slice(0, 2).join(", ");
    return `<article class="tcard reveal">
      <div class="media">${media(tr, hash(tr.id))}</div>
      <div class="flags">${flags.join("")}</div>
      <button class="fav ${wish.has(tr.id) ? "on" : ""}" data-fav="${tr.id}" aria-label="${t("wishlist")}">${IC.heart}</button>
      <div class="body">
        <div class="meta"><span>${IC.clock} ${tr.days} ${t("days")}</span><span>${IC.pin} ${esc(region)}</span><span>${diffBars(tr.difficulty)}</span></div>
        <h3><a href="tour.html?id=${tr.id}">${esc(tx(tr.title))}</a></h3>
        <p>${esc(tx(tr.summary))}</p>
        ${tr.assets ? `<div class="assets">${(tr.assets[lang] || tr.assets.en || tr.assets.uz).slice(0, 3).map(a => `<span>${esc(a)}</span>`).join("")}</div>` : ""}
        <div class="foot">
          <div class="price"><small>${t("from")}</small><b>${price(tr.price)}</b>${tr.oldPrice ? `<s>${price(tr.oldPrice)}</s>` : ""}</div>
          <span class="rating"><span class="st">★</span> ${tr.rating.toFixed(1)} <small>(${tr.reviews})</small></span>
        </div>
      </div></article>`;
  }
  function bindFavs(root = document) {
    $$("[data-fav]", root).forEach(b => {
      if (b._bound) return; b._bound = true;
      b.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); const on = wish.toggle(b.dataset.fav); b.classList.toggle("on", on); b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); });
    });
  }
  function tile(item, key, extra = "") {
    const n = countTours(key, item.id);
    return `<a class="dcard" href="tours.html?${key}=${item.id}"><div class="media">${media(item, hash(item.id) + 3)}</div>${item.icon ? `<span class="ico">${item.icon}</span>` : ""}
      <span class="label">${esc(tx(item.name))}<small>${item.sub ? esc(tx(item.sub)) + " · " : ""}${n} ${tripsWord(n)}${extra}</small></span></a>`;
  }

  /* ---------- Karusel ---------- */
  function carousel(root) {
    const track = $(".track", root), prev = $(".prev", root), next = $(".next", root), dotsEl = $(".dots", root);
    const step = () => track.clientWidth * 0.8;
    if (prev) prev.onclick = () => track.scrollBy({ left: -step() });
    if (next) next.onclick = () => track.scrollBy({ left: step() });
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      if (prev) prev.hidden = track.scrollLeft < 10;
      if (next) next.hidden = track.scrollLeft > max - 10;
      if (dotsEl) {
        const pages = Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth));
        if (dotsEl.children.length !== pages) dotsEl.innerHTML = Array.from({ length: pages }, (_, i) => `<button aria-label="${i + 1}"></button>`).join("");
        const cur = max <= 0 ? 0 : Math.round(track.scrollLeft / max * (pages - 1));
        [...dotsEl.children].forEach((d, i) => { d.classList.toggle("active", i === cur); d.onclick = () => track.scrollTo({ left: i / (pages - 1 || 1) * max }); });
      }
    };
    track.addEventListener("scroll", update, { passive: true }); addEventListener("resize", update); update();
    // drag to scroll (desktop)
    let down = false, sx = 0, sl = 0, moved = false;
    track.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; });
    addEventListener("pointermove", e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 5) { moved = true; track.classList.add("dragging"); } track.scrollLeft = sl - dx; });
    addEventListener("pointerup", () => { if (!down) return; down = false; track.classList.remove("dragging"); });
    track.addEventListener("click", e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    track.addEventListener("dragstart", e => e.preventDefault());
    return { update };
  }

  /* ---------- Paydo bo'lish animatsiyasi ---------- */
  let io;
  function reveal() {
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach(e => e.classList.add("in")); return; }
    io = io || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal:not(.in)").forEach(e => io.observe(e));
  }
  function counters() {
    const els = $$("[data-count]");
    const run = el => { const end = parseFloat(el.dataset.count), dec = (el.dataset.count.split(".")[1] || "").length, dur = 1600, t0 = performance.now(); const tick = now => { const p = Math.min(1, (now - t0) / dur), v = end * (1 - Math.pow(1 - p, 3)); el.textContent = (dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en-US")) + (el.dataset.suffix || ""); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
    if (!("IntersectionObserver" in window)) return els.forEach(run);
    const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { run(e.target); o.unobserve(e.target); } }), { threshold: .5 });
    els.forEach(e => o.observe(e));
  }

  /* ---------- Effektlar: aylantirish chizig'i va 3D egilish ---------- */
  function fx() {
    const bar = document.createElement("div"); bar.className = "scroll-progress"; document.body.append(bar);
    addEventListener("scroll", () => { const h = document.documentElement.scrollHeight - innerHeight; bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + "%"; }, { passive: true });
    if (!matchMedia("(hover: hover)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.addEventListener("pointermove", e => {
      const c = e.target.closest && e.target.closest(".tcard, .type-card");
      $$(".tilt").forEach(x => { if (x !== c) { x.style.transform = ""; x.classList.remove("tilt"); } });
      if (!c) return;
      const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      c.classList.add("tilt");
      c.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-6px)`;
    });
  }

  /* ---------- API ---------- */
  async function send(kind, data) {
    const payload = { kind, lang, currency, ...data, created_at: new Date().toISOString() };
    try {
      const r = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const j = await r.json();
      return { ok: true, offline: false, code: j.code || payload.code };
    } catch (e) {
      const q = LS.get("sy_outbox", []); q.push(payload); LS.set("sy_outbox", q);
      return { ok: true, offline: true, code: payload.code };
    }
  }
  const makeCode = () => "SY-" + Date.now().toString(36).slice(-4).toUpperCase() + Math.random().toString(36).slice(2, 4).toUpperCase();

  function bindSimpleForm(form, kind) {
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const btn = $("button[type=submit]", form), ok = $(".form-ok", form.parentElement) || $(".form-ok", form);
      const data = Object.fromEntries(new FormData(form));
      btn.disabled = true; const label = btn.textContent; btn.textContent = t("sending");
      const res = await send(kind, data);
      btn.disabled = false; btn.textContent = label; form.reset();
      if (ok) {
        ok.textContent = kind === "newsletter" ? t("news_ok") : t("sent_ok");
        if (res.offline && kind !== "newsletter") {
          const txt = Object.entries(data).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
          ok.insertAdjacentHTML("beforeend", ` <a class="btn btn-primary btn-sm" style="background:#25d366;margin-top:8px" target="_blank" rel="noopener" href="https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("🗺 " + txt)}">💬 WhatsApp</a>`);
        }
        ok.classList.add("show");
      }
    });
  }

  function applyI18n(root = document) {
    $$("[data-i18n]", root).forEach(el => el.textContent = t(el.dataset.i18n));
    $$("[data-i18n-ph]", root).forEach(el => el.placeholder = t(el.dataset.i18nPh));
  }

  window.App = { lang, currency, t, tx, esc, $, $$, price, fmtDate, iso, MONTHS_FULL, hash, departures, wish, IC, LS, renderHeader, renderFooter, tourCard, bindFavs, tile, carousel, reveal, counters, send, makeCode, bindSimpleForm, applyI18n, diffBars, updateCounts, matchTour, qs };
})();
