import { HttpError, Controller } from "cheetah";
import { User } from "../models/user.model";
import joi from "joi";

export const Register: Controller = [
  async ({ req, validate }) => {
    const newUser = validate(req.body, {
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
    });
    const userExists = await User.findByEmail(newUser.email);
    if (userExists) throw new HttpError(400, "User with email already exists");
    const user = new User(newUser);
    await user.save();
    return user;
  },
];
