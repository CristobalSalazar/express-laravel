import { createModel, def } from "cheetah";
import { v4 as uuid } from "uuid";
import { RefreshTokenModel, UserModel } from "./collections";

export const RefreshToken = createModel(RefreshTokenModel, {
  options: { timestamps: { createdAt: true, updatedAt: false } },
  fields: {
    user: def.ref(UserModel),
    uuid: def.string.default(uuid),
  },
});
