// .prettierrc.js

module.exports = {
  bracketSpacing: false,
  overrides: [
    // see other parsers https://prettier.io/docs/en/options.html#parser
    {
      files: '*.json',
      options: {
        parser: 'json5',
        singleQuote: false,
      },
    },
  ],
  parser: 'babel',
  printWidth: 120,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  bracketSpacing: false,
};
