import { gql } from "apollo-server-express";

const categorySchema = gql`
  extend type Query {
    getAllCategories: [Category]
    getOneCategory: Category
  }
  extend type Mutation {
    createCategory(data: CreateCategoryParams!): Category
    updateCategory(id: ID!, data: UpdateCategoryParams!): Category
    deleteCategory(id: ID!): Category
  }
  type Category {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    products: [Product]!
  }
  input CreateCategoryParams {
    name: String!
    productIds: [ID]
  }
  input UpdateCategoryParams {
    name: String
    productIds: [ID]
  }
`;

export default categorySchema;
