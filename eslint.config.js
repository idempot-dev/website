import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "no-const-assign": "error",
      "no-debugger": "error",
      "no-unreachable": "error",
      curly: ["error", "all"],
      eqeqeq: ["error", "always"],
      "guard-for-in": "error",
      "no-empty": "error",
      "no-eval": "error",
      "no-floating-decimal": "error",
      "no-new-wrappers": "error",
      "no-param-reassign": "error",
      "no-proto": "error",
      "no-script-url": "error",
      "no-throw-literal": "error",
      "no-useless-call": "error",
      "no-useless-concat": "error",
      "no-void": "error",
      "no-with": "error",
      "prefer-const": "error",
      strict: ["error", "global"],
      yoda: "error"
    }
  },
  prettier
];
