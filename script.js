const openBtn=document.getElementById('openBtn');
openBtn.addEventListener('click',()=>{
  document.body.classList.add('opened');
  document.querySelector('.invite').scrollIntoView({behavior:'smooth'});
});
const sections=document.querySelectorAll('.section');
sections.forEach(s=>s.classList.add('reveal'));
const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.15});
sections.forEach(s=>observer.observe(s));
