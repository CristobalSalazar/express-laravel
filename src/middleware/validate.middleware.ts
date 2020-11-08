import { Request } from "express";
import { ObjectSchema } from "joi";
import Joi from "joi";
import HttpError from "../lib/errors/http-error";

export interface CustomRequest extends Request {
  validate: (rules: ObjectSchema) => any;
}

export default function validate(req: any, res: any, next: any) {
  req.validate = function (schema: Object) {
    const joiSchema = Joi.object(schema);
    const { value, error } = joiSchema.validate(req.body);
    if (error) {
      const errmsg = error.details.map((d) => d.message).join(", ");
      throw new HttpError(400, errmsg); // throw the error
    } else {
      return value;
    }
  };
  next();
}
