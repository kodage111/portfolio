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
    typeContrat: 'tempsPlein',
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
