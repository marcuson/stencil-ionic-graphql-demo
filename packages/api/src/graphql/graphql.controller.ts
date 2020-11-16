import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { DITypes } from '../di';

@controller('/graphql', DITypes.GraphQLMiddleware)
export class GraphQLController {
  @httpGet('/')
  async get() {}

  @httpPost('/')
  async post() {}
}
