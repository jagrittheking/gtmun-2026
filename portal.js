// GTMUN'26 Committee Data & Operations
// GTMUN'26 Committee Data & Operations
const COMMITTEES_DATA = {
  unga: {
    id: "unga",
    code: "UNGA",
    name: "United Nations General Assembly",
    number: "01",
    symbol: "◎",
    focus: "Decolonization of the 17 NSGTs, C-24 mandate, resource sovereignty & plebiscites",
    agenda: "Deliberating the Stagnation of Decolonization in Non-Self-Governing Territories, with Special Emphasis on Strategic Archipelagos, Resource Control, and the Legitimacy of Administrative Powers.",
    overview: "The United Nations General Assembly considers the prolonged stagnation of decolonization across the remaining 17 Non-Self-Governing Territories (NSGTs). With over 1.6 to 2 million people remaining under colonial administration and zero de-listings since 2002, the General Assembly must address the friction between territorial integrity and the inalienable Right to Self-Determination under Resolution 1514 (XV), forward military enclaves, and sovereign control over vast Exclusive Economic Zones (EEZs).",
    guideSections: [
      {
            "id": "ch1",
            "title": "1. Mandate, Competence and Legal Authority of the General Assembly",
            "content": "Under UN Charter Chapter XI (Articles 73 and 74) and landmark General Assembly Resolution 1514 (XV)—the Magna Carta of Decolonization—all peoples have an inalienable right to complete freedom, the exercise of sovereign self-determination, and the integrity of their national territory. The General Assembly Plenary, operating through the Fourth Committee (Special Political and Decolonization Committee) and the Special Committee on Decolonization (C-24), exercises comprehensive political competence to evaluate administrative progress, adjudicate territorial petitions, and formulate binding diplomatic recommendations."
      },
      {
            "id": "ch2",
            "title": "2. The Decolonization Deadlock: 17 NSGTs in Historical Perspective",
            "content": "An estimated 1.6 to 2 million inhabitants remain across 17 officially recognized Non-Self-Governing Territories, predominantly small island archipelagos in the Pacific, Atlantic, and Caribbean alongside Western Sahara. While the initial waves of decolonization liberated over 80 sovereign nations, progress has reached a 30-year standstill with zero de-listings since 2002. Metropolitan powers maintain de facto administrative control, often citing small territorial scale, economic vulnerability, or disputed regional claims."
      },
      {
            "id": "ch3",
            "title": "3. Geopolitical Imperatives: Forward Basing & Military Enclaves",
            "content": "Administering powers frequently retain overseas archipelagos to safeguard critical forward-deployed military installations. Naval Base Guam, Andersen Air Force Base, Diego Garcia in the British Indian Ocean Territory, and the naval installations of Gibraltar illustrate how sovereign territorial claims intersect with global power projection, maritime surveillance, and strategic nuclear deterrence."
      },
      {
            "id": "ch4",
            "title": "4. Maritime Sovereignty, UNCLOS & Exclusive Economic Zones",
            "content": "Under the 1982 United Nations Convention on the Law of the Sea (UNCLOS), sovereignty over small, isolated island outposts generates vast 200-nautical-mile Exclusive Economic Zones (EEZs) and extended continental shelf entitlements. Across the Pacific and Atlantic, metropolitan control of minor atolls locks up millions of square kilometers of maritime commons, granting administering powers exclusive rights over offshore fisheries and critical subsea telecommunication cable lanes."
      },
      {
            "id": "ch5",
            "title": "5. Resource Sovereignty & Deep-Sea Polymetallic Minerals",
            "content": "General Assembly Resolution 1803 (XVII) codifies the Permanent Sovereignty of Peoples over their Natural Wealth and Resources. Today, contested archipelagos sit atop vast reserves of marine resources, nickel laterites (as in New Caledonia), and seabed polymetallic nodules containing cobalt, copper, and rare-earth elements essential for the global green transition. The extraction of these resources without sovereign indigenous consent directly challenges international legal norms."
      },
      {
            "id": "ch6",
            "title": "6. Legal Architecture: Res 1514 (XV), Res 1541 (XV) & Chapter XI",
            "content": "Resolution 1541 (XV) explicitly establishes the three legitimate avenues for attaining a full measure of self-government: (1) Sovereign Independence, (2) Free Association with an independent State, or (3) Full Integration on an equal footing. Each outcome requires the free and informed choice of the territorial population expressed through democratic, internationally supervised electoral processes."
      },
      {
            "id": "ch7",
            "title": "7. Self-Determination vs. Territorial Integrity",
            "content": "International jurisprudence continually wrestles with the tension between the Right of Peoples to Self-Determination (Article 1(2)) and the Protection of National Unity and Territorial Integrity (Article 2(4) and Resolution 1514, Paragraph 6). In contested sovereignty disputes (e.g. Falkland Islands/Islas Malvinas, Gibraltar, and Western Sahara), administering states argue that territorial integrity cannot be invoked to override the settled wishes of resident populations, while claimant states contend that colonial dismemberment violated historic territorial integrity."
      },
      {
            "id": "ch8",
            "title": "8. Case Study: Chagos Archipelago & 2019 ICJ Advisory Opinion",
            "content": "In its landmark 25 February 2019 Advisory Opinion, the International Court of Justice affirmed that the decolonization of Mauritius was not lawfully completed upon its 1968 independence because the United Kingdom unlawfully severed the Chagos Archipelago in 1965. The Court ruled that the right to self-determination has customary international law status with erga omnes character, obligating the United Kingdom to bring an end to its administration of the Chagos Archipelago."
      },
      {
            "id": "ch9",
            "title": "9. Case Study: New Caledonia & The Nouméa Accord",
            "content": "New Caledonia encapsulates the modern decolonization dilemma. Following decades of political friction, the 1998 Nouméa Accord established a gradual transfer of competencies and scheduled three referendums. While the first two referendums narrowly rejected independence, the contested third referendum in December 2021 was boycotted by the indigenous Kanak population following COVID-19 mourning restrictions, creating an acute institutional impasse over genuine democratic legitimacy."
      },
      {
            "id": "ch10",
            "title": "10. Case Study: Strategic Enclaves (Guam, Diego Garcia & Gibraltar)",
            "content": "In Guam, the indigenous Chamorro population remains disenfranchised from national presidential elections despite hosting major military forward infrastructure. In Diego Garcia, the forced expulsion of the Chagossian population between 1967 and 1973 to facilitate a military base stands as one of the most egregious historical violations of human rights in modern decolonization history."
      },
      {
            "id": "ch11",
            "title": "11. Plebiscite Integrity, Electoral Registries & Demographic Dilution",
            "content": "A central hurdle in non-self-governing referendums is defining voting eligibility. When metropolitan citizens are permitted to freely settle in dependent territories, the voting share of the indigenous population can be severely diluted. International standards require strict, transparent residency thresholds, impartial international observers from the UN Secretariat, and clear neutral referendum question wording."
      },
      {
            "id": "ch12",
            "title": "12. Economic Dependency & Sovereign Escrow Trusts",
            "content": "Many remaining territories feature small populations and disproportionate reliance on metropolitan budgetary subventions, public sector employment, and tax haven financial services. To overcome economic vulnerability, operative solutions must include the establishment of Sovereign Escrow Trust Funds that pool maritime royalties and mineral revenues to guarantee domestic fiscal viability upon transition."
      },
      {
            "id": "ch13",
            "title": "13. Small Island Developing States (SIDS) & Climate Vulnerability",
            "content": "Most NSGTs are low-lying small islands situated on the frontlines of sea-level rise, ocean acidification, and catastrophic weather events. Because of their non-sovereign status, these territories are frequently barred from direct multilateral borrowing from the Green Climate Fund, the Loss and Damage Fund, or the World Bank. The General Assembly must authorize direct sub-sovereign humanitarian and adaptation financing mechanisms."
      },
      {
            "id": "ch14",
            "title": "14. Comprehensive Operative Frameworks for General Assembly Action",
            "content": "Delegates are called upon to draft comprehensive draft resolutions featuring enforceable mechanisms: (1) Mandating biennial UN visiting missions under C-24 auspices; (2) Establishing a Special Register of Archipelagic Maritime Exploitation to audit resource extraction in NSGT waters; (3) Creating a Decolonization Transition Escrow Facility; and (4) Establishing bilateral decolonization timetables binding administering powers to schedule internationally observed plebiscites."
      },
      {
            "id": "ch15",
            "title": "15. Selected Bibliography, Treaties & Primary Source Register",
            "content": "Core primary instruments: UN Charter (Articles 73–74, 1(2), 2(4)); UNGA Resolutions 1514 (XV), 1541 (XV), 1654 (XVI), 2625 (XXV); UNCLOS (1982); ICJ Advisory Opinions on Western Sahara (1975) and Chagos Archipelago (2019); Special Committee on Decolonization (C-24) Annual Reports (A/78/23); and the British Indian Ocean Territory Sovereignty Agreement (2024–2025)."
      }
],

    quiz: [
      {
        q: "What landmark 1960 General Assembly declaration is universally recognized as the 'Magna Carta of Decolonization'?",
        options: ["Resolution 1514 (XV)", "Resolution 2625 (XXV)", "Resolution 1803 (XVII)", "Resolution 3314 (XXIX)"],
        correct: 0,
        exp: "General Assembly Resolution 1514 (XV), adopted in December 1960, declared that colonialism in all its forms must be brought to a speedy and unconditional end."
      },
      {
        q: "Under General Assembly Resolution 1541 (XV), what are the THREE legitimate constitutional outcomes of self-determination?",
        options: ["Annexation, Military Protectorate, or Mandate", "Sovereign Independence, Free Association, or Full Integration", "Indefinite Trusteeship, Federation, or Devolution", "Autonomous Collectivity, Crown Dependency, or Commonwealth"],
        correct: 1,
        exp: "Principle VI of Resolution 1541 (XV) strictly defines the three legitimate options: (1) Emergence as a sovereign independent State, (2) Free association with an independent State, or (3) Integration with an independent State on equal footing."
      },
      {
        q: "In its historic 2019 Advisory Opinion on the Chagos Archipelago, what fundamental legal principle did the ICJ affirm regarding self-determination?",
        options: ["Self-determination applies only to landlocked nations", "Self-determination creates binding erga omnes obligations for all States", "Administering powers can unilaterally redraw borders prior to independence", "Decolonization treaties expire after 50 years"],
        correct: 1,
        exp: "The ICJ affirmed by 13-1 that self-determination has the character of an erga omnes norm, giving all States a legal interest in protecting it and cooperating to complete decolonization."
      },
      {
        q: "Which subsidiary organ of the General Assembly is specifically mandated to examine the implementation of Resolution 1514 across the 17 NSGTs?",
        options: ["The Special Committee on Decolonization (C-24)", "The Disarmament Commission", "The Trusteeship Council Standing Committee", "The International Law Commission"],
        correct: 0,
        exp: "The Special Committee on Decolonization (Committee of 24 / C-24) meets annually to examine political, economic, and human rights developments in all 17 Non-Self-Governing Territories."
      },
      {
        q: "Why did indigenous Kanak representatives boycott the third New Caledonia independence referendum in December 2021?",
        options: ["Lack of international funding", "Holding the referendum during a period of COVID-19 mourning and disputed restricted voter rolls", "Relocation of the capital city", "Disputes over currency valuation"],
        correct: 1,
        exp: "Indigenous Kanaks requested a postponement due to high COVID-19 mortality and customary mourning periods, and boycotted when France proceeded, resulting in a 56% abstention rate."
      }
    ]
  }
};

