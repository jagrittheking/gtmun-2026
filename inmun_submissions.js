/* INMUN 2026 — live Recognition Sheet, read straight from six Google
   Sheets per committee (public, read-only, no API key needed):

   1. The OLD shared document-submissions tracker (one sheet for all 9
      committees, ONE "Type of Document" + "Upload your document here"
      column pair per committee — see indexDocColumns()/computeDocTally()
      below). As of 2026-08-26 this is read for Position Paper counts
      ONLY — Position Paper stays exclusively sourced from here (and from
      the matching old "Read Position Papers" Drive folder on each
      committee page), since that's the mature, already-organized
      pipeline. Any Working Paper / Press Release rows in this sheet are
      ignored.
   2. Each committee's OWN new "<Committee> - Documents (Responses)"
      sheet (indexNewDocColumns()/computeNewDocTally()) — added
      2026-08-26 when every committee got its own Documents form. Read
      for Working Paper / Press Release counts ONLY; any Position Paper
      row here is ignored too (see #1 — don't double-source PP).
   3. Each committee's own "Substantive Chit" response sheet — counts by
      "From".
   4. Each committee's own "Via EB Chit" response sheet ("POI Chits" on
      this page) — counts by "From".
   5. Each committee's own Marking-sheet file — TWO of its tabs, fetched
      by name (Google's gviz endpoint defaults to whichever tab is first
      in the file, so every fetch here explicitly targets a tab with
      &sheet=): the "Verbatim" log (S. No., Type, Portfolio, Verbatim
      text, Notes — one row per speech/POI/motion/POO event) and the
      "Recognition Sheet" tab (one row per country, with Motion / Speech
      / POO (Ruled) / POI already pre-tallied). The "Marking" tab (the
      grading rubric) is never read for this page — marking and
      recognition are unrelated concepts. Whichever of the two sources
      has the higher count for a given country/type wins — see
      mergeVerbatimHigher().

   All six fetches run through a small 2-at-a-time pool every poll (see
   fetchAll()) rather than all firing at once — cuts peak bandwidth
   contention on a slow/shared venue network without going all the way to
   one-at-a-time, which was reliable but slow to finish. The last good
   result for each view is also cached in localStorage and rendered
   instantly on page load (see loadCache()/saveCache()) while the network
   fetch runs in the background — so a repeat visit never sits on
   "Loading…" waiting for round-trips it's already seen the answer to. If
   a Marking file for a committee isn't shared yet, or a tab doesn't exist
   under the expected name, its columns just show 0 rather than breaking
   the page — same graceful-degradation approach as everywhere else on
   this site.

   World Press works the same way but simpler: its old shared-sheet Task
   columns are retired entirely in favour of its 3 new per-role sheets
   (Journalists / Caricaturists / Photographers) — see WP_DOC_SHEETS and
   fetchWorldPressAll() below. Substantive chits and other non-Position-
   Paper documents are deliberately NOT exposed as browsable Drive links
   anywhere on the site — this page only ever shows counts. */
