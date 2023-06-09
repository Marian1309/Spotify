/** @type {import('prettier').Config} */

const isTailwind = process.env.TAILWIND

const baseRules = {
  printWidth: 90,
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
    '^@types',
    '^@fonts',
    '^@prismaClient',
    '^@nextAuth',
    '^@providers',
    '^@utils',
    '^@hooks',
    '^@components',
    '^@styles',
    '^../(.*)$',
    '^./(.*)$'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports']
}

const withTailwind = {
  ...baseRules,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss']
}

module.exports = isTailwind ? withTailwind : baseRules
