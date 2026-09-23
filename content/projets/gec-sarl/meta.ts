import type { MetaProjet } from '@/lib/contenu/types';

/** GEC S.A.R.L — site institutionnel d'une entreprise de BTP. */
export const gecSarl: MetaProjet = {
  slug: 'gec-sarl',
  nom: 'GEC S.A.R.L',
  accroche: {
    fr: 'Site institutionnel d’une entreprise de BTP : services, chantiers, équipe et contact, en thème sombre.',
    en: 'Corporate website for a construction company: services, projects, team and contact, dark theme.',
  },
  categorie: { fr: 'Entreprise & institutionnel', en: 'Corporate & business' },
  type: 'web',
  plateformes: ['web'],
  stack: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
  role: { fr: 'Conception et développement', en: 'Design and development' },
  client: 'GEC S.A.R.L',
  liens: {
    repo: 'https://github.com/kodage111/gec_sarl/',
    live: 'https://gec-sarl-g8nb.vercel.app/',
  },
  logo: '/projects/gec/gec-logo.png',
  apercu: '/projects/gec/gec-preview.png',
  galerie: [
    { src: '/projects/gec/gec-2.png', legende: { fr: 'Page d’accueil', en: 'Homepage' } },
    { src: '/projects/gec/gec-3.png', legende: { fr: 'Services', en: 'Services' } },
    { src: '/projects/gec/gec-4.png', legende: { fr: 'Chantiers', en: 'Projects' } },
    { src: '/projects/gec/gec-5.png', legende: { fr: 'À propos', en: 'About' } },
    { src: '/projects/gec/gec-6.png', legende: { fr: 'Contact', en: 'Contact' } },
    { src: '/projects/gec/gec-7.png', legende: { fr: 'Thème sombre', en: 'Dark theme' } },
    { src: '/projects/gec/gec-8.png', legende: { fr: 'Version mobile', en: 'Mobile view' } },
    { src: '/projects/gec/gec-9.png', legende: { fr: 'Portfolio', en: 'Portfolio' } },
    { src: '/projects/gec/gec-10.png', legende: { fr: 'Équipe', en: 'Team' } },
  ],
  resultats: [
    { valeur: '8', libelle: { fr: 'pages', en: 'pages' } },
    { valeur: 'React', libelle: { fr: 'composants réutilisables + Tailwind', en: 'reusable components + Tailwind' } },
    { valeur: 'Vercel', libelle: { fr: 'en production', en: 'in production' } },
  ],
  phare: false,
  ordre: 5,
};
