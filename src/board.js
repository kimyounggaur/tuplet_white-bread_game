// Workbench view for the shared order screen.
let orderKey = "";
let shelfKey = "";
let boardKey = "";
let labelKey = "";
let laneLw = 100;
let lastBoard = null;

// ── 길이 계산: 한 영역 한 배율(R1). 화면 좌표는 전부 %로 준다 ──
const shelfPct = (den) => (TbOf(den) / Math.max.apply(null, DENS.map(TbOf))) * 100;  // 선반: 가장 긴 덩이가 폭 전체
function laneScale(m) {  // 도마: 올라온 것(덩이, 유령 빵, 이어 붙인 줄) 가운데 가장 긴 것에 맞춘다
  const own = m.ns.length * m.Tb, span = Math.max(own, m.ghost ? m.ghost.beats : 0, m.ref ? m.ref.beats : 0);
  return { own, span, lw: (own / span) * 100 };
}

// ── 악보 그리기: 음표 머리의 x 자리들을 받아 묶음 하나를 그린다 ──
function notesSvg(l, xs, W, H, colored, bg) {
  const y = H - 8, top = y - 22, sx = 6.2, n = xs.length, beams = Math.max(0, Math.log2(l.den) - 2), open = l.den <= 2;
  let g = `<line x1="0" y1="${y}" x2="${W}" y2="${y}" style="stroke:var(--ink-2)" stroke-width="1"/>`;
  xs.forEach((x, i) => {
    const c = colored ? `hsl(${hue(i)} 55% 34%)` : "var(--ink)";
    g += `<ellipse cx="${x}" cy="${y}" rx="6.4" ry="4.6" transform="rotate(-20 ${x} ${y})" style="fill:${open ? bg : c};stroke:${c}" stroke-width="${open ? 2 : 0}"/>`;
    if (l.den >= 2) g += `<line x1="${x + sx}" y1="${y - 1.5}" x2="${x + sx}" y2="${top}" style="stroke:var(--ink)" stroke-width="1.6"/>`;
  });
  for (let b = 0; b < beams; b++) g += `<rect x="${xs[0] + sx - 0.8}" y="${top + b * 5.5}" width="${xs[n - 1] - xs[0] + 1.6}" height="3.4" style="fill:var(--ink)"/>`;
  if (l.tup) {
    const x1 = xs[0] - 7, x2 = xs[n - 1] + sx + 7, by = top - 9, mid = (x1 + x2) / 2;
    g += `<path d="M${x1} ${by + 5}V${by}H${mid - 11}M${mid + 11} ${by}H${x2}V${by + 5}" fill="none" style="stroke:var(--ink)" stroke-width="1.4"/>`;
    g += `<text x="${mid}" y="${by + 4.5}" text-anchor="middle" font-size="12.5" font-weight="800" style="fill:var(--ink)">${l.tup}</text>`;
  }
  return g;
}
function evenXs(n, W) { const step = Math.min(28, (W - 34) / Math.max(1, n - 1)), x0 = (W - step * (n - 1) - 6) / 2; return Array.from({ length: n }, (_, i) => x0 + i * step); }

