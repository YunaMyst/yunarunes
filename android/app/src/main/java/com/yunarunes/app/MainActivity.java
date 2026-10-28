package com.yunarunes.app;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private WebView webView;
    private static final String HOME = "https://yunarunes.com/";

    private static final String APP_CLEANUP =
        "(function(){\n"
        + "  function apply(){\n"
        + "    var top=document.querySelector('header.top');\n"
        + "    var nav=top && top.querySelector(':scope > .nav');\n"
        + "    if(nav && !nav.querySelector(':scope > .header-brand')){var b=nav.querySelector(':scope > .brand');if(b){var w=document.createElement('div');w.className='header-brand';nav.insertBefore(w,b);w.appendChild(b);}}\n"
        + "    if(nav && !nav.querySelector(':scope > .header-menu')){var m=nav.querySelector(':scope > .menu-btn');if(m){var w=document.createElement('div');w.className='header-menu';nav.appendChild(w);w.appendChild(m);}}\n"
        + "    if(nav && !nav.querySelector(':scope > .header-controls')){var y=nav.querySelector(':scope > .yuna-controls');if(y){var w=document.createElement('div');w.className='header-controls';nav.appendChild(w);w.appendChild(y);}}\n"
        + "    var brand=top && top.querySelector(':scope > .nav > .header-brand');\n"
        + "    var menuWrap=top && top.querySelector(':scope > .nav > .header-menu');\n"
        + "    var menu=menuWrap && menuWrap.querySelector('.menu-btn');\n"
        + "    var controls=top && top.querySelector(':scope > .nav > .header-controls');\n"
        + "    var langs=controls && controls.querySelector('.yuna-controls');\n"
        + "    if(!nav||!menuWrap||!menu||!controls||!langs)return;\n"
        + "\n"
        + "    top.style.setProperty('width','100%','important');\n"
        + "    top.style.setProperty('overflow','visible','important');\n    document.documentElement.style.setProperty('width','100%','important');\n    document.body.style.setProperty('width','100%','important');\n    document.body.style.setProperty('min-width','0','important');\n    document.body.style.setProperty('margin','0','important');\n    document.body.style.setProperty('padding','0','important');\n    document.body.style.setProperty('overflow-x','hidden','important');\n    top.style.setProperty('position','relative','important');\n    top.style.setProperty('left','0','important');\n    top.style.setProperty('right','auto','important');\n    top.style.setProperty('transform','none','important');\n    top.style.setProperty('margin-left','0','important');\n    top.style.setProperty('margin-right','0','important');\n    top.style.setProperty('box-sizing','border-box','important');\n"
        + "\n"
        + "    nav.style.setProperty('display','grid','important');\n"
        + "    nav.style.setProperty('grid-template-columns','42px minmax(0,1fr)','important');\n    nav.style.setProperty('grid-template-areas','\"menu brand\" \"controls controls\" \"links links\"','important');\n"
        + "    nav.style.setProperty('align-items','center','important');\n"
        + "    nav.style.setProperty('justify-content','stretch','important');\n"
        + "    nav.style.setProperty('flex-wrap','wrap','important');\n"
        + "    nav.style.setProperty('width','100%','important');\n"
        + "    nav.style.setProperty('max-width','none','important');\n"
        + "    nav.style.setProperty('min-height','0','important');\n"
        + "    nav.style.setProperty('box-sizing','border-box','important');\n"
        + "    nav.style.setProperty('padding','8px 10px 10px','important');\n"
        + "    nav.style.setProperty('gap','8px','important');\n    nav.style.setProperty('grid-template-rows','auto auto auto','important');\n"
        + "    nav.style.setProperty('margin','0','important');\n"
        + "\n"
        + "    // APP: keep YunaRunes visible and prevent the left text from being clipped.\n"
