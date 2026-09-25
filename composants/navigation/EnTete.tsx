import Link from 'next/link';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';
import { SelecteurLangue } from './SelecteurLangue';

interface ProprietesEnTete {
  lang: Lang;
  dict: Dictionnaire;
}

/** Barre de navigation collante et translucide : monogramme, liens localisés, sélecteur de langue, bouton contact. */
export function EnTete({ lang, dict }: ProprietesEnTete) {
  const liens = [
    { href: lien(lang, 'projets'), libelle: dict.nav.projets },
    { href: lien(lang, 'aPropos'), libelle: dict.nav.aPropos },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-bordure/60 bg-fond/60 backdrop-blur-md">
      <div className="conteneur flex h-16 items-center justify-between">
        <Link href={lien(lang, 'accueil')} aria-label={dict.nav.accueil} className="font-display text-h3 font-bold tracking-tight">
          ET<span className="text-accent">.</span>
        </Link>
        <nav aria-label={dict.nav.ariaPrincipale} className="flex items-center gap-5 md:gap-7">
          {liens.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-texte-secondaire transition-colors duration-150 hover:text-texte">
              {l.libelle}
            </Link>
          ))}
          <SelecteurLangue lang={lang} libelles={dict.langue} />
          <Link
            href={`${lien(lang, 'accueil')}#contact`}
            className="hidden rounded-puce bg-accent px-4 py-2 text-sm font-semibold text-fond transition-colors duration-150 hover:bg-accent-sombre md:inline-block"
          >
            {dict.nav.contact}
          </Link>
        </nav>
      </div>
    </header>
  );
}
