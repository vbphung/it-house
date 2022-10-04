import Context from "../../helpers/graphql/context";
import AccountModel, { AccountPlan } from "./account.model";

export default {
  Query: {
    getAllAccounts: async (root: any, args: any, context: Context) => {
      context.auth([AccountPlan.PROFESSIONAL]).grant([]);

      return await AccountModel.find({});
    },
    getOneAccount: async (root: any, args: any, context: any) => {
      context
        .auth([AccountPlan.INDIVIDUAL, AccountPlan.PROFESSIONAL])
        .grant([]);

      const { id } = args;

      const acc = await AccountModel.findById(id);
      if (!acc) {
        throw new Error("account not found");
      }

      return acc;
    },
  },
  Mutation: {
    createAccount: async (root: any, args: any, context: any) => {
      context.auth([AccountPlan.PROFESSIONAL]).grant([]);

      const { data } = args;
      const { name, email, password, plan } = data;

      return await AccountModel.create({ name, email, password, plan });
    },
    updateAccount: async (root: any, args: any, context: any) => {
      context
        .auth([AccountPlan.INDIVIDUAL, AccountPlan.PROFESSIONAL])
        .grant([]);

      const { id, data } = args;
      const { name } = data;

      return await AccountModel.findByIdAndUpdate(
        id,
        { $set: { name } },
        { new: true }
      );
    },
    deleteAccount: async (root: any, args: any, context: any) => {
      context.auth([AccountPlan.PROFESSIONAL]).grant([]);

      const { id } = args;

      return await AccountModel.findByIdAndDelete(id);
    },
  },
};
