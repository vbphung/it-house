import { Application, Request, Response, Router } from "express";

import { loadRouters } from "./autoloader";

type RouterConfig = {
  method: "get" | "post" | "put" | "delete";
  path: string;
  middlewares: ((req: Request, res: Response, next: () => void) => void)[];
  handler: (req: Request, res: Response) => Promise<void>;
};

class APIRouter {
  router = Router();

  constructor(private app: Application) {}

  async start(path = "/api") {
    const configs = await loadRouters();

    configs.forEach(({ method, path, middlewares, handler }) => {
      this.router[method](path, ...middlewares, handler);
    });

    this.app.use(path, this.router);
  }
}

export default APIRouter;
export { RouterConfig };
