(function(){
'use strict';
const KEY='yunarunes-language';
const links=[['index.html','Monstros'],['database.html','Database'],['team-builder.html','Team Builder'],['runes.html','Runas'],['optimizer.html','Optimizer']];
function getLang(){try{return localStorage.getItem(KEY)==='en'?'en':'pt'}catch(e){return'pt'}}
function activeFile(){return(location.pathname.split('/').pop()||'index.html').split('?')[0]||'index.html'}
function boot(){
 const hs=document.querySelectorAll('header.top');
 if(!hs.length)return;
 for(let i=1;i<hs.length;i++)hs[i].remove();
 const h=hs[0];
 let nav=h.querySelector('.nav');
 if(!nav)nav=h.querySelector('nav:not(.mobile-nav)');
 if(nav){nav.classList.add('nav');const keep=['index.html','database.html','team-builder.html','runes.html','optimizer.html'];nav.querySelectorAll('a').forEach(a=>{const u=(a.getAttribute('href')||'').split('?')[0];if(!keep.includes(u))a.remove()});keep.forEach((u,i)=>{if(!nav.querySelector('a[href="'+u+'"]')){const a=document.createElement('a');a.href=u;a.textContent=['Monstros','Database','Team Builder','Runas','Optimizer'][i];nav.appendChild(a)}});nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',(a.getAttribute('href')||'').split('?')[0]===activeFile()))}
 const bars=h.querySelectorAll('.langbar');for(let i=1;i<bars.length;i++)bars[i].remove();let bar=bars[0];
 if(!bar){bar=document.createElement('div');bar.className='langbar';h.appendChild(bar)}
 bar.innerHTML='<a href="./downloads/yunarunes.apk" download title="Download APK">📱 APK</a><button data-lang="pt" type="button">🇧🇷 PT/BR</button><button data-lang="en" type="button">🇬🇧 ENG</button>';
 bar.querySelectorAll('button').forEach(b=>{b.classList.toggle('active',b.dataset.lang===getLang());b.onclick=function(){try{localStorage.setItem(KEY,b.dataset.lang)}catch(e){}location.reload()}});
 const mv=h.querySelectorAll('.mobile-nav');for(let i=1;i<mv.length;i++)mv[i].remove();
 const s=document.getElementById('yuna-pc-header-fix')||document.createElement('style');s.id='yuna-pc-header-fix';s.textContent='@media(min-width:601px){header.top{position:sticky!important;top:0!important;z-index:9999!important;display:grid!important;grid-template-columns:1fr auto 1fr!important;align-items:center!important;min-height:64px!important;padding:0 22px!important;gap:0!important}header.top .logo{grid-column:1!important;justify-self:start!important}header.top .nav{grid-column:2!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:18px!important;margin:0!important;white-space:nowrap!important;overflow:visible!important}header.top .langbar{grid-column:3!important;justify-self:end!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:6px!important;margin:0!important}header.top .langbar a,header.top .langbar button{display:inline-flex!important;align-items:center!important;justify-content:center!important;height:40px!important;padding:0 11px!important;border:0!important;border-radius:7px!important;font-size:12px!important;font-weight:900!important;white-space:nowrap!important;text-decoration:none!important;cursor:pointer!important}}@media(max-width:600px){header.top .nav{display:none!important}header.top .langbar{position:absolute!important;right:8px!important;top:7px!important;display:flex!important;gap:6px!important;align-items:center!important}.mobile-nav{display:grid!important;grid-template-columns:repeat(5,1fr)!important}}';if(!s.parentNode)document.head.appendChild(s)
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();