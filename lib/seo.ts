import type { Metadata } from 'next';
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

/** Construit les métadonnées d'une page : titre, description, canonique, alternates hreflang, Open Graph. */
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
      languages: { ...languages, 'x-default': lien('fr', route, parametres) },
    },
    openGraph: {
      title: titre,
      description,
      url: canonique,
      siteName: 'Emmanuel Tene',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
  };
}
