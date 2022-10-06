import Context from "../../../helpers/graphql/context";
import ProductModel from "../product.model";
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
    products: async (root: any, args: any, context: Context) => {
      const { productIds } = root;
      return await ProductModel.find({ _id: { $in: productIds } });
    },
  },
};

export default categoryResolvers;
