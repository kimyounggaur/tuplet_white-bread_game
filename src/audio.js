// ── 재생 계획(순수): 소리와 화면이 함께 쓰는 시간표. t는 본 구간의 시작을 0으로 둔 박 ──
function addListen(p, row, at, Tb, ns) {  // 듣기 한 줄: 원래 소리 → 조각 리듬. 끝나는 박을 돌려준다
  const R = ns.length, total = R * Tb, pass = Math.max(1, Math.ceil(total - 1e-9));  // 덩이가 1박보다 짧으면 다음 박까지 쉰다
  p.parts.push({ row, at, Tb, ns, R, total, pass });
  for (let k = 0; k < pass * p.passes; k++) p.ev.push({ t: at + k, type: "tick", strong: k % pass === 0 });
  for (let q = 0; q < R; q++) p.ev.push({ t: at + q * Tb, type: "tone", midi: 67, dur: Tb * p.beat, peak: 0.3, hold: true });
  if (p.passes === 2) for (let q = 0; q < R; q++) for (let i = 0; i < ns[q]; i++) p.ev.push({ t: at + pass + q * Tb + (i * Tb) / ns[q], type: "tone", midi: 79, dur: Math.min(0.22, (Tb / ns[q]) * p.beat * 0.9), peak: 0.36, hold: false });
  return at + pass * p.passes;
}
function planRun(kind, o, opt) {  // kind: hear(주문 듣기) · listen(납품 듣기) · slice(썰기) · machine(기계 썰기). opt: { slow, first }
  const hearLike = kind === "hear" || kind === "listen", Tb = TbOf(o.loaf), beat = beatSec(bpmOf(o, opt.slow));
  const ns = hearLike ? (o.ask === "pick" ? [1] : o.ns) : sliceNs(o), R = ns.length, total = R * Tb;
  const p = { kind, Tb, ns, R, total, beat, passes: hearLike ? (o.ask === "pick" ? 1 : 2) : 0, countIn: hearLike || !opt.first ? 2 : 4, ev: [], auto: [], parts: [] };
  if (hearLike) { p.span = addListen(p, 0, 0, Tb, ns); p.ev.push({ t: p.span, type: "tick", strong: true }); }
  else {
    p.span = total;
    for (let k = 0; k <= Math.ceil(total - 1e-9); k++) p.ev.push({ t: k, type: "tick", strong: k === 0 });
    for (let q = 0; q < R; q++) p.ev.push({ t: q * Tb, type: "tone", midi: 79, dur: 0.16, peak: 0.3, hold: false });  // 덩이의 첫 음은 저절로 난다
    if (kind === "machine") for (let q = 0; q < R; q++) for (let k = 1; k < ns[q]; k++) { const c = q * Tb + (k * Tb) / ns[q]; p.auto.push(c); p.ev.push({ t: c, type: "knife" }); }
  }
  for (let k = 0; k < p.countIn; k++) p.ev.push({ t: k - p.countIn, type: "tick", strong: k === 0 });
  return p;
}
function planScene(rows, beat) {  // 발견 장면의 [들어 보기]: 줄마다 원래 소리 → 조각 리듬을 이어서
  const p = { kind: "scene", beat, passes: 2, countIn: 2, ev: [], auto: [], parts: [] };
  let at = 0;
  rows.forEach((r, i) => { at = addListen(p, i, at, TbOf(r.loaf), [r.n]); });
  p.span = at; p.ev.push({ t: at, type: "tick", strong: true });
  for (let k = 0; k < p.countIn; k++) p.ev.push({ t: k - p.countIn, type: "tick", strong: k === 0 });
  return p;
}

