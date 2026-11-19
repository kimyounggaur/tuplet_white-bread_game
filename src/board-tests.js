// ── SL2: 한 영역 한 배율 ──
test("TH-12", "한 영역 한 배율: 길이가 2배면 폭도 2배, 유령 빵이 길면 덩이가 줄어든다", () => {
  ok(shelfPct(1) === 100 && near(shelfPct(2), 2 * shelfPct(4)) && near(shelfPct(4), 2 * shelfPct(8)) && near(shelfPct(8), 100 / 8), "선반: 온음표가 폭 전체");
  const a = laneScale({ ns: [1], Tb: 2, ghost: { beats: 3 } }), b = laneScale({ ns: [1], Tb: 2, ghost: { beats: 1 } }), c = laneScale({ ns: [2, 3, 4, 3], Tb: 1 }), d = laneScale({ ns: [1], Tb: 4, ref: { beats: 2 } });
  ok(a.span === 3 && near(a.lw, 200 / 3), "유령 빵 3박, 덩이 2박이면 덩이는 폭의 2/3");
  ok(b.span === 2 && b.lw === 100 && c.span === 4 && c.lw === 100 && d.span === 4 && d.lw === 100, "덩이가 가장 길면 덩이가 폭 전체");
});