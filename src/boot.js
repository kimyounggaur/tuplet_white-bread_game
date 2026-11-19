function boot() {
  store = makeStore(pickBackend());
  save = store.load();
  bindWorkbench();
  bindIntro();
  bindIntroAudio();
  if (typeof bindCalibration === "function") bindCalibration();
  if (typeof bindExtras === "function") bindExtras();
  const tests = runTests(), set = save.settings, base = { guide: set.guide, slow: set.slow, offset: set.tapOffsetMs, showMs: set.showMs };
  window.__tests = tests;
  $("foot").textContent = `외부 요청 0건 · ${tests.line}`;
  $("resume").toggleAttribute("hidden", !save.active);  // 하던 영업이 있으면 [이어서 영업]
  measure();
  const hash = location.hash.slice(1), jump = orderById(hash), sceneDay = DAYS.find((d) => Object.keys(d.scenes).some((k) => d.scenes[k] === hash));
  if (hash === "test") { showTests(tests); return; }
  if (jump || sceneDay) {  // 개발용 바로가기: 주소 끝에 #d3-02(주문) 또는 #S2(발견 장면). 저장하지 않는다
    const d = jump ? dayOf(jump.day) : sceneDay, i = jump ? d.orders.indexOf(jump) : +Object.keys(d.scenes).find((k) => d.scenes[k] === hash);
    const fake = Array.from({ length: i }, () => ({ recipe: "full", knife: "", ng: false })), at = Object.assign({}, S, base, { day: d.id });
    setState(Object.assign(base, { screen: "shift", day: d.id, sliced: false, cards: [], dev: true, sum: null }, jump ? Object.assign({ idx: i, results: fake }, enterOrder(at, jump)) : openAt(at, i, fake)));
    return;
  }
  setState({ ...base, screen: introRoute(save, !!fromActive(S, save.active)) });
}
