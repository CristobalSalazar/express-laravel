import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
export function createAccessToken(userid: string) {
  return jwt.sign({}, JWT_SECRET, {
    expiresIn: "10m",
    subject: userid,
  });
}
