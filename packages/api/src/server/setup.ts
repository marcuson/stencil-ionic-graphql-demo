import { Application } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { DITypes } from '../di';
import { CorsMiddleware } from './cors.middleware';

export function setupServer(ioc: Container): Application {
  const serverIoc = new InversifyExpressServer(ioc, null, { rootPath: '/api' });
  serverIoc.setConfig((app) => {
    // Serve API
    app.use('/api/*', (req, res, next) => {
      ioc.get<CorsMiddleware>(DITypes.CorsMiddleware).handler(req, res, next);
    });
  });
  const server = serverIoc.build();
  return server;
}
