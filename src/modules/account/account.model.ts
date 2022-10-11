import mongoose from "mongoose";

import BaseDocument from "../../bases/baseDoc";
import { getModelDataLoader } from "../../helpers/dataloader";
import Mongo from "../../helpers/mongo";

enum AccountPlan {
  INDIVIDUAL = "Individual",
  PROFESSIONAL = "Professional",
}

type Account = BaseDocument & {
  uid?: string;
  name?: string;
  email?: string;
  password?: string;
  plan?: AccountPlan;
  loginProvider?: string;
  scopes?: string[];
};

const accountSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    plan: { type: String, required: true, enum: Object.values(AccountPlan) },
    loginProvider: { type: String },
    scopes: { type: [String] },
  },
  {
    timestamps: true,
  }
);

accountSchema.index({ email: 1 }, { unique: true });

const AccountModel = Mongo.model<Account>("Account", accountSchema);

const AccountLoader = getModelDataLoader(AccountModel);

export default AccountModel;
export { Account, AccountPlan, AccountLoader };
