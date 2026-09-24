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
