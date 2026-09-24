'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Visionneuse, type ImageVisionneuse, type LibellesVisionneuse } from './Visionneuse';

interface ProprietesGalerie {
  images: ImageVisionneuse[];
  titre: string;
  libelles: LibellesVisionneuse;
}

/** Grille de captures ; un clic ouvre la visionneuse. Rien n'est rendu sans image. */
export function Galerie({ images, titre, libelles }: ProprietesGalerie) {
  const [index, setIndex] = useState<number | null>(null);
  if (images.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="font-display text-h3 font-bold">{titre}</h2>
      <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={image.alt}
              className="group relative block aspect-navigateur w-full overflow-hidden rounded-puce border border-bordure bg-surface-elevee"
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(min-width: 768px) 25vw, 45vw"
                className="object-cover object-top transition-transform duration-300 ease-sortie group-hover:scale-102"
              />
            </button>
            <p aria-hidden className="mt-2 text-sm text-texte-secondaire">{image.alt}</p>
          </li>
        ))}
      </ul>
      {index !== null && <Visionneuse images={images} indexInitial={index} onFermer={() => setIndex(null)} libelles={libelles} />}
    </section>
  );
}
