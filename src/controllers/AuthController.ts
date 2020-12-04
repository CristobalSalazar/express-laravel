import User from "../models/User";
import Joi from "joi";
import { Request } from 'express';

class AuthController {
  async login(req: Request) {
    // hello
    //
    return req;
  }

  async register(req: Request & { validate: (obj: object) => any }) {
    req.validate({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });
    const { email, password } = req.body;
    const user = new User({
      email,
      password,
    });
    const result = await user.save();
    return result;
  }
}

export default new AuthController();
