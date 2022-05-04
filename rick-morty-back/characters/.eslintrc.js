module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb-base",
    "prettier",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },

  plugins: ["@typescript-eslint", "prettier", "jest"],
  rules: {
    quotes: ["error", "double"],
    "import/extensions": ["error", "never"],
    "prettier/prettier": ["error"],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    indent: "off",
    "comma-dangle": 0,
  },
};
