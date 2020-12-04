import { createModel, hasOne } from 'lib/models/create-model'
import { User } from './user.model.ts'

export type Post = {
  title: string
  body: string
  user: User
}

const PostModel = createModel<Post>({
  name: 'Post',
  schema: {
    title: String,
    body: String,
    user: hasOne('User', true),
  },
})
