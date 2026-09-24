import Link from 'next/link';
import type { ReactNode } from 'react';

/** Apparence du bouton. `plein` = accent, `contour` = bordure, `lien` = texte accent sans fond. */
export type VarianteBouton = 'plein' | 'contour' | 'lien';

interface ProprietesBouton {
  href: string;
  children: ReactNode;
  variante?: VarianteBouton;
  /** Icône rendue après le libellé. */
  icone?: ReactNode;
  /** Force `<a download>` (CV). */
  telecharger?: boolean;
  className?: string;
}

const STYLES: Record<VarianteBouton, string> = {
  plein: 'bg-accent text-fond hover:bg-accent-sombre px-5 py-3',
  contour: 'border border-bordure text-texte hover:border-texte px-5 py-3',
  lien: 'text-accent hover:text-texte px-0 py-0',
};

const EXTERNE = /^(https?:|mailto:|tel:)/;

/** Bouton-lien du site. Lien externe, mailto, tel ou téléchargement → `<a>` ; sinon `next/link`. */
export function Bouton({ href, children, variante = 'plein', icone, telecharger = false, className = '' }: ProprietesBouton) {
  const classes = `inline-flex items-center gap-2 rounded-puce font-medium transition-colors duration-150 ${STYLES[variante]} ${className}`;
  const estHttp = /^https?:/.test(href);
  if (telecharger || EXTERNE.test(href)) {
    return (
      <a
        href={href}
        className={classes}
        target={estHttp ? '_blank' : undefined}
        rel={estHttp ? 'noopener noreferrer' : undefined}
        download={telecharger || undefined}
      >
        {children}
        {icone}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {icone}
    </Link>
  );
}
