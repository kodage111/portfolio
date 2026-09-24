import { Check, Globe, Server, Smartphone } from 'lucide-react';
import { RevelationAuDefilement } from '@/composants/ui/RevelationAuDefilement';
import { Section } from '@/composants/ui/Section';
import { TitreSection } from '@/composants/ui/TitreSection';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';

const ICONES = [Smartphone, Globe, Server];

/** Trois cartes d'expertise (mobile, web, backend) avec livrables concrets. Textes du dictionnaire. */
export function Expertises({ dict }: { dict: Dictionnaire }) {
  return (
    <Section id="expertises" bordure>
      <TitreSection surtitre={dict.expertises.surtitre} titre={dict.expertises.titre} />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {dict.expertises.cartes.map((carte, index) => {
          const Icone = ICONES[index] ?? Smartphone;
          return (
            <RevelationAuDefilement key={carte.titre} delai={index * 80} className="h-full">
              <article className="flex h-full flex-col rounded-carte border border-bordure bg-surface p-6">
                <Icone className="h-7 w-7 text-accent" aria-hidden />
                <h3 className="mt-4 font-display text-h3 font-bold">{carte.titre}</h3>
                <p className="mt-2 text-texte-secondaire">{carte.description}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {carte.livrables.map((livrable) => (
                    <li key={livrable} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      <span>{livrable}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </RevelationAuDefilement>
          );
        })}
      </div>
    </Section>
  );
}
