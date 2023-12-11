import { ProductsService } from '../services/products.service.js';

export class ProductsController {
  productsServide = new ProductsService();

  // 상품 등록
  createProduct = async (req, res, next) => {
    try {
      const { userId, userName } = res.locals.user;
      const { title, content } = req.body;

      const createdProduct = await this.productsServide.createProduct(userId, userName, title, content);

      return res.status(200).json({ data: createdProduct });
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.statusCode).json({ status: 'error', message: error.message });
      } else {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
  };

  // 상품 목록 조회
  getProductAll = async (req, res, next) => {
    try {
      const { sort } = req.query;

      const gotProducts = await this.productsServide.getProductsAll(sort);

      return res.status(200).json({ data: gotProducts });
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.statusCode).json({ status: 'error', message: error.message });
      } else {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
  };

  // 상품 상세 조회
  getProductOne = async (req, res, next) => {
    try {
      const { id } = req.params;

      const gotProduct = await this.productsServide.getProductOne(id);

      return res.status(200).json({ data: gotProduct });
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.statusCode).json({ status: 'error', message: error.message });
      } else {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
  };

  // 상품 수정
  updateProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, content, status } = req.body;
      const { userId: userId, name: userName } = res.locals.user;

      const updatedProduct = await ProductsService.updateProduct(id, title, content, status, userId, userName);

      return res.status(200).json({ data: updatedProduct });
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.statusCode).json({ status: 'error', message: error.message });
      } else {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
  };

  // 상품 삭제
  deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId } = res.locals.user;

      const deletedProduct = await ProductsService.deleteProduct(id, userId);

      return res.status(200).json({ data: deletedProduct });
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.statusCode).json({ status: 'error', message: error.message });
      } else {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
  };
}
