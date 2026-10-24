// The speech checker: a Whisper model that runs on this device, in a worker so the game stays responsive.
// The page sends {type:"load"} once, then {type:"run", id, audio} with 16 kHz mono audio for each word.
let asr = null;

async function load() {
  const T = await import("./vendor/transformers.min.js");
  T.env.allowLocalModels = false;
  T.env.useBrowserCache = true;
  T.env.backends.onnx.wasm.wasmPaths = new URL("./vendor/", self.location.href).href;
  T.env.backends.onnx.wasm.numThreads = 1;
  const files = {}; let shown = 0;
  asr = await T.pipeline("automatic-speech-recognition", "Xenova/whisper-base", {
    dtype: "q8", device: "wasm",
    progress_callback: p => {
      if (p.status !== "progress" || !p.total) return;
      files[p.file] = [p.loaded, p.total];
      const v = Object.values(files), got = v.reduce((a, x) => a + x[0], 0), all = v.reduce((a, x) => a + x[1], 0);
      // small files finish before the big ones start, so count against the whole download and only ever go up
      const pct = Math.min(99, Math.floor(got / Math.max(all, 78e6) * 100));
      if (pct > shown) { shown = pct; postMessage({ type: "progress", pct }); }
    },
  });
}

self.onmessage = async e => {
  const m = e.data;
  if (m.type === "load") {
    try { await load(); postMessage({ type: "ready" }); }
    catch (err) { postMessage({ type: "error", message: String(err && err.message || err) }); }
  } else if (m.type === "run") {
    try {
      const r = await asr(m.audio, { language: "german", task: "transcribe" });
      postMessage({ type: "result", id: m.id, text: (r.text || "").trim() });
    } catch (err) { postMessage({ type: "error", id: m.id, message: String(err && err.message || err) }); }
  }
};
