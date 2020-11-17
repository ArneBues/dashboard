import { Request, Response } from 'express';

export abstract class BaseController {
  protected res: Response;
  protected req: Request;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }
  protected response(response: unknown, status: number = 200) {
    this.res.status(status).json({
      status: status,
      data: response,
    });
  }

  abstract index(): void;
}
