import { Application, Request, Response, Router } from 'express'

type RouteHandler = (req: Request, res: Response) => any

// underlying router instance
const router = Router()

// need to wrap the router instance
export default initRouter(router)

function initRouter(router: Router) {
  return {
    getExpressRouter() {
      return router
    },
    get(route: string, handler: RouteHandler) {
      router.get(route, withReturnValue(handler))
    },
    put(route: string, handler: RouteHandler) {
      router.put(route, withReturnValue(handler))
    },

    post(route: string, handler: RouteHandler) {
      router.post(route, withReturnValue(handler))
    },

    del(route: string, handler: RouteHandler) {
      router.delete(route, withReturnValue(handler))
    },
  }
}

function withReturnValue(handler: RouteHandler) {
  return async function (req: Request, res: Response) {
    try {
      console.log('custom handler')
      if (res.writableEnded) return
      const ret = await handler(req, res)
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
