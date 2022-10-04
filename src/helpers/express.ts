import { json } from "body-parser";
import cors from "cors";
import express, { Request } from "express";
import morgan from "morgan";

const expressServer = express();

expressServer.use(json());
expressServer.use(cors());

morgan.token("req-body", (req: Request) => req.body);
expressServer.use(
  morgan(":method :req-body - :status", {
    skip: (req) => req.originalUrl.endsWith("/graphql"),
  })
);

const startExpressServer = () => {
  expressServer.listen(4000, () => {
    console.log("server listens on 4000");
  });
};

export default expressServer;
export { startExpressServer };
