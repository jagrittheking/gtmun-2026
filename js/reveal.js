/* INMUN 2026 — gentle scroll-reveal (progressive enhancement).
   No-JS or reduced-motion users see everything immediately. */
(function () {
  "use strict";
  var rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (rm || !("IntersectionObserver" in window)) return;

  var els = document.querySelectorAll(
    ".ccard,.wp-card,.handbook-card,.section-head,.matcher-card,.train-card,.hub-opt," +
    ".hub-doc,.callout,figure,.eb-card,.ebp-mem,.getintouch,.qcard,.ws-sec,.ebp-blurb," +
    ".aw-committee,.aw-tier"
  );
  if (!els.length) return;

  // Mark items, then flip <html> into reveal mode so CSS hides them.
  for (var i = 0; i < els.length; i++) {
    if (!els[i].hasAttribute("data-rv")) els[i].setA

