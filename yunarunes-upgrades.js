/* YunaRunes UX upgrade — additive, no login/account system */
(function(){
  'use strict';
  function addStyles(){if(document.getElementById('yunarunes-upgrade-style'))return;var l=document.createElement('link');l.id='yunarunes-upgrade-style';l.rel='stylesheet';l.href='yunarunes-upgrades.css?v=20261001';document.head.appendChild(l)}
  function quickBar(){
 if(document.querySelector('.yr-quickbar'))return;
 var main=document.querySelector('main'); if(!main)return;
 var bar=document.createElement('nav'); bar.className='yr-quickbar'; bar.setAttribute('aria-label','Acesso rápido');
 bar.innerHTML='<a href="index.html">🏠 Início</a><a href="database.html">👹 Database</a><a href="team-builder.html">⚔️ Equipa</a><a href="runes.html">🧿 Runas</a><a href="optimizer.html">⚙️ Optimizer</a><a href="artifact-optimizer.html">💠 Artifacts</a>';
 var first=main.firstElementChild; if(first) main.insertBefore(bar,first); else main.appendChild(bar);
}
function mobilePolish(){
 document.querySelectorAll('input,select,button,.btn,.chip').forEach(function(e){e.style.webkitTapHighlightColor='transparent'});
 document.querySelectorAll('a').forEach(function(e){e.style.webkitTapHighlightColor='transparent'});
 document.querySelectorAll('img').forEach(function(e){e.loading=e.loading||'lazy'});
}
function addPageTools(){
 var main=document.querySelector('main'); if(!main||document.querySelector('.yr-page-tools'))return;
 var headings=main.querySelectorAll('h1,h2'); if(!headings.length)return;
 var target=headings[0].closest('section,.card,.hero')||headings[0].parentElement;
 if(!target)return;
 var bar=document.createElement('div'); bar.className='yr-page-tools';
 var count=document.createElement('span'); count.className='yr-count'; count.textContent='YunaRunes • navegação rápida';
 bar.appendChild(count); target.appendChild(bar);
}
function addTop(){if(document.querySelector('.yr-top'))return;var b=document.createElement('button');b.className='yr-top';b.type='button';b.setAttribute('aria-label','Voltar ao topo');b.textContent='↑';document.body.appendChild(b);window.addEventListener('scroll',function(){b.classList.toggle('show',window.scrollY>420)},{passive:true});b.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})}}
  function keyboard(){document.addEventListener('keydown',function(e){if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement.tagName)){var x=document.querySelector('input[type="search"],input[placeholder*="Pesquisar" i],input[placeholder*="Search" i],#homeSearch');if(x){e.preventDefault();x.focus();x.classList.add('yr-focus');setTimeout(function(){x.classList.remove('yr-focus')},900)}}if(e.key==='Escape'){var t=document.getElementById('navToggle');if(t)t.checked=false}})}
  function home(){if(!location.pathname.endsWith('/')&&!location.pathname.endsWith('/index.html'))return;if(document.querySelector('.yr-upgrade-grid'))return;var anchor=document.querySelector('.quick');if(!anchor)return;var sec=document.createElement('section');sec.innerHTML='<div class="section-title"><h2>🧰 Ferramentas YunaRunes</h2><span></span></div><div class="yr-upgrade-grid">'+
    '<a class="yr-upgrade-card" href="database.html"><span class="yr-icon">👹</span><h3>Monster Database</h3><p>Pesquisa, filtros e informação dos monstros.</p></a>'+
    '<a class="yr-upgrade-card" href="team-builder.html"><span class="yr-icon">⚔️</span><h3>Team Builder</h3><p>Monta equipas e encontra combinações para cada conteúdo.</p></a>'+
    '<a class="yr-upgrade-card" href="runes.html"><span class="yr-icon">🧿</span><h3>Runes</h3><p>Consulta, calcula e organiza as tuas builds.</p></a>'+
    '<a class="yr-upgrade-card" href="optimizer.html"><span class="yr-icon">⚙️</span><h3>Optimizer</h3><p>Compara builds e procura melhores resultados.</p></a>'+
    '<a class="yr-upgrade-card" href="artifact-optimizer.html"><span class="yr-icon">💠</span><h3>Artifacts</h3><p>Analisa artefactos por função e eficiência.</p></a>'+
    '<a class="yr-upgrade-card" href="decks.html"><span class="yr-icon">🃏</span><h3>Decks</h3><p>Guarda e organiza equipas para diferentes conteúdos.</p></a>'+
    '<a class="yr-upgrade-card" href="account-analyzer.html"><span class="yr-icon">📊</span><h3>Account Analysis</h3><p>Analisa a evolução e qualidade do inventário.</p></a>'+
    '<a class="yr-upgrade-card" href="guild-tools.html"><span class="yr-icon">⚔️</span><h3>Guild / Siege</h3><p>Planeia defesas, ataques e matchups.</p></a>'+
    '</div>';anchor.insertAdjacentElement('afterend',sec);
    var news=document.createElement('section');news.className='yr-news';news.innerHTML='<h2>✨ YunaRunes</h2><div class="yr-news-list"><div class="yr-news-item"><b>🔎 Pesquisa rápida</b><span>Usa a pesquisa da página inicial para abrir diretamente o monstro que procuras.</span></div><div class="yr-news-item"><b>📱 Feito para PC e telefone</b><span>A navegação e os cartões adaptam-se a ecrãs pequenos.</span></div><div class="yr-news-item"><b>💾 Sem login obrigatório</b><span>As ferramentas que suportam dados locais podem guardar trabalho neste dispositivo.</span></div></div>';sec.insertAdjacentElement('afterend',news)}
  function markCards(){document.querySelectorAll('.card,.tool,.mob').forEach(function(x){x.addEventListener('keydown',function(e){if(e.key==='Enter')x.click()})})}
  function boot(){if(/YunaRunesApp|Android|iPhone|iPad|Mobile/i.test(navigator.userAgent)){document.documentElement.classList.add('yr-mobile-device')}if(/YunaRunesApp/i.test(navigator.userAgent)){document.documentElement.classList.add('yunarunes-app')}addStyles();addTop();quickBar();addPageTools();mobilePolish();keyboard();home();markCards()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
