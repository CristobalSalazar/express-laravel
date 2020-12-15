import bcrypt from "bcryptjs";
import { RefreshToken } from "./refresh-token.model";
import { UserModel, ProfileModel, RefreshTokenModel } from "./collections";
import { createModel, def as d } from "cheetah";

export const User = createModel(UserModel, {
  fields: {
    name: d.string.required.trim,
    email: d.string.required.lowercase.unique,
    email_verified: d.boolean.default(false).hide,
    password: d.string.required.minlength(8).hide,
    profile: d.ref(ProfileModel),
    refresh_token: d.ref(RefreshTokenModel).hide,
    role: d.string.enum("admin", "user", "unverified").default("unverified"),
  },
  methods: {
    setVerified() {
      if (this.role === "unverified") this.role = "user";
      this.email_verified = true;
    },
    async comparePassword(other: string) {
      return await bcrypt.compare(other, this.password!);
    },
    async newRefreshToken() {
      const token = new RefreshToken();
      token.user = this._id;
      await token.save();
      this.refresh_token = token._id;
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
        this.password = await bcrypt.hash(this.password!, 10);
      }
    },
  },
  options: { timestamps: true },
});
