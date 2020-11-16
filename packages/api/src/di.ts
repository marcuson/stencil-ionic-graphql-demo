import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

export const ioc = new Container();

export const { lazyInject } = getDecorators(ioc);

export const DITypes = {
  CorsMiddleware: Symbol.for('CorsMiddleware'),
  NoteResolver: Symbol.for('NoteResolver'),
  NoteService: Symbol.for('NoteService'),
  GraphQLController: Symbol.for('GraphQLController'),
  GraphQLMiddleware: Symbol.for('GraphQLMiddleware'),
  GraphQLSchema: Symbol.for('GraphQLSchema'),
  Logger: Symbol.for('Logger'),
  LoggerConfig: Symbol.for('LoggerConfig'),
  LoggerFactory: Symbol.for('LoggerFactory'),
  ServerConfig: Symbol.for('ServerConfig'),
  VersionResolver: Symbol.for('VersionResolver'),
};
