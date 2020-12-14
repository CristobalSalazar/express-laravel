import { createModel, def } from "cheetah";
import { ProfileModel, UserModel } from "./collections";

export const Profile = createModel({
  modelName: ProfileModel,
  schema: {
    user: def.ref(UserModel).required,
    bio: def.string.required,
    avatarUrl: def.string.required,
    coverPhotoUrl: def.string.required,
  },
});
