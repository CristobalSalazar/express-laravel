import User from "../models/User";
import Joi from "joi";

class AuthController {
  async login(req: any) {}

  async register(req: any) {
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
