/* World Cup Bristow Challenge v0.4.1
   Foundation release: Firebase source-of-truth, admin basics, bottom nav. */

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
  { key:"r32", title:"Round of 32", weightKey:"r32", games:["R32-1","R32-2","R32-3","R32-4"] },
  { key:"r16", title:"Round of 16", weightKey:"r16", games:["R16-1","R16-2"] },
  { key:"qf", title:"Quarterfinals", weightKey:"qf", games:["QF-1"] },
  { key:"sf", title:"Semifinals", weightKey:"sf", games:["SF-1"] },
  { key:"final", title:"Final", weightKey:"champion", games:["FINAL"] }
];
const BRACKET_META = {
  "R32-1": { date:"Jun 28", a:"1A", b:"3C/D/E" }, "R32-2": { date:"Jun 28", a:"2C", b:"2D" }, "R32-3": { date:"Jun 29", a:"1B", b:"3A/E/F" }, "R32-4": { date:"Jun 29", a:"1D", b:"2F" },
  "R16-1": { date:"Jul 4", aFrom:"R32-1", bFrom:"R32-2" }, "R16-2": { date:"Jul 4", aFrom:"R32-3", bFrom:"R32-4" }, "QF-1": { date:"Jul 9", aFrom:"R16-1", bFrom:"R16-2" },
  "SF-1": { date:"Jul 14", aFrom:"QF-1", b:"TBD other side" }, "FINAL": { date:"Jul 19", aFrom:"SF-1", b:"TBD other finalist" }
};

let state = defaultState();
let dbRef = null;
let remoteReady = false;
let isRemoteUpdate = false;
let saveTimer = null;
let currentMatchFilter = "all";
let currentTournamentPanel = "groups";

