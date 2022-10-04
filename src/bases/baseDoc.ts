import { Document } from "mongoose";

type BaseDocument = Document & {
  createdAt: Date;
  updatedAt: Date;
};

export default BaseDocument;
