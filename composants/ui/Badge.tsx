import type { ReactNode } from 'react';

/** Étiquette avec point accent, en mono capitales (ex. disponibilité, type de contrat). */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-bordure bg-surface px-3 py-1 font-mono text-mono uppercase tracking-wider text-texte-secondaire">
      <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
      {children}
    </span>
  );
}
