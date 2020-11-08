import { Request, Response } from "express";

class TestController {
  test(req: Request, res: Response) {
    res.send("Hello");
  }
}
export default new TestController();
