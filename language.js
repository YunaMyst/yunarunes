(()=>{'use strict';
const K='yunarunes-language';
const isApp=()=>{const u=navigator.userAgent||'';return /YunaRunesApp/i.test(u)||(/Android/i.test(u)&&(/\bwv\b/i.test(u)||/Version\/4\.0/i.test(u)||/;\s*wv[;\)]/i.test(u)));};
const NAV=[['index.html','Início','Home'],['nat5.html','⭐ Nat 5','⭐ Nat 5'],['database.html','Database','Database'],['team-builder.html','⚔️ Team Builder','⚔️ Team Builder'],['runes.html','🧿 Runas','🧿 Runes'],['optimizer.html','⚙️ Optimizer','⚙️ Optimizer']];
const P={
'Início':'Home','Monstros':'Monsters','Monstro':'Monster','monstros':'monsters','monstro':'monster','Runas':'Runes','Ferramentas YunaRunes':'YunaRunes Tools','Todos os elementos':'All elements','Todos':'All','Normais':'Normal','Carregando os monstros...':'Loading monsters...','Carregando a base...':'Loading database...','Carregando inventário...':'Loading inventory...','Carregando perfil do monstro...':'Loading monster profile...','Nenhum monstro encontrado.':'No monster found.','Pesquisar um monstro...':'Search for a monster...','Pesquisar nome, família ou elemento...':'Search name, family or element...','Ex.: Galleon, Camilla, Leo...':'E.g.: Galleon, Camilla, Leo...','Criar equipes':'Create teams','Ver com quem combina':'See who it works with','Salvar build':'Save build','Limpar':'Clear','Resumo da build':'Build summary','Não guardada':'Not saved','Guardada neste dispositivo':'Saved on this device','Informações':'Information','Função':'Role','Elemento':'Element','Família':'Family','Despertar':'Awakening','Stats base':'Base stats','Skills':'Skills','Runas recomendadas':'Recommended runes','Montar Rune Build':'Build Rune Set','Abrir Optimizer':'Open Optimizer','Abrir Runas':'Open Runes','Ataque':'Attack','Defesa':'Defense','Velocidade':'Speed','Vida':'HP','Taxa crítica':'Critical Rate','Dano crítico':'Critical Damage','Modo':'Mode','Qualquer':'Any','Stats mínimas':'Minimum stats','Encontrar melhores builds':'Find best builds','Resultados':'Results','Voltar à Base de Monstros':'Back to Monster Database','Pesquisa um monstro para começar.':'Search for a monster to get started.','A verificar':'Checking','Jogável':'Playable','Normal / Despertado':'Normal / Awakened','Segundo Despertar':'Second Awakening','2A — Segundo Despertar':'2A — Second Awakening','A procurar':'Searching','Erro ao carregar a base de monstros.':'Error loading the monster database.','Não foi possível carregar a base de monstros.':'Could not load the monster database.','Nenhuma combinação encontrada.':'No combination found.','Inventário de demonstração ativo:':'Demo inventory active:','Inventário importado. Agora podes otimizar.':'Inventory imported. You can optimize now.','Build guardada automaticamente.':'Build saved automatically.','Build limpa.':'Build cleared.','Usar esta build no Runas':'Use this build in Runas','Monstro não especificado':'Monster not specified','Monstro não encontrado':'Monster not found','Escolhe um monstro na Monster Database.':'Choose a monster from the Monster Database.','Esta variante ainda não existe na base de dados.':'This variant is not in the database yet.','Recomendações ainda não verificadas.':'Recommendations not yet verified.','Substats prioritárias:':'Priority substats:','Sets:':'Sets:','Combinações válidas.':'Valid combinations.','A mostrar as 15 melhores.':'Showing the 15 best.','Nome':'Name','Estrelas':'Stars','Estrelas naturais':'Natural stars','Todas as estrelas':'All natural stars','Normal — equilibrado':'Normal — balanced','SPD — velocidade':'SPD — speed','DMG — dano':'DMG — damage','EHP — sobrevivência':'EHP — survival','Set principal':'Main set','Set de 4':'4-piece set','Set de 2':'2-piece set','Escolher main stat':'Choose main stat','Substats (ex.: SPD, HP%)':'Substats (e.g.: SPD, HP%)','Carregando todos os monstros...':'Loading all monsters...','Monstro não encontrado na base carregada.':'Monster not found in the loaded database.','variantes carregadas':'variants loaded','Elementos:':'Elements:','Estrelas:':'Stars:','Pesquisa e consulta a base de monstros.':'Search and browse the monster database.','Pesquisa monstros, filtra por elemento e estrelas e abre a ficha individual para ver mais informações.':'Search monsters, filter by element and stars, and open the individual page for more information.','Escolhe um monstro e o YunaRunes mostra companheiros dentro do limite desse conteúdo.':'Choose a monster and YunaRunes shows companions within the limit for that content.','Pesquisa um monstro e o YunaRunes monta várias opções de equipes respeitando o limite de cada conteúdo.':'Search for a monster and YunaRunes creates several team options respecting the limit for each content.','Arena: máximo 4 mobs por equipe (Ataque ou Defesa).':'Arena: maximum 4 mobs per team (Attack or Defense).','Siege: máximo 3 mobs por equipe (Ataque ou Defesa).':'Siege: maximum 3 mobs per team (Attack or Defense).','WGB: máximo 3 mobs por equipe (Ataque ou Defesa).':'WGB: maximum 3 mobs per team (Attack or Defense).','Descobre equipes e sinergias.':'Discover teams and synergies.','Cria builds de runas.':'Build rune sets.','Encontra combinações do inventário.':'Find combinations from your inventory.','Leva as ferramentas com você no celular.':'Take the tools with you on your phone.','Instalar / Baixar APK':'Install / Download APK','Não afiliado à Com2uS.':'Not affiliated with Com2uS.','Projeto independente da comunidade Summoners War':'Independent Summoners War community project','O seu hub de mobs, runas e equipes.':'Your hub for monsters, runes and teams.','pesquisa um monstro, monta uma equipe, cria builds, otimiza o seu inventário e salva os seus mobs favoritos. Tudo num só lugar, preparado para PC e celular.':'Search a monster, build a team, create builds, optimize your inventory and save your favorite monsters. Everything in one place, ready for PC and mobile.','ACESSO RÁPIDO':'QUICK ACCESS','Escolhe a categoria de monstros':'Choose a monster category','Monstros de 2 estrelas':'2-star monsters','Monstros de 3 estrelas':'3-star monsters','Monstros de 4 estrelas':'4-star monsters','Monstros de 5 estrelas':'5-star monsters','Ver monstros →':'View monsters →','Abrir →':'Open →','⭐ Nat 5 em destaque':'⭐ Featured Nat 5','Abrir Nat 5 →':'Open Nat 5 →','📱 YunaRunes no celular':'📱 YunaRunes on mobile','Leva a raposa com você.':'Take the fox with you.','Instala o APK do YunaRunes e usa as ferramentas no Android.':'Install the YunaRunes APK and use the tools on Android.','Baixar APK':'Download APK','Carregando a base de monstros...':'Loading the monster database...','A base de monstros não pôde ser carregada.':'The monster database could not be loaded.','monstros disponíveis':'monsters available','Início':'Home','Códigos':'Codes','Análise de Conta':'Account Analysis','Guild/Siege':'Guild/Siege','Ferramentas principais':'Main tools','YunaRunes para Android':'YunaRunes for Android','Abrir página do monstro →':'Open monster page →','Pesquisar um monstro':'Search for a monster','Pesquisar':'Search','Salvar':'Save','Cancelar':'Cancel','Fechar':'Close','Aplicar':'Apply','Voltar':'Back','Adicionar':'Add','Remover':'Remove','Confirmar':'Confirm','Sim':'Yes','Não':'No',
'Runas':'Runes','Escolhe qualquer monstro, elemento e evolução disponível na base. Cada variante usa a fotografia correspondente.':'Choose any monster, element, and evolution available in the database. Each variant uses the corresponding image.','Slots 1–6':'Slots 1–6','Estado':'Status','Set':'Set','Slots':'Slots','Otimizer':'Optimizer','Build do Optimizer aplicada':'Optimizer build applied','As 6 runas encontradas foram colocadas nos slots. Podes alterar e salvar.':'The 6 found runes were placed in the slots. You can edit and save.','Escolher main stat':'Choose main stat',
'Rune Optimizer':'Rune Optimizer','O YunaRunes procura combinações reais do inventário, respeitando slots, conjuntos, main stats e requisitos mínimos.':'YunaRunes searches real inventory combinations while respecting slots, sets, main stats, and minimum requirements.','Set de 4':'4-piece set','Set de 2':'2-piece set','Slot 2':'Slot 2','Slot 4':'Slot 4','Slot 6':'Slot 6','Exemplo: Swift + Will exige pelo menos 4 Swift e 2 Will. Se escolheres apenas o set de 4, os outros 2 slots ficam livres.':'Example: Swift + Will requires at least 4 Swift and 2 Will. If you choose only the 4-piece set, the other 2 slots are free.','Usar inventário de demonstração':'Use demo inventory','Importar o seu inventário JSON':'Import your JSON inventory','Não existem runas suficientes para os filtros escolhidos.':'There are not enough runes for the selected filters.','Nenhuma combinação encontrada. Experimenta baixar os mínimos ou deixar algum set/main stat em “Qualquer”.':'No combination found. Try lowering the minimums or leaving a set/main stat as “Any”.','combinações válidas. A mostrar as 15 melhores.':'valid combinations. Showing the 15 best.','Inventário personalizado ativo:':'Custom inventory active:','JSON inválido. Usa um arquivo de inventário de runas em formato de lista.':'Invalid JSON. Use a rune inventory file in list format.','Inventário de demonstração restaurado.':'Demo inventory restored.',
'← Voltar à Base de Monstros':'← Back to Monster Database','Utilização por conteúdo':'Usage by content','X = utilização confirmada na base YunaRunes. — = sem dado confirmado.':'X = confirmed usage in the YunaRunes database. — = no confirmed data.','Mobs jogáveis com':'Playable mobs with','Sugestões automáticas de monstros jogáveis com sinergia de função e/ou conteúdos em comum. Não são classificações.':'Automatic suggestions of playable monsters with role and/or content synergy in common. These are not rankings.','Que equipe usar com':'Which team to use with','Equipe sugerida automaticamente a partir dos mobs disponíveis e dos conteúdos em comum.':'Team suggested automatically from available mobs and shared content.','Team suggested automatically from available monsters and shared content.':'Equipe sugerida automaticamente a partir dos monstros disponíveis e dos conteúdos em comum.','Team suggested automatically from available mobs and shared content.':'Equipe sugerida automaticamente a partir dos mobs disponíveis e dos conteúdos em comum.','Monstro pesquisado':'Searched monster','Ainda não existem sugestões suficientes na base.':'There are not enough suggestions in the database yet.','Calculadora de Runas':'Rune Calculator','Comparar Mobs':'Compare Monsters','Meus Mobs':'My Monsters','Ferramentas':'Tools','Comparar':'Compare','Salvar no dispositivo':'Save on this device','Calcular':'Calculate','Dano':'Damage','Sobrevivência':'Survival','Pontuação da build':'Build score','Metas gerais ainda abaixo:':'General targets still below:','A build atingiu as metas gerais selecionadas.':'The build reached the selected general targets.','Build guardada neste dispositivo.':'Build saved on this device.','Compara dados da base lado a lado. O YunaRunes não transforma a comparação num ranking.':'Compare database data side by side. YunaRunes does not turn the comparison into a ranking.','Escolhe pelo menos dois monstros.':'Choose at least two monsters.','Guarda os seus monstros favoritos neste dispositivo para aceder rapidamente às fichas.':'Save your favorite monsters on this device for quick access to their profiles.','Ainda não tens mobs favoritos. Abre uma ficha e toca em ❤️ Salvar.':'You do not have favorite monsters yet. Open a profile and tap ❤️ Save.','Remover':'Remove','Função geral':'General role','✓ Jogável':'✓ Playable','Fire':'Fire','Water':'Water','Wind':'Wind','Light':'Light','Dark':'Dark','Fogo':'Fire','Água':'Water','Vento':'Wind','Luz':'Light','Trevas':'Dark','Suporte':'Support','Attack':'Attack','Defense':'Defense','Support':'Support','HP':'HP','Perfil individual YunaRunes':'YunaRunes individual profile','As skills detalhadas deste monstro ainda não estão na base verificada. Não vou inventar descrições.':'Detailed skills for this monster are not yet in the verified database. I will not invent descriptions.','Materiais específicos de despertar ainda não foram adicionados para este monstro.':'Specific awakening materials have not yet been added for this monster.','O despertar pode alterar aparência, nome ou habilidades dependendo do monstro.':'Awakening can change appearance, name, or skills depending on the monster.','Os stats só são mostrados como valores quando existem dados na base YunaRunes.':'Stats are only shown as values when data exists in the YunaRunes database.','RTA':'RTA','Arena':'Arena','Siege':'Siege','PvE':'PvE','Monstro pesquisado':'Searched monster'};
const EXTRA={'O seu hub de mobs, runas e equipes.':'Your hub for monsters, runes and teams.','Pesquisa um monstro, monta uma equipe, cria builds, otimiza o seu inventário e guarda os seus mobs favoritos. Tudo num só lugar, preparado para PC e celular.':'Search a monster, build a team, create builds, optimize your inventory and save your favorite monsters. Everything in one place, ready for PC and mobile.','Pesquisar um mob...':'Search for a monster...','Pesquisar':'Search','monstros disponíveis':'monsters available','🧰 Ferramentas':'🧰 Tools','Ver todas →':'See all →','Ver todas':'See all','Calculadora de Runas':'Rune Calculator','Soma stats manualmente e verifica metas gerais da build.':'Add stats manually and check general build targets.','Comparar Mobs':'Compare Monsters','Coloca até três monstros lado a lado e consulta os dados.':'Place up to three monsters side by side and compare their data.','Meus Mobs':'My Monsters','Guarda os seus monstros favoritos neste dispositivo para abrir as fichas rapidamente.':'Save your favorite monsters on this device for quick profile access.','Códigos':'Codes','Vê códigos ativos, copia e abre o resgate iOS quando disponível.':'View active codes, copy them, and open iOS redemption when available.','Monster Database':'Monster Database','Pesquisa por nome, elemento, estrelas e variantes 2A.':'Search by name, element, stars and 2A variants.','Artifact Optimizer':'Artifact Optimizer','Analisa artefactos e complementa a build do seu monstro.':'Analyze artifacts and complement your monster build.','⭐ Nat 5 em destaque':'⭐ Featured Nat 5','Abrir Nat 5 →':'Open Nat 5 →','📱 YunaRunes no celular':'📱 YunaRunes on mobile','Leva a raposa com você.':'Take the fox with you.','Instala o APK do YunaRunes e usa as ferramentas no Android.':'Install the YunaRunes APK and use the tools on Android.','Baixar APK':'Download APK','Calculadora de Runas':'Rune Calculator','Monta uma build manual, soma os substats e compara o resultado com metas gerais para a função do monstro.':'Build a manual set, add substats and compare the result with general targets for the monster role.','Slots 1–6':'Slots 1–6','Salvar no dispositivo':'Save on this device','Coloca os valores dos substats exatamente como aparecem nas suas runas. A calculadora não inventa stats nem assume uma build oficial.':'Enter substat values exactly as shown on your runes. The calculator does not invent stats or assume an official build.','Resultado':'Result','Pontuação da build':'Build score','Metas gerais ainda abaixo:':'General targets still below:','A build atingiu as metas gerais selecionadas.':'The build reached the selected general targets.','Build guardada neste dispositivo.':'Build saved on this device.','Comparar Mobs':'Compare Monsters','Compara dados da base lado a lado. O YunaRunes não transforma a comparação num ranking.':'Compare database data side by side. YunaRunes does not turn the comparison into a ranking.','Escolhe pelo menos dois monstros.':'Choose at least two monsters.','Abrir ficha':'Open profile','Meus Mobs':'My Monsters','Guarda os seus monstros favoritos neste dispositivo para aceder rapidamente às fichas.':'Save your favorite monsters on this device for quick access to their profiles.','Ainda não tens mobs favoritos. Abre uma ficha e toca em ❤️ Salvar.':'You do not have favorite monsters yet. Open a profile and tap ❤️ Save.','Remover':'Remove','Salvar nos Meus Mobs':'Save to My Monsters','Remover dos Meus Mobs':'Remove from My Monsters','Build de Runas':'Runas','Sugestão geral baseada na função do monstro. Usa o Rune Optimizer para encontrar runas reais do seu inventário.':'General suggestion based on the monster role. Use Rune Optimizer to find real runes from your inventory.','Set principal':'Main set','Calculadora':'Calculator'};Object.assign(P,EXTRA);
const R=Object.fromEntries(Object.entries(P).map(([a,b])=>[b,a]));
const isEN=()=>{try{return localStorage.getItem(K)==='en'}catch(_){return false}};
function tr(s){if(!s)return s;const m=isEN()?P:R;let out=String(s);const brand='YunaRunes';const token='__YUNARUNES_BRAND__';out=out.replace(/Yuna(?:Runes?|Build\s+de\s+Runas?|Rune\s+Builders?)/gi,token);for(const k of Object.keys(m).sort((a,b)=>b.length-a.length)){if(out.includes(k))out=out.split(k).join(m[k])}return out.replaceAll(token,brand)};window.YunaRunesTranslate=tr;
function header(){
  const h=document.querySelector('header.top');
  if(!h)return;
  const nav=h.querySelector('.nav');
  if(!nav)return;
  const brand=nav.querySelector('.brand');
  const img=brand&&brand.querySelector('img');
  if(img)img.remove();
  if(brand){
    brand.innerHTML='<span>YunaRunes</span>';
    brand.setAttribute('aria-label','YunaRunes');
  }
  let b=nav.querySelector('.yuna-controls');
  if(!b){
    b=document.createElement('div');
    b.className='langbar yuna-controls';
    nav.appendChild(b);
  }
  b.innerHTML=(isApp()?'':'<a class="apk-link" href="./downloads/yunarunes.apk" download>📱 APK</a>')+
    '<button type="button" data-yuna-lang="pt">🇧🇷 PT/BR</button>'+
    '<button type="button" data-yuna-lang="en">🇬🇧 ENG</button>';
  b.querySelectorAll('[data-yuna-lang]').forEach(x=>{
    x.classList.toggle('active',x.dataset.yunaLang===(isEN()?'en':'pt'));
    x.addEventListener('click',()=>{
      try{localStorage.setItem(K,x.dataset.yunaLang)}catch(_){}
      location.reload();
    });
  });
  const links=nav.querySelectorAll('.nav-links a');
  const cur=location.pathname.split('/').pop()||'index.html';
  links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===cur));
}
function translateElement(e){if(!e||e.nodeType!==1||e.closest('script,style,noscript,.yuna-controls,.yuna-nav'))return;if(e.children.length===0&&e.firstChild&&e.firstChild.nodeType===3){const raw=e.firstChild.nodeValue,t=raw.trim(),v=tr(t);if(t&&v!==t)e.firstChild.nodeValue=raw.replace(t,v)}['placeholder','title','aria-label'].forEach(a=>{if(e.hasAttribute(a)){const v=e.getAttribute(a),x=tr(v);if(x!==v)e.setAttribute(a,x)}})}
function translateTree(root){if(!root)return; if(root.nodeType===3){const t=root.nodeValue.trim(),v=tr(t);if(t&&v!==t)root.nodeValue=root.nodeValue.replace(t,v);return} if(root.nodeType!==1)return;translateElement(root);root.querySelectorAll('*').forEach(translateElement)}
function style(){
  if(document.getElementById('yuna-language-style'))return;
  const s=document.createElement('style');
  s.id='yuna-language-style';
  s.textContent=`
    header.top{position:relative!important;z-index:9999!important}
    header.top>.nav{position:relative!important;min-height:58px!important;display:flex!important;align-items:center!important;gap:8px!important}
    body.yunarunes-app .mobile-download,body.yunarunes-app .apk-link,body.yunarunes-app [href*='.apk' i],body.yunarunes-app [download]{display:none!important}
    body.yunarunes-app .section-title:has(h2){ }
    header.top .brand{flex:0 0 auto!important;margin-right:4px!important}
    header.top .brand img{display:none!important}
    header.top .yuna-controls{display:flex!important;align-items:center!important;gap:5px!important;flex:0 0 auto!important;order:0!important;margin-right:4px!important}
    header.top .yuna-controls a,header.top .yuna-controls button{
      height:32px!important;padding:0 8px!important;border:1px solid #2b3742!important;border-radius:7px!important;
      font:800 11px Arial,sans-serif!important;white-space:nowrap!important;text-decoration:none!important;
      display:inline-flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important
    }
    header.top .yuna-controls .apk-link{display:none!important;background:#35a9e1!important;color:#061018!important;border-color:#35a9e1!important}
    header.top .yuna-controls button.active{background:#35a9e1!important;color:#061018!important;border-color:#35a9e1!important}
    header.top .yuna-controls button:not(.active){background:#202a34!important;color:#fff!important}
    header.top .nav-links{order:2!important;min-width:0!important}
    @media(max-width:1200px) and (min-width:601px){
      header.top>.nav{padding-left:10px!important;padding-right:10px!important}
      header.top .nav-links a{font-size:12px!important;padding:8px 5px!important}
      header.top .yuna-controls{gap:3px!important}
      header.top .yuna-controls a,header.top .yuna-controls button{padding:0 6px!important;font-size:10px!important}
    }
    @media(max-width:600px){
      header.top{height:auto!important;min-height:0!important}
      header.top>.nav{
        min-height:0!important;padding:10px 10px 8px!important;display:grid!important;
        grid-template-columns:1fr auto!important;grid-template-areas:
          "brand menu"
          "langs langs"
          "links links"!important;gap:8px!important
      }
      header.top .brand{
        grid-area:brand!important;margin:0!important;justify-self:start!important;
        font-size:20px!important;line-height:1!important
      }
      header.top .menu-btn{
        grid-area:menu!important;position:static!important;align-self:center!important;
        display:block!important;padding:8px 11px!important
      }
      header.top .yuna-controls{
        grid-area:langs!important;order:initial!important;justify-self:start!important;
        width:100%!important;margin:0!important;display:flex!important;
        justify-content:flex-start!important;gap:6px!important;padding:2px 0 0!important
      }
      header.top .yuna-controls .apk-link{display:inline-flex!important}
      body.yunarunes-app header.top .yuna-controls .apk-link{display:none!important}
      header.top .yuna-controls a,header.top .yuna-controls button{
        height:34px!important;min-width:72px!important;padding:0 9px!important;font-size:10px!important
      }
      header.top .nav-links{
        grid-area:links!important;order:initial!important;width:100%!important;margin:0!important;
        padding:0!important;display:none!important;grid-template-columns:1fr 1fr!important;gap:6px!important
      }
      header.top .nav-toggle:checked~.nav-links{display:grid!important}
      header.top .nav-links a{
        min-height:46px!important;padding:8px 5px!important;font-size:11px!important;
        display:flex!important;align-items:center!important;justify-content:center!important;
        text-align:center!important;white-space:normal!important
      }
      header.top .nav-divider{display:none!important}
    }
    @media(min-width:601px){
      header.top .yuna-controls .apk-link{display:none!important}
    }
    body.yunarunes-app header.top .yuna-controls .apk-link{display:none!important}
    body.yunarunes-app header.top>.nav{padding-top:14px!important;padding-bottom:10px!important}
    body.yunarunes-app header.top .yuna-controls{margin-top:0!important}
    body.yunarunes-app header.top>.nav{padding:14px 10px!important;gap:10px!important;max-width:none!important;width:100%!important;margin:0!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;flex-wrap:nowrap!important}
    body.yunarunes-app header.top .brand{display:flex!important;visibility:visible!important;opacity:1!important;position:static!important;order:0!important;flex:0 0 auto!important;margin:0!important;width:max-content!important;padding:0!important;text-align:left!important;transform:none!important}
    body.yunarunes-app header.top .brand span{display:block!important;visibility:visible!important;opacity:1!important;color:#fff!important}
    body.yunarunes-app header.top .menu-btn{position:static!important;order:1!important;flex:0 0 auto!important;margin:0!important;transform:none!important;z-index:6!important}
    body.yunarunes-app header.top .yuna-controls{order:2!important;margin:0 0 0 auto!important;flex:0 0 auto!important;width:auto!important;min-height:0!important;display:flex!important;gap:6px!important}
    @media(max-width:600px){
      body.yunarunes-app header.top>.nav{display:flex!important;flex-wrap:nowrap!important;padding:14px 8px!important;gap:8px!important}
      body.yunarunes-app header.top .brand{font-size:18px!important}
      body.yunarunes-app header.top .menu-btn{display:block!important;padding:8px 10px!important;min-height:40px!important}
      body.yunarunes-app header.top .yuna-controls{margin-left:auto!important}
      body.yunarunes-app header.top .yuna-controls button{min-width:58px!important;height:34px!important;padding:0 6px!important;font-size:9px!important}
    }
    body.yunarunes-app header.top .menu-btn{margin-top:12px!important;min-height:44px!important;padding:10px 13px!important}
    body.yunarunes-app header.top .yuna-controls{margin-top:14px!important;margin-bottom:4px!important;gap:8px!important;min-height:40px!important}
  `;
  document.head.appendChild(s);
}
function brandClean(s){
  return String(s??'')
    .replace(/YunaBuild\s*de\s*Runas?/gi,'YunaRunes')
    .replace(/YunaRune\s+Builders?/gi,'YunaRunes')
    .replace(/YunaRune\s+Builder/gi,'YunaRunes')
    .replace(/YunaRunes?/gi,'YunaRunes');
}
function cleanBrandTree(root){
  if(!root)return;
  const fix=s=>brandClean(s);
  if(root.nodeType===3){
    const v=fix(root.nodeValue);
    if(v!==root.nodeValue)root.nodeValue=v;
    return;
  }
  if(root.nodeType!==1)return;
  if(root.matches('script,style,noscript'))return;
  if(root.children.length===0&&root.firstChild&&root.firstChild.nodeType===3){
    const v=fix(root.firstChild.nodeValue);
    if(v!==root.firstChild.nodeValue)root.firstChild.nodeValue=v;
  }
  ['title','placeholder','aria-label','alt'].forEach(a=>{
    if(root.hasAttribute(a)){
      const v=fix(root.getAttribute(a));
      if(v!==root.getAttribute(a))root.setAttribute(a,v);
    }
  });
}
function forceAppHeader(){
  if(!isApp())return;
  const nav=document.querySelector('header.top>.nav');
  const brand=document.querySelector('header.top .brand');
  const menu=document.querySelector('header.top .menu-btn');
  const langs=document.querySelector('header.top .yuna-controls');
  if(!nav||!brand||!menu||!langs)return;
  const imp=(el,p,v)=>el.style.setProperty(p,v,'important');
  imp(nav,'display','flex'); imp(nav,'flex-direction','row'); imp(nav,'flex-wrap','nowrap');
  imp(nav,'align-items','center'); imp(nav,'justify-content','flex-start'); imp(nav,'width','100%');
  imp(nav,'max-width','none'); imp(nav,'padding','12px 8px'); imp(nav,'gap','8px');
  imp(brand,'display','flex'); imp(brand,'position','static'); imp(brand,'order','0'); imp(brand,'flex','0 0 auto');
  imp(brand,'margin','0'); imp(brand,'padding','0'); imp(brand,'width','max-content'); imp(brand,'visibility','visible'); imp(brand,'opacity','1');
  imp(menu,'display','block'); imp(menu,'position','static'); imp(menu,'order','1'); imp(menu,'flex','0 0 auto');
  imp(menu,'margin','0'); imp(menu,'padding','8px 10px'); imp(menu,'min-height','40px'); imp(menu,'transform','none');
  imp(langs,'display','flex'); imp(langs,'position','static'); imp(langs,'order','2'); imp(langs,'flex','0 0 auto');
  imp(langs,'width','auto'); imp(langs,'margin','0 0 0 auto'); imp(langs,'padding','0'); imp(langs,'min-height','0');
  imp(langs,'gap','6px'); imp(langs,'justify-content','flex-start');
  langs.querySelectorAll('button').forEach(b=>{imp(b,'height','34px');imp(b,'min-height','34px');imp(b,'min-width','58px');imp(b,'padding','0 7px');});
}
function cleanAppUI(){
  if(!isApp())return;
  document.documentElement.classList.add('yunarunes-app');
  document.body.classList.add('yunarunes-app');
  document.querySelectorAll('.mobile-download,.apk-link,[href*=".apk" i],[download]').forEach(e=>e.remove());
  document.querySelectorAll('a,button,label,[role="button"]').forEach(e=>{
    const t=(e.textContent||'').trim();
    if(/\bAPK\b|baixar.*apk|download.*apk|instalar.*apk/i.test(t))e.remove();
  });
  document.querySelectorAll('.section-title').forEach(e=>{
    const t=(e.textContent||'').trim();
    if(/YunaRunes no celular|YunaRunes on mobile/i.test(t)){
      const n=e.nextElementSibling;
      if(n)n.remove();
      e.remove();
    }
  });
  const nav=document.querySelector('header.top>.nav');
  const menu=document.querySelector('header.top .menu-btn');
  const brand=document.querySelector('header.top .brand');
  if(brand){
    brand.style.justifySelf='start';
    brand.style.marginLeft='0';
    brand.style.marginRight='0';
    brand.style.textAlign='left';
    brand.style.position='absolute';
    brand.style.left='0';
    brand.style.width='max-content';
    brand.style.marginRight='0';
    brand.style.paddingLeft='0';
    brand.style.display='flex';
    brand.style.visibility='visible';
    brand.style.opacity='1';
    const bs=brand.querySelector('span');
    if(bs){bs.style.display='block';bs.style.visibility='visible';bs.style.opacity='1';bs.style.color='#fff';}
  }
  if(menu){
    menu.style.position='static';
    menu.style.right='auto';
    menu.style.left='auto';
    menu.style.top='auto';
    menu.style.transform='none';
    menu.style.margin='0';
    menu.style.order='1';
  }
  if(menu){
    menu.style.marginTop='0';
    menu.style.minHeight='40px';
    menu.style.padding='8px 10px';
  }
  document.querySelectorAll('header.top .yuna-controls').forEach(e=>{
    e.style.marginTop='14px';
    e.style.marginBottom='4px';
    e.style.gap='8px';
    e.style.minHeight='40px';
  });
  document.querySelectorAll('header.top .yuna-controls button').forEach(e=>{
    e.style.minHeight='38px';
    e.style.padding='0 11px';
  });
}
function bootLanguage(){
  style();
  header();
  document.body.classList.toggle('yunarunes-app',isApp());
  cleanAppUI();
  forceAppHeader();
  const body=document.body;
  if(!body)return;
  translateTree(body);
  cleanBrandTree(body);
  const mo=new MutationObserver(ms=>{
    for(const m of ms){
      for(const n of m.addedNodes){
        if(n.nodeType===1||n.nodeType===3){
          translateTree(n);
          cleanBrandTree(n);
          cleanAppUI();
          forceAppHeader();
        }
      }
    }
  });
  mo.observe(body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootLanguage,{once:true});
else bootLanguage();
})();
