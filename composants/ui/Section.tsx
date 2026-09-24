import type { ReactNode } from 'react';

interface ProprietesSection {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Trait de séparation en bas de la section. */
  bordure?: boolean;
}

/** Section pleine largeur avec l'espacement vertical standard et un conteneur centré. */
export function Section({ id, children, className = '', bordure = false }: ProprietesSection) {
  return (
    <section id={id} className={`section-espace ${bordure ? 'border-b border-bordure' : ''} ${className}`}>
      <div className="conteneur">{children}</div>
    </section>
  );
}
