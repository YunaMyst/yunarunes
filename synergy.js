(function(){
function clean(v){return String(v||'').replace(/\s+/g,' ').trim()}
function key(v){return clean(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'')}
function esc(v){return String(v||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function playable(m){return m&&Number(m.stars)>=2&&Number(m.stars)<=5&&m.image&&m.family&&m.obtainable!==false&&!/material|angelmon|devilmon|rainbowmon/i.test(clean(m.name))}
function role(m){return String(m&&m.role||'').toLowerCase()}
function kind(m){var n=key(m.name),r=role(m);if(/riley|lulu|konamiya|fran|belladeon|colleen|chasun|triana|megan|jeanne|veromos/.test(n))return'sustain';if(/galleon|tiana|orion|bernard|woosa|seara|zibala/.test(n))return'control';if(r==='attack')return'damage';if(r==='defense')return'control';if(r==='support'||r==='hp')return'support';return'utility'}
function img(m){return m.image?'<img src="'+esc(m.image)+'" alt="'+esc(clean(m.name))+'">':''}
window.YunaRunesSynergy=function(){
var box=document.getElementById('synergyResults'),input=document.getElementById('search'),button=document.getElementById('synergyBtn');if(!box)return;
box.innerHTML='<div class="muted">⏳ A procurar sinergias...</div>';if(button)button.disabled=true;
var name=clean(input&&input.value);if(!name){box.innerHTML='<div class="empty error">Escolhe primeiro um monstro na pesquisa e depois clica em Sinergia.</div>';if(button)button.disabled=false;return}
fetch('monster-catalog.json?v='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('monster-catalog.json HTTP '+r.status);return r.json()}).then(function(data){
var catalog=Array.isArray(data)?data:(Array.isArray(data.monsters)?data.monsters:[]),wanted=key(name);
var target=catalog.find(function(m){return key(m.name)===wanted})||catalog.find(function(m){var k=key(m.name);return k.includes(wanted)||wanted.includes(k)});
if(!target)throw new Error('Monstro não encontrado');
var tk=kind(target),te=String(target.element||'').toLowerCase();
var list=catalog.filter(function(m){return playable(m)&&m!==target&&String(m.family)!==String(target.family)}).map(function(m){
var k=kind(m),el=String(m.element||'').toLowerCase(),score=0,reasons=[];
if(k!==tk){score+=50;reasons.push('função complementar')}if(k==='support'||k==='sustain'){score+=25;reasons.push('suporte')}if(k==='control'){score+=20;reasons.push('controlo')}if(k==='damage'){score+=15;reasons.push('dano')}if(el!==te){score+=5;reasons.push('elemento diferente')}
return{m:m,score:score,reasons:[...new Set(reasons)]}
}).sort(function(a,b){return b.score-a.score}).slice(0,10);
if(!list.length)throw new Error('Não foram encontradas sinergias');
box.innerHTML='<div class="card" style="margin:0"><h3>🤝 Sinergias para '+esc(clean(target.name))+'</h3><p class="muted">Sugestões de monstros que complementam este monstro.</p><div class="synergy-grid">'+list.map(function(x,i){return '<div class="synergy-card"><span class="badge">#'+(i+1)+'</span>'+img(x.m)+'<b>'+esc(clean(x.m.name))+'</b><span class="tag">'+esc(x.m.element||'')+'</span><span class="tag">'+esc(x.m.role||'')+'</span><p class="synergy-reason">✓ '+esc(x.reasons.join(' · '))+'</p></div>'}).join('')+'</div></div>';
box.scrollIntoView({behavior:'smooth',block:'nearest'})
}).catch(function(err){box.innerHTML='<div class="empty error">Não foi possível carregar as sinergias: '+esc(err.message)+'</div>'}).finally(function(){if(button)button.disabled=false})
}
})();