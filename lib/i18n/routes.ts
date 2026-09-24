import { estLangue, LANGUES, type Lang } from './locales';

/** Routes internes du site. `projet` prend un slug. */
export type Route = 'accueil' | 'projets' | 'projet' | 'aPropos';

/** Routes qui possèdent un segment d'URL localisé. */
export type RouteSegmentee = 'projets' | 'aPropos';

/**
 * Segments d'URL publics des routes localisées, par langue.
 * Le segment `fr` est aussi le nom du dossier interne sous `app/[lang]/`.
 */
export const SEGMENTS: Record<RouteSegmentee, Record<Lang, string>> = {
  projets: { fr: 'projets', en: 'projects' },
  aPropos: { fr: 'a-propos', en: 'about' },
};

/** Paramètres d'une route (slug du projet pour `projet`). */
export interface ParametresRoute {
  slug?: string;
}

/** Résultat de l'analyse d'un chemin public. */
export interface CheminResolu {
  lang: Lang;
  route: Route;
  slug?: string;
}

/** Construit l'URL publique d'une route dans une langue. */
export function lien(lang: Lang, route: Route, parametres: ParametresRoute = {}): string {
  switch (route) {
    case 'accueil':
      return `/${lang}`;
    case 'projets':
      return `/${lang}/${SEGMENTS.projets[lang]}`;
    case 'projet':
      return `/${lang}/${SEGMENTS.projets[lang]}/${parametres.slug ?? ''}`;
    case 'aPropos':
      return `/${lang}/${SEGMENTS.aPropos[lang]}`;
  }
}

/** Retrouve la route et la langue d'un segment public, toutes langues confondues. `null` si inconnu. */
export function trouverSegment(
  segment: string,
): { route: RouteSegmentee; langDuSegment: Lang } | null {
  for (const route of Object.keys(SEGMENTS) as RouteSegmentee[]) {
    for (const lang of LANGUES) {
      if (SEGMENTS[route][lang] === segment) return { route, langDuSegment: lang };
    }
  }
  return null;
}

/**
 * Analyse un chemin public (`/en/projects/titans`) en langue, route et slug.
 *
 * Retourne `null` si la langue est inconnue, le segment inconnu ou le chemin
 * trop profond. En mode strict (défaut), un segment d'une autre langue que
 * celle du préfixe est aussi refusé ; [tolerant] l'accepte (utile côté client,
 * où le chemin peut être celui réécrit par le middleware).
 */
export function resoudreChemin(chemin: string, tolerant = false): CheminResolu | null {
  const [lang, segment, slug, ...reste] = chemin.split('/').filter(Boolean);
  if (!estLangue(lang) || reste.length > 0) return null;
  if (segment === undefined) return { lang, route: 'accueil' };
  const trouve = trouverSegment(segment);
  if (!trouve) return null;
  if (!tolerant && trouve.langDuSegment !== lang) return null;
  if (trouve.route === 'aPropos') return slug === undefined ? { lang, route: 'aPropos' } : null;
  return slug === undefined ? { lang, route: 'projets' } : { lang, route: 'projet', slug };
}
