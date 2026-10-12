/* INMUN 2026 — rotating motivational quote (no live countdown: it relied
   on each visitor's own device clock, which isn't reliable on shared/lab
   screens). The index is derived from wall-clock time (5-minute buckets),
   so every visitor sees the same quote at the same moment without needing
   to coordinate, and it advances on its own every 5 minutes. */
(function () {
  "use strict";

  var QUOTES = [
    { q: "The future belongs to those who believe in the beauty of their dreams.", a: "Eleanor Roosevelt" },
    { q: "It always seems impossible until it's done.", a: "Nelson Mandela" },
    { q: "Never, never, never give up.", a: "Winston Churchill" },
    { q: "Ask not what your country can do for you — ask what you can do for your country.", a: "John F. Kennedy" },
    { q: "The best way to find yourself is to lose yourself in the service of others.", a: "Mahatma Gandhi" },
    { q: "My humanity is bound up in yours, for we can only be human together.", a: "Desmond Tutu" },
    { q: "When the whole world is silent, even one voice becomes powerful.", a: "Malala Yousafzai" },
    { q: "If they don't give you a seat at the table, bring a folding chair.", a: "Shirley Chisholm" },
    { q: "Darkness cannot drive out darkness; only light can do that.", a: "Martin Luther King Jr." },
    { q: "Do what you can, with what you have, where you are.", a: "Theodore Roosevelt" },
    { q: "By failing to prepare, you are preparing to fail.", a: "Benjamin Franklin" },
    { q: "A dream doesn't become reality through magic; it takes sweat, determination and hard work.", a: "Colin Powell" },
    { q: "You cannot shake hands with a clenched fist.", a: "Indira Gandhi" },
    { q: "Diplomacy is the art of letting someone else have your way.", a: "Daniele Varè" },
    { q: "The measure of intelligence is the ability to change.", a: "Albert Einstein" },
    { q: "Success is the sum of small efforts, repeated day in and day out.", a: "Robert Collier" },
    { q: "Hard work beats talent when talent doesn't work hard.", a: "Tim Notke" },
    { q: "Well done is better than well said.", a: "Benjamin Franklin" },
    { q: "It does not matter how slowly you go as long as you do not stop.", a: "Confucius" },
    { q: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", a: "Aristotle" },
    { q: "The best time to plant a tree was 20 years ago. The second best time is now.", a: "Chinese Proverb" },
    { q: "Peace is not absence of conflict, it is the ability to handle conflict by peaceful means.", a: "Ronald Reagan" },
    { q: "Nothing in life is to be feared, it is only to be understood.", a: "Marie Curie" },
    { q: "Service to others is the rent you pay for your room here on Earth.", a: "Muhammad Ali" },
    { q: "A journey of a thousand miles begins with a single step.", a: "Lao Tzu" },
    { q: "The function of leadership is to produce more leaders, not more followers.", a: "Ralph Nader" },
    { q: "Real change, enduring change, happens one step at a time.", a: "Ruth Bader Ginsburg" },
    { q: "Speak your mind even if your voice shakes.", a: "Maggie Kuhn" },
    { q: "The arc of the moral universe is long, but it bends toward justice.", a: "Theodore Parker" },
    { q: "Every great dream begins with a dreamer.", a: "Harriet Tubman" }
  ];
  var QUOTE_MS = 5 * 60 * 1000;
  function quoteIndex() { return Math.floor(Date.now() / QUOTE_MS) % QUOTES.length; }
  function renderQuote() {
    var el = document.getElementById("cd-quote");
    if (!el) return;
    var item = QUOTES[quoteIndex()];
    el.querySelector(".cd-quote-text").textContent = "“" + item.q + "”";
    el.querySelector(".cd-quote-author").textContent = "— " + item.a;
  }
  if (!document.getElementById("cd-quote")) return;
  renderQuote();
  setInterval(renderQuote, 30 * 1000); // cheap re-check; only visibly changes every 5 min
})();


