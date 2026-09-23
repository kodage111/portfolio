import { describe, expect, it } from 'vitest';
import { experiences } from '@/content/experiences';
import { formations } from '@/content/formations';
import { GROUPES_STACK, technologies, technologiesParGroupe } from '@/content/stack';
import { coordonnees, lienWhatsapp } from '@/lib/contact';

describe('expériences', () => {
  it('trois postes, du plus récent au plus ancien', () => {
    expect(experiences.map((e) => e.id)).toEqual(['titans', 'freelance', 'spreeloop']);
    for (let i = 1; i < experiences.length; i += 1) {
      expect(experiences[i - 1].debut > experiences[i].debut).toBe(true);
    }
  });

  it('seule la première est en cours', () => {
    expect(experiences.map((e) => e.fin === null)).toEqual([true, false, false]);
  });

  it('autant de points en fr qu’en en', () => {
    for (const experience of experiences) {
      expect(experience.points.en.length).toBe(experience.points.fr.length);
      expect(experience.points.fr.length).toBeGreaterThan(0);
    }
  });
});

describe('formations', () => {
  it('du plus récent au plus ancien', () => {
    for (let i = 1; i < formations.length; i += 1) {
      expect(formations[i - 1].debut > formations[i].debut).toBe(true);
    }
  });
});

describe('stack', () => {
  it('chaque groupe a au moins une technologie', () => {
    for (const groupe of GROUPES_STACK) expect(technologiesParGroupe(groupe).length).toBeGreaterThan(0);
  });

  it('noms uniques et icônes devicon', () => {
    const noms = technologies.map((t) => t.nom);
    expect(new Set(noms).size).toBe(noms.length);
    for (const t of technologies) {
      expect(t.icone).toMatch(/^https:\/\/cdn\.jsdelivr\.net\/gh\/devicons\/devicon@latest\/icons\/.+\.svg$/);
    }
  });
});

describe('contact', () => {
  it('normalise le numéro WhatsApp et construit le lien', () => {
    process.env.NEXT_PUBLIC_WHATSAPP = '+237 6 00 00 00 00';
    expect(coordonnees().whatsapp).toBe('237600000000');
    expect(lienWhatsapp('237600000000', 'Bonjour')).toBe('https://wa.me/237600000000?text=Bonjour');
    expect(lienWhatsapp('', 'Bonjour')).toBe('');
  });

  it('retire la barre finale de l’URL du site', () => {
    process.env.NEXT_PUBLIC_URL_SITE = 'https://exemple.com/';
    expect(coordonnees().urlSite).toBe('https://exemple.com');
  });
});
