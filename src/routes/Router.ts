import { Request, Response } from 'express';
import { Application } from 'express'

type RouteHandler = (req: Request, res: Response) => any

export default (app: Application) => ({
  get(route: string, handler: RouteHandler) {
    app.get(route, withReturnValue(handler))
  },
  put(route: string, handler: RouteHandler) {
    app.put(route, withReturnValue(handler))
  },
  post(route: string, handler: RouteHandler) {
    app.post(route, withReturnValue(handler))
  },
  del(route: string, handler: RouteHandler) {
    app.delete(route, withReturnValue(handler))
  }
});


function withReturnValue(handler: RouteHandler) {
  return async function (req: Request, res: Response) {
    try {
      if (res.writableEnded) return; 
      const ret = await handler(req, res);
      handleReturnValue(res, ret);
    } catch (err) {
      handleError(err, res);
    }
  }
}

function handleError(err: any, res: Response) {
  const statusCode = err.status || 500
  const message = err.message || statusCode === 500 
    ? 'Internal Server Error' 
    : ''

  res.status(500).json({ message, statusCode })
}

function handleReturnValue(res: Response, returnValue: any) {
  switch (typeof returnValue) {
    case 'object':
      return res.json(returnValue);
    case 'function':
      return res.json(returnValue);
    default:
      return res.send(returnValue);
  }
}

