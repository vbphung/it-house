import { ApolloServer, gql } from "apollo-server-express";
import { Application } from "express";

class GraphqlServer {
  constructor(public app: Application) {}

  async start() {
    const typeDefs = [
      gql`
        type Query {
          _empty: String
        }
        type Mutation {
          _empty: String
        }
        type Subscription {
          _empty: String
        }
      `,
    ];

    const resolvers = {};

    const server = new ApolloServer({
      introspection: true,
      typeDefs,
      resolvers,
    });

    await server.start();

    server.applyMiddleware({ app: this.app });
  }
}

export default GraphqlServer;
