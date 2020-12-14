import { createModel, def } from "cheetah";
import { v4 as uuid } from "uuid";
import { RefreshTokenModel, UserModel } from "./collections";

export const RefreshToken = createModel({
  modelName: RefreshTokenModel,
  options: { timestamps: { createdAt: true, updatedAt: false } },
  schema: {
    user: def.ref(UserModel),
    uuid: def.string.required,
  },
  pre: {
    save() {
      this.uuid = uuid();
    },
  },
});
