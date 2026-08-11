export type ApiProtocol = "graphql" | "rest";

export interface ApiDescriptor {
  name: string;
  protocol: ApiProtocol;
}

export function defineApi(name: string, protocol: ApiProtocol): ApiDescriptor {
  return { name, protocol };
}
