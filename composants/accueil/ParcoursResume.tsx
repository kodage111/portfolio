import { ArrowRight } from 'lucide-react';
import { Badge } from '@/composants/ui/Badge';
import { Bouton } from '@/composants/ui/Bouton';
import { Section } from '@/composants/ui/Section';
import { TitreSection } from '@/composants/ui/TitreSection';
import type { Experience } from '@/lib/contenu/types';
import { formaterPeriode } from '@/lib/dates';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';

interface ProprietesParcoursResume {
  lang: Lang;
  dict: Dictionnaire;
  experiences: Experience[];
}

/** Trois jalons du parcours (période, poste, employeur, contrat) et lien vers la page À propos. */
export function ParcoursResume({ lang, dict, experiences }: ProprietesParcoursResume) {
  return (
    <Section id="parcours" bordure>
      <TitreSection surtitre={dict.parcours.surtitre} titre={dict.parcours.titre} />
      <ol className="mt-10 divide-y divide-bordure border-y border-bordure">
        {experiences.map((experience) => (
          <li key={experience.id} className="grid gap-2 py-5 md:grid-cols-[14rem_1fr_auto] md:items-center md:gap-6">
            <span className="font-mono text-mono text-texte-secondaire">
              {formaterPeriode(experience.debut, experience.fin, lang, dict.parcours.aujourdhui)}
            </span>
            <span>
              <span className="font-semibold">{experience.poste[lang]}</span>
              <span className="text-texte-secondaire"> · {experience.employeur[lang]}</span>
            </span>
            <Badge>{dict.parcours.contrat[experience.typeContrat]}</Badge>
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <Bouton href={lien(lang, 'aPropos')} variante="lien" icone={<ArrowRight className="h-4 w-4" />}>
          {dict.parcours.voirTout}
        </Bouton>
      </div>
    </Section>
  );
}
