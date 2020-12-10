import { createModel, types } from "cheetah";
import { CommentModel, UserCollection } from "./collections";

interface IComment {
  body: string;
  author: string;
  replies: string[];
  likes: number;
}

export const Comment = createModel<IComment>({
  modelName: CommentModel,
  schema: {
    body: types().string().required().text(),
    author: types().ref(UserCollection).required(),
    replies: [types().ref(CommentModel)],
    likes: types().number().default(0),
  },
});
