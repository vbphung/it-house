import DataLoader from "dataloader";
import lodash from "lodash";
import { Model } from "mongoose";

const getModelDataLoader = <T>(model: Model<T>) => {
  return new DataLoader(
    async (ids) => {
      const docs = await model.find({ _id: { $in: ids } });
      const keysById = lodash.keyBy(docs, "_id");

      return ids.map((id) => {
        return lodash.get(keysById, id as string, null);
      }) as T[];
    },
    { cache: true }
  );
};

export { getModelDataLoader };
