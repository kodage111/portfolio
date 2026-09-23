import type { MDXComponents } from 'mdx/types';

/** Composants injectés dans chaque fichier MDX. Requis par `@next/mdx` avec l'App Router. */
export function useMDXComponents(composants: MDXComponents): MDXComponents {
  return { ...composants };
}
