import { User } from "../models/user.model";
import joi from "joi";
import { HttpError, AppResponse, AppRouteHandler, AppRequest } from "cheetah";
import { createAccessToken, verifyToken } from "../services/jwt.service";
import Joi from "joi";

function setCookies(
  res: AppResponse,
  accessToken: string,
  refreshToken: string
) {
  res.cookie("access_token", accessToken);
  res.cookie("refresh_token", refreshToken);
}

export const accessTokenCheck: AppRouteHandler = (req) => {
  if (!req.headers.authorization)
    throw new HttpError(400, "Missing authorization header");

  const [bearer, token] = req.headers.authorization.split(" ");
  if (!bearer || !token || bearer.toLowerCase() !== "bearer")
    throw new HttpError(400, "Invalid Authorization format");

  try {
    const decoded = verifyToken(token);
    req.setUser(decoded);
  } catch (err) {
    throw new HttpError(401, "Invalid token");
  }
};

export async function login(req: AppRequest, res: AppResponse) {
  const { email, password } = req.validate({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().required(),
  });

  const user = await User.findByEmail(email);
  if (!user) throw new HttpError(401, "User with email not found");
  const passwordsMatch = await user.comparePassword(password);

  if (passwordsMatch) {
    const refreshToken = await user.newRefreshToken();
    const accessToken = createAccessToken(user.id!);
    setCookies(res, accessToken, refreshToken!);
    return {
      refresh_token: refreshToken,
      access_token: accessToken,
      user,
    };
  } else throw new HttpError(401, "Invalid usernamr or password");
}

export const register: AppRouteHandler = async (req) => {
  const { name, email, password } = req.validate({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  });

  const userExists = await User.findOne({ email });
  if (userExists) throw new HttpError(400, "User with email already exists");
  const user = new User({ name, email, password });
  await user.save();
  return user;
};

export const user: AppRouteHandler = async (req: any) => {
  if (req.user) {
    return req.user;
  } else {
    throw new HttpError(401, "Unauthorized");
  }
};
