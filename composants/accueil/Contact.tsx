import { Download, Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import { Bouton } from '@/composants/ui/Bouton';
import { Section } from '@/composants/ui/Section';
import { TitreSection } from '@/composants/ui/TitreSection';
import { profil } from '@/content/profil';
import { coordonnees, lienWhatsapp } from '@/lib/contact';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';
import type { Lang } from '@/lib/i18n/locales';

interface ProprietesContact {
  lang: Lang;
  dict: Dictionnaire;
}

/** Section contact : email, WhatsApp, LinkedIn, GitHub, CV (langue courante + lien vers l'autre). Un lien absent n'est pas rendu. */
export function Contact({ lang, dict }: ProprietesContact) {
  const { email, whatsapp, linkedin } = coordonnees();
  const autreLang: Lang = lang === 'fr' ? 'en' : 'fr';
  return (
    <Section id="contact">
      <div className="max-w-2xl">
        <TitreSection surtitre={dict.contact.surtitre} titre={dict.contact.titre} />
        <p className="mt-4 text-corps-large text-texte-secondaire">{dict.contact.texte}</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {email && (
          <Bouton href={`mailto:${email}`} icone={<Mail className="h-4 w-4" />}>
            {dict.contact.email}
          </Bouton>
        )}
        {whatsapp && (
          <Bouton href={lienWhatsapp(whatsapp, dict.contact.messageWhatsapp)} variante="contour" icone={<FaWhatsapp className="h-4 w-4" />}>
            {dict.contact.whatsapp}
          </Bouton>
        )}
        {linkedin && (
          <Bouton href={linkedin} variante="contour" icone={<FaLinkedinIn className="h-4 w-4" />}>
            {dict.contact.linkedin}
          </Bouton>
        )}
        <Bouton href={profil.github} variante="contour" icone={<FaGithub className="h-4 w-4" />}>
          {dict.contact.github}
        </Bouton>
        <Bouton href={profil.cv[lang]} variante="contour" telecharger icone={<Download className="h-4 w-4" />}>
          {dict.contact.cv}
        </Bouton>
      </div>
      <p className="mt-4 text-sm text-texte-secondaire">
        <a href={profil.cv[autreLang]} download className="underline-offset-4 hover:text-texte hover:underline">
          {dict.contact.cvAutreLangue}
        </a>
      </p>
    </Section>
  );
}