(function () {
  "use strict";

  var SHEET_ID = "1-m4G-ogUIXH-T9BgYA8-60tydkaw0gP0t0BRvQiWAq0";

  /* INMUN 2026 is over (as of 2026-09-01). Live polling is turned off —
     each view still does one fetch per page load (so the numbers stay
     reasonably current for the last stretch of grading), but nothing
     auto-refreshes on a timer anymore. One more manual pull is planned
     for 2026-09-03 23:30 IST to catch final grading, after which the
     site gets frozen to static numbers for good — see admin notes. */
  function getPollMs() {
    return null;
  }

  /* Fire an immediate refresh the moment a backgrounded tab comes back to
     the foreground, so the getPollMs() backoff above never leaves the
     page looking stale for up to 5 minutes after a delegate switches back. */
  function onVisible(cycle) {
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) cycle();
    });
  }

  /* localStorage cache of the last good render per view — instant paint
     on repeat visits instead of waiting out the network on a slow link.
     Wrapped in try/catch throughout: private browsing, disabled site
     data, or a full quota can make localStorage throw, and this must
     never be the reason the page fails to load. */
  function loadCache(name) {
    try {
      var raw = localStorage.getItem("inmun_tally_" + name);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed.updatedAt !== "number") return null;
      return parsed;
    } catch (e) { return null; }
  }
  function saveCache(name, data, updatedAt) {
    try {
      localStorage.setItem("inmun_tally_" + name, JSON.stringify({ data: data, updatedAt: updatedAt.getTime() }));
    } catch (e) { /* ignore — caching is a nicety, not a requirement */ }
  }

  var PAIR_ORDER = ["icj", "disec", "cd", "ai-impact-summit", "inc", "wef", "g77", "interpol", "brics"];

  var COMMITTEES = {
    "icj": "International Court of Justice",
    "disec": "UN General Assembly DISEC",
    "cd": "Conference on Disarmament",
    "ai-impact-summit": "AI Impact Summit",
    "inc": "Intergovernmental Negotiating Committee",
    "wef": "World Economic Forum",
    "g77": "Group of 77",
    "interpol": "International Criminal Police Organization",
    "brics": "BRICS"
  };

  /* World Press has no country roster — submitters write "WP" in the
     Country field and are tracked by Name instead (Journalists /
     Caricaturists / Photographers all share the same 3 "Task Number" +
     "Upload your document here" column pairs on the doc-submissions
     sheet). It's handled as its own simple path throughout this file
     rather than folded into COMMITTEES, since that map is also read by
     chits.js/hub pages that all assume a real country roster + chit
     sheets + marking file, none of which World Press has. */
  var WORLD_PRESS_SLUG = "world-press";
  var WORLD_PRESS_NAME = "World Press";

  var DOC_TYPES = ["Position Paper", "Press Release", "Working Paper"];
  var VERBATIM_TYPES = ["Speech", "POI", "Motions", "POO (Ruled)", "Yields"];
  var ALL_TALLY_TYPES = DOC_TYPES.concat(VERBATIM_TYPES, ["Substantive Chit", "POI Chits"]);

  /* Substantive Chit / Via EB Chit ("POI Chits" here) response sheets,
     and each committee's Marking-sheet file — same IDs as chits.js /
     _create-live-tracker.gs. */
  var CHIT_SHEETS = {
    "icj": { subst: "15wQjkbZDrmGGbWruWoDGUKwkvrmj3oHZqsURo99W2x4", viaEb: "1vETYsQA0-GRsPjfhcAQMY0x58osqucdE2O8FgeNh86s" },
    "disec": { subst: "1MjK3JH9uaKvpIa8nWGBwLLaSn5MPPRahX3xPBoSSlps", viaEb: "1OoHt6QTgCrhFfY3D--vyuA2nFDMTeCjUYkFx2qCywc0" },
    "cd": { subst: "1X-LVd7Cf3GdIVbwJrO_lHI7_ssBLZnJhx3riV_cucHc", viaEb: "1zqUta7JYvBOw9got0AVeK_ITrCUwIxMpeC_YjqXibdE" },
    "ai-impact-summit": { subst: "1Rtk1ZKB_cSiNnsADjilVOjPYKpUa22BRRJr_GBaPuDw", viaEb: "1MFwbCcVOtKKDsjBDoxbPNcBxcZnEkgrf14qUub_CvuU" },
    "inc": { subst: "1gNjgAue2lzGDtV2uMT7afX6DXj15i3JyvzUSyW_Xk9A", viaEb: "1so6tsjgb3S39_GX_scknwIcyhmv2wRibWV6McfwwUfs" },
    "wef": { subst: "1DUV8_k3WJpalkTLqcJ8nsBM_iIAp5BwSl_3VOUBtyk0", viaEb: "1yqcaM18rxBs0LKvmtF6xok0-mdyc3Xk5VM4bdOhXY6Y" },
    "g77": { subst: "1IzTcKxMAGFjd7MaiKp7TYC1uVhxrImtUJWcVRBzx1Ss", viaEb: "1r-TCsWrt-Zs9IGOZ02sFK0P4iO3dy-08h0w7xeUc8-4" },
    "interpol": { subst: "1sJiYJWAYP4NVKOGahTPiN5OAXj0KHcawOd0z7ZY9ijg", viaEb: "1bo88S7MZUvShWWGJOw_RrAB68kcrYPWGmv1-kqLrYkw" },
    "brics": { subst: "1YKQ79XF_yLY2z4RAoAaq4K0c2u_DBp3Q2RbYt9JFRs0", viaEb: "1SpRhdZ0LNsPf023zlCydt1L-jy4Iq9_xQDLcbkaPd2Q" }
  };
  /* Converted to native Google Sheets on 2026-08-19 (were uploaded .xlsx
     before that — gviz can't read those). These are the new file IDs. */
  var MARKING_FILES = {
    "icj": "1Q9qyPdtku39Ny1ap775IrhQ16rNM0_D_phlJzaTOhb0",
    "disec": "1aj3mGcqSbUsmEuZgGwxZCNawpVzg1Q0kRS5GQQIqS4A",
    "cd": "11i0Hm4CtYwNRkXOBDXOgBKxpNbbQLHiNo5aBXQJ3G4Y",
    "ai-impact-summit": "10xd_mqFGSBtaSQAR8RNNBCFUkn_v_9T2YaUt_P0fYLM",
    "inc": "1jOI_lPXTRrMsiE9CvS91C_QFquciQNHNlUYUGG-2ucM",
    "wef": "1zgMP19JGXneY-c_AnpYbVqCO-P-KOEeOZDH3b5agf4M",
    "g77": "1EVKNFklWoMl-H5ZAbDQmOR2d4bpJMOTrCtTREMLPhgo",
    "interpol": "1oep4_4dQ13pXWJPq_MIbL6M6ozJcOnuk-1Q4TxLJePg",
    "brics": "1Gif_V1d9kzL_AK5S1HQyW69fw8E6oz6ZSs5bC-5kkKY"
  };
  /* Each committee's OWN "<Committee> - Documents (Responses)" sheet —
     added 2026-08-26. Read for Working Paper / Press Release counts only
     (see file-header comment above for why Position Paper stays on the
     old shared SHEET_ID instead). */
  var NEW_DOC_SHEETS = {
    "icj": "1SBQv53qeh-Z_nRto6NXZOe6kKooz8yZjOAuybJoyHGU",
    "disec": "1j8QACIJLPzg9y8cxKsZ8-S5Lrb3AwPoQvWKkJA3ASj0",
    "cd": "1KRZD0Bzej0TaER07o1z3Ajrxds6ci6IDY2hwpmpjTUs",
    "ai-impact-summit": "1IregZHxJ8BcQflejeKjHHnTlKA4PI0MlGDjm0Tb5yAc",
    "inc": "1U6Sa-u3Vnr6NMTBMbms4wTa8h135zn51uosw4tlSBbc",
    "wef": "1KFHkBivetZjKUMWV2qA4cubwtqm-f0K4RVy7Z26zUE0",
    "g77": "1k4DqoyXDPbIokOg1NvTb9NE7dTWqI2CJ-cm73KCEpBc",
    "interpol": "1mgPXSOA2nS-JorvQuv_Xi0c7brqKFfukshELZAWt40c",
    "brics": "11LLpq-5x7CoHcXjq2RIDdeg_RqUEzgTww3FKD43brj4"
  };
  /* World Press's 3 new per-role Documents-response sheets — replace the
     old shared SHEET_ID's 3 "Task Number" column pairs entirely (not
     merged with it, unlike the committees above — World Press never had
     a Position Paper concept to preserve). Keyed by role name only for
     readability; fetchWorldPressAll() below sums across all three. */
  var WP_DOC_SHEETS = {
    "Journalists": "14R9wCsmmKklOnmz9YmLAVWqUmnsmdJilU6iDmf7laPs",
    "Caricaturists": "13GE9O7QABRPvukn8_rvXOiWQ2n_ML2ZTK1P1VqUVtQY",
    "Photographers": "11JNph-CDxOiUko7tQXJNNkFOs872nv_syJcXx7HnZxw"
  };

  /* common demonym/adjective -> country short-name, ported from chits.js —
     only the country noun (matching chit-countries.js) ever gets used as
     a key; "Swiss" is not a country, "Switzerland" is. */
  var DEMONYMS = {
    "swiss": "switzerland", "french": "france", "german": "germany", "dutch": "netherlands",
    "american": "united states", "us": "united states", "usa": "united states",
    "uk": "united kingdom", "british": "united kingdom", "english": "united kingdom",
    "chinese": "china", "russian": "russia", "indian": "india", "pakistani": "pakistan",
    "japanese": "japan", "brazilian": "brazil", "mexican": "mexico", "canadian": "canada",
    "australian": "australia", "egyptian": "egypt", "turkish": "turkiye", "iranian": "iran",
    "israeli": "israel", "saudi": "saudi arabia", "emirati": "united arab emirates",
    "spanish": "spain", "italian": "italy", "irish": "ireland", "polish": "poland",
    "greek": "greece", "portuguese": "portugal", "swedish": "sweden", "norwegian": "norway",
    "danish": "denmark", "finnish": "finland", "belgian": "belgium", "austrian": "austria",
    "thai": "thailand", "vietnamese": "vietnam", "indonesian": "indonesia",
    "malaysian": "malaysia", "nigerian": "nigeria", "kenyan": "kenya",
    "southafrican": "south africa", "argentine": "argentina", "argentinian": "argentina",
    "colombian": "colombia", "chilean": "chile", "peruvian": "peru", "venezuelan": "venezuela",
    "cuban": "cuba", "ukrainian": "ukraine", "belarusian": "belarus", "qatari": "qatar",
    "kuwaiti": "kuwait", "jordanian": "jordan", "lebanese": "lebanon", "iraqi": "iraq",
    "moroccan": "morocco", "algerian": "algeria", "tunisian": "tunisia", "libyan": "libya",
    "ethiopian": "ethiopia", "ghanaian": "ghana", "ugandan": "uganda", "tanzanian": "tanzania",
    "rwandan": "rwanda", "sudanese": "sudan", "zambian": "zambia",
    "uae": "united arab emirates", "nz": "new zealand", "north korea": "dprk",
    "south korea": "rok", "turkey": "turkiye", "licthinstine": "liechtenstein",
    "united arab nations": "united arab emirates", "democratic republic of congo": "dr congo"
  };

  var root = document.getElementById("submroot");

  function norm(s) {
    return String(s || "")
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  /* Known "<political-entity-type> of <name>" leading phrases, stripped
     only as an extra fallback comparison inside matchCountry() — never in
     place of the exact/substring tiers, only to give the typo
     (edit-distance) tier a fair, length-appropriate comparison when a
     typo sits inside a long official name (e.g. "Federal Democratic
     Republic of Ehtiopia" for Ethiopia) that would otherwise blow
     straight past a threshold scaled to the *whole* input's length.
     Anchored at the start of the string and matched as full phrases, so
     this can't collide with a real country whose own name starts with
     one of these words — "United Kingdom"/"United States"/"United Arab
     Emirates" all start with "united", never with any of these. */
  var STATE_PREFIX_RE = /^(democratic people s republic of |federal democratic republic of |plurinational state of |co ?operative republic of |independent state of |islamic republic of |democratic republic of |federal republic of |republic of |kingdom of |state of |sultanate of |principality of |commonwealth of |grand duchy of |emirate of |duchy of )/;
  function stripStatePrefix(s) {
    return s.replace(STATE_PREFIX_RE, "").trim();
  }

  /* Plain Levenshtein edit distance (insert/delete/substitute, each cost
     1) — the last-resort fallback in matchCountry() below, for spelling
     typos that are too mangled for a substring check to catch (e.g.
     "Switzerlnd", "Camroon", "Morroco"). Iterative two-row DP, no
     recursion — fine for country-name-length strings. */
  function levenshtein(a, b) {
    var m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    var prev = new Array(n + 1), curr = new Array(n + 1);
    for (var j = 0; j <= n; j++) prev[j] = j;
    for (var i = 1; i <= m; i++) {
      curr[0] = i;
      for (j = 1; j <= n; j++) {
        var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      }
      var tmp = prev; prev = curr; curr = tmp;
    }
    return prev[n];
  }

  /* Best-effort match of free-typed text against the real country list for
     this committee (chit-countries.js). Returns the canonical short name,
     or null if nothing plausible matched — callers skip unmatched rows
     rather than inventing a row for garbage input.

     Tiers, in order: exact -> demonym/abbreviation -> substring -> typo
     (edit distance). The typo tier only fires if it lands on exactly one
     roster entry within a length-scaled threshold — a tie between two
     different countries, or a distance over threshold, returns null
     rather than guessing, same "don't invent a match" policy as always. */
  function matchCountry(text, slug) {
    var n = norm(text);
    if (!n) return null;
    var list = (window.INMUN_COMMITTEE_COUNTRIES && window.INMUN_COMMITTEE_COUNTRIES[slug]) || [];
    var i, pair, shortN, officialN;
    for (i = 0; i < list.length; i++) {
      pair = list[i]; shortN = norm(pair[0]); officialN = norm(pair[1]);
      if (n === shortN || n === officialN) return pair[0];
    }
    if (DEMONYMS[n]) {
      var target = DEMONYMS[n];
      for (i = 0; i < list.length; i++) {
        pair = list[i];
        if (norm(pair[0]) === target) return pair[0];
      }
    }
    if (n.length >= 3) {
      for (i = 0; i < list.length; i++) {
        pair = list[i]; shortN = norm(pair[0]); officialN = norm(pair[1]);
        if (shortN.indexOf(n) > -1 || n.indexOf(shortN) > -1 || officialN.indexOf(n) > -1) return pair[0];
      }
    }
    if (n.length >= 6) {
      // Below 6 chars, real distinct countries can be only 1 edit apart
      // (Iran/Iraq, Chad/China) — fuzzy matching that short risks silently
      // attaching one real country's submission to a different real
      // country, which is worse than just dropping it unmatched.
      var threshold = Math.min(3, Math.max(1, Math.ceil(n.length * 0.25)));
      var bestMatch = null, bestDist = Infinity, tie = false;
      for (i = 0; i < list.length; i++) {
        pair = list[i]; shortN = norm(pair[0]); officialN = norm(pair[1]);
        var d = Math.min(levenshtein(n, shortN), levenshtein(n, officialN));
        if (d > threshold) continue;
        if (d < bestDist) { bestDist = d; bestMatch = pair[0]; tie = false; }
        else if (d === bestDist && pair[0] !== bestMatch) { tie = true; }
      }
      if (bestMatch && !tie) return bestMatch;
    }
    // Last-resort: a typo sitting inside a long "<boilerplate> of <name>"
    // official name defeats the tier above, because its threshold is
    // scaled to the FULL input length — comparing "federal democratic
    // republic of ehtiopia" against "ethiopia" directly is nowhere near
    // threshold even though the actual typo is a single transposition.
    // Strip a known boilerplate prefix from both sides and retry
    // substring + typo matching on just the core name.
    var nCore = stripStatePrefix(n);
    if (nCore !== n && nCore.length >= 3) {
      for (i = 0; i < list.length; i++) {
        pair = list[i]; shortN = norm(pair[0]); officialN = stripStatePrefix(norm(pair[1]));
        if (shortN.indexOf(nCore) > -1 || nCore.indexOf(shortN) > -1 || officialN.indexOf(nCore) > -1) return pair[0];
      }
      if (nCore.length >= 4) {
        var coreThreshold = Math.min(3, Math.max(1, Math.ceil(nCore.length * 0.25)));
        var coreBest = null, coreBestDist = Infinity, coreTie = false;
        for (i = 0; i < list.length; i++) {
          pair = list[i]; shortN = norm(pair[0]); officialN = stripStatePrefix(norm(pair[1]));
          var cd = Math.min(levenshtein(nCore, shortN), levenshtein(nCore, officialN));
          if (cd > coreThreshold) continue;
          if (cd < coreBestDist) { coreBestDist = cd; coreBest = pair[0]; coreTie = false; }
          else if (cd === coreBestDist && pair[0] !== coreBest) { coreTie = true; }
        }
        if (coreBest && !coreTie) return coreBest;
      }
    }
    return null;
  }

  /* Some free-typed Country fields legitimately name more than one
     country in a single response — seen on ICJ, where one submission can
     be jointly filed "for" several judges' countries, e.g.
     "South Africa,Iran and Saudi arabia (judges)". matchCountry() alone
     requires the WHOLE string to resolve to one country, so a compound
     entry like that fails every tier and the row gets silently dropped,
     crediting none of the countries actually named. matchCountries()
     handles this by splitting on commas/"and"/"&" whenever the text
     *looks* compound (contains one of those delimiters outside any
     parenthetical note) and matching each piece separately.

     Only engaging the split when a delimiter is actually present matters
     here: matchCountry() on the whole string can't be trusted to fail
     cleanly on a compound string first — the substring tier happily
     matches just the leading country name as a prefix of the full
     string (e.g. "South Africa" is a literal prefix of "South
     Africa,Iran and..."), which would silently swallow the rest. Text
     with no delimiter skips straight to the normal single-country path,
     unchanged.

     The inverse risk — a genuine single country whose own name contains
     "and" ("Trinidad and Tobago", "Bosnia and Herzegovina") — is caught
     by the fallback below: if splitting finds nothing (both halves fail
     to resolve on their own), retry the whole original string, which
     matches those correctly via the exact/substring tiers.

     Always returns an array, possibly empty. */
  function matchCountries(text, slug) {
    var raw = String(text || "");
    var looksCompound = /,|&|\band\b/i.test(raw.replace(/\([^)]*\)/g, " "));
    if (!looksCompound) {
      var whole = matchCountry(raw, slug);
      return whole ? [whole] : [];
    }
    var pieces = raw.replace(/\([^)]*\)/g, " ").split(/,|&|\band\b/i); // drop "(judges)" etc. first
    var found = [], seen = {};
    for (var i = 0; i < pieces.length; i++) {
      var piece = pieces[i].trim();
      if (!piece) continue;
      var m = matchCountry(piece, slug);
      if (m && !seen[m]) { seen[m] = true; found.push(m); }
    }
    if (!found.length) {
      var wholeFallback = matchCountry(raw, slug);
      if (wholeFallback) return [wholeFallback];
    }
    return found;
  }

  /* The landing view (no ?c=) is a live overview across all 9 committees
     at once — a Docs/Speeches/POI/Chits total per committee, plus a grand
     total, click a committee to drill into its full country-by-country
     tally. Built from the exact same fetch/parse pipeline as the
     per-committee page (see buildMergedData()/summarize() below), just
     run once per committee per poll instead of once total. */
  function renderOverview(stats, updatedAt, wpTotal) {
    var grand = { docs: 0, speeches: 0, poi: 0, chits: 0 };
    var rows = "";
    Object.keys(COMMITTEES).forEach(function (slug) {
      var s = stats[slug] || { docs: 0, speeches: 0, poi: 0, chits: 0 };
      grand.docs += s.docs; grand.speeches += s.speeches; grand.poi += s.poi; grand.chits += s.chits;
      rows += "<tr><td><a href=\"?c=" + slug + "\">" + escapeHtml(COMMITTEES[slug]) + "</a></td>"
        + "<td>" + s.docs + "</td><td>" + s.speeches + "</td><td>" + s.poi + "</td><td>" + s.chits + "</td></tr>";
    });
    // World Press isn't a committee (no roster, no speeches/POI/chits) —
    // its "Docs" figure is really a task count, folded into the same
    // column since both mean "things submitted"; the other three columns
    // don't apply to it at all, shown as em dashes rather than a
    // misleading 0.
    wpTotal = wpTotal || 0;
    grand.docs += wpTotal;
    rows += "<tr><td><a href=\"?c=" + WORLD_PRESS_SLUG + "\">" + escapeHtml(WORLD_PRESS_NAME) + "</a></td>"
      + "<td>" + wpTotal + "</td><td>&mdash;</td><td>&mdash;</td><td>&mdash;</td></tr>";
    rows += "<tr class=\"subm-total-row\"><td>Total</td><td>" + grand.docs + "</td><td>" + grand.speeches
      + "</td><td>" + grand.poi + "</td><td>" + grand.chits + "</td></tr>";

    var html = '<div class="crumb"><a href="index.html">Home</a><span>&rsaquo;</span>Recognition Sheet</div>'
      + '<section class="chero"><div class="wrap"><div class="kicker">Live &middot; Document Tracker</div>'
      + '<h1>Recognition Sheet</h1><p class="agenda">Every committee’s live totals so far. Click a committee for the full country-by-country tally.</p>'
      + '<div class="meta"><span class="subm-live"><i class="subm-dot"></i>Live</span><span id="submUpdated">' + updatedLabel(updatedAt) + "</span></div>"
      + "</div></section>"
      + '<div class="subm-wrap">'
      + '<div class="subm-stats">'
      + statPill(grand.docs, "Docs")
      + statPill(grand.speeches, "Speeches")
      + statPill(grand.poi, "POI")
      + statPill(grand.chits, "Chits")
      + "</div>"
      + '<div class="subm-tablewrap"><table class="subm-table"><thead><tr><th>Committee</th><th>Docs</th><th>Speeches</th><th>POI</th><th>Chits</th></tr></thead><tbody>'
      + rows
      + "</tbody></table></div>"
      + "</div>";
    root.innerHTML = html;
    document.title = "Recognition Sheet — INMUN 2026";
  }

  /* ---------- fetch (JSONP against Google's public gviz endpoint — no CORS issues, no key) ----------
     Guarded with a hard timeout: if the callback never fires (blocked script,
     flaky network, ad-blocker), we still resolve with an error instead of
     leaving the page stuck on "Loading…" forever.
     sheetName is optional — pass it to target one specific tab by name
     (gviz otherwise silently reads whichever tab is first in the file,
     which for the Marking-sheet files is the grading rubric, not what we
     want). Every fetch here uses headers=1 — every target tab has a
     single clean header row once addressed directly by name. */
  var FETCH_TIMEOUT_MS = 20000; // was 9000 — too aggressive on slow/congested venue WiFi, was falsely reporting "couldn't load" before slow data even had a chance to arrive
  var cbCounter = 0;
  function fetchSheet(sheetId, sheetName, cb) {
    var cbName = "__inmunSubmCB" + (cbCounter++);
    var tagId = "subm-jsonp-" + cbName;
    var done = false, timer;
    function finish(err, data) {
      if (done) return;
      done = true;
      clearTimeout(timer);
      // Swap in a no-op rather than delete: under heavy concurrent load
      // (the overview page fires up to 45 of these in one go) a response
      // can still arrive after we've already timed out and moved on —
      // deleting the callback outright means that late script tag throws
      // "cbName is not defined" when Google's response finally calls it.
      window[cbName] = function () {};
      var el = document.getElementById(tagId);
      if (el) el.parentNode.removeChild(el);
      cb(err, data);
    }
    window[cbName] = function (data) { finish(null, data); };
    var s = document.createElement("script");
    s.id = tagId;
    s.src = "https://docs.google.com/spreadsheets/d/" + sheetId
      + "/gviz/tq?headers=1&tqx=out:json;responseHandler:" + cbName
      + (sheetName ? "&sheet=" + encodeURIComponent(sheetName) : "")
      + "&_=" + Date.now();
    s.onerror = function () { finish(new Error("network")); };
    document.body.appendChild(s);
    timer = setTimeout(function () { finish(new Error("timeout")); }, FETCH_TIMEOUT_MS);
  }

  /* Runs its 6 gviz fetches through a small pool of FETCH_POOL_SIZE at a
     time instead of all 6 at once or strictly one at a time. All-at-once
     is fastest on a good connection but on a slow/shared venue WiFi the 6
     requests compete for the same limited bandwidth, making each one
     individually slower and more likely to hit FETCH_TIMEOUT_MS. Fully
     serial (1 at a time) is the gentlest on bandwidth but makes total
     load time additive — up to 6 round-trips back-to-back instead of 1
     batch. A pool of 2 is the middle ground: meaningfully less peak
     contention than 6-at-once, meaningfully faster to finish than
     1-at-once. The overview page also runs a few committees' fetchAll()
     calls in parallel with each other (OVERVIEW_BATCH_SIZE), so total
     concurrency there is bounded by both numbers together. */
  var FETCH_POOL_SIZE = 2;

  function fetchAll(slug, cb) {
    var chitIds = CHIT_SHEETS[slug];
    var markingId = MARKING_FILES[slug];
    var newDocSheetId = NEW_DOC_SHEETS[slug];
    var results = { docs: null, newDocs: null, subst: null, viaEb: null, verbatim: null, recognition: null };
    var errors = { docs: null, newDocs: null, subst: null, viaEb: null, verbatim: null, recognition: null };
    var steps = [
      { key: "docs", id: SHEET_ID, sheet: null },
      { key: "newDocs", id: newDocSheetId, sheet: null },
      { key: "subst", id: chitIds.subst, sheet: null },
      { key: "viaEb", id: chitIds.viaEb, sheet: null },
      { key: "verbatim", id: markingId, sheet: "Verbatim" },
      { key: "recognition", id: markingId, sheet: "Recognition Sheet" }
    ];
    var i = 0, active = 0, finished = false;
    function runStep(step) {
      active++;
      fetchSheet(step.id, step.sheet, function (err, data) {
        errors[step.key] = err;
        results[step.key] = data;
        active--;
        pump();
      });
    }
    function pump() {
      if (finished) return;
      while (active < FETCH_POOL_SIZE && i < steps.length) {
        runStep(steps[i++]);
      }
      if (active === 0 && i >= steps.length) {
        finished = true;
        cb(results, errors);
      }
    }
    pump();
  }

  /* ---------- parsing: documents ----------
     Column matching is deliberately defensive: the live header can carry
     extra wording (e.g. "Country (write WP if World Press)"), and the form
     has at least one orphan "Type of Document" question with no upload
     question directly after it. A "pair" only counts when a "Type of
     Document" column is immediately followed by an "Upload your document
     here" column — that keeps every later committee correctly aligned
     even if a stray/duplicate question sits in between. */
  function indexDocColumns(cols) {
    var labels = (cols || []).map(function (c) { return ((c && c.label) || "").trim(); });
    var countryIdx = -1;
    labels.forEach(function (label, i) {
      if (/^country/i.test(label)) countryIdx = i;
    });
    var typePairs = [];
    for (var i = 0; i < labels.length - 1; i++) {
      if (labels[i] === "Type of Document" && labels[i + 1] === "Upload your document here") {
        typePairs.push(i);
      }
    }
    return { countryIdx: countryIdx, typePairs: typePairs };
  }

  /* A Google Forms file-upload question with "allow multiple files" on
     lands in the response sheet as one cell holding every uploaded file's
     Drive link, joined by ", " — e.g. "https://drive.google.com/open?id=A,
     https://drive.google.com/open?id=B". Naively treating that cell as
     "one upload" undercounts a delegate who legitimately attached several
     documents in a single form response. Split only at a comma that's
     immediately followed by another link (not just any comma — a filename
     could contain one) so a single-file cell still counts as exactly 1. */
  function countUploads(uploadVal) {
    if (!uploadVal) return 0;
    var parts = String(uploadVal).split(/,\s*(?=https?:\/\/)/).filter(function (p) { return p.trim(); });
    return parts.length || 1;
  }

  function cellVal(row, i) {
    if (!row || i < 0) return "";
    var c = row.c && row.c[i];
    if (!c) return "";
    if (c.f != null) return String(c.f).trim();
    return c.v != null ? String(c.v).trim() : "";
  }

  function computeDocTally(rows, colIdx) {
    var tally = {};
    PAIR_ORDER.forEach(function (s) { tally[s] = {}; });
    if (colIdx.typePairs.length !== PAIR_ORDER.length && window.console) {
      console.warn("[submissions] expected " + PAIR_ORDER.length + " Type-of-Document column pairs, found "
        + colIdx.typePairs.length + " — the sheet's columns may have changed; tally may be misaligned.");
    }
    (rows || []).forEach(function (row) {
      if (!row || !row.c) return;
      var country = colIdx.countryIdx >= 0 ? cellVal(row, colIdx.countryIdx) : "";
      if (!country) return;
      colIdx.typePairs.forEach(function (typeIdx, j) {
        if (j >= PAIR_ORDER.length) return; // beyond the 9 committee pairs (World Press pairs use "Task Number", so they never land here)
        var committee = PAIR_ORDER[j];
        var typeVal = cellVal(row, typeIdx);
        if (!typeVal) return;
        var uploadVal = cellVal(row, typeIdx + 1);
        if (!uploadVal) return; // a type was picked but nothing uploaded — don't count it
        var matchType = null;
        for (var k = 0; k < DOC_TYPES.length; k++) {
          if (DOC_TYPES[k].toLowerCase() === typeVal.toLowerCase()) { matchType = DOC_TYPES[k]; break; }
        }
        if (!matchType) return;
        // Country names shown here must only ever be the matrix's own
        // names — never raw/typo'd submitted text. Unmatched rows are
        // dropped rather than shown under a name that isn't a real
        // country on this committee's roster.
        var matched = matchCountries(country, committee);
        if (!matched.length) return;
        matched.forEach(function (m) {
          if (!tally[committee][m]) tally[committee][m] = blankRow();
          // Only one Position Paper is ever valid per delegation — cap it
          // at 1 even if the sheet somehow has multiple rows for it.
          // Working Paper / Press Release can legitimately have more than one.
          if (matchType === "Position Paper") tally[committee][m][matchType] = 1;
          else tally[committee][m][matchType]++;
        });
      });
    });
    return tally;
  }

  function blankRow() {
    var row = {};
    ALL_TALLY_TYPES.forEach(function (t) { row[t] = 0; });
    return row;
  }

  /* ---------- parsing: NEW per-committee Documents sheet ----------
     Shape: Timestamp, Email Address, Your Name, Country, Type of
     Document, Upload your document here — a single already-committee-
     scoped pair (unlike the old shared sheet's PAIR_ORDER layout above).
     Position Paper rows are matched but deliberately dropped — Position
     Paper counts come exclusively from the old shared sheet, per the
     2026-08-26 migration (see file-header comment). */
  var NEW_DOC_TYPES = ["Working Paper", "Press Release"];

  function indexNewDocColumns(cols) {
    var labels = (cols || []).map(function (c) { return ((c && c.label) || "").trim(); });
    var countryIdx = -1, typeIdx = -1, uploadIdx = -1;
    labels.forEach(function (label, i) {
      if (/^country/i.test(label)) countryIdx = i;
      if (label === "Type of Document") typeIdx = i;
      if (label === "Upload your document here") uploadIdx = i;
    });
    return { countryIdx: countryIdx, typeIdx: typeIdx, uploadIdx: uploadIdx };
  }

  function computeNewDocTally(rows, colIdx, slug) {
    var tally = {};
    if (colIdx.countryIdx < 0 || colIdx.typeIdx < 0 || colIdx.uploadIdx < 0) return tally;
    (rows || []).forEach(function (row) {
      if (!row || !row.c) return;
      var country = cellVal(row, colIdx.countryIdx);
      if (!country) return;
      var typeVal = cellVal(row, colIdx.typeIdx);
      var uploadVal = cellVal(row, colIdx.uploadIdx);
      if (!typeVal || !uploadVal) return; // a type was picked but nothing uploaded — don't count it
      var matchType = null;
      for (var k = 0; k < NEW_DOC_TYPES.length; k++) {
        if (NEW_DOC_TYPES[k].toLowerCase() === typeVal.toLowerCase()) { matchType = NEW_DOC_TYPES[k]; break; }
      }
      if (!matchType) return; // includes "Position Paper" — dropped on purpose, see above
      var matched = matchCountries(country, slug);
      if (!matched.length) return;
      matched.forEach(function (m) {
        if (!tally[m]) tally[m] = blankRow();
        // A response can carry more than one file if the form's upload
        // question allows multiple files — count each one, not just the row.
        tally[m][matchType] += countUploads(uploadVal);
      });
    });
    return tally;
  }

  /* ---------- parsing: World Press tasks ----------
     Same sheet, same "one column pair per slot" shape as the committee
     documents above, just three "Task Number"/"Upload your document
     here" pairs instead of nine, and grouped by Name (trimmed, exact —
     there's no roster to canonicalise against) instead of by country. */
  function indexWorldPressColumns(cols) {
    var labels = (cols || []).map(function (c) { return ((c && c.label) || "").trim(); });
    // New per-role sheets header this "Your Name"; the old shared sheet
    // headered it just "Name" — accept either.
    var nameIdx = labels.indexOf("Your Name");
    if (nameIdx < 0) nameIdx = labels.indexOf("Name");
    var taskPairs = [];
    for (var i = 0; i < labels.length - 1; i++) {
      if (labels[i] === "Task Number" && labels[i + 1] === "Upload your document here") taskPairs.push(i);
    }
    return { nameIdx: nameIdx, taskPairs: taskPairs };
  }

  function computeWorldPressTally(rows, colIdx) {
    var tally = {};
    if (colIdx.nameIdx < 0 || !colIdx.taskPairs.length) return tally;
    (rows || []).forEach(function (row) {
      if (!row || !row.c) return;
      var name = cellVal(row, colIdx.nameIdx);
      if (!name) return;
      colIdx.taskPairs.forEach(function (taskIdx) {
        var taskVal = cellVal(row, taskIdx);
        var uploadVal = cellVal(row, taskIdx + 1);
        if (!taskVal || !uploadVal) return; // a task was picked but nothing uploaded — don't count it
        // A response can carry more than one file if the form's upload
        // question allows multiple files — count each one, not just the row.
        tally[name] = (tally[name] || 0) + countUploads(uploadVal);
      });
    });
    return tally;
  }

  /* Fetches all 3 World Press role sheets (WP_DOC_SHEETS) in parallel and
     sums their per-delegate task tallies into one — replaces the old
     single-shared-sheet fetch entirely (2026-08-26 migration). err is
     only set if every role sheet failed; a partial failure still returns
     whatever tallies did load, same graceful-degradation approach as the
     committee pages. */
  function fetchWorldPressAll(cb) {
    var roles = Object.keys(WP_DOC_SHEETS);
    var tally = {};
    var pending = roles.length;
    var anyOk = false;
    roles.forEach(function (role) {
      fetchSheet(WP_DOC_SHEETS[role], null, function (err, data) {
        if (!err && data && data.table) {
          anyOk = true;
          var colIdx = indexWorldPressColumns(data.table.cols);
          var roleTally = computeWorldPressTally(data.table.rows, colIdx);
          Object.keys(roleTally).forEach(function (name) {
            tally[name] = (tally[name] || 0) + roleTally[name];
          });
        }
        pending--;
        if (pending === 0) cb(tally, anyOk ? null : new Error("no data"));
      });
    });
  }

  /* ---------- parsing: chit counts (Substantive Chit / POI Chits) ----------
     Both response sheets have a real "From" dropdown (populated with the
     committee's actual roster), so values are already clean — no
     canonicalisation needed, just an exact-name tally. */
  function countByFrom(data, slug, tallyKey, into) {
    if (!data || !data.table) return;
    var labels = (data.table.cols || []).map(function (c) { return norm((c && c.label) || ""); });
    var fromIdx = labels.indexOf("from");
    if (fromIdx < 0) return;
    (data.table.rows || []).forEach(function (row) {
      var raw = cellVal(row, fromIdx);
      if (!raw) return;
      var matches = matchCountries(raw, slug);
      matches.forEach(function (match) {
        if (!into[match]) into[match] = blankRow();
        into[match][tallyKey]++;
      });
    });
  }

  /* ---------- parsing: Speech / POI / Motions / POO (Ruled) / Yields ----------
     Two independent sources, read from two explicitly-named tabs of the
     same Marking-sheet file (never the "Marking" tab itself — that's the
     grading rubric, unrelated to recognition). Whichever source has the
     higher count for a given country/type wins, so a figure typed into
     either tab shows up here. */
  var TYPE_MATCHERS = [
    { key: "POI", test: function (t) { return t.indexOf("poi") > -1 || t.indexOf("information") > -1; } },
    { key: "Motions", test: function (t) { return t.indexOf("motion") > -1; } },
    { key: "POO (Ruled)", test: function (t) { return t.indexOf("poo") > -1 || t.indexOf("order") > -1; } },
    { key: "Speech", test: function (t) { return t.indexOf("speech") > -1 || t.indexOf("gsl") > -1; } },
    { key: "Yields", test: function (t) { return t.indexOf("yield") > -1; } }
  ];

  /* "Verbatim" tab: one row per event (S. No., Type, Portfolio, Verbatim
     text, Notes) — tally by counting matching rows. */
  function parseVerbatimLog(data, slug) {
    var out = {};
    if (!data || !data.table) return out;
    var cols = (data.table.cols || []).map(function (c) { return norm((c && c.label) || ""); });
    var typeIdx = cols.indexOf("type");
    var portfolioIdx = cols.indexOf("portfolio");
    if (typeIdx < 0 || portfolioIdx < 0) return out; // tab missing/renamed — degrade to 0, don't guess
    (data.table.rows || []).forEach(function (row) {
      var typeVal = norm(cellVal(row, typeIdx));
      var portfolioRaw = cellVal(row, portfolioIdx);
      if (!typeVal || !portfolioRaw) return;
      var match = matchCountry(portfolioRaw, slug);
      if (!match) return; // e.g. "EB" or unrecognised — not a delegation row
      var col = null;
      for (var k = 0; k < TYPE_MATCHERS.length; k++) {
        if (TYPE_MATCHERS[k].test(typeVal)) { col = TYPE_MATCHERS[k].key; break; }
      }
      if (!col) return;
      if (!out[match]) out[match] = blankRow();
      out[match][col]++;
    });
    return out;
  }

  /* "Recognition Sheet" tab: one row per country, counts already
     pre-tallied in their own columns — read straight across, no
     event-counting needed. Column headers carry embedded newlines/extra
     spacing on some committees (e.g. "POO\n(Ruled)") — norm() collapses
     that the same way it collapses everything else. */
  var RECOG_COL_MAP = { "Motions": "motion", "Speech": "speech", "POO (Ruled)": "poo ruled", "POI": "poi", "Yields": "yields" };

  function parseRecognitionGrid(data, slug) {
    var out = {};
    if (!data || !data.table) return out;
    var cols = (data.table.cols || []).map(function (c) { return norm((c && c.label) || ""); });
    var countryIdx = cols.indexOf("country name");
    if (countryIdx < 0) return out; // tab missing/renamed — degrade to 0, don't guess
    var colIdxFor = {};
    VERBATIM_TYPES.forEach(function (t) { colIdxFor[t] = cols.indexOf(RECOG_COL_MAP[t]); });
    (data.table.rows || []).forEach(function (row) {
      var countryRaw = cellVal(row, countryIdx);
      if (!countryRaw) return;
      var match = matchCountry(countryRaw, slug);
      if (!match) return;
      VERBATIM_TYPES.forEach(function (t) {
        var ci = colIdxFor[t];
        if (ci < 0) return;
        var n = parseFloat(cellVal(row, ci));
        if (!isFinite(n) || n <= 0) return;
        if (!out[match]) out[match] = blankRow();
        out[match][t] = n;
      });
    });
    return out;
  }

  /* Merge the two sources: higher count per country/type wins. */
  function mergeVerbatimHigher(a, b, into) {
    var countries = {};
    Object.keys(a).forEach(function (c) { countries[c] = true; });
    Object.keys(b).forEach(function (c) { countries[c] = true; });
    Object.keys(countries).forEach(function (c) {
      if (!into[c]) into[c] = blankRow();
      VERBATIM_TYPES.forEach(function (t) {
        var av = (a[c] && a[c][t]) || 0;
        var bv = (b[c] && b[c][t]) || 0;
        var hi = Math.max(av, bv);
        if (hi > into[c][t]) into[c][t] = hi;
      });
    });
  }

  /* ---------- render ---------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function statPill(n, label) {
    return '<div class="subm-stat"><div class="n">' + n + '</div><div class="l">' + label + "</div></div>";
  }

  function updatedLabel(d) {
    if (!d) return "Updating&hellip;";
    var s = Math.max(0, Math.round((Date.now() - d.getTime()) / 1000));
    if (s < 5) return "Updated just now";
    if (s < 60) return "Updated " + s + "s ago";
    return "Updated " + Math.round(s / 60) + "m ago";
  }

  var TABLE_COLS = DOC_TYPES.concat(VERBATIM_TYPES, ["Substantive Chit", "POI Chits"]);

  function render(slug, data, updatedAt, err, retryFn) {
    var name = COMMITTEES[slug];
    var hadData = !!data; // distinguish "never loaded" (true failure — keep the
                           // error/retry UI below) from "loaded, some countries
                           // just have nothing submitted yet"
    data = data || {};
    if (hadData) {
      // Show the full roster, not just countries that have submitted
      // something — a country with zero submissions still needs a row
      // (all zeros) so chairs can see who HASN'T submitted anything yet,
      // not just who has. Real data always wins over the zero default.
      var roster = (window.INMUN_COMMITTEE_COUNTRIES && window.INMUN_COMMITTEE_COUNTRIES[slug]) || [];
      var fullRoster = {};
      roster.forEach(function (pair) { fullRoster[pair[0]] = blankRow(); });
      Object.keys(data).forEach(function (c) { fullRoster[c] = data[c]; });
      data = fullRoster;
    }
    var countries = Object.keys(data).sort(function (a, b) { return a.localeCompare(b); });

    var totals = blankRow();
    countries.forEach(function (c) { ALL_TALLY_TYPES.forEach(function (t) { totals[t] += data[c][t]; }); });
    var docGrand = DOC_TYPES.reduce(function (s, t) { return s + totals[t]; }, 0);
    var chitGrand = totals["Substantive Chit"] + totals["POI Chits"];

    var html = '<div class="crumb"><a href="index.html">Home</a><span>&rsaquo;</span><a href="committees/' + slug + '.html">' + name + '</a><span>&rsaquo;</span>Recognition Sheet</div>'
      + '<section class="chero"><div class="wrap">'
      + '<div class="kicker">Live &middot; Document Tracker</div>'
      + "<h1>" + name + "</h1>"
      + '<p class="agenda">Documents, speeches, points and chits so far, by country.</p>'
      + '<div class="meta"><span class="subm-live"><i class="subm-dot"></i>Live</span><span id="submUpdated">' + updatedLabel(updatedAt) + "</span></div>"
      + "</div></section>"
      + '<div class="subm-wrap">'
      + '<div class="subm-stats">'
      + statPill(totals["Speech"], "Speeches")
      + statPill(totals["POI"], "POI")
      + statPill(docGrand, "Docs")
      + statPill(chitGrand, "Chits")
      + "</div>";

    if (err && !countries.length) {
      html += '<div class="subm-empty">Couldn&#x27;t load live data just now.<br>'
        + '<button type="button" class="btn btn-outline" id="submRetry" style="margin-top:.8rem">Retry now</button> '
        + '<a class="btn btn-outline" style="margin-top:.8rem" href="https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/edit?usp=sharing" target="_blank" rel="noopener">Open the sheet directly</a>'
        + "</div>";
    } else if (!countries.length) {
      html += '<p class="subm-empty">Nothing tracked yet for this committee. Check back soon.</p>';
    } else {
      html += '<div class="subm-tablewrap"><table class="subm-table recog-table"><thead><tr><th>Country</th>'
        + TABLE_COLS.map(function (t) { return "<th>" + t + "</th>"; }).join("")
        + "</tr></thead><tbody>";
      countries.forEach(function (c) {
        var d = data[c];
        html += "<tr><td>" + escapeHtml(c) + "</td>"
          + TABLE_COLS.map(function (col) { return "<td>" + d[col] + "</td>"; }).join("")
          + "</tr>";
      });
      html += "</tbody></table></div>";
    }
    html += "</div>";
    root.innerHTML = html;
    document.title = name + " — Recognition Sheet · INMUN 2026";
    var retryBtn = document.getElementById("submRetry");
    if (retryBtn && retryFn) retryBtn.addEventListener("click", retryFn);
  }

  /* ---------- World Press: its own simple page — no chits/speeches/POI,
     just Name -> Task count, since it isn't a committee with a roster. */
  function renderWorldPress(tally, updatedAt, err, retryFn) {
    var names = Object.keys(tally).sort(function (a, b) { return a.localeCompare(b); });
    var total = names.reduce(function (s, n) { return s + tally[n]; }, 0);

    var html = '<div class="crumb"><a href="index.html">Home</a><span>&rsaquo;</span>' + WORLD_PRESS_NAME + '<span>&rsaquo;</span>Recognition Sheet</div>'
      + '<section class="chero"><div class="wrap">'
      + '<div class="kicker">Live &middot; Document Tracker</div>'
      + "<h1>" + WORLD_PRESS_NAME + "</h1>"
      + '<p class="agenda">Tasks submitted so far, by delegate.</p>'
      + '<div class="meta"><span class="subm-live"><i class="subm-dot"></i>Live</span><span id="submUpdated">' + updatedLabel(updatedAt) + "</span></div>"
      + "</div></section>"
      + '<div class="subm-wrap">'
      + '<div class="subm-stats">'
      + statPill(total, "Total Tasks")
      + "</div>";

    if (err && !names.length) {
      html += '<div class="subm-empty">Couldn&#x27;t load live data just now.<br>'
        + '<button type="button" class="btn btn-outline" id="submRetry" style="margin-top:.8rem">Retry now</button>'
        + "</div>";
    } else if (!names.length) {
      html += '<p class="subm-empty">Nothing tracked yet for World Press. Check back soon.</p>';
    } else {
      html += '<div class="subm-tablewrap"><table class="subm-table"><thead><tr><th>Delegate</th><th>Tasks</th></tr></thead><tbody>'
        + names.map(function (n) { return "<tr><td>" + escapeHtml(n) + "</td><td>" + tally[n] + "</td></tr>"; }).join("")
        + "</tbody></table></div>";
    }
    html += "</div>";
    root.innerHTML = html;
    document.title = WORLD_PRESS_NAME + " — Recognition Sheet · INMUN 2026";
    var retryBtn = document.getElementById("submRetry");
    if (retryBtn && retryFn) retryBtn.addEventListener("click", retryFn);
  }

  function startWorldPressPolling() {
    var lastTally = {}, lastUpdated = null;

    var cached = loadCache("world_press");
    if (cached) {
      lastTally = cached.data;
      lastUpdated = new Date(cached.updatedAt);
      renderWorldPress(lastTally, lastUpdated, null, null);
    }

    function cycle() {
      fetchWorldPressAll(function (tally, err) {
        if (!err) {
          lastTally = tally;
          lastUpdated = new Date();
          renderWorldPress(lastTally, lastUpdated, null, cycle);
          saveCache("world_press", lastTally, lastUpdated);
        } else {
          renderWorldPress(lastTally, lastUpdated, err, cycle);
        }
        var delay = getPollMs();
        if (delay != null) setTimeout(cycle, delay);
      });
    }

    cycle();
    onVisible(cycle);
    setInterval(function () {
      var el = document.getElementById("submUpdated");
      if (el && lastUpdated) el.textContent = updatedLabel(lastUpdated);
    }, 5000);
  }

  /* ---------- shared fetch->tally pipeline, used by both the per-committee
     page and the all-committee overview ---------- */
  function buildMergedData(slug, results) {
    var merged = {};
    if (results.docs && results.docs.table) {
      // Old shared sheet: Position Paper only (see file-header comment —
      // Working Paper / Press Release rows here are ignored on purpose).
      var colIdx = indexDocColumns(results.docs.table.cols);
      var docTally = computeDocTally(results.docs.table.rows, colIdx)[slug] || {};
      Object.keys(docTally).forEach(function (c) {
        if (!merged[c]) merged[c] = blankRow();
        merged[c]["Position Paper"] = docTally[c]["Position Paper"];
      });
    }
    if (results.newDocs && results.newDocs.table) {
      // New per-committee sheet: Working Paper / Press Release only.
      var newColIdx = indexNewDocColumns(results.newDocs.table.cols);
      var newDocTally = computeNewDocTally(results.newDocs.table.rows, newColIdx, slug);
      Object.keys(newDocTally).forEach(function (c) {
        if (!merged[c]) merged[c] = blankRow();
        NEW_DOC_TYPES.forEach(function (t) { merged[c][t] = newDocTally[c][t]; });
      });
    }
    countByFrom(results.subst, slug, "Substantive Chit", merged);
    countByFrom(results.viaEb, slug, "POI Chits", merged);
    var verbatimTally = parseVerbatimLog(results.verbatim, slug);
    var recognitionTally = parseRecognitionGrid(results.recognition, slug);
    mergeVerbatimHigher(verbatimTally, recognitionTally, merged);
    return merged;
  }

  /* Collapses one committee's merged per-country data down to the 4
     overview numbers (same definitions as the per-committee stat pills). */
  function summarize(merged) {
    var totals = blankRow();
    Object.keys(merged).forEach(function (c) { ALL_TALLY_TYPES.forEach(function (t) { totals[t] += merged[c][t]; }); });
    var docGrand = DOC_TYPES.reduce(function (s, t) { return s + totals[t]; }, 0);
    return { docs: docGrand, speeches: totals["Speech"], poi: totals["POI"], chits: totals["Substantive Chit"] + totals["POI Chits"] };
  }

  /* ---------- polling loop (schedule-driven, self-rescheduling) ---------- */
  function startPolling(slug) {
    var lastData = null, lastUpdated = null;

    var cached = loadCache("committee_" + slug);
    if (cached) {
      lastData = cached.data;
      lastUpdated = new Date(cached.updatedAt);
      render(slug, lastData, lastUpdated, null, null); // instant paint from cache; retry button wired in below once cycle() exists
    }

    function cycle() {
      fetchAll(slug, function (results, errors) {
        var allFailed = errors.docs && errors.newDocs && errors.subst && errors.viaEb && errors.verbatim && errors.recognition;
        if (!allFailed) {
          lastData = buildMergedData(slug, results);
          lastUpdated = new Date();
          render(slug, lastData, lastUpdated, null, cycle);
          saveCache("committee_" + slug, lastData, lastUpdated);
        } else {
          render(slug, lastData, lastUpdated, errors.docs || new Error("no data"), cycle);
        }
        var delay = getPollMs();
        if (delay != null) setTimeout(cycle, delay);
      });
    }

    cycle();
    onVisible(cycle);
    setInterval(function () {
      var el = document.getElementById("submUpdated");
      if (el && lastUpdated) el.textContent = updatedLabel(lastUpdated);
    }, 5000);
  }

  /* Fetches every committee's stats and calls onUpdate(stats, updatedAt)
     once a full pass completes, then reschedules itself — shared by the
     Recognition Sheet's own overview and the homepage widget so there's
     one fetch/tally/retry implementation, not two to keep in sync.

     Each committee is 5 fetches, so all 9 at once would be 45 simultaneous
     gviz requests — that reliably makes some of them time out under load.
     OVERVIEW_BATCH_SIZE runs a few committees at a time instead. A
     committee whose fetch fails this cycle keeps showing its last good
     numbers rather than dropping to 0. */
  var OVERVIEW_BATCH_SIZE = 3;

  function pollAllCommittees(onUpdate) {
    var lastStats = {};
    var slugs = Object.keys(COMMITTEES);

    function cycle() {
      var stats = {};
      var i = 0;
      function nextBatch() {
        if (i >= slugs.length) {
          lastStats = stats;
          onUpdate(lastStats, new Date());
          var delay = getPollMs();
          if (delay != null) setTimeout(cycle, delay);
          return;
        }
        var batch = slugs.slice(i, i + OVERVIEW_BATCH_SIZE);
        i += OVERVIEW_BATCH_SIZE;
        var pending = batch.length;
        batch.forEach(function (slug) {
          fetchAll(slug, function (results, errors) {
            var allFailed = errors.docs && errors.newDocs && errors.subst && errors.viaEb && errors.verbatim && errors.recognition;
            stats[slug] = allFailed ? (lastStats[slug] || { docs: 0, speeches: 0, poi: 0, chits: 0 }) : summarize(buildMergedData(slug, results));
            pending--;
            if (pending === 0) nextBatch();
          });
        });
      }
      nextBatch();
    }

    cycle();
    onVisible(cycle);
  }

  /* Total World Press task count only — the overview and homepage widget
     just need one number, not the per-delegate breakdown (that's what
     the dedicated World Press page/renderWorldPress() is for). */
  function fetchWorldPressTotal(cb) {
    fetchWorldPressAll(function (tally) {
      var total = Object.keys(tally).reduce(function (s, n) { return s + tally[n]; }, 0);
      cb(total);
    });
  }

  function startOverviewPolling() {
    var lastUpdated = null;
    var cached = loadCache("overview");
    if (cached) {
      lastUpdated = new Date(cached.updatedAt);
      renderOverview(cached.data.stats, lastUpdated, cached.data.wpTotal);
    }
    pollAllCommittees(function (stats, updatedAt) {
      fetchWorldPressTotal(function (wpTotal) {
        lastUpdated = updatedAt;
        renderOverview(stats, updatedAt, wpTotal);
        saveCache("overview", { stats: stats, wpTotal: wpTotal }, updatedAt);
      });
    });
    setInterval(function () {
      var el = document.getElementById("submUpdated");
      if (el && lastUpdated) el.textContent = updatedLabel(lastUpdated);
    }, 5000);
  }

  /* ---------- homepage widget ----------
     Deliberately minimal — just the 4 grand-total numbers and a link to
     the full sheet, no per-committee breakdown (that lives on
     submissions.html, both the overview and the per-committee views).
     World Press's task count is folded into the Docs figure, same as on
     the overview page. */
  function renderHomeTally(homeRoot, stats, updatedAt, wpTotal) {
    var grand = { docs: 0, speeches: 0, poi: 0, chits: 0 };
    Object.keys(COMMITTEES).forEach(function (slug) {
      var s = stats[slug] || { docs: 0, speeches: 0, poi: 0, chits: 0 };
      grand.docs += s.docs; grand.speeches += s.speeches; grand.poi += s.poi; grand.chits += s.chits;
    });
    grand.docs += wpTotal || 0;

    homeRoot.innerHTML = '<div class="subm-stats">'
      + statPill(grand.docs, "Docs") + statPill(grand.speeches, "Speeches")
      + statPill(grand.poi, "POI") + statPill(grand.chits, "Chits")
      + "</div>"
      + '<p style="text-align:center;margin:.9rem 0 0;font-size:.85rem"><span class="subm-live"><i class="subm-dot"></i>Live</span> '
      + '<span id="homeTallyUpdated">' + updatedLabel(updatedAt) + '</span> &middot; <a href="submissions.html">Open the full Recognition Sheet &rarr;</a></p>';
  }

  function startHomeTallyPolling(homeRoot) {
    var lastUpdated = null;
    var cached = loadCache("home");
    if (cached) {
      lastUpdated = new Date(cached.updatedAt);
      renderHomeTally(homeRoot, cached.data.stats, lastUpdated, cached.data.wpTotal);
    }
    pollAllCommittees(function (stats, updatedAt) {
      fetchWorldPressTotal(function (wpTotal) {
        lastUpdated = updatedAt;
        renderHomeTally(homeRoot, stats, updatedAt, wpTotal);
        saveCache("home", { stats: stats, wpTotal: wpTotal }, updatedAt);
      });
    });
    setInterval(function () {
      var el = document.getElementById("homeTallyUpdated");
      if (el && lastUpdated) el.textContent = updatedLabel(lastUpdated);
    }, 5000);
  }

  /* ---------- entry point (runs last: everything above must be defined first —
     startPolling()/startOverviewPolling()/startHomeTallyPolling() drill
     straight into fetchAll()/fetchSheet(), which need CHIT_SHEETS etc.
     already assigned, not just hoisted) ---------- */
  var homeRoot = document.getElementById("homeTallyRoot");

  if (root) {
    var qs = new URLSearchParams(location.search);
    var slug = qs.get("c");
    root.innerHTML = '<div class="subm-loading">Loading live tally&hellip;</div>';
    if (slug === WORLD_PRESS_SLUG) {
      startWorldPressPolling();
    } else if (!slug || !COMMITTEES[slug]) {
      startOverviewPolling();
    } else {
      startPolling(slug);
    }
  } else if (homeRoot) {
    startHomeTallyPolling(homeRoot);
  }
})();
