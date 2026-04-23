const eslintConfigLwc = require("@salesforce/eslint-config-lwc");
const graphAnalyzer = require("@salesforce/eslint-plugin-lwc-graph-analyzer");

const globals = require("globals");

module.exports = [
  {
    ignores: ["!force-app/main/default/lwc/**"],
  },
  ...eslintConfigLwc.configs.recommended,
  {
    ...graphAnalyzer.configs.recommended,
    plugins: {
      "@salesforce/lwc-graph-analyzer": graphAnalyzer,
    },
  },
  {
    files: ["**/__tests__/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    // lightning/uiGraphQLApi is required for offline support
    rules: {
      "@lwc/lwc/newer-version-available": "off",
    },
  },
];