// URL Query param parsing
function getCurrentCommittee() {
  const params = new URLSearchParams(window.location.search);
  const c = params.get('committee');
  if (c && COMMITTEES_DATA[c.toLowerCase()]) {
    return c.toLowerCase();
  }
  return 'unga';
}

function loadCommittee(commKey) {
  const data = COMMITTEES_DATA[commKey] || COMMITTEES_DATA.unga;

  // Header & Hero
  document.title = `${data.name} — GTMUN’26 Delegate Portal`;
  const crumbEl = document.getElementById('commCrumb');
  if (crumbEl) crumbEl.textContent = data.name;

  const symbolEl = document.getElementById('commSymbol');
  if (symbolEl) symbolEl.textContent = data.symbol;

  const numEl = document.getElementById('commNumber');
  if (numEl) numEl.textContent = data.number;

  const codeEl = document.getElementById('commCode');
  if (codeEl) codeEl.textContent = data.code;

  const titleEl = document.getElementById('commTitle');
  if (titleEl) titleEl.textContent = data.name;

  const agendaEl = document.getElementById('commAgenda');
  if (agendaEl) agendaEl.textContent = data.agenda;

  const descEl = document.getElementById('commDesc');
  if (descEl) descEl.textContent = data.overview;

  // Render Background Guide
  const guideContentEl = document.getElementById('guideContent');
  const guideNavEl = document.getElementById('guideNav');
  if (guideContentEl && guideNavEl) {
    guideNavEl.innerHTML = data.guideSections.map((s, idx) => `
      <a href="#sec-${s.id}">${idx + 1}. ${s.title}</a>
    `).join('');

    guideContentEl.innerHTML = data.guideSections.map((s, idx) => `
      <section id="sec-${s.id}">
        <h2>${idx + 1}. ${s.title}</h2>
        <p style="white-space:pre-line;line-height:1.8;color:#cad5e8">${s.content}</p>
      </section>
    `).join('');
  }

  // Render Quiz
  const quizForm = document.getElementById('quizForm');
    if (quizForm && data.quiz && data.quiz.length > 0) {
      quizForm.innerHTML = data.quiz.map((item, qIdx) => `
        <fieldset class="quiz-question" id="q_box_${qIdx}" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:18px 22px;margin-bottom:18px;">
          <legend style="color:var(--gold);font-family:var(--font-head);font-size:1.05rem;font-weight:700;padding:0 8px;margin-bottom:8px;">
            Question ${qIdx + 1} of ${data.quiz.length} · <span style="font-size:0.85rem;color:#9fb2d4;font-weight:normal">${item.section || 'Background Guide'}</span>
          </legend>
          <p style="font-size:1.02rem;color:#ffffff;line-height:1.55;margin-bottom:12px;font-weight:500;">${item.q}</p>
          <div class="options" style="display:flex;flex-direction:column;gap:8px;">
            ${item.options.map((opt, oIdx) => `
              <label style="display:flex;align-items:flex-start;gap:10px;padding:10px 14px;border-radius:8px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);cursor:pointer;transition:all 0.2s;" id="lbl_${qIdx}_${oIdx}">
                <input type="radio" name="q_${qIdx}" value="${oIdx}" required style="margin-top:4px;">
                <span style="font-size:0.95rem;color:#e2e8f0;line-height:1.4;">${opt}</span>
              </label>
            `).join('')}
          </div>
          <div id="feedback_${qIdx}" style="display:none;margin-top:12px;padding:12px 14px;border-radius:8px;font-size:0.92rem;line-height:1.5;"></div>
        </fieldset>
      `).join('') + `
        <div class="quiz-actions" style="margin-top:24px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
          <button type="submit" class="btn btn-red" style="padding:12px 28px;font-size:1rem;font-weight:700;">Submit Quiz Answers</button>
          <button type="reset" class="btn btn-outline" style="padding:12px 20px;" onclick="document.querySelectorAll('[id^=feedback_]').forEach(el => el.style.display='none');document.getElementById('quizScoreText').textContent=''">Reset</button>
          <span id="quizScoreText" style="font-size:1.15rem;font-weight:800;color:var(--gold);font-family:var(--font-head);"></span>
        </div>
      `;

      quizForm.onsubmit = function(e) {
        e.preventDefault();
        let score = 0;
        data.quiz.forEach((item, qIdx) => {
          const selected = quizForm.elements[`q_${qIdx}`].value;
          const feedback = document.getElementById(`feedback_${qIdx}`);
          const qBox = document.getElementById(`q_box_${qIdx}`);
          
          if (parseInt(selected) === item.correct) {
            score++;
            qBox.style.borderColor = 'rgba(34, 197, 94, 0.6)';
            feedback.style.display = 'block';
            feedback.style.background = 'rgba(34, 197, 94, 0.12)';
            feedback.style.border = '1px solid rgba(34, 197, 94, 0.35)';
            feedback.style.color = '#86efac';
            feedback.innerHTML = `<strong>✔ Correct!</strong> (${item.section}): ${item.exp}`;
          } else {
            qBox.style.borderColor = 'rgba(239, 68, 68, 0.6)';
            feedback.style.display = 'block';
            feedback.style.background = 'rgba(239, 68, 68, 0.12)';
            feedback.style.border = '1px solid rgba(239, 68, 68, 0.35)';
            feedback.style.color = '#fca5a5';
            feedback.innerHTML = `<strong>✘ Incorrect.</strong> Correct answer is <em>"${item.options[item.correct]}"</em>.<br><span style="margin-top:4px;display:block;color:#e2e8f0;">${item.exp}</span>`;
          }
        });
        const scorePct = Math.round((score / data.quiz.length) * 100);
        document.getElementById('quizScoreText').textContent = `Your Score: ${score} / ${data.quiz.length} (${scorePct}%)`;
        document.getElementById('quizScoreText').scrollIntoView({ behavior: 'smooth' });
      };
    }

  // Parliamentary recognition tracking
  const isChitEnabled = (commKey === 'unga' || commKey === 'uncsw');
  const btnChits = document.getElementById('btn-chits');
  if (btnChits) btnChits.style.display = isChitEnabled ? '' : 'none';

  const hubOptSub = document.getElementById('hubOptSubstantive');
  const hubOptPoi = document.getElementById('hubOptPoi');
  const hubOptChitsLog = document.getElementById('hubOptChitsLog');
  const hubOptFloorDebate = document.getElementById('hubOptFloorDebate');

  if (hubOptSub) hubOptSub.style.display = isChitEnabled ? '' : 'none';
  if (hubOptPoi) hubOptPoi.style.display = isChitEnabled ? '' : 'none';
  if (hubOptChitsLog) hubOptChitsLog.style.display = isChitEnabled ? '' : 'none';
  if (hubOptFloorDebate) hubOptFloorDebate.style.display = isChitEnabled ? 'none' : '';

  // Render Committee Filter for Live Table
  if (isChitEnabled) {
    renderCommitteeChits(commKey);
  }

  // Render Committee Live Tally (Recognition Sheet)
  loadCommitteeTally(commKey);
}

