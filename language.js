(function(){
'use strict';
const KEY='yunarunes-language';
function getLang(){try{return localStorage.getItem(KEY)==='en'?'en':'pt'}catch(e){return 'pt'}}
function fixHeader(){
 const bar=document.querySelector('.langbar');
 if(!bar)return;
 const style=document.getElementById('yuna-pc-header-fix')||document.createElement('style');
 style.id='yuna-pc-header-fix';
 style.textContent='@media(min-width:601px){header.top{position:sticky!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:0 230px!important;gap:28px!important}.logo{position:absolute!important;left:22px!important}.nav{display:flex!important;justify-content:center!important;align-items:center!important;margin:auto!important}.langbar{position:absolute!important;right:22px!important;top:50%!important;transform:translateY(-50%)!important;margin:0!important;display:flex!important;visibility:visible!important;opacity:1!important;z-index:9999!important}.langbar a,.langbar button{display:inline-flex!important;visibility:visible!important;opacity:1!important;align-items:center!important;justify-content:center!important;height:40px!important;padding:0 11px!important}}';
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