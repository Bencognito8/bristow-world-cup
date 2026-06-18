import { store } from './firebaseService.js';
import { PACKAGE_VERSION, foundationData, teams as defaultTeams } from './data.js';
import { $, fmtDate, teamLabel, plainTeam, safeId, clone } from './utils.js';
import { leaderboard } from './scoring.js';

let state = foundationData();
let route = 'home';
let matchFilter = 'all';
let tournamentMode = 'groups';
let selectedMember = 'Ben';

const view = $('#view');
const status = $('#connectionStatus');

function setStatus(){status.textContent = store.mode === 'firebase' ? 'Connected to Firebase' : 'Local fallback';}
function save(path,value){return store.update(path,value);}
function render(){setStatus(); document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.route===route)); const routes={home, matches, tournament, family, admin}; view.innerHTML = routes[route](); bind();}

function home(){const lb=leaderboard(state); const top=lb[0]; const upcoming=(state.tournament.matches||[]).filter(m=>m.status!=='Final').slice(0,3); return `
<section class="hero-grid">
  <div class="card"><div class="section-title"><div><p class="eyebrow">${PACKAGE_VERSION}</p><h2>${state.settings?.appName||'World Cup Bristow Challenge'}</h2></div></div>
    <div class="metric-grid"><div class="metric"><span class="small">Leader</span><strong>${top?.member||'—'}</strong><span>${top?.total||0} pts</span></div><div class="metric"><span class="small">Members</span><strong>${state.members?.length||0}</strong><span>in the pool</span></div><div class="metric"><span class="small">Pending Picks</span><strong>${lb.reduce((s,x)=>s+x.pending,0)}</strong><span>not scored yet</span></div></div>
  </div>
  <div class="card"><h2>Leaderboard</h2>${leaderboardHtml(lb)}</div>
</section>
<section class="card"><div class="section-title"><h2>Upcoming Matches</h2><button class="btn" data-go="matches">View all</button></div><div class="list">${upcoming.map(matchCard).join('')}</div></section>`}

function leaderboardHtml(lb){return `<div class="leaderboard">${lb.map((r,i)=>`<div class="leader-row"><div class="rank">${i+1}</div><div><strong>${r.member}</strong><div class="small">Bracket ${r.bracketPts} · Matches ${r.matchPts} · ${r.correct} correct · ${r.pending} pending</div></div><strong>${r.total}</strong></div>`).join('')}</div>`;}

function matches(){let ms=state.tournament.matches||[]; if(matchFilter==='completed') ms=ms.filter(m=>m.status==='Final'); if(matchFilter==='upcoming') ms=ms.filter(m=>m.status!=='Final'); return `<section class="card"><div class="section-title"><h2>Matches</h2><div class="segmented"><button data-filter="all" class="${matchFilter==='all'?'active':''}">All</button><button data-filter="completed" class="${matchFilter==='completed'?'active':''}">Completed</button><button data-filter="upcoming" class="${matchFilter==='upcoming'?'active':''}">Upcoming</button></div></div><div class="list">${ms.map(matchCard).join('')}</div></section>`;}
function matchCard(m){const score=m.status==='Final'?`<div class="score">${m.homeScore} - ${m.awayScore}</div>`:`<div class="score">vs</div>`; return `<div class="match-card"><div><div class="teams">${teamLabel(m.home,state.tournament.teams)} ${score} ${teamLabel(m.away,state.tournament.teams)}</div><div class="meta">${m.stage} · ${fmtDate(m.date)}</div></div><span class="pill ${m.status.toLowerCase()}">${m.status}</span></div>`;}

function tournament(){return `<section class="card"><div class="section-title"><h2>Tournament</h2><div class="segmented"><button data-tournament="groups" class="${tournamentMode==='groups'?'active':''}">Groups</button><button data-tournament="bracket" class="${tournamentMode==='bracket'?'active':''}">Knockout Bracket</button></div></div>${tournamentMode==='groups'?groupsHtml():actualBracketHtml()}</section>`;}
function groupsHtml(){const groups=state.tournament.groups||{}; return `<div class="group-grid">${Object.entries(groups).map(([g,codes])=>`<div class="group-card"><h3>Group ${g}</h3>${codes.map(c=>`<div class="team-row"><span>${teamLabel(c,state.tournament.teams)}</span><span class="small">0 pts</span></div>`).join('')}</div>`).join('')}</div>`;}
function actualBracketHtml(){const slots=state.tournament.bracketSlots||[]; return `<div class="notice">Actual knockout teams will populate from final group standings. Placeholder slots are shown now so the layout is ready.</div><div class="bracket-scroll"><div class="bracket">${roundHtml('Round of 32',slots.map(s=>slotStatic(s[0],s[1],s[2])))}${roundHtml('Round of 16',Array.from({length:8},(_,i)=>slotStatic('r16-'+(i+1),'Winner R32','Winner R32')))}${roundHtml('Quarterfinals',Array.from({length:4},(_,i)=>slotStatic('qf-'+(i+1),'Winner R16','Winner R16')))}${roundHtml('Semifinals',Array.from({length:2},(_,i)=>slotStatic('sf-'+(i+1),'Winner QF','Winner QF')))}${roundHtml('Final',[slotStatic('final','Winner SF','Winner SF'),`<div class="slot"><div class="slot-title">Champion</div><div class="winner-line">TBD</div></div>`])}</div></div>`;}
function roundHtml(title,items){return `<div class="round"><h3>${title}</h3>${items.join('')}</div>`}
function slotStatic(id,a,b){return `<div class="slot"><div class="slot-title">${id}</div><div>${a}</div><div>${b}</div></div>`}

