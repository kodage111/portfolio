import { RevelationAuDefilement } from '@/composants/ui/RevelationAuDefilement';
import type { Experience } from '@/lib/contenu/types';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { CarteExperience } from './CarteExperience';

interface ProprietesChronologie {
  lang: Lang;
  dict: Dictionnaire;
  experiences: Experience[];
}

/** Liste des expériences séparées par un trait, révélées en cascade. */
export function Chronologie({ lang, dict, experiences }: ProprietesChronologie) {
  return (
    <div className="divide-y divide-bordure">
      {experiences.map((experience, index) => (
        <RevelationAuDefilement key={experience.id} delai={index * 80} className="py-8 first:pt-0">
          <CarteExperience lang={lang} dict={dict} experience={experience} />
        </RevelationAuDefilement>
      ))}
    </div>
  );
}
