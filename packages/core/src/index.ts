type FieldOptions<TRequired extends boolean | undefined> = {
  readonly required?: TRequired
}

type FieldRequiredness<TRequired extends boolean | undefined> = TRequired extends true
  ? { readonly required: true }
  : { readonly required?: TRequired }

export type TextFieldDescriptor<TRequired extends boolean | undefined = boolean | undefined> =
  FieldRequiredness<TRequired> & {
    readonly type: "text"
  }

export type MarkdownFieldDescriptor<TRequired extends boolean | undefined = boolean | undefined> =
  FieldRequiredness<TRequired> & {
    readonly type: "markdown"
  }

export type FieldDescriptor = TextFieldDescriptor | MarkdownFieldDescriptor

export type FieldMap = Record<string, FieldDescriptor>

export type InferField<TField extends FieldDescriptor> = TField extends
  | TextFieldDescriptor
  | MarkdownFieldDescriptor
  ? string
  : never

export type InferFields<TFields extends FieldMap> = {
  [TName in keyof TFields as TFields[TName] extends { readonly required: true }
    ? TName
    : never]-?: InferField<TFields[TName]>
} & {
  [TName in keyof TFields as TFields[TName] extends { readonly required: true }
    ? never
    : TName]?: InferField<TFields[TName]>
}

export type Collection<TName extends string = string, TFields extends FieldMap = FieldMap> = {
  readonly name: TName
  readonly fields: TFields
}

export type InferCollection<TCollection extends Collection> = InferFields<TCollection["fields"]>

export interface StorageAdapter<TData> {
  list(): Promise<readonly string[]>
  read(id: string): Promise<TData | null>
  write: (id: string, data: TData) => Promise<void>
  delete(id: string): Promise<void>
}

export type MountedCollection<TCollection extends Collection = Collection> = {
  readonly schema: TCollection
  readonly storage: StorageAdapter<InferCollection<TCollection>>
}

type MountedCollectionInput = {
  readonly schema: Collection
  readonly storage: unknown
}

type ValidateMountedCollections<TMountedCollections extends readonly MountedCollectionInput[]> = {
  readonly [TIndex in keyof TMountedCollections]: TMountedCollections[TIndex] extends {
    readonly schema: infer TCollection extends Collection
    readonly storage: infer TStorage
  }
    ? TStorage extends StorageAdapter<InferCollection<TCollection>>
      ? TMountedCollections[TIndex]
      : never
    : never
}

type MountedSchemaByName<
  TMountedCollections extends readonly MountedCollectionInput[],
  TName extends TMountedCollections[number]["schema"]["name"],
> = Extract<TMountedCollections[number]["schema"], { readonly name: TName }>

export interface CollectionApi<TCollection extends Collection> {
  list(): Promise<readonly string[]>
  read(id: string): Promise<InferCollection<TCollection> | null>
  write(id: string, data: InferCollection<TCollection>): Promise<void>
  delete(id: string): Promise<void>
}

export interface Ciemes<
  TMountedCollections extends readonly MountedCollectionInput[] = readonly MountedCollection[],
> {
  collection<const TName extends TMountedCollections[number]["schema"]["name"]>(
    collection: Collection<TName>,
  ): CollectionApi<MountedSchemaByName<TMountedCollections, TName>>
}

export type FieldFactory = {
  text: {
    (): TextFieldDescriptor<undefined>
    <const TRequired extends boolean>(
      options: FieldOptions<TRequired>,
    ): TextFieldDescriptor<TRequired>
  }
  markdown: {
    (): MarkdownFieldDescriptor<undefined>
    <const TRequired extends boolean>(
      options: FieldOptions<TRequired>,
    ): MarkdownFieldDescriptor<TRequired>
  }
}

export type DefineCollection = <
  const TName extends string,
  const TFields extends FieldMap,
>(definition: {
  readonly name: TName
  readonly fields: TFields
}) => Collection<TName, TFields>

export type CreateCiemes = <
  const TMountedCollections extends readonly MountedCollectionInput[],
>(options: {
  readonly collections: TMountedCollections & ValidateMountedCollections<TMountedCollections>
}) => Ciemes<TMountedCollections>
