(()=>{
'use strict';
const K='yunarunes-language';
const NAV=[
 ['index.html','🏠 Início','🏠 Home'],
 ['database.html','👹 Database','👹 Database'],
 ['team-builder.html','⚔️ Team Builder','⚔️ Team Builder'],
 ['runes.html','🧿 Runas','🧿 Runes'],
 ['optimizer.html','⚙️ Optimizer','⚙️ Optimizer'],
 ['artifact-optimizer.html','💠 Artifacts','💠 Artifacts'],
 ['decks.html','🃏 Decks','🃏 Decks'],
 ['account-analyzer.html','📊 Análise de Conta','📊 Account Analyzer'],
 ['guild-tools.html','⚔️ Guild/Siege','⚔️ Guild/Siege']
];
const PAIRS={
 'Monstros':'Monsters','Monstro':'Monster','monstros':'monsters','monstro':'monster','Runas':'Runes',
 'Ferramentas YunaRunes':'YunaRunes Tools','Todos os elementos':'All elements','Todos':'All','Normais':'Normal',
 'A carregar os monstros...':'Loading monsters...','A carregar a base...':'Loading database...','A carregar inventário...':'Loading inventory...',
 'A carregar perfil do monstro...':'Loading monster profile...','Nenhum monstro encontrado.':'No monster found.',
 'Pesquisar um monstro...':'Search for a monster...','Pesquisar nome, família ou elemento...':'Search name, family or element...',
 'Ex.: Galleon, Camilla, Leo...':'E.g.: Galleon, Camilla, Leo...','Criar equipas':'Create teams','Ver com quem combina':'See who it works with',
 'Guardar build':'Save build','Limpar':'Clear','Resumo da build':'Build summary','Não guardada':'Not saved',
 'Guardada neste dispositivo':'Saved on this device','Informações':'Information','Função':'Role','Elemento':'Element','Família':'Family',
 'Despertar':'Awakening','Stats base':'Base stats','Skills':'Skills','Runas recomendadas':'Recommended runes',
 'Montar Rune Build':'Build Rune Set','Abrir Optimizer':'Open Optimizer','Abrir Rune Builder':'Open Rune Builder','Ataque':'Attack','Defesa':'Defense',
 'Modo':'Mode','Qualquer':'Any','Stats mínimas':'Minimum stats','Encontrar melhores builds':'Find best builds','Resultados':'Results',
 'Voltar à Base de Monstros':'Back to Monster Database','Pesquisa um monstro para começar.':'Search for a monster to get started.',
 'A verificar':'Checking','Jogável':'Playable','Normal / Despertado':'Normal / Awakened','Segundo Despertar':'Second Awakening',
 '2A — Segundo Despertar':'2A — Second Awakening','A procurar':'Searching','Erro ao carregar a base de monstros.':'Error loading the monster database.',
 'Não foi possível carregar a base de monstros.':'Could not load the monster database.','Nenhuma combinação encontrada.':'No combination found.',
 'Inventário de demonstração ativo:':'Demo inventory active:','Inventário importado. Agora podes otimizar.':'Inventory imported. You can optimize now.',
 'Build guardada automaticamente.':'Build saved automatically.','Build limpa.':'Build cleared.','Usar esta build no Rune Builder':'Use this build in Rune Builder',
 'Monstro não especificado':'Monster not specified','Monstro não encontrado':'Monster not found','Escolhe um monstro na Monster Database.':'Choose a monster from the Monster Database.',
 'Esta variante ainda não existe na base de dados.':'This variant is not in the database yet.','Recomendações ainda não verificadas.':'Recommendations not yet verified.',
 'Substats prioritárias:':'Priority substats:','Sets:':'Sets:','Combinações válidas.':'Valid combinations.','A mostrar as 15 melhores.':'Showing the 15 best.',
 'Nome':'Name','Estrelas':'Stars','Estrelas naturais':'Natural stars','Todas as estrelas':'All natural stars','Normal — equilibrado':'Normal — balanced',
 'SPD — velocidade':'SPD — speed','DMG — dano':'DMG — damage','EHP — sobrevivência':'EHP — survival','Set principal':'Main set','Set de 4':'4-piece set',
 'Set de 2':'2-piece set','Escolher main stat':'Choose main stat','Substats (ex.: SPD, HP%)':'Substats (e.g.: SPD, HP%)',
 'A carregar todos os monstros...':'Loading all monsters...','Monstro não encontrado na base carregada.':'Monster not found in the loaded database.',
 'variantes carregadas':'variants loaded','Elementos:':'Elements:','Estrelas:':'Stars:','Pesquisa e consulta a base de monstros.':'Search and browse the monster database.',
 'Descobre equipas e sinergias.':'Discover teams and synergies.','Cria builds de runas.':'Build rune sets.','Encontra combinações do inventário.':'Find combinations from your inventory.',
 'Leva as ferramentas contigo no telemóvel.':'Take the tools with you on your phone.','Instalar / Baixar APK':'Install / Download APK',
 'Não afiliado à Com2uS.':'Not affiliated with Com2uS.','Projeto independente da comunidade Summoners War':'Independent Summoners War community project',
 'YunaRunes para Android':'YunaRunes for Android','Abrir página do monstro →':'Open monster page →'
, '🦊 YunaRunes • Summoners War':'🦊 YunaRunes • Summoners War'
, 'O seu hub de':'Your hub for'
, 'mobs, runas':'monsters, runes'
, 'e equipes.':'and teams.'
, 'pesquisa um monstro, monta uma equipe, cria builds, otimiza o seu inventário e salva os seus mobs favoritos. Tudo num só lugar, preparado para PC e celular.':'search for a monster, build a team, create builds, optimize your inventory, and save your favorite monsters. All in one place, ready for PC and mobile.'
, 'Pesquisar':'Search'
, 'Carregando a base de monstros...':'Loading monster database...'
, 'NOVOS PLAYERS':'NEW PLAYERS'
, 'Yuna Academy — Aprender Summoners War':'Yuna Academy — Learn Summoners War'
, 'Aprende desde o básico: elementos, PROC, STUN, runas, stats, funções dos monstros e muito mais.':'Learn the basics: elements, PROC, STUN, runes, stats, monster roles, and much more.'
, 'Começar a aprender →':'Start learning →'
, 'ACESSO RÁPIDO':'QUICK ACCESS'
, 'Escolhe a categoria de monstros':'Choose a monster category'
, 'Monstros de 2 estrelas':'2-star monsters'
, 'Monstros de 3 estrelas':'3-star monsters'
, 'Monstros de 4 estrelas':'4-star monsters'
, 'Monstros de 5 estrelas':'5-star monsters'
, 'Ver monstros →':'View monsters →'
, 'Abrir →':'Open →'
, '⭐ Nat 5 em destaque':'⭐ Featured Nat 5'
, 'Abrir Nat 5 →':'Open Nat 5 →'
, '🔥 YunaRunes — Atividades':'🔥 YunaRunes — Activities'
, 'Conteúdo para voltar todos os dias.':'Content to come back to every day.'
, 'Rune do Dia':'Rune of the Day'
, 'Uma runa em destaque para analisar, comparar e melhorar.':'A featured rune to analyze, compare, and improve.'
, 'Abrir Runas →':'Open Runes →'
, 'Monstro da Semana':'Monster of the Week'
, 'Descobre um monstro, parceiros e ideias de build.':'Discover a monster, partners, and build ideas.'
, 'Explorar Database →':'Explore Database →'
, 'Desafio YunaRunes':'YunaRunes Challenge'
, 'Um objetivo semanal para testar as tuas builds.':'A weekly goal to test your builds.'
, 'Criar uma build →':'Create a build →'
, '📊 Histórico local':'📊 Local history'
, 'As tuas últimas pesquisas e builds podem ficar guardadas neste dispositivo.':'Your latest searches and builds can be saved on this device.'
, '💎 Score de runa':'💎 Rune score'
, 'Usa o Optimizer para comparar potencial, stats e combinações.':'Use Optimizer to compare potential, stats, and combinations.'
, 'Passa rapidamente da pesquisa de um monstro para uma equipa.':'Quickly go from a monster search to a team.'
, '💎 Runa do Dia — Resultado':'💎 Rune of the Day — Result'
, 'Projeto independente da comunidade Summoners War':'Independent Summoners War community project'
, 'Não afiliado à Com2uS.':'Not affiliated with Com2uS.'
};
const REV=Object.fromEntries(Object.entries(PAIRS).map(([pt,en])=>[en,pt]));
function getLang(){try{const m=document.cookie.match(/(?:^|; )yunarunes-language=([^;]+)/);if(m&&decodeURIComponent(m[1])==='en')return 'en'}catch(_){} try{if(localStorage.getItem(K)==='en')return 'en'}catch(_){} try{const q=new URLSearchParams(location.search).get('lang');if(q==='en')return 'en'}catch(_){} return 'pt'};
const isEN=()=>getLang()==='en';
const tr=s=>{if(!s)return s;const m=isEN()?PAIRS:REV;return Object.prototype.hasOwnProperty.call(m,s)?m[s]:s};
function header(){
 const h=document.querySelector('header.top');
 let bar=h?.querySelector('.yuna-unified-controls');
 if(!bar){
   bar=document.querySelector('.yuna-global-language-bar');
 }
 if(!bar){
   bar=document.createElement('div');
   bar.className=h?'yuna-unified-controls':'yuna-global-language-bar';
   bar.innerHTML='<a href="index.html" class="home">🦊 YunaRunes</a><a class="donate" href="https://www.paypal.com/myaccount/summary" target="_blank" rel="noopener noreferrer">💜 Donate</a><button type="button" data-lang="pt">🇧🇷 PT/BR</button><button type="button" data-lang="en">🇬🇧 ENG</button>';
   (h||document.body).appendChild(bar);
 }
 const nav=h?.querySelector('.header-menu .nav-links')||h?.querySelector('.nav-links');
 if(nav){
   nav.querySelectorAll('a').forEach((a,i)=>{if(NAV[i]){a.textContent=isEN()?NAV[i][2]:NAV[i][1];a.href=NAV[i][0]}});
 }
 document.documentElement.lang=isEN()?'en':'pt-BR';
 bar.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===(isEN()?'en':'pt')));
}
function style(){
 let s=document.getElementById('yuna-language-style');if(s)s.remove();
 s=document.createElement('style');s.id='yuna-language-style';
 s.textContent=`
header.top .header-controls .yuna-controls,header.top .yuna-unified-controls{display:flex!important;align-items:center!important;gap:5px!important;position:relative!important;z-index:2147483647!important;pointer-events:auto!important;overflow:visible!important}
header.top .header-controls .yuna-controls [data-lang],header.top .yuna-unified-controls [data-lang]{position:relative!important;z-index:2147483647!important;pointer-events:auto!important;touch-action:manipulation!important;user-select:none!important}
header.top .header-controls .yuna-controls>* ,header.top .yuna-unified-controls>*{display:inline-flex!important;align-items:center!important;justify-content:center!important;height:38px!important;width:auto!important;padding:0 9px!important;font-size:12px!important;margin:0!important;white-space:nowrap!important;cursor:pointer!important;pointer-events:auto!important}
.yuna-global-language-bar{position:fixed!important;top:12px!important;right:12px!important;z-index:2147483647!important;display:flex!important;align-items:center!important;gap:6px!important;padding:6px!important;border-radius:10px!important;background:rgba(8,12,17,.96)!important;border:1px solid #35475a!important;box-shadow:0 6px 24px rgba(0,0,0,.45)!important;pointer-events:auto!important}
.yuna-global-language-bar>*{height:36px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;padding:0 9px!important;border-radius:7px!important;border:1px solid #293746!important;background:#202a34!important;color:#fff!important;font-weight:800!important;font-size:12px!important;text-decoration:none!important;cursor:pointer!important;pointer-events:auto!important}
.yuna-global-language-bar .home{background:#111923!important}.yuna-global-language-bar .donate{background:#7c3aed!important;border-color:#a78bfa!important}
.yuna-global-language-bar button.active,header.top .yuna-unified-controls button.active{background:#35a9e1!important;color:#061018!important;border-color:#35a9e1!important}
@media(max-width:600px){.yuna-global-language-bar{top:8px!important;right:8px!important;gap:3px!important;padding:4px!important}.yuna-global-language-bar .home{display:none!important}.yuna-global-language-bar>*{height:34px!important;padding:0 6px!important;font-size:10px!important}}
/* LANGUAGE BUTTONS — always reachable */
header.top .header-controls .yuna-controls [data-lang]{position:relative!important;isolation:isolate!important}
@media(max-width:600px){
 header.top .header-controls .yuna-controls{position:fixed!important;top:8px!important;right:8px!important;z-index:2147483647!important;display:flex!important;gap:4px!important;overflow:visible!important}
 header.top .header-controls .yuna-controls .donate-link{display:none!important}
 header.top .header-controls .yuna-controls [data-lang]{display:inline-flex!important;width:auto!important;min-width:62px!important;height:36px!important;padding:0 8px!important;font-size:11px!important;background:#202a34!important;color:#fff!important;border:1px solid #3b4b5a!important;border-radius:8px!important}
}
@media(min-width:601px){
 header.top .header-controls .yuna-controls [data-lang]{min-width:74px!important;height:38px!important}
}
`;
 document.head.appendChild(s);
}
function applyText(root=document.body){
 document.documentElement.lang=isEN()?'en':'pt-BR';
 if(!root)return;
 root.querySelectorAll?.('[data-pt][data-en]').forEach(e=>{e.textContent=isEN()?e.getAttribute('data-en'):e.getAttribute('data-pt')});
 root.querySelectorAll?.('[data-pt-placeholder][data-en-placeholder]').forEach(e=>{e.placeholder=isEN()?e.getAttribute('data-en-placeholder'):e.getAttribute('data-pt-placeholder')});
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
 while(n=walker.nextNode()){
  const p=n.parentElement;if(p?.closest('script,style,noscript,.yuna-unified-controls'))continue;
  const t=n.nodeValue.trim();if(t){const v=tr(t);if(v!==t)n.nodeValue=n.nodeValue.replace(t,v)}
 }
 root.querySelectorAll?.('input,textarea,[title],[aria-label]').forEach(e=>['placeholder','title','aria-label'].forEach(a=>{if(e.hasAttribute(a)){const v=e.getAttribute(a),x=tr(v);if(x!==v)e.setAttribute(a,x)}}));
}
function setLanguage(lang){
 lang=lang==='en'?'en':'pt';
 try{localStorage.setItem(K,lang)}catch(_){}
 try{document.cookie='yunarunes-language='+encodeURIComponent(lang)+'; path=/; max-age=31536000; SameSite=Lax'}catch(_){}
 document.documentElement.lang=lang==='en'?'en':'pt-BR';
 header();applyText(document.body);header();
 /* Mantém o idioma também fora do localStorage e força todos os scripts da página a iniciarem no idioma escolhido. */
 try{const u=new URL(location.href);u.searchParams.set('lang',lang);window.location.assign(u.href)}catch(_){try{window.location.reload()}catch(__){}}
}
function bindLanguageButtons(){
 document.querySelectorAll('[data-lang]').forEach(b=>{
   if(b.dataset.yunaLangBound==='1')return;
   b.dataset.yunaLangBound='1';
   b.addEventListener('click',function(e){
     e.preventDefault();
     e.stopPropagation();
     setLanguage(this.getAttribute('data-lang'));
   },false);
 });
}

document.addEventListener('click',e=>{
 const b=e.target.closest?.('[data-lang]');
 if(!b)return;
 e.preventDefault();
 e.stopPropagation();
 setLanguage(b.getAttribute('data-lang'));
},true);

document.addEventListener('keydown',e=>{
 if(e.key!=='Enter'&&e.key!==' ')return;
 const b=e.target.closest?.('[data-lang]');
 if(!b)return;
 e.preventDefault();
 e.stopPropagation();
 setLanguage(b.getAttribute('data-lang'));
},true);

function boot(){
 header();style();applyText();bindLanguageButtons();
 setTimeout(()=>{header();bindLanguageButtons()},0);
 const obs=new MutationObserver(muts=>muts.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)applyText(n)}));
 obs.observe(document.body,{childList:true,subtree:true});
}
boot();
})();
