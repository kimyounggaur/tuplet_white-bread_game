let mapKey = "";
function renderMap() {
  const key = JSON.stringify(save.days);
  if (key === mapKey) return;
  mapKey = key;
  const next = DAYS.find((d) => unlocked(save, d.id) && !save.days[d.id]?.passed);
  $("days").innerHTML = DAYS.slice().reverse().map((d) => {
    const i = DAYS.indexOf(d);
    const open = unlocked(save, d.id), rec = save.days[d.id], stamp = rec?.stamp || 0;
    const status = open ? (rec ? `● 최고 ${rec.best}/${d.orders.length}` : "주문 " + d.orders.length + "개") : `${i - 1}단을 통과하면 열려요`;
    const mark = stamp
      ? `<svg class="stamp" aria-hidden="true"><use href="#stamp-${stamp === 2 ? "master" : "normal"}"/></svg><span class="sr-only">${stamp === 2 ? "장인 도장" : "도장"}</span>`
      : open ? "" : '<svg class="i" aria-hidden="true"><use href="#icon-lock"/></svg>';
    return `<button class="btn day-card${d === next ? " suggested" : ""}" type="button" data-day="${d.id}" ${open ? "" : "disabled"}><span class="day-level">${i}단</span><span class="day-detail"><strong>${d.name}</strong><small>${status}</small></span>${mark}</button>`;
  }).join("");
}

let closeKey = "";
function renderClose() {
  const d = dayOf(S.day), n = d.orders.length, sc = S.sum || dayScore(d, S.results);
  const last = queueOf(n, S.results).length - 1;
  const key = JSON.stringify([S.day, S.results, S.cards, S.unlockedNext]);
  if (key === closeKey) return;
  closeKey = key;
  $("closeTitle").textContent = `${DAYS.indexOf(d)}단 ${d.name} 마감`;
  $("closeTimer").setAttribute("href", sc.passed ? "#timer-happy" : "#timer-puzzled");
  $("closeSum").textContent = `● ${sc.clean}/${sc.n} · ${sc.passed ? (sc.stamp === 2 ? "장인 도장을 받았어요" : "도장을 받았어요") : `도장은 ${sc.need}개부터예요`}`;
  $("closeStamp").innerHTML = sc.passed
    ? `<svg class="stamp stamp-fall" aria-hidden="true"><use href="#stamp-${sc.stamp === 2 ? "master" : "normal"}"/></svg>${S.unlockedNext ? "<span>다음 영업일이 열렸어요.</span>" : ""}`
    : "";
  $("closeCards").toggleAttribute("hidden", S.cards.length === 0);
  $("closeCards").innerHTML = S.cards.map((card) => `<li class="recipe-new">${cardName(card)}</li>`).join("");
  $("closeList").innerHTML = d.orders.map((o, i) => {
    const r = (i < n - 1 ? S.results[i] : S.results[last]) || {};
    const mark = r.recipe === "full" ? "●" : r.recipe === "half" ? "◐" : "○";
    return `<li><span>${i + 1}. ${orderText(o)}</span><b>${mark}${r.knife ? " · " + r.knife : ""}</b></li>`;
  }).join("");
  $("nextDay").toggleAttribute("hidden", !S.unlockedNext);
}
function openDay(id, { checkSound = true } = {}) {
  if (!unlocked(save, id)) return;
  stopRun(false);
  if (checkSound && id === "d0" && tutorialStep() === 0) {
    setState({ screen: "sound", soundHelp: false, sheet: false, dev: false });
    return;
  }
  const patch = startDay(S, id);
  setState({ ...patch, sheet: false, unlockedNext: false });
  save = { ...save, active: toActive(S) };
  store.save(save);
  render();
}
