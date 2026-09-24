import type { MetaProjet } from '@/lib/contenu/types';

/** Titans — point de vente de Titans Groupe. Captures mobiles fournies par le propriétaire (2026-09-24). */
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
  apercu: '/projects/titans/titans-mobile-1.jpg',
  galerie: [
    { src: '/projects/titans/titans-mobile-1.jpg', legende: { fr: 'Prise de commande : catalogue par catégorie', en: 'Order taking: catalog by category' } },
    { src: '/projects/titans/titans-mobile-2.jpg', legende: { fr: 'Panier et envoi à la caisse', en: 'Cart and send to checkout' } },
    { src: '/projects/titans/titans-mobile-3.jpg', legende: { fr: 'Reçu avec QR code et crédit client', en: 'Receipt with QR code and customer credit' } },
    { src: '/projects/titans/titans-mobile-4.jpg', legende: { fr: 'Résultats de la période', en: 'Period results' } },
    { src: '/projects/titans/titans-mobile-5.jpg', legende: { fr: 'Marge par produit et par lot', en: 'Margin per product and per batch' } },
    { src: '/projects/titans/titans-mobile-6.jpg', legende: { fr: 'Dépenses du jour', en: 'Daily expenses' } },
    { src: '/projects/titans/titans-mobile-7.jpg', legende: { fr: 'Point hebdomadaire : meilleures ventes et stock dormant', en: 'Weekly review: top sales and dormant stock' } },
    { src: '/projects/titans/titans-mobile-8.jpg', legende: { fr: 'Fiche stock d’un produit', en: 'Product stock card' } },
  ],
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
