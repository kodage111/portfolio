import { defineConfig } from 'vitest/config';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = dirname(fileURLToPath(import.meta.url));

/** Tests purs (Node) sous `tests/`, alias `@` vers la racine comme dans tsconfig. */
export default defineConfig({
  resolve: { alias: { '@': racine } },
  test: { include: ['tests/**/*.test.ts'], environment: 'node' },
});
