import type { Metadata } from 'next';
import { JetBrains_Mono, Manrope, Syne } from 'next/font/google';
import type { ReactNode } from 'react';
import { EnTete } from '@/composants/navigation/EnTete';
import { PiedDePage } from '@/composants/navigation/PiedDePage';
import { getDictionnaire } from '@/lib/i18n/dictionnaires';
import { LANGUES } from '@/lib/i18n/locales';
import { langDepuis, type ParametresLang } from '@/lib/i18n/params';
import { genererMetadonnees } from '@/lib/seo';
import '../globals.css';

const syne = Syne({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-syne', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-manrope', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains', display: 'swap' });

/** Une page statique par langue. */
export function generateStaticParams() {
  return LANGUES.map((lang) => ({ lang }));
}

/** Métadonnées par défaut (les pages les remplacent). */
export async function generateMetadata({ params }: ParametresLang): Promise<Metadata> {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  return genererMetadonnees({ lang, route: 'accueil', titre: dict.site.titre, description: dict.site.description });
}

/** Mise en page racine : fontes, en-tête, pied de page. */
export default async function MiseEnPage({ children, params }: ParametresLang & { children: ReactNode }) {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
  return (
    <html lang={lang} className={`${syne.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-fond font-sans text-texte antialiased">
        <EnTete lang={lang} dict={dict} />
        <main>{children}</main>
        <PiedDePage lang={lang} dict={dict} />
      </body>
    </html>
  );
}