function family(){const members=state.members||[]; if(!members.includes(selectedMember)) selectedMember=members[0]||'Ben'; return `<section class="card"><div class="section-title"><h2>Family Picks</h2><select id="memberSelect" class="select-team">${members.map(m=>`<option ${m===selectedMember?'selected':''}>${m}</option>`).join('')}</select></div><div class="segmented"><button data-family-mode="bracket" class="active">Full Bracket</button></div><p class="small">Bracket picks save to Firebase and advance automatically within each family member's prediction bracket.</p>${predictionBracketHtml()}<hr>${matchPicksHtml()}</section>`;}

function bracketModel(member){const p=clone(state.picks?.brackets?.[member]||{}); return p;}
function predictionBracketHtml(){const p=bracketModel(selectedMember); const slots=state.tournament.bracketSlots||[]; const r32=slots.map((s,i)=>{const id=s[0]; const options=possibleTeamsForSlot(s); return pickSlot(id,s[1]+' vs '+s[2],options,p[id]);}); const r16=Array.from({length:8},(_,i)=>advancedSlot(`r16-${i+1}`,[`r32-${i*2+1}`,`r32-${i*2+2}`],p)); const qf=Array.from({length:4},(_,i)=>advancedSlot(`qf-${i+1}`,[`r16-${i*2+1}`,`r16-${i*2+2}`],p)); const sf=Array.from({length:2},(_,i)=>advancedSlot(`sf-${i+1}`,[`qf-${i*2+1}`,`qf-${i*2+2}`],p)); const final=advancedSlot('final',['sf-1','sf-2'],p); const champion=championSlot(p); return `<div class="bracket-scroll"><div class="bracket">${roundHtml('Round of 32',r32)}${roundHtml('Round of 16',r16)}${roundHtml('Quarterfinals',qf)}${roundHtml('Semifinals',sf)}${roundHtml('Final',[final,champion])}</div></div>`;}
function possibleTeamsForSlot(slot){const pool=Object.keys(state.tournament.teams||defaultTeams); return pool;}
function pickSlot(id,label,options,value){return `<div class="slot"><div class="slot-title">${label}</div><select class="select-team bracket-pick" data-pick="${id}"><option value="">Pick team…</option>${options.map(c=>`<option value="${c}" ${value===c?'selected':''}>${plainTeam(c,state.tournament.teams)}</option>`).join('')}</select></div>`;}
function advancedSlot(id,from,p){const opts=from.map(k=>p[k]).filter(Boolean); const disabled=opts.length<2?'disabled':''; const val=p[id]; return `<div class="slot ${disabled}"><div class="slot-title">${id}</div>${opts.length<2?'<div class="small">Select prior winners first</div>':`<select class="select-team bracket-pick" data-pick="${id}"><option value="">Pick winner…</option>${opts.map(c=>`<option value="${c}" ${val===c?'selected':''}>${plainTeam(c,state.tournament.teams)}</option>`).join('')}</select>`}</div>`;}
function championSlot(p){const opts=[p.final].filter(Boolean); return `<div class="slot ${opts.length?'':'disabled'}"><div class="slot-title">Champion</div>${opts.length?`<button class="btn primary bracket-champ" data-champ="${opts[0]}">${teamLabel(opts[0],state.tournament.teams)} wins it all</button>`:'<div class="small">Pick final winner first</div>'}<div class="winner-line">${p.champion?teamLabel(p.champion,state.tournament.teams):'No champion selected'}</div></div>`;}
function matchPicksHtml(){const picks=state.picks?.matches?.[selectedMember]||{}; return `<h3>Match-by-Match Picks</h3><div class="list">${(state.tournament.matches||[]).filter(m=>m.status!=='Final').map(m=>{const p=picks[m.id]||{}; return `<div class="match-card"><div><strong>${teamLabel(m.home,state.tournament.teams)} vs ${teamLabel(m.away,state.tournament.teams)}</strong><div class="meta">${fmtDate(m.date)}</div><select class="select-team match-pick" data-match="${m.id}"><option value="">Pick winner…</option><option value="${m.home}" ${p.winner===m.home?'selected':''}>${plainTeam(m.home,state.tournament.teams)}</option><option value="DRAW" ${p.winner==='DRAW'?'selected':''}>Draw</option><option value="${m.away}" ${p.winner===m.away?'selected':''}>${plainTeam(m.away,state.tournament.teams)}</option></select></div><span class="pill scheduled">Pending</span></div>`}).join('')}</div>`;}

