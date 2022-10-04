import expressServer, { startExpressServer } from "./helpers/express";
import GraphqlServer from "./helpers/graphql/apollo";

startExpressServer();

const graphqlServer = new GraphqlServer(expressServer);
graphqlServer.start();
