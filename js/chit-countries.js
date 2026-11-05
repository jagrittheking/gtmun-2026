/* GTMUN'26 — Official Committee Country & Portfolio Rosters
   Used for canonical matching, Recognition Sheet tallies, and delegate filters. */
window.GTMUN_COMMITTEE_COUNTRIES = {
  "unga": [
    ["Afghanistan", "Islamic Republic of Afghanistan"],
    ["Albania", "Republic of Albania"],
    ["Algeria", "People's Democratic Republic of Algeria"],
    ["Argentina", "Argentine Republic"],
    ["Australia", "Commonwealth of Australia"],
    ["Austria", "Republic of Austria"],
    ["Bangladesh", "People's Republic of Bangladesh"],
    ["Belgium", "Kingdom of Belgium"],
    ["Brazil", "Federative Republic of Brazil"],
    ["Canada", "Canada"],
    ["Chile", "Republic of Chile"],
    ["China", "People's Republic of China"],
    ["Colombia", "Republic of Colombia"],
    ["Cuba", "Republic of Cuba"],
    ["Denmark", "Kingdom of Denmark"],
    ["Egypt", "Arab Republic of Egypt"],
    ["Ethiopia", "Federal Democratic Republic of Ethiopia"],
    ["France", "French Republic"],
    ["Germany", "Federal Republic of Germany"],
    ["Greece", "Hellenic Republic"],
    ["India", "Republic of India"],
    ["Indonesia", "Republic of Indonesia"],
    ["Iran", "Islamic Republic of Iran"],
    ["Iraq", "Republic of Iraq"],
    ["Ireland", "Republic of Ireland"],
    ["Israel", "State of Israel"],
    ["Italy", "Italian Republic"],
    ["Japan", "State of Japan"],
    ["Kenya", "Republic of Kenya"],
    ["Mexico", "United Mexican States"],
    ["Netherlands", "Kingdom of the Netherlands"],
    ["New Zealand", "New Zealand"],
    ["Nigeria", "Federal Republic of Nigeria"],
    ["Norway", "Kingdom of Norway"],
    ["Pakistan", "Islamic Republic of Pakistan"],
    ["Philippines", "Republic of the Philippines"],
    ["Poland", "Republic of Poland"],
    ["Portugal", "Portuguese Republic"],
    ["Qatar", "State of Qatar"],
    ["Russia", "Russian Federation"],
    ["Saudi Arabia", "Kingdom of Saudi Arabia"],
    ["Singapore", "Republic of Singapore"],
    ["South Africa", "Republic of South Africa"],
    ["South Korea", "Republic of Korea"],
    ["Spain", "Kingdom of Spain"],
    ["Sweden", "Kingdom of Sweden"],
    ["Switzerland", "Swiss Confederation"],
    ["Turkey", "Republic of Türkiye"],
    ["Ukraine", "Ukraine"],
    ["United Arab Emirates", "United Arab Emirates"],
    ["United Kingdom", "United Kingdom of Great Britain and Northern Ireland"],
    ["United States", "United States of America"],
    ["Vietnam", "Socialist Republic of Vietnam"]
  ]
};

// Aliases for compatibility
window.INMUN_COMMITTEE_COUNTRIES = window.GTMUN_COMMITTEE_COUNTRIES;


// Canonical Roster Matching Helpers
window.findMatchingRosterCountry = function(input, roster) {
  if (!input || !roster) return null;
  const s = String(input).trim().toLowerCase();
  for (let i = 0; i < roster.length; i++) {
    const c = roster[i];
    if (c.toLowerCase() === s) return c;
  }
  for (let i = 0; i < roster.length; i++) {
    const c = roster[i];
    const cl = c.toLowerCase();
    if (cl.includes(s) || s.includes(cl)) return c;
  }
  const cleaned = s.replace(/^(republic of|state of|kingdom of|federation of|people's democratic republic of|arab republic of|federal republic of|islamic republic of)\s+/i, '').trim();
  if (cleaned.length >= 3) {
    for (let i = 0; i < roster.length; i++) {
      const c = roster[i];
      if (c.toLowerCase().includes(cleaned) || cleaned.includes(c.toLowerCase())) return c;
    }
  }
  return null;
};

window.isCountryMatch = function(a, b) {
  if (!a || !b) return false;
  const sa = String(a).trim().toLowerCase();
  const sb = String(b).trim().toLowerCase();
  if (sa === sb || sa.includes(sb) || sb.includes(sa)) return true;
  const ca = sa.replace(/^(republic of|state of|kingdom of|federation of|people's democratic republic of|arab republic of|federal republic of|islamic republic of)\s+/i, '').trim();
  const cb = sb.replace(/^(republic of|state of|kingdom of|federation of|people's democratic republic of|arab republic of|federal republic of|islamic republic of)\s+/i, '').trim();
  return ca && cb && (ca === cb || ca.includes(cb) || cb.includes(ca));
};
