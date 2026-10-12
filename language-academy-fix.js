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