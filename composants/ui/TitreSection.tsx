interface ProprietesTitreSection {
  surtitre: string;
  titre: string;
  /** Ancre du titre. */
  id?: string;
  centre?: boolean;
}

/** Surtitre mono accent + titre display d'une section. */
export function TitreSection({ surtitre, titre, id, centre = false }: ProprietesTitreSection) {
  return (
    <div className={centre ? 'text-center' : ''}>
      <p className="font-mono text-mono uppercase tracking-widest text-accent">{surtitre}</p>
      <h2 id={id} className="mt-3 font-display text-h2 font-bold">
        {titre}
      </h2>
    </div>
  );
}
