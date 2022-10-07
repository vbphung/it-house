import { Workbook } from "exceljs";
import { Request, Response } from "express";
import fs from "fs";
import lodash from "lodash";

import { RouterConfig } from "../../helpers/apiRouter";
import ProductModel from "./product.model";
import productService from "./product.service";

const productRouters = [
  {
    method: "get",
    path: "/product",
    middlewares: [],
    handler: async (req: Request, res: Response) => {},
  },
  {
    method: "get",
    path: "product/export",
    middlewares: [],
    handler: async (req: Request, res: Response) => {
      const wb = new Workbook();

      const ws = wb.addWorksheet("Products");
      ws.addRow(["ID", "Name", "Created", "Price"]);

      const products = await ProductModel.find({});
      products.forEach((product) => {
        ws.addRow([
          product._id,
          product.name,
          product.createdAt,
          product.basePrice,
        ]);
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=products.xlsx"
      );

      await wb.xlsx.write(res);
      res.end();
    },
  },
  {
    method: "get",
    path: "/product/import",
    middlewares: [],
    handler: async (req: Request, res: Response) => {
      try {
        if (!req["file"]) {
          throw new Error("file is required");
        }

        const wb = new Workbook();
        await wb.xlsx.readFile(req.file.path);

        const ws = wb.getWorksheet("Products");

        const rows = (await ws.getSheetValues()) as any[];
        rows.slice(0, 2);

        const products = rows.map((row) => {
          return new ProductModel({
            id: productService.generateCode(),
            name: row[3],
            basePrice: row[4],
          });
        });

        await ProductModel.insertMany(products);

        return res.json(products);
      } catch (err) {
        throw new Error("internal server error");
      } finally {
        fs.unlink(lodash.get(req, "file.path", "undefined"), (err) => {
          if (err) {
            throw new Error("file does not exist");
          }
        });
      }
    },
  },
] as RouterConfig[];

export default productRouters;
