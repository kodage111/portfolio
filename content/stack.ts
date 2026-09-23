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
