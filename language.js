(()=>{
'use strict';
const K='yunarunes-language';
const NAV=[
 ['index.html','Monstros','Monsters'],
 ['database.html','Database','Database'],
 ['team-builder.html','Team Builder','Team Builder'],
 ['runes.html','Runas','Runes'],
 ['optimizer.html','Optimizer','Optimizer']
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
};
const REV=Object.fromEntries(Object.entries(PAIRS).map(([pt,en])=>[en,pt]));
const isEN=()=>{try{return localStorage.getItem(K)==='en'}catch(_){return false}};
const tr=s=>{if(!s)return s;const m=isEN()?PAIRS:REV;return Object.prototype.hasOwnProperty.call(m,s)?m[s]:s};
function header(){
 const h=document.querySelector('header.top');if(!h)return;
 let logo=h.querySelector('.logo');
 if(!logo){logo=document.createElement('a');logo.className='logo';h.prepend(logo)}
 logo.href='index.html';logo.innerHTML='Yuna<span>Runes</span>';
 let nav=h.querySelector('nav.yuna-nav');
 if(!nav){nav=document.createElement('nav');nav.className='nav yuna-nav';h.appendChild(nav)}
 nav.innerHTML=NAV.map(x=>`<a href="${x[0]}">${isEN()?x[2]:x[1]}</a>`).join('');
 const cur=location.pathname.split('/').pop()||'index.html';nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===cur));
 let bar=h.querySelector('.yuna-controls');
 if(!bar){bar=document.createElement('div');h.appendChild(bar)}
 bar.className='langbar yuna-controls';
 bar.innerHTML='<a class="apk-link" href="./downloads/yunarunes.apk" download>📱 APK</a><button type="button" data-yuna-lang="pt">🇧🇷 PT/BR</button><button type="button" data-yuna-lang="en">🇬🇧 ENG</button>';
 bar.querySelectorAll('[data-yuna-lang]').forEach(b=>{b.classList.toggle('active',b.dataset.yunaLang===(isEN()?'en':'pt'));b.onclick=()=>{localStorage.setItem(K,b.dataset.yunaLang);location.reload()}});
}
function style(){
 let s=document.getElementById('yuna-language-style');if(s)return;s=document.createElement('style');s.id='yuna-language-style';
 s.textContent=`
header.top{position:relative!important;z-index:1000!important;overflow:visible!important}
header.top .yuna-nav{position:absolute!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important;display:flex!important;align-items:center!important;gap:18px!important;margin:0!important;white-space:nowrap!important;z-index:20!important}
header.top .yuna-controls{position:absolute!important;right:18px!important;top:50%!important;transform:translateY(-50%)!important;display:flex!important;align-items:center!important;gap:6px!important;z-index:1001!important;pointer-events:auto!important;white-space:nowrap!important}
header.top .yuna-controls a,header.top .yuna-controls button{display:inline-flex!important;align-items:center!important;justify-content:center!important;height:40px!important;padding:0 10px!important;border:1px solid #2b3742!important;border-radius:7px!important;font:900 12px Arial,sans-serif!important;white-space:nowrap!important;text-decoration:none!important;cursor:pointer!important;pointer-events:auto!important}
header.top .yuna-controls .apk-link,header.top .yuna-controls button.active{background:#35a9e1!important;color:#061018!important;border-color:#35a9e1!important}
header.top .yuna-controls button:not(.active){background:#202a34!important;color:#fff!important}
@media(max-width:600px){header.top .yuna-nav{display:none!important}header.top .yuna-controls{top:8px!important;right:8px!important;transform:none!important;gap:4px!important}header.top .yuna-controls a,header.top .yuna-controls button{height:36px!important;padding:0 7px!important;font-size:10px!important}}
`;
 document.head.appendChild(s);
}
function applyText(){
 document.documentElement.lang=isEN()?'en':'pt-BR';
 document.title=tr(document.title);
 document.querySelectorAll('body *').forEach(e=>{
  if(e.closest('script,style,noscript,.yuna-controls,.yuna-nav'))return;
  if(e.children.length===0&&e.firstChild&&e.firstChild.nodeType===3){const raw=e.firstChild.nodeValue,t=raw.trim();if(t){const v=tr(t);if(v!==t)e.firstChild.nodeValue=raw.replace(t,v)}}
  ['placeholder','title','aria-label'].forEach(a=>{if(e.hasAttribute(a)){const v=e.getAttribute(a),x=tr(v);if(x!==v)e.setAttribute(a,x)}});
 });
}
function boot(){header();style();applyText()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
