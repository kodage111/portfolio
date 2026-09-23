# Refonte portfolio v2 — plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer le site Vite/React par un portfolio Next.js 15 bilingue fr/en, sombre + accent vert acide, avec contenu typé et études de cas MDX, prêt pour Vercel.

**Architecture:** App Router avec segment `app/[lang]` ; un middleware détecte la langue et réécrit les slugs publics localisés (`/en/projects`) vers les dossiers internes français (`/en/projets`). Contenu dans `content/` (TypeScript typé + un MDX par projet et par langue), dictionnaires JSON typés, composants serveur par défaut, quatre composants client (sélecteur de langue, révélation au défilement, galerie, visionneuse).

**Tech Stack:** Next.js 15.5, React 19, TypeScript 5, Tailwind 4 (`@theme`), `@next/mdx`, `next/font` (Syne, Inter, JetBrains Mono), `lucide-react` + `react-icons`, Vitest 3, ESLint 9, GitHub Actions, Vercel.

Spec de référence : `docs/superpowers/specs/2026-09-23-refonte-portfolio-design.md`.

## Global Constraints

- Repo `C:\Users\tetem\StudioProjects\portfolio`, branche `refonte/v2`. Tous les chemins ci-dessous sont relatifs à cette racine. Les commandes s'exécutent depuis cette racine (`cd /c/Users/tetem/StudioProjects/portfolio`).
- **Aucun `git push`, aucune PR, aucun déploiement** sans autorisation explicite du propriétaire. Commits locaux uniquement.
- Versions : `next ^15.5.0` (jamais 16), `react ^19.1.0`, `tailwindcss ^4.1.0`. Node 22 (installé : v22.22.0, npm 10.9.4).
- Identifiants (fonctions, composants, props, fichiers sous `composants/`, `lib/`, `content/`) et documentation en **français**. Exceptions : API du framework (`generateMetadata`, `generateStaticParams`, `middleware`, `page.tsx`, `layout.tsx`, `not-found.tsx`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `mdx-components.tsx`), chemins d'images existants sous `public/projects/`, valeurs `className` Tailwind.
- Doc `/** */` en français sur chaque composant, fonction et type exporté. Une ligne impérative, puis détail si nécessaire.
- Aucune couleur, taille de fonte, rayon ou espacement en dur dans les composants : uniquement les tokens de `app/globals.css` (`@theme`) et les tokens Tailwind par défaut (`text-sm`, `gap-4`, `p-5`…). Une seule exception documentée : `lib/couleurs.ts`, miroir des couleurs pour les images Open Graph (Satori ne lit pas le CSS).
- Pas de `Record<string, any>` ni de `any`. Types partagés dans `lib/contenu/types.ts`.
- Coordonnées (email, téléphone, WhatsApp, LinkedIn, URL du site) uniquement via `NEXT_PUBLIC_*` lues dans `lib/contact.ts`. Jamais en dur.
- Motion : 150–300 ms, `ease-out`, `prefers-reduced-motion` respecté globalement dans `globals.css`.
- Commits conventionnels `type(scope): message` avec le trailer `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Vérification standard (à lancer avant chaque commit, à partir de la tâche 2) : `npm run lint && npm run typecheck && npm test && npm run build`.
- Contenus intentionnellement absents (pas des placeholders) : périodes des anciens projets (`periode` optionnel), captures Titans (`apercu` optionnel, `galerie: []`), fichiers CV sous `public/cv/`. Le propriétaire les fournit ensuite ; le code doit fonctionner sans.

---

### Task 1 : Nettoyage de l'ancien site et scaffold Next.js 15 + Tailwind 4

**Files:**
- Delete : `src/`, `index.html`, `vite.config.ts`, `postcss.config.js`, `tailwind.config.js`, `tsconfig.node.json`, `public/icons/`, `package-lock.json`
- Move : `public/image.png` → `public/portrait/portrait.png`
- Create : `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `mdx-components.tsx`, `.env.example`, `app/globals.css`, `app/[lang]/layout.tsx` (temporaire), `app/[lang]/page.tsx` (temporaire), `public/cv/.gitkeep`
- Modify : `.gitignore`

**Interfaces:**
- Produces : tokens CSS (`bg-fond`, `text-texte`, `text-texte-secondaire`, `bg-surface`, `bg-surface-elevee`, `border-bordure`, `bg-accent`, `text-accent`, `bg-accent-sombre`, `rounded-puce`, `rounded-carte`, `rounded-mockup`, `font-display`, `font-sans`, `font-mono`, `text-display`, `text-display-mobile`, `text-h2`, `text-h3`, `text-corps-large`, `text-mono`, `aspect-telephone`, `aspect-navigateur`, `max-w-site`, `max-w-telephone`, `max-w-portrait`, `ease-sortie`) et utilitaires `conteneur`, `section-espace`. Alias `@/*` → racine. Scripts npm `dev`, `build`, `start`, `lint`, `typecheck`, `test`.

- [ ] **Step 1 : Supprimer l'ancien site et déplacer le portrait**

```bash
cd /c/Users/tetem/StudioProjects/portfolio
git rm -r -q src index.html vite.config.ts postcss.config.js tailwind.config.js tsconfig.node.json public/icons package-lock.json
mkdir -p public/portrait public/cv
git mv public/image.png public/portrait/portrait.png
touch public/cv/.gitkeep
git status --short | head -20
```

Attendu : lignes `D` pour les fichiers supprimés, `R` pour le portrait. `public/projects/` et `public/logos/` intacts.

- [ ] **Step 2 : Écrire `package.json`**

```json
{
  "name": "portfolio",
  "private": true,
  "version": "2.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@mdx-js/loader": "^3.1.0",
    "@mdx-js/react": "^3.1.0",
    "@next/mdx": "^15.5.0",
    "lucide-react": "^0.544.0",
    "next": "^15.5.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-icons": "^5.5.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.3.0",
    "@tailwindcss/postcss": "^4.1.0",
    "@types/mdx": "^2.0.13",
    "@types/node": "^22.0.0",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "eslint": "^9.30.0",
    "eslint-config-next": "^15.5.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.7.0",
    "vitest": "^3.2.0"
  }
}
```

- [ ] **Step 3 : Écrire `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4 : Écrire les configs Next, PostCSS, ESLint, Vitest, MDX**

`next.config.ts` :

```ts
import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

/** Configuration Next.js : pages MDX activées, icônes devicon (jsdelivr) autorisées pour `next/image`. */
const configuration: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.jsdelivr.net' }],
  },
};

const avecMDX = createMDX({});

export default avecMDX(configuration);
```

`postcss.config.mjs` :

```js
/** Tailwind 4 via son plugin PostCSS. */
const config = { plugins: { '@tailwindcss/postcss': {} } };

export default config;
```

`eslint.config.mjs` :

```js
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const racine = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: racine });

/** Règles Next.js (core-web-vitals + TypeScript) en config plate ESLint 9. */
const config = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
];

export default config;
```

`vitest.config.ts` :

```ts
import { defineConfig } from 'vitest/config';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = dirname(fileURLToPath(import.meta.url));

/** Tests purs (Node) sous `tests/`, alias `@` vers la racine comme dans tsconfig. */
export default defineConfig({
  resolve: { alias: { '@': racine } },
  test: { include: ['tests/**/*.test.ts'], environment: 'node' },
});
```

`mdx-components.tsx` (version minimale, enrichie à la tâche 6) :

```tsx
import type { MDXComponents } from 'mdx/types';

/** Composants injectés dans chaque fichier MDX. Requis par `@next/mdx` avec l'App Router. */
export function useMDXComponents(composants: MDXComponents): MDXComponents {
  return { ...composants };
}
```

- [ ] **Step 5 : Compléter `.gitignore` et écrire `.env.example`**

```bash
cat >> .gitignore <<'EOF'

# Next.js
.next/
out/
next-env.d.ts
.vercel/
.env*.local
EOF
```

`.env.example` :

```
# Copier en .env.local et remplir. Tout est public (exposé au navigateur).
NEXT_PUBLIC_URL_SITE=https://exemple.vercel.app
NEXT_PUBLIC_EMAIL=prenom@exemple.com
NEXT_PUBLIC_TELEPHONE=+237600000000
NEXT_PUBLIC_WHATSAPP=237600000000
NEXT_PUBLIC_LINKEDIN=https://www.linkedin.com/in/identifiant
```

- [ ] **Step 6 : Écrire `app/globals.css` (tokens du système visuel)**

```css
@import "tailwindcss";

/*
 * Tokens du système visuel — seule source de vérité pour couleurs, fontes,
 * rayons, tailles et espacements. Aucun composant ne porte de valeur en dur.
 */
