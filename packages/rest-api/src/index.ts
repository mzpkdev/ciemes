import { defineApi, type ApiDescriptor } from "@ciemes/core";

export function defineRestApi(name: string): ApiDescriptor {
  return defineApi(name, "rest");
}