function defaultState(){
  return { settings:{ appName:"World Cup Bristow Challenge", dataSource:"Demo", apiMode:"demo", bracketsLocked:false, matchPicksLocked:false, scoring:{...DEFAULT_SCORING} }, family: DEFAULT_MEMBERS.map((name, i)=>({ id: slug(name), name, colorIndex:i, active:true })), picks:{ brackets:{}, matches:{} }, tournament: DEMO, updatedAt: Date.now(), version:"0.4.1-fixed" };
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
function renderTournamentBracket(){
  return `<div class="bracket-scroll"><div class="family-bracket tournament-bracket">${BRACKET_ROUNDS.map(round=>`<div class="round"><h3>${round.title}</h3>${round.games.map(id=>{
    const meta=BRACKET_META[id];
    const left = meta.a || (meta.aFrom ? `Winner ${meta.aFrom}` : "TBD");
    const right = meta.b || (meta.bFrom ? `Winner ${meta.bFrom}` : "TBD");
    return `<div class="fb-match official"><small><span>${id}</span><span>${meta.date} CT</span></small><div class="slot-line">${team(left)}</div><div class="slot-line">${team(right)}</div><div class="muted tiny">Actual teams will populate when group/knockout results are available.</div></div>`
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
function getBracket(owner){ return state.picks.brackets[owner] || {}; }
function setBracket(owner, bracket){ state.picks.brackets[owner]=bracket; scheduleSave(); renderFamily(); }
function groupSlotCandidates(slot){
  // Demo-friendly constraints based on possible group advancement slots.
  if(!slot || slot.startsWith("TBD")) return [];
  const exact = slot.match(/^([12])([A-L])$/);
  if(exact) return state.tournament.groups[exact[2]] || [];
  const third = slot.match(/^3([A-L](?:\/[A-L])*)$/);
  if(third) return third[1].split('/').flatMap(g => state.tournament.groups[g] || []);
  return [];
}
function bracketChoices(owner, id){
  const meta = BRACKET_META[id], b=getBracket(owner);
  if(id.startsWith("R32")){
    const left = groupSlotCandidates(meta.a);
    const right = groupSlotCandidates(meta.b);
    return [...new Set([...left, ...right])];
  }
  const list=[];
  if(meta.aFrom && b[`${meta.aFrom}-W`]) list.push(b[`${meta.aFrom}-W`]);
  if(meta.bFrom && b[`${meta.bFrom}-W`]) list.push(b[`${meta.bFrom}-W`]);
  return list;
}
function renderBracket(owner){
  if(!owner) return `<p class="muted">Add a family member first.</p>`;
  const b=getBracket(owner);
  return `<div class="bracket-scroll"><div class="family-bracket">${BRACKET_ROUNDS.map(round=>`<div class="round"><h3>${round.title}</h3>${round.games.map(id=>{
    const meta=BRACKET_META[id];
    const choices=bracketChoices(owner,id);
    const disabled = choices.length < 2 && id !== "FINAL" || choices.length === 0;
    const hint = choices.length ? choices.map(team).join(" vs ") : "Complete the previous round first";
    return `<div class="fb-match"><small><span>${id}</span><span>${meta.date} CT</span></small><select ${disabled?"disabled":""} onchange="saveBracketWinner('${owner}','${id}',this.value)"><option value="">${disabled?"Waiting on prior picks…":"Pick winner…"}</option>${choices.map(c=>`<option value="${c}" ${b[`${id}-W`]===c?"selected":""}>${team(c)}</option>`).join("")}</select><div class="muted tiny">${hint}</div></div>`
  }).join("")}</div>`).join("")}</div></div>`;
}

function saveBracketWinner(owner,id,value){ const b={...getBracket(owner)}; if(value) b[`${id}-W`]=value; else delete b[`${id}-W`]; clearDownstream(b,id); setBracket(owner,b); }
function clearDownstream(b,id){ const map={"R32-1":["R16-1","QF-1","SF-1","FINAL"],"R32-2":["R16-1","QF-1","SF-1","FINAL"],"R32-3":["R16-2","QF-1","SF-1","FINAL"],"R32-4":["R16-2","QF-1","SF-1","FINAL"],"R16-1":["QF-1","SF-1","FINAL"],"R16-2":["QF-1","SF-1","FINAL"],"QF-1":["SF-1","FINAL"],"SF-1":["FINAL"]}; (map[id]||[]).forEach(x=>delete b[`${x}-W`]); }
function renderMatchPicks(owner){
  const picks = state.picks.matches[owner] || {};
  const upcoming = state.tournament.matches.filter(m=>m.status!=="final");
  if(!upcoming.length) return `<p class="muted">No upcoming demo games.</p>`;
  return `<div class="match-list">${upcoming.map(m=>`<div class="upcoming-pick-card"><div class="day-head"><b>${team(m.home)} vs ${team(m.away)}</b><span>${fmtDate(m.kickoff)} CT</span></div><div class="choice-buttons"><button class="${picks[m.id]===m.home?"selected":""}" onclick="saveMatchPick('${owner}','${m.id}','${m.home}')">${team(m.home)}</button><button class="${picks[m.id]==='DRAW'?"selected":""}" onclick="saveMatchPick('${owner}','${m.id}','DRAW')">Draw</button><button class="${picks[m.id]===m.away?"selected":""}" onclick="saveMatchPick('${owner}','${m.id}','${m.away}')">${team(m.away)}</button></div></div>`).join("")}</div>`;
}
function saveMatchPick(owner, matchId, pick){ state.picks.matches[owner] = { ...(state.picks.matches[owner]||{}), [matchId]:pick }; scheduleSave(); renderFamily(); renderHome(); }

function bracketScore(owner){ const b=getBracket(owner); let pts=0,pending=0,correct=0,wrong=0; Object.keys(b).forEach(k=>{ if(k.endsWith("-W")) pending++; }); return {pts,correct,wrong,pending}; }
function matchScoreBreakdown(owner){ const picks=state.picks.matches[owner]||{}; let pts=0,correct=0,wrong=0,pending=0; Object.entries(picks).forEach(([id,pick])=>{ const m=state.tournament.matches.find(x=>x.id===id); if(!m || m.status!=="final"){ pending++; return; } const actual=winnerCode(m); if(pick===actual){ pts += actual==="DRAW" ? Number(state.settings.scoring.groupDraw) : Number(state.settings.scoring.matchWinner); correct++; } else wrong++; }); return {pts,correct,wrong,pending}; }
function getLeaderboard(){ return members().map(m=>{ const bs=bracketScore(m.id), ms=matchScoreBreakdown(m.id); return {id:m.id,name:m.name,total:bs.pts+ms.pts, bracket:bs, match:ms, pending:bs.pending+ms.pending}; }).sort((a,b)=>b.total-a.total || a.name.localeCompare(b.name)); }
function renderLeaderboardRows(){ const list=getLeaderboard(); return `<div class="leader">${list.map((p,i)=>`<div class="leader-row"><div class="leader-top"><div><b>${i+1}. ${p.name}</b><small>Bracket ${p.bracket.pts} • Match picks ${p.match.pts}</small></div><b>${p.total} pts</b></div><div class="leader-breakdown"><span class="correct">✓ ${p.bracket.correct+p.match.correct}</span><span class="wrong">✕ ${p.bracket.wrong+p.match.wrong}</span><span class="pending">⏳ ${p.pending}</span></div></div>`).join("")}</div>`; }

function renderAdmin(){
  document.getElementById("admin").innerHTML = `
    ${card("Admin Foundation", `<p class="sub">This is the commissioner area. For now it manages app name, family members, and scoring values. Later: locks, API refresh, backups, and sign-in.</p><div class="admin-grid"><button class="btn" onclick="seedDefaults()">Seed Defaults</button><button class="ghost-btn" onclick="exportState()">Export JSON Backup</button><button class="danger-btn" onclick="resetDemoConfirm()">Reset v0.4 Data</button></div><p class="muted tiny">Package: v0.4.1-fixed</p>`)}
    <div class="grid two">
      ${card("App Settings", `<label>App name</label><input id="settingAppName" value="${escapeHtml(state.settings.appName)}" oninput="updateSetting('appName',this.value)"><label>Data source</label><select onchange="updateSetting('dataSource',this.value)"><option ${state.settings.dataSource==='Demo'?'selected':''}>Demo</option><option ${state.settings.dataSource==='Open API'?'selected':''}>Open API</option><option ${state.settings.dataSource==='API-Football'?'selected':''}>API-Football</option></select><div class="toggle-row"><span>Bracket locked</span><input type="checkbox" ${state.settings.bracketsLocked?'checked':''} onchange="updateSetting('bracketsLocked',this.checked)"></div><div class="toggle-row"><span>Match picks locked</span><input type="checkbox" ${state.settings.matchPicksLocked?'checked':''} onchange="updateSetting('matchPicksLocked',this.checked)"></div>`)}
      ${card("Family Members", `<div class="builder-bar compact"><input id="newMemberName" placeholder="Add name"><button class="btn" onclick="addMember()">Add</button></div><div class="member-list">${members().map(m=>`<div class="mini-row"><b>${m.name}</b><button class="ghost-btn small" onclick="removeMember('${m.id}')">Remove</button></div>`).join("")}</div>`)}
    </div>
    ${card("Scoring Rules", `<div class="scoring-grid">${Object.entries(state.settings.scoring).map(([k,v])=>`<label>${labelForScore(k)}<input type="number" min="0" value="${v}" onchange="updateScore('${k}',this.value)"></label>`).join("")}</div>`)}
    ${card("Current Database Shape", `<pre>${escapeHtml(JSON.stringify({ settings:state.settings, family:state.family, picks:"stored under picks", tournament:"stored under tournament" }, null, 2))}</pre>`, "code-card")}
  `;
}
function labelForScore(k){ return ({matchWinner:"Correct match winner", groupDraw:"Correct group draw", r32:"R32 correct advancer", r16:"R16 correct advancer", qf:"Quarterfinalist", sf:"Semifinalist", finalist:"Finalist", champion:"Champion"})[k] || k; }
function updateSetting(key,value){ state.settings[key]=value; scheduleSave(); renderAll(); }
function updateScore(key,value){ state.settings.scoring[key]=Number(value)||0; scheduleSave(); renderHome(); renderFamily(); }
function addMember(){ const input=document.getElementById("newMemberName"); const name=input.value.trim(); if(!name) return; const id=slug(name); if(state.family.some(m=>m.id===id)){ input.value=""; return; } state.family.push({id,name,active:true,colorIndex:state.family.length}); input.value=""; scheduleSave(); renderAll(); }
function removeMember(id){ const m=state.family.find(x=>x.id===id); if(!m) return; if(!confirm(`Remove ${m.name} from the family list? Picks will remain in the database backup.`)) return; m.active=false; scheduleSave(); renderAll(); }
function seedDefaults(){ state.family=DEFAULT_MEMBERS.map((name,i)=>({id:slug(name),name,active:true,colorIndex:i})); scheduleSave(); renderAll(); }
function exportState(){ const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="world-cup-bristow-backup.json"; a.click(); URL.revokeObjectURL(url); }
function resetDemoConfirm(){ if(!confirm("Reset v0.4 Firebase data to defaults?")) return; state=defaultState(); scheduleSave(); renderAll(); }
function escapeHtml(s){ return String(s).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c])); }

const local = localStorage.getItem(LOCAL_KEY);
if(local){ try { state = normalizeState(JSON.parse(local)); } catch {} }
renderAll(); initFirebase();