@theme {
  --color-fond: #0a0a0b;
  --color-surface: #141416;
  --color-surface-elevee: #1c1c1f;
  --color-bordure: #26262b;
  --color-texte: #f2f2f0;
  --color-texte-secondaire: #a1a1a6;
  --color-accent: #b6f400;
  --color-accent-sombre: #7faa00;

  --radius-puce: 0.5rem;
  --radius-carte: 1rem;
  --radius-mockup: 1.5rem;

  --spacing-section: 6rem;
  --spacing-section-mobile: 4rem;

  --container-site: 75rem;
  --container-telephone: 17.5rem;
  --container-portrait: 26rem;

  --text-display: 3.5rem;
  --text-display--line-height: 1.05;
  --text-display-mobile: 2.5rem;
  --text-display-mobile--line-height: 1.1;
  --text-h2: 2rem;
  --text-h2--line-height: 1.15;
  --text-h3: 1.5rem;
  --text-h3--line-height: 1.25;
  --text-corps-large: 1.125rem;
  --text-corps-large--line-height: 1.6;
  --text-mono: 0.8125rem;
  --text-mono--line-height: 1.4;

  --aspect-telephone: 9 / 19;
  --aspect-navigateur: 16 / 10;

  --ease-sortie: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Fontes chargées par next/font dans le layout ; résolues à l'usage, pas à :root. */
@theme inline {
  --font-display: var(--font-syne), sans-serif;
  --font-sans: var(--font-inter), sans-serif;
  --font-mono: var(--font-jetbrains), monospace;
}

@layer base {
  html {
    background-color: var(--color-fond);
    color: var(--color-texte);
    scroll-behavior: smooth;
  }
  body {
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3 {
    font-family: var(--font-display);
    letter-spacing: -0.02em;
  }
  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }
  ::selection {
    background-color: var(--color-accent);
    color: var(--color-fond);
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}

/* Conteneur centré : 1200 px max, gouttière 16 px mobile / 24 px desktop. */
@utility conteneur {
  margin-inline: auto;
  width: 100%;
  max-width: var(--container-site);
  padding-inline: 1rem;
  @media (width >= 48rem) { padding-inline: 1.5rem; }
}

/* Espacement vertical standard d'une section : 64 px mobile / 96 px desktop. */
@utility section-espace {
  padding-block: var(--spacing-section-mobile);
  @media (width >= 48rem) { padding-block: var(--spacing-section); }
}
```

- [ ] **Step 7 : Layout et page temporaires**

`app/[lang]/layout.tsx` :

```tsx
import type { ReactNode } from 'react';
import '../globals.css';

/** Mise en page racine temporaire — remplacée par la version complète à la tâche 8. */
export default async function MiseEnPage({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className="bg-fond font-sans text-texte">{children}</body>
    </html>
  );
}
```

`app/[lang]/page.tsx` :

```tsx
/** Page d'accueil temporaire — remplacée à la tâche 9. */
export default function Accueil() {
  return (
    <main className="conteneur section-espace">
      <h1 className="font-display text-display font-bold">
        Bonjour<span className="text-accent">.</span>
      </h1>
    </main>
  );
}
```

- [ ] **Step 8 : Installer et vérifier le build**

```bash
npm install
npm run build
```

Attendu : `npm install` sans erreur (avertissements de peer deps tolérés). `npm run build` se termine par le tableau des routes avec `ƒ /[lang]` (dynamique) et aucun `error`. Ensuite :

```bash
npm run typecheck && npm run lint
```

Attendu : aucune sortie d'erreur pour les deux.

- [ ] **Step 9 : Commit**

```bash
git add -A
git commit -m "chore(refonte): scaffold Next.js 15 + Tailwind 4, suppression du site Vite

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2 : i18n — langues, routes localisées, dictionnaires typés

**Files:**
- Create : `lib/i18n/locales.ts`, `lib/i18n/routes.ts`, `lib/i18n/dictionnaires.ts`, `dictionnaires/fr.json`, `dictionnaires/en.json`
- Test : `tests/i18n/locales.test.ts`, `tests/i18n/routes.test.ts`, `tests/i18n/dictionnaires.test.ts`

**Interfaces:**
- Produces :
  - `LANGUES: readonly ['fr','en']`, `type Lang`, `LANGUE_DEFAUT: Lang`, `COOKIE_LANGUE: string`, `DUREE_COOKIE_LANGUE: number`, `estLangue(v): v is Lang`, `detecterLangue(acceptLanguage, cookie): Lang`
  - `type Route = 'accueil'|'projets'|'projet'|'aPropos'`, `SEGMENTS`, `interface ParametresRoute { slug?: string }`, `interface CheminResolu { lang: Lang; route: Route; slug?: string }`, `lien(lang, route, parametres?): string`, `trouverSegment(segment): { route: 'projets'|'aPropos'; langDuSegment: Lang } | null`, `resoudreChemin(chemin, tolerant?): CheminResolu | null`
  - `type Dictionnaire`, `getDictionnaire(lang): Dictionnaire`

- [ ] **Step 1 : Test des langues (échoue)**

`tests/i18n/locales.test.ts` :

```ts
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
```

- [ ] **Step 2 : Lancer le test, vérifier l'échec**

Run : `npx vitest run tests/i18n/locales.test.ts`
Attendu : FAIL, `Failed to resolve import "@/lib/i18n/locales"`.

- [ ] **Step 3 : Écrire `lib/i18n/locales.ts`**

```ts
/** Langues servies par le site, dans l'ordre d'affichage du sélecteur. */
export const LANGUES = ['fr', 'en'] as const;

/** Une langue servie par le site. */
export type Lang = (typeof LANGUES)[number];

/** Langue servie quand rien ne permet d'en choisir une autre. */
export const LANGUE_DEFAUT: Lang = 'fr';

/** Nom du cookie qui mémorise la langue choisie explicitement par le visiteur. */
export const COOKIE_LANGUE = 'langue';

/** Durée de vie du cookie de langue, en secondes (un an). */
export const DUREE_COOKIE_LANGUE = 60 * 60 * 24 * 365;

/** Indique si [valeur] est une langue servie par le site. */
export function estLangue(valeur: string | null | undefined): valeur is Lang {
  return LANGUES.includes(valeur as Lang);
}

/**
 * Choisit la langue à servir.
 *
 * Le cookie (choix explicite) prime sur l'en-tête `Accept-Language`, lu dans
 * l'ordre où le navigateur liste ses préférences (les facteurs `q` ne sont
 * pas réordonnés). Sans correspondance : [LANGUE_DEFAUT].
 *
 * [acceptLanguage] valeur brute de l'en-tête, ex. `fr-FR,fr;q=0.9,en;q=0.8`.
 * [cookie] valeur du cookie [COOKIE_LANGUE], si présent.
 */
export function detecterLangue(
  acceptLanguage: string | null | undefined,
  cookie: string | null | undefined,
): Lang {
  if (estLangue(cookie)) return cookie;
  if (!acceptLanguage) return LANGUE_DEFAUT;
  const candidats = acceptLanguage
    .split(',')
    .map((partie) => partie.split(';')[0].trim().toLowerCase().split('-')[0]);
  return candidats.find(estLangue) ?? LANGUE_DEFAUT;
}
```

- [ ] **Step 4 : Vérifier que le test passe**

Run : `npx vitest run tests/i18n/locales.test.ts`
Attendu : PASS, 7 tests.

- [ ] **Step 5 : Test des routes (échoue)**

`tests/i18n/routes.test.ts` :

```ts
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

  it('insère le slug du projet', () => {
    expect(lien('fr', 'projet', { slug: 'titans' })).toBe('/fr/projets/titans');
    expect(lien('en', 'projet', { slug: 'titans' })).toBe('/en/projects/titans');
  });
});

describe('trouverSegment', () => {
  it('retrouve la route et la langue du segment', () => {
    expect(trouverSegment('projects')).toEqual({ route: 'projets', langDuSegment: 'en' });
    expect(trouverSegment('projets')).toEqual({ route: 'projets', langDuSegment: 'fr' });
    expect(trouverSegment('a-propos')).toEqual({ route: 'aPropos', langDuSegment: 'fr' });
    expect(trouverSegment('about')).toEqual({ route: 'aPropos', langDuSegment: 'en' });
  });

  it('retourne null pour un segment inconnu', () => {
    expect(trouverSegment('blog')).toBeNull();
  });
});

describe('resoudreChemin', () => {
  it('est l’inverse de lien', () => {
    expect(resoudreChemin('/fr')).toEqual({ lang: 'fr', route: 'accueil' });
    expect(resoudreChemin('/en/projects')).toEqual({ lang: 'en', route: 'projets' });
    expect(resoudreChemin('/en/projects/titans')).toEqual({ lang: 'en', route: 'projet', slug: 'titans' });
    expect(resoudreChemin('/fr/a-propos')).toEqual({ lang: 'fr', route: 'aPropos' });
  });

  it('refuse un segment d’une autre langue en mode strict', () => {
    expect(resoudreChemin('/en/projets')).toBeNull();
    expect(resoudreChemin('/fr/about')).toBeNull();
  });

  it('accepte un segment d’une autre langue en mode tolérant', () => {
    expect(resoudreChemin('/en/projets', true)).toEqual({ lang: 'en', route: 'projets' });
    expect(resoudreChemin('/en/projets/titans', true)).toEqual({ lang: 'en', route: 'projet', slug: 'titans' });
    expect(resoudreChemin('/fr/about', true)).toEqual({ lang: 'fr', route: 'aPropos' });
  });

  it('refuse langue inconnue, segment inconnu, profondeur excessive', () => {
    expect(resoudreChemin('/')).toBeNull();
    expect(resoudreChemin('/de')).toBeNull();
    expect(resoudreChemin('/fr/blog')).toBeNull();
    expect(resoudreChemin('/fr/a-propos/x')).toBeNull();
    expect(resoudreChemin('/fr/projets/titans/plus')).toBeNull();
  });
});
```

- [ ] **Step 6 : Lancer le test, vérifier l'échec**

Run : `npx vitest run tests/i18n/routes.test.ts`
Attendu : FAIL, import introuvable.

- [ ] **Step 7 : Écrire `lib/i18n/routes.ts`**

```ts
import { estLangue, LANGUES, type Lang } from './locales';

/** Routes internes du site. `projet` prend un slug. */
export type Route = 'accueil' | 'projets' | 'projet' | 'aPropos';

/** Routes qui possèdent un segment d'URL localisé. */
export type RouteSegmentee = 'projets' | 'aPropos';

/**
 * Segments d'URL publics des routes localisées, par langue.
 * Le segment `fr` est aussi le nom du dossier interne sous `app/[lang]/`.
 */
export const SEGMENTS: Record<RouteSegmentee, Record<Lang, string>> = {
  projets: { fr: 'projets', en: 'projects' },
  aPropos: { fr: 'a-propos', en: 'about' },
};

/** Paramètres d'une route (slug du projet pour `projet`). */
export interface ParametresRoute {
  slug?: string;
}

/** Résultat de l'analyse d'un chemin public. */
export interface CheminResolu {
  lang: Lang;
  route: Route;
  slug?: string;
}

/** Construit l'URL publique d'une route dans une langue. */
export function lien(lang: Lang, route: Route, parametres: ParametresRoute = {}): string {
  switch (route) {
    case 'accueil':
      return `/${lang}`;
    case 'projets':
      return `/${lang}/${SEGMENTS.projets[lang]}`;
    case 'projet':
      return `/${lang}/${SEGMENTS.projets[lang]}/${parametres.slug ?? ''}`;
    case 'aPropos':
      return `/${lang}/${SEGMENTS.aPropos[lang]}`;
  }
}

/** Retrouve la route et la langue d'un segment public, toutes langues confondues. `null` si inconnu. */
export function trouverSegment(
  segment: string,
): { route: RouteSegmentee; langDuSegment: Lang } | null {
  for (const route of Object.keys(SEGMENTS) as RouteSegmentee[]) {
    for (const lang of LANGUES) {
      if (SEGMENTS[route][lang] === segment) return { route, langDuSegment: lang };
    }
  }
  return null;
}

/**
 * Analyse un chemin public (`/en/projects/titans`) en langue, route et slug.
 *
 * Retourne `null` si la langue est inconnue, le segment inconnu ou le chemin
 * trop profond. En mode strict (défaut), un segment d'une autre langue que
 * celle du préfixe est aussi refusé ; [tolerant] l'accepte (utile côté client,
 * où le chemin peut être celui réécrit par le middleware).
 */
export function resoudreChemin(chemin: string, tolerant = false): CheminResolu | null {
  const [lang, segment, slug, ...reste] = chemin.split('/').filter(Boolean);
  if (!estLangue(lang) || reste.length > 0) return null;
  if (segment === undefined) return { lang, route: 'accueil' };
  const trouve = trouverSegment(segment);
  if (!trouve) return null;
  if (!tolerant && trouve.langDuSegment !== lang) return null;
  if (trouve.route === 'aPropos') return slug === undefined ? { lang, route: 'aPropos' } : null;
  return slug === undefined ? { lang, route: 'projets' } : { lang, route: 'projet', slug };
}
```

- [ ] **Step 8 : Vérifier que le test passe**

Run : `npx vitest run tests/i18n/routes.test.ts`
Attendu : PASS, 8 tests.

- [ ] **Step 9 : Test des dictionnaires (échoue)**

`tests/i18n/dictionnaires.test.ts` :

```ts
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
```

- [ ] **Step 10 : Lancer le test, vérifier l'échec**

Run : `npx vitest run tests/i18n/dictionnaires.test.ts`
Attendu : FAIL, `dictionnaires/fr.json` introuvable.

- [ ] **Step 11 : Écrire `dictionnaires/fr.json`**

```json
{
  "site": {
    "titre": "Emmanuel Tene — Software Engineer, Flutter & Next.js",
    "description": "Développeur mobile et web à Douala. Applications Flutter, sites et back-offices Next.js, backends Firebase et Node. Disponible en freelance et en remote.",
    "nomCourt": "Emmanuel Tene"
  },
  "nav": {
    "accueil": "Accueil",
    "projets": "Projets",
    "aPropos": "À propos",
    "ariaPrincipale": "Navigation principale"
  },
  "langue": {
    "fr": "FR",
    "en": "EN",
    "changer": "Changer de langue"
  },
  "hero": {
    "salutation": "Bonjour, je suis",
    "positionnement": "Software Engineer chez Titans · Développeur Flutter & Next.js · Douala, remote",
    "accroche": "Je conçois et livre des applications mobiles et web qui tiennent en production : du point de vente Flutter utilisé chaque jour dans des commerces au back-office Next.js qui le pilote.",
    "disponibilite": "Disponible en freelance",
    "ctaProjet": "Vous avez un projet",
    "ctaRecrute": "Vous recrutez",
    "portraitAlt": "Portrait d’Emmanuel Tene"
  },
  "projetPhare": {
    "surtitre": "Projet phare",
    "voirEtude": "Lire l’étude de cas"
  },
  "projets": {
    "surtitre": "Projets",
    "titre": "Projets sélectionnés",
    "titrePage": "Tous les projets",
    "introPage": "Applications mobiles, sites et outils métier, livrés pour des clients ou construits en autonomie.",
    "tous": "Tous les projets",
    "filtreAria": "Filtrer par type",
    "filtre": { "tous": "Tous", "mobile": "Mobile", "web": "Web" },
    "aucun": "Aucun projet dans cette catégorie.",
    "voir": "Voir le projet"
  },
  "expertises": {
    "surtitre": "Ce que je fais",
    "titre": "Trois façons de vous aider",
    "cartes": [
      {
        "titre": "Application mobile Flutter",
        "description": "Une seule base de code, iOS et Android, publiée sur les stores.",
        "livrables": [
          "Architecture offline-first (SQLite + synchronisation)",
          "Tests unitaires, widget et intégration",
          "Publication App Store et Play Store"
        ]
      },
      {
        "titre": "Application web Next.js",
        "description": "Sites, POS web et back-offices rapides, accessibles, bien référencés.",
        "livrables": [
          "App Router, rendu serveur, i18n",
          "Design system Tailwind",
          "Déploiement Vercel ou Firebase Hosting"
        ]
      },
      {
        "titre": "Backend Firebase / Node",
        "description": "Le socle qui fait tourner l’app : données, règles, fonctions, notifications.",
        "livrables": [
          "Firestore, règles de sécurité, Cloud Functions",
          "APIs NestJS / Express, PostgreSQL",
          "CI, monitoring, documentation"
        ]
      }
    ]
  },
  "stack": {
    "surtitre": "Stack",
    "titre": "Outils que j’utilise au quotidien",
    "groupes": {
      "langages": "Langages",
      "frameworks": "Frameworks",
      "donnees": "Données",
      "cloud": "Cloud & outils"
    }
  },
  "parcours": {
    "surtitre": "Parcours",
    "titre": "Trois étapes",
    "voirTout": "Voir le parcours complet",
    "aujourdhui": "aujourd’hui",
    "contrat": {
      "tempsPartiel": "Temps partiel",
      "freelance": "Freelance",
      "stage": "Stage",
      "tempsPlein": "Temps plein"
    }
  },
  "contact": {
    "surtitre": "Contact",
    "titre": "Parlons de votre projet, ou de votre équipe",
    "texte": "Je réponds sous 24 h. WhatsApp pour aller vite, email pour le détail, LinkedIn si vous recrutez.",
    "messageWhatsapp": "Bonjour Emmanuel, je vous contacte depuis votre portfolio.",
    "email": "Envoyer un email",
    "whatsapp": "Écrire sur WhatsApp",
    "linkedin": "LinkedIn",
    "github": "GitHub",
    "cv": "Télécharger le CV",
    "cvAutreLangue": "CV en anglais"
  },
  "piedDePage": {
    "droits": "Tous droits réservés.",
    "construit": "Construit avec Next.js, déployé sur Vercel."
  },
  "aPropos": {
    "titre": "À propos",
    "intro": [
      "Je suis Software Engineer chez Titans, où je construis le point de vente mobile et web utilisé par des maquis, restaurants et dépôts, et son back-office.",
      "Avant cela, deux ans en freelance sur des applications Flutter avec des backends Node.js et Spring Boot, et un an chez Spreeloop à livrer du mobile, du web et des tests.",
      "Ce qui m’intéresse : des produits qui marchent hors ligne, une architecture qui tient quand l’équipe grandit, et du code que quelqu’un d’autre peut reprendre."
    ],
    "experience": "Expérience",
    "formation": "Formation",
    "methode": {
      "titre": "Méthode",
      "points": [
        "Tests unitaires, widget et intégration avant la mise en production.",
        "Architecture par modules, séparation dépôt / service / interface.",
        "Intégration continue : lint, typage, tests et build sur chaque PR.",
        "Revue de code et documentation en français ou en anglais selon l’équipe."
      ]
    },
    "cv": "Télécharger le CV"
  },
  "projet": {
    "role": "Rôle",
    "periode": "Période",
    "client": "Client",
    "stack": "Stack",
    "plateformes": "Plateformes",
    "resultats": "En chiffres",
    "galerie": "Captures",
    "liens": {
      "site": "Site officiel",
      "repo": "Code source",
      "live": "Voir en ligne",
      "appStore": "App Store",
      "playStore": "Play Store"
    },
    "visionneuse": {
      "fermer": "Fermer",
      "precedent": "Image précédente",
      "suivant": "Image suivante"
    },
    "precedent": "Projet précédent",
    "suivant": "Projet suivant",
    "retour": "Tous les projets",
    "type": { "mobile": "Application mobile", "web": "Application web" }
  },
  "nonTrouve": {
    "titre": "Page introuvable",
    "texte": "Cette page n’existe pas ou a été déplacée.",
    "retour": "Retour à l’accueil"
  }
}
```

- [ ] **Step 12 : Écrire `dictionnaires/en.json`**

```json
{
  "site": {
    "titre": "Emmanuel Tene — Software Engineer, Flutter & Next.js",
    "description": "Mobile and web developer based in Douala. Flutter apps, Next.js websites and back-offices, Firebase and Node backends. Available for freelance and remote work.",
    "nomCourt": "Emmanuel Tene"
  },
  "nav": {
    "accueil": "Home",
    "projets": "Projects",
    "aPropos": "About",
    "ariaPrincipale": "Main navigation"
  },
  "langue": {
    "fr": "FR",
    "en": "EN",
    "changer": "Switch language"
  },
  "hero": {
    "salutation": "Hi, I’m",
    "positionnement": "Software Engineer at Titans · Flutter & Next.js Developer · Douala, remote",
    "accroche": "I design and ship mobile and web applications that hold up in production: from the Flutter point of sale used daily in shops to the Next.js back-office that runs it.",
    "disponibilite": "Available for freelance",
    "ctaProjet": "Have a project?",
    "ctaRecrute": "Hiring?",
    "portraitAlt": "Portrait of Emmanuel Tene"
  },
  "projetPhare": {
    "surtitre": "Featured project",
    "voirEtude": "Read the case study"
  },
  "projets": {
    "surtitre": "Projects",
    "titre": "Selected projects",
    "titrePage": "All projects",
    "introPage": "Mobile apps, websites and business tools, delivered for clients or built independently.",
    "tous": "All projects",
    "filtreAria": "Filter by type",
    "filtre": { "tous": "All", "mobile": "Mobile", "web": "Web" },
    "aucun": "No project in this category.",
    "voir": "View project"
  },
  "expertises": {
    "surtitre": "What I do",
    "titre": "Three ways I can help",
    "cartes": [
      {
        "titre": "Flutter mobile app",
        "description": "One codebase, iOS and Android, published on the stores.",
        "livrables": [
          "Offline-first architecture (SQLite + sync)",
          "Unit, widget and integration tests",
          "App Store and Play Store release"
        ]
      },
      {
        "titre": "Next.js web app",
        "description": "Fast, accessible, well-indexed websites, web POS and back-offices.",
        "livrables": [
          "App Router, server rendering, i18n",
          "Tailwind design system",
          "Vercel or Firebase Hosting deployment"
        ]
      },
      {
        "titre": "Firebase / Node backend",
        "description": "The foundation that runs the app: data, rules, functions, notifications.",
        "livrables": [
          "Firestore, security rules, Cloud Functions",
          "NestJS / Express APIs, PostgreSQL",
          "CI, monitoring, documentation"
        ]
      }
    ]
  },
  "stack": {
    "surtitre": "Stack",
    "titre": "Tools I use every day",
    "groupes": {
      "langages": "Languages",
      "frameworks": "Frameworks",
      "donnees": "Data",
      "cloud": "Cloud & tools"
    }
  },
  "parcours": {
    "surtitre": "Career",
    "titre": "Three chapters",
    "voirTout": "See the full story",
    "aujourdhui": "present",
    "contrat": {
      "tempsPartiel": "Part-time",
      "freelance": "Freelance",
      "stage": "Internship",
      "tempsPlein": "Full-time"
    }
  },
  "contact": {
    "surtitre": "Contact",
    "titre": "Let’s talk about your project, or your team",
    "texte": "I reply within 24 hours. WhatsApp to move fast, email for details, LinkedIn if you’re hiring.",
    "messageWhatsapp": "Hi Emmanuel, I’m reaching out from your portfolio.",
    "email": "Send an email",
    "whatsapp": "Message on WhatsApp",
    "linkedin": "LinkedIn",
    "github": "GitHub",
    "cv": "Download my CV",
    "cvAutreLangue": "CV in French"
  },
  "piedDePage": {
    "droits": "All rights reserved.",
    "construit": "Built with Next.js, deployed on Vercel."
  },
  "aPropos": {
    "titre": "About",
    "intro": [
      "I’m a Software Engineer at Titans, where I build the mobile and web point of sale used by bars, restaurants and warehouses, and the back-office behind it.",
      "Before that, two years freelancing on Flutter apps with Node.js and Spring Boot backends, and a year at Spreeloop shipping mobile, web and tests.",
      "What I care about: products that work offline, an architecture that holds as the team grows, and code someone else can pick up."
    ],
    "experience": "Experience",
    "formation": "Education",
    "methode": {
      "titre": "How I work",
      "points": [
        "Unit, widget and integration tests before anything ships.",
        "Modular architecture, repository / service / UI separation.",
        "Continuous integration: lint, types, tests and build on every PR.",
        "Code review and documentation in French or English, whichever the team uses."
      ]
    },
    "cv": "Download my CV"
  },
  "projet": {
    "role": "Role",
    "periode": "Period",
    "client": "Client",
    "stack": "Stack",
    "plateformes": "Platforms",
    "resultats": "In numbers",
    "galerie": "Screenshots",
    "liens": {
      "site": "Official website",
      "repo": "Source code",
      "live": "View live",
      "appStore": "App Store",
      "playStore": "Play Store"
    },
    "visionneuse": {
      "fermer": "Close",
      "precedent": "Previous image",
      "suivant": "Next image"
    },
    "precedent": "Previous project",
    "suivant": "Next project",
    "retour": "All projects",
    "type": { "mobile": "Mobile app", "web": "Web app" }
  },
  "nonTrouve": {
    "titre": "Page not found",
    "texte": "This page doesn’t exist or has moved.",
    "retour": "Back to home"
  }
}
```

- [ ] **Step 13 : Écrire `lib/i18n/dictionnaires.ts`**

```ts
import fr from '@/dictionnaires/fr.json';
import en from '@/dictionnaires/en.json';
import type { Lang } from './locales';

/** Forme du dictionnaire d'interface, dérivée du fichier français de référence. */
export type Dictionnaire = typeof fr;

/** Le fichier anglais est typé contre la forme française : une clé manquante casse la compilation. */
const DICTIONNAIRES: Record<Lang, Dictionnaire> = { fr, en };

/** Retourne le dictionnaire d'interface de [lang]. */
export function getDictionnaire(lang: Lang): Dictionnaire {
  return DICTIONNAIRES[lang];
}
```

- [ ] **Step 14 : Vérifier tous les tests et le typage**

Run : `npm test && npm run typecheck`
Attendu : 3 fichiers, 18 tests PASS ; `tsc` silencieux.

- [ ] **Step 15 : Commit**

```bash
git add lib/i18n dictionnaires tests/i18n
git commit -m "feat(i18n): langues, routes localisées et dictionnaires typés fr/en

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3 : Décision de navigation et middleware

**Files:**
- Create : `lib/i18n/navigation.ts`, `middleware.ts`
- Test : `tests/i18n/navigation.test.ts`

**Interfaces:**
- Consumes : `estLangue`, `detecterLangue`, `COOKIE_LANGUE` (locales) ; `lien`, `SEGMENTS`, `trouverSegment` (routes).
- Produces : `type DecisionNavigation = { type: 'redirection'; vers } | { type: 'reecriture'; vers } | { type: 'continuer' }`, `deciderNavigation(chemin, acceptLanguage, cookie): DecisionNavigation`.

- [ ] **Step 1 : Test (échoue)**

`tests/i18n/navigation.test.ts` :

```ts
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

  it('redirige un segment de l’autre langue vers le canonique', () => {
    expect(deciderNavigation('/en/projets', null, undefined)).toEqual({ type: 'redirection', vers: '/en/projects' });
    expect(deciderNavigation('/en/projets/titans', null, undefined)).toEqual({
      type: 'redirection',
      vers: '/en/projects/titans',
    });
    expect(deciderNavigation('/fr/about', null, undefined)).toEqual({ type: 'redirection', vers: '/fr/a-propos' });
  });

  it('laisse passer un segment inconnu (404 rendue par la page)', () => {
    expect(deciderNavigation('/fr/blog', null, undefined)).toEqual({ type: 'continuer' });
  });
});
```

- [ ] **Step 2 : Lancer le test, vérifier l'échec**

Run : `npx vitest run tests/i18n/navigation.test.ts`
Attendu : FAIL, import introuvable.

- [ ] **Step 3 : Écrire `lib/i18n/navigation.ts`**

```ts
import { detecterLangue, estLangue, type Lang } from './locales';
import { lien, SEGMENTS, trouverSegment, type Route } from './routes';

/** Ce que le middleware doit faire d'une requête. */
export type DecisionNavigation =
  | { type: 'redirection'; vers: string }
  | { type: 'reecriture'; vers: string }
  | { type: 'continuer' };

/**
 * Décide, pour un chemin public, s'il faut rediriger (langue absente,
 * segment d'une autre langue), réécrire vers le dossier interne (segment
 * anglais) ou laisser passer.
 *
 * [chemin] `pathname` de la requête, ex. `/en/projects/titans`.
 * [acceptLanguage] en-tête `Accept-Language` brut.
 * [cookie] valeur du cookie de langue, si présent.
 */
export function deciderNavigation(
  chemin: string,
  acceptLanguage: string | null | undefined,
  cookie: string | null | undefined,
): DecisionNavigation {
  const segments = chemin.split('/').filter(Boolean);
  const [premier, segment, ...reste] = segments;

  if (!estLangue(premier)) {
    const lang = detecterLangue(acceptLanguage, cookie);
    const suite = segments.length > 0 ? `/${segments.join('/')}` : '';
    return { type: 'redirection', vers: `/${lang}${suite}` };
  }
  const lang: Lang = premier;
  if (segment === undefined) return { type: 'continuer' };

  const trouve = trouverSegment(segment);
  if (!trouve) return { type: 'continuer' };

  if (trouve.langDuSegment !== lang) {
    const route: Route = trouve.route === 'projets' && reste.length > 0 ? 'projet' : trouve.route;
    return { type: 'redirection', vers: lien(lang, route, { slug: reste[0] }) };
  }
  const segmentInterne = SEGMENTS[trouve.route].fr;
  if (segment === segmentInterne) return { type: 'continuer' };
  return { type: 'reecriture', vers: `/${[lang, segmentInterne, ...reste].join('/')}` };
}
```

- [ ] **Step 4 : Vérifier que le test passe**

Run : `npx vitest run tests/i18n/navigation.test.ts`
Attendu : PASS, 6 tests.

- [ ] **Step 5 : Écrire `middleware.ts` (racine du repo)**

```ts
import { NextResponse, type NextRequest } from 'next/server';
import { COOKIE_LANGUE } from '@/lib/i18n/locales';
import { deciderNavigation } from '@/lib/i18n/navigation';

/** Applique à chaque requête de page la décision de navigation (langue, slugs localisés). Redirections en 308. */
export function middleware(requete: NextRequest) {
  const decision = deciderNavigation(
    requete.nextUrl.pathname,
    requete.headers.get('accept-language'),
    requete.cookies.get(COOKIE_LANGUE)?.value,
  );
  if (decision.type === 'continuer') return NextResponse.next();

  const url = requete.nextUrl.clone();
  url.pathname = decision.vers;
  return decision.type === 'redirection' ? NextResponse.redirect(url, 308) : NextResponse.rewrite(url);
}

export const config = {
  // Tout sauf les internes Next, l'API et les fichiers (chemins contenant un point : images, sitemap.xml, robots.txt).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
```

- [ ] **Step 6 : Vérifier build + redirections en dev**

```bash
npm run typecheck && npm run lint && npm run build
```

Attendu : sans erreur ; le tableau de build affiche `ƒ Middleware`.

Lancer le serveur de dev en arrière-plan (outil Bash avec `run_in_background`, ou `npx next dev -p 3100 &`), puis :

```bash
curl -s --retry 15 --retry-delay 1 --retry-connrefused -o /dev/null -w '%{http_code} %{redirect_url}\n' http://localhost:3100/
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' -H 'Accept-Language: en-US,en' http://localhost:3100/
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' -H 'Cookie: langue=en' http://localhost:3100/
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' http://localhost:3100/en/projets
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3100/fr
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3100/en/projects
```

Attendu, ligne par ligne : `308 http://localhost:3100/fr` · `308 http://localhost:3100/en` · `308 http://localhost:3100/en` · `308 http://localhost:3100/en/projects` · `200` · `404` (la page projets n'existe qu'à la tâche 10). Arrêter le serveur ensuite (`kill %1` ou l'outil d'arrêt de tâche).

- [ ] **Step 7 : Commit**

```bash
git add lib/i18n/navigation.ts middleware.ts tests/i18n/navigation.test.ts
git commit -m "feat(i18n): middleware de langue et réécriture des slugs localisés

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4 : Contenu de base — types, profil, expériences, formations, stack, coordonnées, dates

**Files:**
- Create : `lib/contenu/types.ts`, `lib/contenu/plateformes.ts`, `lib/contact.ts`, `lib/dates.ts`, `content/profil.ts`, `content/experiences.ts`, `content/formations.ts`, `content/stack.ts`
- Test : `tests/contenu/base.test.ts`, `tests/dates.test.ts`

**Interfaces:**
- Consumes : `Lang` (locales).
- Produces :
  - Types : `TexteLocalise`, `ListeLocalisee`, `TypeContrat`, `Experience`, `Formation`, `GroupeStack`, `Technologie`, `TypeProjet`, `Plateforme`, `ImageProjet`, `ResultatProjet`, `LiensProjet`, `MetaProjet`, `Profil`.
  - `LIBELLES_PLATEFORMES: Record<Plateforme, string>`.
  - `coordonnees(): Coordonnees` (`{ email, telephone, whatsapp, linkedin, urlSite }`), `lienWhatsapp(numero, message): string`.
  - `formaterMois(aaaaMm, lang): string`, `formaterPeriode(debut, fin, lang, libelleEnCours): string`.
  - `profil: Profil`, `experiences: Experience[]`, `formations: Formation[]`, `technologies: Technologie[]`, `GROUPES_STACK: GroupeStack[]`, `technologiesParGroupe(groupe): Technologie[]`.

- [ ] **Step 1 : Écrire `lib/contenu/types.ts`**

```ts
import type { Lang } from '@/lib/i18n/locales';

/** Texte disponible dans chaque langue du site. */
export type TexteLocalise = Record<Lang, string>;

/** Liste de textes disponible dans chaque langue du site. */
export type ListeLocalisee = Record<Lang, string[]>;

/** Nature du contrat d'une expérience. Clés du dictionnaire `parcours.contrat`. */
export type TypeContrat = 'tempsPartiel' | 'freelance' | 'stage' | 'tempsPlein';

/** Une expérience professionnelle. Dates au format `AAAA-MM` ; `fin` vaut `null` si en cours. */
export interface Experience {
  id: string;
  debut: string;
  fin: string | null;
  poste: TexteLocalise;
  employeur: TexteLocalise;
  lieu: TexteLocalise;
  typeContrat: TypeContrat;
  points: ListeLocalisee;
  stack: string[];
}

/** Un diplôme ou une formation. Dates au format `AAAA-MM`. */
export interface Formation {
  id: string;
  debut: string;
  fin: string;
  diplome: TexteLocalise;
  domaine: TexteLocalise;
  etablissement: string;
  lieu: TexteLocalise;
}

/** Famille d'une technologie. Clés du dictionnaire `stack.groupes`. */
export type GroupeStack = 'langages' | 'frameworks' | 'donnees' | 'cloud';

/** Une technologie du mur de stack. `icone` est une URL devicon. */
export interface Technologie {
  nom: string;
  icone: string;
  groupe: GroupeStack;
}

/** Nature d'un projet, utilisée par le filtre de la liste. */
export type TypeProjet = 'mobile' | 'web';

/** Plateforme cible d'un projet. */
export type Plateforme = 'ios' | 'android' | 'web';

/** Une capture de la galerie d'un projet. `src` est un chemin sous `public/`. */
export interface ImageProjet {
  src: string;
  legende: TexteLocalise;
}

/** Un chiffre clé affiché sur un projet. */
export interface ResultatProjet {
  valeur: string;
  libelle: TexteLocalise;
}

/** Liens externes d'un projet. Tous facultatifs. */
export interface LiensProjet {
  site?: string;
  repo?: string;
  live?: string;
  appStore?: string;
  playStore?: string;
}

/**
 * Métadonnées d'un projet. Le corps de l'étude de cas est un MDX à côté.
 *
 * `apercu` absent = pas encore de capture : les composants affichent le logo.
 * `periode` absente = non renseignée par le propriétaire : ligne non affichée.
 */
export interface MetaProjet {
  slug: string;
  nom: string;
  accroche: TexteLocalise;
  categorie: TexteLocalise;
  type: TypeProjet;
  plateformes: Plateforme[];
  stack: string[];
  periode?: string;
  role: TexteLocalise;
  client: string;
  liens: LiensProjet;
  logo: string;
  apercu?: string;
  galerie: ImageProjet[];
  resultats: ResultatProjet[];
  phare: boolean;
  ordre: number;
}

/** Identité publique du propriétaire du site. Les coordonnées viennent de `lib/contact.ts`. */
export interface Profil {
  prenom: string;
  nomComplet: string;
  nomCourt: string;
  role: TexteLocalise;
  ville: TexteLocalise;
  github: string;
  cv: TexteLocalise;
  portrait: string;
}
```

- [ ] **Step 2 : Écrire `lib/contenu/plateformes.ts`, `lib/contact.ts`, `lib/dates.ts`**

`lib/contenu/plateformes.ts` :

```ts
import type { Plateforme } from './types';

/** Libellés des plateformes, identiques dans les deux langues. */
export const LIBELLES_PLATEFORMES: Record<Plateforme, string> = {
  ios: 'iOS',
  android: 'Android',
  web: 'Web',
};
```

`lib/contact.ts` :

```ts
/** Coordonnées publiques. Une valeur absente vaut `''` et le lien correspondant n'est pas rendu. */
export interface Coordonnees {
  email: string;
  telephone: string;
  /** Numéro sans `+` ni espaces, prêt pour `wa.me`. */
  whatsapp: string;
  linkedin: string;
  /** Origine du site, sans barre finale. */
  urlSite: string;
}

/** Lit les coordonnées dans les variables `NEXT_PUBLIC_*`. Jamais de valeur en dur ailleurs. */
export function coordonnees(): Coordonnees {
  return {
    email: process.env.NEXT_PUBLIC_EMAIL ?? '',
    telephone: process.env.NEXT_PUBLIC_TELEPHONE ?? '',
    whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP ?? '').replace(/\D/g, ''),
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? '',
    urlSite: (process.env.NEXT_PUBLIC_URL_SITE ?? 'http://localhost:3000').replace(/\/$/, ''),
  };
}

