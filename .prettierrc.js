/** @type {import('prettier').Config} */
const config = {
  printWidth: 100,
  tabWidth: 2,
  quoteProps: 'consistent',
  singleQuote: true,
  plugins: ['prettier-plugin-organize-imports'],
  overrides: [
    {
      files: ['**/*.jsonc'],
      options: {
        parser: 'json',
      },
    },
  ],
};

export default config;
