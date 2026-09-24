import Link from 'next/link';
import type { TypeProjet } from '@/lib/contenu/types';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';

interface ProprietesFiltreProjets {
  lang: Lang;
  dict: Dictionnaire;
  /** Type actif ; `undefined` = tous. */
  actif?: TypeProjet;
}

/** Puces de filtre Tous / Mobile / Web. L'état vit dans l'URL (`?type=`), le serveur filtre. */
export function FiltreProjets({ lang, dict, actif }: ProprietesFiltreProjets) {
  const base = lien(lang, 'projets');
  const options: { valeur?: TypeProjet; libelle: string }[] = [
    { libelle: dict.projets.filtre.tous },
    { valeur: 'mobile', libelle: dict.projets.filtre.mobile },
    { valeur: 'web', libelle: dict.projets.filtre.web },
  ];
  return (
    <nav aria-label={dict.projets.filtreAria} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const estActif = option.valeur === actif;
        return (
          <Link
            key={option.libelle}
            href={option.valeur ? `${base}?type=${option.valeur}` : base}
            aria-current={estActif ? 'true' : undefined}
            className={`rounded-full border px-4 py-2 text-sm transition-colors duration-150 ${
              estActif ? 'border-accent bg-accent text-fond' : 'border-bordure text-texte-secondaire hover:border-texte hover:text-texte'
            }`}
          >
            {option.libelle}
          </Link>
        );
      })}
    </nav>
  );
}
