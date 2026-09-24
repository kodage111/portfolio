'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';

/** Une image de la visionneuse. */
export interface ImageVisionneuse {
  src: string;
  alt: string;
}

/** Libellés accessibles des commandes. */
export interface LibellesVisionneuse {
  fermer: string;
  precedent: string;
  suivant: string;
}

interface ProprietesVisionneuse {
  images: ImageVisionneuse[];
  indexInitial: number;
  onFermer: () => void;
  libelles: LibellesVisionneuse;
}

const SEUIL_BALAYAGE = 40;

/**
 * Visionneuse plein écran : flèches et Échap au clavier, balayage horizontal
 * au doigt, clic sur le fond pour fermer. Bloque le défilement de la page.
 * Piège le focus au clavier (Tab/Shift+Tab) dans les boutons de la boîte de
 * dialogue et restaure le focus sur l'élément déclencheur à la fermeture.
 */
export function Visionneuse({ images, indexInitial, onFermer, libelles }: ProprietesVisionneuse) {
  const [index, setIndex] = useState(indexInitial);
  const departTouche = useRef<number | null>(null);
  const boutonFermer = useRef<HTMLButtonElement>(null);
  const conteneur = useRef<HTMLDivElement>(null);

  const precedent = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const suivant = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const precedentElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const surTouche = (evenement: KeyboardEvent) => {
      if (evenement.key === 'Escape') onFermer();
      if (evenement.key === 'ArrowLeft') precedent();
      if (evenement.key === 'ArrowRight') suivant();
      if (evenement.key === 'Tab') {
        const boutons = conteneur.current?.querySelectorAll<HTMLElement>('button');
        if (!boutons || boutons.length === 0) return;
        const premier = boutons[0];
        const dernier = boutons[boutons.length - 1];
        if (evenement.shiftKey && document.activeElement === premier) {
          evenement.preventDefault();
          dernier.focus();
        } else if (!evenement.shiftKey && document.activeElement === dernier) {
          evenement.preventDefault();
          premier.focus();
        }
      }
    };
    window.addEventListener('keydown', surTouche);
    const debordement = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    boutonFermer.current?.focus();
    return () => {
      window.removeEventListener('keydown', surTouche);
      document.body.style.overflow = debordement;
      precedentElement?.focus();
    };
  }, [onFermer, precedent, suivant]);

  const image = images[index];
  const stopper = (evenement: MouseEvent) => evenement.stopPropagation();
  const boutonNav = 'rounded-puce border border-bordure p-2 transition-colors duration-150 hover:border-texte';

  return (
    <div
      ref={conteneur}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-50 flex flex-col bg-fond/95"
      onClick={onFermer}
      onTouchStart={(evenement) => {
        departTouche.current = evenement.touches[0].clientX;
      }}
      onTouchEnd={(evenement) => {
        if (departTouche.current === null) return;
        const delta = evenement.changedTouches[0].clientX - departTouche.current;
        if (Math.abs(delta) > SEUIL_BALAYAGE) (delta > 0 ? precedent : suivant)();
        departTouche.current = null;
      }}
    >
      <div className="flex items-center justify-between p-4" onClick={stopper}>
        <span className="font-mono text-mono text-texte-secondaire">
          {index + 1} / {images.length}
        </span>
        <button ref={boutonFermer} type="button" onClick={onFermer} aria-label={libelles.fermer} className={boutonNav}>
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="relative flex-1" onClick={stopper}>
        <Image key={image.src} src={image.src} alt={image.alt} fill sizes="100vw" className="object-contain" />
      </div>
      <div className="flex items-center justify-between gap-4 p-4" onClick={stopper}>
        <button type="button" onClick={precedent} aria-label={libelles.precedent} className={boutonNav}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="text-center text-sm text-texte-secondaire">{image.alt}</p>
        <button type="button" onClick={suivant} aria-label={libelles.suivant} className={boutonNav}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
