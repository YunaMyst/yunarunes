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
const cacheKey='yunarunes-i18n-cache-v55';
// Start with a clean cache: older entries were generated while the source
// language was incorrectly forced to Portuguese for English/mixed-language UI.
const previousCacheKeys=[];
const targetNames={pt:'Portuguese',en:'English',ko:'Korean',fr:'French',de:'German',es:'Spanish',ja:'Japanese'};
let locale='pt', busy=false, observer=null, pending=new Set(), scheduled=false, localeController=new AbortController();
const translated=new WeakSet(), trackedTextNodes=new Set(), trackedAttributeElements=new Set(), lastWritten=new WeakMap(), originalText=new WeakMap(), retryCount=new WeakMap(), protectedTags=new Set(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','CODE','PRE','KBD','SAMP']);
let cache={};
const attributeOriginals=new WeakMap();
const attributeRetries=new WeakMap();
// Keep translations already cached by this browser across translator updates.
// Desktop and mobile have separate browser storage; migrating older cache keys
// prevents a new script release from forcing the desktop to translate again.
try{
 cache=JSON.parse(localStorage.getItem(cacheKey)||'{}');
 previousCacheKeys.forEach(key=>{
  try{const older=JSON.parse(localStorage.getItem(key)||'{}');Object.keys(older).forEach(k=>{if(!cache[k])cache[k]=older[k]})}catch(_){}
 });
}catch(_){cache={}}
function saveCache(){try{localStorage.setItem(cacheKey,JSON.stringify(cache))}catch(_){}}
function protectedNode(n){
 if(!n)return true;
 const el=n.nodeType===1?n:n.parentElement;
 if(!el)return false;
 if(protectedTags.has(el.tagName)||el.closest('script,style,noscript,textarea,code,pre,kbd,samp,[contenteditable="true"],#yuna-international-picker'))return true;
 if(el.closest('.monster-name,[data-monster-name],.summoner-name,[data-preserve-name]'))return true;
 if(el.tagName==='OPTION'&&el.parentElement&&/monster|summoner|mob/i.test((el.parentElement.id||'')+' '+(el.parentElement.className||'')))return true;
 return false;
}
function clean(s){return (s||'').replace(/\s+/g,' ').trim()}
const authoredOriginals=new WeakMap();
function applyAuthoredTranslations(root=document){
 if(!root)return;
 const selector='[data-pt],[data-'+locale+'],[data-pt-placeholder],[data-'+locale+'-placeholder],[data-pt-title],[data-'+locale+'-title],[data-pt-aria-label],[data-'+locale+'-aria-label]';
 const elements=[];
 if(root.nodeType===1&&root.matches?.(selector))elements.push(root);
 if(root.querySelectorAll)elements.push(...root.querySelectorAll(selector));
 elements.forEach(el=>{
  if(protectedNode(el))return;
  const originals=authoredOriginals.get(el)||{};
  ['placeholder','title','aria-label'].forEach(attr=>{
   const source=el.getAttribute('data-pt-'+attr);
   const target=el.getAttribute('data-'+locale+'-'+attr);
   if(source!==null&&originals[attr]===undefined)originals[attr]=source;
   const value=target!==null?target:(source!==null?source:null);
   if(value!==null&&el.getAttribute(attr)!==value)el.setAttribute(attr,value);
  });
  const source=el.getAttribute('data-pt');
  const target=el.getAttribute('data-'+locale);
  if(source===null&&target===null){authoredOriginals.set(el,originals);return}
  // Buttons and labels often wrap their caption in a span or an icon element.
  // Translate the single real caption text node without destroying that markup.
  const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
  const textNodes=[];let candidate;
  while((candidate=walker.nextNode()))if(clean(candidate.nodeValue)&&!protectedNode(candidate))textNodes.push(candidate);
  if(textNodes.length!==1){authoredOriginals.set(el,originals);return}
  const node=textNodes[0];
  const base=source!==null?source:(originalText.get(node)??node.nodeValue);
  if(!originalText.has(node))originalText.set(node,base);
  if(target!==null){
   if(node.nodeValue!==target){lastWritten.set(node,target);node.nodeValue=target}
   else if(lastWritten.has(node))lastWritten.set(node,target);
   pending.delete(node);
  }else{
   // A Portuguese fallback is source text, not a completed translation.
   if(node.nodeValue!==base)node.nodeValue=base;
   lastWritten.delete(node);
   if(locale==='pt')pending.delete(node);
   else pending.add(node);
  }
  authoredOriginals.set(el,originals);
 });
}
function addText(n){
 if(!n||n.nodeType!==3||protectedNode(n)||!clean(n.nodeValue))return;
 // Preserve the true source text as soon as a text node enters the translator.
 // This lets every language switch restart from the same original wording.
 if(!originalText.has(n))originalText.set(n,n.nodeValue);
 trackedTextNodes.add(n);
 if(lastWritten.has(n)){
  if(n.nodeValue===lastWritten.get(n))return;
  // The application reused a translated text node for new dynamic content.
  // Treat the new live value as its new source instead of translating stale text.
  originalText.set(n,n.nodeValue);lastWritten.delete(n);retryCount.delete(n);
 }
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
 // Start as soon as the language selector changes; do not wait for an idle slot.
 const run=()=>{scheduled=false;translatePending()};
 setTimeout(run,0);
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
 const controller=new AbortController();const cancel=()=>controller.abort();
 localeController.signal.addEventListener('abort',cancel,{once:true});
 const timer=setTimeout(()=>controller.abort(),timeoutMs);
 try{const response=await fetch(url,{credentials:'omit',cache:'force-cache',signal:controller.signal});if(!response.ok)return null;return await response.json()}
 catch(_){return null}finally{clearTimeout(timer);localeController.signal.removeEventListener('abort',cancel)}
}
function detectSourceLanguage(text){
 const s=clean(text).toLowerCase();
 if(/[가-힣]/.test(s))return 'ko';
 if(/[ぁ-んァ-ン]/.test(s))return 'ja';
 if(/[áàâãçéêíóôõú]/i.test(s)||/\\b(o|a|os|as|de|do|da|dos|das|que|para|com|uma|um|não|seu|sua|como|mais|monstro|runas|equipa|equipes|início|aprenda)\\b/.test(s))return 'pt';
 if(/[¿¡ñ]/i.test(s)||/\\b(el|los|las|una|uno|con|más|monstruo|runas|inicio|aprende)\\b/.test(s))return 'es';
 if(/[àâçéèêëîïôûùüÿœ]/i.test(s)||/\\b(le|les|des|une|avec|pour|vous|dans|monstre|début)\\b/.test(s))return 'fr';
 if(/[äöüß]/i.test(s)||/\\b(der|die|das|und|nicht|mit|für|ein|eine|monster|runen|anfang)\\b/.test(s))return 'de';
 return 'auto';
}
async function translateOne(text,targetLocale=locale){
 // The authored English strings are already available in the page; the other
 // locales use Portuguese as their stable source. Try PT and auto-detection
 // simultaneously so a slow detection response cannot delay the translation.
 const protectedNames=[];
 const sourceText=String(text||'').replace(/Summoners\s+War|YunaRunes/gi,match=>{
  const token='YUNARUNESKEEP'+protectedNames.length+'TOKEN';
  protectedNames.push({token,value:/^summoners/i.test(match)?'Summoners War':'YunaRunes'});
  return token;
 });
 const request=async(host,source)=>{
  const u=new URL('https://'+host+'/translate_a/single');
  u.searchParams.set('client','gtx');u.searchParams.set('sl',source);
  u.searchParams.set('tl',targetLocale);u.searchParams.set('dt','t');u.searchParams.set('q',sourceText);
  const data=await getJson(u.toString(),10000);
  const value=googleSegments(data);
  return value&&clean(value)!==clean(sourceText)?value:null;
 };
 // Detect the actual source per text node. The site mixes Portuguese,
 // English and translated/authored labels; forcing every phrase to PT caused
 // English labels to remain wrong in several target languages.
 const source=detectSourceLanguage(sourceText);
 let value=await request('translate.googleapis.com',source);
 if(!value)value=await request('translate.google.com',source);
 if(!value&&source!=='auto')value=await request('translate.googleapis.com','auto');
 if(!value&&source!=='auto')value=await request('translate.google.com','auto');
 if(!value)return null;
 protectedNames.forEach(item=>{value=value.split(item.token).join(item.value)});
 return value;
}
async function endpoint(texts,targetLocale=locale){
 // Worker pool keeps many labels translating simultaneously without serial
 // waves. Results retain their original positions for safe DOM updates.
 const out=new Array(texts.length);let cursor=0;
 const worker=async()=>{
  while(cursor<texts.length){
   const index=cursor++;
   const text=texts[index];
   const pieces=splitForProvider(text);
   if(pieces.length===1){out[index]=await translateOne(text,targetLocale);continue}
   const translated=await Promise.all(pieces.map(piece=>translateOne(piece,targetLocale)));
   out[index]=translated.map((value,j)=>value||pieces[j]).join(' ');
  }
 };
 await Promise.all(Array.from({length:Math.min(8,texts.length)},worker));
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
  const displayed=n.nodeValue;
  const original=originalText.has(n)?originalText.get(n):displayed;
  const key=runLocale+'|'+original;
  // Prefer authored translations on the text's own element. The old code
  // only checked data-ko, ignoring thousands of existing data-pt/data-en values.
  // Resolve authored translations on the nearest wrapper too (e.g. a
  // button whose caption lives inside a nested span).
  let parent=n.parentElement, explicit=null;
  while(parent&&!explicit){
   const candidate=parent.getAttribute('data-'+runLocale);
   if(candidate){
    const walker=document.createTreeWalker(parent,NodeFilter.SHOW_TEXT);
    const captions=[];let textNode;
    while((textNode=walker.nextNode()))if(clean(textNode.nodeValue)&&!protectedNode(textNode))captions.push(textNode);
    if(captions.length===1&&captions[0]===n)explicit=candidate;
   }
   parent=parent.parentElement;
  }
  if(explicit&&clean(explicit)){work.push({node:n,original,displayed,value:explicit,key:null});continue}
  if(cache[key]){work.push({node:n,original,displayed,value:cache[key],key:null});continue}
  work.push({node:n,original,displayed,key,value:null});
 }
 // Translate and render small batches immediately. A large page must not wait
 // for every request to finish before showing any translated content.
 const applyBatch=batch=>{
  if(locale!==runLocale)return;
  batch.forEach(x=>{
   if(!x.value||!x.node.isConnected||x.node.nodeValue!==x.displayed)return;
   if(!originalText.has(x.node))originalText.set(x.node,x.original);
   lastWritten.set(x.node,x.value);
   x.node.nodeValue=x.value;
   x.node.__yunaIntlDone=true;
   translated.add(x.node);
  });
 };
 try{
  for(let i=0;i<work.length;i+=32){
   if(locale!==runLocale)break;
   const batch=work.slice(i,i+32);
   const missing=batch.filter(x=>x.value===null);
   if(missing.length){
    const values=await endpoint(missing.map(x=>x.original),runLocale);
    if(locale!==runLocale)break;
    missing.forEach((x,j)=>{
     const value=values[j];
     if(value){
      x.value=value;
      if(x.key)cache[x.key]=value;
      retryCount.delete(x.node);
     }else{
      const tries=retryCount.get(x.node)||0;
      if(tries<30){retryCount.set(x.node,tries+1);pending.add(x.node)}
     }
    });
   }
   applyBatch(batch);
   saveCache();
  }
 }finally{
  busy=false;
  if(locale!==runLocale){
   nodes.forEach(n=>{if(n.isConnected)pending.add(n)});
   queue();
  }else if(pending.size){
   const retries=Array.from(pending,n=>retryCount.get(n)||0);
   const delay=Math.min(15000,700*Math.pow(1.5,Math.min(8,Math.max(0,...retries))));
   setTimeout(queue,delay);
  }
 }
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
   for(let i=0;i<missing.length;i+=8){
    const batch=missing.slice(i,i+8);
    const values=await endpoint(batch.map(job=>job.source),runLocale);
    batch.forEach((job,index)=>translatedValues.push({job,value:values[index]}));
   }
   if(locale!==runLocale){
    // A language was selected while requests were running. Requeue these
    // attributes so the newly selected locale cannot leave stale labels behind.
    jobs.forEach(job=>{if(job.el.isConnected){const originals=attributeOriginals.get(job.el)||{};if(originals[job.attr])originals[job.attr].pending=false;attributeOriginals.set(job.el,originals);pendingAttributes.set(job.el.getAttribute('id')+'|'+job.attr+'|'+job.source+'|'+Math.random(),job);}});
    return;
   }
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
     if(count<20){
      retries[job.attr]=count+1;attributeRetries.set(job.el,retries);
      setTimeout(()=>{if(job.el.isConnected&&locale!=='pt')translateAttributes(job.el)},Math.min(60000,1500*Math.pow(2,Math.min(6,count))));
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
 setTimeout(run,0);
}
function translateAttributes(root){
 const nodes=[];
 if(root.nodeType===1)nodes.push(root);
 if(root.querySelectorAll)nodes.push(...root.querySelectorAll('[placeholder],[title],[aria-label],[aria-description],[aria-placeholder],[alt],[data-placeholder],[data-tooltip],[data-label],[data-original-title],[value],meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"]'));
 const attrs=['placeholder','title','aria-label','aria-description','aria-placeholder','alt','data-placeholder','data-tooltip','data-label','data-original-title','value','content'];
 nodes.forEach(el=>{
  if(protectedNode(el))return;
  trackedAttributeElements.add(el);
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
function switchLocale(next){
  if(!LANGS.some(item=>item[0]===next))return;
  // Cancel every request from the previous language immediately. This prevents
  // a slow German/Spanish/Japanese batch from blocking the newly selected locale.
  try{localeController.abort()}catch(_){}
  localeController=new AbortController();
  if(next===locale)return;
  // Always clear the previous locale before preparing the next one. Without
  // this reset, a Korean node can remain visible while its French request is
  // in flight, producing a mixed Korean/French page.
  for(const node of trackedTextNodes){
   if(!node.isConnected){trackedTextNodes.delete(node);continue;}
   const original=originalText.get(node),written=lastWritten.get(node);
   if(original!==undefined&&written!==undefined&&node.nodeValue===written){lastWritten.delete(node);node.nodeValue=original;}
  }
  for(const el of trackedAttributeElements){
   if(!el.isConnected){trackedAttributeElements.delete(el);continue;}
   const originals=attributeOriginals.get(el);if(!originals)continue;
   Object.keys(originals).forEach(attr=>{
    const item=originals[attr];
    if(item&&item.translated&&el.getAttribute(attr)===item.translated)el.setAttribute(attr,item.source);
    originals[attr]={source:item.source,translated:null,pending:false};
   });
   attributeOriginals.set(el,originals);
  }
  locale=next;
  pending.clear();pendingAttributes.clear();
  try{localStorage.setItem(KEY,next);if(next==='pt'||next==='en')localStorage.setItem('yunarunes-language',next)}catch(_){}
  document.documentElement.lang=next==='pt'?'pt-BR':next;
  const picker=document.querySelector('#yuna-international-select');if(picker)picker.value=next;
  applyAuthoredTranslations(document.head);applyAuthoredTranslations(document.body);
  if(next!=='pt'){
   // Requeue existing translated nodes using their preserved source text.
   for(const node of trackedTextNodes){
    if(!node.isConnected){trackedTextNodes.delete(node);continue;}
    pending.add(node);
   }
   translateAttributes(document.head);translateAttributes(document.body);queue();
  }else{
   [document.head,document.body].forEach(root=>{
    if(!root)return;
    addTree(root);
    translateAttributes(root);
   });
  }
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
  select.addEventListener('change',()=>{
   const next=select.value;
   // Keep the legacy header controls in sync, then guarantee that the
   // site-wide translation layer receives the selected locale as well.
   if(typeof window.yunaSetLanguage==='function')window.yunaSetLanguage(next);
   if(locale!==next)switchLocale(next);
  });
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
 // Apply page-authored locale strings before capturing source text or queuing
 // automatic translation, so the seven-language dictionaries are never skipped.
 applyAuthoredTranslations(document.head);applyAuthoredTranslations(document.body);
 addTree(document.head);addTree(document.body);
 translateAttributes(document.head);translateAttributes(document.body);
 if(locale!=='pt')queue();
 observer=new MutationObserver(records=>{
  records.forEach(r=>{
   if(r.type==='childList')r.addedNodes.forEach(n=>{applyAuthoredTranslations(n);addTree(n);translateAttributes(n)});
   else if(r.type==='characterData'&&r.target.nodeValue!==lastWritten.get(r.target))addText(r.target); else if(r.type==='attributes'){const el=r.target;translateAttributes(el)}
  });
  if(locale!=='pt')queue();
 });
 observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label','aria-description','aria-placeholder','alt','data-placeholder','data-tooltip','data-label','data-original-title','value','content']});
 observer.observe(document.head,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['content','title','aria-label','alt']});
 window.addEventListener('yunarunes-language-applied',event=>{
  const next=String(event&&event.detail||'').toLowerCase();
  switchLocale(next);
 });
 const headerObserver=new MutationObserver(()=>makePicker());
 headerObserver.observe(document.body,{subtree:true,childList:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();