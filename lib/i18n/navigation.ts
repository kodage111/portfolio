import { detecterLangue, estLangue, type Lang } from './locales';
import { SEGMENTS, trouverSegment } from './routes';

/** Ce que le middleware doit faire d'une requête. */
export type DecisionNavigation =
  | { type: 'redirection'; vers: string; permanente: boolean }
  | { type: 'reecriture'; vers: string }
  | { type: 'continuer' };

/**
 * Décide, pour un chemin public, s'il faut rediriger (langue absente,
 * segment d'une autre langue), réécrire vers le dossier interne (segment
 * anglais) ou laisser passer.
 *
 * La redirection de détection de langue (racine ou chemin sans préfixe) est
 * `permanente: false` : elle dépend de l'en-tête `Accept-Language` ou du
 * cookie, qui peuvent changer d'une requête à l'autre — un 308 mis en cache
 * par le navigateur empêcherait le choix du visiteur d'atteindre le serveur.
 * La redirection d'un segment d'une autre langue vers son équivalent
 * canonique est `permanente: true` : ce mappage est fixe.
 *
 * Les chemins internes des images Open Graph (dernier segment commençant par
 * `opengraph-image`) laissent toujours passer : Next les génère à partir de
 * la route interne, jamais du segment localisé.
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
    return { type: 'redirection', vers: `/${lang}${suite}`, permanente: false };
  }
  if (segments[segments.length - 1]?.startsWith('opengraph-image')) return { type: 'continuer' };
  const lang: Lang = premier;
  if (segment === undefined) return { type: 'continuer' };

  const trouve = trouverSegment(segment);
  if (!trouve) return { type: 'continuer' };

  if (trouve.langDuSegment !== lang) {
    return {
      type: 'redirection',
      vers: `/${[lang, SEGMENTS[trouve.route][lang], ...reste].join('/')}`,
      permanente: true,
    };
  }
  const segmentInterne = SEGMENTS[trouve.route].fr;
  if (segment === segmentInterne) return { type: 'continuer' };
  return { type: 'reecriture', vers: `/${[lang, segmentInterne, ...reste].join('/')}` };
}
