import { ProductsRepository } from '../repositories/products.repository';

export class ProductsService {
  productsRepository = new ProductsRepository();

  createProduct = async (userId, userName, title, content) => {
    const createdProduct = await this.productsRepository.createProduct(userId, userName, title, content);

    return {
      id: createdProduct.id,
      title: createdProduct.title,
      content: createdProduct.content,
      status: createdProduct.status,
      userId: createdProduct.userId,
      userName: createdProduct.userName,
      createdAt: createdProduct.createdAt,
      updatedAt: createdProduct.updatedAt
    };
  };

  getProductsAll = async (sort) => {
    let upperCaseSort = sort?.toUpperCase();
    if (upperCaseSort !== 'ASC' && upperCaseSort !== 'DESC') upperCaseSort = 'DESC';

    const products = await this.productsRepository.getProductsAll(upperCaseSort);

    return products.map((product) => {
      return {
        id: product.id,
        title: product.title,
        content: product.content,
        status: product.status,
        userId: product.userId,
        userName: product.userName,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      };
    });
  };

  getProductOne = async (id) => {
    const product = await this.productsRepository.getProductOne(id);

    return {
      id: product.id,
      title: product.title,
      content: product.content,
      status: product.status,
      userId: product.userId,
      userName: product.userName,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };
  };
  updateProduct = async (id, title, content, status, userId, userName) => {
    const updatedProduct = await this.productsRepository.updateProduct(id, title, content, status, userId, userName);

    return {
      id: updatedProduct.id,
      title: updatedProduct.title,
      content: updatedProduct.content,
      status: updatedProduct.status,
      userId: updatedProduct.userId,
      userName: updatedProduct.userName,
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt
    };
  };
  deleteProduct = async () => {
    const deletedProduct = await this.productsRepository.deleteProduct(id);

    return {
      id: deletedProduct.id,
      title: deletedProduct.title,
      content: deletedProduct.content,
      status: deletedProduct.status,
      userId: deletedProduct.userId,
      userName: deletedProduct.userName,
      createdAt: deletedProduct.createdAt,
      updatedAt: deletedProduct.updatedAt
    };
  };
}
