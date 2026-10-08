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
'Escolhe um monstro':'Choose a monster','Escolhe o elemento':'Choose an element','Escolhe as estrelas':'Choose stars'};
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
 document.documentElement.lang=en()?'en':'pt-BR';
 root.querySelectorAll?.('[data-pt][data-en]').forEach(el=>{
   const value=en()?el.dataset.en:el.dataset.pt;
   if(el.textContent!==value)el.textContent=value;
 });
 root.querySelectorAll?.('[data-pt-placeholder][data-en-placeholder]').forEach(el=>{
   const value=en()?el.dataset.enPlaceholder:el.dataset.ptPlaceholder;
   if(el.placeholder!==value)el.placeholder=value;
 });
 root.querySelectorAll?.('input,textarea,[title],[aria-label]').forEach(el=>{
   ['placeholder','title','aria-label'].forEach(attr=>{
     if(!el.hasAttribute(attr))return;
     const value=el.getAttribute(attr);
     if(attr==='placeholder'){
       const pt=el.getAttribute('data-pt-placeholder'), enValue=el.getAttribute('data-en-placeholder');
       if(pt&&enValue)el.setAttribute(attr,en()?enValue:pt);
     }
   });
 });
}

function setLanguage(lang){save(lang==='en'?'en':'pt');document.documentElement.lang=en()?'en':'pt-BR';updateHeader();apply(document.body);updateHeader();}
function bind(){document.querySelectorAll('[data-lang]').forEach(b=>{if(b.dataset.bound==='1')return;b.dataset.bound='1';b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();setLanguage(b.dataset.lang)},false);b.addEventListener('pointerup',e=>{e.preventDefault();e.stopPropagation();setLanguage(b.dataset.lang)},false)});}
document.addEventListener('click',e=>{const b=e.target.closest?.('[data-lang]');if(b){e.preventDefault();e.stopPropagation();setLanguage(b.dataset.lang)}},true);
function boot(){updateHeader();bind();apply();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();