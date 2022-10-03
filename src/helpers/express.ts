import { json } from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

const expressServer = express();

expressServer.use(json());
expressServer.use(cors());
expressServer.use(
  morgan(
    ":date[clf] :method :url :status :res[content-length] - :response-time ms"
  )
);

const startExpressServer = () => {
  expressServer.listen(4000, () => {
    console.log("server listens on 4000");
  });
};

export default expressServer;
export { startExpressServer };
