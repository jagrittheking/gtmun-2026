/* INMUN 2026 — landing extras: welcome modal + stats count-up. */
(function () {
  "use strict";
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- welcome modal (shows once per session) ---- */
  var modal = document.getElementById("welcomeModal");
  if (modal) {
    var KEY = "inmun-welcome-2026";
    var seen = false; try { seen = sessionStorage.getItem(KEY) === "1"; } catch (e) {}
    var mark = function () { try { sessionStorage.setItem(KEY, "1"); } catch (e) {} };
    var close = function () { modal.classList.remove("show"); mark(); setTimeout(function () { modal.hidden = true; }, 280); };
    if (!seen) {
      setTimeout(function () {
        modal.hidden = false;
        requestAnimationFrame(function () { modal.classList.add("show"); });
      }, 650);
    }
    var x = document.getElementById("wmClose"); if (x) x.addEventListener("click", close);
    var d = document.getElementById("wmDismiss"); if (d) d.addEventListener("click", close);
    var j = document.getElementById("wmJoin"); if (j) j.addEventListener("click", mark);
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) close(); });
  }

  /* ---- photographs modal (opens on demand) ---- */
  var pmodal = document.getElementById("photosModal");
  var popen = document.getElementById("photosOpen");
  if (pmodal && popen) {
    var pclose = function () { pmodal.classList.remove("show"); setTimeout(function () { pmodal.hidden = true; }, 280); };
    popen.addEventListener("click", function () {
      pmodal.hidden = false;
      requestAnimationFrame(function () { pmodal.classList.add("show"); });
    });
    var px = document.getElementById("pmClose"); if (px) px.addEventListener("click", pclose);
    pmodal.addEventListener("click", function (e) { if (e.target === pmodal) pclose(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !pmodal.hidden) pclose(); });
  }
})();