/** Construit l'URL `wa.me` avec un message d'ouverture pré-rempli. Retourne `''` sans numéro. */
export function lienWhatsapp(numero: string, message: string): string {
  return numero ? `https://wa.me/${numero}?text=${encodeURIComponent(message)}` : '';
}
```

`lib/dates.ts` :

```ts
import type { Lang } from '@/lib/i18n/locales';

const LOCALES: Record<Lang, string> = { fr: 'fr-FR', en: 'en-US' };

/** Formate `AAAA-MM` en « mars 2024 » / « March 2024 ». */
export function formaterMois(aaaaMm: string, lang: Lang): string {
  const [annee, mois] = aaaaMm.split('-').map(Number);
  const date = new Date(Date.UTC(annee, mois - 1, 1));
  return new Intl.DateTimeFormat(LOCALES[lang], { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}

/** Formate une période « mars 2024 – aujourd’hui ». [libelleEnCours] remplace une fin absente. */
export function formaterPeriode(debut: string, fin: string | null, lang: Lang, libelleEnCours: string): string {
  return `${formaterMois(debut, lang)} – ${fin ? formaterMois(fin, lang) : libelleEnCours}`;
}
```

- [ ] **Step 3 : Test des dates**

`tests/dates.test.ts` :

```ts
import { describe, expect, it } from 'vitest';
import { formaterMois, formaterPeriode } from '@/lib/dates';

describe('dates', () => {
  it('formate un mois dans chaque langue', () => {
    expect(formaterMois('2024-03', 'fr')).toBe('mars 2024');
    expect(formaterMois('2024-03', 'en')).toBe('March 2024');
  });

  it('formate une période close ou en cours', () => {
    expect(formaterPeriode('2023-03', '2024-03', 'fr', 'aujourd’hui')).toBe('mars 2023 – mars 2024');
    expect(formaterPeriode('2026-04', null, 'en', 'present')).toBe('April 2026 – present');
  });
});
```

Run : `npx vitest run tests/dates.test.ts`
Attendu : PASS, 2 tests. Si FAIL sur « mars » (Node sans ICU complète), vérifier `node -p "new Intl.DateTimeFormat('fr-FR',{month:'long'}).format(new Date())"`.

- [ ] **Step 4 : Écrire `content/profil.ts`**

```ts
import type { Profil } from '@/lib/contenu/types';

/** Identité affichée sur le site. Email, téléphone et LinkedIn viennent de `lib/contact.ts`. */
export const profil: Profil = {
  prenom: 'Emmanuel',
  nomComplet: 'Tene Tampo Emmanuel',
  nomCourt: 'Emmanuel Tene',
  role: {
    fr: 'Software Engineer · Développeur Flutter & Next.js',
    en: 'Software Engineer · Flutter & Next.js Developer',
  },
  ville: { fr: 'Douala, Cameroun', en: 'Douala, Cameroon' },
  github: 'https://github.com/kodage111',
  cv: { fr: '/cv/cv-fr.pdf', en: '/cv/cv-en.pdf' },
  portrait: '/portrait/portrait.png',
};
```

- [ ] **Step 5 : Écrire `content/experiences.ts`**

```ts
import type { Experience } from '@/lib/contenu/types';

/** Expériences, de la plus récente à la plus ancienne. */
export const experiences: Experience[] = [
  {
    id: 'titans',
    debut: '2026-04',
    fin: null,
    poste: { fr: 'Software Engineer', en: 'Software Engineer' },
    employeur: { fr: 'Titans Côte d’Ivoire · Titans Groupe', en: 'Titans Côte d’Ivoire · Titans Groupe' },
    lieu: { fr: 'Douala, remote', en: 'Douala, remote' },
    typeContrat: 'tempsPartiel',
    points: {
      fr: [
        'Architecture et déploiement de l’application phare de Titans Groupe, un point de vente (caisse et stock) pour maquis, restaurants et dépôts, sur mobile (Flutter) et web (Next.js).',
        'Intégration continue de nouvelles fonctionnalités et réduction de la dette technique ; stabilité et rétention pilotées par les retours directs des clients.',
        'Animation des réunions techniques hebdomadaires : propositions d’architecture, lien entre besoins produit et exécution, mentorat de l’équipe.',
        'Maintenance et montée en charge du back-office administratif : React côté client, Node.js, Firebase et Google Cloud Platform côté serveur.',
      ],
      en: [
        'Architected and shipped Titans Groupe’s flagship application, a point of sale (checkout and stock) for bars, restaurants and warehouses, on mobile (Flutter) and web (Next.js).',
        'Continuous delivery of new features and technical-debt reduction; stability and retention driven by direct client feedback.',
        'Run the weekly technical meetings: architecture proposals, bridge between product needs and execution, team mentoring.',
        'Maintain and scale the administrative back-office: React on the client, Node.js, Firebase and Google Cloud Platform on the server.',
      ],
    },
    stack: ['Flutter', 'Dart', 'Next.js', 'TypeScript', 'React', 'Node.js', 'Firebase', 'GCP'],
  },
  {
    id: 'freelance',
    debut: '2024-03',
    fin: '2026-04',
    poste: { fr: 'Développeur Flutter freelance', en: 'Freelance Flutter Developer' },
    employeur: { fr: 'Indépendant', en: 'Self-employed' },
    lieu: { fr: 'Douala, remote', en: 'Douala, remote' },
    typeContrat: 'freelance',
    points: {
      fr: [
        'Applications Flutter reliées à des backends Node.js et Java Spring Boot.',
        'Suites de tests complètes pour garantir la qualité et le fonctionnement du logiciel.',
        'Collaboration avec des équipes transverses pour livrer des produits de qualité.',
        'Intégration front / back fluide : applications efficaces et simples à utiliser.',
      ],
      en: [
        'Flutter applications integrated with Node.js and Java Spring Boot backends.',
        'Comprehensive test suites to guarantee software quality and behaviour.',
        'Collaboration with cross-functional teams to deliver high-quality products.',
        'Seamless front / back integration: efficient, user-friendly applications.',
      ],
    },
    stack: ['Flutter', 'Dart', 'Node.js', 'Spring Boot', 'PostgreSQL', 'Firebase'],
  },
  {
    id: 'spreeloop',
    debut: '2023-03',
    fin: '2024-03',
    poste: { fr: 'Associate Software Developer', en: 'Associate Software Developer' },
    employeur: { fr: 'Spreeloop', en: 'Spreeloop' },
    lieu: { fr: 'Douala, Cameroun', en: 'Douala, Cameroon' },
    typeContrat: 'stage',
    points: {
      fr: [
        'Maintenance des applications existantes et conception de nouvelles solutions, des services backend à l’intégration front.',
        'Prototypage d’interfaces web avec React.',
        'Tests unitaires, widget et intégration sur le code Flutter, et sur le backend TypeScript.',
        'Revue de code, documentation, résolution des bugs signalés.',
      ],
      en: [
        'Maintained existing applications and built new solutions, from backend services to front-end integration.',
        'Prototyped web interfaces with React.',
        'Unit, widget and integration tests on the Flutter code and on the TypeScript backend.',
        'Code review, documentation, fixing reported bugs.',
      ],
    },
    stack: ['Flutter', 'Dart', 'TypeScript', 'React', 'Firebase', 'Cloud Functions', 'Node.js'],
  },
];
```

- [ ] **Step 6 : Écrire `content/formations.ts`**

```ts
import type { Formation } from '@/lib/contenu/types';

/** Formations, de la plus récente à la plus ancienne. */
export const formations: Formation[] = [
  {
    id: 'licence',
    debut: '2020-01',
    fin: '2022-01',
    diplome: { fr: 'Licence', en: 'Bachelor’s degree' },
    domaine: { fr: 'Génie électrique', en: 'Electrical engineering' },
    etablissement: 'IUT Fotso Victor',
    lieu: { fr: 'Bandjoun, Cameroun', en: 'Bandjoun, Cameroon' },
  },
  {
    id: 'dut',
    debut: '2017-01',
    fin: '2020-01',
    diplome: { fr: 'DUT', en: 'National Diploma' },
    domaine: { fr: 'Énergies thermiques et renouvelables', en: 'Thermal and renewable energy' },
    etablissement: 'IUT Fotso Victor',
    lieu: { fr: 'Bandjoun, Cameroun', en: 'Bandjoun, Cameroon' },
  },
  {
    id: 'gce',
    debut: '2014-01',
    fin: '2016-01',
    diplome: { fr: 'GCE A-Level', en: 'GCE A-Level' },
    domaine: { fr: 'Sciences', en: 'Science' },
    etablissement: 'Saint Paul’s Comprehensive College',
    lieu: { fr: 'Bamenda, Cameroun', en: 'Bamenda, Cameroon' },
  },
];
```

- [ ] **Step 7 : Écrire `content/stack.ts`**

```ts
import type { GroupeStack, Technologie } from '@/lib/contenu/types';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

/** URL d'une icône devicon. [variante] : `original` par défaut, `plain`, `plain-wordmark`… */
function devicon(dossier: string, variante = 'original'): string {
  return `${DEVICON}/${dossier}/${dossier}-${variante}.svg`;
}

/** Groupes du mur de stack, dans l'ordre d'affichage. */
export const GROUPES_STACK: GroupeStack[] = ['langages', 'frameworks', 'donnees', 'cloud'];

/** Technologies affichées, sans niveau ni pourcentage. */
export const technologies: Technologie[] = [
  { nom: 'Dart', icone: devicon('dart'), groupe: 'langages' },
  { nom: 'TypeScript', icone: devicon('typescript'), groupe: 'langages' },
  { nom: 'JavaScript', icone: devicon('javascript'), groupe: 'langages' },
  { nom: 'Kotlin', icone: devicon('kotlin'), groupe: 'langages' },
  { nom: 'Java', icone: devicon('java'), groupe: 'langages' },
  { nom: 'HTML', icone: devicon('html5'), groupe: 'langages' },
  { nom: 'CSS', icone: devicon('css3'), groupe: 'langages' },
  { nom: 'Flutter', icone: devicon('flutter'), groupe: 'frameworks' },
  { nom: 'React', icone: devicon('react'), groupe: 'frameworks' },
  { nom: 'Next.js', icone: devicon('nextjs'), groupe: 'frameworks' },
  { nom: 'NestJS', icone: devicon('nestjs'), groupe: 'frameworks' },
  { nom: 'Express', icone: devicon('express'), groupe: 'frameworks' },
  { nom: 'Spring Boot', icone: devicon('spring'), groupe: 'frameworks' },
  { nom: 'Tailwind CSS', icone: devicon('tailwindcss'), groupe: 'frameworks' },
  { nom: 'PostgreSQL', icone: devicon('postgresql'), groupe: 'donnees' },
  { nom: 'MySQL', icone: devicon('mysql'), groupe: 'donnees' },
  { nom: 'MongoDB', icone: devicon('mongodb'), groupe: 'donnees' },
  { nom: 'SQLite', icone: devicon('sqlite'), groupe: 'donnees' },
  { nom: 'DynamoDB', icone: devicon('dynamodb'), groupe: 'donnees' },
  { nom: 'Prisma', icone: devicon('prisma'), groupe: 'donnees' },
  { nom: 'Firebase', icone: devicon('firebase', 'plain'), groupe: 'cloud' },
  { nom: 'Google Cloud', icone: devicon('googlecloud'), groupe: 'cloud' },
  { nom: 'AWS', icone: devicon('amazonwebservices', 'plain-wordmark'), groupe: 'cloud' },
  { nom: 'Node.js', icone: devicon('nodejs'), groupe: 'cloud' },
  { nom: 'Docker', icone: devicon('docker'), groupe: 'cloud' },
  { nom: 'Pulumi', icone: devicon('pulumi'), groupe: 'cloud' },
  { nom: 'Git', icone: devicon('git'), groupe: 'cloud' },
  { nom: 'Figma', icone: devicon('figma'), groupe: 'cloud' },
];

/** Technologies d'un groupe, dans l'ordre de déclaration. */
export function technologiesParGroupe(groupe: GroupeStack): Technologie[] {
  return technologies.filter((technologie) => technologie.groupe === groupe);
}
```

- [ ] **Step 8 : Test du contenu de base**

`tests/contenu/base.test.ts` :

```ts
import { describe, expect, it } from 'vitest';
import { experiences } from '@/content/experiences';
import { formations } from '@/content/formations';
import { GROUPES_STACK, technologies, technologiesParGroupe } from '@/content/stack';
import { coordonnees, lienWhatsapp } from '@/lib/contact';

describe('expériences', () => {
  it('trois postes, du plus récent au plus ancien', () => {
    expect(experiences.map((e) => e.id)).toEqual(['titans', 'freelance', 'spreeloop']);
    for (let i = 1; i < experiences.length; i += 1) {
      expect(experiences[i - 1].debut > experiences[i].debut).toBe(true);
    }
  });

  it('seule la première est en cours', () => {
    expect(experiences.map((e) => e.fin === null)).toEqual([true, false, false]);
  });

  it('autant de points en fr qu’en en', () => {
    for (const experience of experiences) {
      expect(experience.points.en.length).toBe(experience.points.fr.length);
      expect(experience.points.fr.length).toBeGreaterThan(0);
    }
  });
});

describe('formations', () => {
  it('du plus récent au plus ancien', () => {
    for (let i = 1; i < formations.length; i += 1) {
      expect(formations[i - 1].debut > formations[i].debut).toBe(true);
    }
  });
});

describe('stack', () => {
  it('chaque groupe a au moins une technologie', () => {
    for (const groupe of GROUPES_STACK) expect(technologiesParGroupe(groupe).length).toBeGreaterThan(0);
  });

  it('noms uniques et icônes devicon', () => {
    const noms = technologies.map((t) => t.nom);
    expect(new Set(noms).size).toBe(noms.length);
    for (const t of technologies) {
      expect(t.icone).toMatch(/^https:\/\/cdn\.jsdelivr\.net\/gh\/devicons\/devicon@latest\/icons\/.+\.svg$/);
    }
  });
});

describe('contact', () => {
  it('normalise le numéro WhatsApp et construit le lien', () => {
    process.env.NEXT_PUBLIC_WHATSAPP = '+237 6 00 00 00 00';
    expect(coordonnees().whatsapp).toBe('237600000000');
    expect(lienWhatsapp('237600000000', 'Bonjour')).toBe('https://wa.me/237600000000?text=Bonjour');
    expect(lienWhatsapp('', 'Bonjour')).toBe('');
  });

  it('retire la barre finale de l’URL du site', () => {
    process.env.NEXT_PUBLIC_URL_SITE = 'https://exemple.com/';
    expect(coordonnees().urlSite).toBe('https://exemple.com');
  });
});
```

Run : `npm test && npm run typecheck && npm run lint`
Attendu : tous PASS (dont 8 nouveaux tests), typage et lint silencieux.

- [ ] **Step 9 : Commit**

```bash
git add lib/contenu lib/contact.ts lib/dates.ts content tests/contenu tests/dates.test.ts
git commit -m "feat(contenu): types, profil, expériences, formations, stack et coordonnées

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5 : Projets — métadonnées des six projets et chargeur

**Files:**
- Create : `content/projets/titans/meta.ts`, `content/projets/kori-pro/meta.ts`, `content/projets/kori/meta.ts`, `content/projets/vegetable-market/meta.ts`, `content/projets/gec-sarl/meta.ts`, `content/projets/assurance-contract-handler/meta.ts`, `content/projets/index.ts`, `lib/contenu/projets.ts`, `public/projects/titans/titans-logo.png` (copie)
- Test : `tests/contenu/projets.test.ts`

**Interfaces:**
- Consumes : `MetaProjet`, `TypeProjet` (types).
- Produces : `projets: MetaProjet[]` (index), `listerProjets(type?): MetaProjet[]`, `trouverProjet(slug): MetaProjet | undefined`, `projetPhare(): MetaProjet`, `projetsSelectionnes(nombre?): MetaProjet[]`, `projetsVoisins(slug): { precedent?: MetaProjet; suivant?: MetaProjet }`, `slugsProjets(): string[]`, `estTypeProjet(v): v is TypeProjet`.

- [ ] **Step 1 : Copier le logo Titans**

```bash
mkdir -p public/projects/titans
cp /c/Users/tetem/StudioProjects/mvp_titans_2/assets/titans_logo.png public/projects/titans/titans-logo.png
ls -la public/projects/titans/
```

- [ ] **Step 2 : Test des projets (échoue)**

`tests/contenu/projets.test.ts` :

```ts
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
```

- [ ] **Step 3 : Lancer le test, vérifier l'échec**

Run : `npx vitest run tests/contenu/projets.test.ts`
Attendu : FAIL, import introuvable.

- [ ] **Step 4 : Écrire `content/projets/titans/meta.ts`**

```ts
import type { MetaProjet } from '@/lib/contenu/types';

/** Titans — point de vente de Titans Groupe. Captures à ajouter par le propriétaire (`apercu`, `galerie`). */
export const titans: MetaProjet = {
  slug: 'titans',
  nom: 'Titans',
  accroche: {
    fr: 'Point de vente mobile et web pour maquis, restaurants et dépôts : caisse, stock, journée d’activité, hors ligne d’abord.',
    en: 'Mobile and web point of sale for bars, restaurants and warehouses: checkout, stock, business day, offline first.',
  },
  categorie: { fr: 'Point de vente & gestion', en: 'Point of sale & management' },
  type: 'mobile',
  plateformes: ['ios', 'android', 'web'],
  stack: ['Flutter', 'Dart', 'SQLite', 'Next.js', 'TypeScript', 'Firebase', 'Cloud Functions', 'Node.js', 'GCP'],
  periode: '2026 –',
  role: {
    fr: 'Software Engineer — mobile, web et back-office',
    en: 'Software Engineer — mobile, web and back-office',
  },
  client: 'Titans Groupe',
  liens: {
    site: 'https://titans-groupe.com',
    live: 'https://pos.titans-groupe.com',
    appStore: 'https://apps.apple.com/app/mvp-titans/id6764788709',
    playStore: 'https://play.google.com/store/apps/details?id=titans.titans',
  },
  logo: '/projects/titans/titans-logo.png',
  galerie: [],
  resultats: [
    { valeur: '3', libelle: { fr: 'plateformes : iOS, Android, web', en: 'platforms: iOS, Android, web' } },
    { valeur: '4', libelle: { fr: 'types de commerce couverts', en: 'business types covered' } },
    {
      valeur: 'Offline',
      libelle: { fr: 'ventes saisies sans réseau, synchronisées ensuite', en: 'sales captured offline, synced later' },
    },
  ],
  phare: true,
  ordre: 1,
};
```

- [ ] **Step 5 : Écrire `content/projets/kori-pro/meta.ts`**

```ts
import type { MetaProjet } from '@/lib/contenu/types';

/** Korí Pro — application des professionnels de la beauté. */
export const koriPro: MetaProjet = {
  slug: 'kori-pro',
  nom: 'Korí Pro',
  accroche: {
    fr: 'L’application des professionnels de la beauté : agenda, prestations, clients et paiements, sur iOS et Android.',
    en: 'The app for beauty professionals: agenda, services, clients and payments, on iOS and Android.',
  },
  categorie: { fr: 'Beauté & bien-être', en: 'Beauty & wellness' },
  type: 'mobile',
  plateformes: ['ios', 'android'],
  stack: ['Flutter', 'Dart', 'NestJS', 'Node.js', 'PostgreSQL', 'Prisma', 'GCP', 'AWS', 'Pulumi'],
  role: { fr: 'Développeur Flutter — application et intégration API', en: 'Flutter developer — app and API integration' },
  client: 'Korí Beauty',
  liens: { repo: 'https://github.com/kori-beauty/kori' },
  logo: '/projects/kori-pro/kori-pro-logo.png',
  apercu: '/projects/kori-pro/kori-pro-preview-1.png',
  galerie: [
    { src: '/projects/kori-pro/kori-pro-preview-2.png', legende: { fr: 'Aperçu de Korí Pro', en: 'Korí Pro overview' } },
    { src: '/projects/kori-pro/kori-pro-0x2.png', legende: { fr: 'Écran d’accueil', en: 'Welcome screen' } },
    { src: '/projects/kori-pro/kori-pro-1x1.png', legende: { fr: 'Agenda des rendez-vous', en: 'Appointments agenda' } },
    { src: '/projects/kori-pro/kori-pro-2x1.png', legende: { fr: 'Fiche du salon', en: 'Salon detail' } },
    { src: '/projects/kori-pro/kori-pro-3x1.png', legende: { fr: 'Lieu de la prestation', en: 'Service location' } },
    { src: '/projects/kori-pro/kori-pro-4x1.png', legende: { fr: 'Choix des types de prestation', en: 'Service type selection' } },
  ],
  resultats: [
    { valeur: '28', libelle: { fr: 'écrans livrés', en: 'screens delivered' } },
    { valeur: '2', libelle: { fr: 'plateformes, une base de code', en: 'platforms, one codebase' } },
    { valeur: 'IaC', libelle: { fr: 'infrastructure décrite avec Pulumi', en: 'infrastructure described with Pulumi' } },
  ],
  phare: false,
  ordre: 2,
};
```

- [ ] **Step 6 : Écrire `content/projets/kori/meta.ts`**

```ts
import type { MetaProjet } from '@/lib/contenu/types';

/** Korí — application grand public de réservation beauté. */
export const kori: MetaProjet = {
  slug: 'kori',
  nom: 'Korí',
  accroche: {
    fr: 'Découvrir des professionnels de la beauté vérifiés près de chez soi, réserver et payer depuis son téléphone.',
    en: 'Discover verified beauty professionals nearby, book and pay from your phone.',
  },
  categorie: { fr: 'Beauté & bien-être', en: 'Beauty & wellness' },
  type: 'mobile',
  plateformes: ['ios', 'android'],
  stack: ['Flutter', 'Dart', 'NestJS', 'Node.js', 'PostgreSQL', 'Prisma', 'GCP', 'AWS', 'Pulumi'],
  role: { fr: 'Développeur Flutter — application et intégration API', en: 'Flutter developer — app and API integration' },
  client: 'Korí Beauty',
  liens: { repo: 'https://github.com/kori-beauty/kori' },
  logo: '/projects/kori/kori-logo.png',
  apercu: '/projects/kori/kori-preview-1.png',
  galerie: [
    { src: '/projects/kori/kori-preview-2.png', legende: { fr: 'Aperçu de Korí', en: 'Korí overview' } },
    { src: '/projects/kori/kori-1x1.png', legende: { fr: 'Écran d’accueil', en: 'Welcome screen' } },
    { src: '/projects/kori/kori-6x1.png', legende: { fr: 'Découverte et favoris', en: 'Discovery and favourites' } },
    { src: '/projects/kori/kori-2x1.png', legende: { fr: 'Réservation', en: 'Booking' } },
    { src: '/projects/kori/kori-3x1.png', legende: { fr: 'Fiche du salon', en: 'Salon detail' } },
    { src: '/projects/kori/kori-4x1.png', legende: { fr: 'Choix de la prestation', en: 'Service selection' } },
  ],
  resultats: [
    { valeur: '24', libelle: { fr: 'écrans livrés', en: 'screens delivered' } },
    { valeur: '1', libelle: { fr: 'backend partagé avec Korí Pro', en: 'backend shared with Korí Pro' } },
    { valeur: 'Géo', libelle: { fr: 'découverte par localisation', en: 'location-based discovery' } },
  ],
  phare: false,
  ordre: 3,
};
```

- [ ] **Step 7 : Écrire `content/projets/vegetable-market/meta.ts`**

```ts
import type { MetaProjet } from '@/lib/contenu/types';

/** Vegetable Market — site vitrine de démonstration pour un marchand de légumes. */
export const vegetableMarket: MetaProjet = {
  slug: 'vegetable-market',
  nom: 'Vegetable Market',
  accroche: {
    fr: 'Site vitrine d’un marchand de légumes : produits frais, valeurs nutritionnelles, saisons et conseils de cuisine.',
    en: 'Showcase site for a vegetable shop: fresh produce, nutrition facts, seasons and cooking tips.',
  },
  categorie: { fr: 'E-commerce & commerce local', en: 'E-commerce & local business' },
  type: 'web',
  plateformes: ['web'],
  stack: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
  role: { fr: 'Conception et développement', en: 'Design and development' },
  client: 'Projet personnel',
  liens: {
    repo: 'https://github.com/kodage111/vegetable_market',
    live: 'https://vegetable-market-six.vercel.app/',
  },
  logo: '/projects/vegetable-market/favicon.ico',
  apercu: '/projects/vegetable-market/m-vegetables-preview.png',
  galerie: [
    { src: '/projects/vegetable-market/m-vegetables-preview.png', legende: { fr: 'Page d’accueil', en: 'Homepage' } },
    { src: '/projects/vegetable-market/m-vegetables-1.png', legende: { fr: 'Catalogue sur mobile', en: 'Catalog on mobile' } },
    { src: '/projects/vegetable-market/m-vegetables-2.png', legende: { fr: 'Fiche produit', en: 'Product details' } },
    { src: '/projects/vegetable-market/m-vegetables-3.png', legende: { fr: 'Valeurs nutritionnelles', en: 'Nutrition facts' } },
    { src: '/projects/vegetable-market/m-vegetables-4.png', legende: { fr: 'Conseils de cuisine', en: 'Cooking tips' } },
    { src: '/projects/vegetable-market/m-vegetables-5.png', legende: { fr: 'Indicateurs de saison', en: 'Seasonal indicators' } },
    { src: '/projects/vegetable-market/m-vegetables-6.png', legende: { fr: 'Mise en page responsive', en: 'Responsive layout' } },
  ],
  resultats: [
    { valeur: '0', libelle: { fr: 'framework : HTML, CSS et TypeScript', en: 'framework: HTML, CSS and TypeScript' } },
    { valeur: 'Mobile', libelle: { fr: 'pensé d’abord pour le téléphone', en: 'designed phone-first' } },
    { valeur: 'Vercel', libelle: { fr: 'démo en ligne', en: 'live demo' } },
  ],
  phare: false,
  ordre: 4,
};
```

- [ ] **Step 8 : Écrire `content/projets/gec-sarl/meta.ts`**

```ts
import type { MetaProjet } from '@/lib/contenu/types';

/** GEC S.A.R.L — site institutionnel d'une entreprise de BTP. */
export const gecSarl: MetaProjet = {
  slug: 'gec-sarl',
  nom: 'GEC S.A.R.L',
  accroche: {
    fr: 'Site institutionnel d’une entreprise de BTP : services, chantiers, équipe et contact, en thème sombre.',
    en: 'Corporate website for a construction company: services, projects, team and contact, dark theme.',
  },
  categorie: { fr: 'Entreprise & institutionnel', en: 'Corporate & business' },
  type: 'web',
  plateformes: ['web'],
  stack: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
  role: { fr: 'Conception et développement', en: 'Design and development' },
  client: 'GEC S.A.R.L',
  liens: {
    repo: 'https://github.com/kodage111/gec_sarl/',
    live: 'https://gec-sarl-g8nb.vercel.app/',
  },
  logo: '/projects/gec/gec-logo.png',
  apercu: '/projects/gec/gec-preview.png',
  galerie: [
    { src: '/projects/gec/gec-2.png', legende: { fr: 'Page d’accueil', en: 'Homepage' } },
    { src: '/projects/gec/gec-3.png', legende: { fr: 'Services', en: 'Services' } },
    { src: '/projects/gec/gec-4.png', legende: { fr: 'Chantiers', en: 'Projects' } },
    { src: '/projects/gec/gec-5.png', legende: { fr: 'À propos', en: 'About' } },
    { src: '/projects/gec/gec-6.png', legende: { fr: 'Contact', en: 'Contact' } },
    { src: '/projects/gec/gec-7.png', legende: { fr: 'Thème sombre', en: 'Dark theme' } },
    { src: '/projects/gec/gec-8.png', legende: { fr: 'Version mobile', en: 'Mobile view' } },
    { src: '/projects/gec/gec-9.png', legende: { fr: 'Portfolio', en: 'Portfolio' } },
    { src: '/projects/gec/gec-10.png', legende: { fr: 'Équipe', en: 'Team' } },
  ],
  resultats: [
    { valeur: '8', libelle: { fr: 'pages', en: 'pages' } },
    { valeur: 'React', libelle: { fr: 'composants réutilisables + Tailwind', en: 'reusable components + Tailwind' } },
    { valeur: 'Vercel', libelle: { fr: 'en production', en: 'in production' } },
  ],
  phare: false,
  ordre: 5,
};
```

- [ ] **Step 9 : Écrire `content/projets/assurance-contract-handler/meta.ts`**

```ts
import type { MetaProjet } from '@/lib/contenu/types';

/** Assurance Contract Handler — gestion de contrats d'assurance sur Android, hors ligne. */
export const assuranceContractHandler: MetaProjet = {
  slug: 'assurance-contract-handler',
  nom: 'Assurance Contract Handler',
  accroche: {
    fr: 'Application Android native pour importer des fichiers Excel, gérer les clients et suivre les échéances de contrats avec des rappels automatiques.',
    en: 'Native Android app to import Excel files, manage customers and track contract expirations with automated reminders.',
  },
  categorie: { fr: 'Gestion de fichiers & données', en: 'File & data management' },
  type: 'mobile',
  plateformes: ['android'],
  stack: ['Kotlin', 'Java', 'SQLite', 'Room'],
  role: { fr: 'Conception et développement Android', en: 'Android design and development' },
  client: 'Compagnie d’assurance',
  liens: { repo: 'https://github.com/kodage111/assurance-contract-handler' },
  logo: '/projects/ach/ach-logo.png',
  apercu: '/projects/ach/ach-preview-2.png',
  galerie: [
    { src: '/projects/ach/ach-preview.png', legende: { fr: 'Tableau de bord', en: 'Dashboard overview' } },
    { src: '/projects/ach/ach-1.jpg', legende: { fr: 'Import de fichiers Excel', en: 'Excel import' } },
    { src: '/projects/ach/ach-2.jpg', legende: { fr: 'Base clients', en: 'Customer database' } },
    { src: '/projects/ach/ach-3.jpg', legende: { fr: 'Visualisation des données', en: 'Data visualization' } },
    { src: '/projects/ach/ach-4.jpg', legende: { fr: 'Recherche et filtres', en: 'Search and filters' } },
    { src: '/projects/ach/ach-5.jpg', legende: { fr: 'Profil client', en: 'Customer profile' } },
    { src: '/projects/ach/ach-6.jpg', legende: { fr: 'Génération de factures', en: 'Invoice generation' } },
    { src: '/projects/ach/ach-7.jpg', legende: { fr: 'Alertes d’expiration', en: 'Expiration alerts' } },
    { src: '/projects/ach/ach-8.jpg', legende: { fr: 'Analyses', en: 'Analytics' } },
    { src: '/projects/ach/ach-9.jpg', legende: { fr: 'Export et rapports', en: 'Export and reports' } },
    { src: '/projects/ach/ach-10.jpg', legende: { fr: 'Paramètres', en: 'Settings' } },
  ],
  resultats: [
    { valeur: '10', libelle: { fr: 'écrans, de l’import à la relance', en: 'screens, from import to reminder' } },
    { valeur: 'Excel', libelle: { fr: 'import et export natifs', en: 'native import and export' } },
    { valeur: 'Offline', libelle: { fr: 'base locale SQLite + Room', en: 'local SQLite + Room database' } },
  ],
  phare: false,
  ordre: 6,
};
```

- [ ] **Step 10 : Écrire `content/projets/index.ts` et `lib/contenu/projets.ts`**

`content/projets/index.ts` :

```ts
import type { MetaProjet } from '@/lib/contenu/types';
import { assuranceContractHandler } from './assurance-contract-handler/meta';
import { gecSarl } from './gec-sarl/meta';
import { kori } from './kori/meta';
import { koriPro } from './kori-pro/meta';
import { titans } from './titans/meta';
import { vegetableMarket } from './vegetable-market/meta';

/** Tous les projets. L'ordre d'affichage vient de `ordre`, pas de cette liste. */
export const projets: MetaProjet[] = [titans, koriPro, kori, vegetableMarket, gecSarl, assuranceContractHandler];
```

`lib/contenu/projets.ts` :

```ts
import { projets } from '@/content/projets';
import type { MetaProjet, TypeProjet } from './types';

const TYPES_PROJET: TypeProjet[] = ['mobile', 'web'];

/** Indique si [valeur] est un type de projet connu (utile pour un paramètre d'URL). */
export function estTypeProjet(valeur: string | null | undefined): valeur is TypeProjet {
  return TYPES_PROJET.includes(valeur as TypeProjet);
}

/** Projets triés par `ordre`, filtrés par [type] si fourni. */
export function listerProjets(type?: TypeProjet): MetaProjet[] {
  return [...projets]
    .sort((a, b) => a.ordre - b.ordre)
    .filter((projet) => type === undefined || projet.type === type);
}

/** Slugs de tous les projets, dans l'ordre d'affichage. */
export function slugsProjets(): string[] {
  return listerProjets().map((projet) => projet.slug);
}

/** Projet dont le slug est [slug], ou `undefined`. */
export function trouverProjet(slug: string): MetaProjet | undefined {
  return projets.find((projet) => projet.slug === slug);
}

/** Le projet marqué `phare`. Le test garantit qu'il en existe exactement un. */
export function projetPhare(): MetaProjet {
  const phare = listerProjets().find((projet) => projet.phare);
  if (!phare) throw new Error('Aucun projet phare déclaré');
  return phare;
}

/** Les [nombre] premiers projets non phares, pour la grille de l'accueil. */
export function projetsSelectionnes(nombre = 3): MetaProjet[] {
  return listerProjets()
    .filter((projet) => !projet.phare)
    .slice(0, nombre);
}

/** Projets précédent et suivant dans l'ordre d'affichage, pour la navigation en bas d'une étude de cas. */
export function projetsVoisins(slug: string): { precedent?: MetaProjet; suivant?: MetaProjet } {
  const liste = listerProjets();
  const index = liste.findIndex((projet) => projet.slug === slug);
  return { precedent: liste[index - 1], suivant: liste[index + 1] };
}
```

- [ ] **Step 11 : Vérifier**

Run : `npm test && npm run typecheck && npm run lint`
Attendu : PASS (7 nouveaux tests), typage et lint silencieux. Si « chaque image existe » échoue, vérifier le chemin exact avec `ls public/projects/<dossier>`.

- [ ] **Step 12 : Commit**

```bash
git add content/projets lib/contenu/projets.ts public/projects/titans tests/contenu/projets.test.ts
git commit -m "feat(contenu): métadonnées des six projets et chargeur

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 6 : Études de cas MDX (six projets × deux langues)

**Files:**
- Create : `content/projets/<slug>/fr.mdx` et `content/projets/<slug>/en.mdx` pour les six slugs, `lib/contenu/corps-projets.ts`
- Modify : `mdx-components.tsx`
- Test : `tests/contenu/mdx.test.ts`

**Interfaces:**
- Produces : `corpsProjets: Record<string, Record<Lang, MDXContent>>` — composant MDX du corps d'un projet par slug et langue.

- [ ] **Step 1 : Test d'existence des MDX (échoue)**

`tests/contenu/mdx.test.ts` :

```ts
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
```

Run : `npx vitest run tests/contenu/mdx.test.ts` → attendu FAIL (fichiers absents).

- [ ] **Step 2 : Écrire `content/projets/titans/fr.mdx`**

```mdx
## Contexte

Titans Groupe édite un point de vente pour les commerces de proximité en Afrique de l’Ouest et centrale : maquis, restaurants, dépôts de boissons et autres boutiques. Gérants, serveuses et caissières l’utilisent toute la journée, souvent sur des téléphones d’entrée de gamme et avec un réseau intermittent.

## Problème

Une caisse qui attend le réseau pour enregistrer une vente perd des ventes. Il fallait une application qui fonctionne d’abord en local, synchronise ensuite, et reste cohérente entre le téléphone du serveur, la tablette du gérant et le POS web au comptoir.

## Solution

- Application mobile Flutter, iOS et Android, avec une base SQLite locale : chaque lecture et chaque écriture passent d’abord par le cache, une file de mutations rejoue les écritures vers Firestore quand le réseau revient.
- POS web Next.js qui partage le même backend Firebase (Firestore, Auth, Cloud Functions, Storage) et les mêmes règles de sécurité.
- Cloud Functions TypeScript pour ce qui doit être garanti côté serveur : authentification par jetons personnalisés, rapports planifiés, notifications, purge.
- Back-office d’administration en React et Node.js sur Google Cloud Platform.

## Résultats

Le produit est publié sur l’App Store et le Play Store, et le POS web est en production. Je pilote les réunions techniques hebdomadaires, la réduction de la dette et l’arrivée des nouvelles fonctionnalités, avec des tests unitaires, widget et d’intégration sur les deux plateformes.
```

- [ ] **Step 3 : Écrire `content/projets/titans/en.mdx`**

```mdx
## Context

Titans Groupe publishes a point of sale for neighbourhood businesses in West and Central Africa: bars, restaurants, beverage warehouses and other shops. Managers, waitresses and cashiers use it all day, often on entry-level phones with intermittent network.

## Problem

A checkout that waits for the network to record a sale loses sales. The application had to work locally first, sync afterwards, and stay consistent between the waiter’s phone, the manager’s tablet and the web POS at the counter.

## Solution

- Flutter mobile app, iOS and Android, with a local SQLite database: every read and write goes through the cache first, and an outbox replays writes to Firestore when the network comes back.
- Next.js web POS sharing the same Firebase backend (Firestore, Auth, Cloud Functions, Storage) and the same security rules.
- TypeScript Cloud Functions for what must be guaranteed server-side: custom-token authentication, scheduled reports, notifications, purges.
- Administrative back-office in React and Node.js on Google Cloud Platform.

## Results

The product is live on the App Store and Play Store, and the web POS is in production. I run the weekly technical meetings, drive technical-debt reduction and new features, with unit, widget and integration tests on both platforms.
```

- [ ] **Step 4 : Écrire `content/projets/kori-pro/fr.mdx` et `en.mdx`**

`fr.mdx` :

```mdx
## Contexte

Korí met en relation les professionnels de la beauté et leurs clients. Korí Pro est la version destinée aux prestataires : salons, coiffeurs, esthéticiennes qui veulent gérer leur activité depuis leur téléphone.

## Problème

Un prestataire jongle entre agenda papier, messages WhatsApp et paiements en espèces. Il lui fallait un seul outil pour publier ses prestations, recevoir des réservations, tenir son agenda et encaisser, sans formation.

## Solution

- Application Flutter unique pour iOS et Android, 28 écrans : accueil, agenda, fiche salon, lieu de prestation, catalogue de services, clients, paiements, notifications en temps réel.
- API NestJS sur Node.js, base PostgreSQL via Prisma, hébergée sur Google Cloud avec des briques AWS.
- Infrastructure décrite en code avec Pulumi pour reproduire les environnements.

## Résultats

Une application publiable sur les deux stores à partir d’une seule base de code, reliée au même backend que l’application client Korí.
```

`en.mdx` :

```mdx
## Context

Korí connects beauty professionals with their clients. Korí Pro is the provider-side version: salons, hairdressers and beauticians who want to run their business from their phone.

## Problem

A provider juggles a paper agenda, WhatsApp messages and cash payments. They needed one tool to publish services, receive bookings, keep an agenda and get paid, with no training.

## Solution

- Single Flutter app for iOS and Android, 28 screens: home, agenda, salon profile, service location, service catalog, clients, payments, real-time notifications.
- NestJS API on Node.js, PostgreSQL database through Prisma, hosted on Google Cloud with AWS components.
- Infrastructure as code with Pulumi to reproduce environments.

## Results

An app publishable on both stores from one codebase, connected to the same backend as the Korí client app.
```

- [ ] **Step 5 : Écrire `content/projets/kori/fr.mdx` et `en.mdx`**

`fr.mdx` :

```mdx
## Contexte

Korí est l’application grand public du même écosystème : elle permet de découvrir des professionnels de la beauté vérifiés près de chez soi, de réserver et de gérer ses rendez-vous.

## Problème

Trouver un bon salon repose sur le bouche-à-oreille, et réserver passe par des appels ou des messages sans confirmation. L’application devait rendre la découverte géolocalisée, la réservation instantanée et le paiement sûr.

## Solution

- Application Flutter, iOS et Android, 24 écrans : accueil, découverte et favoris, fiche salon, sélection de prestation, réservation, avis.
- Réservation en temps réel, découverte par localisation, paiement sécurisé et système d’avis, servis par l’API NestJS partagée avec Korí Pro.
- PostgreSQL et Prisma pour les données, Google Cloud et AWS pour l’hébergement, Pulumi pour l’infrastructure.

## Résultats

Deux applications, un backend, une base de code Flutter par application : les évolutions côté prestataire arrivent immédiatement côté client.
```

`en.mdx` :

```mdx
## Context

Korí is the consumer app of the same ecosystem: discover verified beauty professionals nearby, book and manage appointments.

## Problem

Finding a good salon relies on word of mouth, and booking means calls or messages with no confirmation. The app had to make discovery location-based, booking instant and payment safe.

## Solution

- Flutter app, iOS and Android, 24 screens: home, discovery and favourites, salon profile, service selection, booking, reviews.
- Real-time booking, location-based discovery, secure payment and reviews, served by the NestJS API shared with Korí Pro.
- PostgreSQL and Prisma for data, Google Cloud and AWS for hosting, Pulumi for infrastructure.

## Results

Two apps, one backend, one Flutter codebase per app: provider-side changes reach the client side immediately.
```

- [ ] **Step 6 : Écrire `content/projets/vegetable-market/fr.mdx` et `en.mdx`**

`fr.mdx` :

```mdx
## Contexte

Site de démonstration pour un marchand de légumes local : présenter les produits frais, leur valeur nutritionnelle, leur saison et des conseils de cuisine.

## Problème

Un petit commerce a besoin d’une vitrine lisible sur téléphone, rapide à charger et facile à faire évoluer, sans framework lourd ni backend.

## Solution

- Site statique en HTML sémantique, TypeScript pour la logique et Tailwind CSS pour un style cohérent.
- Catalogue de légumes avec fiches : nutrition, disponibilité saisonnière, astuces de cuisine.
- Mise en page pensée d’abord pour le mobile, déployée sur Vercel.

## Résultats

Une démo en ligne qui sert de base à un site marchand complet. Le catalogue n’est pas encore relié à une commande en ligne.
```

`en.mdx` :

```mdx
## Context

Demo website for a local vegetable shop: present fresh produce, nutrition facts, seasonality and cooking tips.

## Problem

A small shop needs a storefront that reads well on a phone, loads fast and is easy to evolve, without a heavy framework or a backend.

## Solution

- Static site in semantic HTML, TypeScript for the logic and Tailwind CSS for consistent styling.
- Vegetable catalog with detail cards: nutrition, seasonal availability, cooking tips.
- Phone-first layout, deployed on Vercel.

## Results

A live demo that serves as the base for a full shop site. The catalog is not yet connected to online ordering.
```

- [ ] **Step 7 : Écrire `content/projets/gec-sarl/fr.mdx` et `en.mdx`**

`fr.mdx` :

```mdx
## Contexte

GEC S.A.R.L est une entreprise de BTP. Elle voulait un site institutionnel qui présente ses services, ses chantiers et son équipe, avec une image sobre et moderne.

## Problème

Le site devait rassurer des clients professionnels : être clair sur les prestations, montrer des réalisations, donner un moyen de contact simple, et rester impeccable sur mobile.

## Solution

- Site React de 8 pages : accueil, services, projets, portfolio, équipe, à propos, contact.
- Thème sombre, composants réutilisables, Tailwind CSS pour la cohérence visuelle.
- Déploiement sur Vercel.

## Résultats

Un site en ligne, responsive, que l’entreprise peut faire évoluer page par page.
```

`en.mdx` :

```mdx
## Context

GEC S.A.R.L is a construction company. It wanted a corporate website presenting its services, projects and team, with a sober, modern image.

## Problem

The site had to reassure professional clients: be clear about services, show completed work, offer a simple way to get in touch, and stay flawless on mobile.

## Solution

- 8-page React site: home, services, projects, portfolio, team, about, contact.
- Dark theme, reusable components, Tailwind CSS for visual consistency.
- Deployed on Vercel.

## Results

A live, responsive site the company can evolve page by page.
```

- [ ] **Step 8 : Écrire `content/projets/assurance-contract-handler/fr.mdx` et `en.mdx`**

`fr.mdx` :

```mdx
## Contexte

Une compagnie d’assurance gérait ses contrats dans des fichiers Excel : clients, échéances, relances. Il fallait un outil mobile pour importer ces fichiers et travailler dessus au quotidien.

## Problème

Retrouver un client, savoir quels contrats expirent ce mois-ci et produire une facture prenait du temps et provoquait des oublis. L’outil devait fonctionner hors ligne, sur les téléphones Android existants.

## Solution

- Application Android native en Kotlin, avec Java pour les bibliothèques existantes.
- Import et traitement de fichiers Excel, base clients structurée, recherche et filtres avancés.
- Tableau de bord et visualisations, génération de factures personnalisées, alertes automatiques d’expiration, export et rapports.
- SQLite avec Room pour un stockage local sécurisé et des requêtes efficaces.

## Résultats

10 écrans, un flux complet de l’import Excel à la relance, entièrement hors ligne.
```

`en.mdx` :

```mdx
## Context

An insurance company managed its contracts in Excel files: customers, expirations, reminders. It needed a mobile tool to import those files and work on them every day.

## Problem

Finding a customer, knowing which contracts expire this month and producing an invoice took time and caused misses. The tool had to work offline, on the existing Android phones.

## Solution

- Native Android app in Kotlin, with Java for existing libraries.
- Excel import and processing, structured customer database, advanced search and filters.
- Dashboard and visualizations, custom invoice generation, automated expiration alerts, export and reports.
- SQLite with Room for secure local storage and efficient queries.

## Results

10 screens, a complete flow from Excel import to reminder, fully offline.
```

- [ ] **Step 9 : Écrire `lib/contenu/corps-projets.ts` et le `mdx-components.tsx` final**

`lib/contenu/corps-projets.ts` :

```ts
import type { MDXContent } from 'mdx/types';
import type { Lang } from '@/lib/i18n/locales';
import AssuranceEn from '@/content/projets/assurance-contract-handler/en.mdx';
import AssuranceFr from '@/content/projets/assurance-contract-handler/fr.mdx';
import GecEn from '@/content/projets/gec-sarl/en.mdx';
import GecFr from '@/content/projets/gec-sarl/fr.mdx';
import KoriEn from '@/content/projets/kori/en.mdx';
import KoriFr from '@/content/projets/kori/fr.mdx';
import KoriProEn from '@/content/projets/kori-pro/en.mdx';
import KoriProFr from '@/content/projets/kori-pro/fr.mdx';
import TitansEn from '@/content/projets/titans/en.mdx';
import TitansFr from '@/content/projets/titans/fr.mdx';
import VegetableEn from '@/content/projets/vegetable-market/en.mdx';
import VegetableFr from '@/content/projets/vegetable-market/fr.mdx';

/**
 * Corps MDX des études de cas, par slug puis par langue. Imports statiques :
 * un fichier manquant casse le build, pas la page. Séparé de `projets.ts`
 * pour que les tests Vitest (qui ne compilent pas le MDX) restent purs.
 */
export const corpsProjets: Record<string, Record<Lang, MDXContent>> = {
  titans: { fr: TitansFr, en: TitansEn },
  'kori-pro': { fr: KoriProFr, en: KoriProEn },
  kori: { fr: KoriFr, en: KoriEn },
  'vegetable-market': { fr: VegetableFr, en: VegetableEn },
  'gec-sarl': { fr: GecFr, en: GecEn },
  'assurance-contract-handler': { fr: AssuranceFr, en: AssuranceEn },
};
```

`mdx-components.tsx` (remplace la version minimale) :

```tsx
import type { MDXComponents } from 'mdx/types';

/** Composants injectés dans chaque MDX : titres, paragraphes et listes aux couleurs du site. */
export function useMDXComponents(composants: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-10 font-display text-h3 font-bold text-texte first:mt-0">{children}</h2>
    ),
    p: ({ children }) => <p className="mt-4 text-corps-large text-texte-secondaire">{children}</p>,
    ul: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-corps-large text-texte-secondaire">{children}</ul>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-texte">{children}</strong>,
    a: ({ href, children }) => (
      <a href={href} className="text-accent underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    ...composants,
  };
}
```

- [ ] **Step 10 : Vérifier tests, typage et build (le MDX compile réellement au build)**

Run : `npm test && npm run typecheck && npm run lint && npm run build`
Attendu : test MDX PASS ; `tsc` accepte les imports `.mdx` (types de `@types/mdx`) ; build sans erreur. Si `tsc` refuse `*.mdx`, créer `mdx.d.ts` à la racine contenant `/// <reference types="mdx" />` et l'ajouter à `include` du tsconfig.

- [ ] **Step 11 : Commit**

```bash
git add content/projets lib/contenu/corps-projets.ts mdx-components.tsx tests/contenu/mdx.test.ts
git commit -m "feat(contenu): études de cas MDX fr/en des six projets

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 7 : Kit UI — Bouton, Badge, Puce, TitreSection, Section, CadreAppareil, RevelationAuDefilement

**Files:**
- Create : `composants/ui/Bouton.tsx`, `composants/ui/Badge.tsx`, `composants/ui/Puce.tsx`, `composants/ui/TitreSection.tsx`, `composants/ui/Section.tsx`, `composants/ui/CadreAppareil.tsx`, `composants/ui/RevelationAuDefilement.tsx`

**Interfaces:**
- Produces :
  - `Bouton({ href, children, variante?: 'plein'|'contour'|'lien', icone?, telecharger?, className? })` — `<a>` pour `http(s):`, `mailto:`, `tel:` ou téléchargement, sinon `next/link`.
  - `Badge({ children })`, `Puce({ children })`.
  - `TitreSection({ surtitre, titre, id?, centre? })`.
  - `Section({ id?, children, className?, bordure? })` — `<section class="section-espace">` + `<div class="conteneur">`.
  - `CadreAppareil({ type: 'telephone'|'navigateur', src?, alt, logo, priorite?, className? })`.
  - `RevelationAuDefilement({ children, delai?, className? })` (client).

- [ ] **Step 1 : Écrire `composants/ui/Bouton.tsx`**

```tsx
import Link from 'next/link';
import type { ReactNode } from 'react';

/** Apparence du bouton. `plein` = accent, `contour` = bordure, `lien` = texte accent sans fond. */
export type VarianteBouton = 'plein' | 'contour' | 'lien';

interface ProprietesBouton {
  href: string;
  children: ReactNode;
  variante?: VarianteBouton;
  /** Icône rendue après le libellé. */
  icone?: ReactNode;
  /** Force `<a download>` (CV). */
  telecharger?: boolean;
  className?: string;
}

const STYLES: Record<VarianteBouton, string> = {
  plein: 'bg-accent text-fond hover:bg-accent-sombre px-5 py-3',
  contour: 'border border-bordure text-texte hover:border-texte px-5 py-3',
  lien: 'text-accent hover:text-texte px-0 py-0',
};

const EXTERNE = /^(https?:|mailto:|tel:)/;

/** Bouton-lien du site. Lien externe, mailto, tel ou téléchargement → `<a>` ; sinon `next/link`. */
export function Bouton({ href, children, variante = 'plein', icone, telecharger = false, className = '' }: ProprietesBouton) {
  const classes = `inline-flex items-center gap-2 rounded-puce font-medium transition-colors duration-150 ${STYLES[variante]} ${className}`;
  const estHttp = /^https?:/.test(href);
  if (telecharger || EXTERNE.test(href)) {
    return (
      <a
        href={href}
        className={classes}
        target={estHttp ? '_blank' : undefined}
        rel={estHttp ? 'noopener noreferrer' : undefined}
        download={telecharger || undefined}
      >
        {children}
        {icone}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {icone}
    </Link>
  );
}
```

- [ ] **Step 2 : Écrire `Badge.tsx`, `Puce.tsx`, `TitreSection.tsx`, `Section.tsx`**

`composants/ui/Badge.tsx` :

```tsx
import type { ReactNode } from 'react';

/** Étiquette avec point accent, en mono capitales (ex. disponibilité, type de contrat). */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-bordure bg-surface px-3 py-1 font-mono text-mono uppercase tracking-wider text-texte-secondaire">
      <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
      {children}
    </span>
  );
}
```

`composants/ui/Puce.tsx` :

```tsx
import type { ReactNode } from 'react';

