// Language switcher
/*
  LANGUAGE-SWITCHER.JS - logika pre prepínač jazykov v portfóliu
  Umožňuje prepínať medzi slovenčinou a angličtinou, ukladá výber do localStorage
  Používa data-i18n atribúty v HTML pre identifikáciu preložiteľných textov
*/

// ─── INICIALIZÁCIA ───
/*
  LANG-TOGGLE - tlačidlo pre prepnutie jazyka (v navigačnej lište)
  HTML-EL - koreňový HTML element pre nastavenie lang atribútu
  CURRENT-LANG - aktuálny jazyk (načítaný z localStorage alebo default 'sk')
*/
const langToggle = document.getElementById('lang-toggle'); // Získanie referencie na tlačidlo prepínača
const htmlEl = document.documentElement; // Získanie referencie na <html> element
let currentLang = localStorage.getItem('lang') || 'sk'; // Načítanie jazyka z localStorage alebo default 'sk'

// Set initial language
htmlEl.lang = currentLang;
langToggle.textContent = currentLang === 'sk' ? 'EN' : 'SK';

// ─── FUNKCIA PRE AKTUALIZÁCIU TEXTU ───
/*
  UPDATE-PAGE-LANGUAGE - aktualizuje všetky texty na stránke podľa vybraného jazyka
  Param: lang - kód jazyka ('sk' alebo 'en')
  Funkcia: prechádza všetky elementy s data-i18n atribútmi a nahrádza ich text
*/
function updatePageLanguage(lang) {
  const t = translations[lang]; // Získanie prekladového objektu pre daný jazyk
  
  // NAV - aktualizácia textov v navigačnej lište
  document.querySelectorAll('[data-i18n="projectsNav"]').forEach(el => el.textContent = t.projectsNav);
  document.querySelectorAll('[data-i18n="about"]').forEach(el => el.textContent = t.about);
  document.querySelectorAll('[data-i18n="contact"]').forEach(el => el.textContent = t.contact);
  
  // HERO - aktualizácia textov v hlavnej uvítacej sekcii
  document.querySelectorAll('[data-i18n="available"]').forEach(el => el.textContent = t.available);
  document.querySelectorAll('[data-i18n="heroTitleLine1"]').forEach(el => el.textContent = t.heroTitleLine1);
  document.querySelectorAll('[data-i18n="heroTitleLine2"]').forEach(el => el.textContent = t.heroTitleLine2);
  document.querySelectorAll('[data-i18n="heroDesc"]').forEach(el => el.textContent = t.heroDesc);
  document.querySelectorAll('[data-i18n="viewProjects"]').forEach(el => el.textContent = t.viewProjects);
  
  // BADGES - aktualizácia textov v badge-och (štítkoch)
  document.querySelectorAll('[data-i18n="fullstackDev"]').forEach(el => el.textContent = t.fullstackDev);
  document.querySelectorAll('[data-i18n="yearsExp"]').forEach(el => el.textContent = t.yearsExp);
  document.querySelectorAll('[data-i18n="projects10"]').forEach(el => el.textContent = t.projects10);
  document.querySelectorAll('[data-i18n="completed"]').forEach(el => el.textContent = t.completed);
  document.querySelectorAll('[data-i18n="slovakia"]').forEach(el => el.textContent = t.slovakia);
  
  // PROJECTS - aktualizácia textov v sekcii projektov
  document.querySelectorAll('[data-i18n="projectsTitle"]').forEach(el => el.textContent = t.projectsTitle);
  document.querySelectorAll('[data-i18n="weatherDesc"]').forEach(el => el.textContent = t.weatherDesc);
  document.querySelectorAll('[data-i18n="todoDesc"]').forEach(el => el.textContent = t.todoDesc);
  document.querySelectorAll('[data-i18n="eshopDesc"]').forEach(el => el.textContent = t.eshopDesc);
  
  // STACK - aktualizácia textov v sekcii technických zručností
  document.querySelectorAll('[data-i18n="stackTitle"]').forEach(el => el.textContent = t.stackTitle);
  document.querySelectorAll('[data-i18n="frontend"]').forEach(el => el.textContent = t.frontend);
  document.querySelectorAll('[data-i18n="backend"]').forEach(el => el.textContent = t.backend);
  document.querySelectorAll('[data-i18n="databases"]').forEach(el => el.textContent = t.databases);
  document.querySelectorAll('[data-i18n="tools"]').forEach(el => el.textContent = t.tools);
  
  // ABOUT - aktualizácia textov v sekcii o mne
  document.querySelectorAll('[data-i18n="aboutTitle"]').forEach(el => el.textContent = t.aboutTitle);
  document.querySelectorAll('[data-i18n="codeHeading"]').forEach(el => el.textContent = t.codeHeading);
  document.querySelectorAll('[data-i18n="codeBecause"]').forEach(el => el.textContent = t.codeBecause);
  document.querySelectorAll('[data-i18n="codeEnjoy"]').forEach(el => el.textContent = t.codeEnjoy);
  document.querySelectorAll('[data-i18n="aboutDesc1"]').forEach(el => el.textContent = t.aboutDesc1);
  document.querySelectorAll('[data-i18n="aboutDesc2"]').forEach(el => el.textContent = t.aboutDesc2);
  document.querySelectorAll('[data-i18n="aboutDesc3"]').forEach(el => el.textContent = t.aboutDesc3);
  document.querySelectorAll('[data-i18n="letsChat"]').forEach(el => el.textContent = t.letsChat);
  
  // INFO GRID - aktualizácia textov v informačnej mriežke
  document.querySelectorAll('[data-i18n="experience"]').forEach(el => el.textContent = t.experience);
  document.querySelectorAll('[data-i18n="years2plus"]').forEach(el => el.textContent = t.years2plus);
  document.querySelectorAll('[data-i18n="webDev"]').forEach(el => el.textContent = t.webDev);
  document.querySelectorAll('[data-i18n="projects"]').forEach(el => el.textContent = t.projects);
  document.querySelectorAll('[data-i18n="location"]').forEach(el => el.textContent = t.location);
  document.querySelectorAll('[data-i18n="slovakia"]').forEach(el => el.textContent = t.slovakia);
  document.querySelectorAll('[data-i18n="remoteFriendly"]').forEach(el => el.textContent = t.remoteFriendly);
  document.querySelectorAll('[data-i18n="languageCodes"]').forEach(el => el.textContent = t.languageCodes);
  document.querySelectorAll('[data-i18n="languages"]').forEach(el => el.textContent = t.languages);
  document.querySelectorAll('[data-i18n="fluent"]').forEach(el => el.textContent = t.fluent);
  
  // AVAILABILITY - aktualizácia textu o dostupnosti
  document.querySelectorAll('[data-i18n="available_now"]').forEach(el => el.textContent = t.available_now);
  
  // CONTACT - aktualizácia textov v sekcii kontakt
  document.querySelectorAll('[data-i18n="contactTitle"]').forEach(el => el.textContent = t.contactTitle);
  document.querySelectorAll('[data-i18n="contactGhost"]').forEach(el => el.textContent = t.contactGhost);
  document.querySelectorAll('[data-i18n="letsTalk"]').forEach(el => el.textContent = t.letsTalk);
  document.querySelectorAll('[data-i18n="contactAbout"]').forEach(el => el.textContent = t.contactAbout);
  document.querySelectorAll('[data-i18n="contactDesc"]').forEach(el => el.textContent = t.contactDesc);
  document.querySelectorAll('[data-i18n="sendEmail"]').forEach(el => el.textContent = t.sendEmail);
  
  // FOOTER - aktualizácia textu v päte stránky
  document.querySelectorAll('[data-i18n="footer"]').forEach(el => el.textContent = t.footer);
}

// ─── EVENT LISTENER PRE PREPNUTIE JAZYKA ───
/*
  Kliknutie na tlačidlo prepínača jazyka
  Prepína medzi 'sk' a 'en', ukladá do localStorage, aktualizuje UI
*/
langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'sk' ? 'en' : 'sk'; // Prepnutie jazyka
  localStorage.setItem('lang', currentLang); // Uloženie do localStorage
  htmlEl.lang = currentLang; // Aktualizácia lang atribútu
  langToggle.textContent = currentLang === 'sk' ? 'EN' : 'SK'; // Aktualizácia textu tlačidla
  updatePageLanguage(currentLang); // Aktualizácia všetkých textov na stránke
});

// ─── INICIALIZÁCIA STRÁNKY ───
/*
  Spustenie aktualizácie textov pri načítaní stránky s aktuálnym jazykom
*/
// Initialize page with current language
updatePageLanguage(currentLang);
