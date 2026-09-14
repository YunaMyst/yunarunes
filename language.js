(function(){
'use strict';
const KEY='yunarunes-language';
const LINKS=[['index.html','Monstros'],['database.html','Database'],['team-builder.html','Team Builder'],['runes.html','Runas'],['optimizer.html','Optimizer']];
function lang(){try{return localStorage.getItem(KEY)==='en'?'en':'pt'}catch(e){return'pt'}}
function file(){return(location.pathname.split('/').pop()||'index.html').split('?')[0]||'index.html'}
function boot(){
 const headers=[...document.querySelectorAll('header.top')];
 if(!headers.length)return;
 const h=headers[0];
 headers.slice(1).forEach(x=>x.remove());
 h.querySelectorAll('.mobile-nav').forEach(x=>x.remove());
 let nav=h.querySelector('nav:not(.mobile-nav)');
 if(!nav){nav=document.createElement('nav');h.appendChild(nav)}
 nav.className='nav';
 nav.innerHTML=LINKS.map(([href,label])=>'<a href="'+href+'" data-i18n="'+label+'">'+label+'</a>').join('');
 nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',(a.getAttribute('href')||'').split('?')[0]===file()));
 let bar=h.querySelector('.langbar');
 if(!bar){bar=document.createElement('div');bar.className='langbar';h.appendChild(bar)}
 bar.innerHTML='<a href="./downloads/yunarunes.apk" download title="Download APK">📱 APK</a><button type="button" data-lang="pt">🇧🇷 PT/BR</button><button type="button" data-lang="en">🇬🇧 ENG</button>';
 bar.querySelectorAll('[data-lang]').forEach(b=>{b.classList.toggle('active',b.dataset.lang===lang());b.onclick=()=>{try{localStorage.setItem(KEY,b.dataset.lang)}catch(e){}location.reload()}});
 const s=document.getElementById('yuna-header-clean')||document.createElement('style');
 s.id='yuna-header-clean';
 s.textContent='header.top{position:sticky!important;top:0!important;z-index:100!important}header.top .nav{display:flex!important}header.top .mobile-nav{display:none!important}@media(min-width:601px){header.top{display:grid!important;grid-template-columns:1fr auto 1fr!important;align-items:center!important;min-height:64px!important;padding:0 22px!important;gap:0!important}header.top .logo{grid-column:1!important;grid-row:1!important;justify-self:start!important}header.top .nav{grid-column:2!important;grid-row:1!important;align-items:center!important;justify-content:center!important;gap:18px!important;margin:0!important;white-space:nowrap!important;overflow:visible!important}header.top .langbar{grid-column:3!important;grid-row:1!important;justify-self:end!important;display:flex!important;align-items:center!important;gap:6px!important;margin:0!important}header.top .langbar a,header.top .langbar button{display:inline-flex!important;align-items:center!important;justify-content:center!important;height:40px!important;padding:0 11px!important;border:0!important;border-radius:7px!important;font-size:12px!important;font-weight:900!important;white-space:nowrap!important;text-decoration:none!important;cursor:pointer!important}}@media(max-width:600px){header.top{display:block!important;padding:8px 10px 0!important}header.top .logo{display:block!important;padding:3px 5px 10px!important;font-size:28px!important}header.top .nav{display:grid!important;grid-template-columns:repeat(5,1fr)!important;gap:0!important;margin:0 -10px!important;border-top:1px solid var(--border,#2b3742)!important;padding:8px 3px!important;overflow:visible!important}header.top .nav a{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;font-size:10px!important;text-align:center!important}header.top .nav a:before{font-size:20px!important;line-height:1!important;color:#5fc7f5!important}header.top .nav a:nth-child(1):before{content:"⌂"}header.top .nav a:nth-child(2):before{content:"▤"}header.top .nav a:nth-child(3):before{content:"⚔"}header.top .nav a:nth-child(4):before{content:"◇"}header.top .nav a:nth-child(5):before{content:"⚙"}header.top .langbar{position:absolute!important;right:8px!important;top:7px!important;display:flex!important;gap:6px!important;align-items:center!important}header.top .langbar a,header.top .langbar button{height:38px!important;padding:0 7px!important;font-size:10px!important}}';
 if(!s.parentNode)document.head.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();