/* World Cup Bristow Challenge v0.5
   Foundation hardening: admin controls, backup/import, locks, Firebase health tools. */

const firebaseConfig = {
  apiKey: "AIzaSyAHC7oTUWskNA2B3AOuWs1FTT9pNMnkczI",
  authDomain: "world-cup-2026-7c008.firebaseapp.com",
  databaseURL: "https://world-cup-2026-7c008-default-rtdb.firebaseio.com",
  projectId: "world-cup-2026-7c008",
  storageBucket: "world-cup-2026-7c008.firebasestorage.app",
  messagingSenderId: "310577333712",
  appId: "1:310577333712:web:7ce4e0b973da0059aca5d5",
  measurementId: "G-7WR8YLC7YV"
};

const DB_PATH = "worldCupBristowChallenge/v04";
const LOCAL_KEY = "world_cup_bristow_challenge_v04";
const DEFAULT_MEMBERS = ["Ben", "Margo", "Chloe", "Olivia"];
const DEFAULT_SCORING = { matchWinner: 2, groupDraw: 3, r32: 2, r16: 4, qf: 6, sf: 10, finalist: 15, champion: 25 };

const TEAMS = {
  MEX:"🇲🇽 Mexico", RSA:"🇿🇦 South Africa", KOR:"🇰🇷 South Korea", CZE:"🇨🇿 Czechia", CAN:"🇨🇦 Canada", BIH:"🇧🇦 Bosnia & Herzegovina", QAT:"🇶🇦 Qatar", SUI:"🇨🇭 Switzerland",
  BRA:"🇧🇷 Brazil", MAR:"🇲🇦 Morocco", HTI:"🇭🇹 Haiti", SCO:"🏴 Scotland", USA:"🇺🇸 United States", PAR:"🇵🇾 Paraguay", AUS:"🇦🇺 Australia", TUR:"🇹🇷 Turkey",
  GER:"🇩🇪 Germany", CUW:"🇨🇼 Curaçao", CIV:"🇨🇮 Ivory Coast", ECU:"🇪🇨 Ecuador", NED:"🇳🇱 Netherlands", JPN:"🇯🇵 Japan", SWE:"🇸🇪 Sweden", TUN:"🇹🇳 Tunisia",
  BEL:"🇧🇪 Belgium", EGY:"🇪🇬 Egypt", IRI:"🇮🇷 Iran", NZL:"🇳🇿 New Zealand", ESP:"🇪🇸 Spain", CPV:"🇨🇻 Cape Verde", KSA:"🇸🇦 Saudi Arabia", URU:"🇺🇾 Uruguay",
  FRA:"🇫🇷 France", SEN:"🇸🇳 Senegal", IRQ:"🇮🇶 Iraq", NOR:"🇳🇴 Norway", ARG:"🇦🇷 Argentina", DZA:"🇩🇿 Algeria", AUT:"🇦🇹 Austria", JOR:"🇯🇴 Jordan",
  POR:"🇵🇹 Portugal", COD:"🇨🇩 DR Congo", UZB:"🇺🇿 Uzbekistan", COL:"🇨🇴 Colombia", ENG:"🏴 England", CRO:"🇭🇷 Croatia", GHA:"🇬🇭 Ghana", PAN:"🇵🇦 Panama"
};
const TEAM_OPTIONS = Object.entries(TEAMS).map(([code, name]) => ({code, name}));

