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
export type GroupeStack = 'langages' | 'mobileWeb' | 'backend' | 'donnees' | 'cloud' | 'outils';

/** Une technologie du mur de stack. `icone` est une URL devicon ; absente, l’initiale du nom est affichée. */
export interface Technologie {
  nom: string;
  icone?: string;
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
  /** Portrait détouré (PNG transparent) pour le hero ; n’importe quelles proportions, cadré par le bas. */
  portraitDetoure: string;
  /** Adresse postale utilisée par les données structurées JSON-LD. */
  adresse: { localite: string; pays: string };
  /** Employeur actuel, utilisé par les données structurées JSON-LD. */
  employeur: { nom: string; url: string };
}
