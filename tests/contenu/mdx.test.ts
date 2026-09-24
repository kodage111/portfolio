import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { slugsProjets } from '@/lib/contenu/projets';
import { LANGUES } from '@/lib/i18n/locales';

const RACINE = process.cwd();
const SECTIONS: Record<string, string[]> = {
  fr: ['## Contexte', '## Problème', '## Solution', '## Résultats'],
  en: ['## Context', '## Problem', '## Solution', '## Results'],
};

describe('études de cas MDX', () => {
  it('chaque projet a un MDX par langue avec les quatre sections', () => {
    for (const slug of slugsProjets()) {
      for (const lang of LANGUES) {
        const chemin = join(RACINE, 'content', 'projets', slug, `${lang}.mdx`);
        expect(existsSync(chemin), chemin).toBe(true);
        const contenu = readFileSync(chemin, 'utf8');
        for (const section of SECTIONS[lang]) expect(contenu, `${slug}/${lang}`).toContain(section);
      }
    }
  });
});
