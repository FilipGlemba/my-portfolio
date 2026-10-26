// Prepínač jazyka SK/EN — ukladá výber do localStorage, aktualizuje texty cez data-i18n atribúty
const langToggle = document.getElementById('lang-toggle');
const htmlEl = document.documentElement;

// localStorage môže byť zablokovaný (súkromné okno, prísne nastavenia) —
// vtedy prepínač funguje ďalej, len si výber nezapamätá.
function loadLang() {
  try { return localStorage.getItem('lang') === 'en' ? 'en' : 'sk'; } catch { return 'sk'; }
}
function saveLang(lang) {
  try { localStorage.setItem('lang', lang); } catch { /* nič */ }
}

let currentLang = loadLang();

function updatePageLanguage(lang) {
  const t = translations[lang];
  htmlEl.lang = lang;
  document.title = t.pageTitle;

  // Každý prvok s data-i18n="kľúč" dostane text z translations[lang][kľúč].
  // Nová sekcia tak stačí pridať do HTML a do translations.js.
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const text = t[el.dataset.i18n];
    if (text !== undefined) el.textContent = text;
  });

  // Tlačidlo ukazuje jazyk, NA KTORÝ sa prepne
  const other = lang === 'sk' ? 'en' : 'sk';
  langToggle.textContent = other.toUpperCase();
  langToggle.lang = other;
  langToggle.setAttribute('aria-label', t.langToggleLabel);
}

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'sk' ? 'en' : 'sk';
  saveLang(currentLang);
  updatePageLanguage(currentLang);
});

// HTML je po slovensky, takže prekladať treba len pri uloženej angličtine.
if (currentLang !== 'sk') updatePageLanguage(currentLang);