// ── 도마: 무엇을 그릴지를 상태에서 뽑아 열쇠로 삼고, 열쇠가 바뀔 때만 다시 만든다(R12) ──
function boardModel() {
  if (S.phase === "scene") return { scene: S.scene };
  const o = orderAt(S), den = S.sel, single = o.ns.length === 1;
  const ref = S.phase === "pick" && o.by === "join" ? { count: o.join[1], beats: o.join[1] * TbOf(o.join[0]) } : null;  // 이어 붙이기 주문의 견줄 줄
  if (den === null) return ref ? { empty: true, ref } : { empty: true };
  const base = { den, Tb: TbOf(den) };
  switch (S.phase) {
    case "pick": return Object.assign(base, { ns: [1], view: "plain", ghost: S.ghost, ref });
    case "mark": return Object.assign(base, { ns: S.cuts.map((k) => k + 1), view: S.fix ? "fix" : "marks", mold: o.mold && single ? S.cuts[0] + 1 : 0, tap: true, focus: single ? -1 : S.focus, counts: !single });
    case "label": return Object.assign(base, { ns: [o.ns[0]], view: "slices", mold: o.ns[0], ghost: S.ghost });
    case "slice": return Object.assign(base, { ns: sliceNs(o), view: "guide", guide: S.guideNow });
    default: return Object.assign(base, { ns: o.ask === "pick" ? [1] : o.ns, view: "slices", mold: o.mold && single ? o.ns[0] : 0, score: o.ask !== "pick" && single });
  }
}
function buildBoard(m) {
  const el = $("board"), act = document.activeElement, hadFocus = act && act.classList && act.classList.contains("loaf") ? act.dataset.q : null;
  const previous = lastBoard;
  const oldLw = laneLw;
  const animate = !["count", "run", "listen"].includes(S.sub);
  lastBoard = m;
  laneLw = 100;
  if (m.scene) { buildScene(el, m.scene); return; }
  if (m.empty && !m.ref) { el.innerHTML = `<p class="empty">선반에서 식빵을 골라 도마에 올려요</p>`; return; }
  const sc = m.empty ? { span: m.ref.beats, lw: 100 } : laneScale(m), span = sc.span, lw = sc.lw;  // 한 영역 한 배율
  const W = Math.max(120, el.clientWidth - 27), tag = m.tap ? "button" : "div";
  laneLw = lw;
  let h = "";
  if (m.ref) h += `<div class="refrow" style="width:${(m.ref.beats / span) * 100}%">${Array.from({ length: m.ref.count }, (_, i) => `<div class="loaf" style="left:${(i / m.ref.count) * 100}%;width:${100 / m.ref.count}%"></div>`).join("")}</div>`;
  if (m.empty) h += `<p class="empty">길이가 같은 식빵을 선반에서 골라요</p>`;
  else {
    const R = m.ns.length;
    if (m.mold) {
      const s = specOf(m.den, m.mold), cell = (W * lw) / 100 / s.m;
      h += `<div class="mold" style="width:${lw}%">${Array.from({ length: s.m }, () => `<span>${cell >= 50 ? noteKo(s.unitDen) : noteShort(s.unitDen)}${cell >= 104 ? " " + beatsKo(toBeats(s.unit)) : ""}</span>`).join("")}</div>`;
    }
    const rescale = animate && previous && !previous.empty && !previous.scene && oldLw !== lw;
    const arrive = animate && S.phase === "pick" && (!previous || previous.empty || previous.den !== m.den);
    h += `<div class="lane${m.view === "guide" && !m.guide ? " noguide" : ""}${rescale ? " rescale" : ""}" id="lane"${rescale ? ` style="--from-scale:${oldLw / lw}"` : ""}>`;
    m.ns.forEach((n, q) => {
      const px = (W * lw) / 100 / R / n, pk = beatsKo(div(loafBeats(m.den), F(n)));
      const oldN = previous?.view === "marks" || previous?.view === "fix" ? previous.ns[q] : undefined;
      const recut = animate && m.view === "marks" && oldN !== undefined && oldN !== n;
      h += `<${tag} class="loaf${m.focus === q ? " focus" : ""}${arrive ? " arrive" : ""}"${m.tap ? ` type="button" data-q="${q}" aria-label="${R > 1 ? q + 1 + "번째 덩이, " : ""}칼집 ${n - 1}번. 누르면 하나 늘어요"` : ""} style="left:${(q / R) * lw}%;width:${lw / R}%">`;
      if (m.view === "slices" || m.view === "fix") for (let i = 0; i < n; i++) h += `<i class="slice${m.view === "fix" ? " num wrong" : ""}" style="left:${(i / n) * 100}%;width:${100 / n}%;--hue:${hue(i)}">${m.view === "fix" ? i + 1 : px >= 38 ? pk : ""}</i>`;
      if (m.view !== "plain") for (let k = 1; k < n; k++) h += `<b class="mark${m.view === "fix" ? " solid" : recut ? " appear" : ""}" style="left:${(k / n) * 100}%"></b>`;
      if (recut && oldN > n) for (let k = 1; k < oldN; k++) if ((k * n) % oldN !== 0) h += `<b class="mark disappear" aria-hidden="true" style="left:${(k / oldN) * 100}%"></b>`;
      if (m.counts) h += `<em class="kc">칼집 ${n - 1}</em>`;
      h += `</${tag}>`;
    });
    h += `<div class="cursor" id="cursor" aria-hidden="true"><svg class="cursor-blade" viewBox="0 0 40 48"><use href="#cutting-knife"/></svg></div></div>`;
    if (m.ghost) h += `<div class="ghost" style="width:${(m.ghost.beats / span) * 100}%">${m.ghost.text}</div>`;
  }
  h += rulerHtml(span);
  if (m.score) h += `<svg class="score" id="score" role="img"></svg>`;
  el.innerHTML = h;
  if (m.score) {
    const s = specOf(m.den, m.ns[0]), l = labelOf(s), sv = $("score");
    sv.setAttribute("viewBox", `0 0 ${W} 50`); sv.setAttribute("aria-label", labelKo(l));
    sv.innerHTML = notesSvg(l, Array.from({ length: s.n }, (_, i) => (i / s.n) * W + 12), W, 50, true, "var(--board)");
  }
  if (hadFocus !== null && hadFocus !== undefined) { const b = el.querySelector(`button.loaf[data-q="${hadFocus}"]`); if (b) b.focus(); }
}
function rulerHtml(span) {  // 눈금: 0부터 가장 긴 박까지. 1박보다 짧으면 반 박 간격
  const step = span >= 1 ? 1 : 0.5;
  let h = `<div class="ruler">`;
  for (let b = 0; b <= span + 1e-9; b += step) h += `<span style="left:${(b / span) * 100}%">${fmt(b)}${b + step > span + 1e-9 ? "박" : ""}</span>`;
  return h + `</div>`;
}
function buildScene(el, id) {  // 발견 장면: 줄이 여럿이어도 배율은 하나(R1)
  buildComparison(el, SCENES[id].rows);
}
function buildComparison(el, rows) {
  const span = Math.max.apply(null, rows.map((r) => TbOf(r.loaf)));
  let h = "";
  rows.forEach((r, i) => {
    const s = specOf(r.loaf, r.n), lw = (TbOf(r.loaf) / span) * 100;
    h += `<p class="cap">${sceneCaption(r)}</p><div class="lane" data-row="${i}" style="width:${lw}%"><div class="loaf${r.mold ? " asmold" : ""}" style="left:0;width:100%">`;
    for (let k = 0; k < s.n; k++) h += `<i class="slice" style="left:${(k / s.n) * 100}%;width:${100 / s.n}%;--hue:${hue(k)}">${r.mold ? noteKo(s.unitDen) : beatsKo(toBeats(s.piece))}</i>`;
    for (let k = 1; k < s.n; k++) h += `<b class="mark" style="left:${(k / s.n) * 100}%"></b>`;
    h += `</div></div>`;
  });
  el.innerHTML = h + rulerHtml(span);
}

