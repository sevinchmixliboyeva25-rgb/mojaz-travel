/* =========================================================
   Har bir yo'nalish uchun chizilgan SVG manzaralar.
   Haqiqiy foto qo'shilmagan bo'lsa shular ko'rsatiladi.
   ========================================================= */
(function () {
  let uid = 0;
  function rng(seed) { let s = seed * 9301 + 49297; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); }
  const grad = (id, stops, vertical = true) =>
    `<linearGradient id="${id}" x1="0" y1="0" x2="${vertical ? 0 : 1}" y2="${vertical ? 1 : 0}">` +
    stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("") + `</linearGradient>`;

  /* ---------- building blocks ---------- */
  function dome(cx, base, r, color, drum = 0.5, ribs = null) {
    const dh = r * drum;
    let s = `<rect x="${cx - r * 0.82}" y="${base - dh}" width="${r * 1.64}" height="${dh}" fill="${color}"/>`;
    s += `<path d="M${cx - r},${base - dh} C${cx - r},${base - dh - r * 1.25} ${cx + r},${base - dh - r * 1.25} ${cx + r},${base - dh} Z" fill="${color}"/>`;
    s += `<path d="M${cx},${base - dh - r * 0.95} q-${r * 0.12},-${r * 0.25} 0,-${r * 0.45} q${r * 0.12},${r * 0.2} 0,${r * 0.45}" fill="${color}"/>`;
    if (ribs) for (let i = -2; i <= 2; i++) s += `<path d="M${cx + i * r * 0.32},${base - dh} Q${cx + i * r * 0.18},${base - dh - r * 0.85} ${cx},${base - dh - r * 0.94}" stroke="${ribs}" stroke-width="1.4" fill="none" opacity=".55"/>`;
    return s;
  }
  function minaret(x, base, h, w, color, band) {
    let s = `<path d="M${x - w / 2},${base} L${x - w * 0.36},${base - h} L${x + w * 0.36},${base - h} L${x + w / 2},${base} Z" fill="${color}"/>`;
    s += `<rect x="${x - w * 0.55}" y="${base - h - w * 0.5}" width="${w * 1.1}" height="${w * 0.55}" fill="${color}"/>`;
    s += `<path d="M${x - w * 0.4},${base - h - w * 0.5} Q${x},${base - h - w * 1.5} ${x + w * 0.4},${base - h - w * 0.5} Z" fill="${color}"/>`;
    if (band) for (let i = 1; i < 4; i++) s += `<rect x="${x - w * 0.45}" y="${base - h * (i * 0.24)}" width="${w * 0.9}" height="${w * 0.22}" fill="${band}" opacity=".8"/>`;
    return s;
  }
  function portal(x, base, w, h, color, inner, tile) {
    let s = `<rect x="${x - w / 2}" y="${base - h}" width="${w}" height="${h}" fill="${color}"/>`;
    const aw = w * 0.56, ah = h * 0.78, ax = x - aw / 2, ay = base - ah;
    if (tile) s += `<rect x="${ax - w * 0.08}" y="${ay - w * 0.1}" width="${aw + w * 0.16}" height="${ah + w * 0.1}" fill="${tile}"/>`;
    s += `<path d="M${ax},${base} L${ax},${ay + aw * 0.5} Q${ax},${ay} ${x},${ay - aw * 0.15} Q${ax + aw},${ay} ${ax + aw},${ay + aw * 0.5} L${ax + aw},${base} Z" fill="${inner}"/>`;
    return s;
  }
  function peaksPath(W, base, list, color, snow) {
    // list of [xFrac, height, halfWidthFrac]
    let s = "";
    list.forEach(([f, h, hw]) => {
      const x = f * W, w = hw * W;
      s += `<path d="M${x - w},${base} L${x},${base - h} L${x + w},${base} Z" fill="${color}"/>`;
      if (snow) s += `<path d="M${x - w * 0.28},${base - h * 0.72} L${x},${base - h} L${x + w * 0.28},${base - h * 0.72} L${x + w * 0.12},${base - h * 0.66} L${x},${base - h * 0.74} L${x - w * 0.1},${base - h * 0.65} Z" fill="${snow}"/>`;
    });
    return s;
  }
  function hills(W, base, amp, color, phase = 0) {
    let d = `M0,${base}`;
    for (let x = 0; x <= W; x += W / 40) d += ` L${x},${base - amp * (0.5 + 0.5 * Math.sin(x / W * 6.28 * 1.3 + phase))}`;
    return `<path d="${d} L${W},500 L0,500 Z" fill="${color}"/>`;
  }
  function pine(x, base, h, color) { return `<path d="M${x},${base - h} L${x - h * 0.3},${base} L${x + h * 0.3},${base} Z" fill="${color}"/>`; }
  function juniper(x, base, h, color) { return `<ellipse cx="${x}" cy="${base - h * 0.55}" rx="${h * 0.28}" ry="${h * 0.55}" fill="${color}"/><rect x="${x - 1.5}" y="${base - h * 0.1}" width="3" height="${h * 0.1}" fill="${color}"/>`; }
  function poplar(x, base, h, color) { return `<ellipse cx="${x}" cy="${base - h / 2}" rx="${h * 0.09}" ry="${h / 2}" fill="${color}"/>`; }
  function birds(W, r, color = "#2b2b2b") {
    let s = ""; for (let i = 0; i < 4; i++) { const x = W * (0.15 + r() * 0.7), y = 60 + r() * 90, k = 5 + r() * 5; s += `<path class="bird" style="animation-delay:-${(r() * 6).toFixed(1)}s" d="M${x - k},${y} q${k / 2},-${k / 2} ${k},0 q${k / 2},-${k / 2} ${k},0" stroke="${color}" stroke-width="1.6" fill="none" opacity=".55"/>`; }
    return s;
  }
  function stars(W, r, n = 50) { let s = ""; for (let i = 0; i < n; i++) s += `<circle cx="${r() * W}" cy="${r() * 260}" r="${r() * 1.3 + 0.3}" fill="#fff" opacity="${0.4 + r() * 0.6}"/>`; return s; }
  function yurt(x, base, w, c1, c2) {
    return `<rect x="${x - w / 2}" y="${base - w * 0.42}" width="${w}" height="${w * 0.42}" fill="${c1}"/>
      <path d="M${x - w / 2 - 3},${base - w * 0.42} Q${x},${base - w * 0.95} ${x + w / 2 + 3},${base - w * 0.42} Z" fill="${c1}"/>
      <rect x="${x - w / 2}" y="${base - w * 0.36}" width="${w}" height="${w * 0.06}" fill="${c2}"/>
      <rect x="${x - w * 0.1}" y="${base - w * 0.3}" width="${w * 0.2}" height="${w * 0.3}" fill="${c2}"/>`;
  }
  function camel(x, base, s, color) {
    return `<g transform="translate(${x},${base}) scale(${s})" fill="${color}">
      <path d="M-30,-30 C-28,-48 -14,-52 -8,-40 C-2,-56 12,-54 16,-38 C20,-34 26,-36 28,-46 L30,-58 C31,-64 40,-64 42,-60 L46,-56 L40,-54 L36,-44 C34,-32 30,-28 24,-26 L-26,-24 Z"/>
      <rect x="-26" y="-26" width="4" height="26"/><rect x="-18" y="-26" width="4" height="26"/>
      <rect x="14" y="-26" width="4" height="26"/><rect x="21" y="-26" width="4" height="26"/></g>`;
  }
  function ikat(W, r, palette) {
    let s = `<rect width="${W}" height="500" fill="${palette[0]}"/>`;
    const cols = Math.round(W / 80);
    for (let c = 0; c < cols; c++) {
      const x = (c + 0.5) * (W / cols), color = palette[1 + (c % (palette.length - 1))];
      for (let y = -40; y < 540; y += 90) {
        const w = 26 + r() * 10, h = 44;
        let d = `M${x},${y - h}`;
        for (let k = 0; k < 6; k++) { const t = k / 6; d += ` L${x + w * t + (k % 2 ? 4 : -4)},${y - h + h * t}`; }
        d += ` L${x + w},${y}`;
        for (let k = 0; k < 6; k++) { const t = k / 6; d += ` L${x + w - w * t + (k % 2 ? 4 : -4)},${y + h * t}`; }
        d += ` L${x},${y + h}`;
        for (let k = 0; k < 6; k++) { const t = k / 6; d += ` L${x - w * t + (k % 2 ? -4 : 4)},${y + h - h * t}`; }
        d += ` L${x - w},${y}`;
        for (let k = 0; k < 6; k++) { const t = k / 6; d += ` L${x - w + w * t + (k % 2 ? -4 : 4)},${y - h * t}`; }
        d += " Z";
        s += `<path d="${d}" fill="${color}"/>`;
        s += `<path d="M${x},${y - h * 0.45} L${x + w * 0.45},${y} L${x},${y + h * 0.45} L${x - w * 0.45},${y} Z" fill="${palette[0]}" opacity=".85"/>`;
        s += `<circle cx="${x}" cy="${y}" r="5" fill="${palette[(c + 2) % palette.length]}"/>`;
        s += `<path d="M${x + W / cols / 2},${y + 45 - 20} L${x + W / cols / 2 + 9},${y + 45} L${x + W / cols / 2},${y + 45 + 20} L${x + W / cols / 2 - 9},${y + 45} Z" fill="${palette[1 + ((c + 1) % (palette.length - 1))]}" opacity=".9"/>`;
      }
    }
    return s;
  }

  /* ---------- scenes ---------- */
  const SCENES = {
    city(W, r, id) { // Samarqand — oqshom
      return `<defs>${grad(id + "s", [[0, "#2b1d4e"], [0.45, "#b8476b"], [0.8, "#f4a259"], [1, "#ffd59a"]])}</defs>
        <rect width="${W}" height="500" fill="url(#${id}s)"/>
        <circle cx="${W * 0.5}" cy="300" r="78" fill="#ffd89b" opacity=".85"/>
        ${birds(W, r, "#2b1d4e")}
        ${portal(W * 0.5, 430, 150, 200, "#3a2150", "#5b2d5f", "#47306b")}
        ${dome(W * 0.5, 230, 44, "#3a2150", 0.45, "#7b5ea7")}
        ${portal(W * 0.14, 430, 110, 150, "#2e1a42", "#4d2655", "#3c2a5c")}
        ${portal(W * 0.86, 430, 110, 150, "#2e1a42", "#4d2655", "#3c2a5c")}
        ${minaret(W * 0.31, 430, 230, 18, "#2a173c")}${minaret(W * 0.69, 430, 230, 18, "#2a173c")}
        ${minaret(W * 0.02, 430, 200, 16, "#24133a")}${minaret(W * 0.98, 430, 200, 16, "#24133a")}
        <rect y="428" width="${W}" height="80" fill="#1c0f2c"/>`;
    },
    city2(W, r, id) { // Buxoro — kunduzi
      return `<defs>${grad(id + "s", [[0, "#5fb8c9"], [0.7, "#bfe3e3"], [1, "#f6e7c9"]])}</defs>
        <rect width="${W}" height="500" fill="url(#${id}s)"/>
        <circle cx="${W * 0.8}" cy="90" r="34" fill="#fff6d8" opacity=".9"/>
        ${birds(W, r)}
        ${minaret(W * 0.3, 440, 300, 34, "#c9935a", "#a8743f")}
        ${dome(W * 0.62, 330, 58, "#1d8a98", 0.5, "#0f5e69")}
        <rect x="${W * 0.42}" y="330" width="${W * 0.42}" height="110" fill="#d6a46a"/>
        ${portal(W * 0.62, 440, W * 0.26, 150, "#dcae74", "#7a4a26", "#2a9aa8")}
        ${dome(W * 0.92, 380, 30, "#1f97a6", 0.4)}
        <rect x="${W * 0.84}" y="380" width="${W * 0.2}" height="60" fill="#cf9b5f"/>
        ${dome(W * 0.08, 400, 26, "#c78f55", 0.35)}
        <rect y="438" width="${W}" height="70" fill="#b98550"/>`;
    },
    city3(W, r, id) { // tungi yoritilgan
      return `<defs>${grad(id + "s", [[0, "#0b1f3a"], [0.7, "#1b3f6b"], [1, "#2f5d8a"]])}${grad(id + "b", [[0, "#ffd27a"], [1, "#e38b2c"]])}</defs>
        <rect width="${W}" height="500" fill="url(#${id}s)"/>${stars(W, r)}
        <circle cx="${W * 0.82}" cy="80" r="20" fill="#fff2c4"/>
        ${portal(W * 0.5, 440, 160, 190, "url(#" + id + "b)", "#7a3d12", "#1b7f8f")}
        ${dome(W * 0.5, 250, 46, "#1aa3b5", 0.5, "#0d6f7c")}
        ${portal(W * 0.15, 440, 100, 140, "#e7a54a", "#6b330f", "#1b7f8f")}
        ${portal(W * 0.85, 440, 100, 140, "#e7a54a", "#6b330f", "#1b7f8f")}
        ${minaret(W * 0.31, 440, 240, 16, "#f0b85c")}${minaret(W * 0.69, 440, 240, 16, "#f0b85c")}
        <rect y="438" width="${W}" height="70" fill="#081627"/>`;
    },
    fortress(W, r, id) { // Xiva
      let cren = ""; for (let x = 0; x < W; x += 22) cren += `<path d="M${x},360 q11,-18 22,0 Z" fill="#c4874c"/>`;
      return `<defs>${grad(id + "s", [[0, "#f6a65b"], [0.55, "#fbd6a0"], [1, "#fde9cc"]])}</defs>
        <rect width="${W}" height="500" fill="url(#${id}s)"/>
        <circle cx="${W * 0.22}" cy="140" r="46" fill="#fff1d6" opacity=".9"/>${birds(W, r, "#7a4a26")}
        <path d="M${W * 0.62},360 L${W * 0.62},200 Q${W * 0.62},180 ${W * 0.62 + 90},180 Q${W * 0.62 + 180},180 ${W * 0.62 + 180},200 L${W * 0.62 + 180},360 Z" fill="#1d8f9b" transform="translate(${-W * 0.05},0)"/>
        ${[0, 1, 2, 3, 4].map(i => `<rect x="${W * 0.57}" y="${210 + i * 30}" width="180" height="10" fill="${i % 2 ? "#e3c07a" : "#0f5f6b"}"/>`).join("")}
        ${minaret(W * 0.2, 360, 230, 28, "#c78a50", "#1d8f9b")}
        <rect y="360" width="${W}" height="140" fill="#c4874c"/>${cren}
        ${[0.1, 0.35, 0.6, 0.85].map(f => `<path d="M${W * f - 20},500 L${W * f - 26},356 Q${W * f},336 ${W * f + 26},356 L${W * f + 20},500 Z" fill="#b5783f"/>`).join("")}
        <rect y="470" width="${W}" height="40" fill="#a86d38"/>`;
    },
    modern(W, r, id) { // Toshkent
      let b = ""; let x = 0; while (x < W) { const w = 30 + r() * 50, h = 80 + r() * 170; b += `<rect x="${x}" y="${440 - h}" width="${w}" height="${h}" fill="#1e2f4a"/>`; for (let wy = 440 - h + 10; wy < 430; wy += 16) for (let wx = x + 6; wx < x + w - 8; wx += 12) if (r() > 0.45) b += `<rect x="${wx}" y="${wy}" width="5" height="7" fill="#ffd27a" opacity=".85"/>`; x += w + 4; }
      return `<defs>${grad(id + "s", [[0, "#3b2c6b"], [0.5, "#d0627a"], [1, "#ffb37a"]])}</defs>
        <rect width="${W}" height="500" fill="url(#${id}s)"/>
        <rect x="${W * 0.7 - 3}" y="80" width="6" height="360" fill="#1e2f4a"/><circle cx="${W * 0.7}" cy="170" r="12" fill="#1e2f4a"/><path d="M${W * 0.7 - 22},440 L${W * 0.7},200 L${W * 0.7 + 22},440 Z" fill="#1e2f4a"/>
        ${dome(W * 0.3, 360, 48, "#28406a", 0.4)}${b}<rect y="438" width="${W}" height="70" fill="#14213a"/>`;
    },
    mountain(W, r, id) {
      return `<defs>${grad(id + "s", [[0, "#6fb7d6"], [1, "#e8f5f3"]])}</defs>
        <rect width="${W}" height="500" fill="url(#${id}s)"/>${birds(W, r)}
        ${peaksPath(W, 400, [[0.2, 230, 0.32], [0.62, 300, 0.36], [0.95, 200, 0.28]], "#5f7f9c", "#fff")}
        ${peaksPath(W, 430, [[0.4, 190, 0.3], [0.85, 160, 0.3], [0.05, 140, 0.22]], "#3d5a73", "#eef6f8")}
        ${hills(W, 450, 50, "#3d8b6e", 1)}${hills(W, 480, 40, "#2b6e55", 3)}
        ${[0.1, 0.16, 0.8, 0.88, 0.93].map(f => pine(W * f, 470 + r() * 10, 50 + r() * 30, "#1f4f3d")).join("")}`;
    },
    forest(W, r, id) {
      let t = ""; for (let i = 0; i < 16; i++) t += juniper(W * r(), 440 + r() * 50, 40 + r() * 50, i % 2 ? "#2d5a3d" : "#24493a");
      return `<defs>${grad(id + "s", [[0, "#9fd3c7"], [1, "#f1f7e8"]])}</defs>
        <rect width="${W}" height="500" fill="url(#${id}s)"/>
        ${peaksPath(W, 380, [[0.3, 200, 0.4], [0.8, 240, 0.35]], "#7a9a8c")}
        <path d="M${W * 0.78},170 C${W * 0.77},250 ${W * 0.8},300 ${W * 0.78},380" stroke="#fff" stroke-width="8" fill="none" opacity=".85"/>
        ${hills(W, 420, 60, "#5c8f5a", 2)}${hills(W, 460, 40, "#3f7448", 4.5)}${t}`;
    },
    snow(W, r, id) {
      let t = ""; for (let i = 0; i < 12; i++) { const x = W * r(), b = 440 + r() * 40, h = 50 + r() * 40; t += pine(x, b, h, "#1f4a4f") + `<path d="M${x},${b - h} L${x - h * 0.12},${b - h * 0.6} L${x + h * 0.12},${b - h * 0.6} Z" fill="#fff"/>`; }
      let flakes = ""; for (let i = 0; i < 60; i++) flakes += `<circle cx="${r() * W}" cy="${r() * 500}" r="${r() * 2 + 0.5}" fill="#fff" opacity=".8"/>`;
      return `<defs>${grad(id + "s", [[0, "#8fb8d8"], [1, "#eaf3fa"]])}</defs>
        <rect width="${W}" height="500" fill="url(#${id}s)"/>
        ${peaksPath(W, 400, [[0.25, 260, 0.38], [0.75, 300, 0.4]], "#b9cfe0", "#fff")}
        ${hills(W, 430, 40, "#f4f8fb", 0)}${hills(W, 470, 30, "#ffffff", 2)}
        <path d="M${W * 0.2},470 Q${W * 0.5},420 ${W * 0.8},440" stroke="#c9dbe8" stroke-width="3" fill="none"/>
        <circle cx="${W * 0.55}" cy="427" r="5" fill="#e8613c"/>${t}${flakes}`;
    },
    river(W, r, id) {
      return `<defs>${grad(id + "s", [[0, "#7cc0d8"], [1, "#e6f4ef"]])}${grad(id + "w", [[0, "#2fa4b9"], [1, "#1a6f8a"]])}</defs>
        <rect width="${W}" height="500" fill="url(#${id}s)"/>${birds(W, r)}
        ${peaksPath(W, 330, [[0.15, 180, 0.3], [0.55, 220, 0.35], [0.95, 170, 0.3]], "#6d8f7c")}
        <path d="M0,300 L${W * 0.35},330 L${W * 0.3},500 L0,500 Z" fill="#4b7a55"/>
        <path d="M${W},290 L${W * 0.62},330 L${W * 0.72},500 L${W},500 Z" fill="#3e6a49"/>
        <path d="M${W * 0.35},330 C${W * 0.45},360 ${W * 0.55},330 ${W * 0.62},330 L${W * 0.72},500 L${W * 0.3},500 Z" fill="url(#${id}w)"/>
        ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${W * (0.36 + r() * 0.3)},${360 + i * 24} q8,-6 16,0 q8,-6 16,0" stroke="#fff" stroke-width="3" fill="none" opacity=".85"/>`).join("")}
        <ellipse cx="${W * 0.5}" cy="430" rx="28" ry="9" fill="#ffc533"/><circle cx="${W * 0.47}" cy="420" r="4" fill="#e8613c"/><circle cx="${W * 0.53}" cy="420" r="4" fill="#e8613c"/>`;
    },
    lake(W, r, id) {
      return `<defs>${grad(id + "s", [[0, "#f6b26b"], [0.5, "#fbd9a5"], [1, "#fde9c9"]])}${grad(id + "w", [[0, "#2a9fb0"], [1, "#145c74"]])}</defs>
        <rect width="${W}" height="500" fill="url(#${id}s)"/>
        <circle cx="${W * 0.7}" cy="220" r="40" fill="#fff4dc"/>
        ${peaksPath(W, 320, [[0.2, 170, 0.3], [0.55, 210, 0.32], [0.9, 160, 0.3]], "#6c5a7c", "#f3e6f0")}
        ${peaksPath(W, 330, [[0.38, 120, 0.25], [0.75, 110, 0.25]], "#4a3d5f")}
        <rect y="330" width="${W}" height="170" fill="url(#${id}w)"/>
        <rect x="${W * 0.62}" y="335" width="${W * 0.16}" height="4" fill="#fff4dc" opacity=".7"/>
        <rect x="${W * 0.64}" y="350" width="${W * 0.12}" height="3" fill="#fff4dc" opacity=".5"/>
        <rect x="${W * 0.66}" y="365" width="${W * 0.08}" height="3" fill="#fff4dc" opacity=".35"/>
        <path d="M0,500 L0,440 Q${W * 0.2},420 ${W * 0.35},450 L${W * 0.35},500 Z" fill="#2c4a3e"/>
        <rect x="${W * 0.1}" y="410" width="40" height="30" fill="#7a4a26"/><path d="M${W * 0.1 - 6},410 L${W * 0.1 + 20},390 L${W * 0.1 + 46},410 Z" fill="#4a2c16"/><rect x="${W * 0.1 + 15}" y="420" width="10" height="10" fill="#ffd27a"/>`;
    },
    valley(W, r, id) {
      let p = ""; for (let i = 0; i < 14; i++) p += poplar(W * (0.05 + i * 0.07) + r() * 8, 420 + (i % 3) * 6, 70 + r() * 40, i % 2 ? "#3f7a3a" : "#4c8b40");
      return `<defs>${grad(id + "s", [[0, "#8ccfe6"], [1, "#f5f1d8"]])}</defs>
        <rect width="${W}" height="500" fill="url(#${id}s)"/>${birds(W, r)}
        ${peaksPath(W, 360, [[0.15, 170, 0.32], [0.6, 210, 0.4], [1, 150, 0.3]], "#a3b6c9", "#fff")}
        ${hills(W, 400, 40, "#a7c66b", 0.5)}${p}${hills(W, 450, 30, "#7fae4f", 2)}
        ${[0, 1, 2, 3].map(i => `<path d="M0,${460 + i * 12} Q${W / 2},${440 + i * 12} ${W},${462 + i * 12}" stroke="#e8c45a" stroke-width="5" fill="none" opacity=".6"/>`).join("")}`;
    },
    desert(W, r, id) {
      return `<defs>${grad(id + "s", [[0, "#f28c5a"], [0.5, "#fbc27a"], [1, "#ffe2b0"]])}${grad(id + "d", [[0, "#f0b26a"], [1, "#d98a43"]])}</defs>
        <rect width="${W}" height="500" fill="url(#${id}s)"/>
        <circle cx="${W * 0.62}" cy="250" r="70" fill="#fff0c8" opacity=".9"/>${birds(W, r, "#8a3f1c")}
        ${hills(W, 360, 40, "#f3c07f", 1)}
        ${yurt(W * 0.72, 372, 60, "#fbf3e4", "#c0392b")}${yurt(W * 0.86, 368, 46, "#f5ead7", "#1d8a98")}
        ${camel(W * 0.3, 410, 1.2, "#5a2e17")}${camel(W * 0.16, 404, 0.9, "#6b3a1e")}
        <path d="M0,500 L0,420 Q${W * 0.3},370 ${W * 0.6},420 T${W},410 L${W},500 Z" fill="url(#${id}d)"/>
        <path d="M0,500 L0,470 Q${W * 0.4},430 ${W},470 L${W},500 Z" fill="#c97a36"/>`;
    },
    aral(W, r, id) {
      return `<defs>${grad(id + "s", [[0, "#9fb6c4"], [0.6, "#e3d7c2"], [1, "#efe2cb"]])}</defs>
        <rect width="${W}" height="500" fill="url(#${id}s)"/>${birds(W, r, "#444")}
        <rect y="380" width="${W}" height="120" fill="#d8c3a0"/>
        <path d="M${W * 0.18},400 L${W * 0.22},360 L${W * 0.72},360 L${W * 0.82},340 L${W * 0.84},360 L${W * 0.8},400 Z" fill="#8a4b2a"/>
        <rect x="${W * 0.36}" y="320" width="${W * 0.16}" height="40" fill="#6e3a20"/><rect x="${W * 0.4}" y="290" width="${W * 0.06}" height="30" fill="#6e3a20"/>
        <rect x="${W * 0.6}" y="240" width="4" height="120" fill="#5a2e17"/>
        ${[0.28, 0.5, 0.68].map(f => `<rect x="${W * f}" y="372" width="6" height="6" fill="#b5764a"/>`).join("")}
        <path d="M0,430 Q${W / 2},415 ${W},430" stroke="#c3ab84" stroke-width="2" fill="none"/>
        <path d="M0,460 Q${W / 2},445 ${W},462" stroke="#c3ab84" stroke-width="2" fill="none"/>`;
    },
    ruins(W, r, id) {
      return `<defs>${grad(id + "s", [[0, "#f7b267"], [0.6, "#fcd9a8"], [1, "#fde9cf"]])}</defs>
        <rect width="${W}" height="500" fill="url(#${id}s)"/>${birds(W, r, "#7a4a26")}
        ${hills(W, 380, 50, "#e0b07a", 0.3)}
        <path d="M${W * 0.5 - 90},420 Q${W * 0.5},250 ${W * 0.5 + 90},420 Z" fill="#c98c55"/>
        <rect x="${W * 0.5 - 110}" y="410" width="220" height="20" fill="#b97c47"/>
        <rect x="${W * 0.5 - 5}" y="280" width="10" height="30" fill="#b97c47"/>
        ${[0.12, 0.2, 0.8, 0.88].map(f => `<rect x="${W * f}" y="${370 + r() * 20}" width="${20 + r() * 20}" height="60" fill="#c48a52"/>`).join("")}
        <path d="M0,500 L0,430 Q${W / 2},410 ${W},430 L${W},500 Z" fill="#b8804a"/>`;
    },
    ikat(W, r) { return ikat(W, r, ["#fbf3e4", "#c0392b", "#1d6fa5", "#f2b134", "#5b2a86", "#127c87"]); },
    ikat2(W, r) { return ikat(W, r, ["#102a43", "#e8613c", "#f2b134", "#2fb3a1", "#d64161"]); }
  };

  window.sceneArt = function (scene, seed = 1, wide = false) {
    const W = wide ? 1200 : 400;
    const fn = SCENES[scene] || SCENES.city;
    const id = "a" + (++uid);
    const r = rng(seed + 99);
    const clouds = /^(ikat|city3|modern)/.test(scene) ? "" : [0, 1, 2].map(i => { const y = 50 + r() * 120, x = r() * W, sc = 0.6 + r() * 0.8;
      return `<g class="cloud" style="animation-duration:${30 + i * 12}s;animation-delay:-${(r() * 30).toFixed(1)}s"><g transform="translate(${x},${y}) scale(${sc})" fill="#fff" opacity=".35"><ellipse cx="0" cy="0" rx="40" ry="14"/><ellipse cx="22" cy="-8" rx="24" ry="14"/><ellipse cx="-18" cy="-5" rx="18" ry="11"/></g></g>`; }).join("");
    return `<svg class="art" viewBox="0 0 ${W} 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${fn(W, rng(seed), id)}${clouds}</svg>`;
  };

  /* Foto bo'lsa — foto, bo'lmasa SVG */
  window.media = function (item, seed, wide) {
    const svg = window.sceneArt(item.scene, seed || 1, wide);
    // Foto: item.img yoki avtomatik "assets/img/<id>.jpg" (yo'nalish nomi bo'yicha)
    const src = item.img || (item.regions ? `assets/img/${item.regions[0]}.jpg` : item.id ? `assets/img/${item.id}.jpg` : "");
    if (src) return svg + `<img src="${src}" alt="" loading="lazy" onerror="this.remove()">`;
    return svg;
  };
})();
