import { afterEach, describe, expect, it, vi } from 'vitest';
import sitemap from '@/app/sitemap';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('sitemap', () => {
  it('liste chaque route dans les deux langues avec ses alternates', () => {
    vi.stubEnv('NEXT_PUBLIC_URL_SITE', 'https://exemple.com');
    const entrees = sitemap();
    const urls = entrees.map((e) => e.url);
    expect(urls).toContain('https://exemple.com/fr');
    expect(urls).toContain('https://exemple.com/en');
    expect(urls).toContain('https://exemple.com/fr/projets');
    expect(urls).toContain('https://exemple.com/en/projects');
    expect(urls).toContain('https://exemple.com/fr/a-propos');
    expect(urls).toContain('https://exemple.com/en/about');
    expect(urls).toContain('https://exemple.com/fr/projets/titans');
    expect(urls).toContain('https://exemple.com/en/projects/titans');
    expect(entrees).toHaveLength((3 + 6) * 2);
    const titansEn = entrees.find((e) => e.url === 'https://exemple.com/en/projects/titans');
    expect(titansEn?.alternates?.languages).toEqual({
      fr: 'https://exemple.com/fr/projets/titans',
      en: 'https://exemple.com/en/projects/titans',
    });
  });
});
