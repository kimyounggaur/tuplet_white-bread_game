import { readFileSync, writeFileSync } from "node:fs";

const base = new URL("../", import.meta.url);
const read = (file) => readFileSync(new URL("src/" + file, base), "utf8").trimEnd();
const engine = read("engine.js");
const label = engine.indexOf("const labelOf");
const judge = engine.indexOf("function judge");
const state = engine.indexOf("const FLOW");
if (!(0 < label && label < judge && judge < state)) throw new Error("Engine sections could not be located.");

const sections = [
  ["THEORY", engine.slice(0, label)],
  ["LABEL", engine.slice(label, judge)],
  ["JUDGE", engine.slice(judge, state)],
  ["ORDERS", read("orders.js")],
  ["STATE", read("state.js"), engine.slice(state), read("coach.js")],
  ["VIEW", read("board.js"), read("shift-paint.js"), read("slice.js"), read("render.js")],
  ["AUDIO", read("audio-state.js"), read("audio.js")],
  ["RUN", read("run.js")],
  ["STORAGE", read("storage.js")],
  ["SCREENS", read("actions.js"), read("screens.js"), read("calibration.js"), read("extras.js"), read("intro.js"), read("intro-audio.js")],
  ["TESTS", ...["runner", "engine", "orders", "board", "audio", "storage"].map((name) => read(name + "-tests.js"))],
  ["BOOT", ...["measure.js", "audio-boot.js", "slice-boot.js", "bindings.js", "boot.js"].map(read)],
];
const code = sections.map(([name, ...parts], i) => "// == " + (i + 1) + " " + name + " ==\n" + parts.join("\n\n")).join("\n\n");
const main = '<script id="main">\n(() => {\n"use strict";\nconst $ = (id) => document.getElementById(id);\n\n' + code + '\n\nboot();\n})();\n</script>';
const html = read("shell.html")
  .replace("<!-- STYLE -->", () => "<style>\n" + read("style.css") + "\n" + read("extras.css") + "\n" + read("intro.css") + "\n" + read("intro-audio.css") + "\n</style>")
  .replace("<!-- ART -->", () => read("art.html"))
  .replace("<!-- INTRO SCREEN -->", () => read("intro.html"))
  .replace("<!-- EXTRAS SCREENS -->", () => read("extras-screens.html"))
  .replace("<!-- EXTRAS ORDER -->", () => read("extras-order.html"))
  .replace("<!-- EXTRAS CONTROLS -->", () => read("extras-controls.html"))
  .replace("<!-- MAIN -->", () => main);
writeFileSync(new URL("index.html", base), html + "\n");
console.log("index.html", Buffer.byteLength(html, "utf8"), "bytes");
