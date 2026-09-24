'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COOKIE_LANGUE, DUREE_COOKIE_LANGUE, LANGUES, type Lang } from '@/lib/i18n/locales';
import { lien, resoudreChemin } from '@/lib/i18n/routes';

interface ProprietesSelecteurLangue {
  lang: Lang;
  libelles: { fr: string; en: string; changer: string };
}

/** Bascule FR / EN vers la même page dans l'autre langue et mémorise le choix dans un cookie. */
export function SelecteurLangue({ lang, libelles }: ProprietesSelecteurLangue) {
  const chemin = usePathname();
  const resolu = resoudreChemin(chemin, true);

  return (
    <div role="group" aria-label={libelles.changer} className="flex items-center rounded-puce border border-bordure font-mono text-mono">
      {LANGUES.map((cible) => {
        const href = resolu ? lien(cible, resolu.route, { slug: resolu.slug }) : lien(cible, 'accueil');
        const active = cible === lang;
        return (
          <Link
            key={cible}
            href={href}
            hrefLang={cible}
            aria-current={active ? 'true' : undefined}
            onClick={() => {
              document.cookie = `${COOKIE_LANGUE}=${cible}; path=/; max-age=${DUREE_COOKIE_LANGUE}; samesite=lax`;
            }}
            className={`px-2.5 py-1 transition-colors duration-150 ${active ? 'bg-surface-elevee text-texte' : 'text-texte-secondaire hover:text-texte'}`}
          >
            {libelles[cible]}
          </Link>
        );
      })}
    </div>
  );
}
