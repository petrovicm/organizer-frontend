import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import globals from "globals"; // 👈 add this

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        ecmaFeatures: { jsx: true },
      },
      // 👇 tell ESLint you’re in a browser so window/localStorage are defined
      globals: {
        ...globals.browser,
        // (optional) if you also run code in Node (tests, scripts):
        // ...globals.node,
        // (optional) for Vitest/Jest:
        // ...globals.jest,
        // ...globals.vitest,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },
    rules: {
      // ... your existing rules unchanged
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
        baseUrl: "src",
      },
    },
  },

  // Optional: Node-only overrides for config files & scripts
  {
    files: ["**/*.config.{js,cjs,mjs}", "scripts/**/*.{js,ts}"],
    ignores: ["node_modules/**"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
];
