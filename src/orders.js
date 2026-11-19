// ── 주문: 씨앗만 적는다(R3). 이름, 비율, 보기, 문구 속 수치는 엔진이 만든다 ──
const DENS = [1, 2, 4, 8];  // 선반의 덩이(음표 분모). 온음표부터 8분음표까지
const DAYS = [
  { id: "d0", name: "첫 출근", base: { ask: "pick" }, scenes: {}, seeds: [
    { by: "beats", loaf: 4 }, { by: "beats", loaf: 2 }, { by: "beats", loaf: 1 }, { by: "name", loaf: 8 },
    { by: "join", loaf: 2, join: [4, 2] }, { by: "join", loaf: 4, join: [8, 2] }, { by: "sound", loaf: 2, final: true },
  ] },
  { id: "d1", name: "반으로, 또 반으로", base: { ask: "word", label: "auto", count: true }, scenes: { 4: "S1" }, seeds: [
    { loaf: 4, ns: [2] }, { loaf: 2, ns: [2] }, { loaf: 1, ns: [2] }, { loaf: 4, ns: [4] },
    { loaf: 2, ns: [4] }, { loaf: 8, ns: [2], bpm: 50 }, { loaf: 1, ns: [4], final: true },
  ] },
  { id: "d2", name: "세 조각의 문제", base: { ask: "word", loaf: 4, label: "yesno", mold: true, count: true }, scenes: { 0: "S2", 3: "S3" }, seeds: [
    { ns: [2] }, { ns: [3] }, { ns: [4] }, { ns: [3] }, { ns: [2] }, { ns: [3], guide: false }, { ns: [3], final: true },
  ] },
  { id: "d3", name: "같은 세 조각, 다른 빵", base: { ask: "word", label: "choose", mold: true, count: true }, scenes: { 2: "S4" }, seeds: [
    { loaf: 4, ns: [3] }, { loaf: 2, ns: [3] }, { loaf: 1, ns: [3] }, { loaf: 8, ns: [3], bpm: 50 },
    { loaf: 2, ns: [4] }, { loaf: 2, ns: [3], guide: false }, { loaf: 4, ns: [2] }, { loaf: 1, ns: [3], final: true },
  ] },
  { id: "d4", name: "바꿔 썰기", base: { ask: "word", loaf: 4 }, scenes: {}, seeds: [
    { ns: [2, 2, 2, 2] }, { ns: [3, 3, 3, 3] }, { ns: [2, 2, 3, 3] }, { ns: [2, 3, 2, 3] }, { ns: [2, 3, 4, 3] }, { ns: [4, 3, 2, 3], final: true },
  ] },
  { id: "d5", name: "거꾸로 읽기", base: { mold: true }, scenes: {}, seeds: [
    { ask: "score", loaf: 4, ns: [3] }, { ask: "score", loaf: 2, ns: [3] }, { ask: "score", loaf: 2, ns: [4] }, { ask: "score", loaf: 1, ns: [3] },
    { ask: "sound", loaf: 4, ns: [3] }, { ask: "sound", loaf: 4, ns: [2] }, { ask: "sound", loaf: 2, ns: [3] }, { ask: "sound", loaf: 2, ns: [4], final: true },
  ] },
];
const ORDERS = [];  // 씨앗에 기본값을 채운 주문 43개. id는 "d3-02" 꼴
for (const d of DAYS) d.orders = d.seeds.map((seed, i) => {
  const o = Object.assign({ id: `${d.id}-${String(i + 1).padStart(2, "0")}`, day: d.id, no: ORDERS.length, by: "", ns: [1], label: "", mold: false, count: false, guide: true, bpm: 60, final: false }, d.base, seed);
  if (o.final) { o.count = false; o.guide = false; }  // 마감 주문은 도움이 꺼져 있다
  ORDERS.push(o);
  return o;
});
const dayOf = (id) => DAYS.find((d) => d.id === id) || null;
const orderById = (id) => ORDERS.find((o) => o.id === id) || null;
const SCENES = {  // 발견 장면: 도마에 놓을 줄. mold가 참이면 빵 대신 보통 칸(틀)을 그린다
  S1: { rows: [{ loaf: 4, n: 2 }, { loaf: 2, n: 2 }] },
  S2: { rows: [{ loaf: 4, n: 2, mold: true }, { loaf: 4, n: 3 }, { loaf: 4, n: 4, mold: true }] },
  S3: { rows: [{ loaf: 4, n: 2 }, { loaf: 4, n: 3 }, { loaf: 4, n: 4 }] },
  S4: { rows: [{ loaf: 4, n: 3 }, { loaf: 2, n: 3 }] },
};