function makeMatch(id, group, kickoff, home, away, status, homeScore=null, awayScore=null){ return { id, group, kickoff, home, away, status, homeScore, awayScore, stage:"group" }; }
const DEMO = {
  groups: { A:["MEX","RSA","KOR","CZE"], B:["CAN","BIH","QAT","SUI"], C:["BRA","MAR","HTI","SCO"], D:["USA","PAR","AUS","TUR"], E:["GER","CUW","CIV","ECU"], F:["NED","JPN","SWE","TUN"], G:["BEL","EGY","IRI","NZL"], H:["ESP","CPV","KSA","URU"], I:["FRA","SEN","IRQ","NOR"], J:["ARG","DZA","AUT","JOR"], K:["POR","COD","UZB","COL"], L:["ENG","CRO","GHA","PAN"] },
  matches: [
    makeMatch("66456904","A","2026-06-11T14:00:00-05:00","MEX","RSA","final",2,0), makeMatch("66456906","A","2026-06-11T21:00:00-05:00","KOR","CZE","final",2,1),
    makeMatch("66456916","B","2026-06-12T14:00:00-05:00","CAN","BIH","final",1,1), makeMatch("66456940","D","2026-06-12T20:00:00-05:00","USA","PAR","final",4,1),
    makeMatch("66456918","B","2026-06-13T14:00:00-05:00","QAT","SUI","final",1,1), makeMatch("66456928","C","2026-06-13T17:00:00-05:00","BRA","MAR","final",1,1),
    makeMatch("66456930","C","2026-06-13T20:00:00-05:00","HTI","SCO","final",0,1), makeMatch("66456942","D","2026-06-13T23:00:00-05:00","AUS","TUR","final",2,0),
    makeMatch("66457070","E","2026-06-14T12:00:00-05:00","GER","CUW","final",7,1), makeMatch("66456968","F","2026-06-14T15:00:00-05:00","NED","JPN","final",2,2),
    makeMatch("66457072","E","2026-06-14T18:00:00-05:00","CIV","ECU","final",1,0), makeMatch("66456910","A","2026-06-18T11:00:00-05:00","CZE","RSA","scheduled"),
    makeMatch("66456922","B","2026-06-18T14:00:00-05:00","SUI","BIH","scheduled"), makeMatch("66456920","B","2026-06-18T17:00:00-05:00","CAN","QAT","scheduled"),
    makeMatch("66456908","A","2026-06-18T20:00:00-05:00","MEX","KOR","scheduled"), makeMatch("66456944","D","2026-06-19T14:00:00-05:00","USA","AUS","scheduled"),
    makeMatch("66456934","C","2026-06-19T17:00:00-05:00","SCO","MAR","scheduled"), makeMatch("66456932","C","2026-06-19T19:30:00-05:00","BRA","HTI","scheduled"),
    makeMatch("66456946","D","2026-06-19T22:00:00-05:00","TUR","PAR","scheduled"), makeMatch("66456972","F","2026-06-20T12:00:00-05:00","NED","SWE","scheduled"),
    makeMatch("66457074","E","2026-06-20T15:00:00-05:00","GER","CIV","scheduled"), makeMatch("66457076","E","2026-06-20T19:00:00-05:00","ECU","CUW","scheduled")
  ]
};
const BRACKET_ROUNDS = [
  { key:"r32", title:"Round of 32", weightKey:"r32", games:Array.from({length:16},(_,i)=>`R32-${i+1}`) },
  { key:"r16", title:"Round of 16", weightKey:"r16", games:Array.from({length:8},(_,i)=>`R16-${i+1}`) },
  { key:"qf", title:"Quarterfinals", weightKey:"qf", games:Array.from({length:4},(_,i)=>`QF-${i+1}`) },
  { key:"sf", title:"Semifinals", weightKey:"sf", games:Array.from({length:2},(_,i)=>`SF-${i+1}`) },
  { key:"final", title:"Final", weightKey:"champion", games:["FINAL"] }
];

const R32_SLOTS = [
  ["1A","3C/D/E"], ["1C","3A/B/F"], ["1E","2F"], ["1G","2H"],
  ["1I","3J/K/L"], ["1K","2L"], ["1B","3A/E/F"], ["1D","2C"],
  ["1F","2E"], ["1H","2G"], ["1J","2I"], ["1L","2K"],
  ["2A","2B"], ["2D","3B/C/E"], ["2J","3I/K/L"], ["2K","3G/H/I"]
];

const BRACKET_META = {};
R32_SLOTS.forEach((slots, idx) => {
  const n = idx + 1;
  BRACKET_META[`R32-${n}`] = { date: idx < 8 ? "Jun 28–30" : "Jul 1–3", a:slots[0], b:slots[1] };
});
for (let i=1;i<=8;i++) BRACKET_META[`R16-${i}`] = { date:"Jul 4–7", aFrom:`R32-${(i*2)-1}`, bFrom:`R32-${i*2}` };
for (let i=1;i<=4;i++) BRACKET_META[`QF-${i}`] = { date:"Jul 9–11", aFrom:`R16-${(i*2)-1}`, bFrom:`R16-${i*2}` };
for (let i=1;i<=2;i++) BRACKET_META[`SF-${i}`] = { date:"Jul 14–15", aFrom:`QF-${(i*2)-1}`, bFrom:`QF-${i*2}` };
BRACKET_META["FINAL"] = { date:"Jul 19", aFrom:"SF-1", bFrom:"SF-2" };
const ALL_BRACKET_MATCH_IDS = BRACKET_ROUNDS.flatMap(r=>r.games);

let state = defaultState();
let dbRef = null;
let remoteReady = false;
let isRemoteUpdate = false;
let saveTimer = null;
let currentMatchFilter = "all";
let currentTournamentPanel = "groups";

