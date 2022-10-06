import mongoose, { Schema } from "mongoose";

import BaseDocument from "../../../bases/baseDoc";
import { getModelDataLoader } from "../../../helpers/dataloader";
import Mongo from "../../../helpers/mongo";

type Category = BaseDocument & {
  name?: string;
  productIds?: string[];
};

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    productIds: { type: [Schema.Types.ObjectId], default: [] },
  },
  { timestamps: true }
);

categorySchema.index({ name: "text" });

const CategoryModel = Mongo.model<Category>("Category", categorySchema);

const CategoryLoader = getModelDataLoader(CategoryModel);

export default CategoryModel;
export { Category, CategoryLoader };
