import Image from 'next/image';

/** Forme du cadre : téléphone (portrait 9/19) ou fenêtre de navigateur (16/10). */
export type TypeAppareil = 'telephone' | 'navigateur';

interface ProprietesCadreAppareil {
  type: TypeAppareil;
  /** Capture à afficher. Absente : le logo est centré sur un dégradé accent. */
  src?: string;
  alt: string;
  logo: string;
  /** `priority` de `next/image` (hero uniquement). */
  priorite?: boolean;
  className?: string;
}

/** Cadre d'appareil en CSS pur autour d'une capture `next/image`. */
export function CadreAppareil({ type, src, alt, logo, priorite = false, className = '' }: ProprietesCadreAppareil) {
  const contenu = src ? (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 40vw, 90vw"
      priority={priorite}
      className="object-cover object-top"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 to-surface">
      <Image src={logo} alt={alt} width={120} height={120} unoptimized className="h-24 w-24 object-contain" />
    </div>
  );

  if (type === 'telephone') {
    return (
      <div
        className={`relative mx-auto aspect-telephone w-full max-w-telephone overflow-hidden rounded-mockup border-[6px] border-surface-elevee bg-surface ${className}`}
      >
        <div aria-hidden className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-surface-elevee" />
        {contenu}
      </div>
    );
  }
  return (
    <div className={`relative w-full overflow-hidden rounded-carte border border-bordure bg-surface ${className}`}>
      <div aria-hidden className="flex h-8 items-center gap-1.5 border-b border-bordure bg-surface-elevee px-3">
        <span className="h-2.5 w-2.5 rounded-full bg-bordure" />
        <span className="h-2.5 w-2.5 rounded-full bg-bordure" />
        <span className="h-2.5 w-2.5 rounded-full bg-bordure" />
      </div>
      <div className="relative aspect-navigateur">{contenu}</div>
    </div>
  );
}
