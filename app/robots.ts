import type { MetadataRoute } from 'next';
import { coordonnees } from '@/lib/contact';

/** Tout est indexable ; pointe vers le sitemap. */
export default function robots(): MetadataRoute.Robots {
  const { urlSite } = coordonnees();
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${urlSite}/sitemap.xml`,
  };
}
