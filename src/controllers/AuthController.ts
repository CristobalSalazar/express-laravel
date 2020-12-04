import UserModel from '../models/User'
import Joi from 'joi'
import HttpError from '../lib/errors/http-error'

class AuthController {
  async login(req: any) {
    req.validate(
      {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      new HttpError(400, 'Email must be valid and password is required')
    )

    return { ok: 1 }
  }

  async register(req: any) {
    req.validate({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    })

    const { email, password } = req.body
    const user = new UserModel({
      email,
      password,
    })
    const result = await user.save()
    return result
  }
}

export default new AuthController()
