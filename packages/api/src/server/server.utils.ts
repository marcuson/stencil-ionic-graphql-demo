import { NextFunction, Request, RequestHandler, Response } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';

export const combineMiddlewares = (
  ...mids: Array<RequestHandler | BaseMiddleware>
): RequestHandler => {
  return mids.reduce<RequestHandler>(
    (a, b) => {
      return (req: Request, res: Response, next: NextFunction) => {
        a(req, res, (err) => {
          if (err) {
            return next(err);
          }

          if (b instanceof BaseMiddleware) {
            b.handler(req, res, next);
          } else {
            b(req, res, next);
          }
        });
      };
    },
    (_request: Request, _response: Response, next: NextFunction) => {
      next();
    }
  );
};
