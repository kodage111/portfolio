import { estLangue, LANGUE_DEFAUT, type Lang } from './locales';

/** Paramètres de route du segment `[lang]` (promesse depuis Next 15). */
export interface ParametresLang {
  params: Promise<{ lang: string }>;
}

/** Normalise le paramètre `lang` en langue servie. Le middleware garantit déjà une langue valide. */
export function langDepuis(valeur: string): Lang {
  return estLangue(valeur) ? valeur : LANGUE_DEFAUT;
}
