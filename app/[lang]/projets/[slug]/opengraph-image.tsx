import { ImageResponse } from 'next/og';
import { COULEURS_OG } from '@/lib/couleurs';
import { trouverProjet } from '@/lib/contenu/projets';
import { langDepuis } from '@/lib/i18n/params';

export const alt = 'Étude de cas — Emmanuel Tene';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Image Open Graph d'une étude de cas : nom du projet, accroche, signature. */
export default async function ImageOpenGraphProjet({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: brut, slug } = await params;
  const lang = langDepuis(brut);
  const projet = trouverProjet(slug);
  const nom = projet?.nom ?? 'Portfolio';
  const accroche = projet?.accroche[lang] ?? '';
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: COULEURS_OG.fond,
          color: COULEURS_OG.texte,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 28, color: COULEURS_OG.accent, letterSpacing: 6 }}>CASE STUDY</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 80, fontWeight: 700 }}>{nom}</div>
          <div style={{ fontSize: 30, color: COULEURS_OG.secondaire, lineHeight: 1.3 }}>{accroche}</div>
        </div>
        <div style={{ fontSize: 26, color: COULEURS_OG.secondaire }}>Emmanuel Tene</div>
      </div>
    ),
    { ...size },
  );
}
