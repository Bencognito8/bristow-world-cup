export function scoreMember(member,data){
  const scoring=data.scoring||{}; const matches=data.tournament?.matches||[]; const matchPicks=data.picks?.matches?.[member]||{}; const bracketPicks=data.picks?.brackets?.[member]||{};
  let matchPts=0, bracketPts=0, correct=0, wrong=0, pending=0;
  for(const m of matches){const p=matchPicks[m.id]; if(!p) continue; if(m.status!=='Final'){pending++; continue;} if(p.winner===m.winner){correct++; matchPts += (m.winner==='DRAW'?(scoring.groupDraw||3):(scoring.matchWinner||2)); if(String(p.homeScore)!=='' && Number(p.homeScore)===m.homeScore && Number(p.awayScore)===m.awayScore) matchPts += scoring.exactScoreBonus||0;} else wrong++;}
  // Demo bracket scoring: only champion can be verified in current demo once a champion exists.
  const actualChampion=data.tournament?.actualChampion; if(bracketPicks.champion){ if(actualChampion){ if(bracketPicks.champion===actualChampion){bracketPts+=scoring.champion||25; correct++;} else wrong++; } else pending++; }
  return {member,total:matchPts+bracketPts,matchPts,bracketPts,correct,wrong,pending};
}
export function leaderboard(data){return (data.members||[]).map(m=>scoreMember(m,data)).sort((a,b)=>b.total-a.total||a.member.localeCompare(b.member));}
