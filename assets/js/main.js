// Nav pozadie sa zmení na nepriehľadné po scrolli
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('up', window.scrollY > 40);
}, { passive: true });

// Mobilné hamburger menu — otvorenie/zatvorenie + zatvorenie po kliku na odkaz alebo mimo menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

function setMenuOpen(open) {
  nav.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
}

menuToggle.addEventListener('click', () => {
  setMenuOpen(!nav.classList.contains('menu-open'));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('click', e => {
  if (nav.classList.contains('menu-open') && !nav.contains(e.target)) setMenuOpen(false);
});

// Postupné zobrazovanie .reveal prvkov pri scrolli (animuje sa len raz)
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -44px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Svetelný efekt na kartách projektov sledujúci pozíciu myši (--mx/--my pre CSS)
document.querySelectorAll('.pcard').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%');
  });
});