// ── 소리: 합성음만 쓴다. 모든 음을 오디오 클록에 한 번에 예약하고 묶음으로 취소한다(R5) ──
const clockStuck = (ctxNow, ctx0, elapsedMs) => elapsedMs > 1200 && ctxNow === ctx0;  // 시작 1.2초 뒤에도 소리 시계가 그대로면 화면 시계로 이어 간다
function makeStall(limitMs = 800) {  // 정지 감시: 지금 들리는 시각이 limitMs 넘게 그대로면 참
  let last = null, at = 0;
  return (now, ms) => { if (now !== last) { last = now; at = ms; return false; } return ms - at > limitMs; };
}
function makeGroup() {  // 예약한 음의 묶음. silence()가 전부 멈춘다. 아직 시작하지 않은 음은 소리 없이 끝난다
  const live = new Set();
  return {
    keep(node) { live.add(node); node.addEventListener("ended", () => live.delete(node)); },
    silence() { live.forEach((x) => { try { x.stop(); } catch (e) { /* 이미 끝남 */ } }); live.clear(); },
    size: () => live.size,
  };
}
function tone(A, midi, when, dur, peak, hold) {  // A: { ctx, out, noise, group }
  const o = A.ctx.createOscillator(), g = A.ctx.createGain();
  o.type = "triangle"; o.frequency.setValueAtTime(hz(midi), when);
  g.gain.setValueAtTime(0.0001, when); g.gain.linearRampToValueAtTime(peak, when + 0.008);
  if (hold) { g.gain.setValueAtTime(peak, when + Math.max(0.02, dur - 0.05)); g.gain.linearRampToValueAtTime(0.0001, when + dur); }
  else g.gain.setTargetAtTime(0.0001, when + 0.008, dur / 4);
  o.connect(g); g.connect(A.out); o.start(when); o.stop(when + dur + 0.05); A.group.keep(o);
}
function burst(A, when, dur, freq, q, peak) {  // 잡음: 메트로놈과 칼 소리(R6)
  const s = A.ctx.createBufferSource(), f = A.ctx.createBiquadFilter(), g = A.ctx.createGain();
  s.buffer = A.noise; f.type = "bandpass"; f.frequency.value = freq; f.Q.value = q;
  g.gain.setValueAtTime(peak, when); g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  s.connect(f); f.connect(g); g.connect(A.out); s.start(when); s.stop(when + dur + 0.02); A.group.keep(s);
}
const knifeSound = (A, when) => { burst(A, when, 0.04, 3200, 0.9, 0.5); tone(A, 79, when, 0.14, 0.34, false); };
function schedule(A, p, t0) {  // 계획 p를 t0(준비 박의 첫 박)부터 한 번에 예약한다
  for (const e of p.ev) {
    const when = t0 + (p.countIn + e.t) * p.beat;
    if (e.type === "tick") burst(A, when, 0.035, e.strong ? 2600 : 1700, 6, e.strong ? 0.7 : 0.4);
    else if (e.type === "knife") knifeSound(A, when);
    else tone(A, e.midi, when, e.dur, e.peak, e.hold);
  }
}

function audio() {  // 컨텍스트를 만들거나 깨운다. 쓸 수 없으면 null
  try {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      const out = ctx.createGain(); out.gain.value = masterGain(save.settings); out.connect(ctx.destination);
      const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate), d = noise.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      AUDIO = { ctx, out, noise, group: makeGroup() };
      ctx.addEventListener("statechange", () => {
        const on = soundOn(ctx.state);
        $("soundChip").toggleAttribute("hidden", on);
        $("hud").classList.toggle("nosound", !on);
        updateOrderAudio();
        if (!on && run && !run.perf) abortRun();
      });
    }
    if (ctx.state !== "running") { const p = ctx.resume(); if (p && p.catch) p.catch(() => {}); }
    return ctx;
  } catch (e) { return null; }
}
const lat = () => (ctx ? ctx.outputLatency || ctx.baseLatency || 0 : 0);
const clock = () => (run && run.perf ? performance.now() / 1000 : ctx.currentTime - lat());  // 지금 들리는 시각. 커서와 판정이 함께 쓴다(R7)

function syncAudioVolume() {
  if (AUDIO) AUDIO.out.gain.value = masterGain(save.settings);
}

function planCalib() {
  const span = 8;
  const ev = Array.from({ length: span }, (_, t) => ({ t, type: "tick", strong: t === 0 }));
  return { kind: "calib", beat: beatSec(60), countIn: 0, span, ev };
}
