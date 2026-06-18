import { APP_PATH, foundationData } from './data.js';

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

class Store{
  constructor(){this.mode='local';this.db=null;this.ref=null;this.listeners=[];this.localKey='wc_bristow_v1_local';}
  async init(onChange){
    try{
      if(window.firebase){firebase.initializeApp(firebaseConfig);this.db=firebase.database();this.ref=this.db.ref(APP_PATH);this.mode='firebase';this.ref.on('value',snap=>{let val=snap.val();if(!val){val=foundationData();this.ref.set(val);} onChange(val);});return true;}
    }catch(e){console.warn('Firebase unavailable, using local fallback',e);}
    this.mode='local';let data=this.getLocal();if(!data){data=foundationData();this.setLocal(data);} onChange(data);return false;
  }
  getLocal(){try{return JSON.parse(localStorage.getItem(this.localKey)||'null')}catch{return null}}
  setLocal(data){localStorage.setItem(this.localKey,JSON.stringify(data));}
  async set(data){if(this.mode==='firebase') return this.ref.set(data); this.setLocal(data);}
  async update(path,value){if(this.mode==='firebase') return this.ref.child(path).set(value); const d=this.getLocal()||foundationData(); const parts=path.split('/'); let cur=d; while(parts.length>1){const p=parts.shift(); cur[p]=cur[p]||{}; cur=cur[p];} cur[parts[0]]=value; this.setLocal(d); window.dispatchEvent(new CustomEvent('localStoreChanged',{detail:d}));}
  async reset(){return this.set(foundationData());}
}
export const store = new Store();
