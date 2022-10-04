import mongoose from "mongoose";

import BaseDocument from "../../bases/baseDoc";
import Mongo from "../../helpers/mongo";

enum AccountPlan {
  INDIVIDUAL = "Individual",
  PROFESSIONAL = "Professional",
}

type Account = BaseDocument & {
  name?: string;
  email?: string;
  password?: string;
  plan?: AccountPlan;
};

const accountSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    plan: { type: String, required: true, enum: Object.values(AccountPlan) },
  },
  {
    timestamps: true,
  }
);

accountSchema.index({ email: 1 }, { unique: true });

const AccountModel = Mongo.model<Account>("Account", accountSchema);

export default AccountModel;
export { Account, AccountPlan };
