/* Turlar ro'yxati — filtrlar va qidiruv */
(function () {
  const { t, tx, $, $$, esc, price, IC, qs } = App;
  App.renderHeader();
  App.applyI18n();

  const list = k => (qs.get(k) ? qs.get(k).split(",") : []);
  const S = {
    type: qs.get("type") || "all", region: list("region"), activity: list("activity"), collection: list("collection"),
    dur: list("dur"), diff: list("diff"), max: +qs.get("max") || 3000, q: qs.get("q") || "", sort: qs.get("sort") || "pop",
    wishlist: qs.get("wishlist") === "1", deals: qs.get("deals") === "1"
  };

  // Sarlavha va fon
  const first = S.region[0] ? DESTINATIONS.find(d => d.id === S.region[0]) : S.activity[0] ? ACTIVITIES.find(d => d.id === S.activity[0]) : S.collection[0] ? COLLECTIONS.find(d => d.id === S.collection[0]) : null;
  const title = S.wishlist ? "♥ " + t("wishlist") : S.deals ? t("nav_deals") : first ? tx(first.name) : S.type !== "all" ? t("t_" + S.type) : t("tours_title");
  $("#pageTitle").textContent = title; $("#crumb").textContent = title;
  document.title = title + " — " + SITE.brand;
  $("#heroArt").innerHTML = sceneArt(first ? first.scene : S.type === "domestic" ? "mountain" : "city2", 5, true);

  // Filtr ro'yxatlari
  const DUR = [["1", t("dur_1"), d => d <= 2], ["2", t("dur_2"), d => d >= 3 && d <= 5], ["3", t("dur_3"), d => d >= 6]];
  const field = { region: "regions", activity: "activities", collection: "collections" };
  function checks(el, key, items) {
    $(el).innerHTML = items.map(([id, label, n]) => `<label class="check"><input type="checkbox" data-k="${key}" value="${id}" ${S[key].includes(id) ? "checked" : ""}> ${esc(label)} ${n !== undefined ? `<span class="n">${n}</span>` : ""}</label>`).join("");
  }
  checks("#fRegion", "region", DESTINATIONS.map(d => [d.id, tx(d.name), TOURS.filter(x => x.regions.includes(d.id)).length]).filter(x => x[2]));
  checks("#fActivity", "activity", ACTIVITIES.map(d => [d.id, d.icon + " " + tx(d.name), TOURS.filter(x => x.activities.includes(d.id)).length]).filter(x => x[2]));
  checks("#fCollection", "collection", COLLECTIONS.map(d => [d.id, tx(d.name), TOURS.filter(x => x.collections.includes(d.id)).length]).filter(x => x[2]));
  checks("#fDuration", "dur", DUR.map(([id, l]) => [id, l]));
  checks("#fDiff", "diff", [1, 2, 3, 4, 5].map(n => [String(n), "●".repeat(n) + "○".repeat(5 - n)]));
  const range = $("#fPrice"); range.value = S.max;
  $("#pMin").textContent = price(50);
  const paintRange = () => $("#pVal").textContent = (S.max >= 3000 ? "∞ " : "") + price(S.max);
  paintRange();

  $$(".filters input[type=checkbox]").forEach(c => c.onchange = () => { const arr = S[c.dataset.k]; c.checked ? arr.push(c.value) : arr.splice(arr.indexOf(c.value), 1); render(); });
  range.oninput = () => { S.max = +range.value; paintRange(); render(); };
  $("#q").value = S.q; $("#q").oninput = e => { S.q = e.target.value; render(); };
  $("#sort").value = S.sort; $("#sort").onchange = e => { S.sort = e.target.value; render(); };
  $$("#typeSeg button").forEach(b => { b.classList.toggle("active", b.dataset.type === S.type); b.onclick = () => { S.type = b.dataset.type; $$("#typeSeg button").forEach(x => x.classList.toggle("active", x === b)); render(); }; });
  $("#clearAll").onclick = () => { Object.assign(S, { type: "all", region: [], activity: [], collection: [], dur: [], diff: [], max: 3000, q: "", wishlist: false, deals: false }); location.href = "tours.html"; };
  $("#closeFilters").innerHTML = IC.close;
  $("#openFilters").onclick = () => $("#filters").classList.add("open");
  $("#closeFilters").onclick = $("#applyFilters").onclick = () => $("#filters").classList.remove("open");

  function filtered() {
    let r = TOURS.filter(x =>
      (S.type === "all" || x.type.includes(S.type)) &&
      ["region", "activity", "collection"].every(k => !S[k].length || S[k].some(v => x[field[k]].includes(v))) &&
      (!S.dur.length || S.dur.some(id => DUR.find(d => d[0] === id)[2](x.days))) &&
      (!S.diff.length || S.diff.includes(String(x.difficulty))) &&
      (S.max >= 3000 || x.price <= S.max) &&
      (!S.wishlist || App.wish.has(x.id)) &&
      (!S.deals || x.oldPrice || x.collections.includes("new")) &&
      App.matchTour(x, S.q));
    const sorters = { pop: (a, b) => b.reviews * b.rating - a.reviews * a.rating, low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, short: (a, b) => a.days - b.days, rating: (a, b) => b.rating - a.rating };
    return r.sort(sorters[S.sort] || sorters.pop);
  }

  function syncUrl() {
    const p = new URLSearchParams();
    if (S.type !== "all") p.set("type", S.type);
    ["region", "activity", "collection", "dur", "diff"].forEach(k => S[k].length && p.set(k, S[k].join(",")));
    if (S.max < 3000) p.set("max", S.max);
    if (S.q) p.set("q", S.q);
    if (S.sort !== "pop") p.set("sort", S.sort);
    if (S.wishlist) p.set("wishlist", 1);
    if (S.deals) p.set("deals", 1);
    history.replaceState(null, "", "tours.html" + (p.toString() ? "?" + p : ""));
  }

  function renderChips() {
    const chips = [];
    const name = (arr, id) => tx((arr.find(x => x.id === id) || {}).name);
    S.region.forEach(id => chips.push(["region", id, name(DESTINATIONS, id)]));
    S.activity.forEach(id => chips.push(["activity", id, name(ACTIVITIES, id)]));
    S.collection.forEach(id => chips.push(["collection", id, name(COLLECTIONS, id)]));
    S.dur.forEach(id => chips.push(["dur", id, DUR.find(d => d[0] === id)[1]]));
    S.diff.forEach(id => chips.push(["diff", id, t("difficulty") + " " + id]));
    $("#activeFilters").innerHTML = chips.map(([k, id, l]) => `<button class="chip" data-k="${k}" data-v="${id}">${esc(l)} ✕</button>`).join("");
    $$("#activeFilters .chip").forEach(c => c.onclick = () => {
      const arr = S[c.dataset.k]; arr.splice(arr.indexOf(c.dataset.v), 1);
      const box = $(`.filters input[data-k="${c.dataset.k}"][value="${c.dataset.v}"]`); if (box) box.checked = false;
      render();
    });
  }

  function render() {
    const r = filtered();
    $("#count").textContent = `${r.length} ${t("results")}`;
    $("#grid").innerHTML = r.length ? r.map(App.tourCard).join("") : `<div class="empty" style="grid-column:1/-1">${S.wishlist ? t("wishlist_empty") : t("no_results")}</div>`;
    App.bindFavs($("#grid")); App.reveal(); renderChips(); syncUrl();
    $("#applyFilters").textContent = `${t("show_results")} (${r.length})`;
  }
  render();
  App.renderFooter();
})();
