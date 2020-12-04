import {
  SchemaDefinition,
  SchemaOptions,
  Schema,
  model,
  Document,
} from 'mongoose'

type CreateModelOptions = {
  name: string
  schema: SchemaDefinition
  options?: SchemaOptions
  hooks?: (schema: Schema) => void
}
export function createModel<T>(opts: CreateModelOptions) {
  let schema = new Schema(opts.schema, opts.options)
  opts.hooks && opts.hooks(schema)
  return model<T & Document>(opts.name, schema)
}
