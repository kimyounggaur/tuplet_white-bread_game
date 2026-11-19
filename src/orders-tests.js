// ── SL1-2: 주문 씨앗 ──
const splitOrders = () => ORDERS.filter((o) => o.ask !== "pick" && o.ns.length === 1);
test("GN-01", "주문 43개를 모두 풀 수 있다", () => {
  ok(ORDERS.length === 43 && new Set(ORDERS.map((o) => o.id)).size === 43, "주문 43개, id가 겹치지 않는다");
  for (const o of ORDERS) {
    ok(DENS.includes(o.loaf), o.id + " 덩이");
    if (o.ask === "pick") { ok(same(o.ns, [1]) && ["beats", "name", "join", "sound"].includes(o.by), o.id + " 고르기"); if (o.by === "join") ok(eq(mul(loafBeats(o.join[0]), F(o.join[1])), loafBeats(o.loaf)), o.id + " 이어 붙인 길이"); continue; }
    for (const n of o.ns) {
      const s = specOf(o.loaf, n);
      ok(s && n >= 2 && n <= 4 && s.unitDen <= 16, o.id + " 표기 음표는 16분음표까지");
      ok(num(toBeats(s.piece)) * beatSec(o.bpm) * 1000 >= 150, o.id + " 썰기의 한 조각은 150ms 이상");
    }
    ok(o.ns.length === 1 || (o.ns.length === 4 && o.loaf === 4), o.id + " 연속 주문은 1박 덩이 4개");
  }
});
test("GN-02", "영업일별 주문 수와 통과 기준", () => {
  ok(same(DAYS.map((d) => [d.id, d.orders.length, passNeed(d.orders.length), Object.keys(d.scenes).sort().map((k) => d.scenes[k])]), LOCK.days), "주문 7, 7, 7, 8, 6, 8개. 통과 6, 6, 6, 7, 5, 7개");
});
test("GN-03", "분할 11가지가 한 번 이상 나오고 처음 나오는 주문이 정답표와 같다", () => {
  const first = {};
  splitOrders().forEach((o) => { const k = recipeKey(o.loaf, o.ns[0]); if (!first[k]) first[k] = o.id; });
  ok(Object.keys(first).length === 11, "분할 " + Object.keys(first).length + "가지");
  for (const [d, n, , , , , id] of LOCK.splits) ok(first[recipeKey(d, n)] === id, d + "÷" + n + "은 " + id + "에서 처음 나온다. 지금 " + first[recipeKey(d, n)]);
  ok(cardList().length === 15 && same(cardList().slice(0, 4), ["1", "2", "4", "8"]), "레시피 카드 15장(덩이 4 + 분할 11)");
});
test("GN-04", "마감 주문은 영업일의 마지막이고 도움이 꺼져 있다", () => {
  for (const d of DAYS) d.orders.forEach((o, i) => {
    ok(o.final === (i === d.orders.length - 1), o.id + " 마감 표시");
    if (o.final) ok(o.count === false && o.guide === false, o.id + " 마감 주문의 도움");
  });
  ok(orderById("d2-06").guide === false && orderById("d3-06").guide === false && orderById("d2-05").guide === true && orderById("d1-01").count === true, "안내선을 끄는 연습 주문");
});
test("GN-05", "썰기에 놓는 덩이 수", () => {
  for (const [d, , reps, total] of LOCK.loaves) { const o = { loaf: d, ns: [2] }; ok(sliceNs(o).length === reps && near(sliceNs(o).length * TbOf(d), total), noteKo(d) + " " + reps + "덩이"); }
  ok(same(sliceNs(orderById("d4-05")), [2, 3, 4, 3]) && same(sliceNs(orderById("d3-02")), [3, 3]) && bpmOf(orderById("d1-06"), false) === 50 && bpmOf(orderById("d1-01"), true) === 50, "연속 주문은 그대로. 8분음표 덩이는 ♩=50");
});
test("GN-06", "주문 문장은 씨앗에서 만들어진다", () => {
  for (const id of Object.keys(LOCK.orderText)) ok(orderText(orderById(id)) === LOCK.orderText[id], id + ": " + orderText(orderById(id)));
  ok(shelfLabel(orderById("d0-01"), 4, true) === "4분음표" && shelfLabel(orderById("d0-04"), 8, true) === "½박" && shelfLabel(orderById("d0-01"), 4, false) === "4분음표 1박" && shelfLabel(orderById("d0-05"), 2, true) === "2분음표 2박", "선반 이름표(D12)");
});
test("LB-06", "보기 순서는 주문마다 정해져 있고 정답 자리가 고루 나온다", () => {
  const seats = [0, 0, 0];
  for (const o of ORDERS.filter((x) => x.label === "choose")) {
    const a = choicesOf(o), right = labelOf(specOf(o.loaf, o.ns[0]));
    ok(same(a, choicesOf(o)) && a.length === 3 && same(a.map(labelKo).sort(), labelChoices(specOf(o.loaf, o.ns[0])).map(labelKo).sort()), o.id + " 같은 주문은 늘 같은 순서");
    seats[a.findIndex((l) => sameLabel(l, right))]++;
  }
  ok(seats[0] + seats[1] + seats[2] === 8 && Math.min.apply(null, seats) >= 2, "정답 자리 " + seats.join(", "));
  ok(same(shuffled([1, 2, 3], 5), shuffled([1, 2, 3], 5)) && choicesOf(orderById("d1-01")).length === 0, "씨앗이 같으면 순서가 같다");
});
