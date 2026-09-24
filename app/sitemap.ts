import type { MetadataRoute } from 'next';
import { coordonnees } from '@/lib/contact';
import { slugsProjets } from '@/lib/contenu/projets';
import { LANGUES } from '@/lib/i18n/locales';
import { lien, type ParametresRoute, type Route } from '@/lib/i18n/routes';

/** Sitemap : chaque route dans chaque langue, avec ses alternates hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  const { urlSite } = coordonnees();
  const maintenant = new Date();
  const routes: { route: Route; parametres?: ParametresRoute }[] = [
    { route: 'accueil' },
    { route: 'projets' },
    { route: 'aPropos' },
    ...slugsProjets().map((slug) => ({ route: 'projet' as const, parametres: { slug } })),
  ];
  return routes.flatMap(({ route, parametres }) =>
    LANGUES.map((lang) => ({
      url: `${urlSite}${lien(lang, route, parametres)}`,
      lastModified: maintenant,
      alternates: {
        languages: Object.fromEntries(LANGUES.map((l) => [l, `${urlSite}${lien(l, route, parametres)}`])),
      },
    })),
  );
}
