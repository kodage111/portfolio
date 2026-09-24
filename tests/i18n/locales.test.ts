import { describe, expect, it } from 'vitest';
import { detecterLangue, estLangue } from '@/lib/i18n/locales';

describe('estLangue', () => {
  it('accepte fr et en', () => {
    expect(estLangue('fr')).toBe(true);
    expect(estLangue('en')).toBe(true);
  });

  it('refuse le reste', () => {
    expect(estLangue('de')).toBe(false);
    expect(estLangue('')).toBe(false);
    expect(estLangue(undefined)).toBe(false);
    expect(estLangue(null)).toBe(false);
  });
});

describe('detecterLangue', () => {
  it('sert fr sans indice', () => {
    expect(detecterLangue(null, undefined)).toBe('fr');
    expect(detecterLangue('', undefined)).toBe('fr');
  });

  it('lit la première langue connue de Accept-Language', () => {
    expect(detecterLangue('en-US,en;q=0.9,fr;q=0.8', undefined)).toBe('en');
    expect(detecterLangue('fr-FR,fr;q=0.9,en;q=0.8', undefined)).toBe('fr');
  });

  it('ignore les langues inconnues', () => {
    expect(detecterLangue('de-DE,de;q=0.9', undefined)).toBe('fr');
    expect(detecterLangue('de,en;q=0.5', undefined)).toBe('en');
  });

  it('fait primer le cookie', () => {
    expect(detecterLangue('en-US', 'fr')).toBe('fr');
  });

  it('ignore un cookie invalide', () => {
    expect(detecterLangue('en', 'xx')).toBe('en');
  });
});
