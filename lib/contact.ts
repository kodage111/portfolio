/** Coordonnées publiques. Une valeur absente vaut `''` et le lien correspondant n'est pas rendu. */
export interface Coordonnees {
  email: string;
  telephone: string;
  /** Numéro sans `+` ni espaces, prêt pour `wa.me`. */
  whatsapp: string;
  linkedin: string;
  /** Origine du site, sans barre finale. */
  urlSite: string;
}

/**
 * Lit les coordonnées dans les variables `NEXT_PUBLIC_*`. Jamais de valeur en dur ailleurs.
 *
 * L'URL du site suit cet ordre de priorité : `NEXT_PUBLIC_URL_SITE` (définie
 * explicitement) prime sur `VERCEL_PROJECT_PRODUCTION_URL` (domaine de
 * production fourni par Vercel, sans schéma), qui prime sur `http://localhost:3000`
 * en dernier recours. Sans cette cascade, une variable oubliée en production
 * ferait retomber silencieusement le site sur `localhost`.
 */
export function coordonnees(): Coordonnees {
  const urlVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined;
  return {
    email: process.env.NEXT_PUBLIC_EMAIL ?? '',
    telephone: process.env.NEXT_PUBLIC_TELEPHONE ?? '',
    whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP ?? '').replace(/\D/g, ''),
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? '',
    urlSite: (process.env.NEXT_PUBLIC_URL_SITE ?? urlVercel ?? 'http://localhost:3000').replace(/\/$/, ''),
  };
}

/** Construit l'URL `wa.me` avec un message d'ouverture pré-rempli. Retourne `''` sans numéro. */
export function lienWhatsapp(numero: string, message: string): string {
  return numero ? `https://wa.me/${numero}?text=${encodeURIComponent(message)}` : '';
}
