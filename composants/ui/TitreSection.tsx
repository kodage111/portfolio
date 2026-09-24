interface ProprietesTitreSection {
  surtitre: string;
  titre: string;
  /** Ancre du titre. */
  id?: string;
  centre?: boolean;
  /** Niveau de titre HTML rendu. `'h1'` pour le titre de page (une seule fois par page), sinon `'h2'` (défaut). */
  niveau?: 'h1' | 'h2';
}

/** Surtitre mono accent + titre display d'une section. */
export function TitreSection({ surtitre, titre, id, centre = false, niveau = 'h2' }: ProprietesTitreSection) {
  const Balise = niveau;
  return (
    <div className={centre ? 'text-center' : ''}>
      <p className="font-mono text-mono uppercase tracking-widest text-accent">{surtitre}</p>
      <Balise id={id} className="mt-3 font-display text-h2 font-bold">
        {titre}
      </Balise>
    </div>
  );
}
