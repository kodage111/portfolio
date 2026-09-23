'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ProprietesRevelation {
  children: ReactNode;
  /** Retard en millisecondes avant la transition (cascade). */
  delai?: number;
  className?: string;
}

/**
 * Fait apparaître son contenu (fondu + translation 16 px, 300 ms) la première
 * fois qu'il entre dans la fenêtre. Sans IntersectionObserver, affiche direct.
 * `prefers-reduced-motion` est géré globalement dans `globals.css`.
 */
export function RevelationAuDefilement({ children, delai = 0, className = '' }: ProprietesRevelation) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setVisible(true);
          observateur.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observateur.observe(element);
    return () => observateur.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delai}ms` }}
      className={`transition-all duration-300 ease-sortie ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
}
