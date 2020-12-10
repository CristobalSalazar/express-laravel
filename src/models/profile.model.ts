import { createModel, types } from "cheetah";
import { UserCollection } from "./collections";

export interface IProfile {
  bio: string;
  user: string;
  avatarUrl: string;
  coverPhotoUrl: string;
}

export const ProfileModelName = "profiles";

export const Profile = createModel<IProfile>({
  modelName: ProfileModelName,
  schema: {
    user: types().ref(UserCollection).required(),
    bio: types().string().required(),
    avatarUrl: types().string().required(),
    coverPhotoUrl: types().string().required(),
  },
});
