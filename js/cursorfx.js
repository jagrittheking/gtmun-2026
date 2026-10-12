/* GTMUN'26 — cursor-reactive motion (magnetic buttons, card tilt, ambient glow).
   OFF BY DEFAULT. Flip FX_ENABLED to true to ship it, or test locally without
   editing this file by running in the browser console:
     localStorage.setItem('gtmunFx','on')   // then reload
     localStorage.removeItem('gtmunFx')     // back to default (off) */
(function () {
  "use strict";

  var FX_ENABLED = false;
  var testOverride = false;
  try { testOverride = window.localStorage && localStorage.getItem("gtmunFx") === "on"; } catch (e) {}
  if (!(FX_ENABLED || testOverride)) return;

  if (!document.body.classList.contains("cine")) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches)) return;

  document.documentElement.classList.add("fx-on");

  /* ---------- ambient cursor glow (soft gold light that trails the pointer) ---------- */
  var glow = document.createElement("div");
  glow.className = "cine-glow";
  glow.setAttribute("aria-hidden", "true");
  document.body.appendChild(glow);

  var gx = window.innerWidth / 2, gy = window.innerHeight / 2;
  var tx = gx, ty = gy;
  var glowVisible = false;

  window.addEventListener("mousemove", function (e) {
    tx = e.clientX; ty = e.clientY;
    if (!glowVisible) { glow.classList.add("show"); glowVisible = true; }
  }, { passive: true });

  window.addEventListener("mouseleave", function () {
    glow.classList.remove("show"); glowVisible = false;
  });

  function tick() {
    gx += (tx - gx) * 0.12;
    gy += (ty - gy) * 0.12;
    glow.style.transform = "translate(" + gx + "px," + gy + "px)";
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  /* ---------- magnetic buttons: nudge toward the cursor within their bounds ---------- */
  var magnets = document.querySelectorAll(".btn,.submit-btn,.m-btn,.listen,.go");
  Array.prototype.forEach.call(magnets, function (el) {
    var strength = 0.28, max = 10;
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width / 2);
      var dy = e.clientY - (r.top + r.height / 2);
      var mx = Math.max(-max, Math.min(max, dx * strength));
      var my = Math.max(-max, Math.min(max, dy * strength));
      el.style.transform = "translate(" + mx.toFixed(1) + "px," + my.toFixed(1) + "px)";
    }, { passive: true });
    el.addEventListener("mouseleave", function () {
      el.style.transform = "";
    });
  });

  /* ---------- card tilt: subtle 3D lean toward the cursor ---------- */
  var tiltCards = document.querySelectorAll(".ccard,.hub-opt,.qcard,.train-card,.eb-day-card,.wp-role");
  Array.prototype.forEach.call(tiltCards, function (el) {
    var maxTilt = 6, lift = "-6px";
    el.style.transformStyle = "preserve-3d";
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;   // 0..1
      var py = (e.clientY - r.top) / r.height;   // 0..1
      var rx = (0.5 - py) * maxTilt * 2;
      var ry = (px - 0.5) * maxTilt * 2;
      el.style.transform =
        "perspective(800px) translateY(" + lift + ") rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
    }, { passive: true });
    el.addEventListener("mouseleave", function () {
      el.style.transform = "";
    });
  });

  /* ---------- hero rings: gentle parallax drift opposite the cursor ---------- */
  var rings = document.querySelector(".cine-hero-rings");
  if (rings) {
    window.addEventListener("mousemove", function (e) {
      var nx = (e.clientX / window.innerWidth - 0.5) * -14;
      var ny = (e.clientY / window.innerHeight - 0.5) * -14;
      rings.style.transform = "translate(calc(-50% + " + nx.toFixed(1) + "px), calc(-52% + " + ny.toFixed(1) + "px))";
    }, { passive: true });
  }
})();
