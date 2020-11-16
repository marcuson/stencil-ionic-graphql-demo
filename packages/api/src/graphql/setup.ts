import { GraphQLSchema } from 'graphql';
import { Container } from 'inversify';
import { join as pathJoin } from 'path';
import { buildSchema } from 'type-graphql';
import { NoteResolver } from './note-resolver';
import { VersionResolver } from './version-resolver';

export async function setupGraphQLSchema(ioc: Container): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    container: ioc,
    emitSchemaFile: pathJoin(__dirname, '../assets/schema.gql'),
    resolvers: [NoteResolver, VersionResolver],
  });
  return schema;
}
