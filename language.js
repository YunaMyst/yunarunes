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
const isEN=()=>{try{return localStorage.getItem(K)==='en'}catch(_){return false}};
const tr=s=>{if(!s)return s;const m=isEN()?PAIRS:REV;return Object.prototype.hasOwnProperty.call(m,s)?m[s]:s};
function header(){
 const h=document.querySelector('header.top');if(!h)return;
 const nav=h.querySelector('.header-menu .nav-links');
 if(nav){
   const links=nav.querySelectorAll('a');
   const labels=NAV;
   links.forEach((a,i)=>{if(labels[i]){a.textContent=(isEN()?labels[i][2]:labels[i][1]);a.href=labels[i][0]}});
 }
 const bar=h.querySelector('.header-controls .yuna-controls');
 if(!bar)return;
 let apk=bar.querySelector('.apk-link');
 const mobile=window.matchMedia('(max-width:600px)').matches;
 if(mobile){
   if(!apk){
     apk=document.createElement('a');apk.className='apk-link';apk.href='./downloads/yunarunes.apk';apk.setAttribute('download','');apk.textContent='📱 APK';bar.insertBefore(apk,bar.firstChild);
   }
 }else if(apk){
   apk.remove();
 }
 const pt=bar.querySelector('[data-lang="pt"]'), en=bar.querySelector('[data-lang="en"]');
 if(pt)pt.textContent='🇧🇷 PT/BR';
 if(en)en.textContent='🇬🇧 ENG';
 [pt,en].forEach(b=>{if(!b)return;b.classList.toggle('active',b.dataset.lang===(isEN()?'en':'pt'));b.onclick=()=>{localStorage.setItem(K,b.dataset.lang);location.reload()}});
}
function style(){
 let s=document.getElementById('yuna-language-style');
 if(s)s.remove();
 s=document.createElement('style');s.id='yuna-language-style';
 s.textContent=`
/* YunaRunes language/header: do not create a second header */
header.top .header-controls .yuna-controls{display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:5px!important;position:static!important;transform:none!important}
header.top .header-controls .yuna-controls>*{display:inline-flex!important;align-items:center!important;justify-content:center!important;height:38px!important;min-width:0!important;width:auto!important;padding:0 9px!important;font-size:12px!important;margin:0!important;white-space:nowrap!important}
header.top .header-controls .yuna-controls .apk-link{display:none!important}
header.top .header-controls .yuna-controls .donate-link{display:inline-flex!important;background:#7c3aed!important;color:#fff!important;border:1px solid #a78bfa!important}
header.top .header-controls .yuna-controls button.active{background:#35a9e1!important;color:#061018!important;border-color:#35a9e1!important}
header.top .header-controls .yuna-controls button:not(.active){background:#202a34!important;color:#fff!important}
@media(max-width:600px){
 header.top .header-controls .yuna-controls{gap:4px!important}
 header.top .header-controls .yuna-controls .apk-link{display:inline-flex!important}
 header.top .header-controls .yuna-controls>*{height:36px!important;padding:0 7px!important;font-size:11px!important}
}
`;
 document.head.appendChild(s);
}
function applyText(root=document.body){
 document.documentElement.lang=isEN()?'en':'pt-BR';
 document.title=tr(document.title);
 if(!root)return;
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 let n;
 while(n=walker.nextNode()){
  const p=n.parentElement;
  if(p?.closest('script,style,noscript,.yuna-controls,.yuna-nav'))continue;
  const raw=n.nodeValue,t=raw.trim();
  if(t){const v=tr(t);if(v!==t)n.nodeValue=raw.replace(t,v);}
 }
 root.querySelectorAll?.('input,textarea,option,[placeholder],[title],[aria-label]').forEach(e=>{
  ['placeholder','title','aria-label'].forEach(a=>{if(e.hasAttribute(a)){const v=e.getAttribute(a),x=tr(v);if(x!==v)e.setAttribute(a,x)}});
  if(e.tagName==='OPTION')e.textContent=tr(e.textContent);
 });
}
function boot(){
 header();style();applyText();
 const obs=new MutationObserver(muts=>muts.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)applyText(n)}));
 obs.observe(document.body,{childList:true,subtree:true});
}
boot();
})();
