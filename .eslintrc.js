module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb-base",
    "plugin:import/recommended",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  settings: {
    "import/extensions": [".ts"],
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "max-classes-per-file": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "max-len": "off",
    "no-console": "off",
    "no-unused-vars": "off",
    "no-unsafe-optional-chaining": "off",
    "no-await-in-loop": "off",
    "no-restricted-syntax": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-continue": "off",
    "no-cond-assign": "off",
    "no-eval": "off",
    "no-param-reassign": "off",
    "no-promise-executor-return": "off",
    "consistent-return": "off",
  },
};
