import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Puce } from '@/composants/ui/Puce';
import { RevelationAuDefilement } from '@/composants/ui/RevelationAuDefilement';
import { LIBELLES_PLATEFORMES } from '@/lib/contenu/plateformes';
import type { MetaProjet } from '@/lib/contenu/types';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';

interface ProprietesCarteProjet {
  lang: Lang;
  dict: Dictionnaire;
  projet: MetaProjet;
  /** Retard de révélation en ms (cascade dans une grille). */
  delai?: number;
}

/** Carte d'un projet : aperçu, logo, nom, accroche, plateformes et trois technologies. Toute la carte est un lien. */
export function CarteProjet({ lang, dict, projet, delai = 0 }: ProprietesCarteProjet) {
  return (
    <RevelationAuDefilement delai={delai} className="h-full">
      <article className="group flex h-full flex-col rounded-carte border border-bordure bg-surface transition-colors duration-150 hover:border-texte-secondaire">
        <Link
          href={lien(lang, 'projet', { slug: projet.slug })}
          aria-label={`${dict.projets.voir} : ${projet.nom}`}
          className="flex h-full flex-col p-5"
        >
          <div className="relative aspect-navigateur overflow-hidden rounded-puce bg-surface-elevee">
            {projet.apercu ? (
              <Image
                src={projet.apercu}
                alt=""
                fill
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="object-cover object-top transition-transform duration-300 ease-sortie group-hover:scale-102"
              />
            ) : (
              <Image
                src={projet.logo}
                alt=""
                width={96}
                height={96}
                unoptimized
                className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 object-contain"
              />
            )}
          </div>
          <div className="mt-5 flex items-center gap-3">
            <Image src={projet.logo} alt="" width={32} height={32} unoptimized className="h-8 w-8 rounded-puce object-contain" />
            <h3 className="font-display text-h3 font-bold">{projet.nom}</h3>
          </div>
          <p className="mt-2 text-texte-secondaire">{projet.accroche[lang]}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {projet.plateformes.map((p) => (
              <Puce key={p}>{LIBELLES_PLATEFORMES[p]}</Puce>
            ))}
            {projet.stack.slice(0, 3).map((t) => (
              <Puce key={t}>{t}</Puce>
            ))}
          </div>
          <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm text-accent">
            {dict.projets.voir}
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
          </span>
        </Link>
      </article>
    </RevelationAuDefilement>
  );
}
