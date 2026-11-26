document.getElementById('openInvite').addEventListener('click',()=>document.getElementById('invitation').scrollIntoView({behavior:'smooth'}));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const bar=document.getElementById('progress');function progress(){const m=document.documentElement.scrollHeight-innerHeight;bar.style.width=(m>0?scrollY/m*100:0)+'%'}addEventListener('scroll',progress,{passive:true});progress();