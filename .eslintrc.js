module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb-base",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "import/prefer-default-export": "off",
    "max-len": [
      "error",
      {
        ignoreComments: true,
        ignoreUrls: true,
        code: 150,
      },
    ],
    "no-console": "off",
    "no-unused-vars": "off",
    "no-unsafe-optional-chaining": "off",
    "no-await-in-loop": "off",
    "no-restricted-syntax": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-continue": "off",
    "no-cond-assign": "off",
    "no-eval": "off",
    "no-param-reassign": "off",
  },
};
