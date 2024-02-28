module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json",
  },
};
