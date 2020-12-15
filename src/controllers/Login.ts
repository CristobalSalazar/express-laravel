import joi from "joi";
import { AppResponse, HttpError, Controller } from "cheetah";
import { User } from "../models/user.model";
import { createAccessToken } from "../services/jwt.service";

export const Login: Controller = [
  async ({ req, res, validate }) => {
    const { email, password } = validate(req.body, {
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required(),
      password: joi.string().required(),
    });
    const user = await User.findByEmail(email);
    if (!user) throw new HttpError(401, "User with email not found");
    const passwordsMatch = await user.comparePassword(password);
    if (passwordsMatch) {
      const refreshToken = await user.newRefreshToken();
      const accessToken = createAccessToken(user._id.toString());
      setCookies(res, accessToken, refreshToken!);
      return {
        refresh_token: refreshToken,
        access_token: accessToken,
        user,
      };
    } else {
      throw new HttpError(401, "Invalid email or password");
    }
  },
];

function setCookies(
  res: AppResponse,
  accessToken: string,
  refreshToken: string
) {
  res.cookie("access_token", accessToken);
  res.cookie("refresh_token", refreshToken);
}
