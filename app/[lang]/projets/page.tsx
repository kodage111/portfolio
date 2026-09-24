import type { Metadata } from 'next';
import { CarteProjet } from '@/composants/projets/CarteProjet';
import { FiltreProjets } from '@/composants/projets/FiltreProjets';
import { Section } from '@/composants/ui/Section';
import { TitreSection } from '@/composants/ui/TitreSection';
import { estTypeProjet, listerProjets } from '@/lib/contenu/projets';
import { getDictionnaire } from '@/lib/i18n/dictionnaires';
import { langDepuis, type ParametresLang } from '@/lib/i18n/params';
import { genererMetadonnees } from '@/lib/seo';

interface ProprietesPageProjets extends ParametresLang {
  searchParams: Promise<{ type?: string }>;
}

/** Métadonnées de la liste des projets. */
export async function generateMetadata({ params }: ParametresLang): Promise<Metadata> {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  return genererMetadonnees({
    lang,
    route: 'projets',
    titre: `${dict.projets.titrePage} — ${dict.site.nomCourt}`,
    description: dict.projets.introPage,
  });
}

/** Liste de tous les projets, filtrable par type via `?type=mobile|web`. */
export default async function PageProjets({ params, searchParams }: ProprietesPageProjets) {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  const { type } = await searchParams;
  const filtre = estTypeProjet(type) ? type : undefined;
  const projets = listerProjets(filtre);

  return (
    <Section>
      <div className="max-w-2xl">
        <TitreSection surtitre={dict.projets.surtitre} titre={dict.projets.titrePage} niveau="h1" />
        <p className="mt-4 text-corps-large text-texte-secondaire">{dict.projets.introPage}</p>
      </div>
      <div className="mt-8">
        <FiltreProjets lang={lang} dict={dict} actif={filtre} />
      </div>
      {projets.length === 0 ? (
        <p className="mt-10 text-texte-secondaire">{dict.projets.aucun}</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projets.map((projet, index) => (
            <CarteProjet key={projet.slug} lang={lang} dict={dict} projet={projet} delai={index * 80} />
          ))}
        </div>
      )}
    </Section>
  );
}
