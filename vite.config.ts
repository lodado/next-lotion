/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias '@' to 'src' folder
    },
  },

  test: {
    globals: true, // Enables global describe, it, expect
    environment: "jsdom",

    setupFiles: ["./src/shared/libs/vitest/setupTests.ts"], // Setup file for tailwindcss

    include: ["src/**/*.test.{ts,tsx}"], // Includes all test files
  },
});