/** Petite étiquette mono pour une technologie ou une plateforme. */
export function Puce({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-puce border border-bordure bg-surface px-2.5 py-1 font-mono text-mono text-texte-secondaire">
      {children}
    </span>
  );
}
```

`composants/ui/TitreSection.tsx` :

```tsx
interface ProprietesTitreSection {
  surtitre: string;
  titre: string;
  /** Ancre du titre. */
  id?: string;
  centre?: boolean;
}

/** Surtitre mono accent + titre display d'une section. */
export function TitreSection({ surtitre, titre, id, centre = false }: ProprietesTitreSection) {
  return (
    <div className={centre ? 'text-center' : ''}>
      <p className="font-mono text-mono uppercase tracking-widest text-accent">{surtitre}</p>
      <h2 id={id} className="mt-3 font-display text-h2 font-bold">
        {titre}
      </h2>
    </div>
  );
}
```

`composants/ui/Section.tsx` :

```tsx
import type { ReactNode } from 'react';

interface ProprietesSection {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Trait de séparation en bas de la section. */
  bordure?: boolean;
}

/** Section pleine largeur avec l'espacement vertical standard et un conteneur centré. */
export function Section({ id, children, className = '', bordure = false }: ProprietesSection) {
  return (
    <section id={id} className={`section-espace ${bordure ? 'border-b border-bordure' : ''} ${className}`}>
      <div className="conteneur">{children}</div>
    </section>
  );
}
```

- [ ] **Step 3 : Écrire `composants/ui/CadreAppareil.tsx`**

```tsx
import Image from 'next/image';

