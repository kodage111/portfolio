import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { BandeauDefilant } from '@/composants/accueil/BandeauDefilant';
import { profil } from '@/content/profil';
import { coordonnees, lienWhatsapp } from '@/lib/contact';
import { listerProjets } from '@/lib/contenu/projets';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';

interface ProprietesHero {
  lang: Lang;
  dict: Dictionnaire;
}

/**
 * Hero plein écran : halos verts qui dérivent, badge de disponibilité, nom et
 * rôle en titre géant dégradé, portrait détouré qui chevauche le titre,
 * accroche + CTA à gauche, nombre de projets livrés à droite, bandeau de
 * chiffres défilant en pied. Entrée animée en cascade (CSS pur, serveur).
 */
export function Hero({ lang, dict }: ProprietesHero) {
  const { email, whatsapp } = coordonnees();
  const hrefProjet = lienWhatsapp(whatsapp, dict.contact.messageWhatsapp) || (email ? `mailto:${email}` : '#contact');
  const externe = hrefProjet.startsWith('http');
  const projets = listerProjets();
  const delai = (ms: number) => ({ animationDelay: `${ms}ms` });

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="halo halo-haut" />
        <div className="halo halo-droite" />
        <div className="halo halo-gauche" />
      </div>

      <div className="conteneur relative flex flex-col md:min-h-hero items-center pt-10 md:pt-14">
        <p className="flex animate-apparition items-center gap-2 text-sm text-accent" style={delai(0)}>
          <span aria-hidden className="h-2 w-2 animate-pulsation rounded-full bg-accent" />
          {dict.hero.disponibilite}
        </p>

        <h1 className="relative z-10 mt-5 text-center font-display text-hero font-bold">
          <span className="titre-degrade block animate-apparition md:whitespace-nowrap" style={delai(120)}>
            {profil.nomCourt}
          </span>
          <span className="titre-degrade-estompe block animate-apparition md:whitespace-nowrap" style={delai(260)}>
            {dict.hero.role}
          </span>
        </h1>

        <div
          className="fondu-bas relative z-20 mt-4 h-portrait-hero-mobile w-full animate-montee md:absolute md:bottom-0 md:left-1/2 md:mt-0 md:h-portrait-hero md:w-portrait-hero md:-translate-x-1/2"
          style={delai(380)}
        >
          <Image
            src={profil.portraitDetoure}
            alt={dict.hero.portraitAlt}
            fill
            priority
            sizes="(min-width: 768px) 30rem, 90vw"
            className="object-contain object-bottom"
          />
        </div>

        <div className="relative z-30 mt-8 flex w-full flex-col gap-8 pb-10 md:absolute md:inset-x-6 md:bottom-10 md:mt-0 md:w-auto md:flex-row md:items-end md:justify-between md:pb-0">
          <div className="max-w-accroche animate-apparition" style={delai(520)}>
            <p className="text-corps-large text-texte">{dict.hero.accrocheCourte}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={hrefProjet}
                target={externe ? '_blank' : undefined}
                rel={externe ? 'noopener noreferrer' : undefined}
                className="group inline-flex items-center gap-1"
              >
                <span className="rounded-puce bg-texte px-7 py-3 font-semibold text-fond transition-colors duration-150 group-hover:bg-accent">
                  {dict.hero.ctaDiscuter}
                </span>
                <span className="rounded-puce bg-texte p-3 text-fond transition-all duration-300 ease-sortie group-hover:rotate-45 group-hover:bg-accent">
                  <ArrowUpRight aria-hidden className="h-5 w-5" />
                </span>
              </a>
              <a
                href={profil.cv[lang]}
                download
                className="inline-flex items-center gap-1 text-sm text-texte-secondaire underline-offset-4 transition-colors duration-150 hover:text-texte hover:underline"
              >
                {dict.hero.ctaRecrute}
                <ArrowDown aria-hidden className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="animate-apparition md:text-right" style={delai(640)}>
            <div className="flex items-center gap-3 md:justify-end">
              <div className="flex -space-x-3">
                {projets.slice(0, 4).map((projet) => (
                  <span key={projet.slug} className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-fond bg-texte">
                    <Image src={projet.logo} alt="" width={28} height={28} unoptimized className="h-7 w-7 rounded-full object-contain" />
                  </span>
                ))}
              </div>
              <span className="font-display text-display-mobile font-bold text-accent">{projets.length}+</span>
            </div>
            <p className="mt-2 text-corps-large text-texte">{dict.hero.statLibelle}</p>
          </div>
        </div>
      </div>

      <BandeauDefilant elements={dict.hero.bandeau} aria={dict.hero.bandeauAria} />
    </section>
  );
}
