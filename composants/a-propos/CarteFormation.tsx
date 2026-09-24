import type { Formation } from '@/lib/contenu/types';
import { formaterMois } from '@/lib/dates';
import type { Lang } from '@/lib/i18n/locales';

/** Une formation : période, diplôme, domaine, établissement, lieu. */
export function CarteFormation({ lang, formation }: { lang: Lang; formation: Formation }) {
  return (
    <article className="rounded-carte border border-bordure bg-surface p-5">
      <p className="font-mono text-mono text-texte-secondaire">
        {formaterMois(formation.debut, lang)} – {formaterMois(formation.fin, lang)}
      </p>
      <h3 className="mt-2 font-semibold">
        {formation.diplome[lang]} · {formation.domaine[lang]}
      </h3>
      <p className="mt-1 text-sm text-texte-secondaire">
        {formation.etablissement} · {formation.lieu[lang]}
      </p>
    </article>
  );
}
