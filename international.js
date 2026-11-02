/* YunaRunes International — site-wide multilingual translation layer.
 * Keeps the selected locale consistent on every page and translates visible,
 * dynamically-created text and UI attributes. Preserves game names and code.
 * Uses the page's detected source language for fallback translation.
 */
(()=>{'use strict';
const KEY='yunarunes-locale';
const LANGS=[
 ['pt','🇧🇷 Português'],['en','🇬🇧 English'],['ko','🇰🇷 한국어'],
 ['fr','🇫🇷 Français'],['de','🇩🇪 Deutsch'],['es','🇪🇸 Español'],['ja','🇯🇵 日本語']
];
const cacheKey='yunarunes-i18n-cache-v6';
const targetNames={pt:'Portuguese',en:'English',ko:'Korean',fr:'French',de:'German',es:'Spanish',ja:'Japanese'};
let locale='pt', busy=false, observer=null, pending=new Set(), scheduled=false;
const translated=new WeakSet(), lastWritten=new WeakMap(), retryCount=new WeakMap(), protectedTags=new Set(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','CODE','PRE','KBD','SAMP']);
let cache={};
const attributeOriginals=new WeakMap();
const attributeRetries=new WeakMap();
try{cache=JSON.parse(localStorage.getItem(cacheKey)||'{}')}catch(_){}
function saveCache(){try{localStorage.setItem(cacheKey,JSON.stringify(cache))}catch(_){}}
function protectedNode(n){
 if(!n)return true;
 const el=n.nodeType===1?n:n.parentElement;
 if(!el)return false;
 if(protectedTags.has(el.tagName)||el.closest('script,style,noscript,textarea,code,pre,kbd,samp,[data-no-translate],[translate="no"],.notranslate,[contenteditable="true"]'))return true;
 if(el.closest('.monster-name,[data-monster-name],.summoner-name,[data-preserve-name]'))return true;
 if(el.tagName==='OPTION'&&el.parentElement&&/monster|summoner|mob/i.test((el.parentElement.id||'')+' '+(el.parentElement.className||'')))return true;
 return false;
}
function clean(s){return (s||'').replace(/\s+/g,' ').trim()}
function addText(n){
 if(!n||n.nodeType!==3||protectedNode(n)||!clean(n.nodeValue))return;
 if(lastWritten.has(n)&&n.nodeValue===lastWritten.get(n))return;
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
function splitForProvider(text){
 const parts=[];let rest=String(text||'');
 while(rest.length>180){
  let cut=rest.lastIndexOf(' ',180);if(cut<90)cut=180;
  parts.push(rest.slice(0,cut));rest=rest.slice(cut).replace(/^\s+/,'');
 }
 if(rest)parts.push(rest);
 return parts;
}
function googleSegments(data){
 // Google endpoints return either [[["translated","source",...],...],...]
 // or a compact ["translated text","detected language"] response.
 if(!Array.isArray(data))return '';
 const first=data[0];
 if(typeof first==='string')return first;
 if(!Array.isArray(first))return '';
 if(typeof first[0]==='string')return first[0]||'';
 return first.map(part=>{
  if(typeof part==='string')return part;
  return Array.isArray(part)&&typeof part[0]==='string'?part[0]:'';
 }).join('');
}
async function getJson(url,timeoutMs=10000){
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),timeoutMs);
 try{const response=await fetch(url,{credentials:'omit',cache:'no-store',signal:controller.signal});if(!response.ok)return null;return await response.json()}
 catch(_){return null}finally{clearTimeout(timer)}
}
async function translateOne(text){
 const u=new URL('https://translate.googleapis.com/translate_a/single');
 u.searchParams.set('client','gtx');u.searchParams.set('sl','pt');u.searchParams.set('tl',locale);u.searchParams.set('dt','t');u.searchParams.set('q',text);
 let data=await getJson(u.toString(),10000);
 let value=googleSegments(data);
 if(value&&clean(value)!==clean(text))return value;
 // Alternate Google web endpoint: useful when the legacy gtx endpoint is throttled.
 const alt=new URL('https://clients5.google.com/translate_a/t');
 alt.searchParams.set('client','dict-chrome-ex');alt.searchParams.set('sl','pt');alt.searchParams.set('tl',locale);alt.searchParams.set('q',text);
 data=await getJson(alt.toString(),10000);
 value=googleSegments(data);
 if(value&&clean(value)!==clean(text))return value;
 // Keyless fallback. Keep each request below MyMemory's small per-query limit.
 const pair=new URL('https://api.mymemory.translated.net/get');
 pair.searchParams.set('q',text);pair.searchParams.set('langpair','pt|'+locale);
 data=await getJson(pair.toString(),10000);
 value=data&&data.responseData&&data.responseData.translatedText;
 if(value){
  const decoder=document.createElement('textarea');decoder.innerHTML=value;
  const decoded=decoder.value||'';
  if(clean(decoded)!==clean(text))return decoded;
 }
 return null;
}
async function endpoint(texts){
 const out=[];
 for(let i=0;i<texts.length;i+=6){
  const group=texts.slice(i,i+6);
  const values=await Promise.all(group.map(async text=>{
   const pieces=splitForProvider(text);
   if(pieces.length===1)return translateOne(text);
   const translated=[];
   for(const piece of pieces){
    const value=await translateOne(piece);
    if(!value)return null;
    translated.push(value);
   }
   return translated.join(' ');
  }));
  out.push(...values);
  if(i+6<texts.length)await new Promise(resolve=>setTimeout(resolve,180));
 }
 return out;
}
async function translatePending(){
 if(busy||locale==='pt'||!pending.size)return;
 busy=true;
 const nodes=Array.from(pending);pending.clear();
 const work=[];
 for(const n of nodes){
  if(!n.isConnected||protectedNode(n))continue;
  const original=n.nodeValue, key=locale+'|'+original;
  const explicitKo=locale==='ko'&&n.parentElement&&n.parentElement.closest('[data-ko]')?.getAttribute('data-ko');
  if(explicitKo){lastWritten.set(n,explicitKo);n.nodeValue=explicitKo;n.__yunaIntlDone=true;translated.add(n);continue}
  if(cache[key]){lastWritten.set(n,cache[key]);n.nodeValue=cache[key];n.__yunaIntlDone=true;translated.add(n);continue}
  work.push({node:n,original,key});
 }
 // Small batches avoid URL-size limits and keep the page responsive.
 for(let i=0;i<work.length;i+=24){
  const batch=work.slice(i,i+24);
  const values=await endpoint(batch.map(x=>x.original));
  batch.forEach((x,j)=>{
   if(!x.node.isConnected||x.node.nodeValue!==x.original)return;
   const v=values[j];
   if(v){cache[x.key]=v;retryCount.delete(x.node);lastWritten.set(x.node,v);x.node.nodeValue=v;x.node.__yunaIntlDone=true;translated.add(x.node)}
   else{
    const tries=retryCount.get(x.node)||0;
    if(tries<4){retryCount.set(x.node,tries+1);pending.add(x.node)}
   }
  });
 }
 saveCache();busy=false;
 if(pending.size){const delay=Math.min(8000,700*Math.pow(2,Math.min(4,Math.max(...Array.from(pending,n=>retryCount.get(n)||0)))));setTimeout(queue,delay)}
}
function translateAttributes(root){
 const nodes=[];
 if(root.nodeType===1)nodes.push(root);
 if(root.querySelectorAll)nodes.push(...root.querySelectorAll('[placeholder],[title],[aria-label],[aria-description],[aria-placeholder],[alt],[data-placeholder],[data-tooltip],[data-label],[data-original-title],[value],meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"]'));
 const attrs=['placeholder','title','aria-label','aria-description','aria-placeholder','alt','data-placeholder','data-tooltip','data-label','data-original-title','value','content'];
 nodes.forEach(el=>{
  if(protectedNode(el))return;
  let originals=attributeOriginals.get(el);
  if(!originals){originals={};attributeOriginals.set(el,originals)}
  attrs.forEach(attr=>{
   if(attr==='value'&&!(el.tagName==='BUTTON'||(el.tagName==='INPUT'&&/^(button|submit|reset)$/i.test(el.type))))return;
   if(attr==='content'&&!((el.tagName==='META')&&/^(description|og:title|og:description|twitter:title|twitter:description)$/i.test(el.getAttribute('name')||el.getAttribute('property')||'')))return;
   const current=el.getAttribute(attr);if(!current||!clean(current))return;
   const previous=originals[attr];
   if(previous&&current===previous.translated)return;
   const source=previous&&current===previous.source?previous.source:current;
   const key=locale+'|@'+attr+'|'+source;
   if(locale==='pt')return;
   if(cache[key]){
    el.setAttribute(attr,cache[key]);
    originals[attr]={source,translated:cache[key]};
    return;
   }
   if(previous&&previous.source===source&&previous.pending)return;
   originals[attr]={source,translated:null,pending:true};
   endpoint([source]).then(a=>{
    const translatedValue=a[0];
    if(!translatedValue){
     const retries=attributeRetries.get(el)||{};const count=retries[attr]||0;
     if(count<4){retries[attr]=count+1;attributeRetries.set(el,retries);originals[attr]={source,translated:null,pending:false};setTimeout(()=>{if(el.isConnected&&locale!=='pt')translateAttributes(el)},Math.min(10000,1200*Math.pow(2,count)))}
     else originals[attr]={source,translated:null,pending:false};
     return;
    }
    const retries=attributeRetries.get(el)||{};delete retries[attr];attributeRetries.set(el,retries);
    cache[key]=translatedValue;
    const live=el.getAttribute(attr);
    if(live===source){
     el.setAttribute(attr,translatedValue);
     originals[attr]={source,translated:translatedValue,pending:false};
    }else if(live===translatedValue){
     originals[attr]={source,translated:translatedValue,pending:false};
    }
    saveCache();
   }).catch(()=>{if(originals[attr]&&originals[attr].source===source)delete originals[attr];setTimeout(()=>{if(el.isConnected&&locale!=='pt')translateAttributes(el)},1800)});
  });
 });
}
function makePicker(){
 const header=document.querySelector('header.academy-site-header, header.top, header');
 if(!header)return false;
 // Use the existing header control group on every YunaRunes page.
 let controls=header.querySelector('.academy-site-controls,.yuna-controls,.header-controls,.runes-header-controls,.optimizer-header-controls,.yuna-language-controls');
 if(!controls){
  const legacy=header.querySelector('[data-lang="pt"],[data-lang="en"]');
  controls=legacy&&legacy.parentElement!==header?legacy.parentElement:null;
 }
 if(!controls){
  controls=document.createElement('div');
  controls.className='yuna-language-controls';
  controls.style.cssText='display:inline-flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap;min-width:0;';
  header.appendChild(controls);
 }
 // Remove the old separate language buttons, keeping all other header actions.
 controls.querySelectorAll('[data-lang="pt"],[data-lang="en"]').forEach(el=>el.remove());
 let wrap=controls.querySelector('#yuna-international-picker');
 if(!wrap){
  wrap=document.createElement('div');wrap.id='yuna-international-picker';wrap.setAttribute('data-no-translate','true');
  wrap.style.cssText='display:inline-flex;align-items:center;gap:5px;flex:0 0 auto;margin-left:0;max-width:100%;';
  const label=document.createElement('label');label.htmlFor='yuna-international-select';label.textContent='🌐';label.style.cssText='font-size:17px;line-height:1;flex:0 0 auto;';
  const select=document.createElement('select');select.id='yuna-international-select';select.setAttribute('aria-label','Choose language');select.setAttribute('title','Choose the language for the entire YunaRunes site');
  select.style.cssText='width:132px;max-width:min(132px,42vw);min-width:0;padding:7px 8px;border:1px solid #34475a;border-radius:8px;background:#111c27;color:#fff;font-weight:700;font-size:12px;';
  LANGS.forEach(([code,name])=>{const o=document.createElement('option');o.value=code;o.textContent=name;select.appendChild(o)});
  select.addEventListener('change',()=>{try{localStorage.setItem(KEY,select.value);if(select.value==='en'||select.value==='pt')localStorage.setItem('yunarunes-language',select.value)}catch(_){};location.reload()});
  wrap.append(label,select);
  controls.appendChild(wrap);
 }
 const select=wrap.querySelector('select');
 if(select)select.value=locale;
 return true;
}
function boot(){
 try{const saved=localStorage.getItem(KEY),legacy=localStorage.getItem('yunarunes-language');locale=(saved&&LANGS.some(x=>x[0]===saved))?saved:(legacy||'pt')}catch(_){locale='pt'}
 if(!LANGS.some(x=>x[0]===locale))locale='pt';
 // Normalize to Portuguese first so every locale starts from the same source language.
 if(typeof window.yunaSetLanguage==='function'){
  // Keep the legacy PT/EN selector and this full-site selector in sync.
  // Never force Portuguese over an English choice saved by language.js.
  window.yunaSetLanguage(locale,true);
 }
 try{localStorage.setItem(KEY,locale);if(locale==='en'||locale==='pt')localStorage.setItem('yunarunes-language',locale)}catch(_){}
 document.documentElement.lang=locale==='pt'?'pt-BR':locale;
 makePicker();
 if(locale!=='pt'){
  addTree(document.head);addTree(document.body);translateAttributes(document.head);translateAttributes(document.body);queue();
 }
 observer=new MutationObserver(records=>{
  records.forEach(r=>{
   if(r.type==='childList')r.addedNodes.forEach(n=>{addTree(n);translateAttributes(n)});
   else if(r.type==='characterData'&&r.target.nodeValue!==lastWritten.get(r.target))addText(r.target); else if(r.type==='attributes'){const el=r.target;translateAttributes(el)}
  });
  if(locale!=='pt')queue();
 });
 observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label','aria-description','aria-placeholder','alt','data-placeholder','data-tooltip','data-label','data-original-title','value','content']});
 observer.observe(document.head,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['content','title','aria-label','alt']});
 window.addEventListener('yunarunes-language-applied',event=>{
  const next=String(event&&event.detail||'').toLowerCase();
  if(!LANGS.some(item=>item[0]===next))return;
  locale=next;
  try{localStorage.setItem(KEY,next);if(next==='pt'||next==='en')localStorage.setItem('yunarunes-language',next)}catch(_){}
  document.documentElement.lang=next==='pt'?'pt-BR':next;
  const picker=document.querySelector('#yuna-international-select');if(picker)picker.value=next;
  if(next!=='pt'){
   addTree(document.head);addTree(document.body);
   translateAttributes(document.head);translateAttributes(document.body);queue();
  }
 });
 const headerObserver=new MutationObserver(()=>makePicker());
 headerObserver.observe(document.body,{subtree:true,childList:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,250),{once:true});else setTimeout(boot,250);
})();