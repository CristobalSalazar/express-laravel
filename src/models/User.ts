import { createModel } from '../lib/models/create-model'

export type User = {
  email: string
  password: string
}

export default createModel<User>({
  name: 'User',
  schema: {
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
  },
  hooks: schema => {
    schema.pre('save', () => {
      console.log('saving User')
    })
  },
  options: {
    timestamps: true,
  },
})