function renderWorkbench() {
  const scene = S.phase === "scene", o = orderAt(S);
  renderHud();
  renderOrder(o, scene);
  renderShelf(o);
  renderBoard();
  $("readout").className = "readout " + S.msg.tone;
  $("readout").textContent = S.msg.text;
  renderControls(o);
}
function renderHud() {
  const d = dayOf(S.day), n = d.orders.length, last = queueOf(n, S.results).length - 1, cur = baseAt(S);
  $("hudTitle").textContent = DAYS.indexOf(d) + "단";
  $("dots").innerHTML = d.orders.map((_, i) => { const r = i < n - 1 ? S.results[i] : S.results[last]; return `<li class="${i === cur ? "cur " : ""}${r ? r.recipe : ""}" aria-label="주문 ${i + 1}${r ? (r.recipe === "full" ? ": 한 번에 맞힘" : ": 도움 받아 완료") : ""}"></li>`; }).join("");
  const on = soundOn(ctx && ctx.state);  // 소리 상태를 숨기지 않는다(R13)
  $("soundChip").toggleAttribute("hidden", on);
  $("hud").classList.toggle("nosound", !on);
}
function renderOrder(o, scene) {
  const busy = S.sub === "count" || S.sub === "run", key = S.day + "/" + S.idx + "/" + (scene ? "scene" : "order"), play = !scene && (o.ask === "sound" || o.by === "sound");
  if (key !== orderKey) {  // 주문 카드는 주문이 바뀔 때만 다시 그린다
    orderKey = key;
    const icon = scene ? "board" : { pick: "board", word: "chat", score: "score", sound: "sound" }[o.ask];
    $("order").dataset.kind = scene ? "scene" : o.ask;
    $("orderTag").innerHTML = `<svg class="i" aria-hidden="true"><use href="#icon-${icon}"/></svg>${scene ? "발견" : TAG[o.ask]}`;
    $("orderText").textContent = scene ? sceneText(S.scene)[0] : orderText(o);
    const sc = $("orderScore"), show = !scene && o.ask === "score";
    sc.toggleAttribute("hidden", !show);
    if (show) { const l = labelOf(specOf(o.loaf, o.ns[0])); sc.setAttribute("viewBox", "0 0 104 48"); sc.setAttribute("aria-label", labelKo(l)); sc.innerHTML = notesSvg(l, evenXs(l.count, 104), 104, 48, false, "var(--panel)"); }
    $("orderPlay").toggleAttribute("hidden", !play);
  }
  updateOrderAudio();
  $("orderPlay").disabled = busy;
}
function updateOrderAudio() {
  const settings = save?.settings;
  const silent = !soundOn(ctx?.state) || settings?.muted || settings?.volume === 0;
  $("orderPlay").textContent = S.hearing ? "듣는 중" : silent ? "소리 켜고 듣기" : "주문 듣기";
}
function renderShelf(o, forcePicking = false, chosenDen = S.sel) {
  const picking = forcePicking || S.phase === "pick", key = o.id + "/" + picking;
  if (key !== shelfKey) {  // 이름표는 주문과 단계에 따라 달라진다(D12)
    shelfKey = key;
    let h = "";
    for (const den of DENS) h += `<button class="srow" type="button" data-den="${den}" aria-pressed="false"><span class="nm">${shelfLabel(o, den, picking)}</span><span class="track"><span class="bar" style="width:${shelfPct(den)}%"></span></span></button>`;
    const top = Math.round(Math.max.apply(null, DENS.map(TbOf)));
    h += `<div class="sruler" aria-hidden="true"><span></span><div class="ruler">${Array.from({ length: top + 1 }, (_, b) => `<span style="left:${(b / top) * 100}%">${b}${b === top ? "박" : ""}</span>`).join("")}</div></div>`;
    $("shelf").innerHTML = h;
  }
  $("shelf").classList.toggle("pick", picking);
  document.querySelectorAll("#shelf .srow").forEach((b) => { b.disabled = !picking; b.setAttribute("aria-pressed", String(+b.dataset.den === chosenDen)); });
}
function renderBoard() {
  const el = $("board"), m = boardModel(), key = JSON.stringify(m) + "|" + boardW;
  el.classList.toggle("pick", S.phase === "pick");
  el.classList.toggle("join", !!m.ref);
  el.classList.toggle("scene", S.phase === "scene");
  el.classList.toggle("run", S.phase === "slice" || S.phase === "deliver");
  if (key !== boardKey) { boardKey = key; buildBoard(m); }
}
const PAINT = {};  // 단계별 조작부 그리기. 단계가 생길 때마다 하나씩 더한다
function renderControls(o) {
  const ph = S.phase, lab = ph === "label" ? o.label : "";
  $("cPick").toggleAttribute("hidden", ph !== "pick");
  $("cMark").toggleAttribute("hidden", ph !== "mark");
  $("cYesNo").toggleAttribute("hidden", lab !== "yesno");
  $("cLabel").toggleAttribute("hidden", lab !== "choose");
  $("cSlice").toggleAttribute("hidden", ph !== "slice");
  $("cDeliver").toggleAttribute("hidden", ph !== "deliver");
  $("cScene").toggleAttribute("hidden", ph !== "scene");
  if (PAINT[ph]) PAINT[ph](o);
}
PAINT.mark = (o) => { $("markOut").textContent = (o.ns.length > 1 ? `${S.focus + 1}번째 · ` : "") + `칼집 ${S.cuts[S.focus] || 0}번`; };
PAINT.label = (o) => {
  $("yes").disabled = S.wrong.includes("y");
  $("no").disabled = S.wrong.includes("n");
  if (o.label === "choose" && labelKey !== o.id) {  // 이름표 보기는 주문이 바뀔 때만 다시 그린다
    labelKey = o.id;
    choicesOf(o).forEach((l, i) => { $("lab" + i).innerHTML = `<svg viewBox="0 0 96 48" role="img" aria-label="${labelKo(l)}">${notesSvg(l, evenXs(l.count, 96), 96, 48, false, "var(--panel)")}</svg><span>${labelKo(l)}</span>`; });
  }
  [0, 1, 2].forEach((i) => { $("lab" + i).disabled = S.wrong.includes(i); });
};
function bindWorkbench() {
  // ── 입력: 누른 것을 계산부에 넘기고 돌려받은 값을 act()로 적용한다 ──
  $("shelf").addEventListener("click", (e) => {
    const b = e.target.closest(".srow[data-den]");
    if (!b || b.disabled) return;
    const den = +b.dataset.den;
    if (S.screen === "free") freePick(den);
    else act(T.pick(S, orderAt(S), den));
  });
  $("pickOk").addEventListener("click", () => act(T.confirmPick(S, orderAt(S))));

  $("board").addEventListener("click", (e) => { const l = e.target.closest("button.loaf"); if (l && S.screen !== "free") act(T.bump(S, orderAt(S), +l.dataset.q, "tap")); });
  $("minus").addEventListener("click", () => { if (S.screen !== "free") act(T.bump(S, orderAt(S), S.focus, -1)); });
  $("plus").addEventListener("click", () => { if (S.screen !== "free") act(T.bump(S, orderAt(S), S.focus, 1)); });
  $("markOk").addEventListener("click", () => act(T.confirmMark(S, orderAt(S))));
  $("yes").addEventListener("click", () => act(T.yesNo(S, orderAt(S), true)));
  $("no").addEventListener("click", () => act(T.yesNo(S, orderAt(S), false)));
  [0, 1, 2].forEach((i) => $("lab" + i).addEventListener("click", () => act(T.choose(S, orderAt(S), i))));
}
