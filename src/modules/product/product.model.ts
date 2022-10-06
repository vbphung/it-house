import mongoose, { Schema } from "mongoose";

import BaseDocument from "../../bases/baseDoc";
import { getModelDataLoader } from "../../helpers/dataloader";
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

const ProductLoader = getModelDataLoader(ProductModel);

export default ProductModel;
export { Product, ProductLoader };
