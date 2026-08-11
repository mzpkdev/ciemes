import { defineApi, type ApiDescriptor } from "@ciemes/core"

export const defineGraphqlApi = (name: string): ApiDescriptor => {
  return defineApi(name, "graphql")
}
