// @ts-check

import eslint from "@eslint/js";
import { config } from 'process';
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  config:{
    rules: {
      "@typescript-eslint/no-unused-vars": "warn"
    }
  }
);
