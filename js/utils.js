export const $ = sel => document.querySelector(sel);
export const fmtDate = iso => new Intl.DateTimeFormat('en-US',{weekday:'short',month:'short',day:'numeric',hour:'numeric',minute:'2-digit',timeZone:'America/Chicago'}).format(new Date(iso));
export function teamLabel(code,teams){if(!code) return 'TBD'; if(code==='DRAW') return 'Draw'; const t=teams?.[code]; return t?`<span class="flag-team"><span class="flag">${t.flag}</span><span>${t.name}</span></span>`:code;}
export function plainTeam(code,teams){if(!code) return 'TBD'; if(code==='DRAW') return 'Draw'; return teams?.[code]?.name||code;}
export function safeId(s){return String(s).replace(/[^a-z0-9_-]/gi,'_')}
export function clone(x){return JSON.parse(JSON.stringify(x));}
