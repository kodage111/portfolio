import Link from 'next/link';
import fr from '@/dictionnaires/fr.json';
import en from '@/dictionnaires/en.json';
import { lien } from '@/lib/i18n/routes';

const VERSIONS = [
  { lang: 'fr' as const, dict: fr },
  { lang: 'en' as const, dict: en },
];

/** Page 404 sous `[lang]`. Rendue par le catch-all et par `notFound()` des pages. */
export default function NonTrouve() {
  return (
    <section className="section-espace">
      <div className="conteneur max-w-2xl">
        {VERSIONS.map(({ lang, dict }, index) => {
          const Titre = index === 0 ? 'h1' : 'h2';
          return (
            <div key={lang} lang={lang} className="mb-10">
              <p className="font-mono text-mono uppercase tracking-widest text-accent">404</p>
              <Titre className="mt-2 font-display text-h2 font-bold">{dict.nonTrouve.titre}</Titre>
              <p className="mt-2 text-texte-secondaire">{dict.nonTrouve.texte}</p>
              <Link href={lien(lang, 'accueil')} className="mt-4 inline-block text-accent underline-offset-4 hover:underline">
                {dict.nonTrouve.retour}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
