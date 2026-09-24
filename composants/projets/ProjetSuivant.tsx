import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { MetaProjet } from '@/lib/contenu/types';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';

interface ProprietesProjetSuivant {
  lang: Lang;
  dict: Dictionnaire;
  precedent?: MetaProjet;
  suivant?: MetaProjet;
}

/** Navigation précédent / suivant en bas d'une étude de cas. */
export function ProjetSuivant({ lang, dict, precedent, suivant }: ProprietesProjetSuivant) {
  const classe = 'group flex items-center gap-3 rounded-carte border border-bordure bg-surface p-5 transition-colors duration-150 hover:border-texte-secondaire';
  return (
    <nav aria-label={`${dict.projet.precedent} / ${dict.projet.suivant}`} className="mt-16 grid gap-4 md:grid-cols-2">
      {precedent ? (
        <Link href={lien(lang, 'projet', { slug: precedent.slug })} className={classe}>
          <ArrowLeft className="h-5 w-5 text-accent transition-transform duration-150 group-hover:-translate-x-1" />
          <span>
            <span className="block font-mono text-mono uppercase tracking-widest text-texte-secondaire">{dict.projet.precedent}</span>
            <span className="font-semibold">{precedent.nom}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {suivant && (
        <Link href={lien(lang, 'projet', { slug: suivant.slug })} className={`${classe} justify-end text-right`}>
          <span>
            <span className="block font-mono text-mono uppercase tracking-widest text-texte-secondaire">{dict.projet.suivant}</span>
            <span className="font-semibold">{suivant.nom}</span>
          </span>
          <ArrowRight className="h-5 w-5 text-accent transition-transform duration-150 group-hover:translate-x-1" />
        </Link>
      )}
    </nav>
  );
}
