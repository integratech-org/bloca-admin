module.exports = {
  // Type check TypeScript files
  "**/*.(ts|tsx)": () => "bun ts-check",

  // Lint & Prettify TS and JS files
  "**/*.(ts|tsx|js)": () => ["bun lint:fix", "bun prettier:fix"],

  // Prettify only Markdown and JSON files
  "**/*.(md|json)": () => "bun prettier:fix",
}
