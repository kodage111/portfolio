import fr from '@/dictionnaires/fr.json';
import en from '@/dictionnaires/en.json';
import type { Lang } from './locales';

/** Forme du dictionnaire d'interface, dérivée du fichier français de référence. */
export type Dictionnaire = typeof fr;

/** Le fichier anglais est typé contre la forme française : une clé manquante casse la compilation. */
const DICTIONNAIRES: Record<Lang, Dictionnaire> = { fr, en };

/** Retourne le dictionnaire d'interface de [lang]. */
export function getDictionnaire(lang: Lang): Dictionnaire {
  return DICTIONNAIRES[lang];
}
