import { NextResponse, type NextRequest } from 'next/server';
import { COOKIE_LANGUE } from '@/lib/i18n/locales';
import { deciderNavigation } from '@/lib/i18n/navigation';

/** Applique à chaque requête de page la décision de navigation (langue, slugs localisés). Redirections en 308. */
export function middleware(requete: NextRequest) {
  const decision = deciderNavigation(
    requete.nextUrl.pathname,
    requete.headers.get('accept-language'),
    requete.cookies.get(COOKIE_LANGUE)?.value,
  );
  if (decision.type === 'continuer') return NextResponse.next();

  const url = requete.nextUrl.clone();
  url.pathname = decision.vers;
  return decision.type === 'redirection' ? NextResponse.redirect(url, 308) : NextResponse.rewrite(url);
}

/** Périmètre du middleware : tout sauf les internes Next, l'API et les fichiers (chemins contenant un point : images, sitemap.xml, robots.txt). */
export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
