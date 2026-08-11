import { defineApi, type ApiDescriptor } from "@ciemes/core"

export const defineRestApi = (name: string): ApiDescriptor => {
  return defineApi(name, "rest")
}
