import { describe, expect, it } from 'vitest';
import fr from '@/dictionnaires/fr.json';
import en from '@/dictionnaires/en.json';
import { getDictionnaire } from '@/lib/i18n/dictionnaires';

/** Aplati un objet en liste de chemins de feuilles (`a.b.0.c`). */
function chemins(valeur: unknown, prefixe = ''): string[] {
  if (Array.isArray(valeur)) return valeur.flatMap((v, i) => chemins(v, `${prefixe}${i}.`));
  if (valeur && typeof valeur === 'object') {
    return Object.entries(valeur).flatMap(([cle, v]) => chemins(v, `${prefixe}${cle}.`));
  }
  return [prefixe.slice(0, -1)];
}

/** Lit la feuille désignée par un chemin `a.b.0.c`. */
function lire(objet: unknown, chemin: string): unknown {
  return chemin.split('.').reduce<unknown>((o, cle) => (o as Record<string, unknown>)[cle], objet);
}

describe('dictionnaires', () => {
  it('fr et en ont exactement les mêmes clés', () => {
    expect(chemins(en).sort()).toEqual(chemins(fr).sort());
  });

  it('aucune valeur vide', () => {
    for (const dictionnaire of [fr, en]) {
      for (const chemin of chemins(dictionnaire)) {
        const valeur = lire(dictionnaire, chemin);
        expect(typeof valeur === 'string' && valeur.trim().length > 0, `valeur vide : ${chemin}`).toBe(true);
      }
    }
  });

  it('getDictionnaire sert la bonne langue', () => {
    expect(getDictionnaire('fr').nav.projets).toBe('Projets');
    expect(getDictionnaire('en').nav.projets).toBe('Projects');
  });
});
