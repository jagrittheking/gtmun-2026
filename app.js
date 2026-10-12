// ==============================================================
// GTMUN'26 OFFICIAL CONFERENCE CONFIGURATION & LIVE SYNC ENGINE
// ==============================================================

const GOOGLE_FORMS = {
  // Official Substantive Chits Form (All Committees)
  substantiveChit: "https://docs.google.com/forms/d/e/1FAIpQLScpfMIcktejvuWXAh0HU3r47f9HIaEMtFsZ7HzcXvfo6KejPw/viewform",

  // Official POI Chits Forms (Committee Specific)
  poiChitUNGA: "https://docs.google.com/forms/d/e/1FAIpQLSeSjpE3y5gLJIpU9Kr_HvyMf-J5OuHkBsVyWqycuf7xcNXVxw/viewform",
  poiChitUNCSW: "https://docs.google.com/forms/d/e/1FAIpQLSfXA0bctixyXuaD1lsmaafMCgUPhvrXqbr3pDhuyFGjhjHe8Q/viewform",
  poiChit: "https://docs.google.com/forms/d/e/1FAIpQLSeSjpE3y5gLJIpU9Kr_HvyMf-J5OuHkBsVyWqycuf7xcNXVxw/viewform", // Default fallback

  // Official Document Submissions Form (Position Paper, Press Release, Working Paper, Draft Resolution)
  workingPaper: "https://docs.google.com/forms/d/e/1FAIpQLSddbhHtcGlPP1VQMmzVmcCbbin5STZXD6Nk38OIfn-9f4NXrA/viewform",
  documents: "https://docs.google.com/forms/d/e/1FAIpQLSddbhHtcGlPP1VQMmzVmcCbbin5STZXD6Nk38OIfn-9f4NXrA/viewform",

  // Anonymous Support / Complaints
  anonymousComplaints: "https://forms.gle/rKPKg1oxisKdSiSA6"
};

// ==============================================================
// GOOGLE SHEETS LIVE CONFIGURATION
// Connects Google Forms responses directly to the Live Tally
// ==============================================================
const GOOGLE_SHEET_CONFIG = {
  masterSheetId: localStorage.getItem('gtmun_sheet_id') || "",
  substantiveSheetId: "1Hd2kBTIJn3CUOK4458pZZe_7AAz_y5wQwrxtubH-Xi0",
  ungaPoiSheetId: "1nikS0MC325_kVkk88WI32UTFpUtB7k8orol9KsE-hik",
  uncswPoiSheetId: "1GCOkbB3CWT4y5oR-tp3R6ZdkekHDrttJl9C-hTyDlP8",
  documentsSheetId: "1brrs2FZ_edhIjbxzd4iioHokIaLAAohK0UW2cKWTQGs"
};

// Storage for merged live submissions
window.gtmunLiveSubmissions = [];

// Helper to open Google Form for a specific type with intelligent committee routing
window.openGoogleForm = function(type, commKey) {
  const t = String(type || '').toLowerCase();

  // Resolve committee context (from argument, current URL query, or portal state)
  let comm = commKey ? String(commKey).toLowerCase() : '';
  if (!comm) {
    if (typeof window.getCurrentCommittee === 'function') {
      try { comm = String(window.getCurrentCommittee() || '').toLowerCase(); } catch (e) {}
    }
    if (!comm) {
      const p = new URLSearchParams(window.location.search);
      comm = String(p.get('committee') || p.get('c') || '').toLowerCase();
    }
  }

  // 1. Substantive Chits
  if (t.includes('substantive')) {
    window.open(GOOGLE_FORMS.substantiveChit, '_blank', 'noopener,noreferrer');
    return;
  }

  // 2. POI Chits
  if (t.includes('poi')) {
    if (comm === 'uncsw') {
      window.open(GOOGLE_FORMS.poiChitUNCSW, '_blank', 'noopener,noreferrer');
      return;
    }
    if (comm === 'unga') {
      window.open(GOOGLE_FORMS.poiChitUNGA, '_blank', 'noopener,noreferrer');
      return;
    }
    // If not in UNGA or UNCSW, display quick committee selection modal
    showPoiCommitteeSelector();
    return;
  }

  // 3. All types of document submissions (Working Papers, Position Papers, Press Releases)
  if (t.includes('doc') || t.includes('paper') || t.includes('working') || t.includes('position') || t.includes('press') || t.includes('resolution')) {
    window.open(GOOGLE_FORMS.documents, '_blank', 'noopener,noreferrer');
    return;
  }

  // 4. Secretariat Anonymous Complaints
  if (t.includes('complaint')) {
    window.open(GOOGLE_FORMS.anonymousComplaints, '_blank', 'noopener,noreferrer');
    return;
  }

  // Fallback
  const fallbackUrl = GOOGLE_FORMS[type] || GOOGLE_FORMS.substantiveChit;
  window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
};

