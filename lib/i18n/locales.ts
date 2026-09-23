/** Langues servies par le site, dans l'ordre d'affichage du sélecteur. */
export const LANGUES = ['fr', 'en'] as const;

/** Une langue servie par le site. */
export type Lang = (typeof LANGUES)[number];

/** Langue servie quand rien ne permet d'en choisir une autre. */
export const LANGUE_DEFAUT: Lang = 'fr';

/** Nom du cookie qui mémorise la langue choisie explicitement par le visiteur. */
export const COOKIE_LANGUE = 'langue';

/** Durée de vie du cookie de langue, en secondes (un an). */
export const DUREE_COOKIE_LANGUE = 60 * 60 * 24 * 365;

/** Indique si [valeur] est une langue servie par le site. */
export function estLangue(valeur: string | null | undefined): valeur is Lang {
  return LANGUES.includes(valeur as Lang);
}

/**
 * Choisit la langue à servir.
 *
 * Le cookie (choix explicite) prime sur l'en-tête `Accept-Language`, lu dans
 * l'ordre où le navigateur liste ses préférences (les facteurs `q` ne sont
 * pas réordonnés). Sans correspondance : [LANGUE_DEFAUT].
 *
 * [acceptLanguage] valeur brute de l'en-tête, ex. `fr-FR,fr;q=0.9,en;q=0.8`.
 * [cookie] valeur du cookie [COOKIE_LANGUE], si présent.
 */
export function detecterLangue(
  acceptLanguage: string | null | undefined,
  cookie: string | null | undefined,
): Lang {
  if (estLangue(cookie)) return cookie;
  if (!acceptLanguage) return LANGUE_DEFAUT;
  const candidats = acceptLanguage
    .split(',')
    .map((partie) => partie.split(';')[0].trim().toLowerCase().split('-')[0]);
  return candidats.find(estLangue) ?? LANGUE_DEFAUT;
}
