import type { Lang } from '@/lib/i18n/locales';

const LOCALES: Record<Lang, string> = { fr: 'fr-FR', en: 'en-US' };

/** Formate `AAAA-MM` en « mars 2024 » / « March 2024 ». */
export function formaterMois(aaaaMm: string, lang: Lang): string {
  const [annee, mois] = aaaaMm.split('-').map(Number);
  const date = new Date(Date.UTC(annee, mois - 1, 1));
  return new Intl.DateTimeFormat(LOCALES[lang], { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}

/** Formate `AAAA-MM` en son année seule, ex. `2020-01` → `2020`. */
export function formaterAnnee(aaaaMm: string): string {
  return aaaaMm.split('-')[0];
}

/** Formate une période « mars 2024 – aujourd'hui ». [libelleEnCours] remplace une fin absente. */
export function formaterPeriode(debut: string, fin: string | null, lang: Lang, libelleEnCours: string): string {
  return `${formaterMois(debut, lang)} – ${fin ? formaterMois(fin, lang) : libelleEnCours}`;
}