function admin(){return `<section class="two-col"><div class="card"><h2>Admin Foundation</h2><p><strong>Package:</strong> ${PACKAGE_VERSION}</p><p><strong>Database path:</strong> worldCupBristowChallenge/v1</p><p><strong>Connection:</strong> ${store.mode}</p><div class="actions"><button class="btn primary" id="initData">Initialize / Reset Foundation Data</button><button class="btn warn" id="clearPicks">Clear All Picks</button><button class="btn" id="exportData">Export Backup</button></div><textarea id="backupBox" placeholder="Backup JSON appears here. Paste JSON here and use Import to restore."></textarea><div class="actions"><button class="btn" id="importData">Import Backup</button></div></div><div class="card"><h2>Family Members</h2><div class="list">${(state.members||[]).map(m=>`<div class="team-row"><strong>${m}</strong><button class="btn warn remove-member" data-member="${m}">Remove</button></div>`).join('')}</div><div class="actions"><input class="input" id="newMember" placeholder="Add family member"><button class="btn primary" id="addMember">Add</button></div><h2>Scoring</h2>${Object.entries(state.scoring||{}).map(([k,v])=>`<label class="small">${k}<input class="input score-input" data-score="${k}" type="number" value="${v}"></label>`).join('')}</div></section>`;}

function bind(){
  document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>{route=b.dataset.route;render();});
  document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{route=b.dataset.go;render();});
  document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{matchFilter=b.dataset.filter;render();});
  document.querySelectorAll('[data-tournament]').forEach(b=>b.onclick=()=>{tournamentMode=b.dataset.tournament;render();});
  $('#memberSelect')?.addEventListener('change',e=>{selectedMember=e.target.value;render();});
  document.querySelectorAll('.bracket-pick').forEach(s=>s.onchange=async e=>{const member=selectedMember; const picks=clone(state.picks?.brackets?.[member]||{}); picks[e.target.dataset.pick]=e.target.value; pruneDownstream(picks,e.target.dataset.pick); await save(`picks/brackets/${safeId(member)}`,picks);});
  document.querySelectorAll('.bracket-champ').forEach(b=>b.onclick=async()=>{const member=selectedMember; const picks=clone(state.picks?.brackets?.[member]||{}); picks.champion=b.dataset.champ; await save(`picks/brackets/${safeId(member)}`,picks);});
  document.querySelectorAll('.match-pick').forEach(s=>s.onchange=async e=>{const member=selectedMember; const picks=clone(state.picks?.matches?.[member]||{}); picks[e.target.dataset.match]={winner:e.target.value}; await save(`picks/matches/${safeId(member)}`,picks);});
  $('#initData')?.addEventListener('click',async()=>{if(confirm('Reset v1 foundation data? This clears demo app data at the v1 path.')) await store.reset();});
  $('#clearPicks')?.addEventListener('click',async()=>{if(confirm('Clear all family picks?')) await save('picks',{brackets:{},matches:{}});});
  $('#exportData')?.addEventListener('click',()=>{$('#backupBox').value=JSON.stringify(state,null,2);});
  $('#importData')?.addEventListener('click',async()=>{try{const d=JSON.parse($('#backupBox').value); await store.set(d);}catch{alert('Invalid JSON');}});
  $('#addMember')?.addEventListener('click',async()=>{const name=$('#newMember').value.trim(); if(!name)return; const members=[...(state.members||[])]; if(!members.includes(name)) members.push(name); await save('members',members);});
  document.querySelectorAll('.remove-member').forEach(b=>b.onclick=async()=>{const members=(state.members||[]).filter(m=>m!==b.dataset.member); await save('members',members);});
  document.querySelectorAll('.score-input').forEach(i=>i.onchange=async()=>{const scoring={...(state.scoring||{})}; scoring[i.dataset.score]=Number(i.value); await save('scoring',scoring);});
}
function pruneDownstream(p,id){const order=['r32','r16','qf','sf','final','champion']; const idx=order.findIndex(x=>id.startsWith(x)); if(idx<0)return; const downstream=order.slice(idx+1); Object.keys(p).forEach(k=>{if(downstream.some(d=>k.startsWith(d)||k===d)) delete p[k];});}

window.addEventListener('localStoreChanged',e=>{state=e.detail; render();});
store.init(data=>{state=data; render();});
