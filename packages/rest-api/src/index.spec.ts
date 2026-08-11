import { describe, expect, it } from "vitest";

import { defineRestApi } from "./index.js";

describe("defineRestApi", () => {
  it("describes a REST API", () => {
    expect(defineRestApi("catalog")).toEqual({ name: "catalog", protocol: "rest" });
  });
});
