import { Sparkle } from 'lucide-react';

/** Un chiffre clé du bandeau. */
export interface ElementBandeau {
  valeur: string;
  libelle: string;
}

interface ProprietesBandeau {
  elements: ElementBandeau[];
  /** Nom accessible de la liste. */
  aria: string;
}

/**
 * Bandeau de chiffres clés qui défile en boucle sous le hero. La liste est
 * rendue deux fois (la copie est masquée aux lecteurs d'écran) pour une boucle
 * sans couture ; l'animation s'arrête au survol et en mouvement réduit.
 */
export function BandeauDefilant({ elements, aria }: ProprietesBandeau) {
  const serie = (copie: boolean) => (
    <ul aria-label={copie ? undefined : aria} aria-hidden={copie || undefined} className="flex shrink-0 items-center">
      {elements.map((element) => (
        <li key={element.valeur} className="flex items-center gap-3 px-8 whitespace-nowrap">
          <span className="font-display text-h3 font-bold text-accent">{element.valeur}</span>
          <span className="text-corps-large text-texte">{element.libelle}</span>
          <Sparkle aria-hidden className="ml-8 h-5 w-5 fill-accent text-accent" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative z-30 overflow-hidden border-y border-bordure bg-surface/80 py-5 backdrop-blur-sm">
      <div className="defilement flex w-max">
        {serie(false)}
        {serie(true)}
      </div>
    </div>
  );
}
