import { createModel, types } from "cheetah";
import { Document } from "mongoose";
import bcrypt from "bcryptjs";
import { UserCollection, RefreshTokenModel, ProfileModel } from "./collections";
import { RefreshToken } from "./refresh-token.model";

export const UserToken = "users";

export interface IUser {
  name: string;
  email: string;
  email_verified: boolean;
  password: string;
  profile?: string;
  refreshToken?: string;
  following?: [string];
  posts?: [string];
  role?: string;
}

export const User = createModel<IUser>({
  modelName: UserToken,
  schema: {
    profile: types().ref(ProfileModel).autopopulate(),
    refreshToken: types().ref(RefreshTokenModel).unique().hide(),
    name: types().string().required().trim(),
    email: types().string().required().lowercase().unique(),
    email_verified: types().bool().default(false),
    following: [types().ref(UserCollection)],
    password: types().string().required().min(8).hide(),
    role: types()
      .string()
      .allow("admin", "user", "unverified")
      .default("unverified"),
  },
  options: {
    timestamps: true,
  },
  hooks: (schema) => {
    schema.methods = {
      async comparePassword(password: string) {
        return await bcrypt.compare(password, this.password);
      },
      async createRefreshToken() {
        const refreshToken = await RefreshToken.create({ user: this._id });
        this.refreshToken = refreshToken._id;
        await this.save();
        return refreshToken.uuid;
      },
    };

    schema.statics = {
      async findByEmail(email: string) {
        return await this.findOne({ email })
      }
    }

    schema.pre<Document & IUser>("save", function (next) {
      if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10);
      }
      next(null);
    });
  },
});
