/*
  MAIN.JS - hlavný JavaScript súbor pre interaktivitu portfólia
  Obsahuje: scroll efekty pre navigáciu, postupné zobrazovanie prvkov, svetelné efekty na kartách projektov
*/

// ─── NAV SCROLL EFFECT ───
/*
  Pridáva triedu 'up' k navigácii keď používateľ scrollne dole
  Tým sa zmení pozadie navigácie z priesvitného na nepriehľadné
*/
const nav = document.getElementById('nav'); // Získanie referencie na nav element
window.addEventListener('scroll', () => { // Event listener pre scroll event
  nav.classList.toggle('up', window.scrollY > 40); // Pridanie/odobranie triedy 'up' keď scrollY > 40px
}, { passive: true }); // Passive listener pre lepší výkon

// ─── SCROLL REVEAL ───
/*
  Intersection Observer pre postupné zobrazovanie prvkov pri scroll
  Prvky s triedou 'reveal' sa animujú keď prídu do viewportu
*/
const io = new IntersectionObserver((entries) => { // Vytvorenie Intersection Observer-a
  entries.forEach(e => { // Pre každý sledovaný element
    if (e.isIntersecting) { // Ak je element viditeľný vo viewport-e
      e.target.classList.add('in'); // Pridaj triedu 'in' pre spustenie animácie
      io.unobserve(e.target); // Prestaň sledovať element (animácia sa spustí len raz)
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -44px 0px' }); // 7% viditeľnosti, offset -44px zhora

document.querySelectorAll('.reveal').forEach(el => io.observe(el)); // Sledovanie všetkých prvkov s triedou 'reveal'

// ─── PROJECT CARD MOUSE GLOW ───
/*
  Svetelný efekt na kartách projektov ktorý sleduje pozíciu myši
  Vytvára CSS custom properties --mx a --my pre pozíciu kurzora
*/
document.querySelectorAll('.pcard').forEach(card => { // Pre každú kartu projektu
  card.addEventListener('mousemove', e => { // Event listener pre pohyb myši
    const r = card.getBoundingClientRect(); // Získanie obdĺžnika karty (pozícia a rozmery)
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%'); // X pozícia kurzora v %
    card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%'); // Y pozícia kurzora v %
  });
});