import type { ReactNode } from 'react';
import '../globals.css';

/** Mise en page racine temporaire — remplacée par la version complète à la tâche 8. */
export default async function MiseEnPage({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className="bg-fond font-sans text-texte">{children}</body>
    </html>
  );
}
