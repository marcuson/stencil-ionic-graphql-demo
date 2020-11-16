import * as cors from 'cors';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

@injectable()
export class CorsMiddleware extends BaseMiddleware {
  private readonly _middleware: RequestHandler;

  constructor() {
    super();

    this._middleware = cors();
  }

  handler(request: Request, response: Response, next: NextFunction) {
    this._middleware(request, response, next);
  }
}
