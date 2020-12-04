import { Request } from 'express'
import { ObjectSchema } from 'joi'
import Joi from 'joi'
import HttpError from '../errors/http-error'

export interface CustomRequest extends Request {
  validate: (rules: ObjectSchema) => any
}

export default function validate(
  req: any,
  res: Express.Response,
  next: Function
) {
  req.validate = function (schema: Object, httpError?: HttpError) {
    const joiSchema = Joi.object(schema)
    const { value, error } = joiSchema.validate(req.body)
    if (error) {
      const errmsg = error.details
        .map(detail => detail.message)
        .join(', ')
        .replace(/"/g, "'")

      throw httpError || new HttpError(400, errmsg)
    } else {
      return value
    }
  }

  next()
}