const repsOf = (Tb) => (Tb >= 4 ? 1 : Tb >= 2 ? 2 : 4);  // 썰기에 놓는 덩이 수
const sliceNs = (o) => (o.ns.length > 1 ? o.ns : Array(repsOf(TbOf(o.loaf))).fill(o.ns[0]));
const bpmOf = (o, slow) => o.bpm - (slow ? 10 : 0);
const passNeed = (n) => Math.ceil((n * 4) / 5);  // 통과에 필요한 ● 수: 주문 수의 80%(올림)
const recipeKey = (den, n) => den + "/" + n;  // 레시피 카드의 열쇠. "4/3" = 4분음표 덩이 3조각
const choicesOf = (o) => (o.label === "choose" ? shuffled(labelChoices(specOf(o.loaf, o.ns[0])), 7 * o.no + 3) : []);  // 보기 순서는 주문마다 늘 같다
const cardList = () => DENS.map(String).concat(ORDERS.filter((o) => o.ask !== "pick" && o.ns.length === 1).map((o) => recipeKey(o.loaf, o.ns[0])).filter((k, i, a) => a.indexOf(k) === i));

// ── 문구: 수치와 음표 이름은 전부 엔진에서 온다 ──
const TAG = { pick: "고르기", word: "말 주문", score: "악보 주문", sound: "소리 주문" };
const josa = (n, withFinal, without) => ("013678".includes(String(n).slice(-1)) ? withFinal : without);  // 숫자 뒤의 조사(삼을, 이를)
const noteShort = (den) => (den === 1 ? "온" : den + "분");  // 칸이 좁을 때 쓰는 줄인 이름
const ratioKo = (s) => (s.isTuplet ? ` (${s.n}:${s.m})` : " · 일반 분할");
const splitKo = (s) => nameKo(s) + ratioKo(s);
function orderText(o) {
  const b = beatsKo(loafBeats(o.loaf));
  if (o.ask === "pick") {
    if (o.by === "name") return `${noteKo(o.loaf)} 식빵을 골라 주세요.`;
    if (o.by === "join") return `${noteKo(o.join[0])} 식빵 ${o.join[1]}개를 이으면 어느 식빵과 같을까요?`;
    if (o.by === "sound") return "이 소리만큼 긴 식빵을 골라 주세요.";
    return `${b}짜리 식빵을 골라 주세요.`;
  }
  if (o.ask === "score") return "이 악보대로 썰어 주세요.";
  if (o.ask === "sound") return "들리는 대로 썰어 주세요.";
  if (o.ns.length > 1) return `${b} 식빵 ${o.ns.length}개를 차례로 ${o.ns.join(" · ")}조각으로 썰어 주세요.`;
  return `${b} 식빵(${noteKo(o.loaf)})을 같은 크기 ${o.ns[0]}조각으로 썰어 주세요.`;
}
function shelfLabel(o, den, picking) {  // 선반 이름표(D12): 묻는 것을 이름표가 알려 주지 않게 한다
  const nm = noteKo(den), b = beatsKo(loafBeats(den));
  if (picking && o.ask === "pick" && o.by === "beats") return nm;
  if (picking && o.ask === "pick" && o.by === "name") return b;
  return nm + " " + b;
}
function sceneText(id) {  // 발견 장면의 두 문장
  const rows = SCENES[id].rows, sp = rows.map((r) => specOf(r.loaf, r.n));
  if (id === "S1") return ["조각 수는 같은데 길이가 달라요.", "덩이가 길면 조각도 길어요."];
  if (id === "S2") { const s = sp[1], a = noteKo(s.unitDen), b = noteKo(s.unitDen * 2); return [`${s.n}조각은 ${a}보다 짧고 ${b}보다 길어요.`, `딱 맞는 음표가 없어서 ${a}에 숫자 ${s.n}${josa(s.n, "을", "를")} 붙여요.`]; }
  if (id === "S3") { const plain = sp.filter((s) => !s.isTuplet).map((s) => s.n), tup = sp.filter((s) => s.isTuplet).map((s) => s.n); return [`같은 ${beatsKo(loafBeats(rows[0].loaf))}을 ${sp.map((s) => s.n).join(", ")}로 나눴어요.`, `${plain.join("와 ")}는 보통 음표이고 ${tup.join(", ")}에만 숫자가 필요해요.`]; }
  return [`둘 다 ${COUNT_KO[sp[0].n]}잇단이지만 이름이 달라요.`, "이름은 덩이가 정해요."];
}
const sceneCaption = (r) => { const s = specOf(r.loaf, r.n); return r.mold ? `보통 칸 ${s.n}개 · ${noteKo(s.unitDen)}` : splitKo(s); };
