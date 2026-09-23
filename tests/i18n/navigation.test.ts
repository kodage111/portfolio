import { describe, expect, it } from 'vitest';
import { deciderNavigation } from '@/lib/i18n/navigation';

describe('deciderNavigation', () => {
  it('redirige la racine vers la langue détectée', () => {
    expect(deciderNavigation('/', 'en-US,en', undefined)).toEqual({ type: 'redirection', vers: '/en' });
    expect(deciderNavigation('/', null, undefined)).toEqual({ type: 'redirection', vers: '/fr' });
    expect(deciderNavigation('/', 'en', 'fr')).toEqual({ type: 'redirection', vers: '/fr' });
  });

  it('préfixe un chemin sans langue', () => {
    expect(deciderNavigation('/projects/titans', 'en', undefined)).toEqual({
      type: 'redirection',
      vers: '/en/projects/titans',
    });
  });

  it('laisse passer les chemins français canoniques', () => {
    expect(deciderNavigation('/fr', null, undefined)).toEqual({ type: 'continuer' });
    expect(deciderNavigation('/fr/projets', null, undefined)).toEqual({ type: 'continuer' });
    expect(deciderNavigation('/fr/projets/titans', null, undefined)).toEqual({ type: 'continuer' });
    expect(deciderNavigation('/fr/a-propos', null, undefined)).toEqual({ type: 'continuer' });
    expect(deciderNavigation('/en', null, undefined)).toEqual({ type: 'continuer' });
  });

  it('réécrit les segments anglais vers les dossiers internes', () => {
    expect(deciderNavigation('/en/projects', null, undefined)).toEqual({ type: 'reecriture', vers: '/en/projets' });
    expect(deciderNavigation('/en/projects/titans', null, undefined)).toEqual({
      type: 'reecriture',
      vers: '/en/projets/titans',
    });
    expect(deciderNavigation('/en/about', null, undefined)).toEqual({ type: 'reecriture', vers: '/en/a-propos' });
  });

  it("redirige un segment de l'autre langue vers le canonique", () => {
    expect(deciderNavigation('/en/projets', null, undefined)).toEqual({ type: 'redirection', vers: '/en/projects' });
    expect(deciderNavigation('/en/projets/titans', null, undefined)).toEqual({
      type: 'redirection',
      vers: '/en/projects/titans',
    });
    expect(deciderNavigation('/fr/about', null, undefined)).toEqual({ type: 'redirection', vers: '/fr/a-propos' });
    expect(deciderNavigation('/en/projets/titans/plus', null, undefined)).toEqual({
      type: 'redirection',
      vers: '/en/projects/titans/plus',
    });
  });

  it('laisse passer un segment inconnu (404 rendue par la page)', () => {
    expect(deciderNavigation('/fr/blog', null, undefined)).toEqual({ type: 'continuer' });
  });
});
