# Refonte du portfolio — design

Date : 2026-09-23
Statut : validé avec le propriétaire, en attente du plan d'implémentation
Repo : `kodage111/portfolio`, branche `refonte/v2`

## 1. Contexte et objectif

Le site actuel (React 18 + Vite 4 + Tailwind 3, anglais seul) présente un
développeur mobile / web. Audit : layouts dupliqués par breakpoint
(`custom-hero-sm` / `custom-hero-md`, `DesktopLayout` / `MobileLayout`),
prop-drilling lourd sur `About`, barres de compétences en pourcentage
auto-pénalisantes, textes génériques avec typos, balises `<text>` invalides,
aucune métadonnée SEO, pas de 404, images non optimisées, dépendances
anciennes, expérience professionnelle périmée.

Décision : **refonte complète**. Nouvelle identité visuelle, nouvelle
structure, stack à jour, contenu réécrit. On conserve les assets
(`public/projects/**`, `public/logos/**`).

Double audience :

- **Clients freelance** (PME, porteurs de projet — Cameroun, Côte d'Ivoire,
  diaspora) : CTA « Vous avez un projet », WhatsApp, études de cas.
- **Recruteurs / CTOs** (local + remote international) : CTA « Vous
  recrutez », CV téléchargeable, LinkedIn, accent sur rigueur (tests,
  architecture, CI).

## 2. Décisions cadrées

| Sujet | Décision |
|---|---|
| Ampleur | Refonte complète |
| Langue | Bilingue FR / EN, URLs `/fr` et `/en` |
| Stack | Next.js 15 (App Router) + Tailwind 4 + TypeScript |
| Direction visuelle | Sombre + accent vif unique, évolution du vert actuel |
| Déploiement | Vercel |
| Contact | Liens directs (email, WhatsApp, LinkedIn, GitHub) + CV PDF ; pas de formulaire |
| Projets | Titans en projet phare, puis Korí Pro, Korí, Vegetable Market, GEC S.A.R.L, Assurance Contract Handler |
| Repo | Même repo, branche `refonte/v2`, racine remplacée ; `main` garde l'ancien site jusqu'au merge |
| Nommage | Identifiants et documentation en français (sauf API framework et clés de données existantes) |

Hors périmètre : formulaire de contact, CMS, blog, mode clair, analytics.

## 3. Routes et i18n

- Segment `app/[lang]/` avec `lang ∈ {fr, en}`. Locale par défaut : `fr`.
- `middleware.ts` :
  - `/` → `/fr` ou `/en` selon `Accept-Language`, un cookie mémorise le
    choix explicite fait via le sélecteur de langue ;
  - réécrit les slugs localisés vers les segments internes (voir table) ;
  - langue inconnue → redirection vers `fr`.
- Table unique `lib/i18n/routes.ts` :

  | Route interne | fr | en |
  |---|---|---|
  | `accueil` | `/fr` | `/en` |
  | `projets` | `/fr/projets` | `/en/projects` |
  | `projet` | `/fr/projets/[slug]` | `/en/projects/[slug]` |
  | `aPropos` | `/fr/a-propos` | `/en/about` |

  Utilisée par le middleware (rewrite) et par un helper `lien(lang, route,
  params?)` pour générer tous les liens internes. Les slugs de projet sont
  identiques dans les deux langues.
- Dictionnaires `dictionnaires/fr.json` et `dictionnaires/en.json`. Le type
  `Dictionnaire` est dérivé de `fr.json` (`typeof fr`) ; `en.json` est typé
  contre lui → clé manquante = erreur TypeScript. `getDictionnaire(lang)`
  côté serveur, injecté aux composants par props. Aucune bibliothèque i18n.
- Pas de page contact : section contact sur l'accueil + liens dans le pied
  de page.
- `not-found.tsx` localisé sous `[lang]`.

## 4. Contenu = données typées, zéro CMS

Dossier `content/` :

- `profil.ts` : nom court, nom long, rôle (FR / EN), ville, disponibilité,
  liens sociaux (LinkedIn, GitHub), chemins des CV (`/cv/cv-fr.pdf`,
  `/cv/cv-en.pdf`).
- Email, téléphone, numéro WhatsApp : variables d'environnement
  `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_TELEPHONE`, `NEXT_PUBLIC_WHATSAPP`
  (repo public → pas de coordonnées dans le code). `.env.example` fourni.
