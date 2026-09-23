import type { MetaProjet } from '@/lib/contenu/types';

/** Korí — application grand public de réservation beauté. */
export const kori: MetaProjet = {
  slug: 'kori',
  nom: 'Korí',
  accroche: {
    fr: 'Découvrir des professionnels de la beauté vérifiés près de chez soi, réserver et payer depuis son téléphone.',
    en: 'Discover verified beauty professionals nearby, book and pay from your phone.',
  },
  categorie: { fr: 'Beauté & bien-être', en: 'Beauty & wellness' },
  type: 'mobile',
  plateformes: ['ios', 'android'],
  stack: ['Flutter', 'Dart', 'NestJS', 'Node.js', 'PostgreSQL', 'Prisma', 'GCP', 'AWS', 'Pulumi'],
  role: { fr: 'Développeur Flutter — application et intégration API', en: 'Flutter developer — app and API integration' },
  client: 'Korí Beauty',
  liens: { repo: 'https://github.com/kori-beauty/kori' },
  logo: '/projects/kori/kori-logo.png',
  apercu: '/projects/kori/kori-preview-1.png',
  galerie: [
    { src: '/projects/kori/kori-preview-2.png', legende: { fr: 'Aperçu de Korí', en: 'Korí overview' } },
    { src: '/projects/kori/kori-1x1.png', legende: { fr: `Écran d'accueil`, en: 'Welcome screen' } },
    { src: '/projects/kori/kori-6x1.png', legende: { fr: 'Découverte et favoris', en: 'Discovery and favourites' } },
    { src: '/projects/kori/kori-2x1.png', legende: { fr: 'Réservation', en: 'Booking' } },
    { src: '/projects/kori/kori-3x1.png', legende: { fr: 'Fiche du salon', en: 'Salon detail' } },
    { src: '/projects/kori/kori-4x1.png', legende: { fr: 'Choix de la prestation', en: 'Service selection' } },
  ],
  resultats: [
    { valeur: '24', libelle: { fr: 'écrans livrés', en: 'screens delivered' } },
    { valeur: '1', libelle: { fr: 'backend partagé avec Korí Pro', en: 'backend shared with Korí Pro' } },
    { valeur: 'Géo', libelle: { fr: 'découverte par localisation', en: 'location-based discovery' } },
  ],
  phare: false,
  ordre: 3,
};
