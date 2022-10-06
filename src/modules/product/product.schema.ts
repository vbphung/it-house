import { gql } from "apollo-server-express";

const productSchema = gql`
  extend type Query {
    getAllProducts: [Product]
    getOneProduct: Product
  }
  extend type Mutation {
    createProduct(data: CreateProductParams!): Product
    updateProduct(id: ID!, data: UpdateProductParams!): Product
    deleteProduct(id: ID!): Product
  }
  type Product {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    code: String!
    name: String!
    description: String!
    basePrice: Float!
    sellPrice: Float!
    category: Category!
  }
  input CreateProductParams {
    name: String!
    description: String
    basePrice: Float!
    sellPrice: Float!
    categoryId: ID
  }
  input UpdateProductParams {
    name: String
    description: String
    basePrice: Float
    sellPrice: Float
  }
`;

export default productSchema;
