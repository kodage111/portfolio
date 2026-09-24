import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { profil } from '@/content/profil';
import { coordonnees } from '@/lib/contact';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';
import { SelecteurLangue } from './SelecteurLangue';

/** Pied de page : droits (année dynamique), liens sociaux, sélecteur de langue, mention de construction. */
export function PiedDePage({ lang, dict }: { lang: Lang; dict: Dictionnaire }) {
  const { linkedin } = coordonnees();
  const annee = new Date().getFullYear();
  return (
    <footer className="border-t border-bordure">
      <div className="conteneur flex flex-col gap-4 py-8 text-sm text-texte-secondaire md:flex-row md:items-center md:justify-between">
        <p>
          © {annee} {profil.nomCourt}. {dict.piedDePage.droits}
        </p>
        <div className="flex items-center gap-4">
          <a href={profil.github} target="_blank" rel="noopener noreferrer" aria-label={dict.contact.github} className="transition-colors duration-150 hover:text-texte">
            <FaGithub className="h-5 w-5" />
          </a>
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={dict.contact.linkedin} className="transition-colors duration-150 hover:text-texte">
              <FaLinkedinIn className="h-5 w-5" />
            </a>
          )}
          <SelecteurLangue lang={lang} libelles={dict.langue} />
        </div>
        <p>{dict.piedDePage.construit}</p>
      </div>
    </footer>
  );
}