- `experiences.ts` — trois postes, dans cet ordre :

  | Période | Poste | Employeur | Lieu | Type |
  |---|---|---|---|---|
  | 04/2026 – aujourd'hui | Software Engineer | Titans Côte d'Ivoire (Titans Groupe) | Douala, remote | Temps partiel |
  | 03/2024 – 04/2026 | Développeur Flutter freelance | Indépendant | Douala, remote | Freelance |
  | 03/2023 – 03/2024 | Associate Software Developer | Spreeloop | Cameroun | Temps plein |

  Appskill Consulting (2021–2022) est retiré.

  Points Titans (à traduire FR / EN, orientés impact) :
  - lancement cross-platform : architecture et déploiement de l'application
    phare de Titans Groupe (POS caisse & stock pour maquis, restaurants et
    dépôts — domaine à confirmer) sur mobile (Flutter) et web (Next.js),
    pour N utilisateurs (chiffre à fournir) ;
  - intégration continue de nouvelles fonctionnalités, réduction de la
    dette technique, stabilité et rétention pilotées par les retours
    clients ;
  - réunions techniques hebdomadaires : propositions d'architecture,
    lien produit ↔ exécution technique, mentorat ;
  - back-office administratif : React côté client, Node.js, Firebase et
    Google Cloud Platform côté serveur.

  Points Freelance : apps Flutter avec backends Node.js et Java Spring
  Boot ; tests complets ; travail avec des équipes transverses ;
  intégration front / back.

  Points Spreeloop : repris de l'ancien site (maintenance, nouvelles
  solutions back → front, prototypage React, tests unitaires / widget /
  intégration Flutter et TS, revue de code, documentation).
- `formations.ts` — trois diplômes de l'ancien site (Licence 2020–2022 et
  DUT 2017–2020 à l'IUT Fotso Victor, GCE A-Level 2014–2016 à Saint Paul's
  Comprehensive College). Corriger « technolog » → « Technology ».
- `stack.ts` — technologies groupées **sans pourcentage** : Langages
  (Dart, TypeScript, JavaScript, Kotlin, Java, HTML, CSS), Frameworks
  (Flutter, React, Next.js, NestJS, Express, Spring Boot, Tailwind CSS),
  Données (PostgreSQL, MySQL, MongoDB, SQLite, DynamoDB, Prisma), Cloud &
  outils (Firebase, GCP, AWS, Node.js, Docker, Pulumi, Git, Figma). Icônes
  reprises de l'ancien `app_constants.ts`.
- `projets/<slug>/meta.ts` + `fr.mdx` + `en.mdx`. Type `MetaProjet` :
  `slug`, `nom`, `accroche` (FR / EN), `categorie`, `type`
  (`mobile | web`), `plateformes` (`ios | android | web`), `stack[]`,
  `periode`, `role` (FR / EN), `client`, `liens` (`repo?`, `live?`,
  `appStore?`, `playStore?`), `apercu` (image), `galerie[]` (image +
  légende FR / EN), `resultats[]` (trois métriques : valeur + libellé
  FR / EN), `phare: boolean`, `ordre`.
  Le corps MDX suit Contexte → Problème → Solution → Résultats. Chargé via
  `@next/mdx` et import dynamique dans `generateStaticParams`.
- Slugs : `titans`, `kori-pro`, `kori`, `vegetable-market`, `gec-sarl`,
  `assurance-contract-handler`. Titans est `phare: true` et présenté comme
  produit de Titans Groupe (employeur), rôle « Software Engineer — mobile,
  web, back-office ». Liens : site officiel, POS web, App Store.

## 5. Pages

### Accueil `/[lang]`

1. **Hero** — nom, positionnement en une ligne (« Software Engineer chez
   Titans · Développeur Flutter & Next.js · Douala, remote »), badge
   « Disponible en freelance », deux CTA : « Vous avez un projet »
   (WhatsApp + email) et « Vous recrutez » (CV + LinkedIn). Portrait
   en couleurs naturelles, liseré accent décalé (duotone abandonné le 2026-09-24).
2. **Projet phare** (Titans) — mockups téléphone + navigateur, trois
   métriques, lien vers l'étude de cas.
3. **Projets sélectionnés** — trois cartes + lien « Tous les projets ».
4. **Expertises** — trois cartes : App mobile Flutter (iOS / Android),
   App web Next.js, Backend Firebase / Node. Livrables concrets par carte.
5. **Mur de stack** — logos groupés par famille, sans pourcentage.
6. **Parcours résumé** — trois jalons (Titans, Freelance, Spreeloop) +
   lien À propos.
