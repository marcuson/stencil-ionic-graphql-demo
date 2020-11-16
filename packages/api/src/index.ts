// These should be the first imports for proper IoC configuration
import 'reflect-metadata';
import { DITypes, ioc } from './di';
import { LoggerFactory } from './log/logger';
import { ServerConfig } from './server/server.config';
import { setupServer } from './server/setup';
import { setupIocContainer } from './setup';

setupIocContainer(ioc).then((ioc) => {
  const logger = ioc.get<LoggerFactory>(DITypes.LoggerFactory)('INIT');

  const server = setupServer(ioc);
  const serverConfig = ioc.get<ServerConfig>(DITypes.ServerConfig);
  server.listen(serverConfig.port, (): void => {
    logger.info(`Listen on port ${serverConfig.port}`);
  });
});
