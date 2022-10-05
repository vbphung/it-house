import { Model, Types } from "mongoose";

import BaseService from "./baseService";

class CrudService<T> extends BaseService {
  constructor(public model: Model<T>) {
    super();
  }

  async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("invalid id");
    }

    const doc = await this.model.findById(id);
    if (!doc) {
      throw new Error("document not found");
    }

    return doc;
  }

  async create(data: any) {
    return await this.model.create(data);
  }

  async update(id: string, data: any) {
    const doc = await this.model.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    if (!doc) {
      throw new Error("document not found");
    }

    return doc;
  }

  async delete(id: string) {
    const doc = await this.model.findByIdAndDelete(id);
    if (!doc) {
      throw new Error("document not found");
    }

    return doc;
  }
}

export default CrudService;
