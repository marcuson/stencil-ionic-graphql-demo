import { GraphQLSchema } from 'graphql';
import { Container } from 'inversify';
import { Logger } from 'winston';
import { NoteService } from './data/note.service';
import { DITypes } from './di';
import { GraphQLController } from './graphql/graphql.controller';
import { GraphQLMiddleware } from './graphql/graphql.middleware';
import { NoteResolver } from './graphql/note-resolver';
import { setupGraphQLSchema } from './graphql/setup';
import { VersionResolver } from './graphql/version-resolver';
import { createLoggerFactory, LoggerFactory } from './log/logger';
import { LoggerConfig } from './log/logger.config';
import { CorsMiddleware } from './server/cors.middleware';
import { ServerConfig } from './server/server.config';

export async function setupIocContainer(ioc: Container): Promise<Container> {
  // Logger
  ioc.bind<LoggerConfig>(DITypes.LoggerConfig).toConstantValue({
    level: 'info',
  });
  ioc.bind<LoggerFactory>(DITypes.LoggerFactory).toFactory(createLoggerFactory);
  ioc
    .bind<Logger>(DITypes.Logger)
    .toDynamicValue((ctx) => ctx.container.get<LoggerFactory>(DITypes.LoggerFactory)('GENERAL'))
    .inRequestScope();

  // Server
  ioc.bind<ServerConfig>(DITypes.ServerConfig).toConstantValue({
    port: 3000,
  });
  ioc.bind<CorsMiddleware>(DITypes.CorsMiddleware).to(CorsMiddleware).inRequestScope();

  // Data services
  ioc.bind<NoteService>(DITypes.NoteService).to(NoteService).inSingletonScope();

  // GraphQL
  const graphqlSchema = await setupGraphQLSchema(ioc);
  ioc.bind<GraphQLSchema>(DITypes.GraphQLSchema).toConstantValue(graphqlSchema);
  ioc.bind<NoteResolver>(NoteResolver).toSelf().inSingletonScope();
  ioc
    .bind<NoteResolver>(DITypes.NoteResolver)
    .toDynamicValue((ctx) => ctx.container.get<NoteResolver>(NoteResolver))
    .inSingletonScope();
  ioc.bind<VersionResolver>(VersionResolver).toSelf().inSingletonScope();
  ioc
    .bind<VersionResolver>(DITypes.VersionResolver)
    .toDynamicValue((ctx) => ctx.container.get<VersionResolver>(VersionResolver))
    .inSingletonScope();
  ioc.bind<GraphQLMiddleware>(DITypes.GraphQLMiddleware).to(GraphQLMiddleware).inRequestScope();
  ioc.bind<GraphQLController>(DITypes.GraphQLController).to(GraphQLController).inRequestScope();

  return ioc;
}
