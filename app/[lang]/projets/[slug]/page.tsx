import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Galerie } from '@/composants/projets/Galerie';
import { LiensProjet } from '@/composants/projets/LiensProjet';
import { ProjetSuivant } from '@/composants/projets/ProjetSuivant';
import { CadreAppareil } from '@/composants/ui/CadreAppareil';
import { Puce } from '@/composants/ui/Puce';
import { corpsProjets } from '@/lib/contenu/corps-projets';
import { LIBELLES_PLATEFORMES } from '@/lib/contenu/plateformes';
import { projetsVoisins, slugsProjets, trouverProjet } from '@/lib/contenu/projets';
import { getDictionnaire } from '@/lib/i18n/dictionnaires';
import { LANGUES } from '@/lib/i18n/locales';
import { langDepuis } from '@/lib/i18n/params';
import { lien } from '@/lib/i18n/routes';
import { genererMetadonnees } from '@/lib/seo';

interface ParametresProjet {
  params: Promise<{ lang: string; slug: string }>;
}

/** Une page statique par projet et par langue. */
export function generateStaticParams() {
  return LANGUES.flatMap((lang) => slugsProjets().map((slug) => ({ lang, slug })));
}

/** Métadonnées de l'étude de cas ; vides si le slug est inconnu (la page rend alors la 404). */
export async function generateMetadata({ params }: ParametresProjet): Promise<Metadata> {
  const { lang: brut, slug } = await params;
  const lang = langDepuis(brut);
  const projet = trouverProjet(slug);
  if (!projet) return {};
  const dict = getDictionnaire(lang);
  return genererMetadonnees({
    lang,
    route: 'projet',
    parametres: { slug },
    titre: `${projet.nom} — ${dict.site.nomCourt}`,
    description: projet.accroche[lang],
  });
}

/** Étude de cas : en-tête, corps MDX, galerie, colonne méta, navigation entre projets. */
export default async function PageProjet({ params }: ParametresProjet) {
  const { lang: brut, slug } = await params;
  const lang = langDepuis(brut);
  const projet = trouverProjet(slug);
  if (!projet) notFound();
  const dict = getDictionnaire(lang);
  const Corps = corpsProjets[projet.slug][lang];
  const voisins = projetsVoisins(projet.slug);
  const meta: { libelle: string; valeur?: string }[] = [
    { libelle: dict.projet.role, valeur: projet.role[lang] },
    { libelle: dict.projet.periode, valeur: projet.periode },
    { libelle: dict.projet.client, valeur: projet.client },
  ];

  return (
    <article className="section-espace">
      <div className="conteneur">
        <Link href={lien(lang, 'projets')} className="inline-flex items-center gap-2 text-sm text-texte-secondaire transition-colors duration-150 hover:text-texte">
          <ArrowLeft className="h-4 w-4" />
          {dict.projet.retour}
        </Link>

        <header className="mt-8 grid items-center gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <p className="font-mono text-mono uppercase tracking-widest text-accent">
              {dict.projet.type[projet.type]} · {projet.categorie[lang]}
            </p>
            <div className="mt-3 flex items-center gap-4">
              <Image src={projet.logo} alt="" width={56} height={56} unoptimized className="h-14 w-14 rounded-carte object-contain" />
              <h1 className="font-display text-display-mobile font-extrabold md:text-display">{projet.nom}</h1>
            </div>
            <p className="mt-4 max-w-2xl text-corps-large text-texte-secondaire">{projet.accroche[lang]}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {projet.plateformes.map((p) => (
                <Puce key={p}>{LIBELLES_PLATEFORMES[p]}</Puce>
              ))}
            </div>
            <div className="mt-8">
              <LiensProjet liens={projet.liens} dict={dict} />
            </div>
          </div>
          <CadreAppareil type={projet.type === 'mobile' ? 'telephone' : 'navigateur'} src={projet.apercu} logo={projet.logo} alt={projet.nom} priorite />
        </header>

        <div className="mt-16 grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <Corps />
            <Galerie
              images={projet.galerie.map((image) => ({ src: image.src, alt: image.legende[lang] }))}
              titre={dict.projet.galerie}
              libelles={dict.projet.visionneuse}
            />
          </div>
          <aside className="h-fit rounded-carte border border-bordure bg-surface p-6 lg:sticky lg:top-24">
            <dl className="space-y-4">
              {meta
                .filter((ligne) => ligne.valeur)
                .map((ligne) => (
                  <div key={ligne.libelle}>
                    <dt className="font-mono text-mono uppercase tracking-widest text-texte-secondaire">{ligne.libelle}</dt>
                    <dd className="mt-1">{ligne.valeur}</dd>
                  </div>
                ))}
              <div>
                <dt className="font-mono text-mono uppercase tracking-widest text-texte-secondaire">{dict.projet.stack}</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {projet.stack.map((t) => (
                    <Puce key={t}>{t}</Puce>
                  ))}
                </dd>
              </div>
            </dl>
            <h2 className="mt-8 font-mono text-mono uppercase tracking-widest text-texte-secondaire">{dict.projet.resultats}</h2>
            <ul className="mt-3 space-y-3">
              {projet.resultats.map((resultat) => (
                <li key={resultat.libelle.fr} className="flex items-baseline gap-3">
                  <span className="font-display text-h3 font-bold text-accent">{resultat.valeur}</span>
                  <span className="text-sm text-texte-secondaire">{resultat.libelle[lang]}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <ProjetSuivant lang={lang} dict={dict} precedent={voisins.precedent} suivant={voisins.suivant} />
      </div>
    </article>
  );
}
