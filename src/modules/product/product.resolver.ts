import Context from "../../helpers/graphql/context";
import { loadOne } from "../../helpers/graphql/resolver";
import CategoryModel, { CategoryLoader } from "./category/category.model";
import productService from "./product.service";

const productResolvers = {
  Query: {
    getAllProducts: async (root: any, args: any, context: Context) => {
      return await productService.findAll();
    },
    getOneProduct: async (root: any, args: any, context: Context) => {
      const { id } = args;
      return await productService.findById(id);
    },
  },
  Mutation: {
    createProduct: async (root: any, args: any, context: Context) => {
      const { data } = args;
      const { name, description, basePrice, sellPrice, categoryId } = data;

      return await productService.create({
        code: productService.generateCode(),
        name,
        description,
        basePrice,
        sellPrice,
        categoryId,
      });
    },
    updateProduct: async (root: any, args: any, context: Context) => {
      const { id, data } = args;
      const { name, description, basePrice, sellPrice } = data;

      return await productService.update(id, {
        name,
        description,
        basePrice,
        sellPrice,
      });
    },
    deleteProduct: async (root: any, args: any, context: Context) => {
      const { id } = args;
      return await productService.delete(id);
    },
  },
  Product: {
    category: loadOne(CategoryLoader, "categoryId"),
  },
};

export default productResolvers;
