import { gql } from "apollo-server-express";

import Context from "../../../helpers/graphql/context";
import AccountModel from "../../account/account.model";

const registerDeviceGraphql = {
  schema: gql`
    extend type Mutation {
      registerDevice(token: String!): String
    }
  `,
  resolvers: {
    Mutation: {
      registerDevice: async (root: any, args: any, context: Context) => {
        const { token } = args;

        await Promise.all([
          AccountModel.findByIdAndUpdate(context.userId, {
            $addToSet: { deviceTokens: token },
          }),
          AccountModel.updateMany(
            {
              $ne: { _id: context.userId },
              deviceTokens: token,
            },
            { $pull: { deviceTokens: token } }
          ),
        ]);

        return "ok";
      },
    },
  },
};

export default registerDeviceGraphql;
