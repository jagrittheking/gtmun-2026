/* GTMUN'26 — guide reading aids + read-aloud (Listen).
   Defensive: every feature guards for missing elements / APIs. */
(function () {
  "use strict";
  var guide = document.querySelector(".guide");
  var pb = document.getElementById("progress");
  var bt = document.getElementById("backtop");
  var resumeChip = document.getElementById("resumechip");
  var links = Array.prototype.slice.call(document.querySelectorAll(".sidenav a"));
  var heads = links
    .map(function (a) { var h = a.getAttribute("href"); return h && h[0] === "#" ? document.getElementById(h.slice(1)) : null; })
    .filter(Boolean);
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var key = "gtmun-read:" + location.pathname.split("/").pop();

  /* ---- reading time ---- */
  var rt = document.getElementById("readtime");
  if (rt && guide) {
    var words = (guide.innerText || "").trim().split(/\s+/).length;
    rt.textContent = "~" + Math.max(1, Math.round(words / 200)) + " min";
  }

  /* ---- progress bar + scroll-spy + back-to-top ---- */
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var sc = max > 0 ? h.scrollTop / max : 0;
    if (pb) pb.style.width = (sc * 100) + "%";
    if (bt) bt.classList.toggle("show", h.scrollTop > 500);
    if (heads.length) {
      var idx = 0;
      heads.forEach(function (el, i) { if (el.getBoundingClientRect().top < 140) idx = i; });
      links.forEach(function (a, i) { a.classList.toggle("active", i === idx); });
    }
    try { if (max > 0) localStorage.setItem(key, String(sc)); } catch (e) {}
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (bt) bt.onclick = function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); };

  /* ---- resume where you left off ---- */
  try {
    var saved = parseFloat(localStorage.getItem(key));
    if (resumeChip && saved > 0.05 && saved < 0.95) {
      resumeChip.classList.add("show");
      resumeChip.onclick = function () {
        var h = document.documentElement;
        window.scrollTo({ top: saved * (h.scrollHeight - h.clientHeight), behavior: reduce ? "auto" : "smooth" });
        resumeChip.classList.remove("show");
      };
      setTimeout(function () { resumeChip.classList.remove("show"); }, 9000);
    }
  } catch (e) {}

  /* ---- Listen (Web Speech API) ---- */
  var listenBtn = document.getElementById("listenBtn");
  var bar = document.getElementById("listenbar");
  var synth = window.speechSynthesis;
  if (!listenBtn || !bar || !synth) { if (listenBtn) listenBtn.style.display = "none"; return; }

  var blocks = guide ? Array.prototype.slice.call(guide.querySelectorAll("h2, h3, p, li"))
    .filter(function (el) { return (el.textContent || "").trim().length > 1; }) : [];
  var label = document.getElementById("listenLabel");
  var lbLabel = document.getElementById("lb-label");
  var playBtn = document.getElementById("lb-play");
  var stopBtn = document.getElementById("lb-stop");
  var rateSel = document.getElementById("lb-rate");
  var idx = 0, playing = false, rate = 1, cur = null;

  var ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  var ICON_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';

  function setUI() {
    bar.classList.toggle("show", playing || idx > 0);
    if (label) label.textContent = playing ? "Pause" : "Listen";
    if (listenBtn) listenBtn.setAttribute("aria-pressed", playing ? "true" : "false");
    if (playBtn) playBtn.innerHTML = playing ? ICON_PAUSE : ICON_PLAY;
    if (lbLabel) lbLabel.textContent = playing ? "Reading…" : "Paused";
  }
  function clearHL() { if (cur) cur.classList.remove("spk-active"); cur = null; }
  function speakFrom(i) {
    synth.cancel();
    idx = i;
    if (idx >= blocks.length) { stop(); return; }
    var el = blocks[idx];
    var u = new SpeechSynthesisUtterance(el.textContent.trim());
    u.rate = rate; u.lang = "en-US";
    u.onstart = function () {
      clearHL(); cur = el; el.classList.add("spk-active");
      if (!reduce) el.scrollIntoView({ block: "center", behavior: "smooth" });
    };
    u.onend = function () { if (playing) speakFrom(idx + 1); };
    synth.speak(u);
  }
  function play() { playing = true; setUI(); if (synth.paused) synth.resume(); else speakFrom(idx); }
  function pause() { playing = false; setUI(); synth.pause(); }
  function stop() { playing = false; idx = 0; synth.cancel(); clearHL(); bar.classList.remove("show"); if (label) label.textContent = "Listen"; if (listenBtn) listenBtn.setAttribute("aria-pressed", "false"); }

  listenBtn.onclick = function () { playing ? pause() : play(); };
  if (playBtn) playBtn.onclick = function () { playing ? pause() : play(); };
  if (stopBtn) stopBtn.onclick = stop;
  if (rateSel) rateSel.onchange = function () { rate = parseFloat(rateSel.value) || 1; if (playing) speakFrom(idx); };
  window.addEventListener("beforeunload", function () { synth.cancel(); });
})();
