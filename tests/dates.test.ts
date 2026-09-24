import { describe, expect, it } from 'vitest';
import { formaterAnnee, formaterMois, formaterPeriode } from '@/lib/dates';

describe('dates', () => {
  it('formate un mois dans chaque langue', () => {
    expect(formaterMois('2024-03', 'fr')).toBe('mars 2024');
    expect(formaterMois('2024-03', 'en')).toBe('March 2024');
  });

  it('formate une année seule', () => {
    expect(formaterAnnee('2020-01')).toBe('2020');
  });

  it('formate une période close ou en cours', () => {
    expect(formaterPeriode('2023-03', '2024-03', 'fr', 'aujourd’hui')).toBe('mars 2023 – mars 2024');
    expect(formaterPeriode('2026-04', null, 'en', 'present')).toBe('April 2026 – present');
  });
});
