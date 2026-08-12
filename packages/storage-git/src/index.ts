type IsAny<TValue> = 0 extends 1 & TValue ? true : false

type IsStringField<TValue> =
  IsAny<TValue> extends true
    ? false
    : [TValue] extends [string | undefined]
      ? [Extract<TValue, string>] extends [never]
        ? false
        : true
      : false

type StringFieldKey<TData> = Extract<
  {
    [TKey in keyof TData]-?: IsStringField<TData[TKey]> extends true ? TKey : never
  }[keyof TData],
  string
>

export interface GitDirectoryOptions<TData> {
  readonly path: string
  readonly bodyField: StringFieldKey<TData>
}

export type GitDirectoryStorageFactory = <TData>(options: GitDirectoryOptions<TData>) => {
  list: () => Promise<readonly string[]>
  read: (id: string) => Promise<TData | null>
  write: (id: string, data: TData) => Promise<void>
  delete: (id: string) => Promise<void>
}
