import { transform } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { PluginOption } from 'vite';

const tsSource = await readFile(resolve(__dirname, './virtualCloudflareWorkers.ts'), 'utf-8');
const { code } = await transform(tsSource, {
  loader: 'ts',
  format: 'esm',
});

export const virtualCloudflareWorkersPlugin: PluginOption = {
  name: 'virtual-cloudflare-workers',
  enforce: 'pre',
  resolveId(id) {
    if (id === 'cloudflare:workers') {
      return '\0cloudflare:workers';
    }
    return;
  },
  load(id) {
    if (id === '\0cloudflare:workers') {
      return code;
    }
    return;
  },
};
