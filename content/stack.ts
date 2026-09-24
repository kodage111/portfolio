import type { GroupeStack, Technologie } from '@/lib/contenu/types';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

/** URL d'une icône devicon. [variante] : `original` par défaut, `plain`, `plain-wordmark`… */
function devicon(dossier: string, variante = 'original'): string {
  return `${DEVICON}/${dossier}/${dossier}-${variante}.svg`;
}

/** Groupes du mur de stack, dans l'ordre d'affichage. */
export const GROUPES_STACK: GroupeStack[] = ['langages', 'mobileWeb', 'backend', 'donnees', 'cloud', 'outils'];

/** Technologies affichées, sans niveau ni pourcentage. Une technologie sans `icone` s'affiche avec son initiale. */
export const technologies: Technologie[] = [
  { nom: 'Dart', icone: devicon('dart'), groupe: 'langages' },
  { nom: 'Java', icone: devicon('java'), groupe: 'langages' },
  { nom: 'Kotlin', icone: devicon('kotlin'), groupe: 'langages' },
  { nom: 'JavaScript', icone: devicon('javascript'), groupe: 'langages' },
  { nom: 'TypeScript', icone: devicon('typescript'), groupe: 'langages' },
  { nom: 'Python', icone: devicon('python'), groupe: 'langages' },
  { nom: 'C#', icone: devicon('csharp'), groupe: 'langages' },
  { nom: 'C++', icone: devicon('cplusplus'), groupe: 'langages' },
  { nom: 'C', icone: devicon('c'), groupe: 'langages' },
  { nom: 'Android', icone: devicon('android'), groupe: 'mobileWeb' },
  { nom: 'Flutter', icone: devicon('flutter'), groupe: 'mobileWeb' },
  { nom: 'React', icone: devicon('react'), groupe: 'mobileWeb' },
  { nom: 'Next.js', icone: devicon('nextjs'), groupe: 'mobileWeb' },
  { nom: 'Node.js', icone: devicon('nodejs'), groupe: 'backend' },
  { nom: 'Express.js', icone: devicon('express'), groupe: 'backend' },
  { nom: 'NestJS', icone: devicon('nestjs'), groupe: 'backend' },
  { nom: 'Spring', icone: devicon('spring'), groupe: 'backend' },
  { nom: 'PostgreSQL', icone: devicon('postgresql'), groupe: 'donnees' },
  { nom: 'MongoDB', icone: devicon('mongodb'), groupe: 'donnees' },
  { nom: 'MySQL', icone: devicon('mysql'), groupe: 'donnees' },
  { nom: 'SQLite', icone: devicon('sqlite'), groupe: 'donnees' },
  { nom: 'Amazon AWS', icone: devicon('amazonwebservices', 'plain-wordmark'), groupe: 'cloud' },
  { nom: 'Google Cloud', icone: devicon('googlecloud'), groupe: 'cloud' },
  { nom: 'Firebase', icone: devicon('firebase', 'plain'), groupe: 'cloud' },
  { nom: 'Pulumi', icone: devicon('pulumi'), groupe: 'cloud' },
  { nom: 'Serverless', groupe: 'cloud' },
  { nom: 'Git', icone: devicon('git'), groupe: 'outils' },
  { nom: 'Arduino', icone: devicon('arduino'), groupe: 'outils' },
  { nom: 'Postman', icone: devicon('postman'), groupe: 'outils' },
];

/** Technologies d'un groupe, dans l'ordre de déclaration. */
export function technologiesParGroupe(groupe: GroupeStack): Technologie[] {
  return technologies.filter((technologie) => technologie.groupe === groupe);
}
