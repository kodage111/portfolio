import { Check } from 'lucide-react';
import type { Dictionnaire } from '@/lib/i18n/dictionnaires';

/** Quatre principes de travail (tests, architecture, CI, revue), pour les recruteurs. */
export function Methode({ dict }: { dict: Dictionnaire }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {dict.aPropos.methode.points.map((point) => (
        <li key={point} className="flex items-start gap-3 rounded-carte border border-bordure bg-surface p-4">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}
