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
const cacheKey='yunarunes-i18n-cache-v10';
const targetNames={pt:'Portuguese',en:'English',ko:'Korean',fr:'French',de:'German',es:'Spanish',ja:'Japanese'};
let locale='pt', busy=false, observer=null, pending=new Set(), scheduled=false;
const translated=new WeakSet(), lastWritten=new WeakMap(), originalText=new WeakMap(), retryCount=new WeakMap(), protectedTags=new Set(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','CODE','PRE','KBD','SAMP']);
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
async function getJson(url,timeoutMs=12000){
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),timeoutMs);
 try{const response=await fetch(url,{credentials:'omit',cache:'force-cache',signal:controller.signal});if(!response.ok)return null;return await response.json()}
 catch(_){return null}finally{clearTimeout(timer)}
}
async function translateOne(text){
 // The site contains Portuguese plus English labels and dynamically loaded
 // content. Auto-detect the source first so mixed-language sections are covered.
 const request=async source=>{
  const u=new URL('https://translate.googleapis.com/translate_a/single');
  u.searchParams.set('client','gtx');u.searchParams.set('sl',source);u.searchParams.set('tl',locale);u.searchParams.set('dt','t');u.searchParams.set('q',text);
  const data=await getJson(u.toString(),12000);
  if(!data)return {failed:true,value:null};
  const value=googleSegments(data);
  return {failed:false,value:value&&clean(value)!==clean(text)?value:null};
 };
 const automatic=await request('auto');
 if(automatic.value)return automatic.value;
 // If auto-detection returned no usable response, retry explicitly as Portuguese.
 if(automatic.failed){const fallback=await request('pt');return fallback.value||null;}
 return null;
}
async function endpoint(texts){
 // Bound concurrency: translate in parallel rather than serial batches. A slow
 // external provider must never keep the entire page waiting for minutes.
 const out=new Array(texts.length);
 const concurrency=4;
 for(let i=0;i<texts.length;i+=concurrency){
  const group=texts.slice(i,i+concurrency);
  const values=await Promise.all(group.map(async text=>{
   const pieces=splitForProvider(text);
   if(pieces.length===1)return translateOne(text);
   const translated=await Promise.all(pieces.map(piece=>translateOne(piece)));
   return translated.every(Boolean)?translated.join(' '):null;
  }));
  values.forEach((value,j)=>{out[i+j]=value});
 }
 return out;
}
async function translatePending(){
 if(busy||!pending.size)return;
 busy=true;
 const runLocale=locale;
 const nodes=Array.from(pending);pending.clear();
 const work=[];
 for(const n of nodes){
  if(!n.isConnected||protectedNode(n))continue;
  const displayed=n.nodeValue, original=originalText.has(n)?originalText.get(n):displayed, key=locale+'|'+original;
  const explicitKo=locale==='ko'&&n.parentElement&&n.parentElement.closest('[data-ko]')?.getAttribute('data-ko');
  if(explicitKo){work.push({node:n,original,displayed,value:explicitKo,key:null});continue}
  if(cache[key]){work.push({node:n,original,displayed,value:cache[key],key:null});continue}
  work.push({node:n,original,displayed,key,value:null});
 }
 // Fetch every missing translation first. Do not update the visible page batch by
 // batch: that caused the whole page to visibly flicker between languages.
 for(let i=0;i<work.length;i+=24){
  const batch=work.slice(i,i+24).filter(x=>x.value===null);
  if(!batch.length)continue;
  const values=await endpoint(batch.map(x=>x.original));
  batch.forEach((x,j)=>{
   const v=values[j];
   if(v){x.value=v;cache[x.key]=v;retryCount.delete(x.node)}
   else{
    const tries=retryCount.get(x.node)||0;
    if(tries<7){retryCount.set(x.node,tries+1);pending.add(x.node)}
   }
  });
 }
 // Ignore responses from a language that was replaced while requests were in flight.
 if(locale!==runLocale){busy=false;nodes.forEach(n=>pending.add(n));queue();return;}
 // Commit all translations in one browser task so users see one stable language.
 for(const x of work){
  if(!x.value||!x.node.isConnected||x.node.nodeValue!==x.displayed)continue;
  if(!originalText.has(x.node))originalText.set(x.node,x.original);
  lastWritten.set(x.node,x.value);x.node.nodeValue=x.value;x.node.__yunaIntlDone=true;translated.add(x.node);
 }
 saveCache();busy=false;
 if(pending.size){const delay=Math.min(30000,1200*Math.pow(2,Math.min(5,Math.max(...Array.from(pending,n=>retryCount.get(n)||0)))));setTimeout(queue,delay)}
}
const pendingAttributes=new Map();
let attributeBusy=false,attributeScheduled=false;
function queueAttributeTranslations(){
 if(attributeScheduled||attributeBusy||!pendingAttributes.size)return;
 attributeScheduled=true;
 const run=async()=>{
  attributeScheduled=false;
  if(attributeBusy||!pendingAttributes.size)return;
  attributeBusy=true;
  const jobs=Array.from(pendingAttributes.values());pendingAttributes.clear();
  const runLocale=locale;
  const missing=jobs.filter(job=>!cache[job.key]);
  try{
   const translatedValues=[];
   for(let i=0;i<missing.length;i+=24){
    const batch=missing.slice(i,i+24);
    const values=await endpoint(batch.map(job=>job.source));
    batch.forEach((job,index)=>translatedValues.push({job,value:values[index]}));
   }
   if(locale!==runLocale)return;
   const results=new Map(translatedValues.map(item=>[item.job,item.value]));
   // Apply all completed attribute translations together, avoiding one-by-one repaint flicker.
   jobs.forEach(job=>{
    if(!job.el.isConnected||locale==='pt')return;
    const value=cache[job.key]||results.get(job);
    const live=job.el.getAttribute(job.attr);
    const originals=attributeOriginals.get(job.el)||{};
    if(value&&live===job.source){
     job.el.setAttribute(job.attr,value);
     originals[job.attr]={source:job.source,translated:value,pending:false};
     cache[job.key]=value;
     const retries=attributeRetries.get(job.el)||{};delete retries[job.attr];attributeRetries.set(job.el,retries);
    }else if(!value){
     const retries=attributeRetries.get(job.el)||{};
     const count=retries[job.attr]||0;
     originals[job.attr]={source:job.source,translated:null,pending:false};
     if(count<7){
      retries[job.attr]=count+1;attributeRetries.set(job.el,retries);
      setTimeout(()=>{if(job.el.isConnected&&locale!=='pt')translateAttributes(job.el)},Math.min(30000,1500*Math.pow(2,count)));
     }
    }
    attributeOriginals.set(job.el,originals);
   });
   saveCache();
  }catch(error){
   jobs.forEach(job=>{
    const originals=attributeOriginals.get(job.el)||{};
    if(originals[job.attr])originals[job.attr].pending=false;
    attributeOriginals.set(job.el,originals);
    setTimeout(()=>{if(job.el.isConnected&&locale!=='pt')translateAttributes(job.el)},1800);
   });
  }finally{
   attributeBusy=false;
   if(pendingAttributes.size)queueAttributeTranslations();
  }
 };
 if(typeof requestIdleCallback==='function')requestIdleCallback(run,{timeout:500});else setTimeout(run,50);
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
   const source=previous&&(current===previous.translated||current===previous.source)?previous.source:current;
   if(locale==='pt'){
    if(previous&&previous.translated&&current===previous.translated)el.setAttribute(attr,source);
    originals[attr]={source,translated:null,pending:false};
    return;
   }
   const key=locale+'|@'+attr+'|'+source;
   if(cache[key]){
    // Do not write an attribute when it already has this translation.
    // Rewriting an identical value still fires MutationObserver and used to
    // create a permanent translation/observer loop that blocked the page.
    if(current!==cache[key])el.setAttribute(attr,cache[key]);
    originals[attr]={source,translated:cache[key],pending:false};
    return;
   }
   if(previous&&previous.source===source&&previous.pending)return;
   originals[attr]={source,translated:null,pending:true};
   pendingAttributes.set(el.getAttribute('id')+'|'+attr+'|'+source+'|'+Math.random(),{el,attr,source,key});
  });
 });
 queueAttributeTranslations();
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
  const select=document.createElement('select');select.id='yuna-international-select';select.value=locale;select.setAttribute('aria-label','Choose language');select.setAttribute('title','Choose the language for the entire YunaRunes site');
  select.style.cssText='width:132px;max-width:min(132px,42vw);min-width:0;padding:7px 8px;border:1px solid #34475a;border-radius:8px;background:#111c27;color:#fff;font-weight:700;font-size:12px;';
  LANGS.forEach(([code,name])=>{const o=document.createElement('option');o.value=code;o.textContent=name;select.appendChild(o)});
  select.addEventListener('change',()=>{if(typeof window.yunaSetLanguage==='function')window.yunaSetLanguage(select.value);else{locale=select.value;switchLocale(locale)}});
  wrap.append(label,select);
  controls.appendChild(wrap);
 }
 const select=wrap.querySelector('select');
 if(select){
  let saved=locale;try{const stored=localStorage.getItem(KEY);if(LANGS.some(x=>x[0]===stored))saved=stored}catch(_){}
  locale=saved;select.value=saved;
 }
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
 function switchLocale(next){
  if(!LANGS.some(item=>item[0]===next))return;
  locale=next;
  pending.clear();pendingAttributes.clear();
  // Keep the currently displayed language in place while the next language
  // is prepared. This avoids flashing back to Portuguese on every switch.
  if(next==='pt'){
   [document.head,document.body].forEach(root=>{
    if(!root)return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
     const original=originalText.get(node),written=lastWritten.get(node);
     if(original!==undefined&&written!==undefined&&node.nodeValue===written){
      node.nodeValue=original;lastWritten.delete(node);
     }
    }
   });
  }
  pending.clear();
  pendingAttributes.clear();
  try{localStorage.setItem(KEY,next);if(next==='pt'||next==='en')localStorage.setItem('yunarunes-language',next)}catch(_){}
  document.documentElement.lang=next==='pt'?'pt-BR':next;
  const picker=document.querySelector('#yuna-international-select');if(picker)picker.value=next;
  if(next!=='pt'){
   // Requeue existing translated nodes using their preserved source text.
   [document.head,document.body].forEach(root=>{
    if(!root)return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
     if(originalText.has(node))pending.add(node);
     else addText(node);
    }
   });
   translateAttributes(document.head);translateAttributes(document.body);queue();
  }else{
   [document.head,document.body].forEach(root=>{
    if(!root)return;
    addTree(root);
    translateAttributes(root);
   });
  }
 }
 window.addEventListener('yunarunes-language-applied',event=>{
  const next=String(event&&event.detail||'').toLowerCase();
  switchLocale(next);
 });
 const headerObserver=new MutationObserver(()=>makePicker());
 headerObserver.observe(document.body,{subtree:true,childList:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();