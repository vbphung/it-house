import DataLoader from "dataloader";

import BaseDocument from "../../bases/baseDoc";
import Context from "./context";

function loadMany<T extends BaseDocument>(
  loader: DataLoader<string, T>,
  field: string
) {
  return async (root: any, args: any, context: Context) => {
    if (!root[field]) {
      return [];
    }

    const ids = root[field] as any[];
    return await loader.loadMany(ids.map((id) => id["toString"]()));
  };
}

function loadOne<T extends BaseDocument>(
  loader: DataLoader<string, T>,
  field: string
) {
  return async (root: any, args: any, context: Context) => {
    if (!root[field]) {
      return [];
    }

    const id = root[field];
    return await loader.load(id["toString"]());
  };
}

export { loadMany, loadOne };
