let store = null, save = null;  // 저장소와 지금의 저장 내용
// ── 호출부: 계산부가 돌려준 값을 적용하고, 소리와 기록을 맡는다 ──
function act(p) {  // p: T.*가 돌려준 값. null이면 아무 일도 없다
  if (!p) return;
  const o = orderAt(S), was = S.phase;
  if (o.id === "d0-01" && p.phase === "deliver" && tutorialStep() === 1) advanceTutorial(2);
  if (o.id === "d1-01" && was === "mark" && tutorialStep() === 2 && (p.cuts || p.phase === "slice")) advanceTutorial(3);
  if (o.id === "d1-01" && p.phase === "deliver" && tutorialStep() === 3) advanceTutorial(4);
  if (p.phase && p.phase !== was) stopRun(false);  // 단계가 바뀌면 재생을 멈춘다
  setState(p);
  if (p.phase === "deliver" && was !== "deliver") { record(o); begin("listen"); }  // 납품: 기록하고 듣기를 시작한다
}
function record(o) {  // 납품할 때마다 저장한다. 개발용 바로가기(S.dev)에서는 저장하지 않는다
  const day = dayOf(S.day), done = S.results.length >= queueOf(day.orders.length, S.results).length;
  if (S.dev) { if (done) setState({ sum: dayScore(day, S.results) }); return; }
  const r = applyDelivery(save, o, S.results[S.results.length - 1]);
  save = r.save;
  if (r.card) setState({ cards: S.cards.concat([r.card]) });
  if (done) {
    const next = DAYS[DAYS.indexOf(day) + 1], wasOpen = next && unlocked(save, next.id);
    const c = applyClose(save, day, S.results);
    save = c.save;
    setState({ sum: c.score, unlockedNext: !!(next && !wasOpen && unlocked(save, next.id)) });
  }
  else save.active = toActive(S);
  store.save(save);
}
function setSetting(key, value, patch) {  // 설정은 상태와 저장에 함께 적는다
  save.settings = { ...save.settings, [key]: value };
  store.save(save);
  setState(patch);
}
function goNext() { const p = T.next(S); if (!p) return; stopRun(false); setState(p); }
