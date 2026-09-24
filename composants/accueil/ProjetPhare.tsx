import { ArrowRight } from 'lucide-react';
import { Bouton } from '@/composants/ui/Bouton';
import { CadreAppareil } from '@/composants/ui/CadreAppareil';
import { Puce } from '@/composants/ui/Puce';
import { RevelationAuDefilement } from '@/composants/ui/RevelationAuDefilement';
import { Section } from '@/composants/ui/Section';
import { TitreSection } from '@/composants/ui/TitreSection';
import type { MetaProjet } from '@/lib/contenu/types';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';

interface ProprietesProjetPhare {
  lang: Lang;
  dict: Dictionnaire;
  projet: MetaProjet;
}

/** Projet phare : mockup, accroche, trois chiffres, stack, lien vers l'étude de cas. */
export function ProjetPhare({ lang, dict, projet }: ProprietesProjetPhare) {
  return (
    <Section id="projet-phare" bordure>
      <TitreSection surtitre={dict.projetPhare.surtitre} titre={projet.nom} />
      <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
        <RevelationAuDefilement>
          <CadreAppareil
            type={projet.type === 'mobile' ? 'telephone' : 'navigateur'}
            src={projet.apercu}
            logo={projet.logo}
            alt={projet.nom}
          />
        </RevelationAuDefilement>
        <RevelationAuDefilement delai={100}>
          <p className="text-corps-large text-texte-secondaire">{projet.accroche[lang]}</p>
          <ul className="mt-8 grid grid-cols-3 gap-3">
            {projet.resultats.map((resultat) => (
              <li key={resultat.libelle.fr} className="rounded-carte border border-bordure bg-surface p-4">
                <span className="block font-display text-h3 font-bold text-accent">{resultat.valeur}</span>
                <span className="mt-1 block text-sm text-texte-secondaire">{resultat.libelle[lang]}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {projet.stack.map((t) => (
              <Puce key={t}>{t}</Puce>
            ))}
          </div>
          <div className="mt-8">
            <Bouton href={lien(lang, 'projet', { slug: projet.slug })} icone={<ArrowRight className="h-4 w-4" />}>
              {dict.projetPhare.voirEtude}
            </Bouton>
          </div>
        </RevelationAuDefilement>
      </div>
    </Section>
  );
}
