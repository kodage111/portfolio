import Image from 'next/image';
import { Section } from '@/composants/ui/Section';
import { TitreSection } from '@/composants/ui/TitreSection';
import { GROUPES_STACK, technologiesParGroupe } from '@/content/stack';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';

/** Mur de logos groupés par famille, sans niveau ni pourcentage. Logos sur tuile claire pour rester lisibles. */
export function MurStack({ dict }: { dict: Dictionnaire }) {
  return (
    <Section id="stack" bordure>
      <TitreSection surtitre={dict.stack.surtitre} titre={dict.stack.titre} />
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {GROUPES_STACK.map((groupe) => (
          <div key={groupe}>
            <h3 className="font-mono text-mono uppercase tracking-widest text-texte-secondaire">{dict.stack.groupes[groupe]}</h3>
            <ul className="mt-4 flex flex-wrap gap-3">
              {technologiesParGroupe(groupe).map((technologie) => (
                <li key={technologie.nom} className="flex items-center gap-2 rounded-puce border border-bordure bg-surface py-2 pl-2 pr-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-texte">
                    <Image src={technologie.icone} alt="" width={20} height={20} unoptimized className="h-5 w-5" />
                  </span>
                  <span className="text-sm">{technologie.nom}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
