import { Express, Request, Response } from "express";
import HttpError from "../errors/http-error";

export default class CustomRouter {
  private app: Express;
  constructor(app: Express) {
    this.app = app;
  }

  private handleReturnType(val: any, res: Response) {
    switch (typeof val) {
      case "object":
        return res.json(val);
      default:
        return res.send(val);
    }
  }

  private handleErrors(err: any, res: Response) {
    if (err instanceof HttpError) {
      const error = err.getError();
      res.status(error.status).json(error);
    }
  }

  get(route: string, handler: (req: Request) => any) {
    this.app.get(route, async (req, res) => {
      try {
        const val = await handler(req);
        this.handleReturnType(val, res);
      } catch (err) {
        this.handleErrors(err, res);
      }
    });
  }

  post(route: string, handler: (req: Request) => any) {
    this.app.post(route, async (req, res) => {
      try {
        const val = await handler(req);
        this.handleReturnType(val, res);
      } catch (err) {
        if (err instanceof HttpError) {
          const error = err.getError();
          res.status(error.status).json(error);
        }
      }
    });
  }
}
