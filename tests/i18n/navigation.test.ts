import { describe, expect, it } from 'vitest';
import { deciderNavigation } from '@/lib/i18n/navigation';

describe('deciderNavigation', () => {
  it('redirige la racine vers la langue détectée (temporaire)', () => {
    expect(deciderNavigation('/', 'en-US,en', undefined)).toEqual({
      type: 'redirection',
      vers: '/en',
      permanente: false,
    });
    expect(deciderNavigation('/', null, undefined)).toEqual({ type: 'redirection', vers: '/fr', permanente: false });
    expect(deciderNavigation('/', 'en', 'fr')).toEqual({ type: 'redirection', vers: '/fr', permanente: false });
  });

  it('préfixe un chemin sans langue (temporaire)', () => {
    expect(deciderNavigation('/projects/titans', 'en', undefined)).toEqual({
      type: 'redirection',
      vers: '/en/projects/titans',
      permanente: false,
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

  it("redirige un segment de l'autre langue vers le canonique (permanent)", () => {
    expect(deciderNavigation('/en/projets', null, undefined)).toEqual({
      type: 'redirection',
      vers: '/en/projects',
      permanente: true,
    });
    expect(deciderNavigation('/en/projets/titans', null, undefined)).toEqual({
      type: 'redirection',
      vers: '/en/projects/titans',
      permanente: true,
    });
    expect(deciderNavigation('/fr/about', null, undefined)).toEqual({
      type: 'redirection',
      vers: '/fr/a-propos',
      permanente: true,
    });
    expect(deciderNavigation('/en/projets/titans/plus', null, undefined)).toEqual({
      type: 'redirection',
      vers: '/en/projects/titans/plus',
      permanente: true,
    });
  });

  it('laisse passer un segment inconnu (404 rendue par la page)', () => {
    expect(deciderNavigation('/fr/blog', null, undefined)).toEqual({ type: 'continuer' });
  });

  it('laisse toujours passer les chemins internes des images Open Graph', () => {
    expect(deciderNavigation('/en/projets/titans/opengraph-image', null, undefined)).toEqual({ type: 'continuer' });
    expect(deciderNavigation('/en/opengraph-image', null, undefined)).toEqual({ type: 'continuer' });
    expect(deciderNavigation('/fr/projets/titans/opengraph-image-abc123.png', null, undefined)).toEqual({
      type: 'continuer',
    });
  });
});
