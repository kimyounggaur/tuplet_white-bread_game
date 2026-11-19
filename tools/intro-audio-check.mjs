import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const engine = readFileSync(new URL("src/engine.js", root), "utf8");
const audio = readFileSync(new URL("src/audio.js", root), "utf8");
const intro = readFileSync(new URL("src/intro-audio.js", root), "utf8");
const sources = engine.slice(0, engine.indexOf("const FLOW"))
  + "\n" + audio.slice(audio.indexOf("function makeStall"), audio.indexOf("function audio()"))
  + "\n" + intro;

const nodes = new Map();
function element(id = "") {
  const classes = new Set();
  const listeners = new Map();
  const children = [];
  let key = id;
  const el = {
    get id() { return key; },
    set id(value) { key = value; nodes.set(key, el); },
    hidden: false, disabled: false, textContent: "", style: {}, children, attributes: {},
    classList: {
      add(...values) { values.forEach((value) => classes.add(value)); },
      remove(...values) { values.forEach((value) => classes.delete(value)); },
      toggle(value, enabled = !classes.has(value)) { if (enabled) classes.add(value); else classes.delete(value); },
      contains(value) { return classes.has(value); },
    },
    setAttribute(name, value) { this.attributes[name] = String(value); },
    addEventListener(name, callback) { listeners.set(name, callback); },
    fire(name) { listeners.get(name)?.(); },
    append(child) { children.push(child); },
    querySelectorAll(selector) { return selector === ".intro-piece" ? this.pieces || [] : []; },
    querySelector(selector) {
      if (selector === ".intro-row-heading") return this.heading;
      if (selector === ".intro-playhead") return this.children.find((child) => child.className === "intro-playhead") || this.loaf?.querySelector(selector) || null;
      return null;
    },
  };
  if (id) nodes.set(id, el);
  return el;
}
for (const id of ["introMute", "introAudioStatus", "introListen2", "introListen3"]) element(id);
for (const n of [2, 3]) {
  const row = element("introRow" + n), loaf = element("introLoaf" + n);
  row.pieces = Array.from({ length: n }, () => element());
  row.heading = element();
  row.loaf = loaf;
}
let nowMs = 0, nextFrame = 0, failGain = false;
const frames = new Map(), events = new Map(), windowEvents = new Map();
const oscillators = [], gains = [], resumed = [];
const param = () => ({ value: 0, setValueAtTime(value, when) { this.value = value; this.at = when; }, linearRampToValueAtTime() {}, setTargetAtTime() {} });
const context = {
  state: "running", currentTime: 0, outputLatency: 0, destination: {}, listeners: new Map(),
  createGain() {
    if (failGain) throw new Error("gain creation failed");
    const node = { gain: param(), connect() {}, disconnect() { this.disconnected = true; } };
    gains.push(node);
    return node;
  },
  createOscillator() {
    const listeners = new Map();
    const node = {
      frequency: param(), connect() {}, addEventListener(name, callback) { listeners.set(name, callback); },
      start(when) { this.startedAt = when; },
      stop(when) { if (when === undefined) { this.cancelled = true; listeners.get("ended")?.(); } else this.endsAt = when; },
    };
    oscillators.push(node);
    return node;
  },
  addEventListener(name, callback) { this.listeners.set(name, callback); },
  removeEventListener(name, callback) { if (this.listeners.get(name) === callback) this.listeners.delete(name); },
};
const sandbox = {
  S: { screen: "intro", intro: { stage: "compare", cuts: 2 } },
  save: { settings: { volume: 0.8, muted: false } },
  AUDIO: { noise: {}, group: { silence() { throw new Error("regular audio group cancelled"); } } },
  document: { hidden: false, createElement: () => element(), addEventListener(name, callback) { events.set(name, callback); } },
  window: { addEventListener(name, callback) { windowEvents.set(name, callback); } },
  $: (id) => nodes.get(id),
  introText: (id, text) => { nodes.get(id).textContent = text; },
  performance: { now: () => nowMs },
  audio: () => { if (context.state === "suspended") resumed.push(() => { context.state = "running"; }); return context; },
  masterGain: (settings) => settings.muted ? 0 : settings.volume,
  motionReduced: () => false,
  requestAnimationFrame(callback) { frames.set(++nextFrame, callback); return nextFrame; },
  cancelAnimationFrame(id) { frames.delete(id); },
};
vm.runInNewContext(sources + "\nthis.testAudio = {introPlan,playIntro,stopIntro,frameIntro,bindIntroAudio,introPlaybackState};", sandbox);
const api = sandbox.testAudio;
function step(seconds) {
  nowMs += seconds * 1000;
  context.currentTime += seconds;
  const callbacks = [...frames.values()]; frames.clear();
  callbacks.forEach((callback) => callback());
}
api.bindIntroAudio();
api.playIntro(2);
assert.deepEqual(oscillators.map((o) => o.startedAt), [0.04,0.54]);
assert.ok(oscillators.every((o) => Math.abs(o.frequency.value - 783.9908719634985) < 1e-8));
assert.equal(api.introPlaybackState().scheduled,2);
assert.equal(api.introPlaybackState().groupSize,2);
const first = oscillators.slice();
api.playIntro(3);
assert.ok(first.every((o) => o.cancelled));
assert.deepEqual(oscillators.slice(2).map((o)=>o.startedAt),[0.04,0.04+1/3,0.04+2/3]);
assert.equal(api.introPlaybackState().groupSize,3);
step(1.05);
assert.equal(api.introPlaybackState().active,false);
assert.equal(api.introPlaybackState().groupSize,0);
assert.ok(nodes.get("introRow3").classList.contains("intro-finished"));
assert.equal(frames.size,0);
console.log("AU-INTRO-SCHEDULE PASS · actual low-level scheduler, 2/3 exact starts, common end, replacement cancels old group");

api.playIntro(2);
sandbox.document.hidden = true;
events.get("visibilitychange")();
assert.equal(api.introPlaybackState().active,false);
assert.equal(api.introPlaybackState().groupSize,0);
assert.equal(frames.size,0);
sandbox.document.hidden = false;
api.playIntro(3);
windowEvents.get("pagehide")();
assert.equal(api.introPlaybackState().active,false);
assert.equal(frames.size,0);
console.log("AU-INTRO-CANCEL PASS · visibility and pagehide cancel sources, callbacks, gain and listeners");

context.state = "suspended";
const beforeSuspended = oscillators.length;
api.playIntro(2);
assert.equal(api.introPlaybackState().clock,"visual");
assert.equal(api.introPlaybackState().scheduled,0);
api.stopIntro();
resumed.forEach((resolve)=>resolve());
step(0.5);
assert.equal(api.introPlaybackState().active,false);
assert.equal(oscillators.length,beforeSuspended);
assert.equal(frames.size,0);
console.log("AU-INTRO-STALE PASS · delayed audio resume cannot resurrect cancelled intro playback");

failGain = true;
api.playIntro(3);
assert.equal(api.introPlaybackState().clock,"visual");
assert.equal(api.introPlaybackState().scheduled,0);
assert.equal(api.introPlaybackState().groupSize,0);
step(1.1);
assert.equal(api.introPlaybackState().active,false);
console.log("AU-INTRO-FALLBACK PASS · gain failure uses visual timeline and finishes");
console.log("4 intro runtime groups passed with simulated context and clock. This does not verify physical-device audio.");
