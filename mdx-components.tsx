import type { MDXComponents } from 'mdx/types';

/** Composants injectés dans chaque MDX : titres, paragraphes et listes aux couleurs du site. */
export function useMDXComponents(composants: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-10 font-display text-h3 font-bold text-texte first:mt-0">{children}</h2>
    ),
    p: ({ children }) => <p className="mt-4 text-corps-large text-texte-secondaire">{children}</p>,
    ul: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-corps-large text-texte-secondaire">{children}</ul>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-texte">{children}</strong>,
    a: ({ href, children }) => (
      <a href={href} className="text-accent underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    ...composants,
  };
}
