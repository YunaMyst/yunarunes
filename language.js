(()=>{
'use strict';
const K='yunarunes-language';
const NAV=[['index.html','🏠 Início','🏠 Home'],['database.html','👹 Database','👹 Database'],['team-builder.html','⚔️ Team Builder','⚔️ Team Builder'],['runes.html','🧿 Runas','🧿 Runes'],['optimizer.html','⚙️ Optimizer','⚙️ Optimizer'],['artifact-optimizer.html','💠 Artifacts','💠 Artifacts'],['decks.html','🃏 Decks','🃏 Decks'],['account-analyzer.html','📊 Análise de Conta','📊 Account Analyzer'],['guild-tools.html','⚔️ Guild/Siege','⚔️ Guild/Siege']];
const PAIRS={
'Início':'Home','Runas':'Runes','Análise de Conta':'Account Analyzer','Pesquisar':'Search','Carregando a base de monstros...':'Loading monster database...','O seu hub de':'Your hub for','mobs, runas':'monsters, runes','e equipes.':'and teams.','ACESSO RÁPIDO':'QUICK ACCESS','Escolhe a categoria de monstros':'Choose a monster category','Monstros de 2 estrelas':'2-star monsters','Monstros de 3 estrelas':'3-star monsters','Monstros de 4 estrelas':'4-star monsters','Monstros de 5 estrelas':'5-star monsters','Ver monstros →':'View monsters →','Abrir →':'Open →','⭐ Nat 5 em destaque':'⭐ Featured Nat 5','Abrir Nat 5 →':'Open Nat 5 →','🔥 YunaRunes — Atividades':'🔥 YunaRunes — Activities','Conteúdo para voltar todos os dias.':'Content to come back to every day.','Rune do Dia':'Rune of the Day','Uma runa em destaque para analisar, comparar e melhorar.':'A featured rune to analyze, compare, and improve.','Abrir Runas →':'Open Runes →','Monstro da Semana':'Monster of the Week','Descobre um monstro, parceiros e ideias de build.':'Discover a monster, teammates, and build ideas.','Explorar Database →':'Explore Database →','Desafio YunaRunes':'YunaRunes Challenge','Um objetivo semanal para testar as tuas builds.':'A weekly goal to test your builds.','Criar uma build →':'Create a build →','📊 Histórico local':'📊 Local history','💎 Score de runa':'💎 Rune score','Projeto independente da comunidade Summoners War':'Independent Summoners War community project','Não afiliado à Com2uS.':'Not affiliated with Com2uS.','NOVOS PLAYERS':'NEW PLAYERS','Yuna Academy — Aprender Summoners War':'Yuna Academy — Learn Summoners War','Aprende desde o básico: elementos, PROC, STUN, runas, stats, funções dos monstros e muito mais.':'Learn the basics: elements, PROC, STUN, runes, stats, monster roles, and much more.','Começar a aprender →':'Start learning →','A carregar os monstros...':'Loading monsters...','Nenhum monstro encontrado.':'No monster found.','Função':'Role','Elemento':'Element','Família':'Family','Despertar':'Awakening','Stats base':'Base stats','Skills':'Skills','Runas recomendadas':'Recommended runes','Guardar build':'Save build','Limpar':'Clear','Voltar à Base de Monstros':'Back to Monster Database','Pesquisa um monstro para começar.':'Search for a monster to get started.','Erro ao carregar a base de monstros.':'Error loading the monster database.','Instalar / Baixar APK':'Install / Download APK',
'Pesquisar monstros, filtra por elemento e estrelas e abre a ficha individual para ver mais informações.':'Search monsters, filter by element and stars, and open an individual profile for more information.',
'Todos os elementos':'All elements','Todos':'All','Normais':'Normal','2A — Segundo Despertar':'2A — Second Awakening',
'Pesquisa um monstro e o YunaRunes monta várias opções de equipes respeitando o limite de cada conteúdo.':'Search for a monster and YunaRunes will build team options that respect each content mode’s limits.',
'Criar equipes':'Build teams','Carregando monstros...':'Loading monsters...','Runas recomendadas':'Recommended runes',
'Combinação de referência baseada nas funções e sinergias conhecidas.':'Reference combination based on known roles and synergies.',
'Variação automática para oferecer outra composição.':'Automatic variation offering another team composition.',
'Ver detalhes da equipe principal':'View main team details','Foram geradas':'Generated','opções diferentes.':'different options.',
'Escolhe qualquer monstro, elemento e evolução disponível na base. Cada variante usa a fotografia correspondente.':'Choose any monster, element, and awakening available in the database. Each variant uses its matching image.',
'Monstro':'Monster','Carregando todos os monstros...':'Loading all monsters...','Set principal':'Main set','Slots 1–6':'Slots 1–6','Salvar build':'Save build','Limpar':'Clear','Resumo da build':'Build summary',
'Monstro não encontrado na base carregada.':'Monster not found in the loaded database.',
'variantes carregadas':'variants loaded','Escolher main stat':'Choose main stat',
'O YunaRunes procura combinações reais do inventário, respeitando slots, conjuntos, main stats e requisitos mínimos.':'YunaRunes searches real inventory combinations, respecting slots, sets, main stats, and minimum requirements.',
'Modo Normal — equilibrado':'Normal Mode — balanced','SPD — velocidade':'SPD — speed','DMG — dano':'DMG — damage','EHP — sobrevivência':'EHP — survivability',
'Set de 4 Qualquer':'4-piece set: Any','Set de 2 Qualquer':'2-piece set: Any','Slot 2 Qualquer':'Slot 2: Any','Slot 4 Qualquer':'Slot 4: Any','Slot 6 Qualquer':'Slot 6: Any',
'Exemplo: Swift + Will exige pelo menos 4 Swift e 2 Will. Se escolheres apenas o set de 4, os outros 2 slots ficam livres.':'Example: Swift + Will requires at least 4 Swift and 2 Will. If you choose only the 4-piece set, the other 2 slots remain free.',
'Stats mínimas':'Minimum stats','Encontrar melhores builds':'Find best builds','Usar inventário de demonstração':'Use demo inventory','Importar o seu inventário JSON':'Import your JSON inventory','Resultados':'Results',
'combinações válidas. A mostrar as 15 melhores.':'valid combinations. Showing the top 15.','Usar esta build nas Runas':'Use this build in Runes',
'Início':'Home','Runas':'Runes','Pesquisar':'Search','Menu':'Menu','Donate':'Donate','Equipes':'Teams','Equipas':'Teams',
'Todos os monstros':'All monsters','Nenhum resultado encontrado':'No results found','A carregar...':'Loading...','Erro ao carregar':'Loading error',
'Voltar':'Back','Guardar':'Save','Cancelar':'Cancel','Fechar':'Close','Confirmar':'Confirm','Selecionar':'Select','Selecionado':'Selected',
'Escolher':'Choose','Elemento':'Element','Estrelas':'Stars','Função':'Role','Família':'Family','Velocidade':'Speed','Ataque':'Attack','Defesa':'Defense',
'Vida':'HP','Resistência':'Resistance','Precisão':'Accuracy','Crítico':'Critical Rate','Dano Crítico':'Critical Damage',
'Normal':'Normal','Fogo':'Fire','Água':'Water','Vento':'Wind','Luz':'Light','Trevas':'Dark',
'Não foram encontrados monstros.':'No monsters found.','Nenhum monstro encontrado.':'No monster found.',
'Pesquisa um monstro para começar.':'Search for a monster to get started.','A carregar os monstros...':'Loading monsters...',
'Base de monstros':'Monster Database','Database de monstros':'Monster Database','Runas recomendadas':'Recommended runes',
'Criar build':'Build a build','Equipa recomendada':'Recommended team','Equipas sugeridas':'Suggested teams',
'Escolhe um monstro':'Choose a monster','Escolhe o elemento':'Choose an element','Escolhe as estrelas':'Choose stars'
,'🎓 Menu da Academy':'🎓 Academy Menu','🌱 Comece Aqui':'🌱 Start Here','📅 Primeiros Dias':'📅 First Days','🗺️ Roteiro da Conta':'🗺️ Account Roadmap','🔥 Elementos':'🔥 Elements','👹 Escola de Monstros':'👹 Monster School','🔤 Terminologia':'🔤 Terminology','📚 Glossário':'📚 Glossary','⚔️ Combate':'⚔️ Combat','⚔️ Escola de Batalha':'⚔️ Battle School','🧪 Mecânicas':'🧪 Mechanics','🎯 Guia Visual':'🎯 Visual Guide','🧿 Escola de Runas':'🧿 Rune School','💎 Decisor de Runas':'💎 Rune Decision Tool','⚡ Laboratório SPD':'⚡ SPD Lab','🧙 Funções':'🧙 Roles','🧩 Pensar Equipas':'🧩 Team Thinking','🏰 Conteúdo':'🏰 Content','🏰 Masmorras':'🏰 Dungeons','📈 Progressão':'📈 Progression','🦊 Jornada do Novo Jogador':'🦊 New Player Journey','🧠 Testar Conhecimentos':'🧠 Test Your Knowledge','🎮 Simuladores':'🎮 Simulators','📚 Micro-lições':'📚 Micro-lessons','🏆 Desafio Diário':'🏆 Daily Challenge','🧩 Desafio de Equipa':'🧩 Team Challenge','💰 Recursos':'💰 Resources','🧪 Artefactos':'🧪 Artifacts','👑 Modo Mestre':'👑 Master Mode','💬 Pergunta à Academy':'💬 Ask the Academy','🏅 Conquistas':'🏅 Achievements','🎓 Graduação':'🎓 Graduation','🏁 Treino Final':'🏁 Final Training','Aprende Summoners War do zero':'Learn Summoners War from scratch','Aprende fazendo':'Learn by doing','Aprende, pratica e prova que entendeu':'Learn, practice, and prove your understanding','Trilha “Comecei Hoje”':'“I Just Started” Path','Objetivo inicial':'Initial goal','Funções e skills':'Roles and skills','Stats principais':'Main stats','Primeiro time':'First team','Aprenda a pensar como jogador':'Learn to think like a player','Antes de copiar uma build, faça estas quatro perguntas:':'Before copying a build, ask these four questions:','Escolha stats pela função, não pelo número bonito.':'Choose stats based on the role, not the impressive number.','Não troque todas as runas antes de descobrir o problema.':'Do not change all your runes before identifying the problem.','Escolha a opção que melhor resolve o problema. A explicação aparece depois da resposta.':'Choose the option that best solves the problem. The explanation appears after you answer.','Todos os elementos':'All elements','2A — Segundo Despertar':'2A — Second Awakening','Criar equipes':'Build teams','Carregando monstros...':'Loading monsters...','🛡️ Runas recomendadas':'🛡️ Recommended runes','Set principal':'Main set','Salvar build':'Save build','Não guardada':'Not saved','Modo Normal — equilibrado':'Normal Mode — balanced','EHP — sobrevivência':'EHP — survivability','Set de 4 Qualquer':'4-piece set: Any','Set de 2 Qualquer':'2-piece set: Any','Slot 2 Qualquer':'Slot 2: Any','Slot 4 Qualquer':'Slot 4: Any','Slot 6 Qualquer':'Slot 6: Any','Stats mínimas':'Minimum stats','Encontrar melhores builds':'Find best builds','Usar inventário de demonstração':'Use demo inventory','Importar o seu inventário JSON':'Import your JSON inventory','Resultados':'Results','Não existem runas suficientes para os filtros escolhidos.':'There are not enough runes for the selected filters.','Usar esta build nas Runas':'Use this build in Runes','Erro ao carregar o inventário.':'Error loading inventory.','Inventário importado. Agora podes otimizar.':'Inventory imported. You can now optimize.','Ordena artefactos por adequação ao monstro, tipo de dano e qualidade das linhas.':'Sort artifacts by monster fit, damage type, and line quality.','Tipo Qualquer':'Any Type','Esquerdo':'Left','Direito':'Right','Otimizar':'Optimize','A usar artefactos de demonstração.':'Using demo artifacts.','Importar artefactos JSON':'Import JSON artifacts','Melhores artefactos':'Best artifacts','Guarda as tuas equipas por conteúdo, adiciona notas e exporta/importa os decks.':'Save teams by content, add notes, and export/import decks.','Nome do deck':'Deck name','Conteúdo Arena':'Arena content','Guardar deck':'Save deck','Exportar JSON':'Export JSON','Importar decks JSON':'Import JSON decks','Apagar todos':'Delete all','Usar análise de demonstração':'Use demo analysis','Importar conta JSON':'Import JSON account','Exportar análise':'Export analysis','A analisar dados de demonstração.':'Analyzing demo data.','Qualidade da conta':'Account quality','Planeia defesas e matchups de Siege e WGB.':'Plan Siege and WGB defenses and matchups.','Modo Siege':'Siege mode','Atualizar':'Refresh','Builds públicas':'Public builds','Defesa adversária':'Enemy defense','Defesas rápidas':'Quick defenses','Voltar':'Back','Cancelar':'Cancel','Fechar':'Close','Confirmar':'Confirm','Selecionar':'Select','Selecionado':'Selected','Escolher':'Choose','Monstros':'Monsters','Monstro':'Monster','Stats base':'Base stats','A carregar...':'Loading...','A carregar os monstros...':'Loading monsters...','Nenhum resultado encontrado':'No results found','Nenhum monstro encontrado.':'No monster found.','Erro ao carregar':'Loading error','Conteúdo para voltar todos os dias.':'Content to come back to every day.','As tuas últimas pesquisas e builds podem ficar guardadas neste dispositivo.':'Your latest searches and builds can be saved on this device.','Usa o Optimizer para comparar potencial, stats e combinações.':'Use the Optimizer to compare potential, stats, and combinations.','Passa rapidamente da pesquisa de um monstro para uma equipa.':'Quickly go from searching for a monster to building a team.','Não afiliado à Com2uS.':'Not affiliated with Com2uS.'};
const REV=Object.fromEntries(Object.entries(PAIRS).map(([a,b])=>[b,a]));
function getLang(){try{if(localStorage.getItem(K)==='en')return'en'}catch(_){} try{if(document.cookie.split(';').some(x=>x.trim()==='yunarunes-language=en'))return'en'}catch(_){} return'pt'}
const en=()=>getLang()==='en';
function tr(s){if(!s)return s;const map=en()?PAIRS:REV;return Object.prototype.hasOwnProperty.call(map,s)?map[s]:s}
function save(lang){try{localStorage.setItem(K,lang);document.cookie='yunarunes-language='+lang+'; path=/; max-age=31536000; SameSite=Lax'}catch(_){} }
function updateHeader(){
 const h=document.querySelector('header.top'); if(!h)return;
 const nav=h.querySelector('.header-menu .nav-links')||h.querySelector('.nav-links');
 if(nav)nav.querySelectorAll('a').forEach((a,i)=>{if(NAV[i]){const label=en()?NAV[i][2]:NAV[i][1];if(a.textContent!==label)a.textContent=label;a.href=NAV[i][0]}});
 h.querySelectorAll('[data-lang]').forEach(b=>{b.classList.toggle('active',b.dataset.lang===(en()?'en':'pt'));b.setAttribute('aria-pressed',String(b.dataset.lang===(en()?'en':'pt')))})
}
function apply(root=document.body){
 if(!root)return;
 document.documentElement.lang=en()?'en':'pt-BR';
 const map=en()?PAIRS:REV;
 // Translate explicitly marked elements first.
 if(root.querySelectorAll){
  root.querySelectorAll('[data-pt][data-en]').forEach(el=>{
   const value=en()?el.dataset.en:el.dataset.pt;
   if(el.textContent!==value)el.textContent=value;
  });
  root.querySelectorAll('[data-pt-placeholder][data-en-placeholder]').forEach(el=>{
   const value=en()?el.dataset.enPlaceholder:el.dataset.ptPlaceholder;
   if(el.placeholder!==value)el.placeholder=value;
  });
  root.querySelectorAll('input,textarea,[title],[aria-label]').forEach(el=>{
   ['placeholder','title','aria-label'].forEach(attr=>{
    const pt=el.getAttribute('data-pt-'+attr), enValue=el.getAttribute('data-en-'+attr);
    if(pt!==null&&enValue!==null)el.setAttribute(attr,en()?enValue:pt);
   });
  });
 }
 // One efficient pass: O(number of text nodes), rather than checking every
 // dictionary entry against every node. This also translates pages without data attributes.
 const doc=root.ownerDocument||document;
 const walker=doc.createTreeWalker(root,NodeFilter.SHOW_TEXT,{
  acceptNode(node){
   const p=node.parentElement;
   if(!p||p.closest('script,style,noscript,textarea,code,pre,[contenteditable="true"]'))return NodeFilter.FILTER_REJECT;
   return NodeFilter.FILTER_ACCEPT;
  }
 });
 const nodes=[];
 while(walker.nextNode())nodes.push(walker.currentNode);
 for(const node of nodes){
  const raw=node.nodeValue;
  const trimmed=raw.trim();
  if(!trimmed)continue;
  let translated=map[trimmed];
  if(typeof translated!=='string'){
   translated=trimmed;
   const keys=Object.keys(map).filter(key=>key.length>=3&&key!==map[key]).sort((x,y)=>y.length-x.length);
   for(const key of keys)if(translated.includes(key))translated=translated.split(key).join(map[key]);
  }
  if(typeof translated==='string'&&translated!==trimmed){
   const left=raw.match(/^\\s*/)?.[0]||'';
   const right=raw.match(/\\s*$/)?.[0]||'';
   node.nodeValue=left+translated+right;
  }
 }
}

function setLanguage(lang){save(lang==='en'?'en':'pt');document.documentElement.lang=en()?'en':'pt-BR';updateHeader();apply(document.body);updateHeader();}
function bind(){document.querySelectorAll('[data-lang]').forEach(b=>{if(b.dataset.bound==='1')return;b.dataset.bound='1';b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();setLanguage(b.dataset.lang)},false);b.addEventListener('pointerup',e=>{e.preventDefault();e.stopPropagation();setLanguage(b.dataset.lang)},false)});}
document.addEventListener('click',e=>{const b=e.target.closest?.('[data-lang]');if(b){e.preventDefault();e.stopPropagation();setLanguage(b.dataset.lang)}},true);
function boot(){updateHeader();bind();apply();if(!window.__yunaLanguageObserver){window.__yunaLanguageObserver=new MutationObserver(records=>{for(const record of records)for(const node of record.addedNodes)if(node.nodeType===1||node.nodeType===3)apply(node.nodeType===1?node:node.parentElement);});window.__yunaLanguageObserver.observe(document.body,{childList:true,subtree:true});}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();