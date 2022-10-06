import DataLoader from "dataloader";
import lodash from "lodash";
import mongoose, { Schema } from "mongoose";

import BaseDocument from "../../../bases/baseDoc";
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

const CategoryLoader = new DataLoader(
  async (ids) => {
    const categories = await CategoryModel.find({ _id: { $in: ids } });
    const keysById = lodash.keyBy(categories, "_id");

    return ids.map((id) => {
      return lodash.get(keysById, id as string, null);
    });
  },
  { cache: true }
);

export default CategoryModel;
export { Category, CategoryLoader };
