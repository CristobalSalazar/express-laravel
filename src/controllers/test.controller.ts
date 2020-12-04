import { Request, Response } from 'express'
import { AppRequest } from '../lib/router'

export default {
  test(req: AppRequest, res: Response) {
    res.send('Hello')
  },
}
