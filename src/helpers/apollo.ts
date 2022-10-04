import { ApolloServer, gql } from "apollo-server-express";
import { Application, Request } from "express";
import lodash from "lodash";
import morgan from "morgan";

import {
  loadGraphql,
  loadGraphqlResolvers,
  loadGraphqlSchemas,
} from "./autoloader";
import logger from "./logger";

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

    morgan.token("gql-query", (req: Request) => req.body["query"]);
    this.app.use(
      "/graphql",
      morgan("GRAPHQL :gql-query - :status", {
        skip: (req) =>
          lodash.get(req, "body.query", "")["includes"]("IntrospectionQuery"),
        stream: { write: (msg) => logger.info(msg) },
      })
    );

    server.applyMiddleware({ app: this.app });
  }
}

export default GraphqlServer;
