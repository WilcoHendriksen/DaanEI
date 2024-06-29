module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    eqeqeq: ["error"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "no-unexpected-multiline": "error",
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxBOF: 0,
        maxEOF: 0
      }
    ],
    "jsx-quotes": ["error", "prefer-double"]
  }
}
