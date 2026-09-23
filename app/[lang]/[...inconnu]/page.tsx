import { notFound } from 'next/navigation';

/** Tout chemin non reconnu sous une langue rend la 404 localisée. */
export default function PageInconnue() {
  notFound();
}
