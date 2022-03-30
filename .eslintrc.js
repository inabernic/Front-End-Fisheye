module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "babel-eslint",
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
  },
  rules: {
    "no-console": "off",
    "no-invalid-regexp": "warn",
  },
};
