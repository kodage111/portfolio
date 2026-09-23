import type { Profil } from '@/lib/contenu/types';

/** Identité affichée sur le site. Email, téléphone et LinkedIn viennent de `lib/contact.ts`. */
export const profil: Profil = {
  prenom: 'Emmanuel',
  nomComplet: 'Tene Tampo Emmanuel',
  nomCourt: 'Emmanuel Tene',
  role: {
    fr: 'Software Engineer · Développeur Flutter & Next.js',
    en: 'Software Engineer · Flutter & Next.js Developer',
  },
  ville: { fr: 'Douala, Cameroun', en: 'Douala, Cameroon' },
  github: 'https://github.com/kodage111',
  cv: { fr: '/cv/cv-fr.pdf', en: '/cv/cv-en.pdf' },
  portrait: '/portrait/portrait.png',
};
