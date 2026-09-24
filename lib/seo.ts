import type { Metadata } from 'next';
import { profil } from '@/content/profil';
import { coordonnees } from '@/lib/contact';
import { LANGUES, type Lang } from '@/lib/i18n/locales';
import { lien, type ParametresRoute, type Route } from '@/lib/i18n/routes';

interface ParametresMetadonnees {
  lang: Lang;
  route: Route;
  parametres?: ParametresRoute;
  titre: string;
  description: string;
}

/**
 * Construit les métadonnées d'une page : titre, description, canonique,
 * alternates hreflang, Open Graph.
 *
 * `x-default` pointe vers `/`, la racine qui redirige selon la langue
 * détectée — pas vers l'URL française — car c'est elle que les moteurs de
 * recherche doivent proposer à un visiteur dont aucune langue déclarée ne
 * correspond au site.
 */
export function genererMetadonnees({ lang, route, parametres, titre, description }: ParametresMetadonnees): Metadata {
  const { urlSite } = coordonnees();
  const canonique = lien(lang, route, parametres);
  const languages = Object.fromEntries(LANGUES.map((l) => [l, lien(l, route, parametres)]));
  return {
    title: titre,
    description,
    metadataBase: new URL(urlSite),
    alternates: {
      canonical: canonique,
      languages: { ...languages, 'x-default': '/' },
    },
    openGraph: {
      title: titre,
      description,
      url: canonique,
      siteName: profil.nomCourt,
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
  };
}
