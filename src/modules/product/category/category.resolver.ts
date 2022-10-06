import Context from "../../../helpers/graphql/context";
import { loadMany } from "../../../helpers/graphql/resolver";
import ProductModel, { ProductLoader } from "../product.model";
import { Category } from "./category.model";
import categoryService from "./category.service";

const categoryResolvers = {
  Query: {
    getAllCategories: async (root: any, args: any, context: Context) => {
      return await categoryService.findAll();
    },
    getOneCategory: async (root: any, args: any, context: Context) => {
      const { id } = args;
      return await categoryService.findById(id);
    },
  },
  Mutation: {
    createCategory: async (root: any, args: any, context: Context) => {
      const { data } = args;
      const { name, productIds } = data;

      return await categoryService.create({ name, productIds });
    },
    updateCategory: async (root: any, args: any, context: Context) => {
      const { id, data } = args;
      const { name, productIds } = data;

      return await categoryService.update(id, { name, productIds });
    },
    deleteCategory: async (root: any, args: any, context: Context) => {
      const { id } = args;
      return await categoryService.delete(id);
    },
  },
  Category: {
    products: loadMany(ProductLoader, "productIds"),
  },
};

export default categoryResolvers;
