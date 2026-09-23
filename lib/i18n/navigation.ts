import { detecterLangue, estLangue, type Lang } from './locales';
import { SEGMENTS, trouverSegment } from './routes';

/** Ce que le middleware doit faire d'une requête. */
export type DecisionNavigation =
  | { type: 'redirection'; vers: string }
  | { type: 'reecriture'; vers: string }
  | { type: 'continuer' };

/**
 * Décide, pour un chemin public, s'il faut rediriger (langue absente,
 * segment d'une autre langue), réécrire vers le dossier interne (segment
 * anglais) ou laisser passer.
 *
 * [chemin] `pathname` de la requête, ex. `/en/projects/titans`.
 * [acceptLanguage] en-tête `Accept-Language` brut.
 * [cookie] valeur du cookie de langue, si présent.
 */
export function deciderNavigation(
  chemin: string,
  acceptLanguage: string | null | undefined,
  cookie: string | null | undefined,
): DecisionNavigation {
  const segments = chemin.split('/').filter(Boolean);
  const [premier, segment, ...reste] = segments;

  if (!estLangue(premier)) {
    const lang = detecterLangue(acceptLanguage, cookie);
    const suite = segments.length > 0 ? `/${segments.join('/')}` : '';
    return { type: 'redirection', vers: `/${lang}${suite}` };
  }
  const lang: Lang = premier;
  if (segment === undefined) return { type: 'continuer' };

  const trouve = trouverSegment(segment);
  if (!trouve) return { type: 'continuer' };

  if (trouve.langDuSegment !== lang) {
    return { type: 'redirection', vers: `/${[lang, SEGMENTS[trouve.route][lang], ...reste].join('/')}` };
  }
  const segmentInterne = SEGMENTS[trouve.route].fr;
  if (segment === segmentInterne) return { type: 'continuer' };
  return { type: 'reecriture', vers: `/${[lang, segmentInterne, ...reste].join('/')}` };
}
