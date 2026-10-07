(()=>{
'use strict';
const K='yunarunes-language';
const NAV=[['index.html','🏠 Início','🏠 Home'],['database.html','👹 Database','👹 Database'],['team-builder.html','⚔️ Team Builder','⚔️ Team Builder'],['runes.html','🧿 Runas','🧿 Runes'],['optimizer.html','⚙️ Optimizer','⚙️ Optimizer'],['artifact-optimizer.html','💠 Artifacts','💠 Artifacts'],['decks.html','🃏 Decks','🃏 Decks'],['account-analyzer.html','📊 Análise de Conta','📊 Account Analyzer'],['guild-tools.html','⚔️ Guild/Siege','⚔️ Guild/Siege']];
const PAIRS={
'Início':'Home','Runas':'Runes','Análise de Conta':'Account Analyzer','Pesquisar':'Search','Carregando a base de monstros...':'Loading monster database...','O seu hub de':'Your hub for','mobs, runas':'monsters, runes','e equipes.':'and teams.','ACESSO RÁPIDO':'QUICK ACCESS','Escolhe a categoria de monstros':'Choose a monster category','Monstros de 2 estrelas':'2-star monsters','Monstros de 3 estrelas':'3-star monsters','Monstros de 4 estrelas':'4-star monsters','Monstros de 5 estrelas':'5-star monsters','Ver monstros →':'View monsters →','Abrir →':'Open →','⭐ Nat 5 em destaque':'⭐ Featured Nat 5','Abrir Nat 5 →':'Open Nat 5 →','🔥 YunaRunes — Atividades':'🔥 YunaRunes — Activities','Conteúdo para voltar todos os dias.':'Content to come back to every day.','Rune do Dia':'Rune of the Day','Uma runa em destaque para analisar, comparar e melhorar.':'A featured rune to analyze, compare, and improve.','Abrir Runas →':'Open Runes →','Monstro da Semana':'Monster of the Week','Descobre um monstro, parceiros e ideias de build.':'Discover a monster, teammates, and build ideas.','Explorar Database →':'Explore Database →','Desafio YunaRunes':'YunaRunes Challenge','Um objetivo semanal para testar as tuas builds.':'A weekly goal to test your builds.','Criar uma build →':'Create a build →','📊 Histórico local':'📊 Local history','💎 Score de runa':'💎 Rune score','Projeto independente da comunidade Summoners War':'Independent Summoners War community project','Não afiliado à Com2uS.':'Not affiliated with Com2uS.','NOVOS PLAYERS':'NEW PLAYERS','Yuna Academy — Aprender Summoners War':'Yuna Academy — Learn Summoners War','Aprende desde o básico: elementos, PROC, STUN, runas, stats, funções dos monstros e muito mais.':'Learn the basics: elements, PROC, STUN, runes, stats, monster roles, and much more.','Começar a aprender →':'Start learning →','A carregar os monstros...':'Loading monsters...','Nenhum monstro encontrado.':'No monster found.','Função':'Role','Elemento':'Element','Família':'Family','Despertar':'Awakening','Stats base':'Base stats','Skills':'Skills','Runas recomendadas':'Recommended runes','Guardar build':'Save build','Limpar':'Clear','Voltar à Base de Monstros':'Back to Monster Database','Pesquisa um monstro para começar.':'Search for a monster to get started.','Erro ao carregar a base de monstros.':'Error loading the monster database.','Instalar / Baixar APK':'Install / Download APK'};
const REV=Object.fromEntries(Object.entries(PAIRS).map(([a,b])=>[b,a]));
function getLang(){try{if(localStorage.getItem(K)==='en')return'en'}catch(_){} try{if(document.cookie.split(';').some(x=>x.trim()==='yunarunes-language=en'))return'en'}catch(_){} return'pt'}
const en=()=>getLang()==='en';
function tr(s){if(!s)return s;const map=en()?PAIRS:REV;return Object.prototype.hasOwnProperty.call(map,s)?map[s]:s}
function save(lang){try{localStorage.setItem(K,lang);document.cookie='yunarunes-language='+lang+'; path=/; max-age=31536000; SameSite=Lax'}catch(_){} }
function updateHeader(){
 const h=document.querySelector('header.top'); if(!h)return;
 const nav=h.querySelector('.header-menu .nav-links')||h.querySelector('.nav-links');
 if(nav)nav.querySelectorAll('a').forEach((a,i)=>{if(NAV[i]){a.textContent=en()?NAV[i][2]:NAV[i][1];a.href=NAV[i][0]}});
 h.querySelectorAll('[data-lang]').forEach(b=>{b.classList.toggle('active',b.dataset.lang===(en()?'en':'pt'));b.setAttribute('aria-pressed',String(b.dataset.lang===(en()?'en':'pt')))})
}
function apply(root=document.body){
 document.documentElement.lang=en()?'en':'pt-BR';
 root.querySelectorAll?.('[data-pt][data-en]').forEach(e=>e.textContent=en()?e.dataset.en:e.dataset.pt);
 root.querySelectorAll?.('[data-pt-placeholder][data-en-placeholder]').forEach(e=>e.placeholder=en()?e.dataset.enPlaceholder:e.dataset.ptPlaceholder);
 root.querySelectorAll?.('input,textarea,[title],[aria-label]').forEach(e=>['placeholder','title','aria-label'].forEach(a=>{if(e.hasAttribute(a)){const v=e.getAttribute(a),x=tr(v);if(v!==x)e.setAttribute(a,x)}}));
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode()){const p=n.parentElement;if(!p||p.closest('script,style,noscript,[data-lang]'))continue;const t=n.nodeValue.trim();if(t){const x=tr(t);if(x!==t)n.nodeValue=n.nodeValue.replace(t,x)}}
}
function setLanguage(lang){save(lang==='en'?'en':'pt');document.documentElement.lang=en()?'en':'pt-BR';updateHeader();apply(document.body);updateHeader();}
function bind(){document.querySelectorAll('[data-lang]').forEach(b=>{if(b.dataset.bound==='1')return;b.dataset.bound='1';b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();setLanguage(b.dataset.lang)},false);b.addEventListener('pointerup',e=>{e.preventDefault();e.stopPropagation();setLanguage(b.dataset.lang)},false)});}
document.addEventListener('click',e=>{const b=e.target.closest?.('[data-lang]');if(b){e.preventDefault();e.stopPropagation();setLanguage(b.dataset.lang)}},true);
function boot(){updateHeader();apply();bind();setTimeout(()=>{updateHeader();bind()},50)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();