(function(){
'use strict';
const KEY='yunarunes-language';
const links=[
  ['index.html','Monstros'],
  ['database.html','Database'],
  ['team-builder.html','Team Builder'],
  ['runes.html','Runas'],
  ['optimizer.html','Optimizer']
];
function getLang(){try{return localStorage.getItem(KEY)==='en'?'en':'pt'}catch(e){return 'pt'}}
function activeFile(){return (location.pathname.split('/').pop()||'index.html').split('?')[0]||'index.html'}
function ensureHeader(){
 const header=document.querySelector('header.top');
 if(!header)return;
 let bar=header.querySelector('.langbar');
 if(!bar){
  bar=document.createElement('div');
  bar.className='langbar';
  bar.innerHTML='<a href="./downloads/yunarunes.apk" download title="Download APK">📱 APK</a><button data-lang="pt" type="button">🇧🇷 PT/BR</button><button data-lang="en" type="button">🇬🇧 ENG</button>';
  header.appendChild(bar);
 }
 let nav=header.querySelector('.nav');
 if(!nav){
  const oldNav=[...header.children].find(el=>el.tagName==='NAV'&&!el.classList.contains('mobile-nav'));
  if(oldNav){nav=oldNav;nav.classList.add('nav');}
  else{nav=document.createElement('nav');nav.className='nav';header.insertBefore(nav,bar)}
 }
 if(!nav.querySelector('a[href="index.html"]')){
  nav.innerHTML=links.map(([href,label])=>'<a href="'+href+'" data-i18n="'+label+'">'+label+'</a>').join('');
 }
 const af=activeFile();
 nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',(a.getAttribute('href')||'').split('?')[0]===af));
 let mobile=header.querySelector('.mobile-nav');
 if(!mobile){
  mobile=document.createElement('nav');
  mobile.className='mobile-nav';
  const icons=['⌂','▤','⚔','◇','⚙'];
  mobile.innerHTML=links.map(([href,label],i)=>'<a href="'+href+'"><span class="mi">'+icons[i]+'</span><span data-i18n="'+label+'">'+(label==='Team Builder'?'Team':label)+'</span></a>').join('');
  header.appendChild(mobile);
 }
 mobile.querySelectorAll('a').forEach(a=>a.classList.toggle('active',(a.getAttribute('href')||'').split('?')[0]===af));
}
function fixHeader(){
 const header=document.querySelector('header.top');
 if(!header)return;
 const style=document.getElementById('yuna-pc-header-fix')||document.createElement('style');
 style.id='yuna-pc-header-fix';
 style.textContent=`
@media(min-width:601px){
 header.top{position:sticky!important;top:0!important;display:grid!important;grid-template-columns:1fr auto 1fr!important;align-items:center!important;min-height:64px!important;padding:0 22px!important;gap:0!important}
 header.top .logo{grid-column:1!important;grid-row:1!important;justify-self:start!important;position:static!important;margin:0!important;transform:none!important}
 header.top .nav{grid-column:2!important;grid-row:1!important;position:static!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:18px!important;margin:0!important;transform:none!important;white-space:nowrap!important;overflow:visible!important}
 header.top .nav a{color:#cbd5dd!important;text-decoration:none!important;font-weight:700!important;font-size:14px!important}
 header.top .nav a.active,header.top .nav a:hover{color:#5fc7f5!important}
 header.top .langbar{grid-column:3!important;grid-row:1!important;justify-self:end!important;position:static!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:6px!important;margin:0!important;transform:none!important;visibility:visible!important;opacity:1!important;z-index:9999!important}
 header.top .langbar a,header.top .langbar button{display:inline-flex!important;align-items:center!important;justify-content:center!important;visibility:visible!important;opacity:1!important;height:40px!important;padding:0 11px!important;white-space:nowrap!important;border:0!important;border-radius:7px!important;font-size:12px!important;font-weight:900!important;text-decoration:none!important;cursor:pointer!important}
 header.top .langbar button{background:#202a34!important;color:#fff!important}
 header.top .langbar button.active,header.top .langbar a{background:#35a9e1!important;color:#061018!important}
}
@media(max-width:600px){
 header.top .nav{display:none!important}
 header.top .langbar{position:absolute!important;right:8px!important;top:7px!important;display:flex!important;gap:6px!important;align-items:center!important;z-index:9999!important}
 header.top .langbar a,header.top .langbar button{display:inline-flex!important;align-items:center!important;justify-content:center!important;height:38px!important;padding:0 7px!important;font-size:10px!important;white-space:nowrap!important;border:0!important;border-radius:7px!important}
}
`;
 if(!style.parentNode)document.head.appendChild(style);
}
function bind(){
 document.querySelectorAll('.langbar button[data-lang]').forEach(function(b){
  b.classList.toggle('active',b.dataset.lang===getLang());
  if(b.dataset.yunaBound)return;
  b.dataset.yunaBound='1';
  b.addEventListener('click',function(){try{localStorage.setItem(KEY,b.dataset.lang)}catch(e){};window.location.reload()});
 });
}
function boot(){ensureHeader();fixHeader();bind();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();