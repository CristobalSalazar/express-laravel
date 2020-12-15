import { HttpError, Controller } from "cheetah";
import { PrivateGuards } from "./Guards";

export const User: Controller = [
  PrivateGuards,
  async ({ data }) => {
    if (data.user) {
      return data.user;
    } else {
      throw new HttpError(401, "Unauthorized");
    }
  },
];
