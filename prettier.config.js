/** @type {import('prettier').Config} */

const isTailwind = process.env.TAILWIND

const baseRules = {
  printWidth: 80,
  trailingComma: 'none',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  arrowParens: 'always',
  useTabs: false,
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '^@types|^@db_types',
    '^@providers|^@context',
    '^@utils',
    '^@hooks|^@hooks/zustand|^./zustand|^@actions',
    '^@common',
    '^@styles',
    '^./components',
    '^../(.*)$',
    '^./(.*)$'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports']
}

const withTailwind = {
  ...baseRules,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss'
  ]
}

module.exports = isTailwind ? withTailwind : baseRules
