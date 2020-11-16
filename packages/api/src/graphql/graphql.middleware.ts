import { NextFunction, Request, Response } from 'express';
import { graphqlHTTP, Options } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { DITypes } from '../di';

@injectable()
export class GraphQLMiddleware extends BaseMiddleware {
  private readonly _middleware: (request: Request, response: Response) => Promise<void>;

  constructor(@inject(DITypes.GraphQLSchema) private _schema: GraphQLSchema) {
    super();

    const options: Options = {
      schema: this._schema,
      graphiql: true,
    };
    this._middleware = graphqlHTTP(options);
  }

  handler(request: Request, response: Response, _next: NextFunction) {
    this._middleware(request, response);
  }
}
