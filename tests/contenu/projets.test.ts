import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { projets } from '@/content/projets';
import {
  estTypeProjet,
  listerProjets,
  projetPhare,
  projetsSelectionnes,
  projetsVoisins,
  slugsProjets,
  trouverProjet,
} from '@/lib/contenu/projets';

const RACINE = process.cwd();

describe('projets', () => {
  it('six projets, slugs uniques en kebab-case', () => {
    expect(projets).toHaveLength(6);
    const slugs = slugsProjets();
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('listerProjets trie par ordre et filtre par type', () => {
    expect(listerProjets().map((p) => p.slug)).toEqual([
      'titans',
      'kori-pro',
      'kori',
      'vegetable-market',
      'gec-sarl',
      'assurance-contract-handler',
    ]);
    expect(listerProjets('web').map((p) => p.slug)).toEqual(['vegetable-market', 'gec-sarl']);
    expect(listerProjets('mobile')).toHaveLength(4);
  });

  it('un seul projet phare, Titans, exclu des sélectionnés', () => {
    expect(projets.filter((p) => p.phare)).toHaveLength(1);
    expect(projetPhare().slug).toBe('titans');
    expect(projetsSelectionnes(3).map((p) => p.slug)).toEqual(['kori-pro', 'kori', 'vegetable-market']);
  });

  it('trouverProjet et voisins', () => {
    expect(trouverProjet('kori')?.nom).toBe('Korí');
    expect(trouverProjet('inconnu')).toBeUndefined();
    expect(projetsVoisins('titans')).toEqual({ precedent: undefined, suivant: trouverProjet('kori-pro') });
    expect(projetsVoisins('assurance-contract-handler').suivant).toBeUndefined();
    expect(projetsVoisins('kori').precedent?.slug).toBe('kori-pro');
  });

  it('estTypeProjet', () => {
    expect(estTypeProjet('mobile')).toBe(true);
    expect(estTypeProjet('web')).toBe(true);
    expect(estTypeProjet('desktop')).toBe(false);
    expect(estTypeProjet(undefined)).toBe(false);
  });

  it('chaque image référencée existe sous public/', () => {
    for (const projet of projets) {
      const chemins = [projet.logo, projet.apercu, ...projet.galerie.map((i) => i.src)].filter(
        (c): c is string => typeof c === 'string',
      );
      for (const chemin of chemins) {
        expect(existsSync(join(RACINE, 'public', chemin)), `${projet.slug} : ${chemin}`).toBe(true);
      }
    }
  });

  it('trois résultats et deux langues par projet', () => {
    for (const projet of projets) {
      expect(projet.resultats, projet.slug).toHaveLength(3);
      expect(projet.accroche.fr.length).toBeGreaterThan(0);
      expect(projet.accroche.en.length).toBeGreaterThan(0);
    }
  });
});
