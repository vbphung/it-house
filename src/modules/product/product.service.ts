import { v1 } from "uuid";

import CrudService from "../../bases/crudService";
import ProductModel, { Product } from "./product.model";

class ProductService extends CrudService<Product> {
  constructor() {
    super(ProductModel);
  }

  generateCode() {
    return v1();
  }
}

const productService = new ProductService();

export default productService;
