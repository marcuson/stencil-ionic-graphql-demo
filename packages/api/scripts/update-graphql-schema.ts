import 'reflect-metadata';
import { Container } from 'inversify';
import { setupGraphQLSchema } from '../src/graphql/setup';

const ioc = new Container();
setupGraphQLSchema(ioc).then((graphqlSchema) => {
  // NOTE: nothing to do, file is automatically emitted by type-graphql
});
