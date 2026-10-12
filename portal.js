// GTMUN'26 Committee Data & Operations
const COMMITTEES_DATA = {
  unga: {
    id: "unga",
    code: "UNGA",
    name: "United Nations General Assembly",
    number: "01",
    symbol: "◎",
    focus: "Arctic security, militarization, resource competition & climate impacts",
    agenda: "Addressing the Emerging Geopolitical and Environmental Security Challenges in the Arctic Region, including Militarization, Resource Competition, and Climate Change Impacts.",
    overview: "The United Nations General Assembly considers the escalating geopolitical, environmental, and military friction in the circumpolar Arctic. With polar ice receding at historic rates, major Arctic states and global powers compete for maritime navigation corridors, untapped hydrocarbon reserves, and forward military readiness, challenging multilateral governance frameworks.",
    guideSections: [
      {
        id: "context",
        title: "Circumpolar Geopolitics & Military Proliferation",
        content: `The melting Arctic cap has transformed the Arctic from a zone of low tension into a theater of strategic competition. Under the UN Charter and UNCLOS, Arctic coastal states assert extended continental shelf claims under Article 76. Militarization—including deep-water naval bases, radar deployments, and submarine corridors—threatens circumpolar security and strains multilateral dialogue.`
      },
      {
        id: "shipping",
        title: "Northern Sea Routes & Natural Resource Extraction",
        content: `The Northern Sea Route and Northwest Passage offer shipping transit reductions of up to 40% between Europe and Asia. Coastal jurisdiction over navigation, mandatory pilotage under UNCLOS Article 234 (Ice-Covered Areas), and rights to seabed rare-earth minerals and fossil fuel basins demand unified international legal consensus.`
      },
      {
        id: "climate",
        title: "Environmental Fragility & Indigenous Sovereignty",
        content: `The Arctic is warming up to four times faster than the global average. Thawing permafrost threatens indigenous livelihoods and circumpolar infrastructure, releasing massive methane deposits. Resolutions must guarantee indigenous self-determination, environmental remediation funds, and binding caps on heavy fuel oil use in polar waters.`
      }
    ],
    quiz: [
      {
        q: "Under UNCLOS Article 234, what special power is granted to coastal states in ice-covered areas?",
        options: ["Unrestricted sovereign annexation", "Right to adopt and enforce non-discriminatory laws for the prevention and control of marine pollution", "Complete closure of international airspace", "Exemption from all environmental treaties"],
        correct: 1,
        exp: "Article 234 gives coastal states special regulatory authority to prevent marine pollution in ice-covered waters within their Exclusive Economic Zone."
      },
      {
        q: "Which major intergovernmental body serves as the primary forum for Arctic governments and Indigenous peoples?",
        options: ["The Arctic Council", "The Antarctic Treaty Secretariat", "NATO Northern Flank", "Nordic Energy Commission"],
        correct: 0,
        exp: "The Arctic Council, founded under the 1996 Ottawa Declaration, is the leading intergovernmental forum promoting cooperation in the Arctic."
      }
    ]
  },
  uncsw: {
    id: "uncsw",
    code: "UNCSW",
    name: "United Nations Commission on the Status of Women",
    number: "02",
    symbol: "♀",
    focus: "Trafficking, organ trade, gender-based violence & international justice",
    agenda: "Combating the Global Exploitation of Women and Girls through Human Trafficking, Organ Trade, and Gender-Based Violence, while Strengthening International Protection and Justice Mechanisms.",
    overview: "The Commission on the Status of Women convenes to formulate decisive multilateral protocols combating transnational trafficking networks, illicit organ harvesting and trade, and systemic gender-based exploitation, establishing robust cross-border prosecution safeguards and victim-centric asylum protections.",
    guideSections: [
      {
        id: "trafficking",
        title: "Multilateral Architecture & Transnational Crime Syndicates",
        content: `Supplementing the 2000 Palermo Protocol and UNTOC, the global community faces evolving syndicates operating across conflict zones and vulnerable migrant corridors. Women and girls remain disproportionately subjected to debt-bondage, forced labor, and criminal coercion, with transit countries often lacking specialized victim protection units.`
      },
      {
        id: "organ",
        title: "Illicit Organ Removal & Coercive Medical Exploitation",
        content: `Trafficking in persons for the removal of organs represents one of the most covert and lethal dimensions of exploitation. Impoverished women and asylum seekers are coerced or abducted into illicit clinical networks. Delegates must formulate binding tracking protocols, donor registry transparency, and penalties for cross-border medical complicity.`
      },
      {
        id: "justice",
        title: "Gender-Based Violence, Cyber-Grooming & Victim Protection",
        content: `Digital platforms and predatory cyber-recruitment have expanded the reach of traffickers. Effective international frameworks must mandate non-punishment principles—ensuring victims are never prosecuted for acts committed under coercion—while providing funded safe houses and transnational legal aid.`
      }
    ],
    quiz: [
      {
        q: "What landmark international agreement establishes global standards against human trafficking?",
        options: ["Palermo Protocol (2000)", "Kyoto Protocol (1997)", "Geneva Convention IV", "Basel Convention"],
        correct: 0,
        exp: "The 2000 Palermo Protocol to the UN Convention against Transnational Organized Crime is the principal international instrument combating trafficking."
      },
      {
        q: "Why is the 'Non-Punishment Principle' essential in combating the exploitation of women and girls?",
        options: ["It grants immunity to criminal syndicates", "It ensures victims are not prosecuted for unlawful acts they were compelled to commit while being trafficked", "It eliminates border controls", "It waives international criminal court jurisdiction"],
        correct: 1,
        exp: "The non-punishment principle ensures that victims of trafficking are protected from prosecution for illegal acts committed as a direct consequence of their trafficking situation."
      }
    ]
  },
  ipl: {
    id: "ipl",
    code: "IPL",
    name: "IPL Mega Auction 2028",
    number: "03",
    symbol: "♜",
    focus: "Purse dynamics, RTM strategies & squad optimization",
    agenda: "Mega Auction 2028",
    overview: "Franchise owners, CEOs, and strategy directors assemble for the high-stakes 2028 Mega Auction. Teams must balance purse limits, Right to Match (RTM) tactics, overseas player composition, and cutting-edge data analytics for roster optimization.",
    guideSections: [
      {
        id: "purse",
        title: "Purse Dynamics & Retention Economics for 2028",
        content: `Every franchise faces strict retention deduction slabs against their total purse limit. Retaining too many marquee players cannibalizes squad depth, whereas entering the auction pool with excess capital risks severe bid inflation for premium specialists.`
      },
      {
        id: "rtm",
        title: "Right to Match (RTM) Cards & Psychological Warfare",
        content: `The RTM mechanism alters auction game theory. When an auctioneer invites a former franchise to exercise their Right to Match, rival teams frequently execute strategic bidding to drive prices up, draining opponents' funds before yielding.`
      },
      {
        id: "analytics",
        title: "Impact Player Synergy & Specialization Metrics",
        content: `With tactical substitutions permitted mid-game, traditional medium-pace all-rounders yield ground to elite death-over hitters and specialist phase-specific bowlers, demanding specialized valuation metrics.`
      }
    ],
    quiz: [
      {
        q: "What strategic advantage does the Right to Match (RTM) card offer a franchise in a Mega Auction?",
        options: ["Free retention with no deduction", "Right to match the highest closing bid made by another franchise for their former player", "Immediate trade with any rival team", "Doubles the team's available purse"],
        correct: 1,
        exp: "RTM allows a franchise to secure their previous player by matching the final winning bid reached on the auction floor."
      },
      {
        q: "How does the Impact Player substitution rule alter auction valuation strategies?",
        options: ["Reduces the maximum squad size to 11", "Enables teams to invest heavily in specialist death hitters or bowlers rather than multi-dimensional utility players", "Bans overseas players from bowling", "Eliminates the powerplay"],
        correct: 1,
        exp: "Because an impact substitution is allowed during a match, squads can play a pure batter and substitute in a dedicated specialist bowler."
      }
    ]
  },
  aippm: {
    id: "aippm",
    code: "AIPPM",
    name: "All India Political Parties Meet",
    number: "04",
    symbol: "▥",
    focus: "POCSO Act implementation, child protection, juvenile justice & misuse safeguards",
    agenda: "Reviewing and Strengthening the Implementation of the POCSO Act, 2012, while Balancing Child Protection, Juvenile Justice, and Safeguards Against Legal Misuse.",
    overview: "All India Political Parties Meet convenes to examine structural enforcement of the Protection of Children from Sexual Offences (POCSO) Act, 2012. Leaders address judicial delays, child-friendly courts, forensic accountability, the delicate age-of-consent balance in juvenile justice, and statutory safeguards against false complaints and legal misuse.",
    guideSections: [
      {
        id: "statutory",
        title: "Statutory Machinery & Child Protection Mandates",
        content: `The Protection of Children from Sexual Offences (POCSO) Act, 2012, established child-friendly reporting, in-camera trials, and mandatory reporting obligations. However, structural bottlenecks in forensic labs, police training, and Child Welfare Committees (CWCs) cause prolonged trial delays.`
      },
      {
        id: "courts",
        title: "Fast-Track Special Courts (FTSCs) & Trial Timelines",
        content: `While Section 35(2) mandates trial conclusion within one year of cognisance, nationwide pendency remains high. Leaders must address dedicated judicial infrastructure, forensic medical examiner staffing, and comprehensive compensation disbursement under victim welfare schemes.`
      },
      {
        id: "safeguards",
        title: "Adolescent Consensual Relationships & Safeguards Against Misuse",
        content: `Multiple High Courts and the Law Commission have highlighted the criminalisation of adolescent romantic relationships under strict statutory age-of-consent laws. Parliamentarians must debate introducing judicial discretion, statutory safeguards against malicious misuse, and clear delineations between predatory exploitation and consensual adolescent behavior.`
      }
    ],
    quiz: [
      {
        q: "Under Section 35(2) of the POCSO Act (2012), what is the stipulated timeframe for completing a trial?",
        options: ["Within 60 days", "Within 6 months", "Within one year from the date of taking cognisance", "Within 3 years"],
        correct: 2,
        exp: "Section 35(2) mandates that the Special Court shall complete the trial, as far as possible, within one year from taking cognisance."
      },
      {
        q: "What key challenge regarding adolescent relationships has been frequently highlighted by Indian High Courts under POCSO?",
        options: ["Complete absence of child-friendly courts", "Criminalisation of consensual teenage relationships under rigid statutory age-of-consent provisions without judicial discretion", "Lack of police jurisdiction", "Abolition of the Juvenile Justice Act"],
        correct: 1,
        exp: "Courts have repeatedly noted that strict statutory rape provisions sometimes result in the criminalisation of consensual adolescent relationships, prompting debate on judicial discretion."
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
  if (quizForm) {
    quizForm.innerHTML = data.quiz.map((item, qIdx) => `
      <fieldset class="quiz-question">
        <legend><span>Question ${qIdx + 1}:</span> ${item.q}</legend>
        ${item.options.map((opt, oIdx) => `
          <label id="q${qIdx}_opt${oIdx}">
            <input type="radio" name="q_${qIdx}" value="${oIdx}" required>
            ${opt}
          </label>
        `).join('')}
        <div class="feedback" id="feedback_${qIdx}" style="display:none;margin-top:12px"></div>
      </fieldset>
    `).join('') + `
      <div class="quiz-actions" style="margin-top:20px">
        <button class="button" type="submit">Submit &amp; Check Answers</button>
        <span id="quizScoreText" style="margin-left:15px;font-weight:700;color:var(--gold)"></span>
      </div>
    `;

    quizForm.onsubmit = function(e) {
      e.preventDefault();
      let score = 0;
      data.quiz.forEach((item, qIdx) => {
        const selected = quizForm.elements[`q_${qIdx}`].value;
        const fbEl = document.getElementById(`feedback_${qIdx}`);
        fbEl.style.display = 'block';

        if (parseInt(selected) === item.correct) {
          score++;
          fbEl.innerHTML = `<span style="color:#72d6ae;font-weight:700">✓ Correct!</span> ${item.exp}`;
          document.getElementById(`q${qIdx}_opt${selected}`).className = 'correct';
        } else {
          fbEl.innerHTML = `<span style="color:#f87171;font-weight:700">✗ Incorrect.</span> Correct answer: <strong>${item.options[item.correct]}</strong>. ${item.exp}`;
          document.getElementById(`q${qIdx}_opt${selected}`).className = 'incorrect';
          document.getElementById(`q${qIdx}_opt${item.correct}`).className = 'correct';
        }
      });
      document.getElementById('quizScoreText').textContent = `Your Score: ${score} / ${data.quiz.length}`;
    };
  }

  // Handle committees without chits (IPL and AIPPM have no chits)
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

  // In IPL and AIPPM there are no chits
  const isChitEnabled = (commKey === 'unga' || commKey === 'uncsw');
  const activeColumns = isChitEnabled ? [
    "Position Paper",
    "Press Release",
    "Working Paper",
    "Speech",
    "POI",
    "Motions",
    "POO (Ruled)",
    "Yields",
    "Substantive Chit",
    "POI Chits"
  ] : [
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
  if (cardChits) cardChits.style.display = isChitEnabled ? '' : 'none';

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
function switchTab(tabId) {
  document.querySelectorAll('.portal-tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.portal-tabs button').forEach(el => el.classList.remove('active'));

  const target = document.getElementById(`tab-${tabId}`);
  if (target) target.style.display = 'block';

  const btn = document.getElementById(`btn-${tabId}`);
  if (btn) btn.classList.add('active');
}

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

  // Check URL hash for direct tab navigation (e.g. portal.html?committee=unga#tally)
  if (window.location.hash === '#tally' || window.location.hash === '#tab-tally' || window.location.search.includes('tab=tally')) {
    switchTab('tally');
  }
});

// Real-time reactive updates from Google Sheets / API
window.addEventListener('gtmun:submissions-updated', () => {
  const commKey = getCurrentCommittee();
  loadCommitteeTally(commKey);
  renderCommitteeChits(commKey);
});
