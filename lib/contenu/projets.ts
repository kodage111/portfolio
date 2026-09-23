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
