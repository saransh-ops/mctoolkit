// ══════════════════════════════════════════════════════════
//  MC Toolkit — Shared JS (theme sync + utilities)
//  Include this on every tool page BEFORE page-specific JS
// ══════════════════════════════════════════════════════════

const FB = 'https://saransh-s-website-default-rtdb.firebaseio.com';

// ── Sync Code ───────────────────────────────────────────────
function genSyncCode(){
  const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let c='';
  for(let i=0;i<3;i++) c+=chars[Math.floor(Math.random()*chars.length)];
  c+='-';
  for(let i=0;i<3;i++) c+=chars[Math.floor(Math.random()*chars.length)];
  return c;
}
function getSyncCode(){
  let code=localStorage.getItem('theme-sync-code');
  if(!code){ code=genSyncCode(); localStorage.setItem('theme-sync-code',code); }
  return code;
}
function newSyncCode(){
  const code=genSyncCode();
  localStorage.setItem('theme-sync-code',code);
  const el=document.getElementById('sync-code-display');
  if(el) el.textContent=code;
  toast('New Sync Code generated! Re-save your theme.');
}
function copySyncCode(){
  navigator.clipboard.writeText(getSyncCode()).then(()=>toast('Sync Code copied!'));
}
function applySyncCode(){
  const val=(document.getElementById('sync-code-input').value||'').trim().toUpperCase();
  if(!val){ toast('Enter a code first!'); return; }
  localStorage.setItem('theme-sync-code',val);
  const el=document.getElementById('sync-code-display');
  if(el) el.textContent=val;
  document.getElementById('sync-code-input').value='';
  toast('Code applied! Loading theme…');
  loadFB();
}

// ── Firebase Theme ──────────────────────────────────────────
function setFBLog(msg,cls=''){
  const el=document.getElementById('fbl');
  if(el){ el.textContent=msg; el.className='fb-log'+(cls?' '+cls:''); }
}
async function loadFB(){
  const code=getSyncCode();
  setFBLog('Loading theme for code '+code+'…');
  try{
    const r=await fetch(FB+'/themes/'+code+'.json');
    if(r.ok){
      const d=await r.json();
      if(d&&typeof d==='object'){
        const wordToHex = {cyan:'#00f5d4', purple:'#a78bfa', pink:'#f472b6', orange:'#fb923c', lime:'#a3e635'};
        let acc = d.mc_accent || (d.accent && d.accent.startsWith('#') ? d.accent : wordToHex[d.accent]) || d.primary || '#4ade80';
        document.getElementById('cp').value=acc;
        document.getElementById('cb').value=d.bg||(d.mode==='light'?'#f5f5fa':'#08090d');
        document.getElementById('cs').value=d.surface||'#0e1018';
        document.getElementById('cc').value=d.card||'#141720';
        liveTheme();
        setFBLog('✓ Theme loaded for '+code,'ok');
        return;
      }
    }
  }catch(e){}
  setFBLog('No theme found for code '+code,'er');
}
async function saveFB(){
  const code=getSyncCode();
  const acc = document.getElementById('cp').value;
  function hexToWord(h){
    if(h==='#00f5d4'||h==='#38bdf8'||h==='#67e8f9') return 'cyan';
    if(h==='#a78bfa') return 'purple';
    if(h==='#f472b6') return 'pink';
    if(h==='#fb923c'||h==='#f97316') return 'orange';
    return 'lime';
  }
  const d={
    accent: hexToWord(acc), // For portfolio compatibility
    mc_accent: acc,         // For toolkit exact hex
    mode: 'dark',           // For portfolio
    bg:document.getElementById('cb').value,
    surface:document.getElementById('cs').value,
    card:document.getElementById('cc').value,
    savedAt:new Date().toISOString(),
  };
  setFBLog('Saving theme for code '+code+'…');
  try{
    const r=await fetch(FB+'/themes/'+code+'.json',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});
    if(r.ok){ setFBLog('✓ Saved to /themes/'+code,'ok'); toast('Theme synced! Code: '+code); return; }
  }catch(e){}
  setFBLog('Save failed — check Firebase rules','er');
  toast('Save failed');
}

// ── Theme Engine ────────────────────────────────────────────
const PRESETS={
  default:{p:'#4ade80',b:'#08090d',s:'#0e1018',c:'#141720'},
  forest: {p:'#5b8a36',b:'#070c08',s:'#0c1410',c:'#111e14'},
  ocean:  {p:'#38bdf8',b:'#05090f',s:'#0a1020',c:'#0f182c'},
  nether: {p:'#f97316',b:'#0f0400',s:'#1a0800',c:'#231000'},
  end:    {p:'#a78bfa',b:'#090010',s:'#110018',c:'#1a0025'},
  ice:    {p:'#67e8f9',b:'#060c10',s:'#0a1520',c:'#0f1e2e'},
};
function preset(n){ const p=PRESETS[n]||PRESETS.default; document.getElementById('cp').value=p.p; document.getElementById('cb').value=p.b; document.getElementById('cs').value=p.s; document.getElementById('cc').value=p.c; liveTheme(); toast('Theme: '+n); }
function lighten(h,a){ let r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16); return '#'+[r+(255-r)*a,g+(255-g)*a,b+(255-b)*a].map(x=>Math.round(Math.min(255,x)).toString(16).padStart(2,'0')).join(''); }
function darken(h,a){ let r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16); return '#'+[r*(1-a),g*(1-a),b*(1-a)].map(x=>Math.round(x).toString(16).padStart(2,'0')).join(''); }
function liveTheme(){
  const p=document.getElementById('cp').value,b=document.getElementById('cb').value,
        s=document.getElementById('cs').value,c=document.getElementById('cc').value;
  const R=document.documentElement;
  R.style.setProperty('--accent',p);
  R.style.setProperty('--acc2',darken(p,.1));
  R.style.setProperty('--acc-d',p+'1a');
  R.style.setProperty('--acc-b',p+'40');
  R.style.setProperty('--bg',b);
  R.style.setProperty('--s1',s);
  R.style.setProperty('--s2',c);
  R.style.setProperty('--s3',lighten(c,.06));
  document.getElementById('cpv').textContent=p;
  document.getElementById('cbv').textContent=b;
  document.getElementById('csv').textContent=s;
  document.getElementById('ccv').textContent=c;
}
function toggleTheme(){
  const p=document.getElementById('tp');
  p.classList.toggle('on');
  document.getElementById('theme-nav-btn').classList.toggle('hi',p.classList.contains('on'));
}

// ── Utils ───────────────────────────────────────────────────
function toast(msg,dur=2600){ const t=document.getElementById('tst'); t.textContent=msg; t.classList.add('on'); setTimeout(()=>t.classList.remove('on'),dur); }
function cp(txt){ navigator.clipboard.writeText(txt).then(()=>toast('Copied!')); }

// ── Nav dropdown ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  // highlight active tool in dropdown
  const path=window.location.pathname.split('/').pop().replace('.html','');
  document.querySelectorAll('.dd-item').forEach(i=>{
    if(i.getAttribute('href')===path+'.html') i.classList.add('on');
  });
  document.addEventListener('click',e=>{
    if(!e.target.closest('#toolsDD')){ const dd=document.getElementById('toolsDD'); if(dd) dd.classList.remove('open'); }
  });
  // Init sync code display
  const scEl=document.getElementById('sync-code-display');
  if(scEl) scEl.textContent=getSyncCode();
  // Auto-load theme
  loadFB();
});
function toggleDD(){ document.getElementById('toolsDD').classList.toggle('open'); }
