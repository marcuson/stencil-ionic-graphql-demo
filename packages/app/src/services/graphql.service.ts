import ApolloClient, { InMemoryCache } from 'apollo-boost';

const graphqlHostKey = 'sig-demo-graphql-url';
const graphqlHost = window.localStorage.getItem(graphqlHostKey) || 'localhost';
console.log('graphql url: ' + graphqlHost);

class GraphqlService {
  client: ApolloClient<InMemoryCache> = new ApolloClient({
    uri: `http://${graphqlHost}:3000/api/graphql`,
  });

  get graphQLHost(): string {
    return graphqlHost;
  }

  setGraphQLUrl(url: string) {
    window.localStorage.setItem(graphqlHostKey, url);
  }

  clearGraphQLUrl() {
    window.localStorage.setItem(graphqlHostKey, null);
  }
}

export const graphqlService = new GraphqlService();
