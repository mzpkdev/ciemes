import { describe, expect, it } from "vitest";

import { defineApi } from "./index.js";

describe("defineApi", () => {
  it("describes an API", () => {
    expect(defineApi("catalog", "rest")).toEqual({ name: "catalog", protocol: "rest" });
  });
});
