import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getAllAccounts: [Account]
    getOneAccount: Account
  }
  extend type Mutation {
    createAccount(data: CreateAccountParams!): Account
    updateAccount(id: ID!, data: UpdateAccountParams!): Account
    deleteAccount(id: ID!): Account
  }
  type Account {
    id: ID!
    createdAt: DateTime
    updatedAt: DateTime
    "Display name"
    name: String
    "Email"
    email: String
    "Account plan"
    plan: String
  }
  input CreateAccountParams {
    name: String!
    "Email"
    email: String!
    "Password"
    password: String!
    "Account plan"
    plan: String!
  }
  input UpdateAccountParams {
    "Display name"
    name: String
  }
`;
