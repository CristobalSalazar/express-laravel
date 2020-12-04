import { Request, Response, Router } from 'express'
import { WithValidate } from 'lib/middleware/validate.middleware'

export type AppRequest = Request & WithValidate
export type AppRouteHandler = (req: AppRequest, res: Response) => any

// underlying router instance
const router = Router()

// need to wrap the router instance
export default initRouter(router)

function initRouter(router: Router) {
  return {
    getExpressRouter() {
      return router
    },
    get(route: string, handler: AppRouteHandler) {
      router.get(route, withReturnValue(handler))
    },
    put(route: string, handler: AppRouteHandler) {
      router.put(route, withReturnValue(handler))
    },

    post(route: string, handler: AppRouteHandler) {
      router.post(route, withReturnValue(handler))
    },

    del(route: string, handler: AppRouteHandler) {
      router.delete(route, withReturnValue(handler))
    },
  }
}

function withReturnValue(handler: AppRouteHandler) {
  return async function (req: Request, res: Response) {
    try {
      console.log('custom handler')
      if (res.writableEnded) return
      const ret = await handler(req as any, res)
      handleReturnValue(res, ret)
    } catch (err) {
      handleError(err, res)
    }
  }
}

function handleError(err: any, res: Response) {
  const statusCode = err.statusCode || 500
  const message = err.message
    ? err.message
    : statusCode === 500
    ? 'Internal Server Error'
    : undefined

  res.json({
    statusCode,
    message,
  })
}

function handleReturnValue(res: Response, returnValue: any) {
  switch (typeof returnValue) {
    case 'object':
      return res.json(returnValue)
    case 'function':
      return res.json(returnValue)
    default:
      return res.send(returnValue)
  }
}
