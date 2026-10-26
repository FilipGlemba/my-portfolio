// Prepínač jazyka SK/EN — ukladá výber do localStorage, aktualizuje texty cez data-i18n atribúty
const langToggle = document.getElementById('lang-toggle');
const htmlEl = document.documentElement;
let currentLang = localStorage.getItem('lang') || 'sk';

htmlEl.lang = currentLang;
langToggle.textContent = currentLang === 'sk' ? 'EN' : 'SK';

function updatePageLanguage(lang) {
  const t = translations[lang];

  // Každý prvok s data-i18n="kľúč" dostane text z translations[lang][kľúč].
  // Nová sekcia tak stačí pridať do HTML a do translations.js.
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const text = t[el.dataset.i18n];
    if (text !== undefined) el.textContent = text;
  });
}

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'sk' ? 'en' : 'sk';
  localStorage.setItem('lang', currentLang);
  htmlEl.lang = currentLang;
  langToggle.textContent = currentLang === 'sk' ? 'EN' : 'SK';
  updatePageLanguage(currentLang);
});

updatePageLanguage(currentLang);
