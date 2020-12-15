import { HttpError, Controller } from "cheetah";
import Joi from "joi";
import { Profile } from "../models/profile.model";
import { PrivateGuards } from "./Guards";

export const FindProfile: Controller = [
  PrivateGuards,
  async ({ data }) => {
    const profile = await Profile.find({ user: data.user.sub });
    if (!profile) throw new HttpError(404, "Profile not found");
    else return profile;
  },
];

export const UpdateProfile: Controller = [
  PrivateGuards,
  async ({ req, validate }) => {
    const { bio, avatar } = validate(req.body, {
      bio: Joi.string().min(1).max(1000),
      avatar: Joi.string(),
    });
    const res = await Profile.findOneAndUpdate({
      bio,
      avatarUrl: avatar,
    });
    return res;
  },
];
