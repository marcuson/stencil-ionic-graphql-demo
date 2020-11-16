import { injectable } from 'inversify';
import { readFileSync } from 'jsonfile';
import { join as pathJoin } from 'path';
import { Query, Resolver } from 'type-graphql';

@injectable()
@Resolver(String)
export class VersionResolver {
  constructor() {}

  @Query((_returns) => String)
  version() {
    const packageJson = readFileSync(pathJoin(__dirname, '../../package.json'));
    return packageJson.version;
  }
}