/** Forme du cadre : téléphone (portrait 9/19) ou fenêtre de navigateur (16/10). */
export type TypeAppareil = 'telephone' | 'navigateur';

interface ProprietesCadreAppareil {
  type: TypeAppareil;
  /** Capture à afficher. Absente : le logo est centré sur un dégradé accent. */
  src?: string;
  alt: string;
  logo: string;
  /** `priority` de `next/image` (hero uniquement). */
  priorite?: boolean;
  className?: string;
}

/** Cadre d'appareil en CSS pur autour d'une capture `next/image`. */
export function CadreAppareil({ type, src, alt, logo, priorite = false, className = '' }: ProprietesCadreAppareil) {
  const contenu = src ? (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 40vw, 90vw"
      priority={priorite}
      className="object-cover object-top"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 to-surface">
      <Image src={logo} alt={alt} width={120} height={120} unoptimized className="h-24 w-24 object-contain" />
    </div>
  );

  if (type === 'telephone') {
    return (
      <div
        className={`relative mx-auto aspect-telephone w-full max-w-telephone overflow-hidden rounded-mockup border-[6px] border-surface-elevee bg-surface ${className}`}
      >
        <div aria-hidden className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-surface-elevee" />
        {contenu}
      </div>
    );
  }
  return (
    <div className={`relative w-full overflow-hidden rounded-carte border border-bordure bg-surface ${className}`}>
      <div aria-hidden className="flex h-8 items-center gap-1.5 border-b border-bordure bg-surface-elevee px-3">
        <span className="h-2.5 w-2.5 rounded-full bg-bordure" />
        <span className="h-2.5 w-2.5 rounded-full bg-bordure" />
        <span className="h-2.5 w-2.5 rounded-full bg-bordure" />
      </div>
      <div className="relative aspect-navigateur">{contenu}</div>
    </div>
  );
}
```

- [ ] **Step 4 : Écrire `composants/ui/RevelationAuDefilement.tsx`**

```tsx
'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ProprietesRevelation {
  children: ReactNode;
  /** Retard en millisecondes avant la transition (cascade). */
  delai?: number;
  className?: string;
}

/**
 * Fait apparaître son contenu (fondu + translation 16 px, 300 ms) la première
 * fois qu'il entre dans la fenêtre. Sans IntersectionObserver, affiche direct.
 * `prefers-reduced-motion` est géré globalement dans `globals.css`.
 */
export function RevelationAuDefilement({ children, delai = 0, className = '' }: ProprietesRevelation) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setVisible(true);
          observateur.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observateur.observe(element);
    return () => observateur.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delai}ms` }}
      className={`transition-all duration-300 ease-sortie ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 5 : Vérifier typage et lint**

Run : `npm run typecheck && npm run lint`
Attendu : silencieux. (Les composants ne sont pas encore montés ; le build les vérifiera à la tâche 8.)

- [ ] **Step 6 : Commit**

```bash
git add composants/ui
git commit -m "feat(ui): kit de composants — bouton, badge, puce, titres, cadre d'appareil, révélation

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 8 : Mise en page — fontes, en-tête, sélecteur de langue, pied de page, 404, SEO, OG

**Files:**
- Create : `lib/i18n/params.ts`, `lib/seo.ts`, `lib/couleurs.ts`, `composants/navigation/EnTete.tsx`, `composants/navigation/SelecteurLangue.tsx`, `composants/navigation/PiedDePage.tsx`, `app/[lang]/not-found.tsx`, `app/[lang]/[...inconnu]/page.tsx`, `app/[lang]/opengraph-image.tsx`
- Modify : `app/[lang]/layout.tsx` (version finale)

**Interfaces:**
- Consumes : `getDictionnaire`, `Dictionnaire`, `LANGUES`, `estLangue`, `LANGUE_DEFAUT`, `COOKIE_LANGUE`, `DUREE_COOKIE_LANGUE`, `lien`, `resoudreChemin`, `coordonnees`, `profil`.
- Produces :
  - `interface ParametresLang { params: Promise<{ lang: string }> }`, `langDepuis(valeur: string): Lang`.
  - `genererMetadonnees({ lang, route, parametres?, titre, description }): Metadata`.
  - `COULEURS_OG: { fond, surface, texte, secondaire, accent }`.
  - `EnTete({ lang, dict })`, `SelecteurLangue({ lang, libelles })` (client), `PiedDePage({ dict })`.

- [ ] **Step 1 : Écrire `lib/i18n/params.ts`, `lib/seo.ts`, `lib/couleurs.ts`**

`lib/i18n/params.ts` :

```ts
import { estLangue, LANGUE_DEFAUT, type Lang } from './locales';

/** Paramètres de route du segment `[lang]` (promesse depuis Next 15). */
export interface ParametresLang {
  params: Promise<{ lang: string }>;
}

/** Normalise le paramètre `lang` en langue servie. Le middleware garantit déjà une langue valide. */
export function langDepuis(valeur: string): Lang {
  return estLangue(valeur) ? valeur : LANGUE_DEFAUT;
}
```

`lib/seo.ts` :

```ts
import type { Metadata } from 'next';
import { coordonnees } from '@/lib/contact';
import { LANGUES, type Lang } from '@/lib/i18n/locales';
import { lien, type ParametresRoute, type Route } from '@/lib/i18n/routes';

interface ParametresMetadonnees {
  lang: Lang;
  route: Route;
  parametres?: ParametresRoute;
  titre: string;
  description: string;
}

/** Construit les métadonnées d'une page : titre, description, canonique, alternates hreflang, Open Graph. */
export function genererMetadonnees({ lang, route, parametres, titre, description }: ParametresMetadonnees): Metadata {
  const { urlSite } = coordonnees();
  const canonique = lien(lang, route, parametres);
  const languages = Object.fromEntries(LANGUES.map((l) => [l, lien(l, route, parametres)]));
  return {
    title: titre,
    description,
    metadataBase: new URL(urlSite),
    alternates: {
      canonical: canonique,
      languages: { ...languages, 'x-default': lien('fr', route, parametres) },
    },
    openGraph: {
      title: titre,
      description,
      url: canonique,
      siteName: 'Emmanuel Tene',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
  };
}
```

`lib/couleurs.ts` :

```ts
/**
 * Miroir des couleurs de `app/globals.css` pour les images Open Graph
 * (Satori ne lit pas le CSS). Seul endroit hors CSS où une couleur est écrite.
 */
export const COULEURS_OG = {
  fond: '#0a0a0b',
  surface: '#141416',
  texte: '#f2f2f0',
  secondaire: '#a1a1a6',
  accent: '#b6f400',
} as const;
```

- [ ] **Step 2 : Écrire `composants/navigation/SelecteurLangue.tsx` (client)**

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COOKIE_LANGUE, DUREE_COOKIE_LANGUE, LANGUES, type Lang } from '@/lib/i18n/locales';
import { lien, resoudreChemin } from '@/lib/i18n/routes';

interface ProprietesSelecteurLangue {
  lang: Lang;
  libelles: { fr: string; en: string; changer: string };
}

/** Bascule FR / EN vers la même page dans l'autre langue et mémorise le choix dans un cookie. */
export function SelecteurLangue({ lang, libelles }: ProprietesSelecteurLangue) {
  const chemin = usePathname();
  const resolu = resoudreChemin(chemin, true);

  return (
    <div role="group" aria-label={libelles.changer} className="flex items-center rounded-puce border border-bordure font-mono text-mono">
      {LANGUES.map((cible) => {
        const href = resolu ? lien(cible, resolu.route, { slug: resolu.slug }) : lien(cible, 'accueil');
        const active = cible === lang;
        return (
          <Link
            key={cible}
            href={href}
            hrefLang={cible}
            aria-current={active ? 'true' : undefined}
            onClick={() => {
              document.cookie = `${COOKIE_LANGUE}=${cible}; path=/; max-age=${DUREE_COOKIE_LANGUE}; samesite=lax`;
            }}
            className={`px-2.5 py-1 transition-colors duration-150 ${active ? 'bg-surface-elevee text-texte' : 'text-texte-secondaire hover:text-texte'}`}
          >
            {libelles[cible]}
          </Link>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3 : Écrire `composants/navigation/EnTete.tsx` et `PiedDePage.tsx`**

`composants/navigation/EnTete.tsx` :

```tsx
import Link from 'next/link';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';
import { SelecteurLangue } from './SelecteurLangue';

interface ProprietesEnTete {
  lang: Lang;
  dict: Dictionnaire;
}

/** Barre de navigation collante : monogramme, liens localisés, sélecteur de langue. */
export function EnTete({ lang, dict }: ProprietesEnTete) {
  const liens = [
    { href: lien(lang, 'projets'), libelle: dict.nav.projets },
    { href: lien(lang, 'aPropos'), libelle: dict.nav.aPropos },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-bordure bg-fond/90 backdrop-blur-sm">
      <div className="conteneur flex h-16 items-center justify-between">
        <Link href={lien(lang, 'accueil')} aria-label={dict.nav.accueil} className="font-display text-h3 font-bold tracking-tight">
          ET<span className="text-accent">.</span>
        </Link>
        <nav aria-label={dict.nav.ariaPrincipale} className="flex items-center gap-5 md:gap-6">
          {liens.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-texte-secondaire transition-colors duration-150 hover:text-texte">
              {l.libelle}
            </Link>
          ))}
          <SelecteurLangue lang={lang} libelles={dict.langue} />
        </nav>
      </div>
    </header>
  );
}
```

`composants/navigation/PiedDePage.tsx` :

```tsx
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { profil } from '@/content/profil';
import { coordonnees } from '@/lib/contact';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';