// Quick Selector Modal for POI Chits when clicked from General / Home pages
window.showPoiCommitteeSelector = function() {
  let modal = document.getElementById('poiCommModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'poiCommModal';
    modal.className = 'poi-modal-backdrop';
    modal.innerHTML = `
      <div class="poi-modal-card">
        <div class="poi-modal-header">
          <div>
            <div style="font-size:0.75rem;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:700">SUBMIT POI CHIT</div>
            <h3 style="margin:0.25rem 0 0;color:#fff;font-size:1.35rem;font-weight:700">Select Your Committee</h3>
          </div>
          <button type="button" class="poi-modal-close" onclick="closePoiCommitteeSelector()" aria-label="Close">&times;</button>
        </div>
        <p style="color:#9fb2d4;font-size:0.92rem;margin:0.85rem 0 1.25rem;line-height:1.55">
          Each committee has its own dedicated Point of Information dais. Please choose the committee your delegation belongs to:
        </p>
        <div class="poi-modal-options">
          <a href="${GOOGLE_FORMS.poiChitUNGA}" target="_blank" rel="noopener" class="poi-option-btn" onclick="closePoiCommitteeSelector()">
            <span class="poi-opt-sym">◎</span>
            <div class="poi-opt-info">
              <strong>UNGA</strong>
              <span>United Nations General Assembly</span>
            </div>
            <span class="poi-opt-arrow">↗</span>
          </a>
          <a href="${GOOGLE_FORMS.poiChitUNCSW}" target="_blank" rel="noopener" class="poi-option-btn" onclick="closePoiCommitteeSelector()">
            <span class="poi-opt-sym">♀</span>
            <div class="poi-opt-info">
              <strong>UNCSW</strong>
              <span>UN Commission on the Status of Women</span>
            </div>
            <span class="poi-opt-arrow">↗</span>
          </a>
        </div>
        <div style="text-align:center;margin-top:1.15rem">
          <small style="color:#788ea9;font-size:0.82rem">Note: IPL Mega Auction 2028 &amp; AIPPM do not use chits.</small>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePoiCommitteeSelector();
    });
  }
  modal.style.display = 'flex';
};

window.closePoiCommitteeSelector = function() {
  const modal = document.getElementById('poiCommModal');
  if (modal) modal.style.display = 'none';
};

// Masthead scroll detection for enhanced backdrop shadow
window.addEventListener('scroll', () => {
  const m = document.querySelector('.masthead');
  if (m) {
    if (window.scrollY > 15) m.classList.add('scrolled');
    else m.classList.remove('scrolled');
  }
}, { passive: true });

// Conference Countdown (14–15 November 2026 IST)
const START = Date.parse('2026-11-14T09:00:00+05:30');
const END = Date.parse('2026-11-16T00:00:00+05:30');

function countdownParts(now) { 
  const total = Math.max(0, Math.floor((START - now) / 1000)); 
  return [Math.floor(total / 86400), Math.floor(total / 3600) % 24, Math.floor(total / 60) % 60, total % 60]; 
}

function updateCountdown() {
  const now = Date.now();
  const els = ['days', 'hours', 'minutes', 'seconds'];
  countdownParts(now).forEach((n, i) => {
    const el = document.getElementById(els[i]);
    if (el) el.textContent = String(n).padStart(2, '0');
  });
  const statusEl = document.getElementById('countdown-status');
  if (statusEl && now >= START) {
    statusEl.innerHTML = now < END 
      ? '<b>GTMUN’26 is LIVE</b> · Sessions In Progress' 
      : '<b>Thank you for participating in GTMUN’26</b>';
  }
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ==============================================================
// LIVE RECOGNITION TALLY & MULTI-SOURCE SYNC ENGINE
// Synchronizes Google Sheets responses, server DB (/api/chits),
// and on-site submissions in real-time.
// ==============================================================

// Extract Sheet ID from URL or raw ID string
window.extractSheetId = function(input) {
  if (!input) return "";
  const match = String(input).match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) return match[1];
  return input.trim();
};

// Normalizes committee strings to canonical keys: 'unga', 'uncsw', 'ipl', 'aippm'
window.normalizeCommitteeKey = function(commStr) {
  const s = String(commStr || '').toLowerCase();
  if (s.includes('uncsw') || s.includes('women') || s.includes('status of women')) return 'uncsw';
  if (s.includes('unga') || s.includes('general assembly')) return 'unga';
  if (s.includes('ipl') || s.includes('auction')) return 'ipl';
  if (s.includes('aippm') || s.includes('political parties')) return 'aippm';
  return 'unga';
};

// Strict, deterministic match for delegations and portfolios (Sender / FROM only)
window.findMatchingRosterCountry = function(fromStr, roster) {
  if (!fromStr || !roster || roster.length === 0) return null;
  
  // Clean raw input
  let q = String(fromStr).trim();
  if (!q) return null;
  
  let qLower = q.toLowerCase();

  // Strip prefixes like "Delegation of", "Republic of", "From:", "From "
  qLower = qLower.replace(/^(from\s*:\s*|from\s+|delegation\s+of\s+|representative\s+of\s+|ambassador\s+of\s+)/i, '').trim();

  // Explicit blacklist: Dais / EB / Admin / All / Target keywords MUST NEVER MATCH
  const blacklist = [
    'executive board', 'eb', 'dais', 'chair', 'secretariat', 'admin', 
    'all', 'none', 'to', 'target', 'delegates', 'delegate', 'committee',
    'vice chair', 'rapporteur', 'moderator', 'speaker'
  ];
  if (blacklist.includes(qLower)) return null;

  // 1. Direct equality with primary name or full formal title
  for (const r of roster) {
    const rName = (Array.isArray(r) ? r[0] : r).trim();
    const rFull = (Array.isArray(r) && r[1] ? r[1] : '').trim();
    if (qLower === rName.toLowerCase() || (rFull && qLower === rFull.toLowerCase())) {
      return rName;
    }
  }

  // 2. Canonical MUN Acronyms & Shortform Dictionary (Strict word match)
  const aliases = {
    'usa': 'United States',
    'us': 'United States',
    'u.s.': 'United States',
    'u.s.a.': 'United States',
    'united states of america': 'United States',
    'america': 'United States',
    'uk': 'United Kingdom',
    'u.k.': 'United Kingdom',
    'great britain': 'United Kingdom',
    'britain': 'United Kingdom',
    'uae': 'United Arab Emirates',
    'u.a.e.': 'United Arab Emirates',
    'emirates': 'United Arab Emirates',
    'russia': 'Russia',
    'russian federation': 'Russia',
    'ussr': 'Russia',
    'south korea': 'South Korea',
    'korea': 'South Korea',
    'republic of korea': 'South Korea',
    'rok': 'South Korea',
    'dprk': 'North Korea',
    'north korea': 'North Korea',
    'turkey': 'Turkey',
    'turkiye': 'Turkey',
    'türkiye': 'Turkey',
    'germany': 'Germany',
    'deutschland': 'Germany',
    'china': 'China',
    'prc': 'China',
    'people\'s republic of china': 'China',
    'india': 'India',
    'bharat': 'India'
  };

  if (aliases[qLower]) {
    const targetName = aliases[qLower].toLowerCase();
    const found = roster.find(r => {
      const name = Array.isArray(r) ? r[0] : r;
      return name.toLowerCase() === targetName;
    });
    if (found) return Array.isArray(found) ? found[0] : found;
  }

  // 3. Safe Whole-Word Boundary Match:
  // Check if a roster country name appears as a discrete whole word in qLower
  // NEVER use rName.includes(qLower) — that matched substrings inside random country names!
  for (const r of roster) {
    const rName = (Array.isArray(r) ? r[0] : r).trim();
    const rLower = rName.toLowerCase();
    
    // Split into words or check token boundaries
    const words = qLower.split(/[\s,.;:()\[\]\/-]+/);
    if (words.includes(rLower)) {
      return rName;
    }
    
    // For multi-word country names (e.g. "United States", "Saudi Arabia")
    if (rLower.includes(' ') && qLower.includes(rLower)) {
      return rName;
    }
  }

  return null;
};

// JSONP Fetcher for Google Sheets gviz endpoint (bypasses CORS entirely)
let jsonpCounter = 0;
function fetchGoogleSheetGviz(sheetId, sheetName, timeoutMs = 12000) {
  return new Promise((resolve, reject) => {
    if (!sheetId) return resolve(null);

    const cbName = `__gtmunGvizCB_${Date.now()}_${jsonpCounter++}`;
    let finished = false;

    const timer = setTimeout(() => {
      if (finished) return;
      finished = true;
      window[cbName] = () => {};
      const el = document.getElementById(cbName);
      if (el) el.remove();
      // Try fallback to server proxy if on localhost
      fetch(`/api/proxy-sheet?id=${sheetId}` + (sheetName ? `&sheet=${encodeURIComponent(sheetName)}` : ''))
        .then(r => r.text())
        .then(text => {
          try {
            const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
            resolve(JSON.parse(jsonStr));
          } catch (e) {
            resolve(null);
          }
        })
        .catch(() => resolve(null));
    }, timeoutMs);

    window[cbName] = function(data) {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      const el = document.getElementById(cbName);
      if (el) el.remove();
      resolve(data);
    };

    const s = document.createElement('script');
    s.id = cbName;
    s.src = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?headers=1&tqx=out:json;responseHandler:${cbName}`
      + (sheetName ? `&sheet=${encodeURIComponent(sheetName)}` : '')
      + `&_=${Date.now()}`;
    s.onerror = function() {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      s.remove();
      resolve(null);
    };
    document.body.appendChild(s);
  });
}

