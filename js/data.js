export const APP_PATH = 'worldCupBristowChallenge/v1';
export const PACKAGE_VERSION = 'v1-foundation';

export const defaultSettings = {
  appName: 'World Cup Bristow Challenge',
  packageVersion: PACKAGE_VERSION,
  bracketLocked: false,
  matchPicksLocked: false,
  source: 'demo',
  lastUpdated: new Date().toISOString()
};

export const defaultMembers = ['Ben','Margo','Chloe','Olivia'];

export const defaultScoring = {
  matchWinner: 2,
  groupDraw: 3,
  exactScoreBonus: 2,
  r32: 2,
  r16: 4,
  qf: 6,
  sf: 10,
  finalist: 15,
  champion: 25
};

export const teams = {
  MEX:{name:'Mexico',flag:'🇲🇽'}, RSA:{name:'South Africa',flag:'🇿🇦'}, KOR:{name:'South Korea',flag:'🇰🇷'}, CZE:{name:'Czechia',flag:'🇨🇿'},
  CAN:{name:'Canada',flag:'🇨🇦'}, BIH:{name:'Bosnia and Herzegovina',flag:'🇧🇦'}, QAT:{name:'Qatar',flag:'🇶🇦'}, SUI:{name:'Switzerland',flag:'🇨🇭'},
  BRA:{name:'Brazil',flag:'🇧🇷'}, MAR:{name:'Morocco',flag:'🇲🇦'}, HTI:{name:'Haiti',flag:'🇭🇹'}, SCO:{name:'Scotland',flag:'🏴'},
  USA:{name:'United States',flag:'🇺🇸'}, PAR:{name:'Paraguay',flag:'🇵🇾'}, AUS:{name:'Australia',flag:'🇦🇺'}, TUR:{name:'Turkey',flag:'🇹🇷'},
  GER:{name:'Germany',flag:'🇩🇪'}, CUW:{name:'Curaçao',flag:'🇨🇼'}, CIV:{name:'Ivory Coast',flag:'🇨🇮'}, ECU:{name:'Ecuador',flag:'🇪🇨'},
  NED:{name:'Netherlands',flag:'🇳🇱'}, JPN:{name:'Japan',flag:'🇯🇵'}, SWE:{name:'Sweden',flag:'🇸🇪'}, TUN:{name:'Tunisia',flag:'🇹🇳'},
  BEL:{name:'Belgium',flag:'🇧🇪'}, EGY:{name:'Egypt',flag:'🇪🇬'}, IRI:{name:'Iran',flag:'🇮🇷'}, NZL:{name:'New Zealand',flag:'🇳🇿'},
  ESP:{name:'Spain',flag:'🇪🇸'}, CPV:{name:'Cape Verde',flag:'🇨🇻'}, KSA:{name:'Saudi Arabia',flag:'🇸🇦'}, URU:{name:'Uruguay',flag:'🇺🇾'},
  FRA:{name:'France',flag:'🇫🇷'}, SEN:{name:'Senegal',flag:'🇸🇳'}, IRQ:{name:'Iraq',flag:'🇮🇶'}, NOR:{name:'Norway',flag:'🇳🇴'},
  ARG:{name:'Argentina',flag:'🇦🇷'}, DZA:{name:'Algeria',flag:'🇩🇿'}, AUT:{name:'Austria',flag:'🇦🇹'}, JOR:{name:'Jordan',flag:'🇯🇴'},
  POR:{name:'Portugal',flag:'🇵🇹'}, COD:{name:'DR Congo',flag:'🇨🇩'}, UZB:{name:'Uzbekistan',flag:'🇺🇿'}, COL:{name:'Colombia',flag:'🇨🇴'},
  ENG:{name:'England',flag:'🏴'}, CRO:{name:'Croatia',flag:'🇭🇷'}, GHA:{name:'Ghana',flag:'🇬🇭'}, PAN:{name:'Panama',flag:'🇵🇦'}
};

export const groups = {
  A:['MEX','RSA','KOR','CZE'], B:['CAN','BIH','QAT','SUI'], C:['BRA','MAR','HTI','SCO'], D:['USA','PAR','AUS','TUR'],
  E:['GER','CUW','CIV','ECU'], F:['NED','JPN','SWE','TUN'], G:['BEL','EGY','IRI','NZL'], H:['ESP','CPV','KSA','URU'],
  I:['FRA','SEN','IRQ','NOR'], J:['ARG','DZA','AUT','JOR'], K:['POR','COD','UZB','COL'], L:['ENG','CRO','GHA','PAN']
};

export const matches = [
  {id:'g1',stage:'Group A',date:'2026-06-11T14:00:00-05:00',home:'MEX',away:'RSA',status:'Final',homeScore:2,awayScore:0,winner:'MEX'},
  {id:'g2',stage:'Group A',date:'2026-06-11T21:00:00-05:00',home:'KOR',away:'CZE',status:'Final',homeScore:2,awayScore:1,winner:'KOR'},
  {id:'g3',stage:'Group B',date:'2026-06-12T14:00:00-05:00',home:'CAN',away:'BIH',status:'Final',homeScore:1,awayScore:1,winner:'DRAW'},
  {id:'g4',stage:'Group D',date:'2026-06-12T20:00:00-05:00',home:'USA',away:'PAR',status:'Final',homeScore:4,awayScore:1,winner:'USA'},
  {id:'g5',stage:'Group C',date:'2026-06-13T17:00:00-05:00',home:'BRA',away:'MAR',status:'Final',homeScore:1,awayScore:1,winner:'DRAW'},
  {id:'g6',stage:'Group C',date:'2026-06-13T20:00:00-05:00',home:'HTI',away:'SCO',status:'Final',homeScore:0,awayScore:1,winner:'SCO'},
  {id:'g7',stage:'Group A',date:'2026-06-18T20:00:00-05:00',home:'MEX',away:'KOR',status:'Scheduled'},
  {id:'g8',stage:'Group D',date:'2026-06-19T14:00:00-05:00',home:'USA',away:'AUS',status:'Scheduled'},
  {id:'g9',stage:'Group C',date:'2026-06-19T19:30:00-05:00',home:'BRA',away:'HTI',status:'Scheduled'},
  {id:'g10',stage:'Group F',date:'2026-06-20T12:00:00-05:00',home:'NED',away:'SWE',status:'Scheduled'},
  {id:'g11',stage:'Group E',date:'2026-06-20T15:00:00-05:00',home:'GER',away:'CIV',status:'Scheduled'},
  {id:'g12',stage:'Group H',date:'2026-06-21T11:00:00-05:00',home:'ESP',away:'KSA',status:'Scheduled'}
];

export const bracketSlots = [
  ['r32-1','1A','3C/E/F'],['r32-2','2B','2F'],['r32-3','1K','3A/B/F'],['r32-4','1D','3B/E/I'],
  ['r32-5','1G','3A/E/H'],['r32-6','2A','2C'],['r32-7','1E','3A/B/C/D'],['r32-8','1I','3C/D/F/G'],
  ['r32-9','1C','3H/I/J/K'],['r32-10','2E','2I'],['r32-11','1A/B/C?','Wildcard'],['r32-12','1L','3E/H/I/J'],
  ['r32-13','1H','3B/C/D/E'],['r32-14','2D','2G'],['r32-15','1F','3A/C/H/I'],['r32-16','1J','3D/E/F/H']
];

export function foundationData(){return {settings:defaultSettings,members:defaultMembers,scoring:defaultScoring,tournament:{teams,groups,matches,bracketSlots},picks:{brackets:{},matches:{}}};}
