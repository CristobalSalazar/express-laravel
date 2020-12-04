import { createModel, hasMany } from '../lib/models/create-model'

export type User = {
  name: string
  email: string
  password: string
}

export default createModel<User>({
  name: 'User', // a problem how can I fix this?
  options: {
    timestamps: true,
  },
  schema: {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    posts: hasMany('Posts', true),
  },
  hooks: schema => {
    schema.pre('save', () => {
      console.log('saving User')
    })
  },
})
