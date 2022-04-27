module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base"],
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

  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    quotes: ["error", "double"],
    "import/extensions": ["error", "never"],
    "prettier/prettier": ["error"],
  },
};
