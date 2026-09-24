import { describe, expect, it } from 'vitest';
import { lien, resoudreChemin, trouverSegment } from '@/lib/i18n/routes';

describe('lien', () => {
  it('localise les segments', () => {
    expect(lien('fr', 'accueil')).toBe('/fr');
    expect(lien('en', 'accueil')).toBe('/en');
    expect(lien('fr', 'projets')).toBe('/fr/projets');
    expect(lien('en', 'projets')).toBe('/en/projects');
    expect(lien('fr', 'aPropos')).toBe('/fr/a-propos');
    expect(lien('en', 'aPropos')).toBe('/en/about');
  });

  it("insère le slug du projet", () => {
    expect(lien('fr', 'projet', { slug: 'titans' })).toBe('/fr/projets/titans');
    expect(lien('en', 'projet', { slug: 'titans' })).toBe('/en/projects/titans');
  });
});

describe('trouverSegment', () => {
  it("retrouve la route et la langue du segment", () => {
    expect(trouverSegment('projects')).toEqual({ route: 'projets', langDuSegment: 'en' });
    expect(trouverSegment('projets')).toEqual({ route: 'projets', langDuSegment: 'fr' });
    expect(trouverSegment('a-propos')).toEqual({ route: 'aPropos', langDuSegment: 'fr' });
    expect(trouverSegment('about')).toEqual({ route: 'aPropos', langDuSegment: 'en' });
  });

  it("retourne null pour un segment inconnu", () => {
    expect(trouverSegment('blog')).toBeNull();
  });
});

describe('resoudreChemin', () => {
  it("est l'inverse de lien", () => {
    expect(resoudreChemin('/fr')).toEqual({ lang: 'fr', route: 'accueil' });
    expect(resoudreChemin('/en/projects')).toEqual({ lang: 'en', route: 'projets' });
    expect(resoudreChemin('/en/projects/titans')).toEqual({ lang: 'en', route: 'projet', slug: 'titans' });
    expect(resoudreChemin('/fr/a-propos')).toEqual({ lang: 'fr', route: 'aPropos' });
  });

  it("refuse un segment d'une autre langue en mode strict", () => {
    expect(resoudreChemin('/en/projets')).toBeNull();
    expect(resoudreChemin('/fr/about')).toBeNull();
  });

  it("accepte un segment d'une autre langue en mode tolérant", () => {
    expect(resoudreChemin('/en/projets', true)).toEqual({ lang: 'en', route: 'projets' });
    expect(resoudreChemin('/en/projets/titans', true)).toEqual({ lang: 'en', route: 'projet', slug: 'titans' });
    expect(resoudreChemin('/fr/about', true)).toEqual({ lang: 'fr', route: 'aPropos' });
  });

  it("refuse langue inconnue, segment inconnu, profondeur excessive", () => {
    expect(resoudreChemin('/')).toBeNull();
    expect(resoudreChemin('/de')).toBeNull();
    expect(resoudreChemin('/fr/blog')).toBeNull();
    expect(resoudreChemin('/fr/a-propos/x')).toBeNull();
    expect(resoudreChemin('/fr/projets/titans/plus')).toBeNull();
  });
});
