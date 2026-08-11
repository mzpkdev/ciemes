import { defineConfig } from "webanvil";

export default defineConfig({
  build: {
    mode: "node",
    entries: { ".": "src/index.ts" },
    outDir: "dist",
    formats: ["esm"],
    declaration: { generator: "tsgo" },
    sourcemap: true,
    platform: "node",
    target: "node22",
  },
  test: {
    environment: "node",
    include: ["src/**/*.spec.ts"],
  },
});
