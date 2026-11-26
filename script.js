
document.addEventListener('DOMContentLoaded', () => {

  // КНОПКА ОТКРЫТИЯ ПРИГЛАШЕНИЯ
  const openButton = document.getElementById('openInvite');
  const invitation = document.getElementById('invitation');

  if (openButton && invitation) {
    openButton.addEventListener('click', () => {
      invitation.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  // ПОЯВЛЕНИЕ ТЕКСТА ПРИ ПРОКРУТКЕ
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => {
      element.classList.add('visible');
    });
  }

  // СНЕГОПАД
  const snow = document.querySelector('.snow-layer');

  if (snow) {
    const count = window.innerWidth <= 650 ? 35 : 65;

    for (let i = 0; i < count; i++) {
      const flake = document.createElement('i');

      flake.className = 'snowflake';

      flake.style.setProperty('--left', Math.random() * 100 + '%');
      flake.style.setProperty('--size', (2 + Math.random() * 4) + 'px');
      flake.style.setProperty('--opacity', (0.22 + Math.random() * 0.55).toFixed(2));
      flake.style.setProperty('--duration', (9 + Math.random() * 14) + 's');
      flake.style.setProperty('--delay', (-Math.random() * 22) + 's');
      flake.style.setProperty('--sway', (Math.random() * 90 - 45) + 'px');

      snow.appendChild(flake);
    }
  }

});
