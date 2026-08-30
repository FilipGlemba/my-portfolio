// Prepínač jazyka SK/EN — ukladá výber do localStorage, aktualizuje texty cez data-i18n atribúty
const langToggle = document.getElementById('lang-toggle');
const htmlEl = document.documentElement;
let currentLang = localStorage.getItem('lang') || 'sk';

htmlEl.lang = currentLang;
langToggle.textContent = currentLang === 'sk' ? 'EN' : 'SK';

function updatePageLanguage(lang) {
  const t = translations[lang];

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

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'sk' ? 'en' : 'sk';
  localStorage.setItem('lang', currentLang);
  htmlEl.lang = currentLang;
  langToggle.textContent = currentLang === 'sk' ? 'EN' : 'SK';
  updatePageLanguage(currentLang);
});

updatePageLanguage(currentLang);
