import { defineApi, type ApiDescriptor } from "@ciemes/core";

export function defineGraphqlApi(name: string): ApiDescriptor {
  return defineApi(name, "graphql");
}
