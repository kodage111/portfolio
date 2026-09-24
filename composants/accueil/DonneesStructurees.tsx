import { profil } from '@/content/profil';
import { coordonnees } from '@/lib/contact';
import type { Lang } from '@/lib/i18n/locales';
import { lien } from '@/lib/i18n/routes';

/** JSON-LD `Person` pour les moteurs de recherche. */
export function DonneesStructurees({ lang }: { lang: Lang }) {
  const { urlSite, email, linkedin } = coordonnees();
  const donnees = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profil.nomComplet,
    alternateName: profil.nomCourt,
    jobTitle: profil.role[lang],
    url: `${urlSite}${lien(lang, 'accueil')}`,
    email: email || undefined,
    address: { '@type': 'PostalAddress', addressLocality: profil.adresse.localite, addressCountry: profil.adresse.pays },
    sameAs: [profil.github, linkedin].filter(Boolean),
    worksFor: { '@type': 'Organization', name: profil.employeur.nom, url: profil.employeur.url },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }} />;
}
