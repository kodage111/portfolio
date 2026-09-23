import type { MetaProjet } from '@/lib/contenu/types';

/** Korí Pro — application des professionnels de la beauté. */
export const koriPro: MetaProjet = {
  slug: 'kori-pro',
  nom: 'Korí Pro',
  accroche: {
    fr: `L'application des professionnels de la beauté : agenda, prestations, clients et paiements, sur iOS et Android.`,
    en: 'The app for beauty professionals: agenda, services, clients and payments, on iOS and Android.',
  },
  categorie: { fr: 'Beauté & bien-être', en: 'Beauty & wellness' },
  type: 'mobile',
  plateformes: ['ios', 'android'],
  stack: ['Flutter', 'Dart', 'NestJS', 'Node.js', 'PostgreSQL', 'Prisma', 'GCP', 'AWS', 'Pulumi'],
  role: { fr: 'Développeur Flutter — application et intégration API', en: 'Flutter developer — app and API integration' },
  client: 'Korí Beauty',
  liens: { repo: 'https://github.com/kori-beauty/kori' },
  logo: '/projects/kori-pro/kori-pro-logo.png',
  apercu: '/projects/kori-pro/kori-pro-preview-1.png',
  galerie: [
    { src: '/projects/kori-pro/kori-pro-preview-2.png', legende: { fr: 'Aperçu de Korí Pro', en: 'Korí Pro overview' } },
    { src: '/projects/kori-pro/kori-pro-0x2.png', legende: { fr: `Écran d'accueil`, en: 'Welcome screen' } },
    { src: '/projects/kori-pro/kori-pro-1x1.png', legende: { fr: 'Agenda des rendez-vous', en: 'Appointments agenda' } },
    { src: '/projects/kori-pro/kori-pro-2x1.png', legende: { fr: 'Fiche du salon', en: 'Salon detail' } },
    { src: '/projects/kori-pro/kori-pro-3x1.png', legende: { fr: 'Lieu de la prestation', en: 'Service location' } },
    { src: '/projects/kori-pro/kori-pro-4x1.png', legende: { fr: 'Choix des types de prestation', en: 'Service type selection' } },
  ],
  resultats: [
    { valeur: '28', libelle: { fr: 'écrans livrés', en: 'screens delivered' } },
    { valeur: '2', libelle: { fr: 'plateformes, une base de code', en: 'platforms, one codebase' } },
    { valeur: 'IaC', libelle: { fr: 'infrastructure décrite avec Pulumi', en: 'infrastructure described with Pulumi' } },
  ],
  phare: false,
  ordre: 2,
};
