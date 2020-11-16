import ApolloClient, { InMemoryCache } from 'apollo-boost';

class GraphqlService {
  client: ApolloClient<InMemoryCache> = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
  });
}

export const graphqlService = new GraphqlService();
