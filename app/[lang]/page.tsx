import type { Metadata } from 'next';
import { Contact } from '@/composants/accueil/Contact';
import { DonneesStructurees } from '@/composants/accueil/DonneesStructurees';
import { Expertises } from '@/composants/accueil/Expertises';
import { GrilleProjets } from '@/composants/accueil/GrilleProjets';
import { Hero } from '@/composants/accueil/Hero';
import { MurStack } from '@/composants/accueil/MurStack';
import { ParcoursResume } from '@/composants/accueil/ParcoursResume';
import { ProjetPhare } from '@/composants/accueil/ProjetPhare';
import { experiences } from '@/content/experiences';
import { projetPhare, projetsSelectionnes } from '@/lib/contenu/projets';
import { getDictionnaire } from '@/lib/i18n/dictionnaires';
import { langDepuis, type ParametresLang } from '@/lib/i18n/params';
import { genererMetadonnees } from '@/lib/seo';

/** Métadonnées de l'accueil (titre complet du site). */
export async function generateMetadata({ params }: ParametresLang): Promise<Metadata> {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  return genererMetadonnees({ lang, route: 'accueil', titre: dict.site.titre, description: dict.site.description });
}

/** Accueil : hero, projet phare, projets sélectionnés, expertises, stack, parcours, contact. */
export default async function Accueil({ params }: ParametresLang) {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  return (
    <>
      <DonneesStructurees lang={lang} />
      <Hero lang={lang} dict={dict} />
      <ProjetPhare lang={lang} dict={dict} projet={projetPhare()} />
      <GrilleProjets lang={lang} dict={dict} projets={projetsSelectionnes(3)} />
      <Expertises dict={dict} />
      <MurStack dict={dict} />
      <ParcoursResume lang={lang} dict={dict} experiences={experiences} />
      <Contact lang={lang} dict={dict} />
    </>
  );
}
