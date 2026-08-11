export type ApiProtocol = "graphql" | "rest"

export interface ApiDescriptor {
  name: string
  protocol: ApiProtocol
}

export const defineApi = (name: string, protocol: ApiProtocol): ApiDescriptor => {
  return { name, protocol }
}
