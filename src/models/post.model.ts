import { createModel, def } from "cheetah";
import { CommentModel, PostModel, UserModel } from "./collections";

export const Post = createModel(PostModel, {
  fields: {
    title: def.string.required,
    body: def.string.text.required,
    author: def.ref(UserModel).autopopulate,
    comments: [def.ref(CommentModel).autopopulate],
  },
  options: {
    timestamps: true,
  },
});
