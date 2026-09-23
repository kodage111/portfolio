import type { ReactNode } from 'react';

/** Petite étiquette mono pour une technologie ou une plateforme. */
export function Puce({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-puce border border-bordure bg-surface px-2.5 py-1 font-mono text-mono text-texte-secondaire">
      {children}
    </span>
  );
}
