import { createModel, def } from "cheetah";
import bcrypt from "bcryptjs";
import { UserModel, ProfileModel, RefreshTokenModel } from "./collections";
import { RefreshToken } from "./refresh-token.model";

export const User = createModel({
  modelName: UserModel,
  options: { timestamps: true },
  schema: {
    name: def.string.required.trim,
    profile: def.ref(ProfileModel).autopopulate,
    email: def.string.required.lowercase.unique,
    email_verified: def.boolean.default(false),
    following: [def.ref(UserModel)],
    password: def.string.required.minlength(8).hide,
    refreshToken: def.ref(RefreshTokenModel).autopopulate.unique.hide,
    role: def.string.allow("admin", "user", "unverified").default("unverified"),
  },
  methods: {
    async comparePassword(other: string) {
      return await bcrypt.compare(other, this.password);
    },
    async newRefreshToken() {
      const token = new RefreshToken();
      token.user = this.id!;
      await token.save();
      this.refreshToken = token.id!;
      return token.uuid;
    },
  },
  statics: {
    async findByEmail(email: string) {
      return await this.findOne({ email });
    },
  },
  pre: {
    async save() {
      if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
      }
    },
  },
});
