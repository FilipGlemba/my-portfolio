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

// Escape zatvorí menu a vráti fokus na tlačidlo
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav.classList.contains('menu-open')) {
    setMenuOpen(false);
    menuToggle.focus();
  }
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

// Kontaktný formulár
// WEB3FORMS_KEY: bezplatný kľúč z https://web3forms.com (správy chodia na email).
// Je verejný – je určený na to, aby bol v kóde stránky. Kým je prázdny,
// formulár len otvorí pripravený email v poštovom programe návštevníka.
const WEB3FORMS_KEY = 'b1b6a044-0c41-450b-bdb6-407d3992b985';
const CONTACT_EMAIL = 'filipglemba.dev@gmail.com';

const form = document.getElementById('contact-form');
if (form) {
  const status = form.querySelector('.f-status');
  const submit = form.querySelector('.f-submit');
  const t = key => translations[document.documentElement.lang === 'en' ? 'en' : 'sk'][key];

  if (WEB3FORMS_KEY) form.querySelector('.f-note-service').hidden = false;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return;

    if (!WEB3FORMS_KEY) {
      const body = `${data.message}\n\n${t('formType')} ${data.type}\n${data.when ? t('formWhen').replace(/ \(.*\)$/, '') + ' ' + data.when + '\n' : ''}\n${data.name}\n${data.email}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Web – ' + data.type)}&body=${encodeURIComponent(body)}`;
      // Bez poštového programu sa nič neotvorí — návštevník musí vedieť, čo ďalej.
      status.textContent = t('formOpening');
      status.dataset.state = 'ok';
      return;
    }

    submit.disabled = true;
    submit.textContent = t('formSending');
    status.textContent = '';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Web – ${data.type} (${data.name})`,
          from_name: 'Portfólio – kontaktný formulár',
          name: data.name,
          email: data.email,
          type: data.type,
          when: data.when,
          message: data.message,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.message || res.status);
      form.reset();
      status.textContent = t('formSent');
      status.dataset.state = 'ok';
    } catch {
      status.textContent = t('formError');
      status.dataset.state = 'error';
    }
    submit.disabled = false;
    submit.textContent = t('formSubmit');
  });
}