function defaultState(){
  return { settings:{ appName:"World Cup Bristow Challenge", dataSource:"Demo", apiMode:"demo", bracketsLocked:false, matchPicksLocked:false, scoring:{...DEFAULT_SCORING} }, family: DEFAULT_MEMBERS.map((name, i)=>({ id: slug(name), name, colorIndex:i, active:true })), picks:{ brackets:{}, matches:{} }, tournament: DEMO, updatedAt: Date.now(), version:"0.5" };
}
function normalizeState(raw){
  const base = defaultState();
  const merged = { ...base, ...(raw||{}) };
  merged.settings = { ...base.settings, ...(raw?.settings||{}) };
  merged.settings.scoring = { ...base.settings.scoring, ...(raw?.settings?.scoring||{}) };
  merged.family = Array.isArray(raw?.family) && raw.family.length ? raw.family : base.family;
  merged.picks = { brackets:{ ...(raw?.picks?.brackets||{}) }, matches:{ ...(raw?.picks?.matches||{}) } };
  merged.tournament = { ...base.tournament, ...(raw?.tournament||{}) };
  if (!Array.isArray(merged.tournament.matches)) merged.tournament.matches = base.tournament.matches;
  return merged;
}
function slug(name){ return String(name||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") || `member-${Date.now()}`; }
function saveLocal(){ localStorage.setItem(LOCAL_KEY, JSON.stringify(state)); }
function scheduleSave(){ saveLocal(); if (isRemoteUpdate || !dbRef) return; clearTimeout(saveTimer); saveTimer = setTimeout(()=>{ state.updatedAt=Date.now(); dbRef.set(state); }, 300); }
function setBadge(text, kind="good"){ const el=document.getElementById("connectionBadge"); el.className=`badge ${kind}`; el.textContent=text; }
function initFirebase(){
  try {
    firebase.initializeApp(firebaseConfig);
    dbRef = firebase.database().ref(DB_PATH);
    dbRef.on("value", snap => {
      isRemoteUpdate = true;
      const val = snap.val();
      if (val) state = normalizeState(val); else dbRef.set(state);
      remoteReady = true;
      saveLocal(); renderAll(); setBadge("Firebase connected", "good");
      isRemoteUpdate = false;
    }, err => { console.error(err); setBadge("Firebase error", "bad"); });
  } catch (err) { console.error(err); setBadge("Local mode", "warn"); }
}

function team(code){ return TEAMS[code] || code || "TBD"; }
function members(){ return state.family.filter(m=>m.active !== false); }
function fmtDate(iso){ return new Date(iso).toLocaleString("en-US", { timeZone:"America/Chicago", weekday:"short", month:"short", day:"numeric", hour:"numeric", minute:"2-digit" }); }
function winnerCode(match){ if(match.homeScore > match.awayScore) return match.home; if(match.awayScore > match.homeScore) return match.away; return "DRAW"; }
function matchScore(match){ return match.status === "final" ? `${match.homeScore} - ${match.awayScore}` : "vs"; }

function navigate(view){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  document.getElementById(view).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active", b.dataset.view===view));
  window.scrollTo({top:0, behavior:"smooth"});
}
document.querySelectorAll(".nav-btn").forEach(btn => btn.addEventListener("click", () => navigate(btn.dataset.view)));

function renderAll(){
  document.getElementById("appTitle").textContent = state.settings.appName;
  renderHome(); renderMatches(); renderTournament(); renderFamily(); renderAdmin();
}
function card(title, body, cls=""){ return `<div class="card ${cls}"><h2>${title}</h2>${body}</div>`; }
function renderHome(){
  const leaderboard = getLeaderboard();
  const next = state.tournament.matches.filter(m=>m.status!=="final").slice(0,3);
  const complete = state.tournament.matches.filter(m=>m.status==="final").length;
  const total = state.tournament.matches.length;
  document.getElementById("home").innerHTML = `
    <div class="grid two">
      ${card("Current Leaderboard", leaderboard.length ? leaderboard.slice(0,4).map((p,i)=>`<div class="mini-row"><span><b>${i+1}. ${p.name}</b><small>${p.pending} pending picks</small></span><b>${p.total} pts</b></div>`).join("") : `<p class="muted">No members yet.</p>`)}
      ${card("Next Matches", next.length ? next.map(m=>`<div class="mini-row"><span><b>${team(m.home)} vs ${team(m.away)}</b><small>${fmtDate(m.kickoff)} CT • Group ${m.group}</small></span><span class="status">Scheduled</span></div>`).join("") : `<p class="muted">No upcoming demo matches.</p>`)}
    </div>
    <div class="grid three">
      ${card("Firebase", `<div class="big-number">${remoteReady ? "Live" : "Loading"}</div><p class="muted">Shared data path: <code>${DB_PATH}</code></p>`)}
      ${card("Members", `<div class="big-number">${members().length}</div><p class="muted">Managed from Admin.</p>`)}
      ${card("Demo Data", `<div class="big-number">${complete}/${total}</div><p class="muted">Completed demo matches.</p>`)}
    </div>`;
}
function renderMatches(){
  const allMatches = [...state.tournament.matches].sort((a,b)=>new Date(a.kickoff)-new Date(b.kickoff));
  const filtered = allMatches.filter(m => currentMatchFilter === "all" || (currentMatchFilter === "completed" ? m.status === "final" : m.status !== "final"));
  const grouped = {};
  filtered.forEach(m => { const key = new Date(m.kickoff).toLocaleDateString("en-US", {timeZone:"America/Chicago", weekday:"long", month:"long", day:"numeric"}); (grouped[key] ||= []).push(m); });
  const counts = { all: allMatches.length, completed: allMatches.filter(m=>m.status==="final").length, upcoming: allMatches.filter(m=>m.status!=="final").length };
  document.getElementById("matches").innerHTML = card("Matches", `
    <p class="sub">Demo match data shown in Central time. This section is ready for the open/API-Football adapter.</p>
    <div class="mode-tabs">
      <button class="${currentMatchFilter==='all'?'active':''}" onclick="setMatchFilter('all')">All <span>${counts.all}</span></button>
      <button class="${currentMatchFilter==='completed'?'active':''}" onclick="setMatchFilter('completed')">Completed <span>${counts.completed}</span></button>
      <button class="${currentMatchFilter==='upcoming'?'active':''}" onclick="setMatchFilter('upcoming')">Upcoming <span>${counts.upcoming}</span></button>
    </div>
    <div class="match-list">${Object.keys(grouped).length ? Object.entries(grouped).map(([date, games])=>`<div class="day-card"><div class="day-head"><b>${date}</b><span>${games.length} game${games.length>1?"s":""}</span></div>${games.map(renderGameRow).join("")}</div>`).join("") : `<p class="muted">No matches in this view.</p>`}</div>
  `);
}
function setMatchFilter(filter){ currentMatchFilter = filter; renderMatches(); }
function renderGameRow(m){
  return `<div class="game-row"><div class="game-time">${new Date(m.kickoff).toLocaleTimeString("en-US", {timeZone:"America/Chicago", hour:"numeric", minute:"2-digit"})}</div><div><div class="game-team ${winnerCode(m)===m.home?"winner":""}"><span>${team(m.home)}</span><b>${m.status==="final"?m.homeScore:""}</b></div><div class="game-team ${winnerCode(m)===m.away?"winner":""}"><span>${team(m.away)}</span><b>${m.status==="final"?m.awayScore:""}</b></div></div><span class="status ${m.status}">${m.status==="final"?"Final":"Scheduled"}</span></div>`;
}
function standings(){
  const st = {};
  Object.entries(state.tournament.groups).forEach(([g, teams]) => teams.forEach(t => st[t] = { team:t, group:g, P:0,W:0,D:0,L:0,GF:0,GA:0,GD:0,PTS:0 }));
  state.tournament.matches.filter(m=>m.status==="final").forEach(m => {
    const h=st[m.home], a=st[m.away]; if(!h||!a) return; h.P++; a.P++; h.GF+=m.homeScore; h.GA+=m.awayScore; a.GF+=m.awayScore; a.GA+=m.homeScore;
    if(m.homeScore>m.awayScore){ h.W++; a.L++; h.PTS+=3; } else if(m.awayScore>m.homeScore){ a.W++; h.L++; a.PTS+=3; } else { h.D++; a.D++; h.PTS++; a.PTS++; }
    h.GD=h.GF-h.GA; a.GD=a.GF-a.GA;
  });
  return st;
}
function renderTournament(){
  const st = standings();
  const groupsHtml = Object.entries(state.tournament.groups).map(([g, arr]) => {
    const rows = [...arr].map(t=>st[t]).sort((a,b)=>b.PTS-a.PTS || b.GD-a.GD || b.GF-a.GF).map(r=>`<tr><td class="team-name">${team(r.team)}</td><td>${r.P}</td><td>${r.W}</td><td>${r.D}</td><td>${r.L}</td><td>${r.GD}</td><td><b>${r.PTS}</b></td></tr>`).join("");
    return `<div class="group"><div class="group-title"><b>Group ${g}</b><span class="pill">${arr.length} teams</span></div><table><thead><tr><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }).join("");
  document.getElementById("tournament").innerHTML = card("Tournament", `
    <p class="sub">View group standings or the official knockout bracket shell. Group tables are calculated from final demo matches only.</p>
    <div class="mode-tabs">
      <button class="${currentTournamentPanel==='groups'?'active':''}" onclick="setTournamentPanel('groups')">Groups</button>
      <button class="${currentTournamentPanel==='bracket'?'active':''}" onclick="setTournamentPanel('bracket')">Knockout Bracket</button>
    </div>
    <div id="groupsPanel" class="${currentTournamentPanel==='groups'?'':'hide'}"><div class="groups">${groupsHtml}</div></div>
    <div id="tournamentBracketPanel" class="${currentTournamentPanel==='bracket'?'':'hide'}">${renderTournamentBracket()}</div>
  `);
}
function setTournamentPanel(panel){ currentTournamentPanel = panel; renderTournament(); }
function sourceWinnerLabel(matchId){ return `Winner ${matchId}`; }
function sideLabel(meta, side){
  const slot = side === "A" ? (meta.a || (meta.aFrom ? sourceWinnerLabel(meta.aFrom) : "TBD")) : (meta.b || (meta.bFrom ? sourceWinnerLabel(meta.bFrom) : "TBD"));
  return slot;
}
function renderTournamentBracket(){
  return `<div class="bracket-scroll"><div class="family-bracket tournament-bracket">${BRACKET_ROUNDS.map(round=>`<div class="round"><h3>${round.title}</h3>${round.games.map(id=>{
    const meta=BRACKET_META[id];
    return `<div class="fb-match official"><small><span>${id}</span><span>${meta.date} CT</span></small><div class="slot-label">${sideLabel(meta,"A")}</div><div class="slot-line">${renderBracketSlotDisplay(null, id, "A", false)}</div><div class="slot-label">${sideLabel(meta,"B")}</div><div class="slot-line">${renderBracketSlotDisplay(null, id, "B", false)}</div><div class="muted tiny">Actual teams will populate as group/knockout results are confirmed.</div></div>`
  }).join("")}</div>`).join("")}</div></div>`;
}

function renderFamily(){
  const owner = document.getElementById("pickOwner")?.value || members()[0]?.id || "";
  document.getElementById("family").innerHTML = card("Family Picks", `
    <p class="sub">Choose a family member and make bracket or match-by-match picks. Pending games do not award points.</p>
    <div class="builder-bar"><div><label>Family member</label><select id="pickOwner" onchange="renderFamily()">${members().map(m=>`<option value="${m.id}" ${m.id===owner?"selected":""}>${m.name}</option>`).join("")}</select></div></div>
    <div class="mode-tabs"><button class="active" onclick="showPickPanel('bracketPanel',this)">Full Bracket</button><button onclick="showPickPanel('matchPanel',this)">Match-by-Match</button></div>
    <div id="bracketPanel" class="pick-panel">${renderBracket(owner)}</div>
    <div id="matchPanel" class="pick-panel hide">${renderMatchPicks(owner)}</div>
  `);
}

function showPickPanel(id, btn){ document.querySelectorAll(".pick-panel").forEach(p=>p.classList.add("hide")); document.getElementById(id).classList.remove("hide"); btn.parentElement.querySelectorAll("button").forEach(b=>b.classList.remove("active")); btn.classList.add("active"); }
function groupSlotCandidates(slot){
  if(!slot || slot.startsWith("TBD") || slot.startsWith("Winner")) return [];
  const exact = slot.match(/^([12])([A-L])$/);
  if(exact) return state.tournament.groups[exact[2]] || [];
  const third = slot.match(/^3([A-L](?:\/[A-L])*)$/);
  if(third) return third[1].split('/').flatMap(g => state.tournament.groups[g] || []);
  return [];
}
function getBracket(owner){
  const b = state.picks.brackets[owner] || {};
  syncAutoAdvancement(b);
  return b;
}
function setBracket(owner, bracket){ state.picks.brackets[owner]=bracket; scheduleSave(); renderFamily(); }
function syncAutoAdvancement(b){
  ALL_BRACKET_MATCH_IDS.forEach(id => {
    const meta = BRACKET_META[id];
    if(meta.aFrom){
      if(b[`${meta.aFrom}-W`]) b[`${id}-A`] = b[`${meta.aFrom}-W`];
      else delete b[`${id}-A`];
    }
    if(meta.bFrom){
      if(b[`${meta.bFrom}-W`]) b[`${id}-B`] = b[`${meta.bFrom}-W`];
      else delete b[`${id}-B`];
    }
    const a=b[`${id}-A`], c=b[`${id}-B`], w=b[`${id}-W`];
    if(w && ![a,c].includes(w)) delete b[`${id}-W`];
  });
}
function sideOptions(owner, id, side){
  const meta=BRACKET_META[id], b=getBracket(owner);
  if(side === "A" && meta.aFrom) return b[`${meta.aFrom}-W`] ? [b[`${meta.aFrom}-W`]] : [];
  if(side === "B" && meta.bFrom) return b[`${meta.bFrom}-W`] ? [b[`${meta.bFrom}-W`]] : [];
  const label = side === "A" ? meta.a : meta.b;
  return groupSlotCandidates(label);
}
function renderBracketSlotDisplay(owner, id, side, predictionMode=true){
  const meta=BRACKET_META[id], b=owner ? getBracket(owner) : {};
  const key=`${id}-${side}`;
  const source = side === "A" ? meta.aFrom : meta.bFrom;
  const fixedLabel = side === "A" ? meta.a : meta.b;
  if(source) return b[key] ? team(b[key]) : `Winner ${source}`;
  if(predictionMode) return b[key] ? team(b[key]) : (fixedLabel || "TBD");
  return fixedLabel || "TBD";
}
function renderTeamSelect(owner,id,side){
  const meta=BRACKET_META[id], b=getBracket(owner), key=`${id}-${side}`;
  const source = side === "A" ? meta.aFrom : meta.bFrom;
  const label = side === "A" ? (meta.a || (source ? `Winner ${source}` : "TBD")) : (meta.b || (source ? `Winner ${source}` : "TBD"));
  const opts = sideOptions(owner,id,side);
  const val = b[key] || "";
  const locked = !!source || !!state.settings.bracketsLocked;
  return `<div class="fb-team"><b>${label}</b><select ${locked || !opts.length ? "disabled" : ""} onchange="saveBracketSide('${owner}','${id}','${side}',this.value)"><option value="">${state.settings.bracketsLocked ? "Bracket locked" : (locked ? "Auto from prior round" : "Select team…")}</option>${opts.map(c=>`<option value="${c}" ${val===c?"selected":""}>${team(c)}</option>`).join("")}</select><div class="muted tiny">${val ? team(val) : (locked ? "Waiting on prior winner" : `Possible from ${label}`)}</div></div>`;
}
function renderWinnerSelect(owner,id){
  const b=getBracket(owner), a=b[`${id}-A`], c=b[`${id}-B`], val=b[`${id}-W`]||"";
  const opts=[a,c].filter(Boolean);
  return `<label class="winner-label">Winner</label><select ${opts.length<2 || state.settings.bracketsLocked ? "disabled" : ""} onchange="saveBracketWinner('${owner}','${id}',this.value)"><option value="">${state.settings.bracketsLocked ? "Bracket locked" : (opts.length<2 ? "Choose both teams first" : "Pick winner…")}</option>${opts.map(o=>`<option value="${o}" ${val===o?"selected":""}>${team(o)}</option>`).join("")}</select>${val?`<div class="winner-tag">Advances: ${team(val)}</div>`:""}`;
}
function renderBracket(owner){
  if(!owner) return `<p class="muted">Add a family member first.</p>`;
  const b=getBracket(owner);
  return `<div class="bracket-scroll"><div class="family-bracket">${BRACKET_ROUNDS.map(round=>`<div class="round"><h3>${round.title}</h3>${round.games.map(id=>{
    const meta=BRACKET_META[id];
    return `<div class="fb-match"><small><span>${id}</span><span>${meta.date} CT</span></small>${renderTeamSelect(owner,id,"A")}${renderTeamSelect(owner,id,"B")}${renderWinnerSelect(owner,id)}</div>`
  }).join("")}</div>`).join("")}</div></div>`;
}
function saveBracketSide(owner,id,side,value){
  if(state.settings.bracketsLocked){ alert("Bracket picks are currently locked."); return; }
  const b={...getBracket(owner)};
  if(value) b[`${id}-${side}`]=value; else delete b[`${id}-${side}`];
  if(b[`${id}-W`] && ![b[`${id}-A`], b[`${id}-B`]].includes(b[`${id}-W`])) delete b[`${id}-W`];
  clearDownstream(b,id); setBracket(owner,b);
}
function saveBracketWinner(owner,id,value){
  if(state.settings.bracketsLocked){ alert("Bracket picks are currently locked."); return; }
  const b={...getBracket(owner)};
  if(value) b[`${id}-W`]=value; else delete b[`${id}-W`];
  clearDownstream(b,id); syncAutoAdvancement(b); setBracket(owner,b);
}
function clearDownstream(b,id){
  const toClear = new Set();
  let frontier = [id];
  while(frontier.length){
    const cur = frontier.shift();
    for(const next of ALL_BRACKET_MATCH_IDS){
      const meta=BRACKET_META[next];
      if(meta.aFrom===cur || meta.bFrom===cur){
        toClear.add(next); frontier.push(next);
      }
    }
  }
  toClear.forEach(x=>{ delete b[`${x}-A`]; delete b[`${x}-B`]; delete b[`${x}-W`]; });
}

function renderMatchPicks(owner){
  const picks = state.picks.matches[owner] || {};
  const upcoming = state.tournament.matches.filter(m=>m.status!=="final");
  if(!upcoming.length) return `<p class="muted">No upcoming demo games.</p>`;
  return `<div class="match-list">${upcoming.map(m=>`<div class="upcoming-pick-card"><div class="day-head"><b>${team(m.home)} vs ${team(m.away)}</b><span>${fmtDate(m.kickoff)} CT</span></div><div class="choice-buttons"><button class="${picks[m.id]===m.home?"selected":""}" ${state.settings.matchPicksLocked ? "disabled" : ""} onclick="saveMatchPick('${owner}','${m.id}','${m.home}')">${team(m.home)}</button><button class="${picks[m.id]==='DRAW'?"selected":""}" ${state.settings.matchPicksLocked ? "disabled" : ""} onclick="saveMatchPick('${owner}','${m.id}','DRAW')">Draw</button><button class="${picks[m.id]===m.away?"selected":""}" ${state.settings.matchPicksLocked ? "disabled" : ""} onclick="saveMatchPick('${owner}','${m.id}','${m.away}')">${team(m.away)}</button></div></div>`).join("")}</div>`;
}
function saveMatchPick(owner, matchId, pick){ if(state.settings.matchPicksLocked){ alert("Match-by-match picks are currently locked."); return; } state.picks.matches[owner] = { ...(state.picks.matches[owner]||{}), [matchId]:pick }; scheduleSave(); renderFamily(); renderHome(); }

function bracketScore(owner){ const b=getBracket(owner); let pts=0,pending=0,correct=0,wrong=0; Object.keys(b).forEach(k=>{ if(k.endsWith("-W")) pending++; }); return {pts,correct,wrong,pending}; }
function matchScoreBreakdown(owner){ const picks=state.picks.matches[owner]||{}; let pts=0,correct=0,wrong=0,pending=0; Object.entries(picks).forEach(([id,pick])=>{ const m=state.tournament.matches.find(x=>x.id===id); if(!m || m.status!=="final"){ pending++; return; } const actual=winnerCode(m); if(pick===actual){ pts += actual==="DRAW" ? Number(state.settings.scoring.groupDraw) : Number(state.settings.scoring.matchWinner); correct++; } else wrong++; }); return {pts,correct,wrong,pending}; }
function getLeaderboard(){ return members().map(m=>{ const bs=bracketScore(m.id), ms=matchScoreBreakdown(m.id); return {id:m.id,name:m.name,total:bs.pts+ms.pts, bracket:bs, match:ms, pending:bs.pending+ms.pending}; }).sort((a,b)=>b.total-a.total || a.name.localeCompare(b.name)); }
function renderLeaderboardRows(){ const list=getLeaderboard(); return `<div class="leader">${list.map((p,i)=>`<div class="leader-row"><div class="leader-top"><div><b>${i+1}. ${p.name}</b><small>Bracket ${p.bracket.pts} • Match picks ${p.match.pts}</small></div><b>${p.total} pts</b></div><div class="leader-breakdown"><span class="correct">✓ ${p.bracket.correct+p.match.correct}</span><span class="wrong">✕ ${p.bracket.wrong+p.match.wrong}</span><span class="pending">⏳ ${p.pending}</span></div></div>`).join("")}</div>`; }

function renderAdmin(){
  const dataHealth = getDataHealth();
  document.getElementById("admin").innerHTML = `
    ${card("Admin Foundation", `<p class="sub">Commissioner tools for the World Cup Bristow Challenge. These settings are stored in Firebase and shared across devices.</p><div class="admin-grid"><button class="btn" onclick="seedDefaults()">Seed Family Defaults</button><button class="ghost-btn" onclick="exportState()">Export JSON Backup</button><label class="file-button">Import JSON Backup<input type="file" accept="application/json" onchange="importStateFile(this.files[0])"></label><button class="danger-btn" onclick="resetPicksConfirm()">Clear All Picks</button><button class="danger-btn" onclick="resetDemoConfirm()">Reset All Data</button></div><p class="muted tiny">Package: v0.5 • Database path: <code>${DB_PATH}</code></p>`)}
    <div class="grid three">
      ${card("Firebase Health", `<div class="big-number">${remoteReady ? "Live" : "Local"}</div><p class="muted">${remoteReady ? "Connected and syncing." : "Using local fallback until Firebase connects."}</p>`)}
      ${card("Pick Locks", `<div class="toggle-row"><span>Bracket locked</span><input type="checkbox" ${state.settings.bracketsLocked?'checked':''} onchange="updateSetting('bracketsLocked',this.checked)"></div><div class="toggle-row"><span>Match picks locked</span><input type="checkbox" ${state.settings.matchPicksLocked?'checked':''} onchange="updateSetting('matchPicksLocked',this.checked)"></div>`)}
      ${card("Data Health", `<div class="mini-row"><span><b>Members</b><small>Active family members</small></span><b>${dataHealth.members}</b></div><div class="mini-row"><span><b>Bracket picks</b><small>Saved winner selections</small></span><b>${dataHealth.bracketWinners}</b></div><div class="mini-row"><span><b>Match picks</b><small>Saved game predictions</small></span><b>${dataHealth.matchPicks}</b></div>`)}
    </div>
    <div class="grid two">
      ${card("App Settings", `<label>App name</label><input id="settingAppName" value="${escapeHtml(state.settings.appName)}" oninput="updateSetting('appName',this.value)"><label>Data source</label><select onchange="updateSetting('dataSource',this.value)"><option ${state.settings.dataSource==='Demo'?'selected':''}>Demo</option><option ${state.settings.dataSource==='Open API'?'selected':''}>Open API</option><option ${state.settings.dataSource==='API-Football'?'selected':''}>API-Football</option></select><p class="muted tiny">The API selector is stored now; the actual adapter comes in the next sprint.</p>`)}
      ${card("Family Members", `<div class="builder-bar compact"><input id="newMemberName" placeholder="Add name"><button class="btn" onclick="addMember()">Add</button></div><div class="member-list">${members().map(m=>`<div class="mini-row"><b>${m.name}</b><button class="ghost-btn small" onclick="removeMember('${m.id}')">Remove</button></div>`).join("")}</div>`)}
    </div>
    ${card("Scoring Rules", `<p class="sub">Leaderboard points are calculated from verified final results only. Pending picks stay at 0 until they can be checked.</p><div class="scoring-grid">${Object.entries(state.settings.scoring).map(([k,v])=>`<label>${labelForScore(k)}<input type="number" min="0" value="${v}" onchange="updateScore('${k}',this.value)"></label>`).join("")}</div>`)}
    ${card("Commissioner Checklist", `<div class="check-list"><div>✅ Netlify hosting connected</div><div>✅ Firebase connected</div><div>✅ GitHub deploy pipeline working</div><div>⬜ Finalize scoring rules</div><div>⬜ Add open API data adapter</div><div>⬜ Add API-Football adapter behind Netlify Function</div><div>⬜ Lock picks before knockout stage starts</div></div>`)}
    ${card("Current Database Shape", `<pre>${escapeHtml(JSON.stringify({ settings:state.settings, family:state.family, picks:{ bracketOwners:Object.keys(state.picks.brackets||{}), matchOwners:Object.keys(state.picks.matches||{}) }, tournament:{ groups:Object.keys(state.tournament.groups||{}).length, matches:(state.tournament.matches||[]).length } }, null, 2))}</pre>`, "code-card")}
  `;
}
function getDataHealth(){
  const bracketWinners = Object.values(state.picks.brackets||{}).reduce((sum,b)=>sum + Object.keys(b||{}).filter(k=>k.endsWith('-W')).length,0);
  const matchPicks = Object.values(state.picks.matches||{}).reduce((sum,m)=>sum + Object.keys(m||{}).length,0);
  return { members: members().length, bracketWinners, matchPicks };
}
function labelForScore(k){ return ({matchWinner:"Correct match winner", groupDraw:"Correct group draw", r32:"R32 correct advancer", r16:"R16 correct advancer", qf:"Quarterfinalist", sf:"Semifinalist", finalist:"Finalist", champion:"Champion"})[k] || k; }
function updateSetting(key,value){ state.settings[key]=value; scheduleSave(); renderAll(); }
function updateScore(key,value){ state.settings.scoring[key]=Number(value)||0; scheduleSave(); renderHome(); renderFamily(); }
function addMember(){ const input=document.getElementById("newMemberName"); const name=input.value.trim(); if(!name) return; const id=slug(name); if(state.family.some(m=>m.id===id)){ input.value=""; return; } state.family.push({id,name,active:true,colorIndex:state.family.length}); input.value=""; scheduleSave(); renderAll(); }
function removeMember(id){ const m=state.family.find(x=>x.id===id); if(!m) return; if(!confirm(`Remove ${m.name} from the family list? Picks will remain in the database backup.`)) return; m.active=false; scheduleSave(); renderAll(); }
function seedDefaults(){ state.family=DEFAULT_MEMBERS.map((name,i)=>({id:slug(name),name,active:true,colorIndex:i})); scheduleSave(); renderAll(); }
function exportState(){ const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="world-cup-bristow-backup.json"; a.click(); URL.revokeObjectURL(url); }
function importStateFile(file){
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = normalizeState(JSON.parse(reader.result));
      if(!confirm("Import this backup and replace the current Firebase app data?")) return;
      state = imported;
      state.updatedAt = Date.now();
      scheduleSave();
      renderAll();
    } catch(err) { alert("That file could not be imported. Make sure it is a valid JSON backup from this app."); }
  };
  reader.readAsText(file);
}
function resetPicksConfirm(){
  if(!confirm("Clear all family bracket and match picks? Tournament data, members, and settings will remain.")) return;
  state.picks = { brackets:{}, matches:{} };
  scheduleSave();
  renderAll();
}

function resetDemoConfirm(){ if(!confirm("Reset Firebase data to defaults?")) return; state=defaultState(); scheduleSave(); renderAll(); }
function escapeHtml(s){ return String(s).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c])); }

const local = localStorage.getItem(LOCAL_KEY);
if(local){ try { state = normalizeState(JSON.parse(local)); } catch {} }
renderAll(); initFirebase();
