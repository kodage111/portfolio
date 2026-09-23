import type { MetaProjet } from '@/lib/contenu/types';

/** Assurance Contract Handler — gestion de contrats d'assurance sur Android, hors ligne. */
export const assuranceContractHandler: MetaProjet = {
  slug: 'assurance-contract-handler',
  nom: 'Assurance Contract Handler',
  accroche: {
    fr: 'Application Android native pour importer des fichiers Excel, gérer les clients et suivre les échéances de contrats avec des rappels automatiques.',
    en: 'Native Android app to import Excel files, manage customers and track contract expirations with automated reminders.',
  },
  categorie: { fr: 'Gestion de fichiers & données', en: 'File & data management' },
  type: 'mobile',
  plateformes: ['android'],
  stack: ['Kotlin', 'Java', 'SQLite', 'Room'],
  role: { fr: 'Conception et développement Android', en: 'Android design and development' },
  client: 'Compagnie d’assurance',
  liens: { repo: 'https://github.com/kodage111/assurance-contract-handler' },
  logo: '/projects/ach/ach-logo.png',
  apercu: '/projects/ach/ach-preview-2.png',
  galerie: [
    { src: '/projects/ach/ach-preview.png', legende: { fr: 'Tableau de bord', en: 'Dashboard overview' } },
    { src: '/projects/ach/ach-1.jpg', legende: { fr: 'Import de fichiers Excel', en: 'Excel import' } },
    { src: '/projects/ach/ach-2.jpg', legende: { fr: 'Base clients', en: 'Customer database' } },
    { src: '/projects/ach/ach-3.jpg', legende: { fr: 'Visualisation des données', en: 'Data visualization' } },
    { src: '/projects/ach/ach-4.jpg', legende: { fr: 'Recherche et filtres', en: 'Search and filters' } },
    { src: '/projects/ach/ach-5.jpg', legende: { fr: 'Profil client', en: 'Customer profile' } },
    { src: '/projects/ach/ach-6.jpg', legende: { fr: 'Génération de factures', en: 'Invoice generation' } },
    { src: '/projects/ach/ach-7.jpg', legende: { fr: 'Alertes d’expiration', en: 'Expiration alerts' } },
    { src: '/projects/ach/ach-8.jpg', legende: { fr: 'Analyses', en: 'Analytics' } },
    { src: '/projects/ach/ach-9.jpg', legende: { fr: 'Export et rapports', en: 'Export and reports' } },
    { src: '/projects/ach/ach-10.jpg', legende: { fr: 'Paramètres', en: 'Settings' } },
  ],
  resultats: [
    { valeur: '10', libelle: { fr: 'écrans, de l’import à la relance', en: 'screens, from import to reminder' } },
    { valeur: 'Excel', libelle: { fr: 'import et export natifs', en: 'native import and export' } },
    { valeur: 'Offline', libelle: { fr: 'base locale SQLite + Room', en: 'local SQLite + Room database' } },
  ],
  phare: false,
  ordre: 6,
};
