import type { MetaProjet } from '@/lib/contenu/types';
import { assuranceContractHandler } from './assurance-contract-handler/meta';
import { gecSarl } from './gec-sarl/meta';
import { kori } from './kori/meta';
import { koriPro } from './kori-pro/meta';
import { titans } from './titans/meta';
import { vegetableMarket } from './vegetable-market/meta';

/** Tous les projets. L'ordre d'affichage vient de `ordre`, pas de cette liste. */
export const projets: MetaProjet[] = [titans, koriPro, kori, vegetableMarket, gecSarl, assuranceContractHandler];
