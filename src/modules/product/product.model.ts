import DataLoader from "dataloader";
import lodash from "lodash";
import mongoose, { Schema } from "mongoose";

import BaseDocument from "../../bases/baseDoc";
import Mongo from "../../helpers/mongo";

type Product = BaseDocument & {
  code?: string;
  name?: string;
  description?: string;
  basePrice?: number;
  sellPrice?: number;
  categoryId?: string;
};

const productSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    basePrice: { type: Number, required: true },
    sellPrice: { type: Number, required: true },
    categoryId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

productSchema.index({ categoryId: 1 });
productSchema.index({ name: "text" });

const ProductModel = Mongo.model<Product>("Product", productSchema);

const ProductLoader = new DataLoader(
  async (ids) => {
    const products = await ProductModel.find({ _id: { $in: ids } });
    const keysById = lodash.keyBy(products, "_id");

    return ids.map((id) => {
      return lodash.get(keysById, id as string, null);
    });
  },
  { cache: true }
);

export default ProductModel;
export { Product, ProductLoader };
