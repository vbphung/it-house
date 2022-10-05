import Context from "../../helpers/graphql/context";
import AccountModel from "./account.model";
import accountService from "./account.service";

export default {
  Query: {
    getAllAccounts: async (root: any, args: any, context: Context) => {
      // context.auth([AccountPlan.PROFESSIONAL]).grant([]);

      return await AccountModel.find({});
    },
    getOneAccount: async (root: any, args: any, context: any) => {
      // context
      //   .auth([AccountPlan.INDIVIDUAL, AccountPlan.PROFESSIONAL])
      //   .grant([]);

      const { id } = args;

      return await accountService.findById(id);
    },
  },
  Mutation: {
    createAccount: async (root: any, args: any, context: any) => {
      // context.auth([AccountPlan.PROFESSIONAL]).grant([]);

      const { data } = args;
      const { name, email, password, plan } = data;

      return await accountService.create({ name, email, password, plan });
    },
    updateAccount: async (root: any, args: any, context: any) => {
      // context
      //   .auth([AccountPlan.INDIVIDUAL, AccountPlan.PROFESSIONAL])
      //   .grant([]);

      const { id, data } = args;
      const { name } = data;

      return await accountService.update(id, { name });
    },
    deleteAccount: async (root: any, args: any, context: any) => {
      // context.auth([AccountPlan.PROFESSIONAL]).grant([]);

      const { id } = args;

      return await accountService.delete(id);
    },
  },
};
