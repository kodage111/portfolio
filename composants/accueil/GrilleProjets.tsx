import { ArrowRight } from 'lucide-react';
import { CarteProjet } from '@/composants/projets/CarteProjet';
import { Bouton } from '@/composants/ui/Bouton';
import { Section } from '@/composants/ui/Section';
import { TitreSection } from '@/composants/ui/TitreSection';
import type { MetaProjet } from '@/lib/contenu/types';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';

interface ProprietesGrilleProjets {
  lang: Lang;
  dict: Dictionnaire;
  projets: MetaProjet[];
}

/** Grille de projets sélectionnés avec lien vers la liste complète. */
export function GrilleProjets({ lang, dict, projets }: ProprietesGrilleProjets) {
  return (
    <Section id="projets" bordure>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <TitreSection surtitre={dict.projets.surtitre} titre={dict.projets.titre} />
        <Bouton href={lien(lang, 'projets')} variante="lien" icone={<ArrowRight className="h-4 w-4" />}>
          {dict.projets.tous}
        </Bouton>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projets.map((projet, index) => (
          <CarteProjet key={projet.slug} lang={lang} dict={dict} projet={projet} delai={index * 80} />
        ))}
      </div>
    </Section>
  );
}