function getGvizCell(row, colIdx) {
  if (!row || !row.c || !row.c[colIdx]) return '';
  const c = row.c[colIdx];
  if (c.f !== undefined && c.f !== null) return String(c.f).trim();
  if (c.v !== undefined && c.v !== null) return String(c.v).trim();
  return '';
}

function formatGvizDate(val) {
  if (!val) return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const s = String(val).trim();
  if (s.startsWith('Date(')) {
    const parts = s.replace(/Date\(|\)/g, '').split(',').map(Number);
    if (parts.length >= 6) {
      const d = new Date(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5]);
      return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
  return s;
}

// Fetch all submissions from all available sources
window.syncAllLiveSubmissions = async function() {
  const merged = [];
  const seenKeys = new Set();

  function addRecord(item) {
    if (!item || !item.from) return;
    const key = `${String(item.from).toLowerCase()}_${String(item.type).toLowerCase()}_${String(item.time).toLowerCase()}_${String(item.content).slice(0, 20)}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      merged.push(item);
    }
  }

  // 1. Fetch Substantive Chits Sheet
  try {
    const sGviz = await fetchGoogleSheetGviz(GOOGLE_SHEET_CONFIG.substantiveSheetId);
    (sGviz?.table?.rows || []).forEach((r, idx) => {
      const rawTime = getGvizCell(r, 0);
      const comm = getGvizCell(r, 1);
      const from = getGvizCell(r, 2);
      const to = getGvizCell(r, 3);
      const content = getGvizCell(r, 4);
      if (!from || from.toLowerCase() === 'sending country portfolio' || from.toLowerCase() === 'timestamp') return;
      addRecord({
        id: `SUB-${idx + 1}`,
        time: formatGvizDate(rawTime),
        committee: window.normalizeCommitteeKey(comm),
        type: 'Substantive Chit',
        from: from,
        to: to || 'Executive Board',
        content: content || 'Substantive Chit',
        status: 'Logged & Verified',
        source: 'GoogleSheet'
      });
    });
  } catch (e) {
    console.warn('Error fetching Substantive Chits sheet:', e);
  }

  // 2. Fetch UNGA POI Sheet
  try {
    const uGviz = await fetchGoogleSheetGviz(GOOGLE_SHEET_CONFIG.ungaPoiSheetId);
    (uGviz?.table?.rows || []).forEach((r, idx) => {
      const rawTime = getGvizCell(r, 0);
      const from = getGvizCell(r, 1);
      const to = getGvizCell(r, 2);
      const route = getGvizCell(r, 3);
      const content = getGvizCell(r, 4);
      if (!from || from.toLowerCase() === 'from sending country' || from.toLowerCase() === 'timestamp') return;
      addRecord({
        id: `POI-UNGA-${idx + 1}`,
        time: formatGvizDate(rawTime),
        committee: 'unga',
        type: 'POI Chits',
        from: from,
        to: to || 'Target Delegation',
        content: content || 'Point of Information',
        route: 'Delegate-to-Delegate',
        status: 'Logged & Verified',
        source: 'GoogleSheet'
      });
    });
  } catch (e) {
    console.warn('Error fetching UNGA POI sheet:', e);
  }

  // 3. Fetch UNCSW POI Sheet
  try {
    const cGviz = await fetchGoogleSheetGviz(GOOGLE_SHEET_CONFIG.uncswPoiSheetId);
    (cGviz?.table?.rows || []).forEach((r, idx) => {
      const rawTime = getGvizCell(r, 0);
      const from = getGvizCell(r, 1);
      const to = getGvizCell(r, 2);
      const route = getGvizCell(r, 3);
      const content = getGvizCell(r, 4);
      if (!from || from.toLowerCase() === 'from sending country' || from.toLowerCase() === 'timestamp') return;
      addRecord({
        id: `POI-UNCSW-${idx + 1}`,
        time: formatGvizDate(rawTime),
        committee: 'uncsw',
        type: 'POI Chits',
        from: from,
        to: to || 'Target Delegation',
        content: content || 'Point of Information',
        route: 'Delegate-to-Delegate',
        status: 'Logged & Verified',
        source: 'GoogleSheet'
      });
    });
  } catch (e) {
    console.warn('Error fetching UNCSW POI sheet:', e);
  }

  // 4. Fetch Documents Submission Sheet
  try {
    const dGviz = await fetchGoogleSheetGviz(GOOGLE_SHEET_CONFIG.documentsSheetId);
    (dGviz?.table?.rows || []).forEach((r, idx) => {
      const rawTime = getGvizCell(r, 0);
      const comm = getGvizCell(r, 1);
      const from = getGvizCell(r, 2);
      const docType = getGvizCell(r, 3) || 'Working Paper';
      const fileUrl = getGvizCell(r, 4);
      if (!from || from.toLowerCase() === 'country portfolio / sponsoring delegation' || from.toLowerCase() === 'timestamp') return;
      addRecord({
        id: `DOC-${idx + 1}`,
        time: formatGvizDate(rawTime),
        committee: window.normalizeCommitteeKey(comm),
        type: docType,
        from: from,
        to: 'Executive Board',
        content: fileUrl || 'Uploaded Document',
        status: 'Submitted & Logged',
        source: 'GoogleSheet'
      });
    });
  } catch (e) {
    console.warn('Error fetching Documents sheet:', e);
  }

  // 5. Fetch from Local Server Database (/api/chits) if running
  try {
    const res = await fetch('/api/chits');
    if (res.ok) {
      const serverChits = await res.json();
      if (Array.isArray(serverChits)) {
        serverChits.forEach(addRecord);
      }
    }
  } catch (e) {}

  window.gtmunLiveSubmissions = merged;

  // Cache to localStorage
  try {
    localStorage.setItem('gtmun26_delegate_chits', JSON.stringify(merged));
  } catch (e) {}

  // Dispatch custom event for real-time reactive UI update
  window.dispatchEvent(new CustomEvent('gtmun:submissions-updated', { detail: merged }));

  // Render on home/general tally if present
  renderHomeTallyTable(merged);

  return merged;
};

// Accurate country and portfolio matching helper
window.isCountryMatch = function(fieldVal, countryName) {
  if (!fieldVal || !countryName) return false;
  const fLower = String(fieldVal).trim().toLowerCase();
  const cLower = String(countryName).trim().toLowerCase();
  if (fLower === cLower) return true;
  
  if (window.findMatchingRosterCountry) {
    const matched = window.findMatchingRosterCountry(fieldVal, [countryName]);
    if (matched && matched.toLowerCase() === cLower) return true;
  }
  
  // Discrete word boundary match
  const words = fLower.split(/[\s,.;:()\[\]\/-]+/);
  if (words.includes(cLower)) return true;
  if (cLower.length >= 4 && fLower.includes(cLower)) return true;
  return false;
};

// Global helper: Search inquiries and responses for any specific delegation
window.getCountryInquiriesAndResponses = function(countryName, commKey = 'all') {
  if (!countryName) return { country: '', sent: [], incoming: [], docs: [], totalSent: 0, totalIncoming: 0, totalDocs: 0 };
  const all = (window.getStoredChits && window.getStoredChits()) || window.gtmunLiveSubmissions || [];

  const filtered = all.filter(item => {
    if (commKey !== 'all' && item.committee && item.committee.toLowerCase() !== commKey.toLowerCase()) {
      return false;
    }
    return true;
  });

  const sent = filtered.filter(item => window.isCountryMatch(item.from, countryName));
  const incoming = filtered.filter(item => window.isCountryMatch(item.to, countryName));
  const docs = sent.filter(item => {
    const tp = String(item.type || '').toLowerCase();
    return tp.includes('paper') || tp.includes('release') || tp.includes('doc') || tp.includes('resolution');
  });

  return {
    country: countryName,
    sent: sent,
    incoming: incoming,
    docs: docs,
    totalSent: sent.length,
    totalIncoming: incoming.length,
    totalDocs: docs.length
  };
};

// Global getter for stored chits
window.getStoredChits = function() {
  return window.gtmunLiveSubmissions && window.gtmunLiveSubmissions.length > 0 
    ? window.gtmunLiveSubmissions 
    : (JSON.parse(localStorage.getItem('gtmun26_delegate_chits') || '[]'));
};

// Submit a chit locally & to server API
window.submitChitLocally = async function(chitData) {
  const record = {
    id: `SUB-${Date.now().toString().slice(-6)}`,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    committee: window.normalizeCommitteeKey(chitData.committee),
    type: chitData.type || 'Substantive Chit',
    from: chitData.from || 'Delegate',
    to: chitData.to || 'Executive Board',
    content: chitData.content || '',
    status: 'Verified',
    createdAt: new Date().toISOString()
  };

  // 1. Try server POST
  try {
    const res = await fetch('/api/chits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
    if (res.ok) {
      const resp = await res.json();
      if (resp.chit) Object.assign(record, resp.chit);
    }
  } catch (e) {}

  // 2. Add to live in-memory array & local storage
  if (!window.gtmunLiveSubmissions) window.gtmunLiveSubmissions = [];
  window.gtmunLiveSubmissions.unshift(record);
  try {
    localStorage.setItem('gtmun26_delegate_chits', JSON.stringify(window.gtmunLiveSubmissions));
  } catch (e) {}

  // 3. Dispatch update event
  window.dispatchEvent(new CustomEvent('gtmun:submissions-updated', { detail: window.gtmunLiveSubmissions }));

  return record;
};

// Connect user Google Sheet link via UI
window.connectUserSheet = async function(customUrl) {
  const inputEl = document.getElementById('liveSheetInput');
  const val = customUrl || (inputEl ? inputEl.value : '');
  const sheetId = window.extractSheetId(val);

  if (!sheetId) {
    alert('Please enter a valid Google Sheet link or ID.\n\nTo find it:\n1. Open your Google Form\n2. Click "Responses" tab -> "Link to Sheets"\n3. In the Sheet, click "Share" -> set to "Anyone with the link can view"\n4. Paste the Sheet link here!');
    return;
  }

  GOOGLE_SHEET_CONFIG.masterSheetId = sheetId;
  localStorage.setItem('gtmun_sheet_id', sheetId);

  // Inform backend if server is active
  try {
    await fetch('/api/sheets-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ masterSheetId: sheetId })
    });
  } catch (e) {}

  updateSyncStatusUI('Syncing with Google Sheets...');
  const results = await window.syncAllLiveSubmissions();
  alert(`Success! Connected to Google Sheet.\n\nSynced ${results.length} submissions. Live Tally has been updated!`);
};

function updateSyncStatusUI(text) {
  const el = document.getElementById('syncStatusLabel');
  if (el) el.textContent = text;
}

// Render the general submissions table on home.html
function renderHomeTallyTable(data, filterComm = 'all', filterType = 'all', query = '') {
  const tbody = document.getElementById('chitsTableBody');
  if (!tbody) return;

  const q = query.trim().toLowerCase();

  const filtered = data.filter(item => {
    if (filterComm !== 'all' && item.committee.toLowerCase() !== filterComm.toLowerCase()) return false;
    if (filterType !== 'all') {
      if (filterType === 'substantive' && !item.type.toLowerCase().includes('substantive')) return false;
      if (filterType === 'poi' && !item.type.toLowerCase().includes('poi')) return false;
      if (filterType === 'document' && !item.type.toLowerCase().includes('paper') && !item.type.toLowerCase().includes('doc')) return false;
    }
    if (q) {
      const haystack = `${item.from} ${item.to} ${item.content} ${item.committee}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;padding:40px 20px;color:var(--muted)">
          <div style="font-size:28px;margin-bottom:8px">📊</div>
          <h3 style="color:#fff;font-size:1.1rem;margin-bottom:6px">No submissions recorded yet</h3>
          <p style="font-size:.85rem;max-width:540px;margin:auto;line-height:1.5;color:#94a3b8">
            Live tally updates as delegates submit Substantive chits, POIs, and Working Papers through the official Google Forms.
          </p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(item => `
    <tr>
      <td style="white-space:nowrap;font-size:.84rem">
        <strong>${item.time}</strong>
        <span style="display:block;font-size:.72rem;color:var(--muted)">${item.id}</span>
      </td>
      <td><strong style="color:var(--gold);font-size:.88rem">${item.committee.toUpperCase()}</strong></td>
      <td><span class="badge ${item.type.toLowerCase().includes('poi') ? 'reply' : ''}">${item.type}</span></td>
      <td>
        <div style="font-weight:700;color:#fff">${item.from}</div>
        <div style="font-size:.78rem;color:var(--muted)">To: ${item.to}</div>
      </td>
      <td style="font-size:.88rem;line-height:1.5;color:#cad6ea">${item.content}</td>
      <td style="color:#72d6ae;font-size:.82rem;white-space:nowrap">✓ ${item.status || 'Verified'}</td>
    </tr>
  `).join('');
}

// Quick Test Modal & Chit Submission helper
window.openTestChitModal = function() {
  let modal = document.getElementById('testChitModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'testChitModal';
    modal.className = 'poi-modal-backdrop';
    modal.innerHTML = `
      <div class="poi-modal-card" style="max-width:520px;background:#0a1733;border:1px solid rgba(255,255,255,.15);border-radius:14px;padding:2rem">
        <div class="poi-modal-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.2rem">
          <div>
            <div style="font-size:0.75rem;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:700">LIVE TALLY VERIFICATION</div>
            <h3 style="margin:0.25rem 0 0;color:#fff;font-size:1.3rem;font-weight:700">Submit Live Chit / Test Entry</h3>
          </div>
          <button type="button" class="poi-modal-close" onclick="closeTestChitModal()" style="background:none;border:none;color:#fff;font-size:1.5rem;cursor:pointer">&times;</button>
        </div>
        <p style="color:#9fb2d4;font-size:0.88rem;margin-bottom:1.2rem;line-height:1.5">
          Submit a test or floor entry. It will immediately record in the live database, update the exact country counts, and increment the tally cards!
        </p>
        <form id="quickChitForm" onsubmit="handleQuickChitSubmit(event)">
          <div style="margin-bottom:1rem">
            <label style="display:block;color:#cbd5e1;font-size:.85rem;margin-bottom:4px;font-weight:600">Committee:</label>
            <select id="quickComm" style="width:100%;background:#061026;color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:.6rem .8rem;font-size:.9rem" onchange="populateQuickCountries()">
              <option value="unga">UNGA — United Nations General Assembly</option>
              <option value="uncsw">UNCSW — UN Commission on the Status of Women</option>
              <option value="ipl">IPL Mega Auction 2028</option>
              <option value="aippm">AIPPM — All India Political Parties Meet</option>
            </select>
          </div>
          <div style="margin-bottom:1rem">
            <label style="display:block;color:#cbd5e1;font-size:.85rem;margin-bottom:4px;font-weight:600">Sending Country / Delegation:</label>
            <select id="quickCountry" style="width:100%;background:#061026;color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:.6rem .8rem;font-size:.9rem">
            </select>
          </div>
          <div style="margin-bottom:1rem">
            <label style="display:block;color:#cbd5e1;font-size:.85rem;margin-bottom:4px;font-weight:600">Chit / Submission Type:</label>
            <select id="quickType" style="width:100%;background:#061026;color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:.6rem .8rem;font-size:.9rem">
              <option value="Substantive Chit">Substantive Chit</option>
              <option value="POI Chits">Point of Information (POI)</option>
              <option value="Speech">Speech on Floor</option>
              <option value="Working Paper">Working Paper</option>
              <option value="Position Paper">Position Paper</option>
              <option value="Press Release">Press Release</option>
            </select>
          </div>
          <div style="margin-bottom:1.4rem">
            <label style="display:block;color:#cbd5e1;font-size:.85rem;margin-bottom:4px;font-weight:600">Chit Content / Note:</label>
            <textarea id="quickContent" rows="3" placeholder="Enter note, question, or speech topic..." style="width:100%;background:#061026;color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:.6rem .8rem;font-size:.9rem;box-sizing:border-box" required>Delegation wishes to raise a substantive inquiry on the agenda item.</textarea>
          </div>
          <div style="display:flex;gap:10px;justify-content:flex-end">
            <button type="button" class="btn btn-outline" onclick="closeTestChitModal()">Cancel</button>
            <button type="submit" class="btn btn-gold" style="background:#eab308;color:#000;font-weight:700">Submit to Live Tally</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeTestChitModal();
    });
  }
  populateQuickCountries();
  modal.style.display = 'flex';
};

window.closeTestChitModal = function() {
  const modal = document.getElementById('testChitModal');
  if (modal) modal.style.display = 'none';
};

window.populateQuickCountries = function() {
  const commSelect = document.getElementById('quickComm');
  const countrySelect = document.getElementById('quickCountry');
  if (!commSelect || !countrySelect) return;

  const commKey = commSelect.value;
  const roster = (window.GTMUN_COMMITTEE_COUNTRIES && window.GTMUN_COMMITTEE_COUNTRIES[commKey]) || [];

  countrySelect.innerHTML = roster.map(item => {
    const name = Array.isArray(item) ? item[0] : item;
    return `<option value="${name}">${name}</option>`;
  }).join('');
};

window.handleQuickChitSubmit = async function(e) {
  e.preventDefault();
  const comm = document.getElementById('quickComm').value;
  const country = document.getElementById('quickCountry').value;
  const type = document.getElementById('quickType').value;
  const content = document.getElementById('quickContent').value;

  const record = await window.submitChitLocally({
    committee: comm,
    from: country,
    to: 'Executive Board',
    type: type,
    content: content
  });

  closeTestChitModal();
  alert(`✓ Success! 1 ${type} has been recorded for ${country}.\n\nThe Live Tally has updated with the exact count!`);
};

// Initial sync on page load and periodic poll every 8 seconds
document.addEventListener('DOMContentLoaded', () => {
  window.syncAllLiveSubmissions();
  setInterval(() => {
    window.syncAllLiveSubmissions();
  }, 8000);

  // Wire filter listeners if on home
  const filterComm = document.getElementById('filterCommittee');
  const filterType = document.getElementById('filterType');
  const searchQuery = document.getElementById('searchQuery');

  function updateHomeView() {
    const c = filterComm ? filterComm.value : 'all';
    const t = filterType ? filterType.value : 'all';
    const s = searchQuery ? searchQuery.value : '';
    renderHomeTallyTable(window.getStoredChits(), c, t, s);
  }

  if (filterComm) filterComm.addEventListener('change', updateHomeView);
  if (filterType) filterType.addEventListener('change', updateHomeView);
  if (searchQuery) searchQuery.addEventListener('input', updateHomeView);
});