+ "    if(brand){\n"
+ "      brand.style.setProperty('display','flex','important');\n      brand.style.setProperty('grid-area','brand','important');\n      brand.style.setProperty('grid-column','2','important');\n      brand.style.setProperty('grid-row','1','important');\n"
+ "      brand.style.setProperty('flex','0 0 auto','important');\n"
+ "      brand.style.setProperty('width','auto','important');\n"
+ "      brand.style.setProperty('min-width','max-content','important');\n"
+ "      brand.style.setProperty('max-width','none','important');\n"
+ "      brand.style.setProperty('overflow','visible','important');\n"
+ "      brand.style.setProperty('white-space','nowrap','important');\n"
+ "      brand.style.setProperty('flex-shrink','0','important');\n"
+ "      brand.style.setProperty('visibility','visible','important');\n"
+ "      brand.style.setProperty('margin','0','important');\n"
+ "      brand.style.setProperty('padding','0','important');\n"
+ "    }\n"
+ "\n"
        + "    menuWrap.style.setProperty('display','block','important');\n    menuWrap.style.setProperty('grid-area','menu','important');\n    menuWrap.style.setProperty('grid-column','1','important');\n    menuWrap.style.setProperty('grid-row','1','important');\n"
        + "    menuWrap.style.setProperty('position','static','important');\n"
        + "    menuWrap.style.setProperty('flex','0 0 auto','important');\n"
        + "    menuWrap.style.setProperty('width','auto','important');\n"
        + "    menuWrap.style.setProperty('min-width','0','important');\n"
        + "    menuWrap.style.setProperty('margin','0','important');\n"
        + "    menuWrap.style.setProperty('padding','0','important');\n"
        + "    menuWrap.style.setProperty('overflow','visible','important');\n"
        + "    menuWrap.style.setProperty('order','1','important');\n"
        + "\n"
        + "    menu.style.setProperty('display','inline-flex','important');\n"
        + "    menu.style.setProperty('position','static','important');\n"
        + "    menu.style.setProperty('margin','0','important');\n"
        + "    menu.style.setProperty('padding','10px 13px','important');\n"
        + "    menu.style.setProperty('min-height','42px','important');\n"
        + "    menu.style.setProperty('height','42px','important');\n"
        + "    menu.style.setProperty('box-sizing','border-box','important');\n"
        + "    menu.style.setProperty('font-size','17px','important');\n"
        + "    menu.style.setProperty('line-height','1','important');\n"
        + "    menu.style.setProperty('white-space','nowrap','important');\n"
        + "    menu.style.setProperty('flex','0 0 auto','important');\n"
        + "    // APP: lower Menu for easier tapping.\n"
        + "    menu.style.setProperty('transform','none','important');\n"
        + "\n"
        + "    controls.style.setProperty('display','flex','important');\n"
        + "    controls.style.setProperty('align-items','center','important');\n"
        + "    controls.style.setProperty('justify-content','stretch','important');\n"
        + "    controls.style.setProperty('position','static','important');\n"
        + "    controls.style.setProperty('flex','1 1 100%','important');\n"
        + "    controls.style.setProperty('width','100%','important');\n"
        + "    controls.style.setProperty('min-width','0','important');\n"
        + "    controls.style.setProperty('max-width','100%','important');\n"
        + "    controls.style.setProperty('height','auto','important');\n"
        + "    controls.style.setProperty('margin','0','important');\n    controls.style.setProperty('grid-area','controls','important');\n    controls.style.setProperty('grid-column','1 / -1','important');\n    controls.style.setProperty('grid-row','2','important');\n"
        + "    controls.style.setProperty('padding','0','important');\n"
        + "    controls.style.setProperty('transform','none','important');\n"
        + "    controls.style.setProperty('order','2','important');\n"
        + "    controls.style.setProperty('overflow','visible','important');\n"
        + "\n"
        + "    langs.style.setProperty('display','flex','important');\n"
        + "    langs.style.setProperty('align-items','center','important');\n"
        + "    langs.style.setProperty('justify-content','center','important');\n"
        + "    langs.style.setProperty('flex-wrap','wrap','important');\n"
        + "    langs.style.setProperty('gap','4px','important');\n"
        + "    langs.style.setProperty('width','100%','important');\n"
        + "    langs.style.setProperty('min-width','0','important');\n"
        + "    langs.style.setProperty('max-width','100%','important');\n"
        + "    langs.style.setProperty('height','auto','important');\n"
        + "    langs.style.setProperty('margin','0','important');\n"
        + "    langs.style.setProperty('padding','0','important');\n"

        + "\n"
        + "    var links=nav.querySelector('.nav-links');\n    var toggle=nav.querySelector('.nav-toggle');\n    if(links){links.style.setProperty('grid-area','links','important');links.style.setProperty('grid-column','1 / -1','important');links.style.setProperty('grid-row','3','important');}\n"
        + "    if(links){\n"
        + "      links.style.setProperty('display',toggle&&toggle.checked?'grid':'none','important');\n      if(toggle && !toggle.dataset.yunaMenuBound){toggle.dataset.yunaMenuBound='1';toggle.addEventListener('change',function(){links.style.setProperty('display',toggle.checked?'grid':'none','important');});}\n"
        + "      links.style.setProperty('position','relative','important');\n"
        + "      links.style.setProperty('left','auto','important');\n"
        + "      links.style.setProperty('right','auto','important');\n"
        + "      links.style.setProperty('width','100%','important');\n"
        + "      links.style.setProperty('max-width','none','important');\n"
        + "      links.style.setProperty('z-index','10004','important');\n"
        + "    }\n"
        + "\n"
        + "    document.documentElement.style.setProperty('overflow-x','hidden','important');\n"
        + "    document.body.style.setProperty('overflow-x','hidden','important');\n"
        + "  }\n"
        + "\n"
        + "  function clean(){\n"
        + "    document.querySelectorAll('.mobile-download').forEach(function(e){e.remove();});\n"
        + "    document.querySelectorAll('.section-title').forEach(function(e){\n"
        + "      var h=e.querySelector('h2');\n"
        + "      if(h && /YunaRunes no celular|YunaRunes on mobile/i.test(h.textContent)){\n"
        + "        var n=e.nextElementSibling;if(n)n.remove();e.remove();\n"
        + "      }\n"
        + "    });\n"
        + "    document.querySelectorAll('a,button,label,[role=\"button\"]').forEach(function(e){\n"
        + "      var t=(e.textContent||'').trim();\n"
        + "      var href=(e.getAttribute('href')||'').toLowerCase();\n"
        + "      if(/\\bAPK\\b/i.test(t)||href.indexOf('.apk')!==-1)e.remove();\n"
        + "    });\n"
        + "    apply();\n"
        + "  }\n"
        + "\n"
        + "  apply();\n"
        + "  clean();\n"
        + "  // Apply header layout once after page load; avoid repeated DOM restyling that can make controls flicker.\n"
        + "})();";


    // Features below are injected by the Android WebView only; the public website is unchanged.
    private static final String APP_FEATURES =
        "(function(){try{"
        + "if(!navigator.userAgent.includes('YunaRunesApp'))return;"
        + "var p=location.pathname.toLowerCase();"
        + "var read=function(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}};"
        + "var write=function(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}};"
        + "var en=function(){return (document.documentElement.lang||'').toLowerCase().indexOf('en')===0};"
        + "var tr=function(pt,eng){return en()?eng:pt};"
        + "var esc=function(v){return String(v||'').replace(/[&<>\\\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\\\"':'&quot;',\"'\":'&#39;'}[c]})};"
        + "if(p.indexOf('team-builder')!==-1){"
        + "var lastKey='yunarunes-app-team-last-v1',savedKey='yunarunes-app-team-saved-v1';"
        + "var q=document.getElementById('search'),mode=document.getElementById('mode'),side=document.getElementById('side'),out=document.getElementById('out');"
        + "if(q&&mode&&side&&out&&!document.getElementById('yuna-app-saved-teams')){"
        + "var panel=document.createElement('section');panel.id='yuna-app-saved-teams';panel.style.cssText='margin:16px 0;padding:14px;background:#141b23;border:1px solid #2a3743;border-radius:12px;color:#f2f6fa';"
        + "out.parentNode.insertBefore(panel,out);"
        + "var cfg=function(){return {monster:q.value||'',mode:mode.value||'arena',side:side.value||'attack'}};"
        + "var restore=function(x,run){if(!x)return;q.value=x.monster||'';mode.value=x.mode||'arena';side.value=x.side||'attack';mode.dispatchEvent(new Event('change'));if(run&&q.value&&typeof window.build==='function')window.build()};"
        + "var render=function(){var a=read(savedKey,[]);if(!Array.isArray(a))a=[];panel.innerHTML='<h3>'+tr('💾 Equipas guardadas','💾 Saved teams')+'</h3><p>'+tr('A última pesquisa fica guardada automaticamente. Guarda aqui as equipas para voltares a elas mais tarde.','Your last search is saved automatically. Save teams here to return to them later.')+'</p><div style=\"display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px\"><input id=\"yuna-app-team-name\" maxlength=60 placeholder=\"'+tr('Nome da equipa','Team name')+'\" style=\"flex:1;min-width:130px;padding:10px;background:#0b1015;color:#fff;border:1px solid #2a3743;border-radius:7px\"><button id=\"yuna-app-save-team\" style=\"padding:10px;border:0;border-radius:7px;background:#35a9e1;color:#071018;font-weight:bold\">'+tr('Guardar equipa atual','Save current team')+'</button></div>'+(a.length?a.map(function(x,i){return '<div style=\"display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:9px 0;border-top:1px solid #2a3743\"><span style=\"flex:1;min-width:120px\"><b>'+esc(x.name||x.monster)+'</b><small style=\"display:block;color:#95a4b2\">'+esc(x.monster)+' · '+esc(x.mode)+' · '+esc(x.side)+'</small></span><button data-load=\"'+i+'\">'+tr('Abrir','Load')+'</button><button data-delete=\"'+i+'\">'+tr('Apagar','Delete')+'</button></div>'}).join(''):'<p style=\"color:#95a4b2\">'+tr('Ainda não guardaste equipas.','No saved teams yet.')+'</p>');};"
        + "panel.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var a=read(savedKey,[]);if(b.id==='yuna-app-save-team'){var c=cfg();if(!c.monster.trim()){alert(tr('Escolhe um monstro e cria uma equipa primeiro.','Choose a monster and build a team first.'));return}var n=(document.getElementById('yuna-app-team-name').value||'').trim()||c.monster;a.unshift({name:n,monster:c.monster,mode:c.mode,side:c.side});if(!write(savedKey,a.slice(0,50))){alert(tr('Não foi possível guardar os dados.','Could not save data.'));return}render()}else if(b.hasAttribute('data-load')){restore(a[Number(b.dataset.load)],true);write(lastKey,cfg())}else if(b.hasAttribute('data-delete')){a.splice(Number(b.dataset.delete),1);write(savedKey,a);render()}});"
        + "var prior=read(lastKey,null);if(prior&&prior.monster){var status=document.getElementById('status');var obs=new MutationObserver(function(){if(status&&/monstros carregados|monsters loaded/i.test(status.textContent||'')){restore(prior,true);obs.disconnect()}});if(status)obs.observe(status,{childList:true,subtree:true,characterData:true)};}"
        + "var remember=function(){var c=cfg();if(c.monster.trim())write(lastKey,c)};document.getElementById('buildBtn')&&document.getElementById('buildBtn').addEventListener('click',remember);q.addEventListener('change',remember);mode.addEventListener('change',remember);side.addEventListener('change',remember);render();"
        + "}"
        + "}"
        + "if(p.indexOf('database')!==-1){"
        + "var favKey='yunarunes-app-favorite-monsters-v1',only=false,grid=document.getElementById('grid');"
        + "if(grid&&!document.getElementById('yuna-app-fav-filter')){"
        + "var toggle=document.createElement('button');toggle.id='yuna-app-fav-filter';toggle.textContent=tr('☆ Ver apenas favoritos','☆ Show favorites only');toggle.style.cssText='margin:0 0 12px;padding:10px;border:1px solid #30363d;border-radius:8px;background:#161b22;color:#e6edf3;font-weight:bold';grid.parentNode.insertBefore(toggle,grid);"
        + "var favorites=function(){var a=read(favKey,[]);return Array.isArray(a)?a:[]};"
        + "var name=function(c){return c.querySelector('.name')?.textContent?.trim()||new URL(c.href,location.href).searchParams.get('name')||''};"
        + "var renderFav=function(){grid.querySelectorAll('a.card').forEach(function(c){var n=name(c);if(!n)return;var b=c.querySelector('.yuna-app-fav');if(!b){b=document.createElement('button');b.type='button';b.className='yuna-app-fav';b.style.cssText='position:absolute;top:8px;right:8px;z-index:5;width:36px;height:36px;border:1px solid #526171;border-radius:50%;background:#101923;color:#ffd86b;font-size:22px';c.style.position='relative';c.appendChild(b);b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();var a=favorites(),exists=a.some(function(x){return x.toLowerCase()===n.toLowerCase()});a=exists?a.filter(function(x){return x.toLowerCase()!==n.toLowerCase()}):[n].concat(a);write(favKey,a);b.textContent=exists?'☆':'★';if(only)renderFav()})}b.textContent=favorites().some(function(x){return x.toLowerCase()===n.toLowerCase()})?'★':'☆';c.style.display=(!only||favorites().some(function(x){return x.toLowerCase()===n.toLowerCase()}))?'':'none'});toggle.textContent=only?tr('★ Ver todos os monstros','★ Show all monsters'):tr('☆ Ver apenas favoritos','☆ Show favorites only')};"
        + "toggle.addEventListener('click',function(){only=!only;renderFav()});new MutationObserver(renderFav).observe(grid,{childList:true,subtree:true});renderFav();"
        + "}"
        + "}"
        + "var appNav=document.querySelector('.nav-links');\n"
        + "var appSection=null;\n"
        + "function appOpenRecommendations(){\n"
        + " if(!appSection){\n"
        + "  appSection=document.createElement('div');\n"
        + "  appSection.id='yuna-app-recommended-screen';\n"
        + "  appSection.style.cssText='position:fixed;inset:0;z-index:2147483000;overflow:auto;background:#0b1118;color:#edf4fb;padding:18px 14px 30px;box-sizing:border-box;font-family:inherit';\n"
        + "  document.body.appendChild(appSection);\n"
        + " }\n"
        + " var cards=[\n"
        + "  {id:'beasts',title:tr('🐲 Bestas Elementais','🐲 Elemental Beasts'),desc:tr('Fogo, Água, Vento, Luz e Escuridão. Equipas para pontuação e consistência.','Fire, Water, Wind, Light and Dark. Teams for score and consistency.')},\n"
        + "  {id:'cairos',title:tr('🏰 Cairos','🏰 Cairos'),desc:tr('Gigante, Dragão, Necrotério e outras masmorras.','Giants, Dragons, Necropolis and other dungeons.')},\n"
        + "  {id:'r5',title:tr('🐉 Raid 5 (R5)','🐉 Raid 5 (R5)'),desc:tr('Formação da frente e retaguarda, sobrevivência e dano.','Front and back line, survival and damage.')},\n"
        + "  {id:'fire',title:tr('🔥 Raide Elemental de Fogo','🔥 Fire Elemental Raid'),desc:tr('Estratégias e equipas específicas para o chefe de Fogo.','Strategies and teams for the Fire boss.')},\n"
        + "  {id:'water',title:tr('💧 Raide Elemental de Água','💧 Water Elemental Raid'),desc:tr('Estratégias e equipas específicas para o chefe de Água.','Strategies and teams for the Water boss.')},\n"
        + "  {id:'wind',title:tr('🌪️ Raide Elemental de Vento','🌪️ Wind Elemental Raid'),desc:tr('Estratégias e equipas específicas para o chefe de Vento.','Strategies and teams for the Wind boss.')},\n"
        + "  {id:'light',title:tr('✨ Raide Elemental de Luz','✨ Light Elemental Raid'),desc:tr('Estratégias e equipas específicas para o chefe de Luz.','Strategies and teams for the Light boss.')},\n"
        + "  {id:'dark',title:tr('🌑 Raide Elemental de Escuridão','🌑 Dark Elemental Raid'),desc:tr('Estratégias e equipas específicas para o chefe de Escuridão.','Strategies and teams for the Dark boss.')}\n"
        + " ];\n"
        + " var title=tr('Equipas Recomendadas','Recommended Teams');\n"
        + " appSection.innerHTML='<div style=\"max-width:900px;margin:0 auto\"><button id=\"yuna-app-rec-close\" style=\"padding:10px 14px;border:1px solid #405263;border-radius:9px;background:#17232f;color:#fff;font-weight:bold;margin-bottom:16px\">← '+tr('Voltar à página','Back to page')+'</button><div style=\"font-size:28px;font-weight:800;margin:4px 0 8px\">🦊 '+title+'</div><p style=\"color:#b7c7d8;line-height:1.55;margin:0 0 18px\">'+tr('Uma área independente da Yuna Academy para encontrar equipas por conteúdo. Escolhe uma categoria para consultar as recomendações.','A section independent from Yuna Academy to find teams by content. Choose a category to browse recommendations.')+'</p><div id=\"yuna-app-rec-cards\" style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px\"></div><div id=\"yuna-app-rec-detail\" style=\"margin-top:18px\"></div></div>';\n"
        + " var grid=appSection.querySelector('#yuna-app-rec-cards');\n"
        + " cards.forEach(function(c){var b=document.createElement('button');b.type='button';b.style.cssText='text-align:left;padding:16px;border:1px solid #344658;border-radius:14px;background:#131e29;color:#edf4fb;min-height:112px';b.innerHTML='<div style=\"font-size:18px;font-weight:750;margin-bottom:8px\">'+c.title+'</div><div style=\"font-size:14px;line-height:1.5;color:#b7c7d8\">'+c.desc+'</div>';b.addEventListener('click',function(){var d=appSection.querySelector('#yuna-app-rec-detail');d.innerHTML='<section style=\"padding:16px;border:1px solid #344658;border-radius:14px;background:#111a24\"><h2 style=\"margin:0 0 10px\">'+c.title+'</h2><p style=\"color:#c3d0dd;line-height:1.6\">'+c.desc+'</p><p style=\"padding:12px;border-radius:9px;background:#1a2937;line-height:1.6\">'+tr('Esta categoria fica separada da Yuna Academy. As composições concretas serão organizadas aqui por dificuldade, opção F2P, velocidade, monstros substitutos e requisitos de runas.','This category is separate from Yuna Academy. Specific team compositions will be organized here by difficulty, F2P option, speed, substitute monsters and rune requirements.')+'</p><button id=\"yuna-app-rec-back\" style=\"padding:10px 14px;border:1px solid #405263;border-radius:9px;background:#17232f;color:#fff\">'+tr('Ver todas as categorias','View all categories')+'</button></section>';appSection.querySelector('#yuna-app-rec-back').addEventListener('click',function(){d.innerHTML=''})});grid.appendChild(b)});\n"
        + " appSection.querySelector('#yuna-app-rec-close').addEventListener('click',function(){appSection.style.display='none'});\n"
        + " appSection.style.display='block';\n"
        + "}\n"
        + "if(appNav&&!document.getElementById('yuna-app-recommended-link')){\n"
        + " var rec=document.createElement('a');rec.id='yuna-app-recommended-link';rec.href='#yuna-app-recommended';rec.textContent=tr('Equipas Recomendadas','Recommended Teams');rec.style.cssText='display:block;padding:10px 12px;margin:5px 0;border-radius:9px;background:#17232f;color:#f1f7ff;font-weight:700;text-decoration:none;border:1px solid #35495c';\n"
        + " rec.addEventListener('click',function(e){e.preventDefault();appOpenRecommendations();var t=document.querySelector('.nav-toggle');if(t){t.checked=false;t.dispatchEvent(new Event('change'))}});\n"
        + " appNav.appendChild(rec);\n"
        + "}\n"
        + "\n"
        + "}catch(e){console.log('YunaRunes app persistence:',e)}})();";



    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setLoadsImagesAutomatically(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setLoadWithOverviewMode(false);
        settings.setUseWideViewPort(false);
        webView.setInitialScale(100);
        settings.setTextZoom(100);
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        settings.setUserAgentString(settings.getUserAgentString() + " YunaRunesApp/1.2");
        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView view, String url) { return false; }
            @Override public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                view.evaluateJavascript("var m=document.querySelector('meta[name=\\\"viewport\\\"]');if(!m){m=document.createElement('meta');m.name='viewport';document.head.appendChild(m);}m.setAttribute('content','width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no');" + APP_CLEANUP + APP_FEATURES, null);
            }
        });

        setContentView(webView);
        if (savedInstanceState == null) webView.loadUrl(HOME);
        else webView.restoreState(savedInstanceState);
    }

    @Override protected void onSaveInstanceState(Bundle outState) {
        webView.saveState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override public void onBackPressed() {
        if (webView.canGoBack()) webView.goBack(); else super.onBackPressed();
    }
}
