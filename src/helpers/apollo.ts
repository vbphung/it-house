import { ApolloServer, gql } from "apollo-server-express";
import { Application } from "express";
import lodash from "lodash";

import {
  loadGraphql,
  loadGraphqlResolvers,
  loadGraphqlSchemas,
} from "./autoloader";

class GraphqlServer {
  constructor(public app: Application) {}

  async start() {
    let typeDefs = [
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

    let resolvers = {
      Query: {
        _empty: () => "empty",
      },
    };

    const exportedSchemas = await loadGraphqlSchemas();
    typeDefs = typeDefs.concat(exportedSchemas);

    const exportedResolvers = await loadGraphqlResolvers();
    resolvers = lodash.merge(resolvers, exportedResolvers);

    const exportedGraphql = await loadGraphql();
    typeDefs = typeDefs.concat(exportedGraphql.typeDefs);
    resolvers = lodash.merge(resolvers, exportedGraphql.resolvers);

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
