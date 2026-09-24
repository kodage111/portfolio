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
 * En mouvement réduit, affiche direct sans observer le défilement. La classe
 * `.revelation-masquee` (`globals.css`) garde en plus le contenu visible sans
 * script (`@media (scripting: none)`), pour qu'il ne reste jamais caché faute
 * de JavaScript.
 */
export function RevelationAuDefilement({ children, delai = 0, className = '' }: ProprietesRevelation) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
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
      className={`transition-all duration-300 ease-sortie ${visible ? '' : 'revelation-masquee'} ${className}`}
    >
      {children}
    </div>
  );
}
