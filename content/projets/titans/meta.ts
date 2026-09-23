import type { MetaProjet } from '@/lib/contenu/types';

/** Titans — point de vente de Titans Groupe. Captures à ajouter par le propriétaire (`apercu`, `galerie`). */
export const titans: MetaProjet = {
  slug: 'titans',
  nom: 'Titans',
  accroche: {
    fr: 'Point de vente mobile et web pour maquis, restaurants et dépôts : caisse, stock, journée d’activité, hors ligne d’abord.',
    en: 'Mobile and web point of sale for bars, restaurants and warehouses: checkout, stock, business day, offline first.',
  },
  categorie: { fr: 'Point de vente & gestion', en: 'Point of sale & management' },
  type: 'mobile',
  plateformes: ['ios', 'android', 'web'],
  stack: ['Flutter', 'Dart', 'SQLite', 'Next.js', 'TypeScript', 'Firebase', 'Cloud Functions', 'Node.js', 'GCP'],
  periode: '2026 –',
  role: {
    fr: 'Software Engineer — mobile, web et back-office',
    en: 'Software Engineer — mobile, web and back-office',
  },
  client: 'Titans Groupe',
  liens: {
    site: 'https://titans-groupe.com',
    live: 'https://pos.titans-groupe.com',
    appStore: 'https://apps.apple.com/app/mvp-titans/id6764788709',
    playStore: 'https://play.google.com/store/apps/details?id=titans.titans',
  },
  logo: '/projects/titans/titans-logo.png',
  galerie: [],
  resultats: [
    { valeur: '3', libelle: { fr: 'plateformes : iOS, Android, web', en: 'platforms: iOS, Android, web' } },
    { valeur: '4', libelle: { fr: 'types de commerce couverts', en: 'business types covered' } },
    {
      valeur: 'Offline',
      libelle: { fr: 'ventes saisies sans réseau, synchronisées ensuite', en: 'sales captured offline, synced later' },
    },
  ],
  phare: true,
  ordre: 1,
};
