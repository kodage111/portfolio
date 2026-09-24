import { Badge } from '@/composants/ui/Badge';
import { Puce } from '@/composants/ui/Puce';
import type { Experience } from '@/lib/contenu/types';
import { formaterPeriode } from '@/lib/dates';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';

interface ProprietesCarteExperience {
  lang: Lang;
  dict: Dictionnaire;
  experience: Experience;
}

/** Une expérience : période, poste, employeur, lieu, contrat, responsabilités et stack. */
export function CarteExperience({ lang, dict, experience }: ProprietesCarteExperience) {
  return (
    <article className="grid gap-4 md:grid-cols-[14rem_1fr] md:gap-8">
      <div>
        <p className="font-mono text-mono text-texte-secondaire">
          {formaterPeriode(experience.debut, experience.fin, lang, dict.parcours.aujourdhui)}
        </p>
        <div className="mt-2">
          <Badge>{dict.parcours.contrat[experience.typeContrat]}</Badge>
        </div>
      </div>
      <div>
        <h3 className="font-display text-h3 font-bold">{experience.poste[lang]}</h3>
        <p className="text-texte-secondaire">
          {experience.employeur[lang]} · {experience.lieu[lang]}
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-texte-secondaire">
          {experience.points[lang].map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {experience.stack.map((t) => (
            <Puce key={t}>{t}</Puce>
          ))}
        </div>
      </div>
    </article>
  );
}
