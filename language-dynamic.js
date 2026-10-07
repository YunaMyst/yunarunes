(()=>{'use strict';
const K='yunarunes-language';
try{const q=new URLSearchParams(location.search).get('lang');if(q==='en'||q==='pt')localStorage.setItem(K,q)}catch(_){}
const PT={'Pesquisa monstros, filtra por elemento e estrelas e abre a ficha individual para ver mais informações.':'Search monsters, filter by element and stars, and open the individual page for more information.','Pesquisa e consulta a base de monstros.':'Search and browse the monster database.','Pesquisa um monstro para começar.':'Search for a monster to get started.','Pesquisa um monstro e o YunaRunes monta várias opções de equipes respeitando o limite de cada conteúdo.':'Search for a monster and YunaRunes creates several team options respecting the limit for each content.','Escolhe um monstro e o YunaRunes mostra companheiros dentro do limite desse conteúdo.':'Choose a monster and YunaRunes shows companions within the limit for that content.','Arena: máximo 4 mobs por equipe (Ataque ou Defesa).':'Arena: maximum 4 mobs per team (Attack or Defense).','Siege: máximo 3 mobs por equipe (Ataque ou Defesa).':'Siege: maximum 3 mobs per team (Attack or Defense).','WGB: máximo 3 mobs por equipe (Ataque ou Defesa).':'WGB: maximum 3 mobs per team (Attack or Defense).','Escolhe qualquer monstro, elemento e evolução disponível na base. Cada variante usa a fotografia correspondente.':'Choose any monster, element, and evolution available in the database. Each variant uses the corresponding image.','Set principal':'Main set','Build de Runas':'Rune Build','Slots 1–6':'Slots 1–6','Resumo da build':'Build summary','Não guardada':'Not saved','Guardada neste dispositivo':'Saved on this device','Build guardada automaticamente.':'Build saved automatically.','Build limpa.':'Build cleared.','Escolher main stat':'Choose main stat','Substats (ex.: SPD, HP%)':'Substats (e.g.: SPD, HP%)','Carregando todos os monstros...':'Loading all monsters...','variantes carregadas':'variants loaded','Elementos:':'Elements:','Estrelas:':'Stars:','O YunaRunes procura combinações reais do inventário, respeitando slots, conjuntos, main stats e requisitos mínimos.':'YunaRunes searches real inventory combinations while respecting slots, sets, main stats, and minimum requirements.','Normal — equilibrado':'Normal — balanced','SPD — velocidade':'SPD — speed','DMG — dano':'DMG — damage','EHP — sobrevivência':'EHP — survival','Stats mínimas':'Minimum stats','Encontrar melhores builds':'Find best builds','Usar inventário de demonstração':'Use demo inventory','Importar o seu inventário JSON':'Import your JSON inventory','Carregando inventário...':'Loading inventory...','Não existem runas suficientes para os filtros escolhidos.':'There are not enough runes for the selected filters.','Nenhuma combinação encontrada. Experimenta baixar os mínimos ou deixar algum set/main stat em “Qualquer”.':'No combination found. Try lowering the minimums or leaving a set/main stat as “Any”.','combinações válidas. A mostrar as 15 melhores.':'valid combinations. Showing the 15 best.','Inventário personalizado ativo:':'Custom inventory active:','Inventário de demonstração ativo:':'Demo inventory active:','Inventário importado. Agora podes otimizar.':'Inventory imported. You can optimize now.','JSON inválido. Usa um arquivo de inventário de runas em formato de lista.':'Invalid JSON. Use a rune inventory file in list format.','Inventário de demonstração restaurado.':'Demo inventory restored.','Usar esta build no Runas':'Use this build in Runas','← Voltar à Base de Monstros':'← Back to Monster Database','Utilização por conteúdo':'Usage by content','X = utilização confirmada na base YunaRunes. — = sem dado confirmado.':'X = confirmed usage in the YunaRunes database. — = no confirmed data.','Equipe sugerida automaticamente a partir dos mobs disponíveis e dos conteúdos em comum.':'Team suggested automatically from available monsters and shared content.','Monstro pesquisado':'Searched monster','Ainda não existem sugestões suficientes na base.':'There are not enough suggestions in the database yet.','Estado':'Status','Jogável':'Playable','Normal / Despertado':'Normal / Awakened','Perfil individual YunaRunes':'YunaRunes individual profile','As skills detalhadas deste monstro ainda não estão na base verificada. Não vou inventar descrições.':'Detailed skills for this monster are not yet in the verified database. I will not invent descriptions.','Materiais específicos de despertar ainda não foram adicionados para este monstro.':'Specific awakening materials have not yet been added for this monster.','O despertar pode alterar aparência, nome ou habilidades dependendo do monstro.':'Awakening can change appearance, name, or skills depending on the monster.','Os stats só são mostrados como valores quando data existirem na base YunaRunes.':'Stats are only shown as values when data exists in the YunaRunes database.','Fogo':'Fire','Água':'Water','Vento':'Wind','Luz':'Light','Trevas':'Dark','Ataque':'Attack','Defesa':'Defense','Suporte':'Support','Função geral':'General role','Monstro não especificado':'Monster not specified','Monstro não encontrado':'Monster not found','Nenhuma combinação encontrada.':'No combination found.','A mostrar as 15 melhores.':'Showing the 15 best.','Pesquisar um monstro...':'Search for a monster...','Pesquisar nome, família ou elemento...':'Search name, family or element...','Ex.: Galleon, Camilla, Leo...':'E.g.: Galleon, Camilla, Leo...','Todos os elementos':'All elements','Todas as estrelas naturais':'All natural stars','Normais':'Normal','Segundo Despertar':'Second Awakening','Não afiliado à Com2uS.':'Not affiliated with Com2uS.'};
const EN_TO_PT=Object.fromEntries(Object.entries(PT).map(([a,b])=>[b,a]));
const isEN=()=>{try{return localStorage.getItem(K)==='en'}catch(_){return false}};
const EXTRA_PT={'Início':'Home','Acesso rápido':'Quick access','Escolhe a categoria de monstros':'Choose a monster category','Nat 2':'Nat 2','Nat 3':'Nat 3','Nat 4':'Nat 4','Nat 5':'Nat 5','Monstros de 2 estrelas':'2-star monsters','Monstros de 3 estrelas':'3-star monsters','Monstros de 4 estrelas':'4-star monsters','Monstros de 5 estrelas':'5-star monsters','Ver monstros →':'View monsters →','Abrir →':'Open →','Nat 5 em destaque':'Featured Nat 5','Abrir Nat 5 →':'Open Nat 5 →','O seu hub de':'Your hub for','mobs, runas':'mobs, runes','e equipes.':'and teams.','pesquisa um monstro, monta uma equipe, cria builds, otimiza o seu inventário e salva os seus mobs favoritos. Tudo num só lugar, preparado para PC e telefone.':'search a monster, build a team, create builds, optimize your inventory, and save your favorite mobs. Everything in one place, ready for PC and mobile.','Pesquisar um mob...':'Search for a monster...','Pesquisar':'Search','Carregando a base de monstros...':'Loading monster database...','monstros disponíveis':'monsters available','A base de monstros não pôde ser carregada.':'The monster database could not be loaded.','Projeto independente da comunidade Summoners War':'Independent Summoners War community project','Não afiliado à Com2uS.':'Not affiliated with Com2uS.','Acesso rápido':'Quick access','Códigos':'Codes','Runas':'Runes','Análise de Conta':'Account Analysis','Guild/Siege':'Guild/Siege','Base de Monstros':'Monster Database','Menu':'Menu','Pesquisar':'Search','Fechar':'Close','Salvar':'Save','Guardar':'Save','Cancelar':'Cancel','Confirmar':'Confirm','Voltar':'Back','Próximo':'Next','Anterior':'Previous','Carregar':'Load','Editar':'Edit','Remover':'Remove','Adicionar':'Add','Limpar':'Clear','Filtrar':'Filter','Todos':'All','Qualquer':'Any','Elemento':'Element','Estrelas':'Stars','Nome':'Name','Descrição':'Description','Detalhes':'Details','Equipe':'Team','Equipa':'Team','Monstro':'Monster','Monstros':'Monsters','Habilidades':'Skills','Status':'Status','Ataque':'Attack','Defesa':'Defense','Suporte':'Support','Velocidade':'Speed','Dano':'Damage','Sobrevivência':'Survival','Resultados':'Results','Opções':'Options','Configurações':'Settings','Idioma':'Language','Atualizar':'Refresh','Download':'Download','Carregando...':'Loading...','Nenhum resultado':'No results','Nenhum monstro encontrado':'No monster found','Copiar':'Copy','Link':'Link','Ativo':'Active','Inativo':'Inactive'};
const EXTRA_EN=Object.fromEntries(Object.entries(EXTRA_PT).map(([a,b])=>[b,a]));
const INDEX_PT_EN={
'YunaRunes • Summoners War':'YunaRunes • Summoners War','O seu hub de mobs, runas e equipes.':'Your hub for mobs, runes and teams.','pesquisa um monstro, monta uma equipe, cria builds, otimiza o seu inventário e salva os seus mobs favoritos. Tudo num só lugar, preparado para PC e telefone.':'search a monster, build a team, create builds, optimize your inventory, and save your favorite mobs. Everything in one place, ready for PC and mobile.','Pesquisar um mob...':'Search for a monster...','Carregando a base de monstros...':'Loading monster database...','Acesso rápido':'Quick access','Escolhe a categoria de monstros':'Choose a monster category','Monstros de 2 estrelas':'2-star monsters','Monstros de 3 estrelas':'3-star monsters','Monstros de 4 estrelas':'4-star monsters','Monstros de 5 estrelas':'5-star monsters','Ver monstros →':'View monsters →','Abrir →':'Open →','Nat 5 em destaque':'Featured Nat 5','Abrir Nat 5 →':'Open Nat 5 →','monstros disponíveis':'monsters available','A base de monstros não pôde ser carregada.':'The monster database could not be loaded.','Projeto independente da comunidade Summoners War':'Independent Summoners War community project','Não afiliado à Com2uS.':'Not affiliated with Com2uS.'};
const INDEX_EN_PT=Object.fromEntries(Object.entries(INDEX_PT_EN).map(([a,b])=>[b,a]));
const SITE_STRINGS_PT_EN={
'YunaRunes — Ferramentas':'YunaRunes — Tools','YunaRunes — Base de Monstros':'YunaRunes — Monster Database','YunaRunes — Database':'YunaRunes — Database','YunaRunes — Runas':'YunaRunes — Runes','YunaRunes — Calculadora de Runas':'YunaRunes — Rune Calculator','YunaRunes — Meus Mobs':'YunaRunes — My Monsters','YunaRunes — Nat 5':'YunaRunes — Nat 5','YunaRunes — Comparar Mobs':'YunaRunes — Compare Monsters','YunaRunes — Decks':'YunaRunes — Decks','YunaRunes — Account Analyzer':'YunaRunes — Account Analyzer','YunaRunes — Artifact Optimizer':'YunaRunes — Artifact Optimizer','YunaRunes — Rune Optimizer':'YunaRunes — Rune Optimizer','YunaRunes - Guild Tools':'YunaRunes - Guild Tools',
'Menu':'Menu','🎓 Yuna Academy':'🎓 Yuna Academy','🏠 Início':'🏠 Home','👹 Database':'👹 Database','⚔️ Team Builder':'⚔️ Team Builder','🧿 Runas':'🧿 Runes','⚙️ Optimizer':'⚙️ Optimizer','💠 Artifacts':'💠 Artifacts','🃏 Decks':'🃏 Decks','📊 Análise de Conta':'📊 Account Analysis','⚔️ Guild/Siege':'⚔️ Guild/Siege',
'Monstros':'Monsters','Pesquisar monstros':'Search monsters','Pesquisa':'Search','A base de monstros':'Monster database','Carregando a base':'Loading database','Carregando':'Loading','A carregar':'Loading','A carregar perfil do monstro...':'Loading monster profile...','Voltar à':'Back to','ficha do monstro':'monster profile','informações do mob':'monster information',
'Modo Normal':'Normal Mode','Dano':'Damage','Sobrevivência':'Survival','Qualquer':'Any','Qualquer elemento':'Any element','Qualquer estrela':'Any star','Set de 4':'4-piece set','Set de 2':'2-piece set','Slots':'Slots','Main stat':'Main stat','Slot':'Slot','Encontrar melhores builds':'Find best builds',
'Exemplo:':'Example:','exige pelo menos':'requires at least','os outros':'the other','ficam livres':'remain free','Resultados':'Results','A mostrar':'Showing','inventário':'inventory','demonstração':'demo','personalizado':'custom','importado':'imported',
'Builds públicas':'Public builds','Matchup Planner':'Matchup Planner','Defesa':'Defense','Meu ataque':'My attack','Ataque':'Attack','Guardar':'Save','Atualizar':'Refresh',
'Estado':'Status','Não guardada':'Not saved','Guardada':'Saved','Não encontrado':'Not found','Nenhum':'None','Nenhuma':'None','Nenhuma combinação':'No combination','Não existem':'There are no','suficientes':'enough','filtros escolhidos':'selected filters',
'Como usar':'How to use','Os dados são guardados no navegador.':'Data is stored in the browser.','Abrir':'Open','Ver':'View','Fechar':'Close','Limpar':'Clear','Cancelar':'Cancel','Confirmar':'Confirm','Apagar todos':'Delete all','Exportar':'Export','Importar':'Import',
'Fogo':'Fire','Água':'Water','Vento':'Wind','Luz':'Light','Trevas':'Dark','Qualidade':'Quality','Nome do deck':'Deck name','Conteúdo':'Content','Arena':'Arena','Siege':'Siege','WGB':'WGB','PvE':'PvE','Mobs':'Monsters','Notas':'Notes'
};
const SITE_STRINGS_EN_PT=Object.fromEntries(Object.entries(SITE_STRINGS_PT_EN).map(([a,b])=>[b,a]));
const SITE_PT_EN={
'YunaRunes — Códigos':'YunaRunes — Codes','🎁 Códigos ativos':'🎁 Active Codes','Códigos atuais de Summoners War.':'Current Summoners War codes.','Copia o código ou abre o link de resgate para iOS.':'Copy the code or open the redemption link for iOS.','Verificados':'Verified','Estes códigos foram retirados do anúncio oficial de Summoners War do SWC2026 — China Qualifier.':'These codes were taken from the official Summoners War SWC2026 — China Qualifier announcement.','Estão listados com o período oficial de validade.':'They are listed with their official validity period.','Atualiza os códigos quando novos cupons forem confirmados.':'Codes are updated when new coupons are confirmed.',
'Comparar Mobs':'Compare Monsters','Compara dados da base lado a lado.':'Compare database data side by side.','O YunaRunes não transforma a comparação num ranking.':'YunaRunes does not turn the comparison into a ranking.',
'Analisa a tua conta a partir de monstros e inventário.':'Analyze your account from monsters and inventory.','Sem servidor: os dados ficam no teu navegador.':'No server: your data stays in your browser.','Usar análise de demonstração':'Use demo analysis','Importar conta JSON':'Import account JSON','Exportar análise':'Export analysis','A analisar dados de demonstração.':'Analyzing demo data.','Qualidade da conta':'Account quality',
'Ordena artefactos por adequação ao monstro, tipo de dano e qualidade das linhas.':'Sort artifacts by monster fit, damage type, and line quality.','A usar artefactos de demonstração.':'Using demo artifacts.','Importar artefactos JSON':'Import artifacts JSON','Melhores artefactos':'Best artifacts',
'Guarda as tuas equipas por conteúdo, adiciona notas e exporta/importa os decks.':'Save your teams by content, add notes, and export/import decks.','Nome do deck':'Deck name','Conteúdo':'Content','Notas':'Notes','Guardar deck':'Save deck','Exportar JSON':'Export JSON','Importar decks JSON':'Import decks JSON','Apagar todos':'Delete all','Os meus decks':'My decks',
'Guarda os teus monstros favoritos neste dispositivo para aceder rapidamente às fichas.':'Save your favorite monsters on this device for quick access to their profiles.',
'Planeia defesas e matchups de Siege e WGB.':'Plan Siege and WGB defenses and matchups.','Modo':'Mode','Defesa adversária':'Enemy defense','Meu ataque':'My attack','Guardar':'Save','Defesas rápidas':'Quick defenses','Atualizar':'Refresh','Builds públicas':'Public builds',
'Encontra rapidamente os monstros Nat 5 e abre a ficha para ver builds, conteúdo e combinações.':'Quickly find Nat 5 monsters and open their profiles to see builds, content, and combinations.','Com que mobs usar?':'What monsters should I use with it?','Abre qualquer Nat 5 acima para veres na ficha do monstro quais os mobs recomendados para usar com ele, além de builds, conteúdo e informações do mob.':'Open any Nat 5 above to see recommended teammates, builds, content, and monster information.','Nenhum Nat 5 encontrado.':'No Nat 5 found.',
'Pesquisa monstros, filtra por elemento e estrelas e abre a ficha individual para ver mais informações.':'Search monsters, filter by element and stars, and open the individual profile for more information.','Todos os elementos':'All elements','Todas as estrelas naturais':'All natural stars','Todos':'All','Normais':'Normal','Segundo Despertar':'Second Awakening','Carregando a base...':'Loading database...',
'Escolhe qualquer monstro, elemento e evolução disponível na base.':'Choose any monster, element, and evolution available in the database.','Cada variante usa a fotografia correspondente.':'Each variant uses the corresponding image.','Carregando todos os monstros...':'Loading all monsters...','Salvar build':'Save build','Limpar':'Clear','Resumo da build':'Build summary','Não guardada':'Not saved','Guardada neste dispositivo':'Saved on this device',
'Monta uma build manual, soma os substats e compara o resultado com metas gerais para a função do monstro.':'Build a manual build, add substats, and compare the result with general targets for the monster role.','Calculadora de Runas':'Rune Calculator','Calcular':'Calculate','Salvar no dispositivo':'Save to device','Coloca os valores dos substats exatamente como aparecem nas suas runas.':'Enter substat values exactly as they appear on your runes.','A calculadora não inventa stats nem assume uma build oficial.':'The calculator does not invent stats or assume an official build.','Resultado':'Result','Monta uma build manual, soma os substats e compara o resultado com metas gerais para a função do monstro.':'Build a manual build, add substats, and compare the result with general targets for the monster role.','Slots 1–6':'Slots 1–6','Monstro':'Monster','Modo':'Mode','Normal':'Normal','SPD':'SPD','Dano':'Damage','Sobrevivência':'Survival','Set principal':'Main set','Pontuação da build':'Build score','Metas gerais ainda abaixo:':'General targets still below:','A build atingiu as metas gerais selecionadas.':'The build reached the selected general targets.','Build guardada neste dispositivo.':'Build saved on this device.' ,
'Pesquisa um monstro e o YunaRunes monta várias opções de equipes respeitando o limite de cada conteúdo.':'Search for a monster and YunaRunes creates several team options respecting each content limit.','Criar equipes':'Build teams','Carregando monstros...':'Loading monsters...','Pesquisar um mob e ver com quem combina':'Search for a monster and see who it works with','Escolhe um monstro e o YunaRunes mostra companheiros dentro do limite desse conteúdo.':'Choose a monster and YunaRunes shows teammates within that content limit.','Ver com quem combina':'See teammates','Pesquisa um monstro para começar.':'Search for a monster to get started.',
'Ferramentas YunaRunes':'YunaRunes Tools','Ferramentas avançadas para builds, artefactos, decks, contas e Siege/Guild.':'Advanced tools for builds, artifacts, decks, accounts, and Guild/Siege.','Analisa e ordena artefactos por eficiência, tipo de dano, skill e função do monstro.':'Analyze and sort artifacts by efficiency, damage type, skill, and monster role.','Guarda equipes para Arena, Siege, WGB, PvE e RTA com notas e exportação.':'Save teams for Arena, Siege, WGB, PvE, and RTA with notes and export.','Analisa monstros, runas, artefactos, evolução da conta e qualidade do inventário.':'Analyze monsters, runes, artifacts, account progression, and inventory quality.','Planeia defs, matchups, equipes de Siege, histórico de ataques e uso da base pública.':'Plan defenses, matchups, Siege teams, attack history, and public database usage.','Soma stats das suas runas e verifica metas gerais da build.':'Add up your rune stats and check general build targets.','Compara até três mobs lado a lado com os dados da base.':'Compare up to three monsters side by side using database data.','Guarda os seus mobs favoritos neste dispositivo.':'Save your favorite monsters on this device.','Como usar':'How to use','Os dados são guardados no navegador.':'Data is stored in the browser.','Podes usar dados de demonstração ou importar JSON e exportar o seu trabalho para outro dispositivo.':'You can use demo data or import JSON and export your work to another device.',
'Monstros':'Monsters','Mobs':'Monsters','Runas':'Runes','Artefactos':'Artifacts','Artefatos':'Artifacts','Equipa':'Team','Equipe':'Team','Conta':'Account','Códigos':'Codes','Início':'Home','Base de Monstros':'Monster Database','Criador de Equipes':'Team Builder','Otimizador':'Optimizer','Análise de Conta':'Account Analysis','Guilda':'Guild','Pesquisa':'Search','Pesquisar':'Search','Carregando...':'Loading...','A carregar...':'Loading...','Voltar':'Back','Abrir':'Open','Guardar':'Save','Salvar':'Save','Apagar':'Delete','Importar':'Import','Exportar':'Export','Nenhum resultado':'No results','Nenhum monstro encontrado':'No monster found'
};
const SITE_EN_PT=Object.fromEntries(Object.entries(SITE_PT_EN).map(([a,b])=>[b,a]));
const UI_PT_EN={'Carregar mais':'Load more','Mostrar mais':'Show more','Mostrar menos':'Show less','Escolhe':'Choose','Escolha':'Choose','Seleciona':'Select','Selecione':'Select','Selecionar':'Select','Escolher':'Choose','Escolher monstro':'Choose monster','Escolher equipa':'Choose team','Escolher equipe':'Choose team','Criar':'Create','Criar equipe':'Build team','Criar equipa':'Build team','Guardar alterações':'Save changes','Alterações guardadas':'Changes saved','Guardado':'Saved','Guardada':'Saved','Salvo':'Saved','Salva':'Saved','Eliminar':'Delete','Remover':'Remove','Adicionar':'Add','Pesquisar monstro':'Search monster','Pesquisar mob':'Search monster','Procurar':'Search','Fechar':'Close','Abrir':'Open','Voltar':'Back','Seguinte':'Next','Anterior':'Previous','Aplicar':'Apply','Repor':'Reset','Atualizar':'Refresh','Carregar':'Load','Carregamento':'Loading','Carregando':'Loading','A carregar':'Loading','Concluído':'Completed','Concluída':'Completed','Erro':'Error','Sucesso':'Success','Aviso':'Warning','Informação':'Information','Sim':'Yes','Não':'No','Nenhum':'None','Nenhuma':'None','Todos':'All','Todas':'All','Qualquer':'Any','Elemento':'Element','Estrelas':'Stars','Nome':'Name','Tipo':'Type','Nível':'Level','Nivel':'Level','Evolução':'Evolution','Despertar':'Awakening','Segundo Despertar':'Second Awakening','Habilidades':'Skills','Skill':'Skill','Stats':'Stats','Estatísticas':'Stats','Função':'Role','Funções':'Roles','Dano':'Damage','Defesa':'Defense','Suporte':'Support','Velocidade':'Speed','Vida':'HP','Resistência':'Resistance','Precisão':'Accuracy','Taxa crítica':'Critical Rate','Dano crítico':'Critical Damage','Inventário':'Inventory','Inventário de runas':'Rune inventory','Runa':'Rune','Runas':'Runes','Artefacto':'Artifact','Artefactos':'Artifacts','Artefato':'Artifact','Artefatos':'Artifacts','Equipa':'Team','Equipe':'Team','Equipes':'Teams','Equipas':'Teams','Conteúdo':'Content','Conteúdos':'Content','Filtros':'Filters','Filtro':'Filter','Opções':'Options','Resultados':'Results','Detalhes':'Details','Resumo':'Summary','Descrição':'Description','Informações':'Information','Informação do monstro':'Monster information','Perfil':'Profile','Base':'Database','Base de monstros':'Monster database','Monstros encontrados':'Monsters found','monstros disponíveis':'monsters available','favoritos':'favorites','favorito':'favorite','favoritos neste dispositivo':'favorites on this device','por conteúdo':'by content','por elemento':'by element','por estrelas':'by stars','mínimo':'minimum','máximo':'maximum','mínimas':'minimum','máximas':'maximum','demonstração':'demo','personalizado':'custom','importado':'imported','públicas':'public','pública':'public','privadas':'private','rápido':'quick','rápida':'quick','avançadas':'advanced','avançado':'advanced','completo':'complete','completa':'complete','disponível':'available','disponíveis':'available','guardado':'saved','guardada':'saved','neste dispositivo':'on this device','do dispositivo':'on this device','para começar':'to get started','para continuar':'to continue','com o monstro':'with the monster','com este monstro':'with this monster','sem dados':'no data','sem resultado':'no result','sem resultados':'no results','não encontrado':'not found','não encontrada':'not found','não existem':'there are no','existem':'there are','suficientes':'enough','escolhidos':'selected','escolhidas':'selected','selecionado':'selected','selecionada':'selected','selecionados':'selected','selecionadas':'selected'};
const UI_EN_PT=Object.fromEntries(Object.entries(UI_PT_EN).map(([a,b])=>[b,a]));
const INDEX_FRAG_PT_EN={'O seu hub de ':'Your hub for ','mobs, runas':'mobs, runes',' e equipes.':' and teams.','pesquisa um monstro, monta uma equipe, cria builds, otimiza o seu inventário e salva os seus mobs favoritos. Tudo num só lugar, preparado para PC e telefone.':'search a monster, build a team, create builds, optimize your inventory, and save your favorite monsters. Everything in one place, ready for PC and mobile.','ACESSO RÁPIDO':'QUICK ACCESS'};
const INDEX_FRAG_EN_PT=Object.fromEntries(Object.entries(INDEX_FRAG_PT_EN).map(([a,b])=>[b,a]));
function escRe(s){return String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
function applyMap(text,map){
 let out=String(text);
 for(const k of Object.keys(map).sort((a,b)=>b.length-a.length)){
  if(!k)continue;
  const re=new RegExp('(?<![\\p{L}\\p{N}])'+escRe(k)+'(?![\\p{L}\\p{N}])','gu');
  out=out.replace(re,map[k]);
 }
 return out;
}
function t(s){
 if(!s)return s;
 s=String(s);
 const guildToken='__YUNA_GUILD_SIEGE__',resultsToken='__YUNA_RESULTS__';
 s=s.replace(/Guilda\/Siege/gi,guildToken).replace(/Resultados/gi,resultsToken);
 s=s.replace(/Otimzarr|Otimzar|Otimz\\w*/gi,isEN()?'Optimize':'Otimizar');
 const map=isEN()?PT:EN_TO_PT;
 const extra=isEN()?EXTRA_PT:EXTRA_EN;
 const direct=isEN()?INDEX_PT_EN:INDEX_EN_PT;
 let out=s.replace(/(?:Build de\\s+)+Runas/gi,'Build de Runas');
 out=applyMap(out,direct);
 out=applyMap(out,isEN()?INDEX_FRAG_PT_EN:INDEX_FRAG_EN_PT);
 out=applyMap(out,isEN()?SITE_PT_EN:SITE_EN_PT);
 out=applyMap(out,isEN()?UI_PT_EN:UI_EN_PT);
 out=applyMap(out,isEN()?SITE_STRINGS_PT_EN:SITE_STRINGS_EN_PT);
 const brand='YunaRunes',token='__YUNARUNES_BRAND__';
 out=out.replace(/Yuna(?:Runes?|Build\\s+de\\s+Runas?|Rune\\s+Builders?)/gi,token);
 for(const k of Object.keys(map).sort((a,b)=>b.length-a.length)){
  if(out.includes(k))out=out.split(k).join(map[k]);
 }
 out=applyMap(out,extra);
 out=out.replaceAll(token,brand).replaceAll(guildToken,'Guild/Siege').replaceAll(resultsToken,isEN()?'Results':'Resultados');
 return out;
}
function fixGuildSiegeNav(){document.querySelectorAll('header.top a[href*="guild-tools"]').forEach(a=>{a.textContent='⚔️ Guild/Siege';a.setAttribute('aria-label','Guild/Siege')})}
function ensureHeaderControls(){let h=document.querySelector('header.top');if(!h){h=document.createElement('header');h.className='top';if(document.body.firstChild)document.body.insertBefore(h,document.body.firstChild);else document.body.appendChild(h);}let nav=h.querySelector(':scope>.nav');if(!nav){nav=document.createElement('div');nav.className='nav';h.replaceChildren(nav)}const langKey=isEN()?'en':'pt';nav.dataset.yunaHeaderReady=langKey;const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();const main=isEN()?[['index.html','🏠 Home'],['database.html','👹 Monster Database'],['team-builder.html','⚔️ Team Builder'],['runes.html','🧿 Runes'],['optimizer.html','⚙️ Optimizer']]:[['index.html','🏠 Início'],['database.html','👹 Base de Monstros'],['team-builder.html','⚔️ Criador de Equipes'],['runes.html','🧿 Runas'],['optimizer.html','⚙️ Otimizador']];const advanced=isEN()?[['artifact-optimizer.html','💠 Artifacts'],['decks.html','🃏 Decks'],['account-analyzer.html','📊 Account Analysis'],['guild-tools.html','⚔️ Guild/Siege']]:[['artifact-optimizer.html','💠 Artefatos'],['decks.html','🃏 Decks'],['account-analyzer.html','📊 Análise de Conta'],['guild-tools.html','⚔️ Guild/Siege']];const link=(p,label)=>'<a href="./'+p+'"'+(file===p?' class="active"':'')+'>'+label+'</a>';nav.className='nav';nav.innerHTML='<div class="yuna-left"><a class="brand" href="./index.html" aria-label="YunaRunes"><span>YunaRunes</span></a></div><div class="yuna-controls"><a class="lang-btn" data-lang="pt" href="./'+file+'?lang=pt" aria-label="Português">🇧🇷 PT/BR</a><a class="lang-btn" data-lang="en" href="./'+file+'?lang=en" aria-label="English">🇬🇧 ENG</a><a class="apk-link" href="https://yunarunes.com/downloads/yunarunes.apk" download="yunarunes.apk" title="Download APK">📱 APK</a><div class="yuna-donate-wrap"><a class="donate-link" href="https://www.paypal.com/myaccount/summary" target="_blank" rel="noopener noreferrer" title="'+(isEN()?'Support YunaRunes via PayPal':'Apoiar YunaRunes via PayPal')+'">💰 '+(isEN()?'Donate':'Donate')+'</a></div></div><label class="menu-btn" for="navToggle">☰ Menu</label><input class="nav-toggle" id="navToggle" type="checkbox"><div class="nav-links"><div class="nav-main">'+main.map(x=>link(x[0],x[1])).join('')+'</div><div class="nav-advanced-row">'+advanced.map(x=>link(x[0],x[1])).join('')+'</div></div>';nav.querySelectorAll('[data-lang]').forEach(b=>{
  b.classList.toggle('active',b.dataset.lang===(isEN()?'en':'pt'));
});if(!document.getElementById('yunaHeaderFix')){const s=document.createElement('style');s.id='yunaHeaderFix';s.textContent=`header.top{position:sticky!important;top:0!important;z-index:99999!important;background:#0b1015!important;border-bottom:1px solid #293746!important;box-shadow:0 2px 12px rgba(0,0,0,.3)!important}header.top>.nav{max-width:1280px!important;margin:0 auto!important;min-height:0!important;padding:7px 12px!important;display:grid!important;grid-template-columns:auto minmax(0,1fr) auto!important;grid-template-areas:"left main controls" "left advanced advanced"!important;align-items:center!important;gap:2px 14px!important;overflow:visible!important;position:relative!important}header.top .yuna-left{grid-area:left!important;display:flex!important;align-items:center!important;min-width:190px!important}header.top .brand{display:flex!important;align-items:center!important;gap:7px!important;color:#fff!important;text-decoration:none!important;font-weight:900!important;font-size:25px!important;white-space:nowrap!important;margin:0!important;padding:0!important}header.top .brand img{display:none!important}header.top .yuna-controls{grid-area:controls!important;display:flex!important;visibility:visible!important;opacity:1!important;position:static!important;z-index:100000!important;align-items:center!important;justify-content:flex-end!important;gap:6px!important;white-space:nowrap!important;min-width:max-content!important;flex-shrink:0!important}header.top .yuna-controls{grid-area:unset!important;pointer-events:auto!important}header.top .yuna-controls button[data-lang]{pointer-events:auto!important;position:relative!important;z-index:100001!important}header.top .yuna-donate-wrap{display:flex!important;align-items:center!important;justify-content:flex-end!important;flex:0 0 auto!important;visibility:visible!important;opacity:1!important}header.top .donate-link{background:#202a34!important;color:#dce6ee!important;border:1px solid #293746!important;font-size:13px!important;padding:0 12px!important;height:40px!important;border-radius:8px!important;font-weight:900!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;text-decoration:none!important;white-space:nowrap!important;box-sizing:border-box!important}header.top .donate-link:hover{background:#172330!important;color:#5fc7f5!important;border-color:#5fc7f5!important}header.top .yuna-controls button,header.top .yuna-controls a{height:40px!important;border:1px solid #293746!important;border-radius:8px!important;padding:0 14px!important;font-size:14px!important;font-weight:900!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;text-decoration:none!important;cursor:pointer!important;box-sizing:border-box!important}header.top .yuna-controls button{background:#202a34!important;color:#fff!important}header.top .yuna-controls .lang-btn.active,header.top .yuna-controls .apk-link{background:#35a9e1!important;color:#061018!important}header.top .nav-links{grid-area:main!important;display:contents!important;min-width:0!important}header.top .nav-main{grid-area:main!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:2px!important;min-width:0!important}header.top .nav-advanced-row{grid-area:advanced!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:2px!important;min-width:0!important}header.top .nav-links a{color:#dce6ee!important;text-decoration:none!important;font-size:14px!important;font-weight:800!important;padding:8px 9px!important;border-radius:7px!important;white-space:nowrap!important;display:inline-flex!important;align-items:center!important;justify-content:center!important}header.top .nav-links a:hover,header.top .nav-links a.active{background:#172330!important;color:#5fc7f5!important}header.top .nav-links a[href="./academy.html"]{background:#1b2a38!important;color:#67cfff!important;border:1px solid #31546b!important}header.top .nav-links a[href="./academy.html"]:hover,header.top .nav-links a[href="./academy.html"].active{background:#24384a!important;color:#8bdcff!important}header.top .nav-advanced-row a{color:#b99cff!important;font-size:13px!important;padding:6px 9px!important};header.top .nav-advanced-row a:last-child{min-width:0!important;max-width:180px!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}header.top .menu-btn,header.top .nav-toggle{display:none!important}@media(min-width:601px){header.top .nav-links{display:contents!important}header.top .yuna-controls{display:flex!important;visibility:visible!important;opacity:1!important;min-width:max-content!important;flex-shrink:0!important}header.top .yuna-controls button,header.top .yuna-controls .donate-link{display:inline-flex!important;visibility:visible!important;opacity:1!important}header.top .yuna-controls .apk-link{display:none!important}}
html.yunarunes-app header.top .yuna-controls .apk-link{display:none!important}@media(max-width:600px){header.top .yuna-controls .apk-link{display:inline-flex!important}}@media(max-width:1050px) and (min-width:601px){header.top>.nav{gap:2px 8px!important;padding:7px 7px!important;padding-right:300px!important}header.top .yuna-left{min-width:170px!important}header.top .brand{font-size:20px!important}header.top .brand img{width:30px!important;height:30px!important}header.top .yuna-controls button,header.top .yuna-controls a{height:38px!important;padding:0 10px!important;font-size:12px!important}header.top .nav-links a{font-size:12px!important;padding:7px 7px!important}header.top .nav-advanced-row a{font-size:11px!important;padding:5px 7px!important}}@media(max-width:600px){header.top>.nav{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;grid-template-areas:"left menu" "controls controls" "links links"!important;padding:9px 8px 7px!important;gap:7px!important}header.top .yuna-left{grid-area:left!important;min-width:0!important;width:100%!important;display:grid!important;grid-template-columns:auto minmax(0,1fr)!important;align-items:center!important;gap:7px!important;overflow:hidden!important}header.top .brand{font-size:19px!important;min-width:0!important;flex:none!important}header.top .brand span{white-space:nowrap!important}header.top .yuna-controls{grid-area:controls!important;position:static!important;min-width:0!important;max-width:100%!important;width:100%!important;overflow:visible!important;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;flex-wrap:nowrap!important;justify-content:stretch!important}header.top .yuna-donate-wrap{grid-area:auto!important;display:flex!important;flex:0 0 auto!important}header.top .yuna-controls button,header.top .yuna-controls a{flex:0 1 auto!important;min-width:0!important}header.top .yuna-donate-wrap .donate-link{flex:0 0 auto!important}header.top .brand img{width:34px!important;height:34px!important}header.top .yuna-controls{gap:5px!important}header.top .yuna-controls button,header.top .yuna-controls .apk-link,header.top .yuna-donate-wrap .donate-link{min-width:0!important;width:100%!important;grid-column:auto!important}header.top .yuna-donate-wrap{display:flex!important;align-items:center!important;min-width:0!important;grid-column:auto!important}header.top .yuna-left,header.top .menu-btn{transform:none!important}header.top.yunarunes-app .yuna-controls .apk-link,html.yunarunes-app header.top .yuna-controls .apk-link{display:none!important}header.top .yuna-controls button,header.top .yuna-controls a{height:40px!important;padding:0 12px!important;font-size:13px!important}header.top .yuna-donate-wrap .donate-link{height:40px!important;padding:0 12px!important;font-size:13px!important}header.top .menu-btn{grid-area:menu!important;display:flex!important;align-items:center!important;justify-content:center!important;position:static!important;color:#fff!important;background:#172330!important;border:1px solid #293746!important;border-radius:7px!important;padding:10px 13px!important;font-size:14px!important;font-weight:800!important;cursor:pointer!important;white-space:nowrap!important}header.top .nav-toggle{display:block!important;position:absolute!important;opacity:0!important;width:1px!important;height:1px!important;pointer-events:none!important}header.top .nav-links{grid-area:links!important;display:none!important;width:100%!important;padding:7px 0 3px!important;border-top:1px solid #293746!important}header.top .nav-toggle:checked~.nav-links{display:block!important}header.top .nav-main,header.top .nav-advanced-row{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:5px!important;width:100%!important;margin-bottom:5px!important}header.top .nav-main a,header.top .nav-advanced-row a{width:100%!important;box-sizing:border-box!important}header.top .nav-main{grid-template-columns:repeat(4,minmax(0,1fr))!important}header.top .nav-main a{width:100%!important;grid-column:auto!important}header.top .nav-main a:nth-child(5){grid-column:1 / -1!important}header.top .nav-advanced-row{margin-bottom:0!important}header.top .nav-links a{min-width:0!important;min-height:48px!important;padding:10px 7px!important;font-size:13px!important;line-height:1.2!important;white-space:normal!important;text-align:center!important;overflow-wrap:anywhere!important}header.top .nav-advanced-row a{font-size:12px!important;min-height:48px!important;padding:10px 7px!important}}html.yunarunes-app header.top .menu-btn{transform:translateY(8px)!important}html.yunarunes-app header.top .yuna-controls{transform:translateY(8px)!important;display:grid!important;visibility:visible!important;opacity:1!important}`;document.head.appendChild(s)}}if(!document.getElementById('yunaHeaderLayoutFix')){const s=document.createElement('style');s.id='yunaHeaderLayoutFix';s.textContent=`
@media(min-width:601px){
header.top>.nav{max-width:1400px!important;padding:8px 14px!important;display:grid!important;grid-template-columns:minmax(190px,auto) 1fr!important;grid-template-areas:"left controls" "links links"!important;gap:7px 16px!important;align-items:center!important}
header.top .yuna-left{grid-area:left!important;min-width:190px!important}
header.top .yuna-controls{grid-area:controls!important;position:static!important;display:flex!important;justify-content:flex-end!important;align-items:center!important;gap:6px!important;min-width:0!important;width:100%!important}
header.top .yuna-controls button,header.top .yuna-controls .donate-link{height:40px!important;font-size:13px!important;padding:0 12px!important}
header.top .nav-links{grid-area:links!important;display:block!important;width:100%!important;min-width:0!important}
header.top .nav-main,header.top .nav-advanced-row{display:flex!important;flex-wrap:wrap!important;justify-content:flex-start!important;gap:4px!important;width:100%!important}
header.top .nav-links a{font-size:13px!important;padding:7px 9px!important}
header.top .nav-advanced-row a{font-size:12px!important;padding:6px 9px!important}
}
@media(max-width:1050px) and (min-width:601px){
header.top>.nav{grid-template-columns:150px 1fr!important;gap:6px 10px!important;padding:7px 8px!important}
header.top .yuna-left{min-width:150px!important}
header.top .brand{font-size:20px!important}
header.top .yuna-controls{gap:4px!important}
header.top .yuna-controls button,header.top .yuna-controls .donate-link{padding:0 8px!important;font-size:11px!important}
header.top .nav-links a{font-size:11px!important;padding:6px 7px!important}
}
`;document.head.appendChild(s)}

if(!document.getElementById('yunaHeaderPCFinal')){const s=document.createElement('style');s.id='yunaHeaderPCFinal';s.textContent=`
@media(min-width:601px){
 header.top>.nav{max-width:none!important;width:100%!important;box-sizing:border-box!important;padding:8px 14px!important;display:grid!important;grid-template-columns:1fr!important;grid-template-areas:"left" "links"!important;gap:8px!important;position:relative!important}
 header.top .yuna-left{grid-area:left!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;min-width:0!important;width:auto!important}
 header.top .brand{flex:0 0 auto!important}
 header.top .yuna-controls{grid-area:unset!important;position:absolute!important;right:14px!important;top:8px!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:8px!important;width:auto!important;min-width:max-content!important;margin:0!important;z-index:100000!important}
 header.top .yuna-controls button,header.top .yuna-controls .donate-link{height:40px!important;padding:0 13px!important;font-size:13px!important;white-space:nowrap!important}
 header.top .yuna-controls .apk-link{display:none!important}
 header.top .nav-links{grid-area:links!important;display:block!important;width:100%!important;min-width:0!important}
 header.top .nav-main,header.top .nav-advanced-row{display:flex!important;flex-wrap:wrap!important;justify-content:flex-start!important;gap:4px!important;width:100%!important}
 header.top .nav-links a{font-size:13px!important;padding:7px 9px!important}
}
@media(max-width:1050px) and (min-width:601px){
 header.top .yuna-left{gap:8px!important}
 header.top .brand{font-size:20px!important}
 header.top .yuna-controls{gap:4px!important}
 header.top .yuna-controls button,header.top .yuna-controls .donate-link{height:38px!important;padding:0 8px!important;font-size:11px!important}
 header.top .nav-links a{font-size:11px!important;padding:6px 7px!important}
}
`;document.head.appendChild(s)}
if(!document.getElementById('yunaHeaderAbsoluteFinal')){const s=document.createElement('style');s.id='yunaHeaderAbsoluteFinal';s.textContent='@media(min-width:601px){header.top,header.top>.nav{width:100%!important;max-width:none!important;box-sizing:border-box!important}header.top>.nav{position:relative!important;display:block!important;padding:8px 14px!important;min-height:58px!important}header.top .yuna-left{display:flex!important;align-items:center!important;justify-content:flex-start!important;width:auto!important;position:static!important}header.top .yuna-controls{position:absolute!important;left:auto!important;right:14px!important;top:8px!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:8px!important;width:auto!important;min-width:max-content!important;margin:0!important;z-index:100000!important}header.top .yuna-controls button,header.top .yuna-controls .donate-link{display:inline-flex!important;visibility:visible!important;opacity:1!important;background:#202a34!important;color:#fff!important;border:1px solid #293746!important}header.top .yuna-controls button.active{background:#35a9e1!important;color:#061018!important}header.top .yuna-controls .apk-link{display:none!important}header.top .nav-links{display:block!important;width:100%!important;margin-top:8px!important}header.top .nav-main,header.top .nav-advanced-row{display:flex!important;flex-wrap:wrap!important;justify-content:flex-start!important;gap:4px!important;width:100%!important}}';document.head.appendChild(s)}function translateRoot(root){
  if(!root)return;
  // Explicit PT/EN attributes are the source of truth for page-specific text.
  root.querySelectorAll?.('[data-pt],[data-en]').forEach(e=>{
    const value=isEN()?e.getAttribute('data-en'):e.getAttribute('data-pt');
    if(value!==null && value!==undefined){
      if(e.children.length===0)e.textContent=value;
      else if(e.childElementCount===1 && e.firstChild?.nodeType===3)e.firstChild.nodeValue=value;
      else e.innerHTML=value;
    }
  });
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const a=[];let n;
  while(n=w.nextNode()){
    if(n.parentElement?.closest('.yuna-controls,.yuna-nav,.nav-links,script,style,noscript,[data-pt],[data-en]'))continue;
    if(n.nodeValue.trim())a.push(n);
  }
  for(const x of a){
    const raw=x.nodeValue.trim(),v=t(raw);
    if(v!==raw)x.nodeValue=x.nodeValue.replace(raw,v);
  }
  root.querySelectorAll?.('input,textarea,[placeholder],[title],[aria-label],option').forEach(e=>{
    const attr=isEN()?e.getAttribute('data-en-placeholder'):e.getAttribute('data-pt-placeholder');
    if(attr!==null && attr!==undefined)e.setAttribute('placeholder',attr);
    for(const k of ['placeholder','title','aria-label']){
      if(k==='placeholder' && attr!==null && attr!==undefined)continue;
      if(e.hasAttribute(k)){
        const v=e.getAttribute(k),x=t(v);
        if(x!==v)e.setAttribute(k,x);
      }
    }
    if(e.tagName==='OPTION'){
      const v=e.textContent,x=t(v);
      if(x!==v)e.textContent=x;
    }
  });
}
function fallbackMonsterLoad(){const list=document.getElementById('monsterList');if(!list||list.children.length)return;fetch('./monster-catalog.json?v=20260914-3',{cache:'no-store'}).then(r=>r.ok?r.json():Promise.reject(r.status)).then(d=>{const a=Array.isArray(d)?d:(d.monsters||d.data||[]);const valid=a.filter(m=>m&&m.name&&Number(m.stars)>=2&&Number(m.stars)<=5);if(!valid.length)return;list.innerHTML=valid.map(m=>{const id=encodeURIComponent(m.id||m.name),name=String(m.name).replace(/[&<>]/g,'');const img=String(m.image||'').replace(/"/g,'&quot;');return '<a class="monster" href="monster-view.html?id='+id+'&name='+encodeURIComponent(m.name)+'"><div class="portrait">'+(img?'<img src="'+img+'" alt="'+name+'" loading="lazy">':'<span class="fallback">👾</span>')+'</div><h3>'+name+'</h3><span class="badge">'+(m.element||'')+'</span><span class="badge">'+m.stars+'★</span>'+(m.isSecondAwakening?'<span class="badge">2A</span>':'')+'</a>'}).join('');const s=document.getElementById('status');if(s)s.textContent=valid.length+' '+(isEN()?'unique monsters loaded':'monstros únicos carregados')}).catch(()=>{})}
function dailyHub(){}function styleDaily(){}function forceYunaRunesBrand(){const rx=/Yuna(?:Build\s*de\s*Runas?|Rune\s+Builders?|Runes?)/gi;const fix=v=>String(v??'').replace(rx,'YunaRunes');if(document.title){const x=fix(document.title);if(x!==document.title)document.title=x}document.querySelectorAll('body *').forEach(e=>{if(e.closest('script,style,noscript'))return;if(e.children.length===0&&e.firstChild&&e.firstChild.nodeType===3){const raw=e.firstChild.nodeValue,x=fix(raw);if(x!==raw)e.firstChild.nodeValue=x}for(const a of ['aria-label','title','alt'])if(e.hasAttribute(a)){const v=e.getAttribute(a),x=fix(v);if(x!==v)e.setAttribute(a,x)}})}
function enforceLanguage(){document.documentElement.lang=isEN()?'en':'pt-BR';document.documentElement.setAttribute('data-language',isEN()?'en':'pt-BR');translateRoot(document.body);const h=document.querySelector('header.top');if(h){ensureHeaderControls();fixGuildSiegeNav()}}function boot(){if(navigator.userAgent.includes('YunaRunesApp'))document.documentElement.classList.add('yunarunes-app');document.documentElement.lang=isEN()?'en':'pt-BR';ensureHeaderControls();fixGuildSiegeNav();translateRoot(document.body);if(!document.querySelector('script[src="advanced-tools-lang.js"]')){const s=document.createElement('script');s.src='advanced-tools-lang.js';document.body.appendChild(s)}styleDaily();setTimeout(()=>{forceYunaRunesBrand();fallbackMonsterLoad();dailyHub();enforceLanguage()},900);/* DOM translation observer disabled: it caused a mutation/translation loop that froze the page. */;setInterval(()=>{fixGuildSiegeNav();forceYunaRunesBrand();translateRoot(document.body);if(document.documentElement.classList.contains("yunarunes-app")){const m=document.querySelector("header.top .menu-btn"),l=document.querySelector("header.top .yuna-controls");if(m){m.style.setProperty("position","static","important");m.style.setProperty("top","auto","important");m.style.setProperty("margin-top","28px","important");m.style.setProperty("transform","none","important");m.style.setProperty("z-index","100001","important")}if(l){l.style.setProperty("position","static","important");l.style.setProperty("top","auto","important");l.style.setProperty("margin-top","28px","important");l.style.setProperty("transform","none","important");l.style.setProperty("z-index","100001","important")}}},500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
/* FINAL HEADER BUTTONS V3 */
(function(){function fix(){var n=document.querySelector('header.top>.nav');if(!n)return;var box=n.querySelector('.yuna-controls');if(!box)return;var css=document.getElementById('yunaHeaderButtonsFinal');if(!css){css=document.createElement('style');css.id='yunaHeaderButtonsFinal';document.head.appendChild(css)}css.textContent='@media(min-width:601px){header.top>.nav{display:flex!important;align-items:center!important;position:relative!important;width:100%!important;max-width:none!important;padding:8px 14px!important;min-height:58px!important}header.top .yuna-left{display:flex!important;align-items:center!important;flex:0 0 auto!important}header.top .yuna-controls{display:flex!important;align-items:center!important;gap:8px!important;position:absolute!important;right:14px!important;left:auto!important;top:8px!important;width:auto!important;height:40px!important;z-index:2147483647!important}header.top .yuna-controls button,header.top .yuna-controls .donate-link{display:inline-flex!important;visibility:visible!important;opacity:1!important;position:static!important;float:none!important;height:40px!important;min-width:86px!important;padding:0 13px!important;border-radius:8px!important;border:1px solid #293746!important;background:#202a34!important;color:#fff!important;font:900 13px Arial,sans-serif!important;text-decoration:none!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;box-shadow:none!important;filter:none!important}header.top .yuna-controls button.active{background:#35a9e1!important;color:#061018!important;border-color:#35a9e1!important}header.top .yuna-controls .donate-link{min-width:105px!important}header.top .yuna-controls .apk-link{display:none!important}header.top .nav-links{display:block!important;flex:1 1 auto!important;margin-left:20px!important}.yuna-controls button::before,.yuna-controls button::after,.yuna-controls a::before,.yuna-controls a::after{display:none!important;content:none!important}}';}fix();/* header observer disabled */})();
/* NO RED X HEADER V4 */
(function(){
function cleanHeader(){
 var n=document.querySelector('header.top>.nav'),b=document.querySelector('header.top .yuna-controls');
 if(!n||!b)return;
 var st=document.getElementById('yunaHeaderNoRedX');
 if(!st){st=document.createElement('style');st.id='yunaHeaderNoRedX';document.head.appendChild(st)}
 st.textContent='@media(min-width:601px){header.top>.nav{position:relative!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;width:100%!important;max-width:none!important;box-sizing:border-box!important;padding:8px 14px!important;min-height:58px!important}header.top .yuna-left{position:static!important;display:flex!important;align-items:center!important;flex:0 0 auto!important;margin:0!important}header.top .yuna-controls{position:absolute!important;left:auto!important;right:14px!important;top:8px!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:8px!important;width:auto!important;height:40px!important;margin:0!important;padding:0!important;z-index:2147483647!important;transform:none!important;float:none!important;overflow:visible!important}header.top .yuna-controls button,header.top .yuna-controls .donate-link{position:static!important;display:inline-flex!important;visibility:visible!important;opacity:1!important;float:none!important;box-sizing:border-box!important;width:auto!important;min-width:88px!important;height:40px!important;margin:0!important;padding:0 13px!important;border:1px solid #293746!important;border-radius:8px!important;background:#202a34!important;background-image:none!important;color:#fff!important;font:900 13px Arial,sans-serif!important;text-decoration:none!important;appearance:none!important;-webkit-appearance:none!important;box-shadow:none!important;filter:none!important;mask:none!important;-webkit-mask:none!important;outline:none!important;align-items:center!important;justify-content:center!important;cursor:pointer!important}header.top .yuna-controls button.active{background:#35a9e1!important;color:#061018!important;border-color:#35a9e1!important}header.top .yuna-controls .donate-link{min-width:105px!important}header.top .yuna-controls .apk-link{display:none!important}header.top .yuna-controls button:before,header.top .yuna-controls button:after,header.top .yuna-controls a:before,header.top .yuna-controls a:after{content:none!important;display:none!important;background:none!important;background-image:none!important;border:0!important;box-shadow:none!important}header.top .nav-links{position:static!important;display:block!important;flex:1 1 auto!important;width:auto!important;margin:0 360px 0 20px!important;min-width:0!important}header.top .menu-btn,header.top .nav-toggle{display:none!important}}';
}
cleanHeader();
/* header observer disabled */;
})();

/* PT-BR GLOBAL TRANSLATION V1 */
(function(){
'use strict';
const PTBR={
'Home':'Início','Home →':'Início →','Database':'Base de Monstros','Monster Database':'Base de Monstros','Monster':'Monstro','Monsters':'Monstros','Monster Profile':'Perfil do Monstro','Monster profile':'Perfil do monstro',
'Team Builder':'Montador de Equipes','Team Builder →':'Montador de Equipes →','Build Teams':'Montar Equipes','Teams':'Equipes','Team':'Equipe','Teams Builder':'Montador de Equipes',
'Runes':'Runas','Rune':'Runa','Rune Build':'Build de Runas','Rune Calculator':'Calculadora de Runas','Rune Optimizer':'Otimizador de Runas','Optimizer':'Otimizador','Optimize':'Otimizar','Artifacts':'Artefatos','Artifact Optimizer':'Otimizador de Artefatos','Decks':'Decks','Account Analyzer':'Analisador de Conta','Guild Tools':'Ferramentas de Guilda','Guild / Siege Tools':'Ferramentas de Guilda / Siege','Guild/Siege':'Guilda/Siege',
'Active Codes':'Códigos Ativos','Codes':'Códigos','Favorites':'Favoritos','My Monsters':'Meus Monstros','Compare Monsters':'Comparar Monstros','Compare':'Comparar','Advanced Tools':'Ferramentas Avançadas',
'Search':'Pesquisar','Search monsters':'Pesquisar monstros','Search for a monster':'Pesquisar um monstro','Search monster':'Pesquisar monstro','Search name, family or element...':'Pesquisar nome, família ou elemento...','Search Nat 5...':'Pesquisar Nat 5...','Search for a monster to get started.':'Pesquise um monstro para começar.','Search and browse the monster database.':'Pesquise e consulte a base de monstros.',
'Quick access':'Acesso rápido','Choose a monster category':'Escolha uma categoria de monstros','Featured Nat 5':'Nat 5 em destaque','View monsters →':'Ver monstros →','Open →':'Abrir →','Open Nat 5 →':'Abrir Nat 5 →',
'Fire':'Fogo','Water':'Água','Wind':'Vento','Light':'Luz','Dark':'Trevas','Attack':'Ataque','Defense':'Defesa','Support':'Suporte','Speed':'Velocidade','Damage':'Dano','Survival':'Sobrevivência','Role':'Função','Element':'Elemento','Stars':'Estrelas','Name':'Nome','Description':'Descrição','Details':'Detalhes','Skills':'Habilidades','Status':'Estado',
'Normal':'Normal','Awakened':'Despertado','Normal / Awakened':'Normal / Despertado','Second Awakening':'Segundo Despertar','All elements':'Todos os elementos','All natural stars':'Todas as estrelas naturais','All':'Todos','Any':'Qualquer','Any element':'Qualquer elemento','Any star':'Qualquer estrela',
'Loading':'Carregando','Loading...':'Carregando...','Loading database...':'Carregando a base...','Loading monster database...':'Carregando a base de monstros...','Loading all monsters...':'Carregando todos os monstros...','Loading monsters...':'Carregando monstros...','Error loading monsters.':'Erro ao carregar os monstros.','No results':'Nenhum resultado','No monster found':'Nenhum monstro encontrado','No Nat 5 found.':'Nenhum Nat 5 encontrado.',
'Save':'Salvar','Save build':'Salvar build','Save to device':'Salvar no dispositivo','Saved':'Guardado','Saved on this device':'Guardado neste dispositivo','Not saved':'Não guardado','Clear':'Limpar','Cancel':'Cancelar','Confirm':'Confirmar','Back':'Voltar','Next':'Próximo','Previous':'Anterior','Load':'Carregar','Edit':'Editar','Remove':'Remover','Delete':'Apagar','Delete all':'Apagar tudo','Add':'Adicionar','Copy':'Copiar','Link':'Link','Export':'Exportar','Export JSON':'Exportar JSON','Import':'Importar','Import JSON':'Importar JSON','Refresh':'Atualizar','Filter':'Filtrar','Close':'Fechar','Open':'Abrir',
'Results':'Resultados','Options':'Opções','Settings':'Configurações','Language':'Idioma','Active':'Ativo','Inactive':'Inativo','Playable':'Jogável','Public builds':'Builds públicas','Quick defenses':'Defesas rápidas','Matchup Planner':'Planeador de Matchups','Enemy defense':'Defesa adversária','My attack':'Meu ataque','Content':'Conteúdo','Notes':'Notas','Deck name':'Nome do deck','My decks':'Meus decks','Save deck':'Salvar deck','Delete all decks':'Apagar todos os decks',
'Main set':'Set principal','Slots 1–6':'Slots 1–6','Slots':'Slots','Slot':'Slot','Main stat':'Main stat','Substats':'Substats','Build summary':'Resumo da build','Minimum stats':'Stats mínimas','Find best builds':'Encontrar melhores builds','Use demo inventory':'Usar inventário de demonstração','Import your JSON inventory':'Importar o seu inventário JSON','Loading inventory...':'Carregando inventário...','No combination found.':'Nenhuma combinação encontrada.','No combination found. Try lowering the minimums or leaving a set/main stat as “Any”.':'Nenhuma combinação encontrada. Tente baixar os mínimos ou deixar algum set/main stat como “Qualquer”.',
'Normal — balanced':'Normal — equilibrado','SPD — speed':'SPD — velocidade','DMG — damage':'DMG — dano','EHP — survival':'EHP — sobrevivência','Usage by content':'Utilização por conteúdo','Build saved automatically.':'Build guardada automaticamente.','Build cleared.':'Build limpa.','Build score':'Pontuação da build','Result':'Resultado',
'Public builds':'Builds públicas','Quick defenses':'Defesas rápidas','Delete':'Apagar','Save':'Salvar','Saved.':'Guardado.','Deck saved.':'Deck guardado.','All decks deleted.':'Todos os decks apagados.','No decks saved yet.':'Ainda não tens decks guardados.','Invalid JSON.':'JSON inválido.','Invalid JSON. Use a rune inventory file in list format.':'JSON inválido. Usa um arquivo de inventário de runas em formato de lista.',
'Using demo analysis data.':'A analisar dados de demonstração.','Custom account data loaded.':'Dados personalizados da conta carregados.','Account quality':'Qualidade da conta','Use demo analysis':'Usar análise de demonstração','Import account JSON':'Importar conta JSON','Export analysis':'Exportar análise','No data available.':'Sem dados disponíveis.',
'Artifact Optimizer':'Otimizador de Artefatos','Using demo artifacts.':'A usar artefatos de demonstração.','Import artifacts JSON':'Importar artefatos JSON','Best artifacts':'Melhores artefatos',
'Analyze your account from monsters and inventory.':'Analisa a tua conta a partir de monstros e inventário.','No server: your data stays in your browser.':'Sem servidor: os dados ficam no teu navegador.','Plan Siege and WGB defenses and matchups.':'Planeia defesas e matchups de Siege e WGB.','Quick defenses':'Defesas rápidas',
'Home':'Início','Menu':'Menu','Download':'Download','Donate':'Doar','ENG':'ENG','PT/BR':'PT/BR',
'YunaRunes Tools':'Ferramentas YunaRunes','Advanced tools for builds, artifacts, decks, accounts, and Guild/Siege.':'Ferramentas avançadas para builds, artefatos, decks, contas e Guilda/Siege.',
'What monsters should I use with it?':'Com que monstros devo usar?','What monsters should I use with it':'Com que monstros devo usar?','Quickly find Nat 5 monsters and open their profiles to see builds, content and combinations.':'Encontre rapidamente os monstros Nat 5 e abra a ficha para ver builds, conteúdo e combinações.',
'Not affiliated with Com2uS.':'Não afiliado à Com2uS.','Independent Summoners War community project':'Projeto independente da comunidade Summoners War','Showing':'A mostrar','valid combinations':'combinações válidas','variants loaded':'variantes carregadas','monsters available':'monstros disponíveis',
'Create teams':'Criar equipes','Build teams':'Montar equipes','See teammates':'Ver companheiros','Search for a monster and see who it works with':'Pesquise um monstro e veja com quem ele combina',
'Using demo inventory':'Usando inventário de demonstração','Custom inventory active:':'Inventário personalizado ativo:','Demo inventory active:':'Inventário de demonstração ativo:','Inventory imported. You can optimize now.':'Inventário importado. Agora podes otimizar.','Demo inventory restored.':'Inventário de demonstração restaurado.',
'How to use':'Como usar','Data is stored in the browser.':'Os dados são guardados no navegador.','No server: your data stays in your browser.':'Sem servidor: os teus dados ficam no teu navegador.'};
function pt(){try{return localStorage.getItem('yunarunes-language')!=='en'}catch(_){return true}}
function replace(v){if(!pt()||!v)return v;let x=String(v);if(PTBR[x])return PTBR[x];const keys=Object.keys(PTBR).sort((a,b)=>b.length-a.length);for(const k of keys){if(x.includes(k))x=x.split(k).join(PTBR[k])}return x}
function run(){if(!pt())return;document.documentElement.lang='pt-BR';document.documentElement.setAttribute('data-language','pt-BR');if(document.title)document.title=replace(document.title);const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];let n;while(n=w.nextNode()){if(n.parentElement?.closest('script,style,noscript'))continue;if(n.nodeValue.trim())nodes.push(n)}nodes.forEach(n=>{const old=n.nodeValue,newv=replace(old);if(newv!==old)n.nodeValue=newv});document.querySelectorAll('input,textarea,[placeholder],[title],[aria-label]').forEach(e=>{['placeholder','title','aria-label'].forEach(a=>{if(e.hasAttribute(a)){const old=e.getAttribute(a),nv=replace(old);if(nv!==old)e.setAttribute(a,nv)}})});document.querySelectorAll('option').forEach(e=>{const old=e.textContent,nv=replace(old);if(nv!==old)e.textContent=nv})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(run,50),{once:true});else setTimeout(run,50);window.addEventListener('storage',e=>{if(e.key==='yunarunes-language')setTimeout(run,50)});/* PT-BR observer disabled */;
})();


/* PT-BR NORMALIZATION V2 — cobertura ampla do site */
(function(){
const M={
'aprende':'aprenda','aprendes':'aprenda','aprendeste':'você aprendeu','acabaste':'você terminou','concluíste':'você concluiu','concluiste':'você concluiu','fizeste':'você fez','foste':'você foi','estás':'está','estás a':'está','vais':'vai','queres':'quer','precisas':'precisa','deves':'deve','pensas':'pensa','pensa em':'pense em','sabes':'sabe','tiveste':'você teve','tiveres':'tiver','fazes':'faz','dizes':'diz','põe':'coloque','pões':'coloca','usa':'use','usas':'usa','usares':'usar','vê':'veja','vês':'vê','olha':'olhe','olhas':'olha','clica':'clique','clicas':'clica','seleciona':'selecione','selecionas':'seleciona','escolhe':'escolha','escolhes':'escolha','abre':'abra','abres':'abre','fecha':'feche','fechas':'fecha','envia':'envie','envias':'envia','recebe':'receba','recebes':'recebe','digita':'digite','digitas':'digita','preenche':'preencha','preenches':'preencha','carrega':'carregue','carregas':'carrega','remove':'remova','removes':'remove','adiciona':'adicione','adicionas':'adiciona','cria':'crie','crias':'cria','guarda':'salve','guardas':'salva','guardares':'salvar','pesquisa':'pesquise','pesquisas':'pesquisa','filtra':'filtre','filtras':'filtra','ordena':'ordene','ordenas':'ordena','analisa':'analise','analisas':'analisa','planeia':'planeje','planeias':'planeja','mostra':'mostre','mostras':'mostra','começa':'comece','começas':'começa','soma':'some','encontra':'encontre','encontras':'encontra',
'teu':'seu','tua':'sua','teus':'seus','tuas':'suas','te':'você','ti':'você','contigo':'com você','para ti':'para você','a ti':'a você','em ti':'em você','tens de':'precisa','podes':'pode','podeis':'podem','consegues':'consegue','faças':'faça',
'equipa':'equipe','equipas':'equipes','artefacto':'artefato','artefactos':'artefatos','ficheiro':'arquivo','ficheiros':'arquivos','telemóvel':'celular','telemóveis':'celulares','ecrã':'tela','ecrãs':'telas','utilização':'uso','utilizações':'usos','visualiza':'visualize','visualizas':'visualiza','atualiza':'atualize','atualizas':'atualiza','regista':'registre','registas':'registra','inicia':'inicie','inicias':'inicia','termina':'termine','terminas':'termina','secção':'seção','secções':'seções','facto':'fato','factos':'fatos','contacto':'contato','contactos':'contatos','receção':'recepção','receções':'recepções',
'a carregar':'carregando','a mostrar':'mostrando','a analisar':'analisando','a usar':'usando','a procurar':'pesquisando','a guardar':'salvando','a criar':'criando','a escolher':'escolhendo','a comparar':'comparando','a filtrar':'filtrando','a ordenar':'ordenando','a verificar':'verificando','a testar':'testando','a aprender':'aprendendo','a montar':'montando','a jogar':'jogando','a utilizar':'usando'
};
function norm(s){let x=String(s);for(const k of Object.keys(M)){const v=M[k];x=x.replace(new RegExp('\\b'+k+'\\b','gi'),m=>m===m.toUpperCase()?v.toUpperCase():(m[0]===m[0].toUpperCase()?v[0].toUpperCase()+v.slice(1):v));}return x}
function run(){let en=false;try{en=localStorage.getItem('yunarunes-language')==='en'}catch(_){}if(en)return;const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),a=[];let n;while(n=w.nextNode()){if(n.parentElement?.closest('script,style,noscript'))continue;if(n.nodeValue.trim())a.push(n)}a.forEach(n=>{const x=norm(n.nodeValue);if(x!==n.nodeValue)n.nodeValue=x});if(document.title)document.title=norm(document.title)}
setTimeout(run,180);/* PT-BR normalization observer disabled */;
})();
/* PT-BR NORMALIZATION V1 */
(function(){
const N={'teu':'seu','tua':'sua','teus':'seus','tuas':'suas','te':'você','tens':'tem','tendes':'têm','tens de':'precisa','podes':'pode','podeis':'podem','vê':'veja','vês':'vê','veres':'ver','escolhe':'escolha','escolhes':'escolha','escolheres':'escolher','adiciona':'adicione','adicionas':'adiciona','guarda':'salve','guardas':'salva','guardado':'salvo','guardada':'salva','guardados':'salvos','guardadas':'salvas','equipa':'equipe','equipas':'equipes','artefacto':'artefato','artefactos':'artefatos','ficheiro':'arquivo','ficheiros':'arquivos','ficheiros':'arquivos','a carregar':'carregando','a mostrar':'mostrando','a analisar':'analisando','a usar':'usando','a procurar':'pesquisando','utilização':'uso','utilizações':'usos','telemóvel':'celular','telemóveis':'celulares','telefone':'celular','telefones':'celulares','encontra':'encontre','encontras':'encontra','ordena':'ordene','ordenas':'ordena','planeia':'planeje','planeias':'planeja','analisa':'analise','analisas':'analisa','soma':'some','somar':'somar','adiciona':'adicione','adicionas':'adiciona','guarda':'salve','guardares':'salvar','cria':'crie','crias':'cria','escolhe':'escolha','escolhes':'escolha','abre':'abra','abres':'abre','pesquisa':'pesquise','pesquisas':'pesquisa','filtra':'filtre','filtras':'filtra','mostra':'mostre','mostras':'mostra','começa':'comece','começas':'começa','jogável':'jogável','ficam':'ficam','mobs':'mobs'};
function norm(s){let x=String(s);for(const [a,b] of Object.entries(N)){x=x.replace(new RegExp('\\b'+a+'\\b','gi',),m=>{if(m===m.toUpperCase())return b.toUpperCase();if(m[0]===m[0].toUpperCase())return b[0].toUpperCase()+b.slice(1);return b})}return x}
function run(){try{if(localStorage.getItem('yunarunes-language')==='en')return}catch(_){};const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),a=[];let n;while(n=w.nextNode()){if(n.parentElement?.closest('script,style,noscript'))continue;if(n.nodeValue.trim())a.push(n)}a.forEach(n=>{const x=norm(n.nodeValue);if(x!==n.nodeValue)n.nodeValue=x});if(document.title)document.title=norm(document.title)}
setTimeout(run,120);/* legacy normalization observer disabled */;
})();

/* ACADEMY LANGUAGE ENGINE V2 */
(function(){
const K='yunarunes-language';
const ACADEMY_PT_EN={
'Yuna Academy':'Yuna Academy','Academia':'Academy','Aprende Summoners War':'Learn Summoners War','Aprender Runas':'Learn Runes','Aprender Combate':'Learn Combat','Montar Equipas':'Build Teams','Montar Equipes':'Build Teams','Dicionário':'Glossary','Laboratórios':'Labs','Aprender a pensar':'Learn to Think','Testar meus conhecimentos':'Test My Knowledge','Começar Academy':'Start Academy','Começar a Academy':'Start the Academy','Comecei hoje':'I Started Today','Monstros e Skills':'Monsters & Skills','Stats':'Stats','Runas':'Runes','Combate':'Combat','Equipes':'Teams','Equipas':'Teams','PvE e Progressão':'PvE & Progression','PvE & Progressão':'PvE & Progression','Artefatos e Upgrades':'Artifacts & Upgrades','Speed Tune':'Speed Tune','PvP':'PvP','Diagnóstico':'Diagnosis','Modo Mestre':'Master Mode','Modo Interativo':'Interactive Mode','Conquistas e Medalhas':'Achievements & Medals','Conquistas':'Achievements','Medalhas':'Medals','Laboratório':'Lab','Treino de decisão rápida':'Quick Decision Training','Desafio de montar equipe':'Team Building Challenge','Desafio de montar equipas':'Team Building Challenge','Treinador de Runas':'Rune Trainer','Modo Detetive':'Detective Mode','Prova de Graduação':'Graduation Exam','Graduação':'Graduation','nível':'level','Nível':'Level','aula':'lesson','Aula':'Lesson','missão':'mission','Missão':'Mission','desafio':'challenge','Desafio':'Challenge','progresso':'progress','Progresso':'Progress','concluído':'completed','Concluído':'Completed','bloqueado':'locked','Bloqueado':'Locked','desbloqueado':'unlocked','Desbloqueado':'Unlocked','Começar':'Start','Continuar':'Continue','Próximo':'Next','Anterior':'Previous','Voltar':'Back','Abrir aula':'Open lesson','Concluir aula':'Complete lesson','Pesquisar':'Search','Pesquisar um termo':'Search a term','Escolhe':'Choose','Escolha':'Choose','Aprende':'Learn','Aprenda':'Learn','Entende':'Understand','Use':'Use','Usa':'Use','Analisa':'Analyze','Analise':'Analyze','Descobre':'Discover','Descubra':'Discover','Explicação':'Explanation','Resposta':'Answer','Correto':'Correct','Correta':'Correct','Errado':'Wrong','Errada':'Wrong','Boa escolha':'Good choice','Não é a melhor decisão':'Not the best decision','Por que perdi?':'Why did I lose?','Por que isso é melhor?':'Why is this better?','Vendo, guardo ou upo?':'Sell, keep or upgrade?','Guardar':'Keep','Guardada':'Kept','Vender':'Sell','Vendida':'Sold','Upar':'Upgrade','Upada':'Upgraded','runa':'rune','Runa':'Rune','runas':'runes','Runas':'Runes','monstro':'monster','Monstro':'Monster','monstros':'monsters','Monstros':'Monsters','equipe':'team','equipe':'team','equipes':'teams','Equipes':'Teams','habilidade':'skill','Habilidades':'Skills','turno':'turn','Turnos':'Turns','dano':'damage','Dano':'Damage','velocidade':'speed','Velocidade':'Speed','sobrevivência':'survival','Sobrevivência':'Survival','controle':'control','Controle':'Control','efeito':'effect','Efeito':'Effect','efeitos':'effects','Efeitos':'Effects','ataque':'attack','Ataque':'Attack','defesa':'defense','Defesa':'Defense','suporte':'support','Suporte':'Support','resistência':'resistance','Resistência':'Resistance','precisão':'accuracy','Precisão':'Accuracy','elemento':'element','Elemento':'Element','atributo':'attribute','Atributo':'Attribute','objetivo':'goal','Objetivo':'Goal','função':'role','Função':'Role','ordem':'order','Ordem':'Order','primeiro':'first','Primeiro':'First','segundo':'second','Segundo':'Second','terceiro':'third','Terceiro':'Third','hoje':'today','agora':'now','depois':'after','antes':'before','sempre':'always','nunca':'never','porque':'because','Por que':'Why','quando':'when','Quando':'When','se':'if','Se':'If','mais':'more','menos':'less','apenas':'only','Apenas':'Only','todos':'all','Todos':'All','todas':'all','Todas':'All','cada':'each','Cada':'Each','sem':'without','com':'with','para':'for','completo':'complete','Completo':'Complete','falta':'missing','Falta':'Missing','problema':'problem','Problema':'Problem','causa':'cause','Causa':'Cause','resultado':'result','Resultado':'Result','explicação':'explanation','feedback':'feedback','aprendizado':'learning','jogador':'player','Jogador':'Player','novos jogadores':'new players','Novo jogador':'New player','novos jogadores':'new players','do zero':'from scratch','no teu ritmo':'at your own pace','no seu ritmo':'at your own pace','diretamente':'directly','correspondente':'corresponding','fundamentos':'fundamentals','Fundamentos':'Fundamentals','progressão':'progression','Progressão':'Progression','mecânicas':'mechanics','Mecânicas':'Mechanics','conhecimentos':'knowledge','Conhecimentos':'Knowledge','dicionário':'glossary','Dicionário':'Glossary','atualizações do jogo':'game updates','Atualizações do jogo':'Game updates','reais':'real','Real':'Real','conta':'account','Conta':'Account','pronta':'ready','Pronta':'Ready','sim':'yes','não':'no','Não':'No','Sim':'Yes'
};
function isEN(){try{return localStorage.getItem(K)==='en'}catch(_){return false}}
function swap(el){
 if(!el)return;
 if(el.hasAttribute('data-en')){el.innerHTML=el.getAttribute(isEN()?'data-en':'data-pt')||'';return}
 if(el.hasAttribute('data-en-placeholder'))el.setAttribute('placeholder',el.getAttribute(isEN()?'data-en-placeholder':'data-pt-placeholder')||'');
}
function translateFallback(text){
 let x=String(text);
 if(!isEN())return x;
 const keys=Object.keys(ACADEMY_PT_EN).sort((a,b)=>b.length-a.length);
 for(const k of keys)x=x.replace(new RegExp('(^|\\s|[—–,:;.!?()\\[\\]/])'+k.replace(/[.*+?^$\\{}()|[\\]\\\\]/g,'\\$&')+'(?=$|\\s|[—–,:;.!?()\\[\\]/])','g'),m=>m.replace(k,ACADEMY_PT_EN[k]));
 return x;
}
window.applyLanguage=function(){
 const en=isEN();
 document.documentElement.lang=en?'en':'pt-BR';
 document.documentElement.setAttribute('data-language',en?'en':'pt-BR');
 document.querySelectorAll('[data-pt],[data-en]').forEach(swap);
 document.querySelectorAll('[data-pt-placeholder],[data-en-placeholder]').forEach(e=>{const v=e.getAttribute(en?'data-en-placeholder':'data-pt-placeholder');if(v)e.setAttribute('placeholder',v)});
 if(document.title)document.title=translateFallback(document.title);
 if(!en)return;
 const root=document.body;
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];let n;
 while(n=w.nextNode()){if(n.parentElement?.closest('script,style,noscript,[data-no-auto-translate]'))continue;if(n.nodeValue.trim())nodes.push(n)}
 nodes.forEach(n=>{const v=translateFallback(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v});
 document.querySelectorAll('input,textarea,[placeholder],[title],[aria-label],option').forEach(e=>['placeholder','title','aria-label'].forEach(a=>{if(e.hasAttribute(a)){const v=translateFallback(e.getAttribute(a));e.setAttribute(a,v)}}));
};
function run(){setTimeout(()=>window.applyLanguage(),30)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
window.addEventListener('storage',e=>{if(e.key===K)run()});
/* Academy observer disabled */;
})();

/* ACADEMY FULL TRANSLATION V3 */
(function(){
const M={"YunaRunes — Yuna Academy":"YunaRunes — Yuna Academy","🧪 Yuna Academy • Ferramentas de aprendizagem":"🧪 Yuna Academy • Learning Tools","Aprende fazendo":"Learn by doing","Usa os simuladores e a árvore de habilidades enquanto avanças nas aulas.":"Use the simulators and skill tree as you progress through the lessons.","🚀 Yuna Academy • Nova trilha":"🚀 Yuna Academy • New Path","Aprende, pratica e prova que entendeu":"Learn, practice, and prove you understand","A Academia agora funciona como uma jornada: primeiro aprende o básico, depois toma decisões, diagnostica erros e só então enfrenta a graduação.":"The Academy now works as a journey: learn the basics first, then make decisions, diagnose mistakes, and only then take the graduation exam.","🗺️ PRIMEIROS PASSOS":"🗺️ FIRST STEPS","Trilha “Comecei Hoje”":"“I Started Today” Path","Uma ordem simples para quem acabou de começar. Não tenta ensinar tudo de uma vez.":"A simple order for players who just started. It does not try to teach everything at once.","Funções e skills":"Roles & skills","Stats principais":"Main stats","Primeiro time":"First team","Entendi que o objetivo não é ter todos os monstros, e sim construir uma conta funcional.":"I understand that the goal is not to own every monster, but to build a functional account.","Sei diferenciar função de monstro: dano, suporte, controle, proteção e utilidade.":"I can distinguish monster roles: damage, support, control, protection, and utility.","Sei que runas melhoram stats e que o set deve servir ao monstro.":"I know runes improve stats and the set should fit the monster.","Consigo montar um primeiro time com funções que se complementam.":"I can build a first team with complementary roles.","🧠 PENSAMENTO ESTRATÉGICO":"🧠 STRATEGIC THINKING","Aprenda a pensar como jogador":"Learn to think like a player","Antes de copiar uma build, faça estas quatro perguntas:":"Before copying a build, ask these four questions:","Qual é a função?":"What is the role?","O que este monstro precisa fazer para o time funcionar?":"What does this monster need to do for the team to work?","Qual é a condição de vitória?":"What is the win condition?","Mais velocidade? Sobreviver? Controlar? Matar um alvo?":"More speed? Survive? Control? Kill a target?","Quais stats permitem isso?":"Which stats make that possible?","Escolha stats pela função, não pelo número bonito.":"Choose stats based on the role, not the prettiest number.","O que realmente falhou?":"What actually failed?","Não troque todas as runas antes de descobrir o problema.":"Do not replace every rune before finding the problem.","🧪 LABORATÓRIO":"🧪 LAB","“Por que isso é melhor?”":"“Why is this better?”","Escolha a opção que melhor resolve o problema. A explicação aparece depois da resposta.":"Choose the option that best solves the problem. The explanation appears after your answer.","A) +500 ATK, mas perco muita Velocidade":"A) +500 ATK, but I lose a lot of Speed","B) Menos ATK, mas mantenho o Speed Tune":"B) Less ATK, but I keep the Speed Tune","C) Troco o set inteiro sem testar":"C) I replace the entire set without testing","D) Escolho a runa com maior valor de venda":"D) I choose the rune with the highest sell value","💡 Pensa primeiro: se o time depende da ordem dos turnos, o que acontece quando você perde essa ordem?":"💡 Think first: if the team depends on turn order, what happens when you lose that order?","🕵️ DIAGNÓSTICO":"🕵️ DIAGNOSIS","Por que perdi?":"Why did I lose?","Treine o diagnóstico antes de mexer nas runas.":"Practice diagnosis before changing your runes.","Meu suporte sempre joga depois do inimigo.":"My support always moves after the enemy.","Meu DPS morre antes de conseguir atacar.":"My DPS dies before it can attack.","Meu controle quase nunca aplica debuff.":"My control unit almost never lands debuffs.","Eu sobrevivo, mas não consigo finalizar.":"I survive, but I cannot finish the fight.","Escolha um problema para receber uma hipótese de diagnóstico.":"Choose a problem to receive a diagnostic hypothesis.","📋 CHECKLIST DA CONTA":"📋 ACCOUNT CHECKLIST","Estou pronto para avançar?":"Am I ready to move forward?","Marque apenas o que você consegue fazer sem copiar cegamente uma build.":"Check only what you can do without blindly copying a build.","Consigo explicar a função de cada monstro do meu time.":"I can explain the role of every monster on my team.","Sei olhar uma runa e dizer se os stats fazem sentido para o monstro.":"I can look at a rune and tell whether its stats make sense for the monster.","Consigo explicar o que é Speed Tune.":"I can explain what Speed Tune is.","Sei diferenciar ACC e RES.":"I can distinguish ACC and RES.","Consigo identificar uma possível causa de uma derrota.":"I can identify a possible cause of a defeat.","Consigo adaptar uma equipe quando o conteúdo muda.":"I can adapt a team when the content changes.","🎯 MISSÕES PRÁTICAS":"🎯 PRACTICAL MISSIONS","Não apenas leia — faça":"Do not just read — do it","Complete as missões em jogo e volte para marcar. A Academia guarda o progresso neste navegador.":"Complete the missions in-game and come back to check them off. The Academy saves progress in this browser.","💎 Pegue uma runa e explique por que você a usaria ou venderia.":"💎 Pick a rune and explain why you would use or sell it.","⚔️ Monte um time em que cada monstro tenha uma função clara.":"⚔️ Build a team where every monster has a clear role.","🧭 Faça uma Speed Tune simples e escreva a ordem esperada.":"🧭 Make a simple Speed Tune and write the expected order.","🕵️ Analise uma derrota sem trocar nenhuma runa primeiro.":"🕵️ Analyze a defeat without changing any runes first.","🧪 Use o Simulador de Runas e compare duas opções.":"🧪 Use the Rune Simulator and compare two options.","🎮 Use o Simulador de Combate e explique por que uma estratégia venceu.":"🎮 Use the Combat Simulator and explain why one strategy won.","🏆 Faça a Prova de Graduação quando se sentir preparado.":"🏆 Take the Graduation Exam when you feel ready.","📖 DICIONÁRIO INTERATIVO":"📖 INTERACTIVE GLOSSARY","Palavras que você precisa entender":"Words you need to understand","Clique para revelar uma explicação curta. Os termos também podem ser usados nas aulas e desafios.":"Click to reveal a short explanation. These terms can also be used in lessons and challenges.","Escolha um termo.":"Choose a term.","🎓 NÍVEIS DA ACADEMIA":"🎓 ACADEMY LEVELS","Seu caminho até a graduação":"Your path to graduation","Entende o básico.":"Understands the basics.","Lê stats e runas.":"Reads stats and runes.","Monta equipes funcionais.":"Builds functional teams.","Toma decisões.":"Makes decisions.","Diagnostica derrotas.":"Diagnoses defeats.","Resolve problemas novos.":"Solves new problems.","Passa na graduação.":"Passes graduation.","Recebe o certificado.":"Receives the certificate.","🌳 Árvore de Habilidades":"🌳 Skill Tree","Aprenda Summoners War em etapas e desbloqueie o próximo conhecimento.":"Learn Summoners War step by step and unlock the next knowledge.","habilidades concluídas":"skills completed","Concluir habilidade + XP":"Complete skill + XP","🧪 Simulador de Runas":"🧪 Rune Simulator","Gere uma runa, melhore até +15 e veja como os rolls das substats evoluem.":"Generate a rune, upgrade it to +15, and see how substat rolls evolve.","Tipo":"Type","Raridade":"Rarity","Estrelas":"Stars","🎲 Gerar Runa":"🎲 Generate Rune","⬆️ Melhorar +3":"⬆️ Upgrade +3","↻ Nova Runa":"↻ New Rune","Nenhuma runa gerada":"No rune generated","Escolha as opções e clique em Gerar Runa.":"Choose the options and click Generate Rune.","Simulador educativo para treinar análise de runas. Os valores são aproximados e não representam uma cópia das tabelas internas do jogo.":"Educational simulator for rune analysis practice. Values are approximate and do not reproduce the game's internal tables.","📈 Histórico da melhoria":"📈 Upgrade History","Gere uma runa para começar.":"Generate a rune to start.","⚔️ Simulador de Combate":"⚔️ Combat Simulator","Treine velocidade, ordem de turnos, dano, controle e decisões de batalha.":"Practice speed, turn order, damage, control, and battle decisions.","Seu monstro":"Your monster","Inimigo":"Enemy","Estratégia":"Strategy","Priorizar velocidade":"Prioritize speed","Priorizar controle":"Prioritize control","Priorizar dano":"Prioritize damage","Priorizar sobrevivência":"Prioritize survival","Dificuldade":"Difficulty","Difícil":"Hard","▶️ Iniciar combate":"▶️ Start battle","⚡ Próximo turno":"⚡ Next turn","↻ Reiniciar":"↻ Restart","Configure os combatentes e clique em Iniciar combate.":"Configure the fighters and click Start Battle.","🎯 PROC":"🎯 PROC","💫 STUN":"💫 STUN","❄️ FREEZE":"❄️ FREEZE","😴 SLEEP":"😴 SLEEP","🧹 STRIP":"🧹 STRIP","✨ CLEANSE":"✨ CLEANSE","☠️ DoT":"☠️ DoT","🔒 CC":"🔒 CC","⚡ ATB":"⚡ ATB","🎯 ACC vs RES":"🎯 ACC vs RES","🧙 Construção":"🧙 Building","🧠 Por que você perdeu?":"🧠 Why did you lose?","🗺️ Trilha completa de aprendizado":"🗺️ Complete Learning Path","Conclua as etapas na ordem. O progresso fica salvo neste dispositivo.":"Complete the steps in order. Progress is saved on this device.","etapas concluídas":"steps completed","🏆 Certificação Yuna Academy":"🏆 Yuna Academy Certification","Complete a trilha, desafios e provas para desbloquear títulos.":"Complete the path, challenges, and exams to unlock titles.","🍼 Yuna Academy — Escola para quem começou hoje":"🍼 Yuna Academy — School for New Players","Uma trilha completa para quem nunca jogou Summoners War ou ainda está perdido.":"A complete path for anyone who has never played Summoners War or is still lost.","1. Primeiros dias":"1. First days","2. Primeiro time":"2. First team","3. Primeiras runas":"3. First runes","4. Farm":"4. Farming","5. Pensamento":"5. Thinking","6. Equipes":"6. Teams","7. PvP":"7. PvP","8. Endgame":"8. Endgame","💰 Recursos":"💰 Resources","Mana:":"Mana:","Energia:":"Energy:","Cristais:":"Crystals:","Devilmon:":"Devilmon:","usada para evoluir, despertar, melhorar runas e várias ações.":"used to evolve, awaken, upgrade runes, and perform many actions.","permite entrar em conteúdos PvE.":"allows you to enter PvE content.","recurso premium; evite gastar sem objetivo.":"premium resource; avoid spending it without a goal.","recurso raro para skills de monstros apropriados.":"rare resource for appropriate monster skill-ups.","👹 Monstros":"👹 Monsters","Nat:":"Nat:","Evolução:":"Evolution:","Despertar:":"Awakening:","Skill-up:":"Skill-up:","🍖 O que não fazer":"🍖 What not to do","Não alimente um monstro importante sem confirmar.":"Do not feed an important monster without checking first.","Não use Devilmon em qualquer monstro.":"Do not use Devilmon on just any monster.","Não venda uma runa boa só porque parece estranha.":"Do not sell a good rune just because it looks strange.","Não copie uma build sem entender a função.":"Do not copy a build without understanding the role.","🧬 2. Monster School — aprenda a ler um monstro":"🧬 2. Monster School — learn to read a monster","Antes de olhar uma build, leia as skills. Pergunte:":"Before looking at a build, read the skills. Ask:","o que este monstro tenta fazer?":"what is this monster trying to do?","⚔️ Dano":"⚔️ Damage","🧹 Utilidade":"🧹 Utility","⚡ Booster":"⚡ Booster","🛡️ Suporte":"🛡️ Support","🎯 Líder":"🎯 Leader","🔎 Exercício: descubra a função":"🔎 Exercise: identify the role","❤️ 3. Stat School — entenda cada atributo":"❤️ 3. Stat School — understand each stat","Vida":"HP","Ataque":"Attack","Defesa":"Defense","Velocidade":"Speed","Chance de crítico":"Critical Rate","Dano crítico":"Critical Damage","Resistance":"Resistance","⚠️ Regra de ouro":"⚠️ Golden rule","Não existe “a melhor stat”. Existe a stat que resolve o problema da função do monstro.":"There is no “best stat.” There is the stat that solves the monster's role problem.","💎 4. Rune School — runas desde o zero":"💎 4. Rune School — runes from scratch","🔢 Slots 1–6":"🔢 Slots 1–6","🎨 Raridade":"🎨 Rarity","🎲 Rolls":"🎲 Rolls","⚡ Speed rolls":"⚡ Speed rolls","📈 Eficiência":"📈 Efficiency","🧪 Decisão de runa":"🧪 Rune decision","Avaliar":"Evaluate","🎲 5. Dicionário de combate — palavras que você vai ouvir":"🎲 5. Combat glossary — words you will hear","Ativação adicional de uma mecânica. Não é sinônimo de qualquer efeito.":"An additional activation of a mechanic. It is not synonymous with every effect.","Remover buffs do inimigo.":"Remove enemy buffs.","⚡ Sei o que é SPD":"⚡ I know what SPD is","💎 Sei escolher runas":"💎 I know how to choose runes","🧙 Sei montar equipas":"🧙 I know how to build teams","🔥 Master Mode":"🔥 Master Mode","Desafio":"Challenge","Trocar todas as runas":"Replace all runes","🚀 Yuna Academy — Modo Interativo":"🚀 Yuna Academy — Interactive Mode","Agora a Academy não serve apenas para ler. Você pode testar decisões, diagnosticar equipes, avaliar runas e aprender através de situações práticas.":"The Academy is not just for reading. You can test decisions, diagnose teams, evaluate runes, and learn through practical situations.","🕵️ Descubra o erro":"🕵️ Find the mistake","Uma equipe está falhando. Escolha o diagnóstico mais importante.":"A team is failing. Choose the most important diagnosis.","💀 Morre rápido":"💀 Dies quickly","🐌 Nunca joga":"🐌 Never gets a turn","🎯 Debuff falha":"🎯 Debuff fails","💥 Dano baixo":"💥 Low damage","⚔️ Simulador de batalha":"⚔️ Battle Simulator","Seu time precisa manter a ordem booster → setup → debuff → dano. O que você prioriza?":"Your team needs to maintain the booster → setup → debuff → damage order. What do you prioritize?","⚡ Ajustar SPD/ATB":"⚡ Adjust SPD/ATB","💥 Colocar mais dano":"💥 Add more damage","🎲 Deixar aleatório":"🎲 Leave it random","❤️ Colocar HP em todos":"❤️ Add HP to everyone","💎 Essa runa é boa?":"💎 Is this rune good?","Para um DPS rápido, qual opção faz mais sentido?":"For a fast DPS, which option makes the most sense?","🧙 Monte uma equipe do zero":"🧙 Build a team from scratch","Escolha a condição de vitória e o primeiro papel.":"Choose the win condition and the first role.","💥 Dano rápido":"💥 Fast damage","🧠 Controle":"🧠 Control","🛡️ Segurança":"🛡️ Safety","Setup / Strip":"Setup / Strip","Debuffer / CC":"Debuffer / CC","Healer / Support":"Healer / Support","Montar estratégia":"Build strategy","🧪 Laboratório de ACC/RES":"🧪 ACC/RES Lab","Digite os valores para testar um modelo educativo.":"Enter values to test an educational model.","Testar":"Test","Escolha o sintoma e veja por onde começar a investigação.":"Choose the symptom and see where to start the investigation.","Minha equipe morre rápido":"My team dies quickly","Meus debuffs não entram":"My debuffs do not land","Meu dano é baixo":"My damage is low","Minha equipe sai da ordem":"My team loses turn order","Diagnosticar":"Diagnose","📖 Dicionário Yuna Academy":"📖 Yuna Academy Glossary","Pesquise um termo e aprenda o significado, o uso e o erro mais comum.":"Search for a term and learn its meaning, use, and most common mistake.","👑 Modo Mestre":"👑 Master Mode","Sem dicas: tome a decisão que você considera correta.":"No hints: make the decision you think is correct.","Desafio final":"Final challenge","Ajustar SPD/Speed Tune":"Adjust SPD/Speed Tune","Aumentar apenas HP":"Increase HP only","Trocar o elemento":"Change the element","🎓 Prova de Graduação":"🎓 Graduation Exam","🏆 Ranking pessoal":"🏆 Personal ranking","🎖️ Medalhas especiais":"🎖️ Special medals"};
function academyFullEN(s){
 if(localStorage.getItem('yunarunes-language')!=='en') return s;
 let x=String(s);
 const keys=Object.keys(M).sort((a,b)=>b.length-a.length);
 for(const k of keys){
   x=x.split(k).join(M[k]);
 }
 return x;
}
window.academyFullEN=academyFullEN;
const oldApply=window.applyLanguage;
window.applyLanguage=function(){
 if(typeof oldApply==='function')oldApply();
 if(localStorage.getItem('yunarunes-language')!=='en')return;
 const root=document.body;
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT), nodes=[];let n;
 while(n=w.nextNode()){
   if(n.parentElement?.closest('script,style,noscript,[data-no-auto-translate]'))continue;
   if(n.nodeValue.trim())nodes.push(n);
 }
 nodes.forEach(n=>{const v=academyFullEN(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v});
 document.title=academyFullEN(document.title);
};
setTimeout(()=>window.applyLanguage&&window.applyLanguage(),80);
})();

/* YUNARUNES — UNIFIED PT/EN LANGUAGE ENGINE
   One source of truth, no page reload, restores Portuguese source before English translation. */
(function(){
'use strict';
const KEY='yunarunes-language';
const legacyApply=window.applyLanguage;

const DICT={
  "🏠 Início":"🏠 Home",
  "⚔️ Team Builder":"⚔️ Team Builder",
  "🧿 Runas":"🧿 Runes",
  "⚙️ Optimizer":"⚙️ Optimizer",
  "💠 Artifacts":"💠 Artifacts",
  "🃏 Decks":"🃏 Decks",
  "📊 Análise de Conta":"📊 Account Analysis",
  "⚔️ Guild/Siege":"⚔️ Guild/Siege",
  "YunaRunes • Yuna Academy":"YunaRunes • Yuna Academy"
};

const isEN=()=>{try{return localStorage.getItem(KEY)==='en'}catch(_){return false}};
const sourceAttr='data-yuna-source';
let applying=false;
let observerTimer=0;
let ignoreObserverUntil=0;

function sourceText(node){
  if(!node || node.nodeType!==Node.TEXT_NODE) return;
  if(node.parentElement?.closest('script,style,noscript,[data-no-auto-translate]')) return;
  if(!node.nodeValue.trim()) return;
  if(!node.dataset[sourceAttr]) node.dataset[sourceAttr]=node.nodeValue;
}

function snapshot(root=document.body){
  if(!root) return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  let n;
  while(n=w.nextNode()) sourceText(n);
}

function restoreSource(root=document.body){
  if(!root) return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  let n;
  while(n=w.nextNode()){
    if(n.dataset[sourceAttr]!==undefined && n.nodeValue!==n.dataset[sourceAttr]){
      n.nodeValue=n.dataset[sourceAttr];
    }
  }
}

function clearLegacySnapshots(root=document.body){
  if(!root) return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  let n;
  while(n=w.nextNode()){
    if(n.dataset.yunaOriginal!==undefined) delete n.dataset.yunaOriginal;
  }
}

function translateExplicit(root=document.body){
  if(!root) return;
  const en=isEN();
  root.querySelectorAll?.('[data-pt],[data-en]').forEach(el=>{
    if(el.closest('script,style,noscript,[data-no-auto-translate]')) return;
    const v=en ? (el.getAttribute('data-en') ?? el.getAttribute('data-pt') ?? '')
               : (el.getAttribute('data-pt') ?? el.getAttribute('data-en') ?? '');
    if(el.innerHTML!==v) el.innerHTML=v;
  });
  root.querySelectorAll?.('[data-pt-placeholder],[data-en-placeholder],[data-pt-title],[data-en-title],[data-pt-aria],[data-en-aria]').forEach(el=>{
    const pairs=[
      ['data-pt-placeholder','data-en-placeholder','placeholder'],
      ['data-pt-title','data-en-title','title'],
      ['data-pt-aria','data-en-aria','aria-label']
    ];
    for(const [pt,enAttr,target] of pairs){
      if(el.hasAttribute(pt)||el.hasAttribute(enAttr)){
        const v=en ? (el.getAttribute(enAttr) ?? el.getAttribute(pt) ?? '')
                   : (el.getAttribute(pt) ?? el.getAttribute(enAttr) ?? '');
        el.setAttribute(target,v);
      }
    }
  });
}

function translateFallbackText(text){
  let x=String(text);
  if(!isEN()) return x;
  const keys=Object.keys(DICT).sort((a,b)=>b.length-a.length);
  for(const k of keys) x=x.split(k).join(DICT[k]);
  if(typeof window.academyFullEN==='function') x=window.academyFullEN(x);
  return x;
}

function setActiveButtons(){
  const lang=isEN()?'en':'pt';
  document.querySelectorAll('.yuna-controls button[data-lang]').forEach(b=>{
    const active=b.getAttribute('data-lang')===lang;
    b.classList.toggle('active',active);
    b.setAttribute('aria-pressed',active?'true':'false');
  });
}

function applyLanguageNow(){
  if(!document.body || applying) return;
  applying=true;
  ignoreObserverUntil=performance.now()+300;
  snapshot();
  restoreSource();
  clearLegacySnapshots();

  const en=isEN();
  const title=document.querySelector('title');
  if(title && !title.dataset.yunaSource) title.dataset.yunaSource=title.textContent;

  document.documentElement.lang=en?'en':'pt-BR';
  document.documentElement.setAttribute('data-language',en?'en':'pt-BR');

  if(en && typeof legacyApply==='function'){
    legacyApply();
  }

  translateExplicit(document);
  setActiveButtons();

  if(title && !en) title.textContent=title.dataset.yunaSource;

  applying=false;
}

function setLanguage(lang){
  const next=lang==='en'?'en':'pt';
  try{localStorage.setItem(KEY,next)}catch(_){}
  applyLanguageNow();
}

function bindButtons(){
  document.querySelectorAll('.yuna-controls button[data-lang]').forEach(btn=>{
    if(btn.dataset.yunaUnifiedBound==='1') return;
    btn.dataset.yunaUnifiedBound='1';
    btn.addEventListener('click',function(ev){
      ev.preventDefault();
      ev.stopImmediatePropagation();
      setLanguage(btn.getAttribute('data-lang'));
    },true);
  });
  setActiveButtons();
}

function scheduleDynamicApply(){
  if(applying || performance.now()<ignoreObserverUntil) return;
  clearTimeout(observerTimer);
  observerTimer=setTimeout(()=>{
    observerTimer=0;
    if(!document.body) return;
    snapshot();
    if(isEN()){
      applyLanguageNow();
    }else{
      translateExplicit(document);
      setActiveButtons();
    }
  },40);
}

function init(){
  snapshot();
  bindButtons();
  applyLanguageNow();

  const observer=new MutationObserver(records=>{
    if(applying || performance.now()<ignoreObserverUntil) return;
    let relevant=false;
    for(const record of records){
      if(record.type==='childList' && record.addedNodes.length) relevant=true;
      if(record.type==='characterData' && record.target?.nodeValue?.trim()) relevant=true;
    }
    if(relevant) scheduleDynamicApply();
  });
  observer.observe(document.body,{subtree:true,childList:true,characterData:true});
}

window.yunaUniversalTranslate=applyLanguageNow;
window.applyLanguage=applyLanguageNow;

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init,{once:true});
}else{
  init();
}

window.addEventListener('storage',e=>{
  if(e.key===KEY) applyLanguageNow();
});
})();

/* YUNARUNES — PT/EN FINAL CONSISTENCY LAYER */
(function(){
'use strict';
const KEY='yunarunes-language';
const EN_PT={
'New Player Journey':'Jornada do Novo Jogador','Learn to play, not just copy builds':'Aprende a jogar, não apenas a copiar builds',
'Start here — your first 7 days':'Começa aqui — os primeiros 7 dias','Start with Stage 1':'Começa pela Etapa 1',
'Learn to read battle':'Aprende a ler a batalha','Learn Runes by making choices':'Aprende Runas através de escolhas',
'Build teams by role':'Constrói equipas por função','Learn to diagnose defeats':'Aprende a diagnosticar derrotas',
'Choose your next content':'Escolhe o próximo conteúdo','Master mode':'Modo Mestre',
'What should I do now?':'O que faço agora?','Learn to think during battle':'Aprende a pensar durante a batalha',
'Build a team with a purpose':'Monta uma equipa com propósito','Learn Runes without memorizing rules':'Aprende Runas sem decorar regras',
'Mistakes beginners should avoid':'Erros que os iniciantes devem evitar','Progression road':'Rota de progressão',
'Yuna Academy challenges':'Desafios da Yuna Academy','Personal ranking':'Ranking pessoal','Special medals':'Medalhas especiais',
'New':'Novo','I have a team':'Já tenho equipa',"I'm stuck":'Estou preso','I want PvP':'Quero PvP',
'Survival':'Sobrevivência','Support/Sustain':'Suporte/Sustain','Support':'Suporte','Healer':'Curador','Control':'Controlo',
'Stripper':'Stripper','Buffer':'Buffer','Debuffer':'Debuffer','Tank':'Tank','Damage':'Dano','Fast damage':'Dano rápido',
'Safety':'Segurança','Setup / Strip':'Setup / Strip','Debuffer / CC':'Debuffer / CC','Healer / Support':'Curador / Suporte',
'Keep':'Guardar','Upgrade':'Upar','Sell':'Vender','Decision: ':'Decisão: ','Case: ':'Caso: ',
'Challenge: ':'Desafio: ','Good choice.':'Boa escolha.','Not quite.':'Ainda não.','Correct.':'Correto.',
'Start here':'Começa aqui','Battle':'Batalha','Runes':'Runas','Team':'Equipa','Strategy':'Estratégia','Progression':'Progressão','Optimize':'Otimizar',
'Graduation Exam':'Prova de Graduação','Official assessment':'Avaliação oficial','Take Graduation Exam':'Fazer Prova de Graduação',
'YUNA ACADEMY • OFFICIAL ASSESSMENT':'YUNA ACADEMY • AVALIAÇÃO OFICIAL','Graduation Exam':'Prova de Graduação',
'An evaluation to verify whether the student can think like a player: analyze runes, stats, Speed Tune, skills, control, composition, PvE/PvP and diagnose defeats.':'Uma avaliação prática para verificar se o jogador consegue pensar como jogador: analisar runas, stats, Speed Tune, skills, controlo, composição, PvE/PvP e diagnosticar derrotas.',
'12 questions. Passing score: 10/12 (83.3%). No going back to the previous question.':'12 perguntas. Aprovação: 10/12 (83,3%). Não é possível voltar à pergunta anterior.',
'Click start to begin.':'Clica em começar para iniciar.','Start exam':'Começar prova','Retake':'Refazer',
'You passed!':'Foste aprovado!','You did not pass yet.':'Ainda não foste aprovado.','Score':'Pontuação',
'Read battle':'Ler a batalha','Identify the problem before changing the build.':'Identifica o problema antes de mudar a build.',
'Stage completed':'Etapa concluída','Mark stage as complete':'Marcar etapa como concluída',
'Goal: finish the first week understanding what you are doing, even if your account is not strong yet.':'Objetivo: terminar a primeira semana a entender o que estás a fazer, mesmo que ainda não tenhas uma conta forte.',
'Good read.':'Boa leitura.','Not yet.':'Ainda não.','Your team loses turn order':'A tua equipa perde a ordem de turnos',
'My team dies quickly':'A minha equipa morre rapidamente','My debuffs do not land':'Os meus debuffs não entram',
'My damage is low':'O meu dano é baixo','Diagnose':'Diagnosticar','Test':'Testar','Evaluate':'Avaliar'
};
function en(){try{return localStorage.getItem(KEY)==='en'}catch(e){return false}}
function translateText(v){
 if(en()) return v;
 let x=String(v);
 const keys=Object.keys(EN_PT).sort((a,b)=>b.length-a.length);
 for(const k of keys)x=x.split(k).join(EN_PT[k]);
 return x;
}
function applyPT(){
 if(en()||!document.body)return;
 const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
 while(n=w.nextNode()){
   if(n.parentElement?.closest('script,style,noscript,[data-no-auto-translate]'))continue;
   if(n.nodeValue.trim()) {const x=translateText(n.nodeValue);if(x!==n.nodeValue)n.nodeValue=x;}
 }
 const title=document.title; document.title=translateText(title);
 document.querySelectorAll('input,textarea').forEach(el=>{
   if(el.placeholder)el.placeholder=translateText(el.placeholder);
   if(el.title)el.title=translateText(el.title);
   if(el.getAttribute('aria-label'))el.setAttribute('aria-label',translateText(el.getAttribute('aria-label')));
 });
}
function run(){setTimeout(applyPT,60)}
window.addEventListener('storage',e=>{if(e.key===KEY)run()});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();

/* YUNARUNES — FINAL HEADER + LANGUAGE AUTHORITY
   The full navigation/header belongs only to the home screen.
   Language controls remain available on every page. */
(function(){
'use strict';
const KEY='yunarunes-language';
const path=(location.pathname||'').toLowerCase();
const isHome=path.endsWith('/') || path.endsWith('/index.html') || path.endsWith('index.html');

function addLanguageStyles(){
  if(document.getElementById('yuna-site-language-style')) return;
  const style=document.createElement('style');
  style.id='yuna-site-language-style';
  style.textContent='.yuna-site-language{position:fixed;top:12px;right:12px;z-index:999999;display:flex;gap:6px;padding:5px;background:rgba(7,11,17,.94);border:1px solid #293746;border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,.35)}.yuna-site-language button{border:1px solid #293746;border-radius:7px;background:#17212b;color:#fff;height:34px;padding:0 9px;font:900 11px Arial,sans-serif;cursor:pointer;white-space:nowrap}.yuna-site-language button.active{outline:2px solid rgba(53,169,225,.8);background:#202f3d}@media(max-width:600px){.yuna-site-language{top:64px;right:8px;gap:4px}.yuna-site-language button{height:32px;padding:0 7px;font-size:10px}}';
  document.head.appendChild(style);
}

function ensureSiteLanguageControls(){
  if(isHome || !document.body || document.querySelector('.yuna-site-language')) return;
  addLanguageStyles();
  const box=document.createElement('div');
  box.className='yuna-site-language';
  box.setAttribute('aria-label','Language');
  box.innerHTML='<button type="button" data-lang="pt" aria-label="Português">🇧🇷 PT/BR</button><button type="button" data-lang="en" aria-label="English">🇬🇧 ENG</button>';
  document.body.appendChild(box);
}

function removeSubpageHeaders(){
  if(isHome || !document.body) return;
  document.querySelectorAll('body > header, header.top, header.academy-top').forEach(el=>el.remove());
  document.querySelectorAll('.yuna-site-language').forEach(el=>el.remove());
  ensureSiteLanguageControls();
}

function activeLanguage(){
  try{return localStorage.getItem(KEY)==='en'?'en':'pt'}catch(_){return 'pt'}
}

function updateLanguageButtons(){
  const lang=activeLanguage();
  document.querySelectorAll('.yuna-site-language button[data-lang], .yuna-controls button[data-lang], [data-academy-lang]').forEach(btn=>{
    const v=btn.getAttribute('data-lang')||btn.getAttribute('data-academy-lang');
    btn.classList.toggle('active',v===lang);
    btn.setAttribute('aria-pressed',v===lang?'true':'false');
  });
}

function changeLanguage(lang){
  const next=lang==='en'?'en':'pt';
  try{localStorage.setItem(KEY,next)}catch(_){}
  document.documentElement.lang=next==='en'?'en':'pt-BR';
  document.documentElement.setAttribute('data-language',next==='en'?'en':'pt-BR');
  updateLanguageButtons();
  if(typeof window.yunaUniversalTranslate==='function'){
    window.yunaUniversalTranslate();
  }else if(typeof window.applyLanguage==='function'){
    window.applyLanguage();
  }
  /* Re-run once after page scripts have rendered their dynamic content. */
  setTimeout(()=>{
    if(typeof window.yunaUniversalTranslate==='function') window.yunaUniversalTranslate();
    updateLanguageButtons();
  },80);
}

function bindAuthoritativeLanguageButtons(){
  document.addEventListener('click',function(ev){
    const btn=ev.target.closest?.('.yuna-site-language button[data-lang], .yuna-controls button[data-lang], [data-academy-lang]');
    if(!btn) return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    changeLanguage(btn.getAttribute('data-lang')||btn.getAttribute('data-academy-lang'));
  },true);
  updateLanguageButtons();
}

function initFinalHeader(){
  removeSubpageHeaders();
  bindAuthoritativeLanguageButtons();
  updateLanguageButtons();
}
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',initFinalHeader,{once:true});
}else{
  initFinalHeader();
}
window.addEventListener('storage',function(e){
  if(e.key===KEY){
    updateLanguageButtons();
    setTimeout(()=>{if(typeof window.yunaUniversalTranslate==='function')window.yunaUniversalTranslate()},20);
  }
});
})();
