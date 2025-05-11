import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import ts, { type InfiniteDepthConfigWithExtends } from 'typescript-eslint';

const jsConfig: InfiniteDepthConfigWithExtends = {
  files: ['**/*.js'],
  extends: [js.configs.recommended],
  rules: {
    eqeqeq: 'error',
  },
};

const tsConfig: InfiniteDepthConfigWithExtends = {
  files: ['**/*.ts', '**/*.svelte', '**/*.svelte.ts'],
  extends: [
    js.configs.recommended,
    ...ts.configs.strictTypeChecked,
    ...ts.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: true,
    },
  },
  rules: {
    ...jsConfig.rules,
  },
};

export default ts.config(
  {
    ignores: ['pnpm-lock.yaml', '**/node_modules', '**/.wrangler'],
  },
  jsConfig,
  tsConfig,
  prettier,
);