function loadCommitteeTally(commKey) {
  const comm = COMMITTEES_DATA[commKey];
  if (!comm) return;

  const headingEl = document.getElementById('tallyCommHeading');
  if (headingEl) headingEl.textContent = comm.name;

  const standaloneLink = document.getElementById('tallyStandaloneLink');
  if (standaloneLink) standaloneLink.href = 'submissions.html?c=' + commKey;

  // Recognition tracks debate floor participation
  const isChitEnabled = (commKey === 'unga' || commKey === 'uncsw');
    // Recognition Sheet tracks parliamentary debate & documents only (No chits in recognition table)
    // Recognition Sheet tracks parliamentary debate & documents only (No chits in recognition table)
  const activeColumns = [
    "Position Paper",
    "Press Release",
    "Working Paper",
    "Speech",
    "POI",
    "Motions",
    "POO (Ruled)",
    "Yields"
  ];

  // Adjust stat cards and submit button
  const cardChits = document.getElementById('tallyStatChitsCard');
  if (cardChits) cardChits.style.display = 'none';

  const btnSubmitChit = document.getElementById('tallyBtnSubmitChit');
  const btnSubmitDoc = document.getElementById('tallyBtnSubmitDoc');
  if (btnSubmitChit) btnSubmitChit.style.display = isChitEnabled ? 'inline-block' : 'none';
  if (btnSubmitDoc) btnSubmitDoc.style.display = isChitEnabled ? 'none' : 'inline-block';

  // Render dynamic table header
  const headerRow = document.getElementById('tallyHeaderRow');
  const portfolioTitle = (commKey === 'ipl') ? 'Franchise / Team' : (commKey === 'aippm') ? 'Leader / Portfolio' : 'Country';
  if (headerRow) {
    headerRow.innerHTML = `
      <th style="text-align:left;padding-left:14px">${portfolioTitle}</th>
      ${activeColumns.map(col => `<th>${escapeHtml(col)}</th>`).join('')}
    `;
  }

  const rosterPairs = (window.GTMUN_COMMITTEE_COUNTRIES && window.GTMUN_COMMITTEE_COUNTRIES[commKey]) || [];
  const roster = rosterPairs.map(p => Array.isArray(p) ? p[0] : p);

  // Initialize data store for roster
  const tallyData = {};
  roster.forEach(name => {
    tallyData[name] = {};
    activeColumns.forEach(col => { tallyData[name][col] = 0; });
  });

  // Pull live submissions from Google Sheets / app.js
  const stored = (window.getStoredChits && window.getStoredChits()) || getLocalChits();
  stored.forEach(sub => {
    if (sub.committee && sub.committee !== 'all' && sub.committee.toLowerCase() !== commKey.toLowerCase() && sub.committee.toLowerCase() !== comm.code.toLowerCase()) {
      return;
    }
    // STRICT RULE: Award points ONLY to the sending country (sub.from)!
    // NEVER award points to the target country (sub.to) or loose random matches!
    const fromCountry = sub.from;
    if (!fromCountry) return;

    const matched = window.findMatchingRosterCountry ? window.findMatchingRosterCountry(fromCountry, roster) : null;
    if (!matched) return;

    if (matched) {
      const typeStr = String(sub.type || '').toLowerCase();
      if (typeStr.includes('position')) tallyData[matched]['Position Paper']++;
      else if (typeStr.includes('press')) tallyData[matched]['Press Release']++;
      else if (typeStr.includes('working') || typeStr.includes('draft') || typeStr.includes('paper')) tallyData[matched]['Working Paper']++;
      else if (typeStr.includes('speech')) tallyData[matched]['Speech']++;
      else if (typeStr.includes('poi chit') || (typeStr.includes('poi') && typeStr.includes('chit'))) {
        if (isChitEnabled) tallyData[matched]['POI Chits']++;
        else tallyData[matched]['POI']++;
      }
      else if (typeStr.includes('poi')) tallyData[matched]['POI']++;
      else if (typeStr.includes('motion')) tallyData[matched]['Motions']++;
      else if (typeStr.includes('poo') || typeStr.includes('order')) tallyData[matched]['POO (Ruled)']++;
      else if (typeStr.includes('yield')) tallyData[matched]['Yields']++;
      else if (typeStr.includes('substantive')) {
        if (isChitEnabled) tallyData[matched]['Substantive Chit']++;
        else tallyData[matched]['Working Paper']++;
      }
      else {
        if (isChitEnabled) tallyData[matched]['Substantive Chit']++;
        else tallyData[matched]['Working Paper']++;
      }
    }
  });

  function renderTable(filterQuery = '') {
    const tbody = document.getElementById('tallyTableBody');
    const tfoot = document.getElementById('tallyFooterTotalRow');
    if (!tbody) return;

    const q = filterQuery.trim().toLowerCase();
    const filteredRoster = roster.filter(r => !q || r.toLowerCase().includes(q));

    // Calculate column totals
    const totals = {};
    activeColumns.forEach(col => { totals[col] = 0; });

    roster.forEach(name => {
      activeColumns.forEach(col => {
        totals[col] += tallyData[name][col] || 0;
      });
    });

    // Update stat summary boxes
    const elSpeeches = document.getElementById('tallyStatSpeeches');
    const elPOI = document.getElementById('tallyStatPOI');
    const elDocs = document.getElementById('tallyStatDocs');
    const elChits = document.getElementById('tallyStatChits');

    if (elSpeeches) elSpeeches.textContent = totals['Speech'];
    if (elPOI) elPOI.textContent = totals['POI'];
    if (elDocs) elDocs.textContent = totals['Position Paper'] + totals['Press Release'] + totals['Working Paper'];
    if (elChits && isChitEnabled) elChits.textContent = (totals['Substantive Chit'] || 0) + (totals['POI Chits'] || 0);

    // Render table rows
    if (filteredRoster.length === 0) {
      tbody.innerHTML = `<tr><td colspan="${activeColumns.length + 1}" style="text-align:center;padding:30px;color:var(--muted)">No matching delegations found.</td></tr>`;
    } else {
      tbody.innerHTML = filteredRoster.map(name => {
        const counts = tallyData[name];
        return `
          <tr>
            <td class="chit-clickable-country" onclick="window.jumpToDossier('${escapeHtml(name)}')" title="View chits for ${escapeHtml(name)}">
              <span style="font-weight:600;color:#fff">${escapeHtml(name)}</span>
            </td>
            ${activeColumns.map(col => `<td>${counts[col]}</td>`).join('')}
          </tr>
        `;
      }).join('');
    }

    // Render footer total row
    if (tfoot) {
      tfoot.innerHTML = `
        <td>Total</td>
        ${activeColumns.map(col => `<td>${totals[col]}</td>`).join('')}
      `;
    }
  }

  renderTable();

  // Wire search input
  const searchInput = document.getElementById('tallySearchInput');
  if (searchInput) {
    searchInput.oninput = (e) => renderTable(e.target.value);
  }
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

let currentDossierCountry = '';
let currentDossierFilter = 'all';
let currentDossierQuery = '';
let dossierListenersInitialized = false;

function renderCommitteeDossier(commKey, presetCountry, presetFilter, presetQuery) {
  if (presetCountry !== undefined) currentDossierCountry = presetCountry;
  if (presetFilter !== undefined) currentDossierFilter = presetFilter;
  if (presetQuery !== undefined) currentDossierQuery = presetQuery;

  const feedEl = document.getElementById('dossierFeed');
  const selectEl = document.getElementById('dossierCountrySelect');
  const searchInput = document.getElementById('dossierSearchInput');
  const summaryBanner = document.getElementById('dossierSummaryBanner');
  if (!feedEl) return;

  const commData = COMMITTEES_DATA[commKey] || COMMITTEES_DATA.unga;
  const rosterPairs = (window.GTMUN_COMMITTEE_COUNTRIES && window.GTMUN_COMMITTEE_COUNTRIES[commKey]) || [];
  const roster = rosterPairs.map(p => Array.isArray(p) ? p[0] : p);

  // Populate Select dropdown once per committee
  if (selectEl && (!selectEl.dataset.commKey || selectEl.dataset.commKey !== commKey)) {
    selectEl.dataset.commKey = commKey;
    selectEl.innerHTML = `<option value="">— All Committee Delegations (${roster.length}) —</option>` +
      roster.map(r => `<option value="${escapeHtml(r)}">${escapeHtml(r)}</option>`).join('');
  }
  if (selectEl && currentDossierCountry) {
    selectEl.value = currentDossierCountry;
  } else if (selectEl && !currentDossierCountry) {
    selectEl.value = '';
  }
  if (searchInput && currentDossierQuery) {
    searchInput.value = currentDossierQuery;
  }

  // Wire controls once
  if (!dossierListenersInitialized) {
    dossierListenersInitialized = true;
    if (selectEl) {
      selectEl.addEventListener('change', (e) => {
        currentDossierCountry = e.target.value;
        if (searchInput) searchInput.value = '';
        currentDossierQuery = '';
        renderCommitteeDossier(getCurrentCommittee());
      });
    }
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentDossierQuery = e.target.value.trim();
        if (currentDossierQuery && selectEl) {
          const optMatch = Array.from(selectEl.options).find(o => o.value.toLowerCase() === currentDossierQuery.toLowerCase());
          if (optMatch) {
            currentDossierCountry = optMatch.value;
            selectEl.value = optMatch.value;
          }
        }
        renderCommitteeDossier(getCurrentCommittee());
      });
    }
    const resetBtn = document.getElementById('dossierResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        currentDossierCountry = '';
        currentDossierQuery = '';
        currentDossierFilter = 'all';
        if (selectEl) selectEl.value = '';
        if (searchInput) searchInput.value = '';
        renderCommitteeDossier(getCurrentCommittee());
      });
    }
    document.querySelectorAll('.chit-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentDossierFilter = btn.getAttribute('data-filter') || 'all';
        renderCommitteeDossier(getCurrentCommittee());
      });
    });
  }

  // Fetch all committee submissions from Google Sheets / app.js
  const allSubmissions = (window.getStoredChits && window.getStoredChits()) || getLocalChits();
  const commItems = allSubmissions.filter(item => {
    if (!item.committee || item.committee === 'all') return true;
    const cLower = String(item.committee).toLowerCase();
    return cLower === commKey.toLowerCase() || cLower === commData.code.toLowerCase();
  });

  // Calculate categorized sets for current country / search query
  const targetCountry = currentDossierCountry || (currentDossierQuery ? currentDossierQuery : null);

  let sentItems = [];
  let incomingItems = [];
  let docItems = [];
  let displayItems = [];

  if (targetCountry) {
    sentItems = commItems.filter(item => window.isCountryMatch ? window.isCountryMatch(item.from, targetCountry) : String(item.from || '').toLowerCase().includes(targetCountry.toLowerCase()));
    incomingItems = commItems.filter(item => window.isCountryMatch ? window.isCountryMatch(item.to, targetCountry) : String(item.to || '').toLowerCase().includes(targetCountry.toLowerCase()));
    docItems = sentItems.filter(item => {
      const t = String(item.type || '').toLowerCase();
      return t.includes('paper') || t.includes('release') || t.includes('doc') || t.includes('resolution');
    });

    if (currentDossierFilter === 'sent') {
      displayItems = sentItems;
    } else if (currentDossierFilter === 'incoming') {
      displayItems = incomingItems;
    } else if (currentDossierFilter === 'docs') {
      displayItems = docItems;
    } else {
      const ids = new Set();
      displayItems = [];
      sentItems.forEach(item => { ids.add(item.id || item); displayItems.push(item); });
      incomingItems.forEach(item => {
        if (!ids.has(item.id || item)) {
          ids.add(item.id || item);
          displayItems.push(item);
        }
      });
    }
  } else {
    sentItems = commItems.filter(item => Boolean(item.from));
    incomingItems = commItems.filter(item => Boolean(item.to && item.to.toLowerCase() !== 'executive board' && item.to.toLowerCase() !== 'dais'));
    docItems = commItems.filter(item => {
      const t = String(item.type || '').toLowerCase();
      return t.includes('paper') || t.includes('release') || t.includes('doc');
    });

    if (currentDossierFilter === 'sent') {
      displayItems = sentItems;
    } else if (currentDossierFilter === 'incoming') {
      displayItems = incomingItems;
    } else if (currentDossierFilter === 'docs') {
      displayItems = docItems;
    } else {
      displayItems = commItems;
    }
  }

  // Update filter tab counts & active states
  const elCountAll = document.getElementById('countAll');
  const elCountSent = document.getElementById('countSent');
  const elCountIncoming = document.getElementById('countIncoming');
  const elCountDocs = document.getElementById('countDocs');

  const totalFilteredCount = targetCountry ? (new Set([...sentItems, ...incomingItems])).size : commItems.length;
  if (elCountAll) elCountAll.textContent = totalFilteredCount;
  if (elCountSent) elCountSent.textContent = sentItems.length;
  if (elCountIncoming) elCountIncoming.textContent = incomingItems.length;
  if (elCountDocs) elCountDocs.textContent = docItems.length;

  document.querySelectorAll('.chit-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === currentDossierFilter);
  });

  // Summary Banner
  if (summaryBanner) {
    if (targetCountry) {
      summaryBanner.style.display = 'flex';
      const elTitle = document.getElementById('dossierCountryTitle');
      const elCommTag = document.getElementById('dossierCommitteeTag');
      const elStatSent = document.getElementById('dossierStatSent');
      const elStatIncoming = document.getElementById('dossierStatIncoming');
      const elStatDocs = document.getElementById('dossierStatDocs');
      const elStatPoints = document.getElementById('dossierStatPoints');

      if (elTitle) elTitle.textContent = targetCountry;
      if (elCommTag) elCommTag.textContent = `${commData.code} · ${commData.name}`;
      if (elStatSent) elStatSent.textContent = sentItems.length;
      if (elStatIncoming) elStatIncoming.textContent = incomingItems.length;
      if (elStatDocs) elStatDocs.textContent = docItems.length;
      if (elStatPoints) elStatPoints.textContent = sentItems.length;
    } else {
      summaryBanner.style.display = 'none';
    }
  }

  // Render Cards in Feed
  if (displayItems.length === 0) {
    feedEl.innerHTML = `
      <div class="chit-empty-panel">
        <p style="font-size:1.05rem;font-weight:700;color:#fff;margin:0 0 6px">No Chits Recorded</p>
        <p style="font-size:0.86rem;color:#8fa2bd;max-width:440px;margin:0 auto 16px">
          ${targetCountry 
            ? `No records found for ${escapeHtml(targetCountry)} under the active filter.`
            : `No chits currently logged for ${commData.name}. Click below to pass a chit.`}
        </p>
        <button class="btn btn-red" type="button" onclick="openGoogleForm('substantiveChit')">+ Submit Chit</button>
      </div>
    `;
    return;
  }

  feedEl.innerHTML = displayItems.map(c => {
    const isSent = targetCountry && window.isCountryMatch ? window.isCountryMatch(c.from, targetCountry) : true;
    const isIncoming = targetCountry && window.isCountryMatch && window.isCountryMatch(c.to, targetCountry);
    const typeStr = String(c.type || '').toLowerCase();
    const isPoi = typeStr.includes('poi');
    const isDoc = typeStr.includes('paper') || typeStr.includes('doc') || typeStr.includes('release') || typeStr.includes('resolution');

    let tagClass = 'chit-tag-pill substantive';
    let tagLabel = 'Substantive Chit';
    let routeHtml = '';

    if (isDoc) {
      tagClass = 'chit-tag-pill doc';
      tagLabel = c.type || 'Document';
      routeHtml = `<span class="chit-route-line">Submitted by <strong style="color:#fff">${escapeHtml(c.from)}</strong> → <strong style="color:var(--gold)">Executive Board</strong></span>`;
    } else if (isPoi) {
      tagClass = 'chit-tag-pill poi';
      tagLabel = 'Point of Information';
      // RULE: POI chits are NEVER to Executive Board! They are strictly Delegate to Delegate!
      const targetDelegate = c.to && c.to.toLowerCase() !== 'executive board' && c.to.toLowerCase() !== 'dais' ? c.to : 'Target Delegation';
      if (isIncoming) {
        routeHtml = `<span class="chit-route-line">Inquiry directed to you from <strong style="color:var(--gold)">${escapeHtml(c.from)}</strong></span>`;
      } else {
        routeHtml = `<span class="chit-route-line">From <strong style="color:#fff">${escapeHtml(c.from)}</strong> → To <strong style="color:var(--gold)">${escapeHtml(targetDelegate)}</strong></span>`;
      }
    } else {
      tagClass = 'chit-tag-pill substantive';
      tagLabel = 'Substantive Chit';
      routeHtml = `<span class="chit-route-line">Submitted by <strong style="color:#fff">${escapeHtml(c.from)}</strong> → <strong style="color:var(--gold)">Executive Board</strong></span>`;
    }

    return `
      <article class="chit-dispatch-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem;flex-wrap:wrap;gap:0.5rem">
          <div style="display:flex;align-items:center;gap:0.65rem;flex-wrap:wrap">
            <span class="${tagClass}">${escapeHtml(tagLabel)}</span>
            ${routeHtml}
          </div>
          <div style="display:flex;align-items:center;gap:0.6rem;font-size:0.76rem;color:#8fa2bd">
            <span>${escapeHtml(c.time || 'Session Record')}</span>
            <span class="chit-meta-id">${escapeHtml(c.id || 'CHIT')}</span>
          </div>
        </div>

        <div class="chit-content-box">
          <div style="font-size:0.68rem;color:var(--gold);text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:4px">
            ${escapeHtml(c.subject || (isPoi ? 'Point of Information Inquiry' : 'Substantive Matter'))}
          </div>
          <div class="chit-content-text">${escapeHtml(c.content || '(No message content)')}</div>
        </div>

        <div class="chit-status-row">
          <div style="display:flex;align-items:center">
            <span class="chit-status-dot"></span>
            <span style="color:#cad6ea">${escapeHtml(c.status || 'Logged & Verified')}</span>
          </div>
          <div style="font-size:0.75rem;color:var(--gold);font-weight:600">
            ${isPoi && isIncoming 
              ? `Reply due from ${escapeHtml(c.to || 'Delegation')}` 
              : `Point awarded strictly to ${escapeHtml(c.from)}`}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderCommitteeChits(commKey) {
  renderCommitteeDossier(commKey);
}

window.jumpToDossier = function(countryName) {
  if (!countryName) return;
  switchTab('chits');
  currentDossierCountry = countryName;
  currentDossierQuery = '';
  currentDossierFilter = 'all';
  const selectEl = document.getElementById('dossierCountrySelect');
  if (selectEl) selectEl.value = countryName;
  const searchInput = document.getElementById('dossierSearchInput');
  if (searchInput) searchInput.value = '';
  renderCommitteeDossier(getCurrentCommittee());
  const dossierTab = document.getElementById('tab-chits');
  if (dossierTab) {
    dossierTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function getLocalChits() {
  try {
    const raw = localStorage.getItem('gtmun26_delegate_chits');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

// Tab Switching

// Universal Global Tab Switcher
window.switchTab = function(tabId) {
  if (!tabId) return;
  const cleanId = tabId.replace('tab-', '').replace('btn-', '').trim().toLowerCase();
  
  // Hide all tab contents
  document.querySelectorAll('.portal-tab-content').forEach(el => {
    el.style.display = 'none';
  });
  
  // Remove active from all tab buttons
  document.querySelectorAll('.portal-tabs button').forEach(el => {
    el.classList.remove('active');
  });

  // Show selected content
  const target = document.getElementById('tab-' + cleanId);
  if (target) {
    target.style.display = 'block';
    try {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch(e){}
  }

  // Activate matching button
  const btn = document.getElementById('btn-' + cleanId);
  if (btn) {
    btn.classList.add('active');
  }

  try {
    history.replaceState(null, null, '#tab-' + cleanId);
  } catch(e){}
};


document.addEventListener('DOMContentLoaded', () => {
  const commKey = getCurrentCommittee();
  loadCommittee(commKey);

  // Setup tab clicks
  ['overview', 'tally', 'guide', 'quiz', 'worksheet', 'chits'].forEach(tab => {
    const btn = document.getElementById(`btn-${tab}`);
    if (btn) btn.addEventListener('click', () => switchTab(tab));
  });

  // Switch committee dropdown if present
  const selectComm = document.getElementById('switchComm');
  if (selectComm) {
    selectComm.value = commKey;
    selectComm.addEventListener('change', (e) => {
      window.location.search = `?committee=${e.target.value}`;
    });
  }

  // Robust direct tab navigation (?tab=quiz, #quiz, #tab-quiz, ?tab=tally)
  const urlParams = new URLSearchParams(window.location.search);
  const activeTabParam = urlParams.get('tab') || window.location.hash.replace('#tab-', '').replace('#', '');
  if (['overview', 'tally', 'guide', 'quiz', 'worksheet', 'chits'].includes(activeTabParam)) {
    switchTab(activeTabParam);
  } else if (window.location.hash.includes('tally')) {
    switchTab('tally');
  } else if (window.location.hash.includes('quiz')) {
    switchTab('quiz');
  }
});

// Real-time reactive updates from Google Sheets / API
window.addEventListener('gtmun:submissions-updated', () => {
  const commKey = getCurrentCommittee();
  loadCommitteeTally(commKey);
  renderCommitteeChits(commKey);
});


// Delegate Worksheet Auto-Save Engine
function initWorksheetAutoSave() {
  const fields = ['wsCountry', 'wsDelegate', 'wsStance', 'wsTreaties', 'wsAllies', 'wsOperative'];
  fields.forEach(fId => {
    const el = document.getElementById(fId);
    if (!el) return;
    const saved = localStorage.getItem('gtmun26_ws_' + fId);
    if (saved) el.value = saved;
    el.addEventListener('input', () => {
      localStorage.setItem('gtmun26_ws_' + fId, el.value);
      const statusEl = document.getElementById('wsSaveStatus');
      if (statusEl) {
        statusEl.textContent = 'Auto-saved at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        statusEl.style.color = '#38ef7d';
      }
    });
  });
}

window.clearWorksheet = function() {
  if (!confirm('Are you sure you want to clear your preparation worksheet? All notes will be reset.')) return;
  const fields = ['wsCountry', 'wsDelegate', 'wsStance', 'wsTreaties', 'wsAllies', 'wsOperative'];
  fields.forEach(fId => {
    const el = document.getElementById(fId);
    if (el) el.value = '';
    localStorage.removeItem('gtmun26_ws_' + fId);
  });
  const statusEl = document.getElementById('wsSaveStatus');
  if (statusEl) {
    statusEl.textContent = 'Worksheet cleared';
    statusEl.style.color = '#e2e8f0';
  }
};

window.downloadWorksheetText = function() {
  const country = (document.getElementById('wsCountry') && document.getElementById('wsCountry').value) || 'Delegation';
  const delegate = (document.getElementById('wsDelegate') && document.getElementById('wsDelegate').value) || 'Delegate';
  const stance = (document.getElementById('wsStance') && document.getElementById('wsStance').value) || '';
  const treaties = (document.getElementById('wsTreaties') && document.getElementById('wsTreaties').value) || '';
  const allies = (document.getElementById('wsAllies') && document.getElementById('wsAllies').value) || '';
  const operative = (document.getElementById('wsOperative') && document.getElementById('wsOperative').value) || '';

  const doc = 
`================================================================================
GLOBAL TEENS MODEL UNITED NATIONS 2026 — DELEGATE PREPARATION DOSSIER
================================================================================
COMMITTEE  : United Nations General Assembly (UNGA Plenary)
AGENDA     : Deliberating the Stagnation of Decolonization in Non-Self-Governing Territories, 
             with Special Emphasis on Strategic Archipelagos, Resource Control, 
             and the Legitimacy of Administrative Powers.
DELEGATION : ${country}
DELEGATE   : ${delegate}
DATE       : ${new Date().toLocaleDateString()}
================================================================================

[SECTION 1: NATIONAL STANCE & SOVEREIGN INTERESTS]
--------------------------------------------------------------------------------
${stance || '(No notes entered)'}


[SECTION 2: KEY INTERNATIONAL TREATIES, CHARTERS & ICJ PRECEDENTS]
--------------------------------------------------------------------------------
${treaties || '(No notes entered)'}


[SECTION 3: BLOC ALLIES, ADVERSARIES & RED LINES]
--------------------------------------------------------------------------------
${allies || '(No notes entered)'}


[SECTION 4: PROPOSED OPERATIVE CLAUSES FOR WORKING PAPER / DRAFT RESOLUTION]
--------------------------------------------------------------------------------
${operative || '(No notes entered)'}

================================================================================
CONFIDENTIAL DIPLOMATIC BRIEFING · PREPARED FOR GTMUN'26
================================================================================`;

  const blob = new Blob([doc], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `GTMUN26_Worksheet_${country.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// Initialize worksheet on page load
document.addEventListener('DOMContentLoaded', initWorksheetAutoSave);
