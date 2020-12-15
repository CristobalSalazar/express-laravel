import { HttpError, Controller } from "cheetah";
import { verifyToken } from "../services/jwt.service";

export const DoubleSubmitGuard: Controller = [
  ({ req }) => {
    const token = extractTokenFromHeaders(req.headers);
    if (!req.cookies || !req.cookies.access_token)
      throw new HttpError(400, "Missing Cookies");
    if (token !== req.cookies.access_token) {
      throw new HttpError(401, "Tokens do not match");
    }
  },
];

export const AccessTokenGuard: Controller = [
  ({ req, data }) => {
    const token = extractTokenFromHeaders(req.headers);
    try {
      const decoded = verifyToken(token);
      data.user = decoded;
    } catch (err) {
      throw new HttpError(401, "Invalid token");
    }
  },
];

export const PrivateGuards: Controller = [DoubleSubmitGuard, AccessTokenGuard];

function extractTokenFromHeaders(headers: any) {
  if (!headers.authorization)
    throw new HttpError(400, "Missing Authorization header");
  const [bearer, token] = headers.authorization.split(" ");
  if (!bearer || !token || bearer.toLowerCase() !== "bearer")
    throw new HttpError(400, "Invalid Authorization format");
  else {
    return token;
  }
}
