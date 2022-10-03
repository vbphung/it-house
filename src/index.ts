import GraphqlServer from "./helpers/apollo";
import expressServer, { startExpressServer } from "./helpers/express";

startExpressServer();

const graphqlServer = new GraphqlServer(expressServer);
graphqlServer.start();
