import { ProductsRepository } from '../repositories/products.repository.js';
import { ErrorHandler } from '../middlewares/error-handler.middleware.js';

export class ProductsService {
  productsRepository = new ProductsRepository();

  createProduct = async (userId, userName, title, content) => {
    if (!title) throw new ErrorHandler(400, '제목을 입력해주세요.');

    if (!content) throw new ErrorHandler(400, '내용을 입력해주세요.');

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

    if (!product) throw new ErrorHandler(404, '상품 조회에 실패했습니다.');

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
    if (!title && !content && !status) throw new ErrorHandler(404, '수정한 정보가 없습니다.');

    if (status !== 'FOR_SALE' || status !== 'SOLD_OUT')
      throw new ErrorHandler(404, '상품의 판매상태가 올바르지 않습니다. (FOR_SALE or SOLD_OUT)');

    const updatedProduct = await this.productsRepository.updateProduct(id, title, content, status, userId, userName);

    if (!updatedProduct) throw new ErrorHandler(404, '상품 조회에 실패했습니다.');

    if (updatedProduct.userId !== userId) throw new ErrorHandler(404, '작성자만 수정할 수 있습니다.');

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

  deleteProduct = async (id, userId) => {
    const deletedProduct = await this.productsRepository.deleteProduct(id);

    if (!product) throw new ErrorHandler(404, '상품 조회에 실패했습니다.');

    if (product.userId !== userId) new ErrorHandler(404, '작성자만 삭제할 수 있습니다.');

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
