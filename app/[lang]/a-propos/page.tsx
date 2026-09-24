import { Download } from 'lucide-react';
import type { Metadata } from 'next';
import { CarteFormation } from '@/composants/a-propos/CarteFormation';
import { Chronologie } from '@/composants/a-propos/Chronologie';
import { Methode } from '@/composants/a-propos/Methode';
import { Bouton } from '@/composants/ui/Bouton';
import { Section } from '@/composants/ui/Section';
import { TitreSection } from '@/composants/ui/TitreSection';
import { experiences } from '@/content/experiences';
import { formations } from '@/content/formations';
import { profil } from '@/content/profil';
import { getDictionnaire } from '@/lib/i18n/dictionnaires';
import { langDepuis, type ParametresLang } from '@/lib/i18n/params';
import { genererMetadonnees } from '@/lib/seo';

/** Métadonnées de la page À propos. */
export async function generateMetadata({ params }: ParametresLang): Promise<Metadata> {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  return genererMetadonnees({
    lang,
    route: 'aPropos',
    titre: `${dict.aPropos.titre} — ${dict.site.nomCourt}`,
    description: dict.aPropos.intro[0],
  });
}

/** À propos : intro, expériences, formations, méthode, CV. */
export default async function PageAPropos({ params }: ParametresLang) {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  return (
    <>
      <Section bordure>
        <div className="max-w-3xl">
          <TitreSection surtitre={dict.aPropos.titre} titre={profil.nomComplet} />
          <p className="mt-2 text-texte-secondaire">
            {profil.role[lang]} · {profil.ville[lang]}
          </p>
          <div className="mt-6 space-y-4 text-corps-large text-texte-secondaire">
            {dict.aPropos.intro.map((paragraphe) => (
              <p key={paragraphe}>{paragraphe}</p>
            ))}
          </div>
          <div className="mt-8">
            <Bouton href={profil.cv[lang]} telecharger icone={<Download className="h-4 w-4" />}>
              {dict.aPropos.cv}
            </Bouton>
          </div>
        </div>
      </Section>
      <Section id="experience" bordure>
        <TitreSection surtitre={dict.parcours.surtitre} titre={dict.aPropos.experience} />
        <div className="mt-10">
          <Chronologie lang={lang} dict={dict} experiences={experiences} />
        </div>
      </Section>
      <Section id="formation" bordure>
        <TitreSection surtitre={dict.aPropos.formation} titre={dict.aPropos.formation} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {formations.map((formation) => (
            <CarteFormation key={formation.id} lang={lang} formation={formation} />
          ))}
        </div>
      </Section>
      <Section id="methode">
        <TitreSection surtitre={dict.aPropos.methode.titre} titre={dict.aPropos.methode.titre} />
        <div className="mt-10">
          <Methode dict={dict} />
        </div>
      </Section>
    </>
  );
}
