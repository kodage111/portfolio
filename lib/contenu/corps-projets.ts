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
