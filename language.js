(function(){
  'use strict';
  const PT='pt', EN='en';
  const translations={
    'Monstros':'Monsters','Database':'Database','Team Builder':'Team Builder','Runas':'Runes','Rune Builder':'Rune Builder','Optimizer':'Optimizer','Rune Optimizer':'Rune Optimizer','Códigos':'Codes',
    'Pesquisar monstro...':'Search monster...','Pesquisar um monstro...':'Search for a monster...','Pesquisar nome, elemento ou estrelas...':'Search name, element or stars...','Nome, família ou elemento...':'Name, family or element...','Ex.: Galleon, Camilla, Leo...':'E.g. Galleon, Camilla, Leo...','Ex.: Lushen':'E.g. Lushen',
    'Base de dados e ferramentas para Summoners War.':'Database and tools for Summoners War.','Base de dados e ferramentas para Summoners War':'Database and tools for Summoners War','Monster Database':'Monster Database',
    'Todos os elementos':'All elements','Todas as estrelas naturais':'All natural stars','Normais':'Normal','2A — Segundo Despertar':'2A — Second Awakening','Todos':'All',
    'A carregar os monstros...':'Loading monsters...','A carregar a base...':'Loading database...','A carregar todos os monstros...':'Loading all monsters...','A carregar inventário...':'Loading inventory...','Erro ao carregar a base.':'Error loading database.','Erro ao carregar o inventário.':'Error loading inventory.','Erro ao carregar a base de monstros. Tente atualizar a página.':'Error loading the monster database. Try refreshing the page.','A base não respondeu.':'The database did not respond.','Nenhum monstro encontrado.':'No monster found.','Nenhuma combinação encontrada.':'No combination found.',
    'monstros únicos carregados':'unique monsters loaded','variantes carregadas':'variants loaded','Abrir página do monstro →':'Open monster page →','Copiar código':'Copy code','Código copiado!':'Code copied!',
    'Ferramentas YunaRunes':'YunaRunes Tools','Escolhe um monstro e o YunaRunes monta várias opções de equipas respeitando o limite de cada conteúdo.':'Choose a monster and YunaRunes will build several team options while respecting each content limit.','Criar equipas':'Build teams','Ver com quem combina':'See who it synergizes with','Pesquisa um monstro para começar.':'Search for a monster to begin.','Pesquise um monstro':'Search for a monster',
    '🤝 Pesquisar um mob e ver com quem combina':'🤝 Search a monster and see its synergies','Escolhe um monstro e o YunaRunes mostra companheiros dentro do limite desse conteúdo.':'Choose a monster and YunaRunes will show compatible teammates within this content limit.','Monstro pesquisado':'Searched monster','Monstro recomendado':'Recommended monster','Runas recomendadas':'Recommended runes','Sets':'Sets','Substats prioritárias:':'Priority substats:','Slot':'Slot',
    'Ataque':'Attack','Defesa':'Defense','Normal — equilibrado':'Normal — balanced','SPD — velocidade':'SPD — speed','DMG — dano':'DMG — damage','EHP — sobrevivência':'EHP — survival','Qualquer':'Any','Guardar build':'Save build','Limpar':'Clear','Resumo da build':'Build summary','Estado':'Status','Não guardada':'Not saved','Guardada neste dispositivo':'Saved on this device','Build guardada automaticamente.':'Build saved automatically.','Build limpa.':'Build cleared.','Escolher main stat':'Choose main stat','Substats (ex.: SPD, HP%)':'Substats (e.g. SPD, HP%)',
    'Stats mínimas':'Minimum stats','Encontrar melhores builds':'Find best builds','Usar inventário de demonstração':'Use demo inventory','Importar o teu inventário JSON':'Import your JSON inventory','Resultados':'Results','combinações válidas. A mostrar as 15 melhores.':'valid combinations. Showing the top 15.','Usar esta build no Rune Builder':'Use this build in Rune Builder','Inventário de demonstração ativo:':'Demo inventory active:','Inventário personalizado ativo:':'Custom inventory active:','Inventário importado. Agora podes otimizar.':'Inventory imported. You can now optimize.','Inventário de demonstração restaurado.':'Demo inventory restored.','JSON inválido. Usa um ficheiro de inventário de runas em formato de lista.':'Invalid JSON. Use a rune inventory file in list format.','Não existem runas suficientes para os filtros escolhidos.':'There are not enough runes for the selected filters.','Nenhuma combinação encontrada. Experimenta baixar os mínimos ou deixar algum set/main stat em “Qualquer”.':'No combination found. Try lowering the minimums or leaving a set/main stat as “Any”.',
    'Exemplo: Swift + Will exige pelo menos 4 Swift e 2 Will. Se escolheres apenas o set de 4, os outros 2 slots ficam livres.':'Example: Swift + Will requires at least 4 Swift and 2 Will. If you choose only the 4-piece set, the other 2 slots are unrestricted.',
    'Voltar à Base de Monstros':'Back to Monster Database','📊 Utilização por conteúdo':'📊 Usage by content','X = utilização confirmada na base YunaRunes. — = sem dado confirmado.':'X = confirmed usage in the YunaRunes database. — = no confirmed data.','🤝 Mobs jogáveis com ':'🤝 Playable monsters with ','Sugestões automáticas de monstros jogáveis com sinergia de função e/ou conteúdos em comum. Não são classificações.':'Automatic suggestions of playable monsters with shared roles and/or content. They are not rankings.','⚔️ Que equipa usar com ':'⚔️ Which team to use with ','Equipa sugerida automaticamente a partir dos mobs disponíveis e dos conteúdos em comum.':'Team automatically suggested from available monsters and shared content.','📋 Informações':'📋 Information','Nome':'Name','Elemento':'Element','Estrelas':'Stars','Função':'Role','Despertar':'Awakening','Família':'Family','✓ Jogável':'✓ Playable','Normal / Despertado':'Normal / Awakened','Ainda não existem sugestões suficientes na base.':'There are not enough suggestions in the database yet.','Função geral':'General role',
    'máximo 4 mobs por equipa':'maximum 4 monsters per team','máximo 3 mobs por equipa':'maximum 3 monsters per team','Arena: máximo 4 mobs por equipa (Ataque ou Defesa).':'Arena: maximum 4 monsters per team (Attack or Defense).','Siege: máximo 3 mobs por equipa (Ataque ou Defesa).':'Siege: maximum 3 monsters per team (Attack or Defense).','WGB: máximo 3 mobs por equipa (Ataque ou Defesa).':'WGB: maximum 3 monsters per team (Attack or Defense).',
    'Códigos':'Codes','Projeto independente da comunidade Summoners War':'Independent Summoners War community project','Não afiliado à Com2uS.':'Not affiliated with Com2uS.','Abrir':'Open','Monstro':'Monster','Set':'Set','Slots':'Slots','6 runas encontradas foram colocadas nos slots. Podes alterar e guardar.':'The 6 found runes were placed in the slots. You can edit and save them.','Build do Optimizer aplicada':'Optimizer build applied','Optimizer aplicado':'Optimizer applied',
    'RTA':'RTA','PvE':'PvE','Arena':'Arena','Siege':'Siege','WGB':'WGB','Fogo':'Fire','Água':'Water','Vento':'Wind','Luz':'Light','Trevas':'Dark','Suporte':'Support',
    'Violent + Will ou sets de HP':'Violent + Will or HP sets','ou':'or','Substats':'Substats','ATK':'ATK','HP':'HP','DEF':'DEF','SPD':'SPD','CR':'CR','CD':'CD','ACC':'ACC','RES':'RES'
  };
  const reverse=Object.fromEntries(Object.entries(translations).map(([p,e])=>[e,p]));
  function current(){return localStorage.getItem('yunarunes-language')||PT}
  function translateText(text,lang){
    if(lang===PT)return text;
    let out=text;
    Object.keys(translations).sort((a,b)=>b.length-a.length).forEach(p=>{if(out.includes(p))out=out.split(p).join(translations[p])});
    return out;
  }
  function rememberAndTranslate(node,lang){
    if(!node||node.nodeType!==3)return;
    if(node.parentElement&&node.parentElement.closest('#language-switcher'))return;
    if(!node.dataset.yunaOriginal)node.dataset.yunaOriginal=node.nodeValue;
    const original=node.dataset.yunaOriginal;
    node.nodeValue=translateText(original,lang);
  }
  function translateAttributes(lang){
    document.querySelectorAll('input[placeholder],textarea[placeholder],select option,title').forEach(el=>{
      const attr=el.tagName==='TITLE'?'textContent':'placeholder' in el?'placeholder':null;
      if(!attr)return;
      if(!el.dataset.yunaOriginalAttr)el.dataset.yunaOriginalAttr=attr==='textContent'?el.textContent:el.getAttribute(attr)||'';
      const original=el.dataset.yunaOriginalAttr;
      if(attr==='textContent')el.textContent=translateText(original,lang);else el.setAttribute(attr,translateText(original,lang));
    });
  }
  function translate(lang){
    document.documentElement.lang=lang==='en'?'en':'pt-PT';
    document.querySelectorAll('body *:not(#language-switcher):not(#language-switcher *)').forEach(el=>{
      if(el.children.length===0&&el.childNodes.length===1)rememberAndTranslate(el.firstChild,lang);
    });
    translateAttributes(lang);
  }
  function addSwitcher(){
    if(document.getElementById('language-switcher'))return;
    const box=document.createElement('div');box.id='language-switcher';box.innerHTML='<button type="button" data-lang="pt">🇵🇹 PT</button><button type="button" data-lang="en">🇬🇧 EN</button>';
    Object.assign(box.style,{position:'fixed',right:'14px',top:'12px',zIndex:'99999',display:'flex',gap:'4px',padding:'4px',background:'#111820',border:'1px solid #2b3742',borderRadius:'8px',boxShadow:'0 4px 14px rgba(0,0,0,.35)'});
    box.querySelectorAll('button').forEach(b=>{Object.assign(b.style,{border:'0',borderRadius:'5px',padding:'6px 8px',cursor:'pointer',fontWeight:'800',fontSize:'12px',background:'#202a34',color:'#fff'});b.onclick=()=>{localStorage.setItem('yunarunes-language',b.dataset.lang);translate(b.dataset.lang);updateActive()}});
    document.body.appendChild(box);updateActive();
  }
  function updateActive(){const lang=current();document.querySelectorAll('#language-switcher button').forEach(b=>{b.style.background=b.dataset.lang===lang?'#35a9e1':'#202a34';b.style.color=b.dataset.lang===lang?'#061018':'#fff'})}
  function boot(){addSwitcher();translate(current());const obs=new MutationObserver(()=>{translate(current())});obs.observe(document.body,{childList:true,subtree:true});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
