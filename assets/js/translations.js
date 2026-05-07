/*
  TRANSLATIONS.JS - súbor s prekladmi pre viacjazyčnú podporu portfólia
  Obsahuje prekladové objekty pre slovenčinu (sk) a angličtinu (en)
  Každý kľúč zodpovedá konkrétnemu textu v UI, ktorý sa mení podľa vybraného jazyka
*/

/*
  TRANSLATIONS - hlavný objekt obsahujúci všetky preklady
  Štruktúra: translations[jazyk][kľúč] = preložený text
*/
const translations = {
  /*
    SK - slovenské preklady
    Používa sa keď používateľ vyberie slovenčinu
  */
  sk: {
    // NAV - texty v navigačnej lište
    projectsNav: 'Projekty', // Odkaz na sekciu projektov
    about: 'O mne', // Odkaz na sekciu o mne
    contact: 'Kontakt', // Odkaz na sekciu kontakt

    // HERO - texty v hlavnej uvítacej sekcii
    available: 'Dostupný pre spoluprácu', // Indikátor dostupnosti
    heroTitleLine1: 'Web', // Prvá časť hlavného nadpisu
    heroTitleLine2: 'developer.', // Druhá časť hlavného nadpisu
    heroDesc: 'Tvorím moderné webové aplikácie – od čistého frontendu po robustný backend. Rád riešim zaujímavé problémy a vytváram projekty, ktoré fungujú, rýchlo sa načítajú a dobre vyzerajú.', // Popis v hero sekcii
    viewProjects: 'Pozri projekty', // Text tlačidla pre prechod na projekty

    // BADGES - texty v badge-och (štítkoch) v hero sekcii
    fullstackDev: 'Full-stack Dev', // Štítok s označením typu developera
    yearsExp: '4+ roky skúseností', // Štítok s počtom rokov skúseností
    projects10: '10+ projektov', // Štítok s počtom projektov
    completed: 'dokončených', // Doplnok k počtu projektov
    slovakia: 'Slovensko', // Štítok s lokalitou

    // PROJECTS - texty v sekcii projektov
    projectsTitle: 'Projekty', // Nadpis sekcie projektov
    weatherDesc: 'Zadáš mesto, okamžite vidíš teplotu, vlhkosť, vietor a predpoveď na ďalšie dni. Dáta z OpenWeather API, responzívny a rýchly UI.', // Popis weather appky
    todoDesc: 'Prehľadná appka na poznámky a správu úloh. Pridávanie, editovanie, mazanie – uložené lokálne, bez prihlásenia, okamžite použiteľné.', // Popis todo appky
    eshopDesc: 'Kompletná e-commerce platforma – autentifikácia, správa produktov, košík, platby a admin dashboard. Prvý veľký full-stack projekt.', // Popis e-shopu

    // STACK - texty v sekcii technických zručností
    stackTitle: 'Tech Stack', // Nadpis sekcie stack
    frontend: 'FRONTEND', // Názov kategórie frontend
    backend: 'BACKEND', // Názov kategórie backend
    databases: 'DATABÁZY', // Názov kategórie databázy
    tools: 'NÁSTROJE', // Názov kategórie nástroje
    expert: 'Expert', // Úroveň expert
    advanced: 'Advanced', // Úroveň advanced
    intermediate: 'Intermediate', // Úroveň intermediate
    familiar: 'Familiar', // Úroveň familiar

    // ABOUT - texty v sekcii o mne
    aboutTitle: 'O MNE', // Nadpis sekcie about
    codeHeading: 'Kódujem,', // Prvá časť sloganu
    codeBecause: 'pretože ma', // Druhá časť sloganu
    codeEnjoy: 'to baví.', // Tretia časť sloganu
    aboutDesc1: 'Som web developer s viac ako 4 rokmi praxe. Začínal som s HTML, CSS a JavaScript a postupne som pridával PHP, Node.js a React. Rád budujem moderné, rýchle a funkčné webové riešenia.', // Prvý odsek o mne
    aboutDesc2: 'Okrem klientskych projektov experimentujem s osobnými nápadmi a tvorím nástroje, ktoré som si sám prial – napríklad DevCheat alebo toto portfólio.', // Druhý odsek o mne
    aboutDesc3: 'Vo voľnom čase pracujem na osobných projektoch, ktoré mi dávajú priestor skúšať nové nástroje, zlepšovať workflow a testovať rýchlosť aj použiteľnosť. Toto portfólio je príklad môjho štýlu práce: čistá štruktúra, precízny dizajn a praktický výkon.', // Tretí odsek o mne
    letsChat: 'Porozprávajme sa', // Text tlačidla

    // INFO GRID - texty v informačnej mriežke
    experience: 'SKÚSENOSTI', // Štítok skúsenosti
    years2plus: '4+ roky', // Hodnota skúsenosti
    webDev: 'web development', // Popis skúsenosti
    projects: 'PROJEKTY', // Štítok projekty
    projects10: '10+', // Hodnota projektov
    location: 'LOKALITA', // Štítok lokalita
    languages: 'JAZYKY', // Štítok jazyky
    fluent: 'SK: rodný jazyk · EN: B2', // Hodnota jazykov

    // AVAILABILITY - text o dostupnosti
    available_now: 'Momentálne dostupný pre nové príležitosti', // Text indikátora dostupnosti
    remoteFriendly: 'remote friendly', // Text pre vzdialenú prácu
    languageCodes: 'SK / EN', // Skratka jazykov v infogride

    // CONTACT - texty v sekcii kontakt
    contactTitle: 'KONTAKT', // Nadpis sekcie kontakt
    contactGhost: 'POĎME', // Pozadie kontaktného oddielu
    letsTalk: 'Porozprávajme', // Prvá časť sloganu
    contactAbout: 'sa.', // Druhá časť sloganu
    contactDesc: 'Hľadáš developera do tímu alebo na projekt? Napíš mi a preberieme, ako ti viem pomôcť.', // Popis sekcie kontakt
    sendEmail: 'Napíš email', // Text tlačidla email

    // FOOTER - text v päte stránky
    footer: 'Portfolio postavené na HTML, CSS a JavaScripte' // Copyright text
  },

  /*
    EN - anglické preklady
    Používa sa keď používateľ vyberie angličtinu
  */
  en: {
    // NAV - navigation texts
    projectsNav: 'Projects', // Projects section link
    about: 'About', // About section link
    contact: 'Contact', // Contact section link

    // HERO - main hero section texts
    available: 'Available for work', // Availability indicator
    heroTitleLine1: 'Web', // Hero title first line
    heroTitleLine2: 'developer.', // Hero title second line
    heroDesc: 'I build modern web applications — from clean frontend to robust backend. I enjoy solving interesting problems and building products that are fast, usable, and visually polished.', // Hero description text
    viewProjects: 'View projects', // Button text for projects

    // BADGES - badge texts in hero section
    fullstackDev: 'Full-stack Dev', // Developer type badge
    yearsExp: '4+ years experience', // Experience years badge
    projects10: '10+ projects', // Projects count badge
    completed: 'completed', // Projects completion text
    slovakia: 'Slovakia', // Location badge

    // PROJECTS - projects section texts
    projectsTitle: 'Projects', // Projects section title
    weatherDesc: 'Enter a city and immediately see temperature, humidity, wind and forecast for the next days. Data from OpenWeather API, responsive and fast UI.', // Weather app description
    todoDesc: 'A simple notes and task manager app. Add, edit, delete tasks – stored locally, no login required, ready to use.', // Todo app description
    eshopDesc: 'A complete e-commerce platform – authentication, product management, cart, payments, and admin dashboard. My first larger full-stack project.', // E-shop description

    // STACK - tech stack section texts
    stackTitle: 'Tech Stack', // Stack section title
    frontend: 'FRONTEND', // Frontend category name
    backend: 'BACKEND', // Backend category name
    databases: 'DATABASES', // Databases category name
    tools: 'TOOLS', // Tools category name
    expert: 'Expert', // Expert level
    advanced: 'Advanced', // Advanced level
    intermediate: 'Intermediate', // Intermediate level
    familiar: 'Familiar', // Familiar level

    // ABOUT - about section texts
    aboutTitle: 'ABOUT', // About section title
    codeHeading: 'I code', // Slogan part 1
    codeBecause: 'because I', // Slogan part 2
    codeEnjoy: 'enjoy it.', // Slogan part 3
    aboutDesc1: 'I am a web developer with over 4 years of experience. I started with HTML, CSS and JavaScript and later added PHP, Node.js and React. I enjoy building modern, fast and functional web applications.', // First about paragraph
    aboutDesc2: 'Besides client work, I experiment with personal projects and build tools I wished existed – like DevCheat or this portfolio.', // Second about paragraph
    aboutDesc3: 'In my free time I work on personal projects that let me explore new tools, improve my workflow and test for speed and usability. This portfolio is an example of my approach: clean structure, polished visuals and practical performance.', // Third about paragraph
    letsChat: 'Let\'s talk', // Button text

    // INFO GRID - information grid texts
    experience: 'EXPERIENCE', // Experience label
    years2plus: '4+ years', // Experience value
    webDev: 'web development', // Experience description
    projects: 'PROJECTS', // Projects label
    projects10: '10+', // Projects value
    location: 'LOCATION', // Location label
    languages: 'LANGUAGES', // Languages label
    fluent: 'SK: native language · EN: B2', // Languages value

    // AVAILABILITY - availability text
    available_now: 'Currently available for new opportunities', // Availability indicator text
    remoteFriendly: 'remote friendly', // Remote friendly label
    languageCodes: 'SK / EN', // Language code label in info grid

    // CONTACT - contact section texts
    contactTitle: 'CONTACT', // Contact section title
    contactGhost: 'LET\'S TALK', // Background ghost text in contact section
    letsTalk: 'Let\'s talk', // Slogan part 1
    contactAbout: 'about it.', // Slogan part 2
    contactDesc: 'Looking for a developer for your team or project? Send me a message and let’s talk about how I can help.', // Contact section description
    sendEmail: 'Send email', // Email button text

    // FOOTER - footer text
    footer: 'Portfolio built with HTML, CSS and JavaScript' // Footer copyright text
  }
};
