import { gql } from "apollo-server-express";

import firebase from "../../../helpers/firebase";
import Token from "../../../helpers/token";
import AccountModel, { AccountPlan } from "../account.model";

export default {
  schema: gql`
    type Mutation {
      firebaseLogin(accessToken: String!): LoginData
    }
    type LoginData {
      account: Account
      token: String
    }
  `,
  resolvers: {
    Mutation: {
      firebaseLogin: async (root: any, args: any, context: any) => {
        const { accessToken } = args;

        const decodedTk = await firebase.auth().verifyIdToken(accessToken);

        let acc = await AccountModel.findOne({ uid: decodedTk.uid });
        if (!acc) {
          switch (decodedTk.firebase.sign_in_provider) {
            case "password": {
              acc = await AccountModel.create({
                uid: decodedTk.uid,
                name: `user${decodedTk.uid}`,
                email: decodedTk.email,
                plan: AccountPlan.INDIVIDUAL,
                loginProvider: "password",
              });

              break;
            }
            case "google.com": {
              acc = await AccountModel.create({
                uid: decodedTk.uid,
                name: decodedTk["name"]!,
                email: decodedTk.email,
                plan: AccountPlan.INDIVIDUAL,
                loginProvider: "google.com",
              });

              break;
            }
            default:
              throw new Error("login method is not supported");
          }
        }

        const tk = new Token(acc.uid!, acc.plan!, { scopes: acc.scopes });

        return {
          account: acc,
          token: tk.sign(),
        };
      },
    },
  },
};
