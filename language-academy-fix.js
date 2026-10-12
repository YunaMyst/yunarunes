(()=>{'use strict';
const pairs={
'A) +500 ATK, mas perco muita Speed':'A) +500 ATK, but I lose a lot of Speed',
'B) Menos ATK, mas mantenho o Speed Tune':'B) Less ATK, but I keep the Speed Tune',
'C) Troco o set inteiro sem testar':'C) I replace the entire set without testing',
'D) Escolho a runa com maior valor de venda':'D) I choose the rune with the highest sell value',
'Recruta':'Recruit','Aprendiz':'Apprentice','Invocador':'Summoner','Estrategista':'Strategist','Analista':'Analyst','Graduado':'Graduate',
'Monta equipes funcionais.':'Builds functional teams.','Recebe o certificado.':'Receives the certificate.',
'Concluída':'Completed','✓ Concluída':'✓ Completed','Aprender':'Learn',
'Simulador de Runas':'Rune Simulator','Tipo':'Type','Slot':'Slot','Raridade':'Rarity','Estrelas':'Stars',
'Fundamentos':'Fundamentals','Diagnóstico':'Diagnosis','Montar Equipas':'Build Teams','Montar equipes':'Build Teams',
'Combate':'Combat','Equipes':'Teams','Equipas':'Teams','Aprender Runas':'Learn Runes','Aprender Combate':'Learn Combat','Aprender a pensar':'Learn to think','Dicionário':'Dictionary','Laboratórios':'Labs','Testar meus conhecimentos':'Test my knowledge','Concluído':'Completed','Em progresso':'In progress','Bloqueado':'Locked','Próximo':'Next','Anterior':'Previous','Começar':'Start','Continuar':'Continue','Nome do jogador':'Player name','Pontuação':'Score','Certificado':'Certificate','Nível alcançado':'Level achieved','Velocidade':'Speed','Ataque':'Attack','Defesa':'Defense','Vida':'HP','Taxa Crítica':'Critical Rate','Dano Crítico':'Critical Damage','Precisão':'Accuracy','Resistência':'Resistance','Início':'Home','📚 Glossário':'📚 Glossary','🧪 Mecânicas':'🧪 Mechanics','⚡ Laboratório SPD':'⚡ SPD Lab','Equipas & Progressão':'Teams & Progression','🧙 Funções':'🧙 Roles','🏰 Conteúdo':'🏰 Content','📈 Progressão':'📈 Progression','Prática':'Practice','🧪 Laboratório':'🧪 Lab','📚 Micro-lições':'📚 Micro-lessons','🏆 Desafio Diário':'🏆 Daily Challenge','Avançado':'Advanced','💬 Pergunta à Academy':'💬 Ask the Academy','🎓 Graduação':'🎓 Graduation','Usa os simuladores e a árvore de habilidades enquanto avanças nas aulas.':'Use the simulators and skill tree as you progress through the lessons.','A Academia agora funciona como uma jornada: primeiro aprende o básico, depois toma decisões, diagnostica erros e só então enfrenta a graduação.':'The Academy is now a learning journey: first learn the basics, then make decisions, diagnose mistakes, and only then take the graduation exam.','Uma ordem simples para quem acabou de começar. Não tenta ensinar tudo de uma vez.':'A simple path for beginners. It does not try to teach everything at once.','Funções e skills':'Roles and skills','Entendi que o objetivo não é ter todos os monstros, e sim construir uma conta funcional.':'I understand the goal is not to own every monster, but to build a functional account.','Sei diferenciar função de monstro: dano, suporte, controle, proteção e utilidade.':'I can distinguish monster roles: damage, support, control, protection, and utility.','Consigo montar um primeiro time com funções que se complementam.':'I can build a first team with complementary roles.','🧠 PENSAMENTO ESTRATÉGICO':'🧠 STRATEGIC THINKING','Antes de copiar uma build, faça estas quatro perguntas:':'Before copying a build, ask these four questions:','Qual é a função?':'What is the role?','Qual é a condição de vitória?':'What is the win condition?','Escolha stats pela função, não pelo número bonito.':'Choose stats based on the role, not on impressive-looking numbers.','Não troque todas as runas antes de descobrir o problema.':'Do not replace all runes before identifying the problem.'
};
function translate(root=document.body){
 const lang=(localStorage.getItem('yunarunes-language')==='en')?'en':'pt';
 const map=lang==='en'?pairs:Object.fromEntries(Object.entries(pairs).map(([a,b])=>[b,a]));
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 for(const n of nodes){const p=n.parentElement;if(!p||p.closest('script,style,noscript,textarea,code,pre,[contenteditable="true"]'))continue;
 const raw=n.nodeValue.trim();if(!raw)continue;
 // Preserve the official game title while translating the rest of the sentence.
 const GAME='Summoners War';
 let source=raw.replace(/Invocadores\s*War/gi,GAME);
 const hasGame=/Summoners\s+War/i.test(source);
 if(hasGame)source=source.replace(/Summoners\s+War/gi,'__YUNA_OFFICIAL_GAME_NAME__');
 let out=map[source];if(!out){out=source;for(const [a,b] of Object.entries(map).sort((x,y)=>y[0].length-x[0].length))if(a.length>2&&out.includes(a))out=out.split(a).join(b)}
 out=out.replace(/__YUNA_OFFICIAL_GAME_NAME__/g,GAME);
 if(out!==raw)n.nodeValue=n.nodeValue.replace(raw,out);
 }
}
function protectName(root=document){
 const scope=root&&root.querySelectorAll?root:document;
 const fixNode=n=>{if(n&&n.nodeType===3&&/invocadores\\s*war/i.test(n.nodeValue||''))n.nodeValue=n.nodeValue.replace(/invocadores\\s*war/gi,'Summoners War')};
 const walker=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT);
 const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(fixNode);
 if(scope.nodeType===1)for(const n of [...scope.childNodes])fixNode(n);
}
function boot(){
 translate();protectName();
 const observer=new MutationObserver(records=>records.forEach(r=>{
  if(r.type==='characterData')protectName(r.target.parentElement||document);
  if(r.type==='childList')r.addedNodes.forEach(n=>{if(n.nodeType===1){translate(n);protectName(n)}else if(n.nodeType===3&&n.parentElement){translate(n.parentElement);protectName(n.parentElement)}});
 }));
 observer.observe(document.body,{childList:true,subtree:true,characterData:true});
 window.addEventListener('storage',e=>{if(e.key==='yunarunes-language'){translate();protectName()}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

/* YUNA ACADEMY LANGUAGE COMPLETENESS PATCH */
(function(){
'use strict';
const STORE='yunarunes-language';
const extra={
'Progresso:':'Progress:','Nível:':'Level:','Missões:':'Missions:','Escolha um termo.':'Choose a term.',
'Escolha um problema para receber uma hipótese de diagnóstico.':'Choose a problem to get a possible diagnosis.',
'Entendi que o objetivo não é ter todos os monstros, e sim construir uma conta funcional.':'I understand the goal is not to own every monster, but to build a functional account.',
'Sei diferenciar função de monstro: dano, suporte, controle, proteção e utilidade.':'I can distinguish monster roles: damage, support, control, protection, and utility.',
'Sei que runas melhoram stats e que o set deve servir ao monstro.':'I know runes improve stats and the set should fit the monster.',
'Consigo montar um primeiro time com funções que se complementam.':'I can build a first team with complementary roles.',
'Consigo explicar a função de cada monstro do meu time.':'I can explain each monster’s role on my team.',
'Sei olhar uma runa e dizer se os stats fazem sentido para o monstro.':'I can look at a rune and tell whether its stats make sense for the monster.',
'Consigo explicar o que é Speed Tune.':'I can explain what Speed Tuning is.',
'Sei diferenciar ACC e RES.':'I can distinguish ACC and RES.',
'Consigo identificar uma possível causa de uma derrota.':'I can identify a possible cause of a loss.',
'Consigo adaptar uma equipe quando o conteúdo muda.':'I can adapt a team when the content changes.',
'💎 Pegue uma runa e explique por que você a usaria ou venderia.':'💎 Pick a rune and explain why you would use or sell it.',
'⚔️ Monte um time em que cada monstro tenha uma função clara.':'⚔️ Build a team where each monster has a clear role.',
'🧭 Faça uma Speed Tune simples e escreva a ordem esperada.':'🧭 Create a simple Speed Tune and write down the expected turn order.',
'🕵️ Analise uma derrota sem trocar nenhuma runa primeiro.':'🕵️ Analyze a loss without changing any runes first.',
'🧪 Use o Simulador de Runas e compare duas opções.':'🧪 Use the Rune Simulator and compare two options.',
'🎮 Use o Simulador de Combate e explique por que uma estratégia venceu.':'🎮 Use the Battle Simulator and explain why a strategy won.',
'🏆 Faça a Prova de Graduação quando se sentir preparado.':'🏆 Take the Graduation Exam when you feel ready.',
'💎 Cristais':'💎 Crystals','Prioridade':'Priority','Espera':'Wait',
'Quem ganha esta battle?':'Who wins this battle?','Monta uma team do zero':'Build a team from scratch',
'Pergunta à Yuna Academy':'Ask Yuna Academy','Objetivo':'Goal',
'Yuna Academy — Mode Interativo':'Yuna Academy — Interactive Mode','Yesulador de battle':'Battle Simulator',
'Aprenda na prática':'Learn by doing','Aprenda a pensar como jogador':'Learn to think like a player',
'Qual é a função?':'What is the role?','Qual é a condição de vitória?':'What is the win condition?',
'Quais stats permitem isso?':'Which stats make that possible?','O que realmente falhou?':'What actually failed?',
'Meu suporte sempre joga depois do inimigo.':'My support always moves after the enemy.',
'Meu DPS morre antes de conseguir atacar.':'My DPS dies before it can attack.',
'Meu monstro de controle quase nunca aplica debuffs.':'My control unit rarely lands debuffs.',
'Eu sobrevivo, mas não consigo derrotar o inimigo.':'I survive, but I cannot defeat the enemy.',
'Estou pronto para avançar?':'Am I ready to progress?','Termos que você precisa entender':'Terms you need to understand',
'Clique para revelar uma explicação curta. Os termos também aparecem nas aulas e nos desafios.':'Click to reveal a short explanation. These terms also appear in lessons and challenges.',
'Seu caminho até a graduação':'Your path to graduation','Conta':'Account','Monstros':'Monsters',
'Objetivo inicial':'Initial goal','Funções e habilidades':'Roles and skills','Atributos principais':'Main stats',
'Primeira equipe':'First team','Recruta':'Recruit','Aprendiz':'Apprentice','Invocador':'Summoner',
'Estrategista':'Strategist','Analista':'Analyst','Mestre':'Master','Grande Mestre':'Grand Master','Graduado':'Graduate'
};
function english(){try{return localStorage.getItem(STORE)==='en'}catch(e){return false}}
function apply(root){
 const en=english();
 root.querySelectorAll?.('[data-en][data-pt]').forEach(el=>{
   if(!el.children.length){const v=el.getAttribute(en?'data-en':'data-pt');if(v!==null&&el.textContent!==v)el.textContent=v;}
 });
 const map=en?extra:Object.fromEntries(Object.entries(extra).map(([a,b])=>[b,a]));
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 for(const n of nodes){
   const p=n.parentElement;if(!p||p.closest('script,style,noscript,textarea,code,pre,[contenteditable="true"]'))continue;
   const raw=n.nodeValue;const t=raw.trim();if(!t)continue;
   if(p.hasAttribute('data-en')&&p.hasAttribute('data-pt'))continue;
   let out=map[t];
   if(!out){out=t;for(const [a,b] of Object.entries(map).sort((x,y)=>y[0].length-x[0].length))if(a.length>2&&out.includes(a))out=out.split(a).join(b);}
   if(out!==t)n.nodeValue=raw.replace(t,out);
 }
}
function boot(){
 apply(document);
 document.addEventListener('click',()=>setTimeout(()=>apply(document),0),true);
 window.addEventListener('storage',e=>{if(e.key===STORE)apply(document)});
 new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.nodeType===1)apply(n);}).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

/* Last-pass translator for hard-coded/dynamic Academy text */
(function(){
'use strict';var K='yunarunes-language';
var D={
'🏠 Início':'🏠 Home','📊 Análise de Conta':'📊 Account Analysis','⚡ Laboratório SPD':'⚡ SPD Lab','Equipas & Progressão':'Teams & Progression','🧙 Funções':'🧙 Roles','🏰 Conteúdo':'🏰 Content','📈 Progressão':'📈 Progression','Prática':'Practice','🧪 Laboratório':'🧪 Lab','📚 Micro-lições':'📚 Micro-lessons','🏆 Desafio Diário':'🏆 Daily Challenge','Avançado':'Advanced','🎓 Graduação':'🎓 Graduation','Nível:':'Level:','Missões:':'Missions:',
'Gere uma runa, melhore até +15 e veja como os rolls das substats evoluem.':'Generate a rune, upgrade it to +15, and see how substat rolls evolve.','Escolha as opções e clique em Gerar Runa.':'Choose the options and click Generate Rune.','Simulador educativo para treinar análise de runas. Os valores são aproximados e não representam uma cópia das tabelas internas do jogo.':'Educational rune-analysis simulator. Values are approximate and do not reproduce the game’s internal tables.','Gere uma runa para começar.':'Generate a rune to get started.','⭐ Nível':'⭐ Level','Estratégia':'Strategy','⚡ Próximo turno':'⚡ Next turn','← Água':'← Water','Água':'Water','4. 🧪 Otimização':'4. 🧪 Optimization','🎯 Concluir missão +25 XP':'🎯 Complete mission +25 XP','⚡ Sei o que é SPD':'⚡ I know what SPD is',
'Agora a Academy não serve apenas para ler. Você pode testar decisões, diagnosticar equipes, avaliar runas e aprender através de situações práticas.':'The Academy is not just for reading. You can test decisions, diagnose teams, evaluate runes, and learn through practical scenarios.','Uma equipe está falhando. Escolha o diagnóstico mais importante.':'A team is failing. Choose the most important diagnosis.','💀 Morre rápido':'💀 Dies quickly','🎲 Deixar aleatório':'🎲 Randomize','💎 Essa runa é boa?':'💎 Is this rune good?','Para um DPS rápido, qual opção faz mais sentido?':'For a fast DPS, which option makes the most sense?','Complete a trilha, desafios e provas para desbloquear títulos.':'Complete the path, challenges, and exams to unlock titles.','🌱 1. Comecei hoje: o que é o quê?':'🌱 1. I started today: what is what?','Evolução:':'Progression:','🍖 O que não fazer':'🍖 What not to do','Não alimente um monstro importante sem confirmar.':'Do not feed an important monster without checking first.','Não use Devilmon em qualquer monstro.':'Do not use Devilmon on just any monster.','Não venda uma runa boa só porque parece estranha.':'Do not sell a good rune just because it looks unusual.','Não copie uma build sem entender a função.':'Do not copy a build without understanding its role.','Aprenda primeiro a reconhecer slot, main stat e substats. Não escolha uma runa apenas pela cor.':'First learn to recognize slots, main stats, and substats. Do not choose a rune based only on its color.','A ordem aparecerá aqui.':'The order will appear here.','qual é o gargalo':'what the bottleneck is','qual mudança testar primeiro':'which change to test first','Função → condição de vitória → stats → runas → Speed Tune → teste → ajuste.':'Role → win condition → stats → runes → Speed Tune → test → adjust.',
'🎯 Yuna Academy • Missões':'🎯 Yuna Academy • Missions','Elementos + interface + funções':'Elements + interface + roles','Concluir missão':'Complete mission','🚀 Yuna Academy • Nível seguinte':'🚀 Yuna Academy • Next level','🩺 Diagnóstico rápido':'🩺 Quick diagnosis','💎 Decisão de runa':'💎 Rune decision','Não escolha pela quantidade de números. Pense na função do monstro e no objetivo da build.':'Do not choose by the number of stats. Think about the monster’s role and the build’s goal.','Monte a lógica da equipe antes de pensar no dano final.':'Build the team’s logic before thinking about final damage.','ATB/boost, setup ou proteção.':'ATB boost, setup, or protection.','Strip, debuff ou redução.':'Strip, debuff, or reduction.','Controle, dano ou condição de vitória.':'Control, damage, or win condition.','⚡ Verificar lógica':'⚡ Check the logic','Antes de entrar num conteúdo difícil, marque o que você sabe.':'Before entering difficult content, check what you know.','🏰 Avaliar preparação':'🏰 Check readiness','Uma equipe não precisa ter cinco monstros fortes. Ela precisa cobrir o que a missão exige.':'A team does not need five strong monsters. It needs to cover what the mission requires.','Aprenda a escolher o próximo farm pelo gargalo da conta, não pelo conteúdo mais difícil que você consegue entrar.':'Choose your next farming target based on your account’s bottleneck, not the hardest content you can enter.',
'🏆 Yuna Academy • Prova prática':'🏆 Yuna Academy • Practical Exam','🌳 Yuna Academy • Árvore de habilidades':'🌳 Yuna Academy • Skill Tree','Nível 1 • 0/6 habilidades':'Level 1 • 0/6 skills','🌱 Comece pelo primeiro nó: Fundamentos.':'🌱 Start with the first node: Fundamentals.','↺ Resetar árvore':'↺ Reset tree','✓ Concluir nível':'✓ Complete level','🏫 Yuna Academy • Formação completa':'🏫 Yuna Academy • Complete Training','Do primeiro dia até o jogo competitivo':'From your first day to competitive play','Progressão, recursos, decisões de runas, combate, equipes, Speed Tune, artefatos, aprimoramentos e PvP.':'Progression, resources, rune decisions, combat, teams, Speed Tune, artifacts, upgrades, and PvP.','Começo':'Beginner','Otimização':'Optimization','Decisão e draft':'Decision-making and draft','Treine uma decisão que todo jogador precisa aprender.':'Practice a decision every player needs to learn.','💡 A função, slot, grau e substats mudam a decisão.':'💡 Role, slot, grade, and substats affect the decision.','Monte pelo plano, não pelo ranking':'Build around a plan, not a ranking','Escolha a função que falta numa equipe.':'Choose the role your team is missing.','O time não começa bem.':'The team does not get off to a good start.','📊 SPEED TUNE AVANÇADO':'📊 ADVANCED SPEED TUNING','Treine a diferença entre velocidade individual e velocidade útil para a equipe.':'Practice the difference between individual Speed and Speed that benefits the team.','Buffer ficou mais rápido e passou na frente do opener.':'The buffer became faster and moved ahead of the opener.','DPS ficou mais rápido e perdeu a ordem.':'The DPS became faster and disrupted the turn order.','Equipe mantém a ordem e o segundo ciclo.':'The team keeps its turn order and second rotation.','💡 Speed Tune é uma decisão de equipe.':'💡 Speed Tuning is a team decision.','Laboratório de Artefatos':'Artifact Lab','Aprenda tipo, atributo, propriedade principal, subpropriedades e reavaliação.':'Learn artifact type, attribute, main property, sub-properties, and reappraisal.','♻️ Reavaliação':'♻️ Reappraisal','Otimização de substats':'Substat Optimization','Leia a defesa, condição de vitória e consistência.':'Consider defense, win condition, and consistency.','Pense em counters, segurança e repetibilidade.':'Think about counters, safety, and consistency.','Treine draft, ban, prioridade e adaptação.':'Practice drafting, bans, priority, and adaptation.','🧠 PROVA DE RACIOCÍNIO':'🧠 REASONING EXAM','Você consegue explicar por que escolheu essa opção?':'Can you explain why you chose this option?','Pense como um jogador: a melhor escolha não é a que parece mais forte, mas a que faz sentido para a função e para o seu plano.':'Think like a player: the best choice is not the one that looks strongest, but the one that fits the role and your plan.','Uso porque tem o maior número.':'I use it because it has the highest number.','Uso porque os stats atendem à função e ao plano.':'I use it because the stats fit the role and plan.','Uso porque é Legend, então é sempre melhor.':'I use it because it is Legend, so it is always better.','Pronto para a graduação?':'Ready to graduate?','⚔️ Já tenho equipa':'⚔️ I already have a team','🎲 Escolher só pelo nome do Set':'🎲 Choose based only on the set name','❌ Fazer uma equipa só com dano':'❌ Build a team with damage only','1. 🗺️ Cenário':'1. 🗺️ Scenario','Pensamento Estratégico':'Strategic Thinking','Começa a entender buffs e debuffs.':'Start understanding buffs and debuffs.','Escolhe conscientemente o teu próximo conteúdo.':'Choose your next content deliberately.','Quem joga primeiro? Quem está perto de encher a barra? A SPD e a ordem importam.':'Who moves first? Who is close to filling the bar? SPD and turn order matter.','Considera atributo, HP, skills, ameaça e efeitos antes de escolher.':'Consider element, HP, skills, threats, and effects before choosing.','Buffs ajudam; debuffs atrapalham. Aprende os ícones antes de aprender dezenas de nomes.':'Buffs help; debuffs hinder. Learn the icons before memorizing dozens of names.','4. 🧠 Decisão':'4. 🧠 Decision','Não uses uma skill só porque está disponível. Pergunta qual ação cria a melhor situação para o próximo turno.':'Do not use a skill just because it is available. Ask which action creates the best situation for the next turn.','Primeiro aprende a diferença entre slot, Main Stat e Substats.':'First learn the difference between a slot, Main Stat, and Substats.','Velocidade muda quem joga e quando. Não é automaticamente a melhor stat para todos os monstros.':'Speed changes who moves and when. It is not automatically the best stat for every monster.','Crítico precisa de consistência e dano. Não olhes para uma stat isoladamente.':'Critical hits require consistency and damage. Do not look at a stat in isolation.','Aprende a comparar uma runa com o objetivo do monstro, não apenas pela raridade.':'Learn to compare a rune with the monster’s goal, not just its rarity.','DPS/Nuker cria pressão.':'DPS/Nuker creates pressure.','Healer, sustain, shield ou proteção mantém a equipa viva.':'Healer, sustain, shields, or protection keep the team alive.','Control impede ou limita as ações inimigas.':'Control prevents or limits enemy actions.','Joguei, mas não matei? Investiga dano, debuffs, setup e alvo.':'I took a turn but did not kill? Check damage, debuffs, setup, and target.','Morri depois de alguns turnos? Investiga sustain, defesa, cura e gestão de cooldowns.':'Died after a few turns? Check sustain, defense, healing, and cooldown management.','🗺️ Cenário':'🗺️ Scenario','Bom para conhecer o jogo e continuar a progressão inicial.':'Good for learning the game and continuing early progression.','Foca farming e construção de monstros/runas.':'Focus on farming and building monsters/runes.','Entra quando já consegues compreender velocidade, draft, efeitos e win conditions.':'Enter when you understand Speed, drafting, effects, and win conditions.','Aprende composição, objetivos e consistência em conteúdo coletivo.':'Learn composition, objectives, and consistency in group content.','📈 Otimização':'📈 Optimization','Já não perguntas apenas “qual é a build?”. Perguntas “qual é o objetivo e qual é o menor investimento que o resolve?”.':'You no longer ask only “what is the build?” You ask “what is the goal, and what is the smallest investment that solves it?”','Aprende a ordenar a equipa para que buffs, debuffs, control e DPS aconteçam no momento certo.':'Arrange the team so buffs, debuffs, control, and DPS happen at the right time.','Procura os pontos onde uma pequena mudança altera o resultado da equipa.':'Look for points where a small change alters the team’s result.','Uma equipa forte não é apenas a que consegue um clear perfeito uma vez; é a que repete o resultado.':'A strong team is not just one that gets a perfect clear once; it is one that can repeat the result.',
'💎 Cristais':'💎 Crystals','Prioridade':'Priority','Espera':'Wait','Quem ganha esta battle?':'Who wins this battle?','Monta uma team do zero':'Build a team from scratch','Pergunta à Yuna Academy':'Ask Yuna Academy','Objetivo':'Goal','Yuna Academy — Mode Interativo':'Yuna Academy — Interactive Mode','Yesulador de battle':'Battle Simulator','Imunidade':'Immunity','imunidade':'immunity','Elementos':'Elements','Fogo':'Fire','Vento':'Wind','Luz':'Light','Trevas':'Dark','Runas':'Runes','Artefatos':'Artifacts','Equipa':'Team','equipa':'team','Equipes':'Teams','equipes':'teams','Condição de vitória':'Win condition','condição de vitória':'win condition','Velocidade':'Speed','velocidade':'Speed','Clique para continuar':'Click to continue','Começar agora':'Start now','Voltar':'Back','Próxima pergunta':'Next question','Fazer novamente':'Try again','Concluir':'Complete','Concluído':'Completed','Bloqueado':'Locked','Em progresso':'In progress','Aprender':'Learn','Testar':'Test','Escolher':'Choose','Gerar Runa':'Generate Rune','Melhorar':'Upgrade','Resetar':'Reset','Aulas de 60 segundos':'60-second lessons','Medalhas especiais':'Special medals','Aprenda com categoria':'Learn by category','Monta uma equipa do zero':'Build a team from scratch','Pergunta à Yuna Academy':'Ask Yuna Academy','Aprende na prática':'Learn by doing'
};
function isEn(){try{return localStorage.getItem(K)==='en'}catch(e){return false}}
function apply(){
 if(!isEn())return;
 document.querySelectorAll('[data-pt][data-en]').forEach(function(el){
  var value=el.getAttribute('data-en');if(value===null)return;
  if(el.matches('input,textarea')){el.placeholder=value;return;}
  var w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),ns=[];while(w.nextNode())ns.push(w.currentNode);
  if(ns.length){ns[0].nodeValue=value;for(var i=1;i<ns.length;i++)ns[i].nodeValue=''}
 });
 var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),ns=[];while(w.nextNode())ns.push(w.currentNode);
 ns.forEach(function(n){var p=n.parentElement;if(!p||p.closest('script,style,noscript,textarea,code,pre,[contenteditable="true"],[data-pt][data-en]'))return;var raw=n.nodeValue,t=raw.trim();if(!t)return;var out=D[t];if(!out){out=t;Object.keys(D).sort(function(a,b){return b.length-a.length}).forEach(function(k){if(k.length>3&&out.indexOf(k)!==-1)out=out.split(k).join(D[k])})}if(out!==t)n.nodeValue=raw.replace(t,out)});
}
document.addEventListener('click',function(e){if(e.target.closest('[data-lang]'))setTimeout(apply,0)},true);
window.addEventListener('yunarunes-language-applied',function(){setTimeout(apply,0)});
document.addEventListener('DOMContentLoaded',apply);
new MutationObserver(function(ms){if(ms.some(function(m){return m.type==='characterData'||m.addedNodes.length}))setTimeout(apply,0)}).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
setTimeout(apply,0);setTimeout(apply,300);setTimeout(apply,1000);
})();

/* Final English cleanup for remaining Academy labels and dynamically-rendered text. */
(function(){
'use strict';
var words={
'Comece Aqui':'Start Here','Comece aqui':'Start here','Roteiro da Conta':'Account Roadmap','Escola de Monstros':'Monster School','Escola de Batalha':'Battle School','Escola de Runas':'Rune School','Decisor de Runas':'Rune Decision Tool','Jornada do Novo Jogador':'New Player Journey','Desafio de Equipa':'Team Challenge','Pergunta à Academy':'Ask the Academy','Aprenda a Jogar':'Learn to Play','Aprenda na prática':'Learn by Doing','Aprenda com categoria':'Learn by category','Aulas de 60 segundos':'60-second lessons','Medalhas especiais':'Special medals','Pergunta à Yuna Academy':'Ask Yuna Academy','Monta uma team do zero':'Build a team from scratch','Monta uma equipa do zero':'Build a team from scratch','Quem ganha esta battle?':'Who wins this battle?','Yesulador de battle':'Battle Simulator','Yuna Academy — Mode Interativo':'Yuna Academy — Interactive Mode','💎 Cristais':'💎 Crystals','Cristais':'Crystals','Prioridade':'Priority','Espera':'Wait','Objetivo':'Goal','Imunidade':'Immunity','imunidade':'immunity','Início':'Home','Voltar':'Back','Próxima pergunta':'Next question','Pergunta anterior':'Previous question','Fazer novamente':'Try again','Começar agora':'Start now','Concluir missão':'Complete mission','Concluir':'Complete','Concluído':'Completed','Concluída':'Completed','Bloqueado':'Locked','Em progresso':'In progress','Nível alcançado':'Level achieved','Nome do jogador':'Player name','Pontuação':'Score','Certificado':'Certificate','Escolha uma opção':'Choose an option','Escolha uma opção:':'Choose an option:','Escolha o objetivo':'Choose the goal','Escolha o objetivo:':'Choose the goal:','Escolha a função':'Choose the role','Escolha a função:':'Choose the role:','Escolha uma reclamação:':'Choose a problem:','Escolha um problema':'Choose a problem','Escolha um problema:':'Choose a problem:','A resposta aparece aqui.':'The answer will appear here.','A explicação aparece depois da resposta.':'The explanation appears after you answer.','Clique para continuar':'Click to continue','Clique para revelar uma explicação curta.':'Click to reveal a short explanation.','Gerar Runa':'Generate Rune','Melhorar':'Upgrade','Resetar':'Reset','Árvore resetada. Comece novamente pelos fundamentos.':'Skill tree reset. Start again with the fundamentals.','O que você aprendeu?':'What did you learn?','O que aprendeste?':'What did you learn?','Teste os seus conhecimentos':'Test your knowledge','Testar meus conhecimentos':'Test my knowledge','Meu time morre rápido':'My team dies quickly','A minha equipa morre rapidamente':'My team dies quickly','Está lento':'It is too slow','Está lenta':'It is too slow','Não aplica debuffs':'Does not land debuffs','Causa pouco dano':'Deals too little damage','Não consigo jogar primeiro':'I cannot move first','Quem joga primeiro?':'Who moves first?','A runa é boa?':'Is this rune good?','Essa runa é boa?':'Is this rune good?','O que devo melhorar primeiro?':'What should I improve first?','Qual é a condição de vitória?':'What is the win condition?','Qual é a função?':'What is the role?','Quais stats permitem isso?':'Which stats make that possible?','O que realmente falhou?':'What actually failed?','Meu suporte sempre joga depois do inimigo.':'My support always moves after the enemy.','Meu DPS morre antes de conseguir atacar.':'My DPS dies before it can attack.','Meu monstro de controle quase nunca aplica debuffs.':'My control unit rarely lands debuffs.','Eu sobrevivo, mas não consigo derrotar o inimigo.':'I survive, but I cannot defeat the enemy.','Morre rápido':'Dies quickly','Deixar aleatório':'Randomize','Build de Runas':'Rune Build','Montar Equipas':'Build Teams','Aprender Runas':'Learn Runes','Aprender Combate':'Learn Combat','Aprender a pensar':'Learn to think','Dicionário':'Dictionary','Laboratórios':'Labs','Combate':'Combat','Runas':'Runes','Artefatos':'Artifacts','Equipa':'Team','equipa':'team','Equipes':'Teams','equipes':'teams','Elementos':'Elements','Fogo':'Fire','Água':'Water','Vento':'Wind','Luz':'Light','Trevas':'Dark','Velocidade':'Speed','velocidade':'speed','Ataque':'Attack','Defesa':'Defense','Vida':'HP','Precisão':'Accuracy','Resistência':'Resistance','Taxa Crítica':'Critical Rate','Dano Crítico':'Critical Damage','Avançado':'Advanced','Prática':'Practice','Fundamentos':'Fundamentals','Diagnóstico':'Diagnosis','Estratégia':'Strategy','Estratégia de combate':'Combat strategy','Aprendiz':'Apprentice','Recruta':'Recruit','Invocador':'Summoner','Estrategista':'Strategist','Analista':'Analyst','Mestre':'Master','Graduado':'Graduate','Missões':'Missions','Nível':'Level','Experiência':'Experience','Progresso':'Progress','Recompensas':'Rewards','Desbloqueado':'Unlocked','Bloqueado':'Locked','Próximo nível':'Next level','Desafio diário':'Daily challenge','Desafio prático':'Practical challenge','Prova de Graduação':'Graduation Exam','Prova prática':'Practical Exam','Árvore de habilidades':'Skill Tree','Laboratório de Artefatos':'Artifact Lab','Otimização de substats':'Substat Optimization','Decisão e draft':'Decision-making and draft','Pensamento Estratégico':'Strategic Thinking','Começo':'Beginner','Otimização':'Optimization','Objetivo inicial':'Initial goal','Funções e habilidades':'Roles and skills','Primeira equipe':'First team','Aprenda primeiro a reconhecer slot, main stat e substats.':'First learn to recognize slots, main stats, and substats.','Não escolha uma runa apenas pela cor.':'Do not choose a rune based only on its color.','Não use Devilmon em qualquer monstro.':'Do not use Devilmon on just any monster.','Não venda uma runa boa só porque parece estranha.':'Do not sell a good rune just because it looks unusual.','Não copie uma build sem entender a função.':'Do not copy a build without understanding its role.','A ordem aparecerá aqui.':'The order will appear here.','Antes de entrar num conteúdo difícil, marque o que você sabe.':'Before entering difficult content, check what you know.','Monte a lógica da equipe antes de pensar no dano final.':'Build the team’s logic before thinking about final damage.','Uma equipe não precisa ter cinco monstros fortes.':'A team does not need five strong monsters.','Ela precisa cobrir o que a missão exige.':'It needs to cover what the mission requires.','A melhor escolha não é a que parece mais forte.':'The best choice is not the one that looks strongest.','Pense na função do monstro e no objetivo da build.':'Think about the monster’s role and the build’s goal.','Aprenda a pensar como jogador':'Learn to think like a player','Escolha o conteúdo':'Choose content','Escolher':'Choose','Testar':'Test','Aprender':'Learn','Guardar':'Save','Cancelar':'Cancel','Confirmar':'Confirm','Pesquisar':'Search','Procurar':'Search','Pesquisar...':'Search...','Escreve aqui':'Type here','Digite aqui':'Type here','A tua resposta':'Your answer','Sua resposta':'Your answer','Resposta':'Answer','Explicação':'Explanation','Resultado':'Result','Tentar novamente':'Try again','Ver resultado':'View result','Continuar':'Continue','Anterior':'Previous','Seguinte':'Next','Próximo':'Next','Simulador de Runas':'Rune Simulator','Simulador de Combate':'Battle Simulator','Simulador de batalha':'Battle Simulator','Condição de vitória':'Win condition','condição de vitória':'win condition','Qual é o objetivo?':'What is the goal?','Escolha uma resposta':'Choose an answer','Escolhe uma resposta':'Choose an answer','Resposta correta':'Correct answer','Resposta incorreta':'Incorrect answer','Muito bem!':'Well done!','Tenta novamente.':'Try again.','Tente novamente.':'Try again.','Boa escolha!':'Good choice!','Não é a melhor opção.':'That is not the best option.','A tua equipa':'Your team','Sua equipe':'Your team','O teu time':'Your team','O seu time':'Your team'
};
function isEnglish(){try{return localStorage.getItem('yunarunes-language')==='en'||new URLSearchParams(location.search).get('lang')==='en'}catch(e){return document.documentElement.lang==='en'}}
function run(){
 if(!isEnglish())return;
 var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),nodes=[];
 while(walker.nextNode())nodes.push(walker.currentNode);
 var keys=Object.keys(words).sort(function(a,b){return b.length-a.length});
 nodes.forEach(function(n){
  var p=n.parentElement;
  if(!p||p.closest('script,style,noscript,textarea,input,code,pre,[contenteditable="true"],[data-pt][data-en]'))return;
  var raw=n.nodeValue;if(!raw||!raw.trim())return;var out=raw;
  keys.forEach(function(k){if(out.indexOf(k)!==-1)out=out.split(k).join(words[k])});
  if(out!==raw)n.nodeValue=out;
 });
 document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(function(el){
  var v=el.placeholder;keys.forEach(function(k){if(v.indexOf(k)!==-1)v=v.split(k).join(words[k])});el.placeholder=v;
 });
}
var scheduled=false;
function schedule(){if(scheduled)return;scheduled=true;setTimeout(function(){scheduled=false;run()},0)}
window.addEventListener('yunarunes-language-applied',schedule);
document.addEventListener('click',schedule,true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
})();
