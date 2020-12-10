import { createModel, types } from "cheetah";
import { v4 as uuid } from "uuid";
import { UserCollection } from "./collections";

type TRefreshToken = {
  user: string;
  uuid?: string;
};

export const RefreshTokenModel = "refresh_tokens";

export const RefreshToken = createModel<TRefreshToken>({
  modelName: RefreshTokenModel,
  schema: {
    user: types().ref(UserCollection).required(),
    uuid: types().string().unique().default(uuid),
  },
  options: {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
});
