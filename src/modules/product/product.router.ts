import { Request, Response } from "express";

import { RouterConfig } from "../../helpers/apiRouter";

const productRouters = [
  {
    method: "get",
    path: "/product",
    middlewares: [],
    handler: async (req: Request, res: Response) => {},
  },
] as RouterConfig[];

export default productRouters;
