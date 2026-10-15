(()=>{'use strict';
const pairs={
'🔬 Comparar':'🔬 Compare',
'Speed: influencia a ordem e frequência dos turnos.':'Speed affects turn order and how frequently monsters take turns.',
'⚠️ Erro comum: achar que o maior SPD sozinho garante vitória.':'⚠️ Common mistake: assuming the highest SPD alone guarantees victory.',
'Accuracy: ajuda a aplicar efeitos que dependem de Accuracy.':'Accuracy helps land effects that depend on Accuracy.',
'⚠️ Erro comum: pensar que 100% ACC significa 100% de aplicação.':'⚠️ Common mistake: assuming 100% ACC means a 100% chance to land an effect.',
'Resistance: participa das verificações de resistência contra efeitos.':'Resistance is used in resistance checks against effects.',
'⚠️ Erro comum: ignorar o alvo e olhar apenas sua própria ACC.':'⚠️ Common mistake: ignoring the target and looking only at your own ACC.',
'Controle que impede o monstro de agir durante o efeito.':'Control that prevents a monster from taking action while the effect lasts.',
'⚠️ Erro comum: confundir STUN com STRIP.':'⚠️ Common mistake: confusing STUN with STRIP.',
'Gíria para uma ativação adicional/efeito que ocorre por uma mecânica do jogo.':'Slang for an extra activation or effect triggered by a game mechanic.',
'⚠️ Erro comum: usar PROC como se fosse sinônimo de qualquer efeito.':'⚠️ Common mistake: using PROC as if it meant any kind of effect.',
'Remoção de buffs.':'Removal of buffs.',
'⚠️ Erro comum: escolher um stripper sem considerar velocidade, skill e consistência.':'⚠️ Common mistake: choosing a stripper without considering Speed, skills, and consistency.',
'Remoção de debuffs de um aliado.':'Removal of debuffs from an ally.',
'⚠️ Erro comum: confundir cleanse com imunidade.':'⚠️ Common mistake: confusing cleanse with immunity.',
'Crowd Control: conjunto de efeitos que limitam ações ou controle do inimigo.':'Crowd Control: a group of effects that limit or control enemy actions.',
'⚠️ Erro comum: considerar apenas STUN como CC.':'⚠️ Common mistake: thinking STUN is the only form of CC.',
'Função focada em causar dano.':'A role focused on dealing damage.',
'⚠️ Erro comum: maximizar dano e esquecer sobrevivência ou ordem de turnos.':'⚠️ Common mistake: maximizing damage while ignoring survivability or turn order.',
'Ajuste de velocidades para preservar uma sequência planejada.':'Adjusting monster Speeds to preserve a planned turn order.',
'Ajuste de Speeds para preservar uma sequência planejada.':'Adjusting monster Speeds to preserve a planned turn order.',
'⚠️ Erro comum: montar velocidades isoladamente sem testar a equipe inteira.':'⚠️ Common mistake: tuning Speeds individually without testing the whole team.',
'⚠️ Erro comum: montar Speeds isoladamente sem testar a equipe inteira.':'⚠️ Common mistake: tuning Speeds individually without testing the whole team.',
'Efeito positivo aplicado a um aliado.':'A beneficial effect applied to an ally.',
'⚠️ Erro comum: assumir que todo buff tem o mesmo valor em qualquer conteúdo.':'⚠️ Common mistake: assuming every buff is equally useful in every game mode.',
'Efeito negativo aplicado a um inimigo.':'A harmful effect applied to an enemy.',
'⚠️ Erro comum: esquecer ACC, RES ou chance da skill.':'⚠️ Common mistake: forgetting ACC, RES, or the skill activation chance.',
'⚠️ Erro comum: esquecer ACC, RES ou chance da skill.':'⚠️ Common mistake: forgetting ACC, RES, or the skill activation chance.',
'Efeito negativo aplicado a um inimigo.':'A negative effect applied to an enemy.',
'⚠️ Erro comum: assumir que todo buff tem o mesmo valor em qualquer conteúdo.':'⚠️ Common mistake: assuming every buff has the same value in every game mode.',
'Efeito positivo aplicado a um aliado.':'A positive effect applied to an ally.',
'⚠️ Erro comum: montar Speeds isoladamente sem testar a equipe inteira.':'⚠️ Common mistake: tuning Speeds individually without testing the whole team.',
'Ajuste de Speeds para preservar uma sequência planejada.':'Adjusting Speeds to preserve a planned turn sequence.',
'⚠️ Erro comum: maximizar dano e esquecer sobrevivência ou ordem de turnos.':'⚠️ Common mistake: maximizing damage while forgetting survivability or turn order.',
'Função focada em causar dano.':'A role focused on dealing damage.',
'⚠️ Erro comum: considerar apenas STUN como CC.':'⚠️ Common mistake: considering only STUN as CC.',
'Crowd Control: conjunto de efeitos que limitam ações ou controle do inimigo.':'Crowd Control: a group of effects that limit enemy actions or control.',
'⚠️ Erro comum: confundir cleanse com immunity.':'⚠️ Common mistake: confusing cleanse with immunity.',
'Remoção de debuffs de um aliado.':'Removal of debuffs from an ally.',
'⚠️ Erro comum: escolher um stripper sem considerar Speed, skill e consistência.':'⚠️ Common mistake: choosing a stripper without considering Speed, skills, and consistency.',
'Remoção de buffs.':'Removal of buffs.',
'⚠️ Erro comum: usar PROC como se fosse sinônimo de qualquer efeito.':'⚠️ Common mistake: using PROC as if it were synonymous with any effect.',
'Gíria para uma ativação adicional/efeito que ocorre por uma mecânica do jogo.':'Slang for an additional activation or effect triggered by a game mechanic.',
'⚠️ Erro comum: confundir STUN com STRIP.':'⚠️ Common mistake: confusing STUN with STRIP.',
'Controle que impede o monstro de agir durante o efeito.':'Control that prevents the monster from acting while the effect lasts.',
'⚠️ Erro comum: ignorar o alvo e olhar apenas sua própria ACC.':'⚠️ Common mistake: ignoring the target and looking only at your own ACC.',
'Resistance: participa das verificações de resistência contra efeitos.':'Resistance is used in resistance checks against effects.',
'⚠️ Erro comum: pensar que 100% ACC significa 100% de aplicação.':'⚠️ Common mistake: thinking 100% ACC means a 100% chance to apply an effect.',
'Accuracy: ajuda a aplicar efeitos que dependem de Accuracy.':'Accuracy helps apply effects that depend on Accuracy.',
'⚠️ Erro comum: achar que o maior SPD sozinho garante vitória.':'⚠️ Common mistake: thinking the highest SPD alone guarantees victory.',
'Speed: influencia a ordem e frequência dos turnos.':'Speed affects the order and frequency of turns.',
'Build strategy':'Build strategy',
'Colocar HP em todos':'Put HP on everyone',
'Ajustar SPD/ATB':'Adjust SPD/ATB',
'Debuff falha':'Debuff fails',
'SPD +18, CR +12, ATK% +8':'SPD +18, CR +12, ATK% +8',
'HP% +20':'HP% +20',
'❤️ Colocar HP em todos':'❤️ Put HP on everyone',
'⚡ Ajustar SPD/ATB':'⚡ Adjust SPD/ATB',
'🎯 Debuff falha':'🎯 Debuff fails',
'🐌 Nunca joga':'🐌 Never gets the first turn',
'🕵️ Descubra o erro':'🕵️ Find the Mistake',
'🌱 Primeiro passo':'🌱 First Steps',
'💎 Master das runas':'💎 Rune Master',
'🧪 Cientista':'🧪 Scientist',
'⚔️ Strategist':'⚔️ Strategist',
'💯 Perfeito':'💯 Perfect',
'🧙 Sei montar teams':'🧙 I Can Build Teams',
'Low damage':'Low damage',
'Debuffs falham':'Debuffs fail',
'Nunca jogo primeiro':'I never get the first turn',
'💎 I Can Choose Runes':'💎 I Can Choose Runes',
'⚡ I know what SPD is':'⚡ I know what SPD is',
'A) +500 ATK, mas perco muita Speed':'A) +500 ATK, but I lose a lot of Speed',
'B) Menos ATK, mas mantenho o Speed Tune':'B) Less ATK, but I keep the Speed Tune',
'C) Troco o set inteiro sem testar':'C) I replace the entire set without testing',
'D) Escolho a runa com maior valor de venda':'D) I choose the rune with the highest sell value',
'Recruta':'Recruit','Aprendiz':'Apprentice','Invocador':'Summoner','Estrategista':'Strategist','Analista':'Analyst','Graduado':'Graduate',
'Monta equipes funcionais.':'Builds functional teams.','Recebe o certificado.':'Receives the certificate.',
'Concluída':'Completed','✓ Concluída':'✓ Completed','Aprender':'Learn',
'Simulador de Runas':'Rune Simulator','Tipo':'Type','Slot':'Slot','Raridade':'Rarity','Estrelas':'Stars',
'Fundamentos':'Fundamentals','Diagnóstico':'Diagnosis','Montar Equipas':'Build Teams','Montar equipes':'Build Teams',
'Combate':'Combat','Equipes':'Teams','Equipas':'Teams','Aprender Runas':'Learn Runes','Aprender Combate':'Learn Combat','Aprender a pensar':'Learn to think','Dicionário':'Dictionary','Laboratórios':'Labs','Testar meus conhecimentos':'Test my knowledge','Concluído':'Completed','Em progresso':'In progress','Bloqueado':'Locked','Próximo':'Next','Anterior':'Previous','Começar':'Start','Continuar':'Continue','Nome do jogador':'Player name','Pontuação':'Score','Certificado':'Certificate','Nível alcançado':'Level achieved','Velocidade':'Speed','Ataque':'Attack','Defesa':'Defense','Vida':'HP','Taxa Crítica':'Critical Rate','Dano Crítico':'Critical Damage','Precisão':'Accuracy','Resistência':'Resistance','Início':'Home','📚 Glossário':'📚 Glossary','🧪 Mecânicas':'🧪 Mechanics','⚡ Laboratório SPD':'⚡ SPD Lab','Equipas & Progressão':'Teams & Progression','🧙 Funções':'🧙 Roles','🏰 Conteúdo':'🏰 Content','📈 Progressão':'📈 Progression','Prática':'Practice','🧪 Laboratório':'🧪 Lab','📚 Micro-lições':'📚 Micro-lessons','🏆 Desafio Diário':'🏆 Daily Challenge','Avançado':'Advanced','💬 Pergunta à Academy':'💬 Ask the Academy','🎓 Graduação':'🎓 Graduation','Usa os simuladores e a árvore de habilidades enquanto avanças nas aulas.':'Use the simulators and skill tree as you progress through the lessons.','A Academia agora funciona como uma jornada: primeiro aprende o básico, depois toma decisões, diagnostica erros e só então enfrenta a graduação.':'The Academy is now a learning journey: first learn the basics, then make decisions, diagnose mistakes, and only then take the graduation exam.','Uma ordem simples para quem acabou de começar. Não tenta ensinar tudo de uma vez.':'A simple path for beginners. It does not try to teach everything at once.','Funções e skills':'Roles and skills','Entendi que o objetivo não é ter todos os monstros, e sim construir uma conta funcional.':'I understand the goal is not to own every monster, but to build a functional account.','Sei diferenciar função de monstro: dano, suporte, controle, proteção e utilidade.':'I can distinguish monster roles: damage, support, control, protection, and utility.','Consigo montar um primeiro time com funções que se complementam.':'I can build a first team with complementary roles.','🧠 PENSAMENTO ESTRATÉGICO':'🧠 STRATEGIC THINKING','Antes de copiar uma build, faça estas quatro perguntas:':'Before copying a build, ask these four questions:','Qual é a função?':'What is the role?','Qual é a condição de vitória?':'What is the win condition?','Escolha stats pela função, não pelo número bonito.':'Choose stats based on the role, not on impressive-looking numbers.','Não troque todas as runas antes de descobrir o problema.':'Do not replace all runes before identifying the problem.',
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
};function english(){try{return localStorage.getItem('yunarunes-language')==='en'||new URLSearchParams(location.search).get('lang')==='en'}catch(e){return document.documentElement.lang==='en'}}
var keys=Object.keys(W).sort(function(a,b){return b.length-a.length});
function escapeRegExp(value){return value.split('').map(function(ch){return '\\^$.*+?()[]{}|'.indexOf(ch)>=0?'\\'+ch:ch}).join('')}
var matcher=new RegExp(keys.map(escapeRegExp).join('|'),'g');
function translate(root){
 if(!english()||!root)return;
 var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
 while(walker.nextNode())nodes.push(walker.currentNode);
 nodes.forEach(function(node){
  var parent=node.parentElement;
  if(!parent||parent.closest('script,style,noscript,textarea,input,code,pre,[contenteditable="true"],[data-pt][data-en]'))return;
  var raw=node.nodeValue;if(!raw||!raw.trim())return;
  var out=raw.replace(matcher,function(key){return Object.prototype.hasOwnProperty.call(W,key)?W[key]:key});
  if(out!==raw)node.nodeValue=out;
 });
}
function translateAdded(records){
 var pending=new Set();
 records.forEach(function(record){
  record.addedNodes.forEach(function(node){
   if(node.nodeType===1&&!node.matches('script,style,noscript')&&!node.closest('script,style,noscript,[data-no-translate]'))pending.add(node);
  });
 });
 var roots=[];
 pending.forEach(function(node){
  var parent=node.parentElement,nested=false;
  while(parent){if(pending.has(parent)){nested=true;break}parent=parent.parentElement}
  if(!nested)roots.push(node);
 });
 roots.forEach(translate);
}
function fullTranslate(){translate(document.body)}
window.addEventListener('yunarunes-language-applied',fullTranslate);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fullTranslate,{once:true});else fullTranslate();
if(document.body)new MutationObserver(translateAdded).observe(document.body,{subtree:true,childList:true});
})();