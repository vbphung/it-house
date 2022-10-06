import CrudService from "../../../bases/crudService";
import CategoryModel, { Category } from "./category.model";

class CategoryService extends CrudService<Category> {
  constructor() {
    super(CategoryModel);
  }
}

const categoryService = new CategoryService();

export default categoryService;
