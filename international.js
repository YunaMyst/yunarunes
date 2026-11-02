/* YunaRunes International — full-page UI translation layer.
 * Preserves game names, code, JSON, scripts and explicitly protected content.
 * Uses the existing PT/EN dictionary first, then Google Translate for all remaining
 * visible text and dynamic content. The selected locale persists across pages.
 */
(()=>{'use strict';
const KEY='yunarunes-locale';
const LANGS=[
 ['pt','🇧🇷 Português'],['en','🇬🇧 English'],['ko','🇰🇷 한국어'],
 ['fr','🇫🇷 Français'],['de','🇩🇪 Deutsch'],['es','🇪🇸 Español'],['ja','🇯🇵 日本語']
];
const cacheKey='yunarunes-i18n-cache-v1';
const targetNames={pt:'Portuguese',en:'English',ko:'Korean',fr:'French',de:'German',es:'Spanish',ja:'Japanese'};
let locale='pt', busy=false, observer=null, pending=new Set(), scheduled=false;
const translated=new WeakSet(), protectedTags=new Set(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','CODE','PRE','KBD','SAMP']);
let cache={};
try{cache=JSON.parse(localStorage.getItem(cacheKey)||'{}')}catch(_){}
function saveCache(){try{localStorage.setItem(cacheKey,JSON.stringify(cache))}catch(_){}}
function protectedNode(n){
 if(!n)return true;
 const el=n.nodeType===1?n:n.parentElement;
 if(!el)return false;
 if(protectedTags.has(el.tagName)||el.closest('script,style,noscript,textarea,code,pre,kbd,samp,[data-no-translate],[translate="no"],.notranslate,[contenteditable="true"],input,select,option'))return true;
 if(el.closest('.monster-name,[data-monster-name],.summoner-name,[data-preserve-name]'))return true;
 return false;
}
function clean(s){return (s||'').replace(/\s+/g,' ').trim()}
function addText(n){
 if(!n||n.nodeType!==3||protectedNode(n)||!clean(n.nodeValue))return;
 if(n.__yunaIntlDone)return;
 pending.add(n);
}
function addTree(root){
 if(!root)return;
 if(root.nodeType===3){addText(root);return}
 if(root.nodeType!==1||protectedNode(root))return;
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 let n;while((n=walker.nextNode()))addText(n);
}
function queue(){
 if(scheduled||busy)return;
 scheduled=true;
 const run=()=>{scheduled=false;translatePending()};
 if('requestIdleCallback'in window)requestIdleCallback(run,{timeout:1000});else setTimeout(run,80);
}
function endpoint(texts){
 const u=new URL('https://translate.googleapis.com/translate_a/single');
 u.searchParams.set('client','gtx');u.searchParams.set('sl','auto');u.searchParams.set('tl',locale);u.searchParams.set('dt','t');
 texts.forEach(t=>u.searchParams.append('q',t));
 return fetch(u.toString(),{credentials:'omit'}).then(r=>{if(!r.ok)throw Error('translation unavailable');return r.json()}).then(data=>texts.map((_,i)=>(data[i]||[]).map(part=>part&&part[0]||'').join('')||texts[i]));
}
async function translatePending(){
 if(busy||locale==='pt'||!pending.size)return;
 busy=true;
 const nodes=Array.from(pending);pending.clear();
 const work=[];
 for(const n of nodes){
  if(!n.isConnected||protectedNode(n))continue;
  const original=n.nodeValue, key=locale+'|'+original;
  if(cache[key]){n.nodeValue=cache[key];n.__yunaIntlDone=true;translated.add(n);continue}
  work.push({node:n,original,key});
 }
 // Small batches avoid URL-size limits and keep the page responsive.
 for(let i=0;i<work.length;i+=8){
  const batch=work.slice(i,i+8);
  try{
   const values=await endpoint(batch.map(x=>x.original));
   batch.forEach((x,j)=>{if(!x.node.isConnected)return;const v=values[j];if(v){cache[x.key]=v;x.node.nodeValue=v;x.node.__yunaIntlDone=true;translated.add(x.node)}});
  }catch(err){console.warn('YunaRunes translation batch failed:',err)}
 }
 saveCache();busy=false;
 if(pending.size)queue();
}
function translateAttributes(root){
 const nodes=[];
 if(root.nodeType===1)nodes.push(root);
 if(root.querySelectorAll)nodes.push(...root.querySelectorAll('[placeholder],[title],[aria-label]'));
 nodes.forEach(el=>{
  if(protectedNode(el))return;
  ['placeholder','title','aria-label'].forEach(attr=>{
   const val=el.getAttribute(attr);if(!val||!clean(val))return;
   const key=locale+'|@'+attr+'|'+val;
   if(cache[key]){el.setAttribute(attr,cache[key]);return}
   if(el.getAttribute('data-yuna-intl-'+attr))return;
   el.setAttribute('data-yuna-intl-'+attr,val);
   endpoint([val]).then(a=>{if(a[0]){cache[key]=a[0];el.setAttribute(attr,a[0]);saveCache()}}).catch(()=>{});
  });
 });
}
function makePicker(){
 // Remove the previous row of individual language buttons from the header.
 document.querySelectorAll('.yuna-language-controls').forEach(el=>el.remove());
 const nav=document.querySelector('header.top .nav, header .nav, .nav');
 if(!nav)return false;
 if(nav.querySelector('#yuna-international-picker'))return true;
 const wrap=document.createElement('div');wrap.id='yuna-international-picker';
 wrap.style.cssText='display:flex;align-items:center;gap:6px;margin-left:auto;flex:0 0 auto;position:relative;z-index:8;';
 const label=document.createElement('label');label.htmlFor='yuna-international-select';label.textContent='🌐';label.style.cssText='font-size:18px;';
 const select=document.createElement('select');select.id='yuna-international-select';select.setAttribute('aria-label','Choose language');
 select.style.cssText='width:132px;max-width:132px;min-width:0;padding:8px 9px;border:1px solid #34475a;border-radius:9px;background:#111c27;color:#fff;font-weight:700;font-size:12px;';
 LANGS.forEach(([code,name])=>{const o=document.createElement('option');o.value=code;o.textContent=name;select.appendChild(o)});
 select.value=locale;
 select.addEventListener('change',()=>{try{localStorage.setItem(KEY,select.value)}catch(_){};location.reload()});
 wrap.append(label,select);nav.appendChild(wrap);
 if(matchMedia('(max-width:1024px), (pointer:coarse)').matches){
  wrap.style.position='absolute';wrap.style.right='10px';wrap.style.top='7px';wrap.style.marginLeft='0';
 }
 return true;
}
function boot(){
 try{locale=localStorage.getItem(KEY)||'pt'}catch(_){locale='pt'}
 if(!LANGS.some(x=>x[0]===locale))locale='pt';
 // Normalize to Portuguese first so every locale starts from the same source language.
 if(typeof window.yunaSetLanguage==='function'){
  window.yunaSetLanguage('pt');
  if(locale==='en')window.yunaSetLanguage('en');
 }
 document.documentElement.lang=locale==='pt'?'pt-BR':locale;
 makePicker();
 if(locale!=='pt'){
  addTree(document.body);translateAttributes(document.body);queue();
 }
 observer=new MutationObserver(records=>{
  records.forEach(r=>{
   if(r.type==='childList')r.addedNodes.forEach(n=>{addTree(n);translateAttributes(n)});
   else if(r.type==='characterData'&&!r.target.__yunaIntlDone)addText(r.target);
  });
  if(locale!=='pt')queue();
 });
 observer.observe(document.body,{subtree:true,childList:true,characterData:true});
 const headerObserver=new MutationObserver(()=>makePicker());
 headerObserver.observe(document.body,{subtree:true,childList:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,250),{once:true});else setTimeout(boot,250);
})();