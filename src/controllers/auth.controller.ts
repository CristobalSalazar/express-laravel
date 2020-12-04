import UserModel from '../models/user.model.ts'
import Joi from 'joi'
import HttpError, { BadRequestError } from '../lib/errors/http-errors'
import { AppRequest } from '../lib/router'

export default {
  async login(req: AppRequest) {
    req.validate(
      {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      new HttpError(400, 'Email must be valid and password is required')
    )
    return { ok: 1 }
  },

  async register(req: AppRequest) {
    const { name, email, password } = req.validate({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    })

    const userExists = await UserModel.findOne({ email })

    if (userExists) {
      throw new BadRequestError('User with email already exists')
    }

    const user = await UserModel.create({
      name,
      email,
      password,
    })
    return user.toObject()
  },
}
