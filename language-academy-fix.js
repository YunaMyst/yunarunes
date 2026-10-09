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
 let out=map[raw];if(!out){out=raw;for(const [a,b] of Object.entries(map).sort((x,y)=>y[0].length-x[0].length))if(a.length>2&&out.includes(a))out=out.split(a).join(b)}
 if(out!==raw)n.nodeValue=n.nodeValue.replace(raw,out);
 }
}
function boot(){translate();new MutationObserver(records=>records.forEach(r=>{if(r.type==='childList')r.addedNodes.forEach(n=>{if(n.nodeType===1)translate(n);else if(n.nodeType===3&&n.parentElement)translate(n.parentElement)})})).observe(document.body,{childList:true,subtree:true});window.addEventListener('storage',e=>{if(e.key==='yunarunes-language')translate()});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();