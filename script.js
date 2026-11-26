document.getElementById('openInvite').addEventListener('click',()=>document.getElementById('invitation').scrollIntoView({behavior:'smooth'}));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// Light, gentle snowfall across both screens.
const snow=document.querySelector('.snow-layer');
for(let i=0;i<48;i++){
  const flake=document.createElement('i');
  flake.className='snowflake';
  flake.style.setProperty('--left',Math.random()*100+'%');
  flake.style.setProperty('--size',(2+Math.random()*4)+'px');
  flake.style.setProperty('--opacity',(0.22+Math.random()*0.55).toFixed(2));
  flake.style.setProperty('--duration',(9+Math.random()*14)+'s');
  flake.style.setProperty('--delay',(-Math.random()*22)+'s');
  flake.style.setProperty('--sway',(Math.random()*90-45)+'px');
  snow.appendChild(flake);
}
