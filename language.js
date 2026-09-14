(()=>{
const K='yunarunes-language',
N=[
 ['index.html','Monstros','Monsters'],
 ['database.html','Database','Database'],
 ['team-builder.html','Team Builder','Team Builder'],
 ['runes.html','Runas','Runes'],
 ['optimizer.html','Optimizer','Optimizer']
],
P=[
 ['Monstros','Monsters'],['Monstro','Monster'],['monstros','monsters'],['monstro','monster'],
 ['Runas','Runes'],['Ferramentas YunaRunes','YunaRunes Tools'],['Todos os elementos','All elements'],
 ['Todos','All'],['Normais','Normal'],['A carregar os monstros...','Loading monsters...'],
 ['A carregar a base...','Loading database...'],['A carregar inventário...','Loading inventory...'],
 ['A carregar perfil do monstro...','Loading monster profile...'],['Nenhum monstro encontrado.','No monster found.'],
 ['Pesquisar um monstro...','Search for a monster...'],['Pesquisar nome, família ou elemento...','Search name, family or element...'],
 ['Ex.: Galleon, Camilla, Leo...','E.g.: Galleon, Camilla, Leo...'],['Criar equipas','Create teams'],
 ['Ver com quem combina','See who it works with'],['Guardar build','Save build'],['Limpar','Clear'],
 ['Resumo da build','Build summary'],['Não guardada','Not saved'],['Guardada neste dispositivo','Saved on this device'],
 ['Informações','Information'],['Função','Role'],['Elemento','Element'],['Família','Family'],['Despertar','Awakening'],
 ['Stats base','Base stats'],['Skills','Skills'],['Runas recomendadas','Recommended runes'],
 ['Montar Rune Build','Build Rune Set'],['Abrir Optimizer','Open Optimizer'],['Abrir Rune Builder','Open Rune Builder'],
 ['Ataque','Attack'],['Defesa','Defense'],['Modo','Mode'],['Qualquer','Any'],['Stats mínimas','Minimum stats'],
 ['Encontrar melhores builds','Find best builds'],['Resultados','Results'],['Voltar à Base de Monstros','Back to Monster Database'],
 ['Pesquisa um monstro para começar.','Search for a monster to get started.'],['A verificar','Checking'],['Jogável','Playable'],
 ['Normal / Despertado','Normal / Awakened'],['Segundo Despertar','Second Awakening'],['2A — Segundo Despertar','2A — Second Awakening'],
 ['A procurar','Searching'],['Erro ao carregar a base de monstros.','Error loading the monster database.'],
 ['Não foi possível carregar a base de monstros.','Could not load the monster database.'],['Nenhuma combinação encontrada.','No combination found.'],
 ['Inventário de demonstração ativo:','Demo inventory active:'],['Inventário importado. Agora podes otimizar.','Inventory imported. You can optimize now.'],
 ['Build guardada automaticamente.','Build saved automatically.'],['Build limpa.','Build cleared.'],
 ['Usar esta build no Rune Builder','Use this build in Rune Builder'],['Monstro não especificado','Monster not specified'],
 ['Monstro não encontrado','Monster not found'],['Escolhe um monstro na Monster Database.','Choose a monster from the Monster Database.'],
 ['Esta variante ainda não existe na base de dados.','This variant is not in the database yet.'],
 ['Recomendações ainda não verificadas.','Recommendations not yet verified.'],['Substats prioritárias:','Priority substats:'],
 ['Sets:','Sets:'],['Combinações válidas.','Valid combinations.'],['A mostrar as 15 melhores.','Showing the 15 best.'],
 ['Nome','Name'],['Estrelas','Stars'],['Estrelas naturais','Natural stars'],['Todas as estrelas','All natural stars'],
 ['Normal — equilibrado','Normal — balanced'],['SPD — velocidade','SPD — speed'],['DMG — dano','DMG — damage'],
 ['EHP — sobrevivência','EHP — survival'],['Set principal','Main set'],['Set de 4','4-piece set'],['Set de 2','2-piece set'],
 ['Escolher main stat','Choose main stat'],['Substats (ex.: SPD, HP%)','Substats (e.g.: SPD, HP%)'],
 ['A carregar todos os monstros...','Loading all monsters...'],['Monstro não encontrado na base carregada.','Monster not found in the loaded database.'],
 ['variantes carregadas','variants loaded'],['Elementos:','Elements:'],['Estrelas:','Stars:'],
 ['Pesquisa monstros, filtra por elemento e estrelas e abre a ficha individual para ver mais informações.','Search monsters, filter by element and stars, and open the individual page for more information.'],
 ['Escolhe um monstro e o YunaRunes mostra companheiros dentro do limite desse conteúdo.','Choose a monster and YunaRunes shows companions within the limit for that content.'],
 ['Pesquisa um monstro e o YunaRunes monta várias opções de equipas respeitando o limite de cada conteúdo.','Search for a monster and YunaRunes creates several team options respecting each content limit.'],
 ['Arena: máximo 4 mobs por equipa (Ataque ou Defesa).','Arena: maximum 4 mobs per team (Attack or Defense).'],
 ['Siege: máximo 3 mobs por equipa (Ataque ou Defesa).','Siege: maximum 3 mobs per team (Attack or Defense).'],
 ['WGB: máximo 3 mobs por equipa (Ataque ou Defesa).','WGB: maximum 3 mobs per team (Attack or Defense).'],
 ['Pesquisa e consulta a base de monstros.','Search and browse the monster database.'],['Descobre equipas e sinergias.','Discover teams and synergies.'],
 ['Cria builds de runas.','Build rune sets.'],['Encontra combinações do inventário.','Find combinations from your inventory.'],
 ['Leva as ferramentas contigo no telemóvel.','Take the tools with you on your phone.'],['Instalar / Baixar APK','Install / Download APK'],
 ['Não afiliado à Com2uS.','Not affiliated with Com2uS.'],['Projeto independente da comunidade Summoners War','Independent Summoners War community project'],
 ['YunaRunes para Android','YunaRunes for Android'],['Abrir página do monstro →','Open monster page →']
],
E=new Map(P),Q=new Map(P.map(x=>[x[1],x[0]])),
en=()=>localStorage.getItem(K)==='en',
tr=s=>{
 if(!s)return s;
 const m=en()?E:Q;
 if(m.has(s))return m.get(s);
 let o=s;
 [...m].sort((a,b)=>b[0].length-a[0].length).forEach(x=>o=o.split(x[0]).join(x[1]));
 return o;
},
header=()=>{
 const h=document.querySelector('header.top');
 if(!h)return;
 h.classList.add('yuna-header');
 const oldLogo=h.querySelector('.logo');
 if(oldLogo)oldLogo.outerHTML='<a class="logo" href="index.html">Yuna<span>Runes</span></a>';
 else h.insertAdjacentHTML('afterbegin','<a class="logo" href="index.html">Yuna<span>Runes</span></a>');
 h.querySelectorAll('nav:not(.mobile-nav)').forEach((x,i)=>{if(i>0)x.remove()});
 let n=h.querySelector('nav:not(.mobile-nav)');
 if(!n){n=document.createElement('nav');h.appendChild(n)}
 n.className='nav';
 n.innerHTML=N.map(x=>'<a href="'+x[0]+'">'+(en()?x[2]:x[1])+'</a>').join('');
 const c=location.pathname.split('/').pop()||'index.html';
 n.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===c));
 let m=h.querySelector('.mobile-nav');
 if(!m){m=document.createElement('nav');h.appendChild(m)}
 m.className='mobile-nav';
 m.innerHTML=N.map((x,i)=>'<a href="'+x[0]+'" data-mobile-index="'+i+'"><span class="mi">'+['⌂','▤','⚔','◇','⚙'][i]+'</span><span>'+(en()?x[2]:x[1])+'</span></a>').join('');
 m.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===c));
 let b=h.querySelector('.langbar');
 if(!b){b=document.createElement('div');h.appendChild(b)}
 b.className='langbar';
 b.innerHTML='<a class="apk-link" href="./downloads/yunarunes.apk" download>📱 APK</a><button type="button" data-lang="pt">🇧🇷 PT/BR</button><button type="button" data-lang="en">🇬🇧 ENG</button>';
 b.querySelectorAll('[data-lang]').forEach(x=>{
   x.classList.toggle('active',x.dataset.lang===(en()?'en':'pt'));
   x.onclick=()=>{localStorage.setItem(K,x.dataset.lang);location.reload()};
 });
},
style=()=>{
 const s=document.getElementById('yuna-header-style')||document.createElement('style');
 s.id='yuna-header-style';
 s.textContent=`
header.top.yuna-header{
 position:relative!important;
 z-index:1000!important;
 min-height:64px!important;
 width:100%!important;
 display:grid!important;
 grid-template-columns:minmax(180px,1fr) auto minmax(260px,1fr)!important;
 align-items:center!important;
 gap:0!important;
 padding:0 18px!important;
 overflow:visible!important;
}
header.top.yuna-header .logo{
 grid-column:1!important;
 grid-row:1!important;
 justify-self:start!important;
 align-self:center!important;
 margin:0!important;
 padding:0!important;
 position:static!important;
 transform:none!important;
 white-space:nowrap!important;
}
header.top.yuna-header nav.nav{
 grid-column:2!important;
 grid-row:1!important;
 justify-self:center!important;
 align-self:center!important;
 position:static!important;
 display:flex!important;
 flex:none!important;
 align-items:center!important;
 justify-content:center!important;
 gap:22px!important;
 margin:0!important;
 padding:0!important;
 overflow:visible!important;
 white-space:nowrap!important;
}
header.top.yuna-header nav.nav a{
 display:inline-flex!important;
 align-items:center!important;
 justify-content:center!important;
 color:#cbd5dd!important;
 text-decoration:none!important;
 font-weight:700!important;
 white-space:nowrap!important;
}
header.top.yuna-header nav.nav a:hover,
header.top.yuna-header nav.nav a.active{color:#5fc7f5!important}
header.top.yuna-header .langbar{
 grid-column:3!important;
 grid-row:1!important;
 justify-self:end!important;
 align-self:center!important;
 position:static!important;
 display:flex!important;
 align-items:center!important;
 justify-content:flex-end!important;
 gap:7px!important;
 margin:0!important;
 padding:0!important;
 width:max-content!important;
 max-width:100%!important;
 white-space:nowrap!important;
 overflow:visible!important;
}
header.top.yuna-header .langbar a,
header.top.yuna-header .langbar button{
 box-sizing:border-box!important;
 display:inline-flex!important;
 align-items:center!important;
 justify-content:center!important;
 height:40px!important;
 min-width:max-content!important;
 padding:0 11px!important;
 border:1px solid #2b3742!important;
 border-radius:7px!important;
 font:900 12px/1 Arial,sans-serif!important;
 white-space:nowrap!important;
 text-decoration:none!important;
 cursor:pointer!important;
}
header.top.yuna-header .langbar .apk-link{
 background:#35a9e1!important;
 color:#061018!important;
 border-color:#35a9e1!important;
}
header.top.yuna-header .langbar button{
 background:#202a34!important;
 color:#fff!important;
}
header.top.yuna-header .langbar button.active{
 background:#35a9e1!important;
 color:#061018!important;
 border-color:#35a9e1!important;
}
header.top.yuna-header .mobile-nav{display:none!important}
@media(max-width:1000px) and (min-width:601px){
 header.top.yuna-header{grid-template-columns:minmax(145px,1fr) auto minmax(225px,1fr)!important;padding:0 12px!important}
 header.top.yuna-header nav.nav{gap:12px!important;font-size:13px!important}
 header.top.yuna-header .langbar{gap:4px!important}
 header.top.yuna-header .langbar a,header.top.yuna-header .langbar button{padding:0 8px!important;font-size:11px!important}
}
@media(max-width:600px){
 header.top.yuna-header{
  display:block!important;
  min-height:0!important;
  padding:8px 10px 0!important;
 }
 header.top.yuna-header .logo{
  display:block!important;
  padding:3px 5px 10px!important;
  font-size:28px!important;
 }
 header.top.yuna-header nav.nav{display:none!important}
 header.top.yuna-header .langbar{
  position:absolute!important;
  top:8px!important;
  right:8px!important;
  display:flex!important;
  gap:4px!important;
  z-index:1001!important;
 }
 header.top.yuna-header .langbar a,header.top.yuna-header .langbar button{
  height:36px!important;
  padding:0 7px!important;
  font-size:10px!important;
 }
 header.top.yuna-header .mobile-nav{
  display:grid!important;
  grid-template-columns:repeat(5,minmax(0,1fr))!important;
  width:calc(100% + 20px)!important;
  margin:0 -10px!important;
  border-top:1px solid #2b3742!important;
  padding:8px 3px!important;
  background:#101a23!important;
 }
 header.top.yuna-header .mobile-nav a{
  display:flex!important;
  flex-direction:column!important;
  align-items:center!important;
  justify-content:center!important;
  gap:3px!important;
  color:#cbd5dd!important;
  text-decoration:none!important;
  font-size:10px!important;
 }
 header.top.yuna-header .mobile-nav a.active{color:#5fc7f5!important}
 header.top.yuna-header .mobile-nav .mi{font-size:20px!important;color:#5fc7f5!important}
}
`;
 if(!s.parentNode)document.head.appendChild(s);
},
tx=()=>{
 document.documentElement.lang=en()?'en':'pt-BR';
 header();
 style();
 document.title=tr(document.title);
 document.querySelectorAll('body *').forEach(e=>{
  if(e.closest('script,style,noscript'))return;
  if(e.children.length===0&&e.firstChild?.nodeType===3){
   const r=e.firstChild.nodeValue,t=r.trim(),v=tr(t);
   if(v!==t)e.firstChild.nodeValue=r.replace(t,v);
  }
  ['placeholder','title','aria-label'].forEach(a=>{
   if(e.hasAttribute(a)){
    const v=e.getAttribute(a),x=tr(v);
    if(x!==v)e.setAttribute(a,x);
   }
  });
 });
};
function boot(){
 tx();
 new MutationObserver(m=>m.forEach(z=>z.addedNodes.forEach(n=>{
  if(n.nodeType===1){
   const all=[n,...n.querySelectorAll('*')];
   all.forEach(e=>{
    if(!e.closest('script,style,noscript')){
     if(e.children.length===0&&e.firstChild?.nodeType===3){
      const r=e.firstChild.nodeValue,t=r.trim(),v=tr(t);
      if(v!==t)e.firstChild.nodeValue=r.replace(t,v);
     }
     ['placeholder','title','aria-label'].forEach(a=>{
      if(e.hasAttribute(a)){const v=e.getAttribute(a),x=tr(v);if(x!==v)e.setAttribute(a,x)}
     });
    }
   });
  }
 })).observe(document.body,{childList:true,subtree:true});
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot):boot();
})();