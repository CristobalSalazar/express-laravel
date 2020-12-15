import { createModel, def } from "cheetah";
import { ProfileModel, UserModel } from "./collections";

export const Profile = createModel(ProfileModel, {
  fields: {
    user: def.ref(UserModel).required,
    bio: def.string.required,
    avatarUrl: def.string.required,
    coverPhotoUrl: def.string.required,
  },
});
