import { describe, expect, it } from "vitest"

import { defineGraphqlApi } from "./index.js"

describe("defineGraphqlApi", () => {
  it("describes a GraphQL API", () => {
    expect(defineGraphqlApi("catalog")).toEqual({ name: "catalog", protocol: "graphql" })
  })
})