7. **Contact** — email, WhatsApp, LinkedIn, GitHub, « Télécharger le CV »
   (PDF de la langue courante, lien vers l'autre).

Pied de page : © année dynamique, sélecteur de langue, liens sociaux.

### Projets `/[lang]/projets`

Filtre Tous / Mobile / Web (client, état dans l'URL `?type=`). Grille de
`CarteProjet` : aperçu dans un `CadreAppareil`, badges plateformes, trois
puces de stack, accroche.

### Étude de cas `/[lang]/projets/[slug]`

En-tête (logo, nom, accroche, badges plateformes, liens), colonne méta
(rôle, période, client, stack complète, résultats), corps MDX, galerie
avec visionneuse plein écran (clavier, swipe, fermeture Échap), navigation
projet précédent / suivant. Slug inconnu → `notFound()`.

### À propos `/[lang]/a-propos`

Intro réécrite (trois paragraphes courts, pas de « passionate »),
chronologie des trois postes avec responsabilités et stack, formations,
section « Méthode » pour les recruteurs (tests, architecture, CI, revue de
code), bouton CV.

## 6. Système visuel

Tailwind 4, tokens déclarés dans `@theme` de `app/globals.css`. Aucune
valeur inline hors tokens.

- Couleurs : fond `#0A0A0B`, surface `#141416`, surface élevée `#1C1C1F`,
  bordure `#26262B`, texte `#F2F2F0`, texte secondaire `#A1A1A6`, accent
  `#B6F400` (vert acide), accent sombre `#7FAA00` pour les états.
- Typographie via `next/font/google` : **Syne** (titres, 600–800),
  **Inter** (corps), **JetBrains Mono** (dates, métriques, labels).
  Échelle : display 56 / 40, h2 32, h3 24, corps 16 / 18, petit 14, mono 13.
- Espacements : sections 96 px desktop / 64 px mobile ; conteneur 1200 px,
  gouttière 16 px mobile / 24 px desktop.
- Rayons : 8 px (puces, boutons), 16 px (cartes), 24 px (mockups).
- Plus de glassmorphism : bordures fines 1 px, contraste franc, ombres
  absentes sauf sur la visionneuse.
- `CadreAppareil` : cadres téléphone et navigateur en CSS pur autour de
  `next/image` (`sizes` renseigné, `priority` sur le hero).
- Motion : `RevelationAuDefilement` (IntersectionObserver + transitions CSS
  200–300 ms, `ease-out`), hover 150 ms. `prefers-reduced-motion` → aucune
  animation.
- Accessibilité : contraste AA sur tous les textes, focus visible accent,
  `alt` sur chaque image, navigation clavier complète, `lang` sur `<html>`.

## 7. Composants

Tout est Server Component sauf mention « client ».

- `composants/ui/` : `Bouton` (variantes plein / contour / lien),
  `Badge`, `Puce`, `TitreSection` (surtitre mono + titre), `CadreAppareil`,
  `RevelationAuDefilement` (client).
- `composants/navigation/` : `EnTete` (logo, liens, `SelecteurLangue`
  client), `PiedDePage`.
- `composants/accueil/` : `Hero`, `ProjetPhare`, `GrilleProjets`,
  `Expertises`, `MurStack`, `ParcoursResume`, `Contact`.
- `composants/projets/` : `CarteProjet`, `FiltreProjets` (client),
  `Galerie`, `Visionneuse` (client), `ProjetSuivant`.
- `composants/a-propos/` : `Chronologie`, `CarteExperience`,
  `CarteFormation`, `Methode`.
- `lib/i18n/` : `locales.ts`, `routes.ts`, `dictionnaires.ts`.
- `lib/contenu/` : `projets.ts` (`chargerProjets(lang)`,
  `chargerProjet(lang, slug)`), `types.ts`.

Chaque composant : une responsabilité, props typées, doc `/** */` en
français. Pas de `Record<string, any>` entre composants.

## 8. SEO et erreurs

- `generateMetadata` par page et par langue : titre, description,
  `alternates.languages` (hreflang fr / en / x-default), Open Graph.
- `opengraph-image.tsx` dynamique par projet (nom + accroche + accent),
  image statique pour les autres pages.
- `sitemap.ts` (toutes les routes × deux langues), `robots.ts`.
- JSON-LD `Person` sur l'accueil.
- Erreurs : slug inconnu → 404 localisée ; langue inconnue → `fr` ; clé de
  dictionnaire manquante → erreur de type ; image manquante → échec de
  build (imports statiques).

## 9. Tests et CI

- Vitest :
  - `routes.ts` : `lien()` produit les bonnes URL dans les deux langues,
    rewrite inverse ;
  - middleware : détection `Accept-Language`, cookie prioritaire, langue
    inconnue → `fr` ;
  - dictionnaires : `fr.json` et `en.json` ont exactement les mêmes clés,
    aucune valeur vide ;
  - `chargerProjets` : ordre, projet phare unique, chaque projet a ses deux
    MDX et ses images existantes.
- GitHub Actions sur PR : `npm run lint`, `tsc --noEmit`, `vitest run`,
  `next build`. Vercel fournit les previews.

## 10. Migration du repo

Sur `refonte/v2` :

1. Supprimer `src/`, `index.html`, `vite.config.ts`, `postcss.config.js`,
   `tailwind.config.js`, `tsconfig.node.json`, `public/image.png`,
   `public/icons/`.
2. Scaffolder Next.js 15 à la racine (`app/`, `composants/`, `content/`,
   `lib/`, `dictionnaires/`), Tailwind 4, ESLint, Vitest.
3. Conserver `public/projects/**` et `public/logos/**` ; ajouter
   `public/cv/`, `public/portrait/`.
4. Réécrire `README.md` (stack, variables d'env, commandes, déploiement
   Vercel).
5. `.gitignore` : ajouter `.next/`, `.vercel/`.

Aucun push ni PR sans autorisation explicite.

## 11. À fournir par le propriétaire (phase contenu)

- Captures Titans : mobile (Flutter) et POS web (Next.js), logo.
- Trois chiffres Titans (utilisateurs, établissements, commandes…) et
  confirmation du domaine.
- CV PDF FR et EN.
- Portrait en haute résolution (actuel : 520 px).
- Textes FR / EN des études de cas : je rédige un premier jet à partir
  des descriptions existantes, à relire.
