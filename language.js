(function(){
'use strict';
const KEY='yunarunes-language';
function getLang(){try{return localStorage.getItem(KEY)==='en'?'en':'pt'}catch(e){return 'pt'}}
function fixHeader(){
 const bar=document.querySelector('.langbar');
 if(!bar)return;
 const style=document.getElementById('yuna-pc-header-fix')||document.createElement('style');
 style.id='yuna-pc-header-fix';
 style.textContent=`
@media(min-width:601px){
 header.top{position:sticky!important;top:0!important;display:grid!important;grid-template-columns:1fr auto 1fr!important;align-items:center!important;min-height:64px!important;padding:0 22px!important;gap:0!important}
 header.top .logo{grid-column:1!important;grid-row:1!important;justify-self:start!important;position:static!important;margin:0!important;transform:none!important}
 header.top .nav{grid-column:2!important;grid-row:1!important;position:static!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:18px!important;margin:0!important;transform:none!important;white-space:nowrap!important}
 header.top .langbar{grid-column:3!important;grid-row:1!important;justify-self:end!important;position:static!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:6px!important;margin:0!important;transform:none!important;visibility:visible!important;opacity:1!important;z-index:9999!important}
 header.top .langbar a,header.top .langbar button{display:inline-flex!important;align-items:center!important;justify-content:center!important;visibility:visible!important;opacity:1!important;height:40px!important;padding:0 11px!important;white-space:nowrap!important}
}
@media(max-width:600px){header.top .nav{display:none!important}}
`;
 if(!style.parentNode)document.head.appendChild(style);
}
function bind(){
 document.querySelectorAll('.langbar button[data-lang]').forEach(function(b){
  if(b.dataset.yunaBound)return;
  b.dataset.yunaBound='1';
  b.addEventListener('click',function(){try{localStorage.setItem(KEY,b.dataset.lang)}catch(e){};window.location.reload()});
 });
}
function boot(){fixHeader();bind();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();