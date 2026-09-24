import { afterEach, describe, expect, it, vi } from 'vitest';
import { profil } from '@/content/profil';
import { genererMetadonnees } from '@/lib/seo';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('genererMetadonnees', () => {
  it("construit titre, description, canonique, alternates et Open Graph d'une étude de cas", () => {
    vi.stubEnv('NEXT_PUBLIC_URL_SITE', 'https://exemple.com');
    const metadonnees = genererMetadonnees({
      lang: 'en',
      route: 'projet',
      parametres: { slug: 'titans' },
      titre: 'T',
      description: 'D',
    });

    expect(metadonnees.title).toBe('T');
    expect(metadonnees.description).toBe('D');
    expect(metadonnees.metadataBase).toEqual(new URL('https://exemple.com'));
    expect(metadonnees.alternates?.canonical).toBe('/en/projects/titans');
    expect(metadonnees.alternates?.languages).toEqual({
      fr: '/fr/projets/titans',
      en: '/en/projects/titans',
      'x-default': '/',
    });
    expect(metadonnees.openGraph?.locale).toBe('en_US');
    expect(metadonnees.openGraph?.siteName).toBe(profil.nomCourt);
  });
});
