// ── SL6: 기록과 이어하기 ──
test("ST-05", "이어하기: 주문 순번과 결과를 되살린다", () => {
  const base = S0(), day = dayOf("d1");
  let s = Object.assign(base, startDay(base, "d1")), sv = defaultSave();
  const deliver = (slip, knife) => { const o = orderAt(s); let r = solve(s, o, slip).s; r.results[r.results.length - 1].knife = knife; const a = applyDelivery(sv, o, r.results[r.results.length - 1]); sv = a.save; if (a.card) r = Object.assign({}, r, { cards: r.cards.concat([a.card]) }); s = r; };
  deliver(false, "장인"); s = Object.assign({}, s, T.next(s)); deliver(true, "고른 편"); s = Object.assign({}, s, T.next(s)); deliver(false, "–");
  sv.active = toActive(s);
  ok(same(sv.active, { day: "d1", index: 3, results: [{ recipe: 2, knife: 3, ng: 0 }, { recipe: 1, knife: 2, ng: 0 }, { recipe: 2, knife: 0, ng: 0 }], cards: ["4/2", "1/2"] }), "하던 영업을 적는다: " + JSON.stringify(sv.active));
  ok(sv.recipes["4/2"].got && sv.recipes["4/2"].knife === 3 && sv.recipes["2/2"].got === false && sv.recipes["2/2"].knife === 2 && sv.stats.orders === 3 && sv.stats.clean === 2 && sv.stats.slices === 2 && sv.stats.master === 1, "카드는 ●일 때만 얻는다. 칼솜씨의 최고 기록은 늘 적는다");
  const back = fromActive(S0(), JSON.parse(JSON.stringify(sv.active)));
  ok(back && back.screen === "shift" && back.day === "d1" && back.idx === 3 && back.phase === "mark" && same(back.results, s.results) && same(back.cards, ["4/2", "1/2"]), "같은 주문에서 이어진다");
  ok(fromActive(S0(), { day: "zz", index: 0, results: [] }) === null && fromActive(S0(), { day: "d1", index: 5, results: [] }) === null && fromActive(S0(), null) === null, "읽을 수 없으면 null");
  const six = Array.from({ length: 6 }, (_, i) => ({ recipe: i === 1 ? 1 : 2, knife: 0, ng: 0 })), redo = fromActive(S0(), { day: "d1", index: 6, results: six });
  ok(redo && redo.idx === 6 && orderAt(Object.assign(S0(), redo)).id === "d1-02", "다시 나오는 주문에서도 이어진다");
  ok(fromActive(S0(), { day: "d1", index: 4, results: six.slice(0, 4) }).phase === "scene", "발견 장면 앞에서 멈췄으면 장면부터");
  const fin = playDay("d1", []).s, c = applyClose(sv, day, fin.results);
  ok(c.score.passed && c.score.stamp === 1 && c.save.active === null && same(c.save.days.d1, { passed: true, stamp: 1, runs: 1, best: 7 }) && sv.active !== null, "마감: 통과와 도장을 적고 하던 영업을 지운다. 원본은 그대로");
  const mast = fin.results.map((r) => Object.assign({}, r, { knife: "장인", ng: true }));
  ok(dayScore(day, mast).stamp === 2 && dayScore(day, mast.map((r, i) => (i === 2 ? Object.assign({}, r, { ng: false }) : r))).stamp === 1 && dayScore(dayOf("d0"), playDay("d0", []).s.results).stamp === 1, "장인 도장: 썰기가 있는 주문 전부를 안내선 없이 장인으로");
  ok(unlocked(c.save, "d0") && unlocked(c.save, "d2") && !unlocked(c.save, "d3") && !unlocked(defaultSave(), "d1"), "앞 영업일을 통과하면 다음이 열린다");
  const lo = applyDelivery(defaultSave(), orderById("d0-01"), { recipe: "full", knife: "", ng: false });
  ok(lo.card === "4" && same(lo.save.loaves, [4]) && applyDelivery(lo.save, orderById("d0-06"), { recipe: "full", knife: "", ng: false }).card === "", "덩이 카드는 한 번만");
});
