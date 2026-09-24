import Link from 'next/link';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';
import { SelecteurLangue } from './SelecteurLangue';

interface ProprietesEnTete {
  lang: Lang;
  dict: Dictionnaire;
}

/** Barre de navigation collante : monogramme, liens localisés, sélecteur de langue. */
export function EnTete({ lang, dict }: ProprietesEnTete) {
  const liens = [
    { href: lien(lang, 'projets'), libelle: dict.nav.projets },
    { href: lien(lang, 'aPropos'), libelle: dict.nav.aPropos },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-bordure bg-fond/90 backdrop-blur-sm">
      <div className="conteneur flex h-16 items-center justify-between">
        <Link href={lien(lang, 'accueil')} aria-label={dict.nav.accueil} className="font-display text-h3 font-bold tracking-tight">
          ET<span className="text-accent">.</span>
        </Link>
        <nav aria-label={dict.nav.ariaPrincipale} className="flex items-center gap-5 md:gap-6">
          {liens.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-texte-secondaire transition-colors duration-150 hover:text-texte">
              {l.libelle}
            </Link>
          ))}
          <SelecteurLangue lang={lang} libelles={dict.langue} />
        </nav>
      </div>
    </header>
  );
}
