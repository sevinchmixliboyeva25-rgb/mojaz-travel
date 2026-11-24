/* Bosh sahifa */
(function () {
  const { t, tx, $, $$, esc, price, IC } = App;
  App.renderHeader({ transparent: true });
  App.applyI18n();
  $("#trustTxt").textContent = `${SITE.rating} · ${SITE.reviewsCount.toLocaleString("en-US")} ${t("reviews_word")}`;

  /* ---------- YouTube fon videosi ---------- */
  const vid = SITE.youtubeId, wrap = $("#heroVideo");
  // Poster (video yuklanguncha)
  const poster = new Image();
  wrap.innerHTML = `<div class="hero-art">${sceneArt("city", 3, true)}</div><div class="hero-poster"></div>`;
  const posterEl = wrap.querySelector(".hero-poster");
  const own = new Image(); own.onload = () => { posterEl.style.backgroundImage = "url(hero.jpg)"; }; own.src = "hero.jpg";
  poster.onload = () => { if (own.complete && own.naturalWidth) return; posterEl.style.backgroundImage = `url(${poster.naturalWidth > 200 ? poster.src : `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`})`; };
  poster.src = `https://i.ytimg.com/vi/${vid}/maxresdefault.jpg`;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const iframe = document.createElement("iframe");
  iframe.title = "Uzbekistan";
  iframe.allow = "autoplay; encrypted-media; picture-in-picture";
  iframe.setAttribute("tabindex", "-1");
  iframe.src = `https://www.youtube-nocookie.com/embed/${vid}?autoplay=${reduce ? 0 : 1}&mute=1&controls=0&loop=1&playlist=${vid}&playsinline=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1&origin=${encodeURIComponent(location.origin)}`;
  iframe.onload = () => setTimeout(() => iframe.classList.add("ready"), 800);
  wrap.append(iframe);
  const cmd = (func, args = []) => iframe.contentWindow && iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func, args }), "*");
  let playing = !reduce, muted = true;
  const playBtn = $("#vidPlay"), sndBtn = $("#vidSound");
  const paint = () => { playBtn.innerHTML = playing ? IC.pause : IC.play; sndBtn.innerHTML = muted ? IC.mute : IC.sound; sndBtn.title = muted ? t("sound_on") : t("sound_off"); };
  playBtn.onclick = () => { playing = !playing; cmd(playing ? "playVideo" : "pauseVideo"); paint(); };
  sndBtn.onclick = () => { muted = !muted; cmd(muted ? "mute" : "unMute"); if (!muted) { cmd("setVolume", [60]); if (!playing) { playing = true; cmd("playVideo"); } } paint(); };
  paint();
  // Ekrandan chiqqanda videoni to'xtatish (batareya tejash)
  if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { if (playing) cmd(e.isIntersecting ? "playVideo" : "pauseVideo"); }).observe($(".hero"));

  /* ---------- Yo'nalishlar / Faoliyatlar / To'plamlar ---------- */
  const track = $("#heroTrack");
  const sets = { dest: [DESTINATIONS, "region"], act: [ACTIVITIES, "activity"], col: [COLLECTIONS, "collection"] };
  const car = App.carousel($("#heroCarousel"));
  $("#heroCarousel .prev").innerHTML = IC.left; $("#heroCarousel .next").innerHTML = IC.right;
  function showTab(key) {
    $$(".tab").forEach(b => b.classList.toggle("active", b.dataset.tab === key));
    const [list, param] = sets[key];
    track.style.opacity = 0;
    setTimeout(() => {
      track.innerHTML = list.map(x => App.tile(x, param)).join("");
      [...track.children].forEach((c, i) => { c.classList.add("enter"); c.style.animationDelay = (i * 0.07) + "s"; });
      track.scrollLeft = 0; track.style.transition = "opacity .35s"; track.style.opacity = 1; car.update();
    }, 150);
    App.LS.set("sy_tab", key);
  }
  $$(".tab").forEach(b => b.onclick = () => showTab(b.dataset.tab));
  showTab(App.LS.get("sy_tab", "col"));

  // Karusel o'zi aylanadi (sichqoncha ustida yoki teginganda to'xtaydi)
  let paused = false;
  ["pointerenter", "touchstart", "focusin"].forEach(ev => $("#heroCarousel").addEventListener(ev, () => paused = true, { passive: true }));
  ["pointerleave", "focusout"].forEach(ev => $("#heroCarousel").addEventListener(ev, () => paused = false));
  setInterval(() => {
    if (paused || document.hidden || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const max = track.scrollWidth - track.clientWidth, card = track.firstElementChild;
    if (!card) return;
    track.scrollTo({ left: track.scrollLeft >= max - 10 ? 0 : track.scrollLeft + card.offsetWidth + 12 });
  }, 3500);

  // Yuguruvchi lenta
  const words = DESTINATIONS.map(d => tx(d.name));
  $("#marquee").innerHTML = [0, 1].map(() => words.map(w => `<span>${esc(w)}</span>`).join("")).join("");

  // Parallaks: ikki turizm kartalaridagi fon
  const par = $$(".type-card .media");
  addEventListener("scroll", () => requestAnimationFrame(() => par.forEach(m => {
    const r = m.parentElement.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
    m.style.translate = `0 ${((r.top + r.height / 2 - innerHeight / 2) * -0.08).toFixed(1)}px`;
  })), { passive: true });

  /* ---------- Ikki turizm turi ---------- */
  $("#artDomestic").innerHTML = media({ id: "domestic", scene: "mountain" }, 7);
  $("#artInbound").innerHTML = media({ id: "inbound", scene: "city" }, 11);
  const tagList = type => [...new Set(TOURS.filter(x => x.type.includes(type)).flatMap(x => x.regions))].slice(0, 6).map(r => `<li>${esc(tx(DESTINATIONS.find(d => d.id === r).name))}</li>`).join("");
  $("#domTags").innerHTML = tagList("domestic");
  $("#inbTags").innerHTML = tagList("inbound");

  /* ---------- Trenddagi ichki turlar ---------- */
  const tl = (o) => o ? (o[App.lang] || o.en || o.uz) : null;
  $("#trendList").innerHTML = (window.TRENDING || []).map(id => TOURS.find(x => x.id === id)).filter(Boolean).map((tr, i) => {
    const next = App.departures(tr, 1)[0];
    return `<article class="trend-row ${i % 2 ? "flip" : ""}">
      <a class="trend-media reveal ${i % 2 ? "from-right" : "from-left"}" href="tour.html?id=${tr.id}">
        <div class="media">${media(tr, App.hash(tr.id))}</div>
        <span class="trend-num">0${i + 1}</span>
        ${tr.escape ? `<span class="flag gold trend-flag">⚡ ${t("escape_badge")}</span>` : ""}
        <button class="fav ${App.wish.has(tr.id) ? "on" : ""}" data-fav="${tr.id}" aria-label="${t("wishlist")}">${IC.heart}</button>
      </a>
      <div class="trend-body reveal ${i % 2 ? "from-left" : "from-right"}">
        <div class="meta"><span>⏱ ${tr.days === 1 ? "1" : "1–" + tr.days} ${t("days")}</span><span>${App.diffBars(tr.difficulty)}</span><span class="rating"><span class="st">★</span> ${tr.rating.toFixed(1)} <small>(${tr.reviews})</small></span></div>
        <h3><a href="tour.html?id=${tr.id}">${esc(tx(tr.title))}</a></h3>
        ${tr.trend ? `<p class="trend-why"><b>${t("why_trend")}</b> ${esc(tx(tr.trend))}</p>` : ""}
        ${tr.route ? `<p class="trend-route">📍 <b>${t("route")}:</b> ${esc(tx(tr.route))}</p>` : ""}
        ${tl(tr.points) ? `<ul class="trend-points">${tl(tr.points).map(p => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
        ${tr.forWho ? `<p class="trend-who">👥 <b>${t("for_who")}</b> ${esc(tx(tr.forWho))}</p>` : ""}
        ${tl(tr.spots) ? `<div class="spots"><small>${t("insta_spots")}</small><div>${tl(tr.spots).map((p, k) => `<span><b>${k + 1}</b>${esc(p)}</span>`).join("")}</div></div>` : ""}
        <div class="trend-foot">
          <div class="price"><small>${t("from")}</small><b>${price(tr.price)}</b></div>
          ${next ? `<small class="next">${t("next_dep")}:<br><b>${App.fmtDate(next.start)}</b></small>` : ""}
          <a class="btn btn-primary" href="tour.html?id=${tr.id}${next ? "&date=" + next.date : ""}#book">${t("book_now")}</a>
        </div>
      </div>
    </article>`;
  }).join("");
  App.bindFavs($("#trendList"));

  /* ---------- Bir kunlik qochish ---------- */
  $(".escape-timeline").innerHTML = ({ uz: ["🕖 Juma 19:00", "🏔 Shanba–Yakshanba", "🏠 Yakshanba 21:00"], en: ["🕖 Fri 7 pm", "🏔 Sat–Sun", "🏠 Sun 9 pm"], ru: ["🕖 Пт 19:00", "🏔 Сб–Вс", "🏠 Вс 21:00"] }[App.lang]).map(x => `<span>${x}</span>`).join("<i></i>");
  $("#escapeList").innerHTML = TOURS.filter(x => x.escape || (x.days <= 2 && x.type.includes("domestic"))).slice(0, 5).map(x => {
    const d = App.departures(x, 1)[0];
    return `<a class="escape-item" href="tour.html?id=${x.id}${d ? "&date=" + d.date : ""}#book"><div class="media">${media(x, App.hash(x.id))}</div>
      <div><b>${esc(tx(x.title))}</b><small>${d ? "📅 " + App.fmtDate(d.start) + " · " : ""}${x.days} ${t("days")}</small></div><span class="p">${price(x.price)}</span></a>`;
  }).join("");

  /* ---------- Featured ---------- */
  function renderFeat(type) {
    const order = window.BESTSELLERS || [];
    const rank = x => { const i = order.indexOf(x.id); return i < 0 ? 999 : i; };
    const list = TOURS.filter(x => (type === "all" || x.type.includes(type)) && x.collections.includes("bestsellers")).sort((a, b) => rank(a) - rank(b));
    $("#featGrid").innerHTML = list.map(App.tourCard).join("");
    App.bindFavs($("#featGrid")); App.reveal();
  }
  $$("#featSeg button").forEach(b => b.onclick = () => { $$("#featSeg button").forEach(x => x.classList.toggle("active", x === b)); renderFeat(b.dataset.type); });
  renderFeat("all");

  /* ---------- Aksiya + taymer ---------- */
  const deals = TOURS.filter(x => x.oldPrice).concat(TOURS.filter(x => !x.oldPrice && x.collections.includes("new"))).slice(0, 3);
  $("#dealList").innerHTML = deals.map((x, i) => {
    const off = x.oldPrice ? Math.round((1 - x.price / x.oldPrice) * 100) : [10, 15, 12][i];
    return `<a class="deal-item" href="tour.html?id=${x.id}"><div class="media">${media(x, App.hash(x.id))}</div>
      <div><h4>${esc(tx(x.title))}</h4><small>${x.days} ${t("days")} · ${t("from")} <b>${price(x.price)}</b></small></div><span class="off">-${off}%</span></a>`;
  }).join("");
  const end = (() => { const d = new Date(); d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7)); d.setHours(23, 59, 59, 0); return d; })();
  function tick() {
    let s = Math.max(0, Math.floor((end - Date.now()) / 1000));
    const parts = [[Math.floor(s / 86400), "d"], [Math.floor(s % 86400 / 3600), "h"], [Math.floor(s % 3600 / 60), "m"], [s % 60, "s"]];
    $("#countdown").innerHTML = parts.map(([v, k]) => `<div><b>${String(v).padStart(2, "0")}</b><small>${t(k)}</small></div>`).join("");
  }
  tick(); setInterval(tick, 1000);

  /* ---------- Yaqin jo'nashlar jadvali ---------- */
  const allDeps = TOURS.flatMap(tr => App.departures(tr, 4).map(d => ({ ...d, tour: tr }))).sort((a, b) => a.start - b.start);
  const months = [...new Set(allDeps.map(d => d.start.getFullYear() * 12 + d.start.getMonth()))].slice(0, 5);
  let depMonth = "all", depLimit = 8;
  $("#depFilter").innerHTML = `<button class="chip active" data-m="all">${t("all_months")}</button>` + months.map(m => `<button class="chip" data-m="${m}">${App.MONTHS_FULL[App.lang][m % 12]}</button>`).join("");
  $$("#depFilter .chip").forEach(c => c.onclick = () => { $$("#depFilter .chip").forEach(x => x.classList.toggle("active", x === c)); depMonth = c.dataset.m; depLimit = 8; renderDeps(); });
  function renderDeps() {
    const list = allDeps.filter(d => depMonth === "all" || d.start.getFullYear() * 12 + d.start.getMonth() === +depMonth);
    $("#depBody").innerHTML = list.slice(0, depLimit).map(d => `<tr>
      <td><a href="tour.html?id=${d.tour.id}"><b>${esc(tx(d.tour.title))}</b></a><br><small style="color:var(--muted)">${d.tour.days} ${t("days")} · ${d.tour.type.map(x => x === "inbound" ? "🌍" : "🇺🇿").join(" ")}</small></td>
      <td class="dep-dates"><b>${App.fmtDate(d.start)}</b> — ${App.fmtDate(d.end, true)}</td>
      <td><span class="status ${d.status}">${t("st_" + d.status)}</span>${d.status === "few" ? `<br><small style="color:var(--muted)">${d.seats} ${t("seats_left")}</small>` : ""}</td>
      <td><b class="price"><b style="font-size:1.15rem">${price(d.price)}</b></b></td>
      <td>${d.status === "soldout" ? "" : `<a class="btn btn-primary btn-sm" href="tour.html?id=${d.tour.id}&date=${d.date}#book">${t("book")}</a>`}</td></tr>`).join("");
    const more = list.length > depLimit;
    let row = $("#depMore"); if (row) row.remove();
    if (more) { $("#departures .container").insertAdjacentHTML("beforeend", `<div class="more-row" id="depMore"><button class="btn btn-ghost" style="color:var(--teal)">+ ${list.length - depLimit}</button></div>`); $("#depMore button").onclick = () => { depLimit += 8; renderDeps(); }; }
  }
  renderDeps();

  /* ---------- Sharhlar ---------- */
  $("#revCount").textContent = `${SITE.reviewsCount.toLocaleString("en-US")} ${t("reviews_word")}`;
  const colors = ["#127c87", "#e8613c", "#5b2a86", "#2e9e5b", "#d4a017", "#1d6fa5"];
  $("#revTrack").innerHTML = REVIEWS.map((r, i) => {
    const tr = TOURS.find(x => x.id === r.tour);
    return `<figure class="rcard" style="margin:0"><span class="stars gold">${"<i>★</i>".repeat(r.stars)}</span><blockquote>“${esc(tx(r.text))}”</blockquote>
      <figcaption class="who"><span class="avatar" style="background:${colors[i % colors.length]}">${r.name[0]}</span><span><b>${esc(r.name)}</b> <span>${r.country}</span><small><a href="tour.html?id=${tr.id}">${esc(tx(tr.title))}</a></small></span></figcaption></figure>`;
  }).join("");
  App.carousel($("#revCarousel"));
  $("#revCarousel .prev").innerHTML = IC.left; $("#revCarousel .next").innerHTML = IC.right;

  /* ---------- Blog ---------- */
  $("#posts").innerHTML = POSTS.map((p, i) => `<a class="post reveal reveal-d${i % 3}" href="tours.html"><div class="media">${media({ id: "blog" + (i + 1), scene: p.scene }, 40 + i)}</div>
    <div class="tagline">${esc(tx(p.tag))}</div><h3>${esc(tx(p.title))}</h3><small>${p.min} ${t("min_read")}</small></a>`).join("");

  /* ---------- FAQ ---------- */
  $("#faqList").innerHTML = FAQ.map((f, i) => `<details class="reveal" ${i === 0 ? "open" : ""}><summary>${esc(tx(f.q))}</summary><p>${esc(tx(f.a))}</p></details>`).join("");

  /* ---------- Aloqa / formalar ---------- */
  $("#contactList").innerHTML = `
    <li><a href="tel:${SITE.phone.replace(/\s/g, "")}"><span class="i">📞</span>${SITE.phone}</a></li>
    <li><a href="https://t.me/${SITE.telegram}" target="_blank" rel="noopener"><span class="i">✈️</span>@${SITE.telegram}</a></li>
    <li><a href="mailto:${SITE.email}"><span class="i">✉️</span>${SITE.email}</a></li>`;
  App.bindSimpleForm($("#customForm"), "custom");
  App.bindSimpleForm($("#newsForm"), "newsletter");

  App.renderFooter();
  App.reveal(); App.counters();
})();
