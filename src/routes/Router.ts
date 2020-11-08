import { Express } from "express";
export default class Router {
  private app: Express | undefined;

  constructor(app: Express) {
    this.app = app;
  }

  get(url: string, handler: any) {
    this.app?.get(url, (req, res) => {});
  }
}
