import { defineConfig } from "webanvil"

export default defineConfig({
  format: { semi: false },
  lint: {
    categories: { correctness: "error", suspicious: "error", perf: "error" },
    plugins: ["oxc", "typescript", "unicorn"],
  },
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
})
