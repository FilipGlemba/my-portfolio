// Preklady pre SK/EN prepínač jazyka (translations[jazyk][kľúč])
const translations = {
  sk: {
    // NAV
    projectsNav: 'Projekty',
    about: 'O mne',
    contact: 'Kontakt →',

    // HERO
    available: 'Dostupný pre spoluprácu',
    heroTitleLine1: 'Web',
    heroTitleLine2: 'developer.',
    heroDesc: 'Tvorím moderné webové aplikácie – od čistého frontendu po robustný backend. Rád riešim zaujímavé problémy a vytváram projekty, ktoré fungujú, rýchlo sa načítajú a dobre vyzerajú.',
    viewProjects: 'Pozri projekty',

    // BADGES
    fullstackDev: 'Web Developer',
    yearsExp: '4+ roky skúseností',
    heroProjectsCount: '4 projekty',
    projectsStatus: '1 živý · 3 vo vývoji',
    slovakia: 'Slovensko',

    // PROJECTS
    projectsTitle: 'Projekty',
    eshopDesc: 'Moderný Next.js e-shop s autentifikáciou, produktovým katalógom, košíkom, objednávkami, platbami a admin dashboardom.',
    notaflowDesc: 'Aplikácia pre kapely – archív nôt, setlisty, pódium-režim a zmluvy, na webe aj ako Android/iOS appka. Práca SOČ v dvojčlennom tíme; moja časť je backend (Express, Prisma, JWT auth), archív nôt, PDF zmluvy a kalkulačka cestovných nákladov.',
    wipTitle: 'ROZPRACOVANÉ',
    mozaikaDesc: 'Web pre folklórnu kapelu z Liptova s rezervačným formulárom (PHP, PHPMailer).',
    clientTitle: '🤝 Klientsky projekt',
    clientDesc: 'Web pre reálneho klienta od návrhu po nasadenie. Detaily po schválení klientom.',

    // STACK
    stackTitle: 'Tech Stack',
    frontend: 'FRONTEND',
    backend: 'BACKEND',
    databases: 'DATABÁZY',
    tools: 'NÁSTROJE',
    expert: 'Expert',
    advanced: 'Advanced',
    intermediate: 'Intermediate',
    familiar: 'Familiar',

    // ABOUT
    aboutTitle: 'O MNE',
    codeHeading: 'Kódujem,',
    codeBecause: 'pretože ma',
    codeEnjoy: 'to baví.',
    aboutDesc1: 'Som študent SSOSTA (odbor Informačné a digitálne technológie, 3. ročník) s viac ako 4 rokmi praxe vo web developmente a certifikátom z Web Developer kurzu v Bratislave.',
    aboutDesc2: 'Okrem školy staviam veci, ktoré sám potrebujem – napríklad NotaFlow, aplikáciu pre kapely, ktorú robíme ako prácu SOČ. Na akordeóne hrám vyše 12 rokov, takže hudba a kód sa u mňa stretávajú často.',
    aboutDesc3: 'Vo voľnom čase pracujem na osobných projektoch, ktoré mi dávajú priestor skúšať nové nástroje, zlepšovať workflow a testovať rýchlosť aj použiteľnosť. Toto portfólio je príklad môjho štýlu práce: čistá štruktúra, precízny dizajn a praktický výkon.',
    letsChat: 'Porozprávajme sa →',

    // EDUCATION
    eduTitle: '🎓 VZDELANIE & CERTIFIKÁCIE',
    eduSchool: 'SSOSTA, odbor IDT (3. ročník, prebieha)',
    eduCert: 'Certifikát: Web Developer kurz, Bratislava',

    // INFO GRID
    experience: 'SKÚSENOSTI',
    years2plus: '4+ roky',
    webDev: 'web development',
    projects: 'PROJEKTY',
    projectsCount: '4',
    location: 'LOKALITA',
    languages: 'JAZYKY',
    fluent: 'SK rodný jazyk · EN B1',

    // AVAILABILITY
    available_now: 'Momentálne dostupný pre nové príležitosti',
    remoteFriendly: 'remote friendly',
    languageCodes: 'SK / EN',

    // CONTACT
    contactTitle: 'KONTAKT',
    contactGhost: 'POĎME',
    letsTalk: 'Porozprávajme',
    contactAbout: 'sa.',
    contactDesc: 'Hľadáš developera do tímu alebo na projekt? Napíš mi a preberieme, ako ti viem pomôcť.',
    sendEmail: 'Napíš email',

    // FOOTER
    footer: 'Web Developer & Hudobník'
  },

  en: {
    // NAV
    projectsNav: 'Projects',
    about: 'About',
    contact: 'Contact →',

    // HERO
    available: 'Available for work',
    heroTitleLine1: 'Web',
    heroTitleLine2: 'developer.',
    heroDesc: 'I build modern web applications — from clean frontend to robust backend. I enjoy solving interesting problems and building products that are fast, usable, and visually polished.',
    viewProjects: 'View projects',

    // BADGES
    fullstackDev: 'Web Developer',
    yearsExp: '4+ years experience',
    heroProjectsCount: '4 projects',
    projectsStatus: '1 live · 3 in progress',
    slovakia: 'Slovakia',

    // PROJECTS
    projectsTitle: 'Projects',
    eshopDesc: 'A modern Next.js e-commerce app with authentication, product catalog, cart, orders, payments, and an admin dashboard.',
    notaflowDesc: 'An app for bands – sheet-music archive, setlists, stage mode and contracts, on the web and as an Android/iOS app. A two-person SOČ (student research competition) project; my part is the backend (Express, Prisma, JWT auth), the sheet-music archive, PDF contracts and a travel-cost calculator.',
    wipTitle: 'IN PROGRESS',
    mozaikaDesc: 'A website for a folk band from the Liptov region, with a booking form (PHP, PHPMailer).',
    clientTitle: '🤝 Client project',
    clientDesc: 'A website for a real client, from design to deployment. Details once the client approves.',

    // STACK
    stackTitle: 'Tech Stack',
    frontend: 'FRONTEND',
    backend: 'BACKEND',
    databases: 'DATABASES',
    tools: 'TOOLS',
    expert: 'Expert',
    advanced: 'Advanced',
    intermediate: 'Intermediate',
    familiar: 'Familiar',

    // ABOUT
    aboutTitle: 'ABOUT',
    codeHeading: 'I code',
    codeBecause: 'because I',
    codeEnjoy: 'enjoy it.',
    aboutDesc1: 'I\'m a student at SSOSTA (Information and Digital Technologies program, 3rd year) with more than 4 years of practical experience in web development and a certificate from a Web Developer course in Bratislava.',
    aboutDesc2: 'Outside of school I build things I need myself – like NotaFlow, an app for bands that we\'re making as a SOČ project. I\'ve played the accordion for over 12 years, so music and code meet a lot in my work.',
    aboutDesc3: 'In my free time I work on personal projects that let me explore new tools, improve my workflow and test for speed and usability. This portfolio is an example of my approach: clean structure, polished visuals and practical performance.',
    letsChat: 'Let\'s talk →',

    // EDUCATION
    eduTitle: '🎓 EDUCATION & CERTIFICATIONS',
    eduSchool: 'SSOSTA, Information and Digital Technologies (3rd year, in progress)',
    eduCert: 'Certificate: Web Developer course, Bratislava',

    // INFO GRID
    experience: 'EXPERIENCE',
    years2plus: '4+ years',
    webDev: 'web development',
    projects: 'PROJECTS',
    projectsCount: '4',
    location: 'LOCATION',
    languages: 'LANGUAGES',
    fluent: 'SK native · EN B1',

    // AVAILABILITY
    available_now: 'Currently available for new opportunities',
    remoteFriendly: 'remote friendly',
    languageCodes: 'SK / EN',

    // CONTACT
    contactTitle: 'CONTACT',
    contactGhost: 'LET\'S TALK',
    letsTalk: 'Let\'s talk',
    contactAbout: 'about it.',
    contactDesc: 'Looking for a developer for your team or project? Send me a message and let’s talk about how I can help.',
    sendEmail: 'Send email',

    // FOOTER
    footer: 'Web Developer & Musician'
  }
};
