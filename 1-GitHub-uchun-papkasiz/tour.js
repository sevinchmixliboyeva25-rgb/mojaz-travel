/* Tur sahifasi + band qilish oynasi */
(function () {
  const { t, tx, $, $$, esc, price, IC, qs } = App;
  const tour = TOURS.find(x => x.id === qs.get("id"));
  App.renderHeader({ transparent: true });
  if (!tour) { location.replace("tours.html"); return; }
  document.title = tx(tour.title) + " — " + SITE.brand;
  const name = (arr, id) => tx((arr.find(x => x.id === id) || {}).name);
  const deps = App.departures(tour, 12);
  const minPrice = Math.min(...deps.filter(d => d.status !== "soldout").map(d => d.price), tour.price);
  const lines = k => t(k).split("|");
  const itin = tour.itinerary.map(d => d[App.lang] || d.en || d.uz);
  const hl = tour.highlights[App.lang] || tour.highlights.en || tour.highlights.uz;
  const revs = REVIEWS.filter(r => r.tour === tour.id).concat(REVIEWS.filter(r => r.tour !== tour.id)).slice(0, 3);

  $("#tourRoot").innerHTML = `
  <section class="tour-hero">
    <div class="media">${media(tour, App.hash(tour.id), true)}</div>
    <div class="container">
      <div class="crumbs"><a href="index.html">${t("home")}</a> / <a href="tours.html">${t("tours_title")}</a> / <a href="tours.html?region=${tour.regions[0]}">${esc(name(DESTINATIONS, tour.regions[0]))}</a></div>
      <span class="rating" style="color:#fff;margin-bottom:10px"><span class="st">★★★★★</span> ${tour.rating.toFixed(1)} <small style="color:#fff;opacity:.8">(${tour.reviews} ${t("reviews_word")})</small></span>
      <h1>${esc(tx(tour.title))}</h1>
      <p class="lead">${esc(tx(tour.summary))}</p>
      <div class="quick">
        <span>⏱ ${tour.days} ${t("days")}</span>
        <span>📍 ${esc(tour.regions.map(r => name(DESTINATIONS, r)).join(" · "))}</span>
        <span>👥 ${t("max")} ${tour.group}</span>
        <span>${tour.type.map(x => x === "inbound" ? "🌍 " + t("t_inbound") : "🇺🇿 " + t("t_domestic")).join(" · ")}</span>
      </div>
    </div>
  </section>
  <nav class="subnav" id="subnav"><div class="container">
    <a href="#overview">${t("overview")}</a><a href="#itinerary">${t("itinerary")}</a><a href="#included">${t("included")}</a>
    <a href="#dates">${t("dates_prices")}</a><a href="#reviews">${t("reviews")}</a><a href="#faq">FAQ</a>
    <div class="sn-price"><span class="price"><small style="display:inline">${t("from")}</small> <b style="font-size:1.2rem">${price(minPrice)}</b></span><button class="btn btn-primary btn-sm" data-book>${t("book_now")}</button></div>
  </div></nav>
  <div class="container tour-layout">
    <div class="tour-main">
      <section id="overview">
        <h2>${t("overview")}</h2>
        <div class="facts">
          <div class="fact"><small>${t("days")}</small><b>${tour.days}</b></div>
          <div class="fact"><small>${t("difficulty")}</small><b>${App.diffBars(tour.difficulty)} ${tour.difficulty}/5</b></div>
          <div class="fact"><small>${t("group_size")}</small><b>${t("max")} ${tour.group}</b></div>
          <div class="fact"><small>${t("start_point")}</small><b>${esc(tour.start)}</b></div>
          <div class="fact"><small>${t("activity")}</small><b>${tour.activities.map(a => (ACTIVITIES.find(x => x.id === a) || {}).icon).join(" ")}</b></div>
          <div class="fact"><small>${t("trip_type")}</small><b>${tour.type.map(x => x === "inbound" ? "🌍" : "🇺🇿").join(" ")}</b></div>
        </div>
        ${tour.best ? `<div class="trend-why" style="margin:0 0 24px"><b>🏆 ${t("why_best")}</b> ${esc(tx(tour.best))}</div>` : ""}
        ${tour.trend ? `<div class="trend-why" style="margin:0 0 24px"><b>🔥 ${t("why_trend")}</b> ${esc(tx(tour.trend))}</div>` : ""}
        ${tour.assets ? `<h3>${t("main_assets")}</h3><div class="assets big">${(tour.assets[App.lang] || tour.assets.en || tour.assets.uz).map(a => `<span>${esc(a)}</span>`).join("")}</div>` : ""}
        <h3>${t("highlights")}</h3>
        <ul class="hl-list">${hl.map(h => `<li>${esc(h)}</li>`).join("")}</ul>
      </section>
      <section id="itinerary">
        <h2>${t("itinerary")}</h2>
        <ol class="timeline">${itin.map(([title, desc], i) => `<li class="reveal"><span class="dn">${i + 1}</span>
          <details ${i < 2 ? "open" : ""}><summary>${esc(title)}</summary>${desc ? `<p>${esc(desc)}</p>` : ""}</details></li>`).join("")}</ol>
      </section>
      <section id="included">
        <h2>${t("included")}</h2>
        <div class="incl"><div><h3 style="font-size:1.05rem">✓ ${t("included")}</h3><ul class="yes">${lines("inc_list").map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div><h3 style="font-size:1.05rem">✕ ${t("not_included")}</h3><ul class="no">${lines("exc_list").map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></div>
      </section>
      <section id="dates">
        <h2>${t("dates_prices")}</h2>
        <div class="dep-filter" id="tdFilter"></div>
        <table class="dep-table"><thead><tr><th>${t("th_dates")}</th><th>${t("th_status")}</th><th>${t("th_price")}</th><th></th></tr></thead><tbody id="tdBody"></tbody></table>
      </section>
      <section id="reviews">
        <h2>${t("reviews")}</h2>
        <div class="rsummary" style="margin-bottom:20px"><span class="big">${tour.rating.toFixed(1)}</span><span><span class="stars"><i>★</i><i>★</i><i>★</i><i>★</i><i>★</i></span><br><small>${tour.reviews} ${t("reviews_word")}</small></span></div>
        <div style="display:grid;gap:14px">${revs.map(r => `<figure class="rcard" style="width:auto;margin:0"><span class="stars gold">${"<i>★</i>".repeat(r.stars)}</span><blockquote>“${esc(tx(r.text))}”</blockquote><figcaption class="who"><span class="avatar">${r.name[0]}</span><span><b>${esc(r.name)}</b> ${r.country}</span></figcaption></figure>`).join("")}</div>
      </section>
      <section id="faq">
        <h2>FAQ</h2>
        <div class="faq" style="margin:0">${FAQ.slice(0, 4).map(f => `<details><summary>${esc(tx(f.q))}</summary><p>${esc(tx(f.a))}</p></details>`).join("")}</div>
      </section>
    </div>
    <aside>
      <div class="book-card">
        <div class="price"><small>${t("from")}</small><b>${price(minPrice)}</b>${tour.oldPrice ? `<s>${price(tour.oldPrice)}</s>` : ""}<small>${t("per_person")}</small></div>
        <div style="display:flex;gap:10px;margin-top:16px">
          <button class="btn btn-primary btn-lg" style="flex:1" data-book>${t("book_now")}</button>
          <button class="btn btn-ghost fav ${App.wish.has(tour.id) ? "on" : ""}" data-fav="${tour.id}" style="position:static;width:auto;height:auto;border-radius:10px;border:2px solid var(--line);padding:0 14px" aria-label="${t("wishlist")}">${IC.heart}</button>
        </div>
        <ul><li>${t("deposit_note")}</li><li>${t("free_change")}</li><li>${t("secure_pay")}: Payme · Click · Uzum · Visa</li><li>${t("why3_t")}</li></ul>
        <div class="ask"><b>${t("ask_q")}</b><br><a class="link-arrow" href="https://t.me/${SITE.telegram}" target="_blank" rel="noopener">Telegram</a> &nbsp; <a class="link-arrow" href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp</a><br><a href="tel:${SITE.phone.replace(/\s/g, "")}">📞 ${SITE.phone}</a></div>
      </div>
    </aside>
  </div>
  <section class="section white">
    <div class="container">
      <div class="sec-head"><h2 class="h2">${t("similar")}</h2><a class="link-arrow" href="tours.html">${t("see_all")}</a></div>
      <div class="grid-tours" id="similar"></div>
    </div>
  </section>
  <div class="mobile-book"><div class="price"><small>${t("from")}</small><b>${price(minPrice)}</b></div><button class="btn btn-primary" data-book>${t("book_now")}</button></div>`;
  document.body.classList.add("has-mobile-book");

  /* Sanalar jadvali */
  const months = [...new Set(deps.map(d => d.start.getFullYear() * 12 + d.start.getMonth()))];
  let tdMonth = "all";
  $("#tdFilter").innerHTML = `<button class="chip active" data-m="all">${t("all_months")}</button>` + months.map(m => `<button class="chip" data-m="${m}">${App.MONTHS_FULL[App.lang][m % 12]} ${Math.floor(m / 12)}</button>`).join("");
  $$("#tdFilter .chip").forEach(c => c.onclick = () => { $$("#tdFilter .chip").forEach(x => x.classList.toggle("active", x === c)); tdMonth = c.dataset.m; renderDates(); });
  function renderDates() {
    $("#tdBody").innerHTML = deps.filter(d => tdMonth === "all" || d.start.getFullYear() * 12 + d.start.getMonth() === +tdMonth).map(d => `<tr>
      <td class="dep-dates"><b>${App.fmtDate(d.start)}</b> — ${App.fmtDate(d.end, true)}</td>
      <td><span class="status ${d.status}">${t("st_" + d.status)}</span>${d.status === "few" ? ` <small style="color:var(--muted)">· ${d.seats} ${t("seats_left")}</small>` : ""}</td>
      <td><b style="font-family:var(--ff-head);font-size:1.15rem">${price(d.price)}</b></td>
      <td>${d.status === "soldout" ? "" : `<button class="btn btn-primary btn-sm" data-book="${d.date}">${t("book")}</button>`}</td></tr>`).join("");
    bindBook();
  }
  renderDates();

  /* O'xshash turlar */
  const sim = TOURS.filter(x => x.id !== tour.id).map(x => ({ x, s: x.regions.filter(r => tour.regions.includes(r)).length * 2 + x.activities.filter(a => tour.activities.includes(a)).length + x.type.filter(a => tour.type.includes(a)).length })).sort((a, b) => b.s - a.s).slice(0, 3).map(o => o.x);
  $("#similar").innerHTML = sim.map(App.tourCard).join("");
  App.bindFavs();

  /* Subnav faol bo'lim */
  const links = $$("#subnav a[href^='#']");
  if ("IntersectionObserver" in window) {
    const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id)); }), { rootMargin: "-40% 0px -55% 0px" });
    $$(".tour-main section").forEach(s => so.observe(s));
  }

  /* =================== BAND QILISH =================== */
  const B = { step: 1, date: null, adults: 2, children: 0, singles: 0, extras: {}, pay: "deposit", channel: "Payme", contact: {} };
  const EXTRAS = [
    { id: "transfer", label: t("ex_transfer"), price: 25, per: "booking" },
    { id: "insurance", label: t("ex_insurance"), price: 2 * tour.days, per: "person" },
    { id: "guide", label: t("ex_guide"), price: 60 * tour.days, per: "booking" }
  ];
  const modal = $("#bookModal");
  $("#bkClose").innerHTML = IC.close;
  $("#bkTour").textContent = tx(tour.title);
  App.applyI18n(modal);
  $$("[data-close]", modal).forEach(b => b.onclick = closeBook);
  addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeBook(); });

  function bindBook() { $$("[data-book]").forEach(b => { if (b._b) return; b._b = true; b.onclick = () => openBook(b.dataset.book || null); }); }
  bindBook();
  function openBook(date) {
    if (date) B.date = date;
    if (!B.date) { const f = deps.find(d => d.status !== "soldout"); B.step = 1; }
    else B.step = 2;
    modal.classList.add("open"); document.body.style.overflow = "hidden"; render();
  }
  function closeBook() { modal.classList.remove("open"); document.body.style.overflow = ""; if (B.done) { Object.assign(B, { step: 1, done: false, date: null }); } }

  const dep = () => deps.find(d => d.date === B.date);
  function calc() {
    const d = dep(); if (!d) return null;
    const people = B.adults + B.children;
    const rows = [[`${B.adults} × ${t("adults")}`, d.price * B.adults]];
    if (B.children) rows.push([`${B.children} × ${t("children")}`, Math.round(d.price * 0.7) * B.children]);
    if (B.singles && tour.singleSup) rows.push([`${B.singles} × ${t("single_rooms")}`, tour.singleSup * B.singles]);
    EXTRAS.forEach(x => B.extras[x.id] && rows.push([x.label, x.per === "person" ? x.price * people : x.price]));
    const total = rows.reduce((s, r) => s + r[1], 0);
    const now = B.pay === "full" ? total : B.pay === "deposit" ? Math.round(total * SITE.depositPercent / 100) : 0;
    return { rows, total, now, people };
  }

  function render() {
    const steps = [t("bk_step1"), t("bk_step2"), t("bk_step3"), t("bk_step4")];
    let h = "";
    if (B.done) {
      h = `<div class="success"><div class="big-ico">✓</div><h2>${t("bk_ok_title")}</h2><p>${t("bk_ok_text")}</p><code>${esc(B.code)}</code>
        ${B.offline ? `<p style="color:var(--muted)">${t("bk_ok_offline")}</p>` : ""}
        <p style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <a class="btn btn-primary btn-lg" style="background:#25d366" href="https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(B.msg || B.code)}" target="_blank" rel="noopener">💬 WhatsApp</a>
          <a class="btn btn-teal btn-lg" href="https://t.me/${SITE.telegram}" target="_blank" rel="noopener">✈️ Telegram</a></p></div>`;
      $("#bkBody").innerHTML = h; $("#bkFoot").style.display = "none"; return;
    }
    $("#bkFoot").style.display = "";
    h += `<div class="stepper">${steps.map((s, i) => `<div class="${i + 1 < B.step ? "done" : i + 1 === B.step ? "cur" : ""}">${i + 1}. ${s}</div>`).join("")}</div>`;
    if (B.step === 1) {
      h += `<h4>${t("bk_choose_date")}</h4><div class="date-list">${deps.map(d => `<div class="date-opt ${d.date === B.date ? "sel" : ""} ${d.status === "soldout" ? "dis" : ""}" data-date="${d.date}" tabindex="0" role="radio" aria-checked="${d.date === B.date}">
        <div><b>${App.fmtDate(d.start)} — ${App.fmtDate(d.end, true)}</b><br><span class="status ${d.status}">${t("st_" + d.status)}${d.status === "few" ? ` · ${d.seats} ${t("seats_left")}` : ""}</span></div>
        <span class="p">${price(d.price)}</span></div>`).join("")}</div>`;
    }
    if (B.step === 2) {
      const d = dep();
      const maxSeats = d.status === "few" ? d.seats : tour.group;
      h += `<div class="summary-box" style="margin-bottom:16px"><b>📅 ${App.fmtDate(d.start)} — ${App.fmtDate(d.end, true)}</b> <a href="#" id="chgDate" style="color:var(--teal);font-weight:700;margin-left:8px">✎</a></div>
        <div class="counter-row"><div><b>${t("adults")}</b><br><small style="color:var(--muted)">${price(d.price)} / ${t("per_person_s")}</small></div><div class="counter"><button data-c="adults" data-d="-1">−</button><output>${B.adults}</output><button data-c="adults" data-d="1">+</button></div></div>
        <div class="counter-row"><div><b>${t("children")}</b></div><div class="counter"><button data-c="children" data-d="-1">−</button><output>${B.children}</output><button data-c="children" data-d="1">+</button></div></div>
        ${tour.singleSup ? `<div class="counter-row"><div><b>${t("single_rooms")}</b><br><small style="color:var(--muted)">+${price(tour.singleSup)}</small></div><div class="counter"><button data-c="singles" data-d="-1">−</button><output>${B.singles}</output><button data-c="singles" data-d="1">+</button></div></div>` : ""}
        <h4 style="margin-top:22px">${t("extras")}</h4>
        ${EXTRAS.map(x => `<label class="extra"><input type="checkbox" data-ex="${x.id}" ${B.extras[x.id] ? "checked" : ""}> <span>${x.label}</span><span class="p">+${price(x.price)} <small style="color:var(--muted);font-weight:500">/ ${x.per === "person" ? t("per_person_s") : t("per_booking")}</small></span></label>`).join("")}
        <input type="hidden" id="maxSeats" value="${maxSeats}">`;
    }
    if (B.step === 3) {
      const c = B.contact, inb = tour.type.includes("inbound");
      h += `<form id="bkForm" class="form-grid" novalidate>
        <div class="field"><label>${t("f_name")} <span class="req">*</span></label><input name="name" value="${esc(c.name || "")}" required autocomplete="name"></div>
        <div class="field"><label>${t("f_phone")} <span class="req">*</span></label><input name="phone" type="tel" value="${esc(c.phone || "")}" required autocomplete="tel" placeholder="+998"></div>
        <div class="field"><label>${t("f_email")} ${inb ? '<span class="req">*</span>' : ""}</label><input name="email" type="email" value="${esc(c.email || "")}" ${inb ? "required" : ""} autocomplete="email"></div>
        <div class="field"><label>${t("f_nationality")}</label><input name="country" value="${esc(c.country || (App.lang === "uz" ? "O'zbekiston" : ""))}" autocomplete="country-name"></div>
        <div class="field"><label>${t("f_passport")}</label><input name="passport" value="${esc(c.passport || "")}"></div>
        <div class="field"><label>${t("f_contact_pref")}</label><select name="pref">${["Telegram", "WhatsApp", t("f_phone"), "Email"].map(o => `<option ${c.pref === o ? "selected" : ""}>${o}</option>`).join("")}</select></div>
        <div class="field full"><label>${t("f_notes")}</label><textarea name="notes">${esc(c.notes || "")}</textarea></div></form>`;
    }
    if (B.step === 4) {
      const k = calc(), d = dep();
      h += `<div class="summary-box"><b>${esc(tx(tour.title))}</b><br><small>📅 ${App.fmtDate(d.start)} — ${App.fmtDate(d.end, true)} · ${k.people} ${t("travellers")}</small>
        <div style="margin-top:10px">${k.rows.map(([l, v]) => `<div class="row"><span>${esc(l)}</span><span>${price(v)}</span></div>`).join("")}
        <div class="row total"><span>${t("total")}</span><span>${price(k.total)}</span></div></div></div>
        <h4 style="margin-top:20px">${t("pay_method")}</h4>
        <div class="paygrid">${[["deposit", t("pay_deposit")], ["full", t("pay_full")], ["office", t("pay_office")]].map(([id, l]) => `<div class="payopt ${B.pay === id ? "sel" : ""}" data-pay="${id}" tabindex="0">${l}</div>`).join("")}</div>
        ${B.pay !== "office" ? `<div class="paygrid" style="margin-top:10px;grid-template-columns:repeat(4,1fr)">${["Payme", "Click", "Uzum", "Visa/MC"].map(id => `<div class="payopt ${B.channel === id ? "sel" : ""}" data-ch="${id}" tabindex="0">${id}</div>`).join("")}</div>` : ""}
        <label class="check" style="margin-top:18px"><input type="checkbox" id="agree" ${B.agree ? "checked" : ""}> ${t("agree")}</label>
        <div class="err" id="bkErr"></div>`;
    }
    $("#bkBody").innerHTML = h;
    bindStep();
    paintFoot();
  }

  function paintFoot() {
    const k = calc();
    $("#bkTotal").textContent = k ? price(k.total) + (B.step === 4 && k.now && k.now !== k.total ? ` · ${t("to_pay_now")}: ${price(k.now)}` : "") : "—";
    $("#bkBack").style.visibility = B.step > 1 ? "visible" : "hidden";
    $("#bkNext").textContent = B.step === 4 ? t("confirm") : t("next");
    $("#bkNext").disabled = B.step === 1 && !B.date;
  }

  function bindStep() {
    $$(".date-opt").forEach(o => { const pick = () => { B.date = o.dataset.date; $$(".date-opt").forEach(x => x.classList.toggle("sel", x === o)); paintFoot(); }; o.onclick = pick; o.onkeydown = e => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), pick()); o.ondblclick = () => { pick(); go(1); }; });
    const chg = $("#chgDate"); if (chg) chg.onclick = e => { e.preventDefault(); B.step = 1; render(); };
    $$("[data-c]").forEach(b => b.onclick = () => {
      const k = b.dataset.c, max = +($("#maxSeats") || {}).value || 20;
      let v = B[k] + +b.dataset.d;
      if (k === "adults") v = Math.max(1, Math.min(v, max - B.children));
      if (k === "children") v = Math.max(0, Math.min(v, max - B.adults));
      if (k === "singles") v = Math.max(0, Math.min(v, B.adults));
      B[k] = v; if (B.singles > B.adults) B.singles = B.adults; render();
    });
    $$("[data-ex]").forEach(c => c.onchange = () => { B.extras[c.dataset.ex] = c.checked; paintFoot(); });
    $$("[data-pay]").forEach(o => o.onclick = () => { B.pay = o.dataset.pay; B.agree = ($("#agree") || {}).checked; render(); });
    $$("[data-ch]").forEach(o => o.onclick = () => { B.channel = o.dataset.ch; B.agree = ($("#agree") || {}).checked; render(); });
  }

  async function go(dir) {
    if (dir > 0) {
      if (B.step === 1 && !B.date) return;
      if (B.step === 3) {
        const f = $("#bkForm"); B.contact = Object.fromEntries(new FormData(f));
        let ok = true;
        $$("input[required]", f).forEach(i => { const bad = !i.value.trim() || (i.type === "email" && !/^\S+@\S+\.\S+$/.test(i.value)); i.closest(".field").classList.toggle("invalid", bad); if (bad) ok = false; });
        if (!ok) { $$(".field.invalid input", f)[0].focus(); return; }
      }
      if (B.step === 4) return submit();
    } else if (B.step === 3) { B.contact = Object.fromEntries(new FormData($("#bkForm"))); }
    B.step = Math.max(1, Math.min(4, B.step + dir)); render();
    $("#bkBody").scrollTop = 0;
  }
  $("#bkNext").onclick = () => go(1);
  $("#bkBack").onclick = () => go(-1);

  async function submit() {
    if (!$("#agree").checked) { $("#bkErr").textContent = t("agree"); return; }
    const k = calc(), d = dep(), btn = $("#bkNext");
    btn.disabled = true; btn.textContent = t("sending");
    const code = App.makeCode();
    const rec = {
      code, tour_id: tour.id, tour_title: tx(tour.title), departure: d.date, adults: B.adults, children: B.children, singles: B.singles,
      extras: Object.keys(B.extras).filter(x => B.extras[x]), pay_option: B.pay, pay_channel: B.pay === "office" ? "cash" : B.channel,
      total_usd: k.total, due_now_usd: k.now, ...B.contact
    };
    const res = await App.send("booking", rec);
    const mine = App.LS.get("sy_bookings", []); mine.push({ ...rec, code: res.code || code, offline: res.offline }); App.LS.set("sy_bookings", mine);
    const msg = [`🆕 ${res.code || code}`, `🧭 ${rec.tour_title}`, `📅 ${d.date}`, `👥 ${B.adults} + ${B.children}`,
      `💵 ${price(k.total)} (${t("to_pay_now")}: ${price(k.now)}) · ${rec.pay_option}/${rec.pay_channel}`,
      `👤 ${rec.name || ""}`, `📞 ${rec.phone || ""}`, rec.email && `✉️ ${rec.email}`, rec.notes && `📝 ${rec.notes}`].filter(Boolean).join("\n");
    Object.assign(B, { done: true, code: res.code || code, offline: res.offline, msg });
    render();
  }

  // URL orqali ochish: tour.html?id=..&date=..#book
  if (qs.get("date") && deps.some(d => d.date === qs.get("date"))) B.date = qs.get("date");
  if (location.hash === "#book") setTimeout(() => openBook(), 300);

  App.renderFooter();
  App.reveal();
})();
