import { ImageResponse } from 'next/og';
import { profil } from '@/content/profil';
import { COULEURS_OG } from '@/lib/couleurs';
import { getDictionnaire } from '@/lib/i18n/dictionnaires';
import { langDepuis, type ParametresLang } from '@/lib/i18n/params';

/** Texte alternatif de l'image Open Graph. */
export const alt = 'Emmanuel Tene — Software Engineer';
/** Dimensions recommandées par Open Graph (1200 × 630). */
export const size = { width: 1200, height: 630 };
/** Format de sortie de l'image. */
export const contentType = 'image/png';

/** Image Open Graph des pages générales : nom, positionnement, accent. */
export default async function ImageOpenGraph({ params }: ParametresLang) {
  const lang = langDepuis((await params).lang);
  const dict = getDictionnaire(lang);
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
        <div style={{ fontSize: 28, color: COULEURS_OG.accent, letterSpacing: 6 }}>PORTFOLIO</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 80, fontWeight: 700 }}>{profil.nomCourt}</div>
          <div style={{ fontSize: 34, color: COULEURS_OG.secondaire }}>{dict.hero.positionnement}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
