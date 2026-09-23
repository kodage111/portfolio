import type { MetaProjet } from '@/lib/contenu/types';

/** Vegetable Market — site vitrine de démonstration pour un marchand de légumes. */
export const vegetableMarket: MetaProjet = {
  slug: 'vegetable-market',
  nom: 'Vegetable Market',
  accroche: {
    fr: `Site vitrine d'un marchand de légumes : produits frais, valeurs nutritionnelles, saisons et conseils de cuisine.`,
    en: 'Showcase site for a vegetable shop: fresh produce, nutrition facts, seasons and cooking tips.',
  },
  categorie: { fr: 'E-commerce & commerce local', en: 'E-commerce & local business' },
  type: 'web',
  plateformes: ['web'],
  stack: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
  role: { fr: 'Conception et développement', en: 'Design and development' },
  client: 'Projet personnel',
  liens: {
    repo: 'https://github.com/kodage111/vegetable_market',
    live: 'https://vegetable-market-six.vercel.app/',
  },
  logo: '/projects/vegetable-market/favicon.ico',
  apercu: '/projects/vegetable-market/m-vegetables-preview.png',
  galerie: [
    { src: '/projects/vegetable-market/m-vegetables-preview.png', legende: { fr: `Page d'accueil`, en: 'Homepage' } },
    { src: '/projects/vegetable-market/m-vegetables-1.png', legende: { fr: 'Catalogue sur mobile', en: 'Catalog on mobile' } },
    { src: '/projects/vegetable-market/m-vegetables-2.png', legende: { fr: 'Fiche produit', en: 'Product details' } },
    { src: '/projects/vegetable-market/m-vegetables-3.png', legende: { fr: 'Valeurs nutritionnelles', en: 'Nutrition facts' } },
    { src: '/projects/vegetable-market/m-vegetables-4.png', legende: { fr: 'Conseils de cuisine', en: 'Cooking tips' } },
    { src: '/projects/vegetable-market/m-vegetables-5.png', legende: { fr: 'Indicateurs de saison', en: 'Seasonal indicators' } },
    { src: '/projects/vegetable-market/m-vegetables-6.png', legende: { fr: 'Mise en page responsive', en: 'Responsive layout' } },
  ],
  resultats: [
    { valeur: '0', libelle: { fr: 'framework : HTML, CSS et TypeScript', en: 'framework: HTML, CSS and TypeScript' } },
    { valeur: 'Mobile', libelle: { fr: `pensé d'abord pour le téléphone`, en: 'designed phone-first' } },
    { valeur: 'Vercel', libelle: { fr: 'démo en ligne', en: 'live demo' } },
  ],
  phare: false,
  ordre: 4,
};
