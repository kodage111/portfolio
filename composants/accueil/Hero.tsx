import { ArrowRight, Download } from 'lucide-react';
import Image from 'next/image';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { Badge } from '@/composants/ui/Badge';
import { Bouton } from '@/composants/ui/Bouton';
import { profil } from '@/content/profil';
import { coordonnees, lienWhatsapp } from '@/lib/contact';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';

interface ProprietesHero {
  lang: Lang;
  dict: Dictionnaire;
}

/** Hero : nom, positionnement, disponibilité, deux CTA (projet / recrutement), portrait. */
export function Hero({ lang, dict }: ProprietesHero) {
  const { email, whatsapp, linkedin } = coordonnees();
  const hrefProjet = lienWhatsapp(whatsapp, dict.contact.messageWhatsapp) || (email ? `mailto:${email}` : '#contact');
  return (
    <section className="section-espace border-b border-bordure">
      <div className="conteneur grid items-center gap-12 lg:grid-cols-[3fr_2fr]">
        <div>
          <Badge>{dict.hero.disponibilite}</Badge>
          <p className="mt-6 font-mono text-mono text-texte-secondaire">{dict.hero.salutation}</p>
          <h1 className="mt-2 font-display text-display-mobile font-extrabold md:text-display">
            {profil.nomCourt}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-4 text-corps-large text-texte">{dict.hero.positionnement}</p>
          <p className="mt-4 max-w-xl text-corps-large text-texte-secondaire">{dict.hero.accroche}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Bouton href={hrefProjet} icone={<ArrowRight className="h-4 w-4" />}>
              {dict.hero.ctaProjet}
            </Bouton>
            <Bouton href={profil.cv[lang]} variante="contour" telecharger icone={<Download className="h-4 w-4" />}>
              {dict.hero.ctaRecrute}
            </Bouton>
          </div>
          <div className="mt-6 flex items-center gap-4 text-texte-secondaire">
            <a href={profil.github} target="_blank" rel="noopener noreferrer" aria-label={dict.contact.github} className="transition-colors duration-150 hover:text-texte">
              <FaGithub className="h-5 w-5" />
            </a>
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={dict.contact.linkedin} className="transition-colors duration-150 hover:text-texte">
                <FaLinkedinIn className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-portrait">
          <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-carte border border-accent" />
          <div className="relative overflow-hidden rounded-carte bg-surface">
            <Image
              src={profil.portrait}
              alt={dict.hero.portraitAlt}
              width={520}
              height={520}
              priority
              sizes="(min-width: 1024px) 26rem, 80vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
