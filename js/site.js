/* INMUN 2026 — site-wide niceties: copy-to-clipboard on EB emails + toast. */
(function () {
  "use strict";
  var toast;
  function showToast(msg) {
    if (!toast) { toast = document.createElement("div"); toast.className = "cp-toast"; document.body.appendChild(toast); }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toast.classList.remove("show"); }, 1800);
  }
  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    return new Promise(function (res, rej) {
      try {
        var ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); res();
      } catch (e) { rej(e); }
    