/** Pied de page : droits (année dynamique), liens sociaux, mention de construction. */
export function PiedDePage({ dict }: { dict: Dictionnaire }) {
  const { linkedin } = coordonnees();
  const annee = new Date().getFullYear();
  return (
    <footer className="border-t border-bordure">
      <div className="conteneur flex flex-col gap-4 py-8 text-sm text-texte-secondaire md:flex-row md:items-center md:justify-between">
        <p>
          © {annee} {profil.nomCourt}. {dict.piedDePage.droits}
        </p>
        <div className="flex items-center gap-4">
          <a href={profil.github} target="_blank" rel="noopener noreferrer" aria-label={dict.contact.github} className="transition-colors duration-150 hover:text-texte">
            <FaGithub className="h-5 w-5" />
          </a>
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={dict.contact.linkedin} className="transition-colors duration-150 hover:text-texte">
              <FaLinkedinIn className="h-5 w-5" />
            </a>
          )}
        </div>
        <p>{dict.piedDePage.construit}</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4 : Réécrire `app/[lang]/layout.tsx` (version finale)**

```tsx
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Syne } from 'next/font/google';
import type { ReactNode } from 'react';
import { EnTete } from '@/composants/navigation/EnTete';
import { PiedDePage } from '@/composants/navigation/PiedDePage';
import { getDictionnaire } from '@/lib/i18n/dictionnaires';
import { LANGUES } from '@/lib/i18n/locales';
import { langDepuis, type ParametresLang } from '@/lib/i18n/params';
import { genererMetadonnees } from '@/lib/seo';
import '../globals.css';

const syne = Syne({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-syne', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains', display: 'swap' });

/** Une page statique par langue. */
export function generateStaticParams() {
  return LANGUES.map((lang) => ({ lang }));
}

/** Métadonnées par défaut (les pages les remplacent). */
export async function generateMetadata({ params }: ParametresLang): Promise<Metadata> {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  return genererMetadonnees({ lang, route: 'accueil', titre: dict.site.titre, description: dict.site.description });
}

/** Mise en page racine : fontes, en-tête, pied de page. */
export default async function MiseEnPage({ children, params }: ParametresLang & { children: ReactNode }) {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  return (
    <html lang={lang} className={`${syne.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-fond font-sans text-texte antialiased">
        <EnTete lang={lang} dict={dict} />
        <main>{children}</main>
        <PiedDePage dict={dict} />
      </body>
    </html>
  );
}
```

- [ ] **Step 5 : Écrire la 404, le catch-all et l'image Open Graph**

`app/[lang]/not-found.tsx` (sans accès aux paramètres : affiche les deux langues) :

```tsx
import Link from 'next/link';
import fr from '@/dictionnaires/fr.json';
import en from '@/dictionnaires/en.json';
import { lien } from '@/lib/i18n/routes';

const VERSIONS = [
  { lang: 'fr' as const, dict: fr },
  { lang: 'en' as const, dict: en },
];

