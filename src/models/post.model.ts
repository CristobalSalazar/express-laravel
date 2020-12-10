import { createModel, types } from "cheetah";
import { CommentModel, PostModel, UserCollection } from "./collections";

export interface IPost {
  title: string;
  body: string;
  author: string;
  comments?: string[];
}
export const Post = createModel<IPost>({
  modelName: PostModel,
  schema: {
    title: types().string().required(),
    body: types().string().text().required(),
    author: types().ref(UserCollection).autopopulate(),
    comments: [types().ref(CommentModel).autopopulate()],
  },
  options: {
    timestamps: true,
  },
  hooks: (schema) => {},
});
