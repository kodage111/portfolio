import { ExternalLink } from 'lucide-react';
import { Bouton } from '@/composants/ui/Bouton';
import type { LiensProjet as LiensProjetType } from '@/lib/contenu/types';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';

const ORDRE: (keyof LiensProjetType)[] = ['site', 'live', 'appStore', 'playStore', 'repo'];

/** Boutons vers les liens externes d'un projet, dans un ordre fixe. Seuls les liens renseignés sont rendus. */
export function LiensProjet({ liens, dict }: { liens: LiensProjetType; dict: Dictionnaire }) {
  const presents = ORDRE.filter((cle) => liens[cle]);
  if (presents.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {presents.map((cle, index) => (
        <Bouton key={cle} href={liens[cle] as string} variante={index === 0 ? 'plein' : 'contour'} icone={<ExternalLink className="h-4 w-4" />}>
          {dict.projet.liens[cle]}
        </Bouton>
      ))}
    </div>
  );
}
