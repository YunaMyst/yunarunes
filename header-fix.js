(()=>{
const K='yunarunes-language';
function fix(){
 const h=document.querySelector('header.top');
 if(!h)return;
 h.style.position='relative';
 h.style.overflow='visible';
 let b=h.querySelector('.langbar');
 if(!b){b=document.createElement('div');b.className='langbar';h.appendChild(b)}
 if(!b.querySelector('[data-lang="pt"]')||!b.querySelector('[data-lang="en"]')||!b.querySelector('.apk-link')){
  b.innerHTML='<a class="apk-link" href="./downloads/yunarunes.apk" download>📱 APK</a><button type="button" data-lang="pt">🇧🇷 PT/BR</button><button type="button" data-lang="en">🇬🇧 ENG</button>';
 }
 Object.assign(b.style,{position:'absolute',top:'50%',right:'18px',transform:'translateY(-50%)',display:'flex',alignItems:'center',justifyContent:'flex-end',gap:'7px',zIndex:'99999',visibility:'visible',opacity:'1',whiteSpace:'nowrap',pointerEvents:'auto'});
 b.querySelectorAll('a,button').forEach(x=>Object.assign(x.style,{display:'inline-flex',alignItems:'center',justifyContent:'center',height:'40px',padding:'0 11px',border:'1px solid #2b3742',borderRadius:'7px',font:'900 12px/1 Arial,sans-serif',whiteSpace:'nowrap',textDecoration:'none',cursor:'pointer',visibility:'visible',opacity:'1',pointerEvents:'auto',position:'relative',zIndex:'100000'}));
 const lang=localStorage.getItem(K)==='en'?'en':'pt';
 const active=b.querySelector('[data-lang="'+lang+'"]');
 if(active){active.style.background='#35a9e1';active.style.color='#061018'}
 const apk=b.querySelector('.apk-link');
 if(apk){apk.style.background='#35a9e1';apk.style.color='#061018'}
 b.querySelectorAll('[data-lang]').forEach(x=>{
  x.onclick=e=>{e.preventDefault();e.stopPropagation();localStorage.setItem(K,x.dataset.lang);location.reload()};
 });
}
function style(){
 const s=document.getElementById('yuna-header-fix-style')||document.createElement('style');
 s.id='yuna-header-fix-style';
 s.textContent=`
header.top{position:relative!important;overflow:visible!important}
@media(min-width:601px){
 header.top .nav{position:absolute!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important;margin:0!important;display:flex!important;z-index:20!important}
 header.top .langbar{position:absolute!important;right:18px!important;top:50%!important;transform:translateY(-50%)!important;display:flex!important;visibility:visible!important;opacity:1!important;z-index:99999!important;pointer-events:auto!important}
}
@media(max-width:600px){
 header.top .langbar{position:absolute!important;right:8px!important;top:8px!important;transform:none!important;display:flex!important;z-index:99999!important;pointer-events:auto!important}
 header.top .langbar a,header.top .langbar button{height:36px!important;padding:0 7px!important;font-size:10px!important}
}
`;
 if(!s.parentNode)document.head.appendChild(s);
}
function boot(){style();fix()}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot):boot();
})();
