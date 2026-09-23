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