/** Page 404 sous `[lang]`. Rendue par le catch-all et par `notFound()` des pages. */
export default function NonTrouve() {
  return (
    <section className="section-espace">
      <div className="conteneur max-w-2xl">
        {VERSIONS.map(({ lang, dict }, index) => {
          const Titre = index === 0 ? 'h1' : 'h2';
          return (
            <div key={lang} lang={lang} className="mb-10">
              <p className="font-mono text-mono uppercase tracking-widest text-accent">404</p>
              <Titre className="mt-2 font-display text-h2 font-bold">{dict.nonTrouve.titre}</Titre>
              <p className="mt-2 text-texte-secondaire">{dict.nonTrouve.texte}</p>
              <Link href={lien(lang, 'accueil')} className="mt-4 inline-block text-accent underline-offset-4 hover:underline">
                {dict.nonTrouve.retour}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

`app/[lang]/[...inconnu]/page.tsx` :

```tsx
import { notFound } from 'next/navigation';

/** Tout chemin non reconnu sous une langue rend la 404 localisée. */
export default function PageInconnue() {
  notFound();
}
```

`app/[lang]/opengraph-image.tsx` :

```tsx
import { ImageResponse } from 'next/og';
import { profil } from '@/content/profil';
import { COULEURS_OG } from '@/lib/couleurs';
import { getDictionnaire } from '@/lib/i18n/dictionnaires';
import { langDepuis, type ParametresLang } from '@/lib/i18n/params';

export const alt = 'Emmanuel Tene — Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Image Open Graph des pages générales : nom, positionnement, accent. */
export default async function ImageOpenGraph({ params }: ParametresLang) {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: COULEURS_OG.fond,
          color: COULEURS_OG.texte,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 28, color: COULEURS_OG.accent, letterSpacing: 6 }}>PORTFOLIO</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 80, fontWeight: 700 }}>{profil.nomCourt}</div>
          <div style={{ fontSize: 34, color: COULEURS_OG.secondaire }}>{dict.hero.positionnement}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Step 6 : Vérifier build et rendu**

Run : `npm run typecheck && npm run lint && npm run build`
Attendu : sans erreur ; routes `● /[lang]` (SSG, `/fr` et `/en`), `ƒ /[lang]/[...inconnu]`, `● /[lang]/opengraph-image`.

Serveur de dev en arrière-plan puis :

```bash
curl -s --retry 15 --retry-delay 1 --retry-connrefused http://localhost:3100/fr | grep -o '<html[^>]*>' 
curl -s http://localhost:3100/fr | grep -o 'hreflang="[a-z-]*"' | sort -u
curl -s http://localhost:3100/en | grep -o 'href="/en/projects"'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3100/fr/blog
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' http://localhost:3100/fr/opengraph-image
```

Attendu : `<html lang="fr" class="…">` avec les trois variables de fonte ; `hreflang="en"`, `"fr"`, `"x-default"` ; le lien `/en/projects` présent ; `404` ; `200 image/png`. Arrêter le serveur.

- [ ] **Step 7 : Commit**

```bash
git add lib/i18n/params.ts lib/seo.ts lib/couleurs.ts composants/navigation app/\[lang\]
git commit -m "feat(layout): fontes, en-tête, sélecteur de langue, pied de page, 404 et Open Graph

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 9 : Accueil — hero, projet phare, grille, expertises, stack, parcours, contact, JSON-LD

**Files:**
- Create : `composants/projets/CarteProjet.tsx`, `composants/accueil/Hero.tsx`, `composants/accueil/ProjetPhare.tsx`, `composants/accueil/GrilleProjets.tsx`, `composants/accueil/Expertises.tsx`, `composants/accueil/MurStack.tsx`, `composants/accueil/ParcoursResume.tsx`, `composants/accueil/Contact.tsx`, `composants/accueil/DonneesStructurees.tsx`
- Modify : `app/[lang]/page.tsx` (version finale)

**Interfaces:**
- Consumes : kit UI (tâche 7), `projetPhare`, `projetsSelectionnes`, `experiences`, `technologiesParGroupe`, `GROUPES_STACK`, `LIBELLES_PLATEFORMES`, `coordonnees`, `lienWhatsapp`, `formaterPeriode`, `profil`, `lien`, `genererMetadonnees`, `langDepuis`.
- Produces : `CarteProjet({ lang, dict, projet, delai? })` réutilisée par la liste (tâche 10).

- [ ] **Step 1 : Écrire `composants/projets/CarteProjet.tsx`**

```tsx
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Puce } from '@/composants/ui/Puce';
import { RevelationAuDefilement } from '@/composants/ui/RevelationAuDefilement';
import { LIBELLES_PLATEFORMES } from '@/lib/contenu/plateformes';
import type { MetaProjet } from '@/lib/contenu/types';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';

interface ProprietesCarteProjet {
  lang: Lang;
  dict: Dictionnaire;
  projet: MetaProjet;
  /** Retard de révélation en ms (cascade dans une grille). */
  delai?: number;
}

/** Carte d'un projet : aperçu, logo, nom, accroche, plateformes et trois technologies. Toute la carte est un lien. */
export function CarteProjet({ lang, dict, projet, delai = 0 }: ProprietesCarteProjet) {
  return (
    <RevelationAuDefilement delai={delai} className="h-full">
      <article className="group flex h-full flex-col rounded-carte border border-bordure bg-surface transition-colors duration-150 hover:border-texte-secondaire">
        <Link
          href={lien(lang, 'projet', { slug: projet.slug })}
          aria-label={`${dict.projets.voir} : ${projet.nom}`}
          className="flex h-full flex-col p-5"
        >
          <div className="relative aspect-navigateur overflow-hidden rounded-puce bg-surface-elevee">
            {projet.apercu ? (
              <Image
                src={projet.apercu}
                alt=""
                fill
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="object-cover object-top transition-transform duration-300 ease-sortie group-hover:scale-102"
              />
            ) : (
              <Image
                src={projet.logo}
                alt=""
                width={96}
                height={96}
                unoptimized
                className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 object-contain"
              />
            )}
          </div>
          <div className="mt-5 flex items-center gap-3">
            <Image src={projet.logo} alt="" width={32} height={32} unoptimized className="h-8 w-8 rounded-puce object-contain" />
            <h3 className="font-display text-h3 font-bold">{projet.nom}</h3>
          </div>
          <p className="mt-2 text-texte-secondaire">{projet.accroche[lang]}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {projet.plateformes.map((p) => (
              <Puce key={p}>{LIBELLES_PLATEFORMES[p]}</Puce>
            ))}
            {projet.stack.slice(0, 3).map((t) => (
              <Puce key={t}>{t}</Puce>
            ))}
          </div>
          <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm text-accent">
            {dict.projets.voir}
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
          </span>
        </Link>
      </article>
    </RevelationAuDefilement>
  );
}
```

- [ ] **Step 2 : Écrire `composants/accueil/Hero.tsx`**

```tsx
import { ArrowRight, Download } from 'lucide-react';
import Image from 'next/image';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { Badge } from '@/composants/ui/Badge';
import { Bouton } from '@/composants/ui/Bouton';
import { profil } from '@/content/profil';
import { coordonnees, lienWhatsapp } from '@/lib/contact';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';

interface ProprietesHero {
  lang: Lang;
  dict: Dictionnaire;
}

/** Hero : nom, positionnement, disponibilité, deux CTA (projet / recrutement), portrait duotone. */
export function Hero({ lang, dict }: ProprietesHero) {
  const { email, whatsapp, linkedin } = coordonnees();
  const hrefProjet = lienWhatsapp(whatsapp, dict.contact.messageWhatsapp) || (email ? `mailto:${email}` : '#contact');
  return (
    <section className="section-espace border-b border-bordure">
      <div className="conteneur grid items-center gap-12 lg:grid-cols-[3fr_2fr]">
        <div>
          <Badge>{dict.hero.disponibilite}</Badge>
          <p className="mt-6 font-mono text-mono text-texte-secondaire">{dict.hero.salutation}</p>
          <h1 className="mt-2 font-display text-display-mobile font-extrabold md:text-display">
            {profil.nomCourt}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-4 text-corps-large text-texte">{dict.hero.positionnement}</p>
          <p className="mt-4 max-w-xl text-corps-large text-texte-secondaire">{dict.hero.accroche}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Bouton href={hrefProjet} icone={<ArrowRight className="h-4 w-4" />}>
              {dict.hero.ctaProjet}
            </Bouton>
            <Bouton href={profil.cv[lang]} variante="contour" telecharger icone={<Download className="h-4 w-4" />}>
              {dict.hero.ctaRecrute}
            </Bouton>
          </div>
          <div className="mt-6 flex items-center gap-4 text-texte-secondaire">
            <a href={profil.github} target="_blank" rel="noopener noreferrer" aria-label={dict.contact.github} className="transition-colors duration-150 hover:text-texte">
              <FaGithub className="h-5 w-5" />
            </a>
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={dict.contact.linkedin} className="transition-colors duration-150 hover:text-texte">
                <FaLinkedinIn className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-portrait">
          <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-carte border border-accent" />
          <div className="relative overflow-hidden rounded-carte bg-accent">
            <Image
              src={profil.portrait}
              alt={dict.hero.portraitAlt}
              width={520}
              height={520}
              priority
              sizes="(min-width: 1024px) 26rem, 80vw"
              className="h-auto w-full object-cover grayscale mix-blend-luminosity"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3 : Écrire `composants/accueil/ProjetPhare.tsx` et `GrilleProjets.tsx`**

`composants/accueil/ProjetPhare.tsx` :

```tsx
import { ArrowRight } from 'lucide-react';
import { Bouton } from '@/composants/ui/Bouton';
import { CadreAppareil } from '@/composants/ui/CadreAppareil';
import { Puce } from '@/composants/ui/Puce';
import { RevelationAuDefilement } from '@/composants/ui/RevelationAuDefilement';
import { Section } from '@/composants/ui/Section';
import { TitreSection } from '@/composants/ui/TitreSection';
import type { MetaProjet } from '@/lib/contenu/types';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';

interface ProprietesProjetPhare {
  lang: Lang;
  dict: Dictionnaire;
  projet: MetaProjet;
}

/** Projet phare : mockup, accroche, trois chiffres, stack, lien vers l'étude de cas. */
export function ProjetPhare({ lang, dict, projet }: ProprietesProjetPhare) {
  return (
    <Section id="projet-phare" bordure>
      <TitreSection surtitre={dict.projetPhare.surtitre} titre={projet.nom} />
      <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
        <RevelationAuDefilement>
          <CadreAppareil
            type={projet.type === 'mobile' ? 'telephone' : 'navigateur'}
            src={projet.apercu}
            logo={projet.logo}
            alt={projet.nom}
          />
        </RevelationAuDefilement>
        <RevelationAuDefilement delai={100}>
          <p className="text-corps-large text-texte-secondaire">{projet.accroche[lang]}</p>
          <ul className="mt-8 grid grid-cols-3 gap-3">
            {projet.resultats.map((resultat) => (
              <li key={resultat.libelle.fr} className="rounded-carte border border-bordure bg-surface p-4">
                <span className="block font-display text-h3 font-bold text-accent">{resultat.valeur}</span>
                <span className="mt-1 block text-sm text-texte-secondaire">{resultat.libelle[lang]}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {projet.stack.map((t) => (
              <Puce key={t}>{t}</Puce>
            ))}
          </div>
          <div className="mt-8">
            <Bouton href={lien(lang, 'projet', { slug: projet.slug })} icone={<ArrowRight className="h-4 w-4" />}>
              {dict.projetPhare.voirEtude}
            </Bouton>
          </div>
        </RevelationAuDefilement>
      </div>
    </Section>
  );
}
```

`composants/accueil/GrilleProjets.tsx` :

```tsx
import { ArrowRight } from 'lucide-react';
import { CarteProjet } from '@/composants/projets/CarteProjet';
import { Bouton } from '@/composants/ui/Bouton';
import { Section } from '@/composants/ui/Section';
import { TitreSection } from '@/composants/ui/TitreSection';
import type { MetaProjet } from '@/lib/contenu/types';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';

interface ProprietesGrilleProjets {
  lang: Lang;
  dict: Dictionnaire;
  projets: MetaProjet[];
}

/** Grille de projets sélectionnés avec lien vers la liste complète. */
export function GrilleProjets({ lang, dict, projets }: ProprietesGrilleProjets) {
  return (
    <Section id="projets" bordure>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <TitreSection surtitre={dict.projets.surtitre} titre={dict.projets.titre} />
        <Bouton href={lien(lang, 'projets')} variante="lien" icone={<ArrowRight className="h-4 w-4" />}>
          {dict.projets.tous}
        </Bouton>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projets.map((projet, index) => (
          <CarteProjet key={projet.slug} lang={lang} dict={dict} projet={projet} delai={index * 80} />
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 4 : Écrire `Expertises.tsx`, `MurStack.tsx`, `ParcoursResume.tsx`**

`composants/accueil/Expertises.tsx` :

```tsx
import { Check, Globe, Server, Smartphone } from 'lucide-react';
import { RevelationAuDefilement } from '@/composants/ui/RevelationAuDefilement';
import { Section } from '@/composants/ui/Section';
import { TitreSection } from '@/composants/ui/TitreSection';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';

const ICONES = [Smartphone, Globe, Server];

/** Trois cartes d'expertise (mobile, web, backend) avec livrables concrets. Textes du dictionnaire. */
export function Expertises({ dict }: { dict: Dictionnaire }) {
  return (
    <Section id="expertises" bordure>
      <TitreSection surtitre={dict.expertises.surtitre} titre={dict.expertises.titre} />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {dict.expertises.cartes.map((carte, index) => {
          const Icone = ICONES[index] ?? Smartphone;
          return (
            <RevelationAuDefilement key={carte.titre} delai={index * 80} className="h-full">
              <article className="flex h-full flex-col rounded-carte border border-bordure bg-surface p-6">
                <Icone className="h-7 w-7 text-accent" aria-hidden />
                <h3 className="mt-4 font-display text-h3 font-bold">{carte.titre}</h3>
                <p className="mt-2 text-texte-secondaire">{carte.description}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {carte.livrables.map((livrable) => (
                    <li key={livrable} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      <span>{livrable}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </RevelationAuDefilement>
          );
        })}
      </div>
    </Section>
  );
}
```

`composants/accueil/MurStack.tsx` :

```tsx
import Image from 'next/image';
import { Section } from '@/composants/ui/Section';
import { TitreSection } from '@/composants/ui/TitreSection';
import { GROUPES_STACK, technologiesParGroupe } from '@/content/stack';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';

/** Mur de logos groupés par famille, sans niveau ni pourcentage. Logos sur tuile claire pour rester lisibles. */
export function MurStack({ dict }: { dict: Dictionnaire }) {
  return (
    <Section id="stack" bordure>
      <TitreSection surtitre={dict.stack.surtitre} titre={dict.stack.titre} />
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {GROUPES_STACK.map((groupe) => (
          <div key={groupe}>
            <h3 className="font-mono text-mono uppercase tracking-widest text-texte-secondaire">{dict.stack.groupes[groupe]}</h3>
            <ul className="mt-4 flex flex-wrap gap-3">
              {technologiesParGroupe(groupe).map((technologie) => (
                <li key={technologie.nom} className="flex items-center gap-2 rounded-puce border border-bordure bg-surface py-2 pl-2 pr-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-texte">
                    <Image src={technologie.icone} alt="" width={20} height={20} unoptimized className="h-5 w-5" />
                  </span>
                  <span className="text-sm">{technologie.nom}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

`composants/accueil/ParcoursResume.tsx` :

```tsx
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/composants/ui/Badge';
import { Bouton } from '@/composants/ui/Bouton';
import { Section } from '@/composants/ui/Section';
import { TitreSection } from '@/composants/ui/TitreSection';
import type { Experience } from '@/lib/contenu/types';
import { formaterPeriode } from '@/lib/dates';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';

interface ProprietesParcoursResume {
  lang: Lang;
  dict: Dictionnaire;
  experiences: Experience[];
}

/** Trois jalons du parcours (période, poste, employeur, contrat) et lien vers la page À propos. */
export function ParcoursResume({ lang, dict, experiences }: ProprietesParcoursResume) {
  return (
    <Section id="parcours" bordure>
      <TitreSection surtitre={dict.parcours.surtitre} titre={dict.parcours.titre} />
      <ol className="mt-10 divide-y divide-bordure border-y border-bordure">
        {experiences.map((experience) => (
          <li key={experience.id} className="grid gap-2 py-5 md:grid-cols-[14rem_1fr_auto] md:items-center md:gap-6">
            <span className="font-mono text-mono text-texte-secondaire">
              {formaterPeriode(experience.debut, experience.fin, lang, dict.parcours.aujourdhui)}
            </span>
            <span>
              <span className="font-semibold">{experience.poste[lang]}</span>
              <span className="text-texte-secondaire"> · {experience.employeur[lang]}</span>
            </span>
            <Badge>{dict.parcours.contrat[experience.typeContrat]}</Badge>
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <Bouton href={lien(lang, 'aPropos')} variante="lien" icone={<ArrowRight className="h-4 w-4" />}>
          {dict.parcours.voirTout}
        </Bouton>
      </div>
    </Section>
  );
}
```

- [ ] **Step 5 : Écrire `Contact.tsx` et `DonneesStructurees.tsx`**

`composants/accueil/Contact.tsx` :

```tsx
import { Download, Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import { Bouton } from '@/composants/ui/Bouton';
import { Section } from '@/composants/ui/Section';
import { TitreSection } from '@/composants/ui/TitreSection';
import { profil } from '@/content/profil';
import { coordonnees, lienWhatsapp } from '@/lib/contact';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';

interface ProprietesContact {
  lang: Lang;
  dict: Dictionnaire;
}

/** Section contact : email, WhatsApp, LinkedIn, GitHub, CV (langue courante + lien vers l'autre). Un lien absent n'est pas rendu. */
export function Contact({ lang, dict }: ProprietesContact) {
  const { email, whatsapp, linkedin } = coordonnees();
  const autreLang: Lang = lang === 'fr' ? 'en' : 'fr';
  return (
    <Section id="contact">
      <div className="max-w-2xl">
        <TitreSection surtitre={dict.contact.surtitre} titre={dict.contact.titre} />
        <p className="mt-4 text-corps-large text-texte-secondaire">{dict.contact.texte}</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {email && (
          <Bouton href={`mailto:${email}`} icone={<Mail className="h-4 w-4" />}>
            {dict.contact.email}
          </Bouton>
        )}
        {whatsapp && (
          <Bouton href={lienWhatsapp(whatsapp, dict.contact.messageWhatsapp)} variante="contour" icone={<FaWhatsapp className="h-4 w-4" />}>
            {dict.contact.whatsapp}
          </Bouton>
        )}
        {linkedin && (
          <Bouton href={linkedin} variante="contour" icone={<FaLinkedinIn className="h-4 w-4" />}>
            {dict.contact.linkedin}
          </Bouton>
        )}
        <Bouton href={profil.github} variante="contour" icone={<FaGithub className="h-4 w-4" />}>
          {dict.contact.github}
        </Bouton>
        <Bouton href={profil.cv[lang]} variante="contour" telecharger icone={<Download className="h-4 w-4" />}>
          {dict.contact.cv}
        </Bouton>
      </div>
      <p className="mt-4 text-sm text-texte-secondaire">
        <a href={profil.cv[autreLang]} download className="underline-offset-4 hover:text-texte hover:underline">
          {dict.contact.cvAutreLangue}
        </a>
      </p>
    </Section>
  );
}
```

`composants/accueil/DonneesStructurees.tsx` :

```tsx
import { profil } from '@/content/profil';
import { coordonnees } from '@/lib/contact';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';

/** JSON-LD `Person` pour les moteurs de recherche. */
export function DonneesStructurees({ lang }: { lang: Lang }) {
  const { urlSite, email, linkedin } = coordonnees();
  const donnees = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profil.nomComplet,
    alternateName: profil.nomCourt,
    jobTitle: profil.role[lang],
    url: `${urlSite}${lien(lang, 'accueil')}`,
    email: email || undefined,
    address: { '@type': 'PostalAddress', addressLocality: 'Douala', addressCountry: 'CM' },
    sameAs: [profil.github, linkedin].filter(Boolean),
    worksFor: { '@type': 'Organization', name: 'Titans Groupe', url: 'https://titans-groupe.com' },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }} />;
}
```

- [ ] **Step 6 : Réécrire `app/[lang]/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { Contact } from '@/composants/accueil/Contact';
import { DonneesStructurees } from '@/composants/accueil/DonneesStructurees';
import { Expertises } from '@/composants/accueil/Expertises';
import { GrilleProjets } from '@/composants/accueil/GrilleProjets';
import { Hero } from '@/composants/accueil/Hero';
import { MurStack } from '@/composants/accueil/MurStack';
import { ParcoursResume } from '@/composants/accueil/ParcoursResume';
import { ProjetPhare } from '@/composants/accueil/ProjetPhare';
import { experiences } from '@/content/experiences';
import { projetPhare, projetsSelectionnes } from '@/lib/contenu/projets';
import { getDictionnaire } from '@/lib/i18n/dictionnaires';
import { langDepuis, type ParametresLang } from '@/lib/i18n/params';
import { genererMetadonnees } from '@/lib/seo';

/** Métadonnées de l'accueil (titre complet du site). */
export async function generateMetadata({ params }: ParametresLang): Promise<Metadata> {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  return genererMetadonnees({ lang, route: 'accueil', titre: dict.site.titre, description: dict.site.description });
}

/** Accueil : hero, projet phare, projets sélectionnés, expertises, stack, parcours, contact. */
export default async function Accueil({ params }: ParametresLang) {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  return (
    <>
      <DonneesStructurees lang={lang} />
      <Hero lang={lang} dict={dict} />
      <ProjetPhare lang={lang} dict={dict} projet={projetPhare()} />
      <GrilleProjets lang={lang} dict={dict} projets={projetsSelectionnes(3)} />
      <Expertises dict={dict} />
      <MurStack dict={dict} />
      <ParcoursResume lang={lang} dict={dict} experiences={experiences} />
      <Contact lang={lang} dict={dict} />
    </>
  );
}
```

- [ ] **Step 7 : Vérifier build et rendu**

Run : `npm run typecheck && npm run lint && npm run build`
Attendu : sans erreur. Puis serveur de dev en arrière-plan et :

```bash
curl -s --retry 15 --retry-delay 1 --retry-connrefused http://localhost:3100/fr | grep -oE 'id="(projet-phare|projets|expertises|stack|parcours|contact)"' | wc -l
curl -s http://localhost:3100/en | grep -o 'application/ld+json'
curl -s http://localhost:3100/fr | grep -o 'href="/fr/projets/titans"' | head -1
```

Attendu : `6` ; `application/ld+json` ; le lien vers l'étude Titans. Ouvrir `http://localhost:3100/fr` dans un navigateur : hero avec portrait teinté vert, badge, deux boutons ; mockup téléphone Titans avec logo centré ; grille de trois cartes ; logos de stack sur tuiles claires. Arrêter le serveur.

- [ ] **Step 8 : Commit**

```bash
git add composants/accueil composants/projets/CarteProjet.tsx app/\[lang\]/page.tsx
git commit -m "feat(accueil): hero, projet phare, grille, expertises, stack, parcours, contact

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 10 : Liste des projets avec filtre Tous / Mobile / Web

**Files:**
- Create : `composants/projets/FiltreProjets.tsx`, `app/[lang]/projets/page.tsx`

**Interfaces:**
- Consumes : `CarteProjet`, `listerProjets`, `estTypeProjet`, `TypeProjet`, `lien`, `genererMetadonnees`.
- Produces : `FiltreProjets({ lang, dict, actif? })` — liens `?type=` (état dans l'URL, aucun composant client).

- [ ] **Step 1 : Écrire `composants/projets/FiltreProjets.tsx`**

```tsx
import Link from 'next/link';
import type { TypeProjet } from '@/lib/contenu/types';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';

interface ProprietesFiltreProjets {
  lang: Lang;
  dict: Dictionnaire;
  /** Type actif ; `undefined` = tous. */
  actif?: TypeProjet;
}

/** Puces de filtre Tous / Mobile / Web. L'état vit dans l'URL (`?type=`), le serveur filtre. */
export function FiltreProjets({ lang, dict, actif }: ProprietesFiltreProjets) {
  const base = lien(lang, 'projets');
  const options: { valeur?: TypeProjet; libelle: string }[] = [
    { libelle: dict.projets.filtre.tous },
    { valeur: 'mobile', libelle: dict.projets.filtre.mobile },
    { valeur: 'web', libelle: dict.projets.filtre.web },
  ];
  return (
    <nav aria-label={dict.projets.filtreAria} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const estActif = option.valeur === actif;
        return (
          <Link
            key={option.libelle}
            href={option.valeur ? `${base}?type=${option.valeur}` : base}
            aria-current={estActif ? 'page' : undefined}
            className={`rounded-full border px-4 py-2 text-sm transition-colors duration-150 ${
              estActif ? 'border-accent bg-accent text-fond' : 'border-bordure text-texte-secondaire hover:border-texte hover:text-texte'
            }`}
          >
            {option.libelle}
          </Link>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 2 : Écrire `app/[lang]/projets/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { CarteProjet } from '@/composants/projets/CarteProjet';
import { FiltreProjets } from '@/composants/projets/FiltreProjets';
import { Section } from '@/composants/ui/Section';
import { TitreSection } from '@/composants/ui/TitreSection';
import { estTypeProjet, listerProjets } from '@/lib/contenu/projets';
import { getDictionnaire } from '@/lib/i18n/dictionnaires';
import { langDepuis, type ParametresLang } from '@/lib/i18n/params';
import { genererMetadonnees } from '@/lib/seo';

interface ProprietesPageProjets extends ParametresLang {
  searchParams: Promise<{ type?: string }>;
}

/** Métadonnées de la liste des projets. */
export async function generateMetadata({ params }: ParametresLang): Promise<Metadata> {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  return genererMetadonnees({
    lang,
    route: 'projets',
    titre: `${dict.projets.titrePage} — ${dict.site.nomCourt}`,
    description: dict.projets.introPage,
  });
}

/** Liste de tous les projets, filtrable par type via `?type=mobile|web`. */
export default async function PageProjets({ params, searchParams }: ProprietesPageProjets) {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  const { type } = await searchParams;
  const filtre = estTypeProjet(type) ? type : undefined;
  const projets = listerProjets(filtre);

  return (
    <Section>
      <div className="max-w-2xl">
        <TitreSection surtitre={dict.projets.surtitre} titre={dict.projets.titrePage} />
        <p className="mt-4 text-corps-large text-texte-secondaire">{dict.projets.introPage}</p>
      </div>
      <div className="mt-8">
        <FiltreProjets lang={lang} dict={dict} actif={filtre} />
      </div>
      {projets.length === 0 ? (
        <p className="mt-10 text-texte-secondaire">{dict.projets.aucun}</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projets.map((projet, index) => (
            <CarteProjet key={projet.slug} lang={lang} dict={dict} projet={projet} delai={index * 80} />
          ))}
        </div>
      )}
    </Section>
  );
}
```

- [ ] **Step 3 : Vérifier**

Run : `npm run typecheck && npm run lint && npm run build`
Attendu : route `ƒ /[lang]/projets` (dynamique à cause de `searchParams`). Serveur de dev puis :

```bash
curl -s --retry 15 --retry-delay 1 --retry-connrefused http://localhost:3100/en/projects | grep -o 'href="/en/projects/[a-z-]*"' | sort -u
curl -s 'http://localhost:3100/fr/projets?type=web' | grep -o 'href="/fr/projets/[a-z-]*"' | sort -u
curl -s 'http://localhost:3100/fr/projets?type=web' | grep -o 'aria-current="page"' | wc -l
```

Attendu : six liens ; deux liens (`gec-sarl`, `vegetable-market`) ; `1`. Arrêter le serveur.

- [ ] **Step 4 : Commit**

```bash
git add composants/projets/FiltreProjets.tsx app/\[lang\]/projets/page.tsx
git commit -m "feat(projets): liste filtrable par type

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 11 : Étude de cas — page projet, galerie, visionneuse, navigation, OG par projet

**Files:**
- Create : `composants/projets/Galerie.tsx`, `composants/projets/Visionneuse.tsx`, `composants/projets/ProjetSuivant.tsx`, `composants/projets/LiensProjet.tsx`, `app/[lang]/projets/[slug]/page.tsx`, `app/[lang]/projets/[slug]/opengraph-image.tsx`

**Interfaces:**
- Consumes : `trouverProjet`, `slugsProjets`, `projetsVoisins`, `corpsProjets`, `LIBELLES_PLATEFORMES`, kit UI, `COULEURS_OG`.
- Produces : `Galerie({ images, titre, libelles })` (client), `Visionneuse({ images, indexInitial, onFermer, libelles })` (client), `ProjetSuivant({ lang, dict, precedent?, suivant? })`, `LiensProjet({ liens, dict })`.

- [ ] **Step 1 : Écrire `composants/projets/Visionneuse.tsx` (client)**

```tsx
'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';

/** Une image de la visionneuse. */
export interface ImageVisionneuse {
  src: string;
  alt: string;
}

/** Libellés accessibles des commandes. */
export interface LibellesVisionneuse {
  fermer: string;
  precedent: string;
  suivant: string;
}

interface ProprietesVisionneuse {
  images: ImageVisionneuse[];
  indexInitial: number;
  onFermer: () => void;
  libelles: LibellesVisionneuse;
}

const SEUIL_BALAYAGE = 40;

/**
 * Visionneuse plein écran : flèches et Échap au clavier, balayage horizontal
 * au doigt, clic sur le fond pour fermer. Bloque le défilement de la page.
 */
export function Visionneuse({ images, indexInitial, onFermer, libelles }: ProprietesVisionneuse) {
  const [index, setIndex] = useState(indexInitial);
  const departTouche = useRef<number | null>(null);
  const boutonFermer = useRef<HTMLButtonElement>(null);

  const precedent = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const suivant = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const surTouche = (evenement: KeyboardEvent) => {
      if (evenement.key === 'Escape') onFermer();
      if (evenement.key === 'ArrowLeft') precedent();
      if (evenement.key === 'ArrowRight') suivant();
    };
    window.addEventListener('keydown', surTouche);
    const debordement = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    boutonFermer.current?.focus();
    return () => {
      window.removeEventListener('keydown', surTouche);
      document.body.style.overflow = debordement;
    };
  }, [onFermer, precedent, suivant]);

  const image = images[index];
  const stopper = (evenement: MouseEvent) => evenement.stopPropagation();
  const boutonNav = 'rounded-puce border border-bordure p-2 transition-colors duration-150 hover:border-texte';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-50 flex flex-col bg-fond/95"
      onClick={onFermer}
      onTouchStart={(evenement) => {
        departTouche.current = evenement.touches[0].clientX;
      }}
      onTouchEnd={(evenement) => {
        if (departTouche.current === null) return;
        const delta = evenement.changedTouches[0].clientX - departTouche.current;
        if (Math.abs(delta) > SEUIL_BALAYAGE) (delta > 0 ? precedent : suivant)();
        departTouche.current = null;
      }}
    >
      <div className="flex items-center justify-between p-4" onClick={stopper}>
        <span className="font-mono text-mono text-texte-secondaire">
          {index + 1} / {images.length}
        </span>
        <button ref={boutonFermer} type="button" onClick={onFermer} aria-label={libelles.fermer} className={boutonNav}>
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="relative flex-1" onClick={stopper}>
        <Image key={image.src} src={image.src} alt={image.alt} fill sizes="100vw" className="object-contain" />
      </div>
      <div className="flex items-center justify-between gap-4 p-4" onClick={stopper}>
        <button type="button" onClick={precedent} aria-label={libelles.precedent} className={boutonNav}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="text-center text-sm text-texte-secondaire">{image.alt}</p>
        <button type="button" onClick={suivant} aria-label={libelles.suivant} className={boutonNav}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2 : Écrire `composants/projets/Galerie.tsx` (client)**

```tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Visionneuse, type ImageVisionneuse, type LibellesVisionneuse } from './Visionneuse';

interface ProprietesGalerie {
  images: ImageVisionneuse[];
  titre: string;
  libelles: LibellesVisionneuse;
}

/** Grille de captures ; un clic ouvre la visionneuse. Rien n'est rendu sans image. */
export function Galerie({ images, titre, libelles }: ProprietesGalerie) {
  const [index, setIndex] = useState<number | null>(null);
  if (images.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="font-display text-h3 font-bold">{titre}</h2>
      <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={image.alt}
              className="group relative block aspect-navigateur w-full overflow-hidden rounded-puce border border-bordure bg-surface-elevee"
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(min-width: 768px) 25vw, 45vw"
                className="object-cover object-top transition-transform duration-300 ease-sortie group-hover:scale-102"
              />
            </button>
            <p className="mt-2 text-sm text-texte-secondaire">{image.alt}</p>
          </li>
        ))}
      </ul>
      {index !== null && <Visionneuse images={images} indexInitial={index} onFermer={() => setIndex(null)} libelles={libelles} />}
    </section>
  );
}
```

- [ ] **Step 3 : Écrire `composants/projets/LiensProjet.tsx` et `ProjetSuivant.tsx`**

`composants/projets/LiensProjet.tsx` :

```tsx
import { ExternalLink } from 'lucide-react';
import { Bouton } from '@/composants/ui/Bouton';
import type { LiensProjet as LiensProjetType } from '@/lib/contenu/types';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';

const ORDRE: (keyof LiensProjetType)[] = ['site', 'live', 'appStore', 'playStore', 'repo'];

/** Boutons vers les liens externes d'un projet, dans un ordre fixe. Seuls les liens renseignés sont rendus. */
export function LiensProjet({ liens, dict }: { liens: LiensProjetType; dict: Dictionnaire }) {
  const presents = ORDRE.filter((cle) => liens[cle]);
  if (presents.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {presents.map((cle, index) => (
        <Bouton key={cle} href={liens[cle] as string} variante={index === 0 ? 'plein' : 'contour'} icone={<ExternalLink className="h-4 w-4" />}>
          {dict.projet.liens[cle]}
        </Bouton>
      ))}
    </div>
  );
}
```

`composants/projets/ProjetSuivant.tsx` :

```tsx
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { MetaProjet } from '@/lib/contenu/types';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';

interface ProprietesProjetSuivant {
  lang: Lang;
  dict: Dictionnaire;
  precedent?: MetaProjet;
  suivant?: MetaProjet;
}

/** Navigation précédent / suivant en bas d'une étude de cas. */
export function ProjetSuivant({ lang, dict, precedent, suivant }: ProprietesProjetSuivant) {
  const classe = 'group flex items-center gap-3 rounded-carte border border-bordure bg-surface p-5 transition-colors duration-150 hover:border-texte-secondaire';
  return (
    <nav aria-label={`${dict.projet.precedent} / ${dict.projet.suivant}`} className="mt-16 grid gap-4 md:grid-cols-2">
      {precedent ? (
        <Link href={lien(lang, 'projet', { slug: precedent.slug })} className={classe}>
          <ArrowLeft className="h-5 w-5 text-accent transition-transform duration-150 group-hover:-translate-x-1" />
          <span>
            <span className="block font-mono text-mono uppercase tracking-widest text-texte-secondaire">{dict.projet.precedent}</span>
            <span className="font-semibold">{precedent.nom}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {suivant && (
        <Link href={lien(lang, 'projet', { slug: suivant.slug })} className={`${classe} justify-end text-right`}>
          <span>
            <span className="block font-mono text-mono uppercase tracking-widest text-texte-secondaire">{dict.projet.suivant}</span>
            <span className="font-semibold">{suivant.nom}</span>
          </span>
          <ArrowRight className="h-5 w-5 text-accent transition-transform duration-150 group-hover:translate-x-1" />
        </Link>
      )}
    </nav>
  );
}
```

- [ ] **Step 4 : Écrire `app/[lang]/projets/[slug]/page.tsx`**

```tsx
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Galerie } from '@/composants/projets/Galerie';
import { LiensProjet } from '@/composants/projets/LiensProjet';
import { ProjetSuivant } from '@/composants/projets/ProjetSuivant';
import { CadreAppareil } from '@/composants/ui/CadreAppareil';
import { Puce } from '@/composants/ui/Puce';
import { corpsProjets } from '@/lib/contenu/corps-projets';
import { LIBELLES_PLATEFORMES } from '@/lib/contenu/plateformes';
import { projetsVoisins, slugsProjets, trouverProjet } from '@/lib/contenu/projets';
import { getDictionnaire } from '@/lib/i18n/dictionnaires';
import { LANGUES } from '@/lib/i18n/locales';
import { langDepuis } from '@/lib/i18n/params';
import { lien } from '@/lib/i18n/routes';
import { genererMetadonnees } from '@/lib/seo';

interface ParametresProjet {
  params: Promise<{ lang: string; slug: string }>;
}

/** Une page statique par projet et par langue. */
export function generateStaticParams() {
  return LANGUES.flatMap((lang) => slugsProjets().map((slug) => ({ lang, slug })));
}

/** Métadonnées de l'étude de cas ; vides si le slug est inconnu (la page rend alors la 404). */
export async function generateMetadata({ params }: ParametresProjet): Promise<Metadata> {
  const { lang: brut, slug } = await params;
  const lang = langDepuis(brut);
  const projet = trouverProjet(slug);
  if (!projet) return {};
  const dict = getDictionnaire(lang);
  return genererMetadonnees({
    lang,
    route: 'projet',
    parametres: { slug },
    titre: `${projet.nom} — ${dict.site.nomCourt}`,
    description: projet.accroche[lang],
  });
}

/** Étude de cas : en-tête, corps MDX, galerie, colonne méta, navigation entre projets. */
export default async function PageProjet({ params }: ParametresProjet) {
  const { lang: brut, slug } = await params;
  const lang = langDepuis(brut);
  const projet = trouverProjet(slug);
  if (!projet) notFound();
  const dict = getDictionnaire(lang);
  const Corps = corpsProjets[projet.slug][lang];
  const voisins = projetsVoisins(projet.slug);
  const meta: { libelle: string; valeur?: string }[] = [
    { libelle: dict.projet.role, valeur: projet.role[lang] },
    { libelle: dict.projet.periode, valeur: projet.periode },
    { libelle: dict.projet.client, valeur: projet.client },
  ];

  return (
    <article className="section-espace">
      <div className="conteneur">
        <Link href={lien(lang, 'projets')} className="inline-flex items-center gap-2 text-sm text-texte-secondaire transition-colors duration-150 hover:text-texte">
          <ArrowLeft className="h-4 w-4" />
          {dict.projet.retour}
        </Link>

        <header className="mt-8 grid items-center gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <p className="font-mono text-mono uppercase tracking-widest text-accent">
              {dict.projet.type[projet.type]} · {projet.categorie[lang]}
            </p>
            <div className="mt-3 flex items-center gap-4">
              <Image src={projet.logo} alt="" width={56} height={56} unoptimized className="h-14 w-14 rounded-carte object-contain" />
              <h1 className="font-display text-display-mobile font-extrabold md:text-display">{projet.nom}</h1>
            </div>
            <p className="mt-4 max-w-2xl text-corps-large text-texte-secondaire">{projet.accroche[lang]}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {projet.plateformes.map((p) => (
                <Puce key={p}>{LIBELLES_PLATEFORMES[p]}</Puce>
              ))}
            </div>
            <div className="mt-8">
              <LiensProjet liens={projet.liens} dict={dict} />
            </div>
          </div>
          <CadreAppareil type={projet.type === 'mobile' ? 'telephone' : 'navigateur'} src={projet.apercu} logo={projet.logo} alt={projet.nom} priorite />
        </header>

        <div className="mt-16 grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <Corps />
            <Galerie
              images={projet.galerie.map((image) => ({ src: image.src, alt: image.legende[lang] }))}
              titre={dict.projet.galerie}
              libelles={dict.projet.visionneuse}
            />
          </div>
          <aside className="h-fit rounded-carte border border-bordure bg-surface p-6 lg:sticky lg:top-24">
            <dl className="space-y-4">
              {meta
                .filter((ligne) => ligne.valeur)
                .map((ligne) => (
                  <div key={ligne.libelle}>
                    <dt className="font-mono text-mono uppercase tracking-widest text-texte-secondaire">{ligne.libelle}</dt>
                    <dd className="mt-1">{ligne.valeur}</dd>
                  </div>
                ))}
              <div>
                <dt className="font-mono text-mono uppercase tracking-widest text-texte-secondaire">{dict.projet.stack}</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {projet.stack.map((t) => (
                    <Puce key={t}>{t}</Puce>
                  ))}
                </dd>
              </div>
            </dl>
            <h2 className="mt-8 font-mono text-mono uppercase tracking-widest text-texte-secondaire">{dict.projet.resultats}</h2>
            <ul className="mt-3 space-y-3">
              {projet.resultats.map((resultat) => (
                <li key={resultat.libelle.fr} className="flex items-baseline gap-3">
                  <span className="font-display text-h3 font-bold text-accent">{resultat.valeur}</span>
                  <span className="text-sm text-texte-secondaire">{resultat.libelle[lang]}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <ProjetSuivant lang={lang} dict={dict} precedent={voisins.precedent} suivant={voisins.suivant} />
      </div>
    </article>
  );
}
```

- [ ] **Step 5 : Écrire `app/[lang]/projets/[slug]/opengraph-image.tsx`**

```tsx
import { ImageResponse } from 'next/og';
import { COULEURS_OG } from '@/lib/couleurs';
import { trouverProjet } from '@/lib/contenu/projets';
import { langDepuis } from '@/lib/i18n/params';

export const alt = 'Étude de cas — Emmanuel Tene';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Image Open Graph d'une étude de cas : nom du projet, accroche, signature. */
export default async function ImageOpenGraphProjet({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: brut, slug } = await params;
  const lang = langDepuis(brut);
  const projet = trouverProjet(slug);
  const nom = projet?.nom ?? 'Portfolio';
  const accroche = projet?.accroche[lang] ?? '';
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: COULEURS_OG.fond,
          color: COULEURS_OG.texte,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 28, color: COULEURS_OG.accent, letterSpacing: 6 }}>CASE STUDY</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 80, fontWeight: 700 }}>{nom}</div>
          <div style={{ fontSize: 30, color: COULEURS_OG.secondaire, lineHeight: 1.3 }}>{accroche}</div>
        </div>
        <div style={{ fontSize: 26, color: COULEURS_OG.secondaire }}>Emmanuel Tene</div>
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Step 6 : Vérifier**

Run : `npm run typecheck && npm run lint && npm run build`
Attendu : `● /[lang]/projets/[slug]` avec 12 chemins générés (6 slugs × 2 langues). Serveur de dev puis :

```bash
curl -s --retry 15 --retry-delay 1 --retry-connrefused -o /dev/null -w '%{http_code}\n' http://localhost:3100/fr/projets/titans
curl -s http://localhost:3100/en/projects/kori | grep -o '<h2[^>]*>Context</h2>'
curl -s http://localhost:3100/en/projects/kori | grep -o 'href="/en/projects/kori-pro"' | head -1
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3100/fr/projets/inconnu
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' http://localhost:3100/fr/projets/titans/opengraph-image
```

Attendu : `200` ; le `<h2>` « Context » (MDX rendu) ; le lien vers le projet précédent ; `404` ; `200 image/png`. Dans le navigateur, sur `/fr/projets/kori` : clic sur une capture ouvre la visionneuse, flèches et Échap fonctionnent. Arrêter le serveur.

- [ ] **Step 7 : Commit**

```bash
git add composants/projets app/\[lang\]/projets
git commit -m "feat(projets): étude de cas avec galerie, visionneuse et image Open Graph

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 12 : À propos — intro, chronologie, formations, méthode, CV

**Files:**
- Create : `composants/a-propos/CarteExperience.tsx`, `composants/a-propos/Chronologie.tsx`, `composants/a-propos/CarteFormation.tsx`, `composants/a-propos/Methode.tsx`, `app/[lang]/a-propos/page.tsx`

**Interfaces:**
- Consumes : `experiences`, `formations`, `profil`, `formaterPeriode`, kit UI.
- Produces : `Chronologie({ lang, dict, experiences })`, `CarteExperience({ lang, dict, experience })`, `CarteFormation({ lang, formation })`, `Methode({ dict })`.

- [ ] **Step 1 : Écrire `CarteExperience.tsx` et `Chronologie.tsx`**

`composants/a-propos/CarteExperience.tsx` :

```tsx
import { Badge } from '@/composants/ui/Badge';
import { Puce } from '@/composants/ui/Puce';
import type { Experience } from '@/lib/contenu/types';
import { formaterPeriode } from '@/lib/dates';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';

interface ProprietesCarteExperience {
  lang: Lang;
  dict: Dictionnaire;
  experience: Experience;
}

/** Une expérience : période, poste, employeur, lieu, contrat, responsabilités et stack. */
export function CarteExperience({ lang, dict, experience }: ProprietesCarteExperience) {
  return (
    <article className="grid gap-4 md:grid-cols-[14rem_1fr] md:gap-8">
      <div>
        <p className="font-mono text-mono text-texte-secondaire">
          {formaterPeriode(experience.debut, experience.fin, lang, dict.parcours.aujourdhui)}
        </p>
        <div className="mt-2">
          <Badge>{dict.parcours.contrat[experience.typeContrat]}</Badge>
        </div>
      </div>
      <div>
        <h3 className="font-display text-h3 font-bold">{experience.poste[lang]}</h3>
        <p className="text-texte-secondaire">
          {experience.employeur[lang]} · {experience.lieu[lang]}
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-texte-secondaire">
          {experience.points[lang].map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {experience.stack.map((t) => (
            <Puce key={t}>{t}</Puce>
          ))}
        </div>
      </div>
    </article>
  );
}
```

`composants/a-propos/Chronologie.tsx` :

```tsx
import { RevelationAuDefilement } from '@/composants/ui/RevelationAuDefilement';
import type { Experience } from '@/lib/contenu/types';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { CarteExperience } from './CarteExperience';

interface ProprietesChronologie {
  lang: Lang;
  dict: Dictionnaire;
  experiences: Experience[];
}

/** Liste des expériences séparées par un trait, révélées en cascade. */
export function Chronologie({ lang, dict, experiences }: ProprietesChronologie) {
  return (
    <div className="divide-y divide-bordure">
      {experiences.map((experience, index) => (
        <RevelationAuDefilement key={experience.id} delai={index * 80} className="py-8 first:pt-0">
          <CarteExperience lang={lang} dict={dict} experience={experience} />
        </RevelationAuDefilement>
      ))}
    </div>
  );
}
```

- [ ] **Step 2 : Écrire `CarteFormation.tsx` et `Methode.tsx`**

`composants/a-propos/CarteFormation.tsx` :

```tsx
import type { Formation } from '@/lib/contenu/types';
import { formaterMois } from '@/lib/dates';
import type { Lang } from '@/lib/i18n/locales';

/** Une formation : période, diplôme, domaine, établissement, lieu. */
export function CarteFormation({ lang, formation }: { lang: Lang; formation: Formation }) {
  return (
    <article className="rounded-carte border border-bordure bg-surface p-5">
      <p className="font-mono text-mono text-texte-secondaire">
        {formaterMois(formation.debut, lang)} – {formaterMois(formation.fin, lang)}
      </p>
      <h3 className="mt-2 font-semibold">
        {formation.diplome[lang]} · {formation.domaine[lang]}
      </h3>
      <p className="mt-1 text-sm text-texte-secondaire">
        {formation.etablissement} · {formation.lieu[lang]}
      </p>
    </article>
  );
}
```

`composants/a-propos/Methode.tsx` :

```tsx
import { Check } from 'lucide-react';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';

/** Quatre principes de travail (tests, architecture, CI, revue), pour les recruteurs. */
export function Methode({ dict }: { dict: Dictionnaire }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {dict.aPropos.methode.points.map((point) => (
        <li key={point} className="flex items-start gap-3 rounded-carte border border-bordure bg-surface p-4">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 3 : Écrire `app/[lang]/a-propos/page.tsx`**

```tsx
import { Download } from 'lucide-react';
import type { Metadata } from 'next';
import { CarteFormation } from '@/composants/a-propos/CarteFormation';
import { Chronologie } from '@/composants/a-propos/Chronologie';
import { Methode } from '@/composants/a-propos/Methode';
import { Bouton } from '@/composants/ui/Bouton';
import { Section } from '@/composants/ui/Section';
import { TitreSection } from '@/composants/ui/TitreSection';
import { experiences } from '@/content/experiences';
import { formations } from '@/content/formations';
import { profil } from '@/content/profil';
import { getDictionnaire } from '@/lib/i18n/dictionnaires';
import { langDepuis, type ParametresLang } from '@/lib/i18n/params';
import { genererMetadonnees } from '@/lib/seo';

/** Métadonnées de la page À propos. */
export async function generateMetadata({ params }: ParametresLang): Promise<Metadata> {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  return genererMetadonnees({
    lang,
    route: 'aPropos',
    titre: `${dict.aPropos.titre} — ${dict.site.nomCourt}`,
    description: dict.aPropos.intro[0],
  });
}

/** À propos : intro, expériences, formations, méthode, CV. */
export default async function PageAPropos({ params }: ParametresLang) {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  return (
    <>
      <Section bordure>
        <div className="max-w-3xl">
          <TitreSection surtitre={dict.aPropos.titre} titre={profil.nomComplet} />
          <p className="mt-2 text-texte-secondaire">
            {profil.role[lang]} · {profil.ville[lang]}
          </p>
          <div className="mt-6 space-y-4 text-corps-large text-texte-secondaire">
            {dict.aPropos.intro.map((paragraphe) => (
              <p key={paragraphe}>{paragraphe}</p>
            ))}
          </div>
          <div className="mt-8">
            <Bouton href={profil.cv[lang]} telecharger icone={<Download className="h-4 w-4" />}>
              {dict.aPropos.cv}
            </Bouton>
          </div>
        </div>
      </Section>
      <Section id="experience" bordure>
        <TitreSection surtitre={dict.parcours.surtitre} titre={dict.aPropos.experience} />
        <div className="mt-10">
          <Chronologie lang={lang} dict={dict} experiences={experiences} />
        </div>
      </Section>
      <Section id="formation" bordure>
        <TitreSection surtitre={dict.aPropos.formation} titre={dict.aPropos.formation} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {formations.map((formation) => (
            <CarteFormation key={formation.id} lang={lang} formation={formation} />
          ))}
        </div>
      </Section>
      <Section id="methode">
        <TitreSection surtitre={dict.aPropos.methode.titre} titre={dict.aPropos.methode.titre} />
        <div className="mt-10">
          <Methode dict={dict} />
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 4 : Vérifier**

Run : `npm run typecheck && npm run lint && npm run build`
Attendu : `● /[lang]/a-propos`. Serveur de dev puis :

```bash
curl -s --retry 15 --retry-delay 1 --retry-connrefused http://localhost:3100/en/about | grep -o 'April 2026 – present'
curl -s http://localhost:3100/fr/a-propos | grep -o 'avril 2026 – aujourd’hui'
curl -s http://localhost:3100/fr/a-propos | grep -c 'Spreeloop'
```

Attendu : les deux périodes ; au moins `1`. Arrêter le serveur.

- [ ] **Step 5 : Commit**

```bash
git add composants/a-propos app/\[lang\]/a-propos
git commit -m "feat(a-propos): intro, chronologie, formations, méthode et CV

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 13 : Sitemap, robots, CI GitHub Actions, README

**Files:**
- Create : `app/sitemap.ts`, `app/robots.ts`, `.github/workflows/ci.yml`
- Modify : `README.md` (réécriture complète)
- Test : `tests/sitemap.test.ts`

**Interfaces:**
- Consumes : `lien`, `LANGUES`, `slugsProjets`, `coordonnees`.

- [ ] **Step 1 : Test du sitemap (échoue)**

`tests/sitemap.test.ts` :

```ts
import { describe, expect, it } from 'vitest';
import sitemap from '@/app/sitemap';

describe('sitemap', () => {
  it('liste chaque route dans les deux langues avec ses alternates', () => {
    process.env.NEXT_PUBLIC_URL_SITE = 'https://exemple.com';
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
```

Run : `npx vitest run tests/sitemap.test.ts` → attendu FAIL (module absent).

- [ ] **Step 2 : Écrire `app/sitemap.ts` et `app/robots.ts`**

`app/sitemap.ts` :

```ts
import type { MetadataRoute } from 'next';
import { coordonnees } from '@/lib/contact';
import { slugsProjets } from '@/lib/contenu/projets';
import { LANGUES } from '@/lib/i18n/locales';
import { lien, type ParametresRoute, type Route } from '@/lib/i18n/routes';

/** Sitemap : chaque route dans chaque langue, avec ses alternates hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  const { urlSite } = coordonnees();
  const maintenant = new Date();
  const routes: { route: Route; parametres?: ParametresRoute }[] = [
    { route: 'accueil' },
    { route: 'projets' },
    { route: 'aPropos' },
    ...slugsProjets().map((slug) => ({ route: 'projet' as const, parametres: { slug } })),
  ];
  return routes.flatMap(({ route, parametres }) =>
    LANGUES.map((lang) => ({
      url: `${urlSite}${lien(lang, route, parametres)}`,
      lastModified: maintenant,
      alternates: {
        languages: Object.fromEntries(LANGUES.map((l) => [l, `${urlSite}${lien(l, route, parametres)}`])),
      },
    })),
  );
}
```

`app/robots.ts` :

```ts
import type { MetadataRoute } from 'next';
import { coordonnees } from '@/lib/contact';

/** Tout est indexable ; pointe vers le sitemap. */
export default function robots(): MetadataRoute.Robots {
  const { urlSite } = coordonnees();
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${urlSite}/sitemap.xml`,
  };
}
```

Run : `npx vitest run tests/sitemap.test.ts` → attendu PASS.

- [ ] **Step 3 : Écrire `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [refonte/v2]

jobs:
  verifier:
    runs-on: ubuntu-latest
    env:
      NEXT_PUBLIC_URL_SITE: https://exemple.vercel.app
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npm run build
```

- [ ] **Step 4 : Réécrire `README.md`**

````markdown
# Portfolio — Emmanuel Tene

Portfolio bilingue (français / anglais) d'un développeur mobile et web. Next.js 15, React 19, Tailwind 4, contenu typé en TypeScript et études de cas en MDX. Déployé sur Vercel.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis remplir
npm run dev                  # http://localhost:3000 → redirige vers /fr ou /en
```

## Commandes

| Commande            | Rôle                                   |
|---------------------|----------------------------------------|
| `npm run dev`       | Serveur de développement               |
| `npm run build`     | Build de production                    |
| `npm run start`     | Sert le build                          |
| `npm run lint`      | ESLint (règles Next.js)                |
| `npm run typecheck` | `tsc --noEmit`                         |
| `npm test`          | Tests Vitest (`tests/`)                |

La CI GitHub Actions enchaîne lint, typecheck, tests et build sur chaque PR.

## Variables d'environnement

Toutes publiques (`NEXT_PUBLIC_*`), lues dans `lib/contact.ts`. Voir `.env.example`.

| Variable                 | Usage                                          |
|--------------------------|------------------------------------------------|
| `NEXT_PUBLIC_URL_SITE`   | Origine du site (canoniques, sitemap, OG)      |
| `NEXT_PUBLIC_EMAIL`      | Bouton email                                   |
| `NEXT_PUBLIC_TELEPHONE`  | Affichage éventuel du téléphone                |
| `NEXT_PUBLIC_WHATSAPP`   | Numéro WhatsApp (chiffres seuls, indicatif)    |
| `NEXT_PUBLIC_LINKEDIN`   | Lien LinkedIn                                  |

Un lien dont la variable est vide n'est pas affiché.

## Structure

```
app/[lang]/            pages (accueil, projets, projets/[slug], a-propos, 404)
app/globals.css        tokens du système visuel (@theme Tailwind 4)
composants/            ui/, navigation/, accueil/, projets/, a-propos/
content/               profil, expériences, formations, stack, projets/<slug>/{meta.ts, fr.mdx, en.mdx}
dictionnaires/         fr.json (référence), en.json (typé contre fr)
lib/i18n/              langues, routes localisées, middleware (décision pure), dictionnaires
lib/contenu/           types, chargeur de projets, corps MDX
middleware.ts          détection de langue et réécriture des slugs localisés
tests/                 Vitest (logique pure uniquement)
public/                images des projets, portrait, CV (public/cv/cv-fr.pdf, cv-en.pdf)
```

## Ajouter un projet

1. Créer `content/projets/<slug>/meta.ts` (type `MetaProjet`), `fr.mdx` et `en.mdx` (sections Contexte / Problème / Solution / Résultats).
2. L'ajouter à `content/projets/index.ts` et à `lib/contenu/corps-projets.ts`.
3. Déposer les images sous `public/projects/<slug>/`.
4. `npm test` vérifie l'ordre, les images et les MDX.

## URLs

| Route       | fr                    | en                     |
|-------------|-----------------------|------------------------|
| Accueil     | `/fr`                 | `/en`                  |
| Projets     | `/fr/projets`         | `/en/projects`         |
| Projet      | `/fr/projets/<slug>`  | `/en/projects/<slug>`  |
| À propos    | `/fr/a-propos`        | `/en/about`            |

`/` redirige selon `Accept-Language` ; le cookie `langue` mémorise le choix du sélecteur.

## Déploiement

Vercel, projet lié au repo GitHub. Renseigner les variables d'environnement ci-dessus dans le projet Vercel. Aucune commande de déploiement manuelle.
````

- [ ] **Step 5 : Vérifier**

Run : `npm test && npm run typecheck && npm run lint && npm run build`
Attendu : tout PASS ; routes `○ /sitemap.xml` et `○ /robots.txt`. Serveur de dev puis :

```bash
curl -s --retry 15 --retry-delay 1 --retry-connrefused http://localhost:3100/sitemap.xml | grep -o '<loc>[^<]*</loc>' | wc -l
curl -s http://localhost:3100/robots.txt
```

Attendu : `18` ; `User-Agent: *`, `Allow: /`, `Sitemap: …/sitemap.xml`. Arrêter le serveur.

- [ ] **Step 6 : Commit**

```bash
git add app/sitemap.ts app/robots.ts .github/workflows/ci.yml README.md tests/sitemap.test.ts
git commit -m "feat(seo): sitemap, robots, CI GitHub Actions et README

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 14 : Vérification finale de bout en bout

**Files:** aucun nouveau. Corrections éventuelles uniquement.

- [ ] **Step 1 : Vérification complète**

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

Attendu : lint et typecheck silencieux ; Vitest : 9 fichiers, tous PASS ; build sans erreur ni avertissement `Image with src … has either width or height modified`.

- [ ] **Step 2 : Parcours HTTP complet en dev**

Serveur de dev en arrière-plan sur le port 3100, puis :

```bash
for chemin in /fr /en /fr/projets /en/projects /fr/projets/titans /en/projects/kori /fr/a-propos /en/about /sitemap.xml /robots.txt /fr/opengraph-image /fr/projets/kori/opengraph-image; do
  printf '%-40s %s\n' "$chemin" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3100$chemin")"
done
for chemin in / /en/projets /fr/about /projects; do
  printf '%-40s %s\n' "$chemin" "$(curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}' "http://localhost:3100$chemin")"
done
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3100/fr/nulle-part
```

Attendu : douze `200` ; quatre `308` vers `/fr`, `/en/projects`, `/fr/a-propos`, `/fr/projects` ; puis `404`.

- [ ] **Step 3 : Vérification visuelle dans le navigateur (mobile et desktop)**

Ouvrir `http://localhost:3100/fr` puis basculer en EN via le sélecteur (la page reste la même, cookie posé). Contrôler sur chaque page, en largeur 375 px et 1280 px :

- aucune barre de défilement horizontale ;
- hero : portrait teinté, badge, deux CTA visibles sans chevauchement ;
- projet phare : mockup téléphone avec logo Titans centré ;
- cartes projets : aperçu, puces, flèche animée au survol ;
- mur de stack : logos lisibles sur tuile claire ;
- étude de cas : MDX stylé, colonne méta collante en desktop, visionneuse (clic, flèches, Échap, balayage tactile via l'émulation mobile) ;
- à propos : périodes formatées dans la langue, trois expériences, trois formations ;
- focus clavier visible (Tab) en accent sur les liens et boutons ;
- avec « Réduire les animations » activé dans l'OS : le contenu apparaît sans transition.

Corriger toute anomalie dans le composant concerné, relancer l'étape 1, puis commit `fix(...)`.

- [ ] **Step 4 : Commit final et arrêt**

```bash
git status --short
git log --oneline refonte/v2 ^main | cat
```

Attendu : arbre propre, ~14 commits au-dessus de `main`. **S'arrêter ici.** Ne pas pousser, ne pas ouvrir de PR : rapporter au propriétaire et proposer « Prêt à pousser `refonte/v2` et ouvrir une PR vers `main` — dis go ». Rappeler les éléments qu'il doit fournir : captures Titans, CV PDF FR/EN sous `public/cv/`, portrait HD, `.env.local`, nombre d'utilisateurs Titans.
