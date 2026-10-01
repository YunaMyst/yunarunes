/* YunaRunes UX upgrade — additive, no login/account system */
(function(){
  'use strict';
  const FAV='yunarunes-favorites';

  function addStyles(){
    if(document.getElementById('yunarunes-upgrade-style'))return;
    var l=document.createElement('link');
    l.id='yunarunes-upgrade-style';
    l.rel='stylesheet';
    l.href='yunarunes-upgrades.css?v=20261001-v2';
    document.head.appendChild(l);
  }

  function favs(){
    try{return JSON.parse(localStorage.getItem(FAV)||'[]')}catch(_){return []}
  }
  function saveFavs(a){localStorage.setItem(FAV,JSON.stringify(a.slice(0,100)))}
  function favKey(name){return String(name||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-')}
  function toggleFavorite(name,url){
    if(!name)return;
    var a=favs(),k=favKey(name),i=a.findIndex(x=>x.key===k);
    if(i>=0)a.splice(i,1);else a.unshift({key:k,name:name,url:url||('monster-view.html?name='+encodeURIComponent(name))});
    saveFavs(a); refreshFavoriteButtons(); renderHomeFavorites();
  }
  function refreshFavoriteButtons(){
    var set=new Set(favs().map(x=>x.key));
    document.querySelectorAll('.yr-fav').forEach(function(b){
      var on=set.has(b.dataset.key);
      b.textContent=on?'★':'☆';
      b.classList.toggle('is-favorite',on);
      b.setAttribute('aria-label',on?'Remover dos favoritos':'Adicionar aos favoritos');
      b.title=on?'Remover dos favoritos':'Adicionar aos favoritos';
    });
  }
  function addFavoriteButton(card,name,url){
    if(!card||!name||card.querySelector('.yr-fav'))return;
    if(getComputedStyle(card).position==='static')card.style.position='relative';
    var b=document.createElement('button');
    b.type='button';b.className='yr-fav';b.dataset.key=favKey(name);
    b.textContent='☆';
    b.onclick=function(e){e.preventDefault();e.stopPropagation();toggleFavorite(name,url)};
    card.appendChild(b);
  }
  function databaseFavorites(){
    if(!location.pathname.endsWith('database.html'))return;
    document.querySelectorAll('#grid .card').forEach(function(card){
      var n=card.querySelector('.name');if(n)addFavoriteButton(card,n.textContent.trim(),card.getAttribute('href'));
    });
  }
  function monsterPageFavorite(){
    var path=location.pathname;
    if(!/monster-view\.html$/.test(path))return;
    if(document.querySelector('.yr-monster-favorite'))return;
    var title=document.querySelector('h1,.monster-name,.name');
    if(!title)return;
    var name=title.textContent.replace(/^[^A-Za-zÀ-ÿ0-9]+/,'').trim();
    if(!name)return;
    var b=document.createElement('button');b.type='button';b.className='btn secondary yr-monster-favorite';
    b.innerHTML='☆ Favorito';
    b.onclick=function(){toggleFavorite(name,location.href);b.classList.toggle('is-favorite',favs().some(x=>x.key===favKey(name)));b.innerHTML=b.classList.contains('is-favorite')?'★ Favorito':'☆ Favorito'};
    title.insertAdjacentElement('afterend',b);
  }
  function renderHomeFavorites(){
    if(!(location.pathname.endsWith('/')||location.pathname.endsWith('/index.html')))return;
    var old=document.querySelector('.yr-favorites');if(old)old.remove();
    var a=favs();if(!a.length)return;
    var anchor=document.querySelector('.featured');if(!anchor)return;
    var sec=document.createElement('section');sec.className='yr-favorites';
    sec.innerHTML='<div class="section-title"><h2>⭐ Os meus favoritos</h2><button type="button" class="yr-clear-favs">Limpar favoritos</button></div><div class="yr-fav-grid">'+a.slice(0,8).map(function(x){return '<a class="yr-fav-card" href="'+String(x.url).replace(/"/g,'&quot;')+'"><span>★</span><b>'+String(x.name).replace(/[&<>]/g,'')+'</b><small>Abrir ficha →</small></a>'}).join('')+'</div>';
    anchor.insertAdjacentElement('afterend',sec);
    sec.querySelector('.yr-clear-favs').onclick=function(){saveFavs([]);renderHomeFavorites();refreshFavoriteButtons()};
  }
  function homeSearchEnhance(){
    if(!(location.pathname.endsWith('/')||location.pathname.endsWith('/index.html')))return;
    var input=document.getElementById('homeSearch');if(!input)return;
    input.setAttribute('aria-label','Pesquisar monstros');
  }
  function addTop(){
    if(document.querySelector('.yr-top'))return;
    var b=document.createElement('button');b.className='yr-top';b.type='button';b.setAttribute('aria-label','Voltar ao topo');b.textContent='↑';
    document.body.appendChild(b);
    window.addEventListener('scroll',function(){b.classList.toggle('show',window.scrollY>420)},{passive:true});
    b.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};
  }
  function keyboard(){
    document.addEventListener('keydown',function(e){
      if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement.tagName)){
        var x=document.querySelector('input[type="search"],input[placeholder*="Pesquisar" i],input[placeholder*="Search" i],#homeSearch');
        if(x){e.preventDefault();x.focus();x.classList.add('yr-focus');setTimeout(function(){x.classList.remove('yr-focus')},900)}
      }
      if(e.key==='Escape'){var t=document.getElementById('navToggle');if(t)t.checked=false}
    });
  }
  function mobilePolish(){
    document.querySelectorAll('input,select,button,.btn,.chip').forEach(function(e){e.style.webkitTapHighlightColor='transparent'});
    document.querySelectorAll('a').forEach(function(e){e.style.webkitTapHighlightColor='transparent'});
    document.querySelectorAll('img').forEach(function(e){e.loading=e.loading||'lazy'});
  }
  function boot(){
    if(/YunaRunesApp|Android|iPhone|iPad|Mobile/i.test(navigator.userAgent))document.documentElement.classList.add('yr-mobile-device');
    if(/YunaRunesApp/i.test(navigator.userAgent))document.documentElement.classList.add('yunarunes-app');
    addStyles();addTop();keyboard();mobilePolish();homeSearchEnhance();
    setTimeout(function(){
      databaseFavorites();monsterPageFavorite();renderHomeFavorites();refreshFavoriteButtons();
    },350);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();