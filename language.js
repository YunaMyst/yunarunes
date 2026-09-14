(function(){
'use strict';
const KEY='yunarunes-language';
function lang(){try{return localStorage.getItem(KEY)==='en'?'en':'pt'}catch(e){return'pt'}}
function file(){return(location.pathname.split('/').pop()||'index.html').split('?')[0]||'index.html'}
function boot(){
 const h=document.querySelector('header.top');
 if(!h)return;
 document.querySelectorAll('header.top').forEach((x,i)=>{if(i)x.remove()});
 const nav=h.querySelector('.nav')||h.querySelector('nav:not(.mobile-nav)');
 if(nav){nav.classList.add('nav');nav.querySelectorAll('a').forEach(a=>{const u=(a.getAttribute('href')||'').split('?')[0];a.style.display=['index.html','database.html','team-builder.html','runes.html','optimizer.html'].includes(u)?'':'none';});nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',(a.getAttribute('href')||'').split('?')[0]===file()));}
 let bar=h.querySelector('.langbar');
 if(!bar){bar=document.createElement('div');bar.className='langbar';h.appendChild(bar)}
 bar.innerHTML='<a href="./downloads/yunarunes.apk" download title="Download APK">📱 APK</a><button type="button" data-lang="pt">🇧🇷 PT/BR</button><button type="button" data-lang="en">🇬🇧 ENG</button>';
 bar.querySelectorAll('[data-lang]').forEach(b=>{b.classList.toggle('active',b.dataset.lang===lang());b.onclick=()=>{try{localStorage.setItem(KEY,b.dataset.lang)}catch(e){}location.reload()}});
 const mv=h.querySelector('.mobile-nav');
 const s=document.getElementById('yuna-header-clean')||document.createElement('style');s.id='yuna-header-clean';s.textContent='header.top .mobile-nav{display:none!important}@media(max-width:600px){header.top .nav{display:none!important}header.top .mobile-nav{display:grid!important;grid-template-columns:repeat(5,1fr)!important}header.top .langbar{position:absolute!important;right:8px!important;top:7px!important;display:flex!important;gap:6px!important;align-items:center!important}}@media(min-width:601px){header.top{position:sticky!important;top:0!important;display:grid!important;grid-template-columns:1fr auto 1fr!important;align-items:center!important;min-height:64px!important;padding:0 22px!important;gap:0!important}header.top .logo{grid-column:1!important;justify-self:start!important}header.top .nav{grid-column:2!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:18px!important;margin:0!important;white-space:nowrap!important;overflow:visible!important}header.top .langbar{grid-column:3!important;justify-self:end!important;display:flex!important;align-items:center!important;gap:6px!important;margin:0!important}header.top .langbar a,header.top .langbar button{display:inline-flex!important;align-items:center!important;justify-content:center!important;height:40px!important;padding:0 11px!important;border:0!important;border-radius:7px!important;font-size:12px!important;font-weight:900!important;white-space:nowrap!important;text-decoration:none!important;cursor:pointer!important}}';if(!s.parentNode)document.head.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();