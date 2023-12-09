// CHECKLIST: 에러처리 수정하기 or 미들웨어 생성
import { ProductsService } from '../services/products.service.js';

export class ProductsController {
  productsServide = new ProductsService();

  // 상품 등록
  createProduct = async (req, res, next) => {
    try {
      const { userId, userName } = res.locals.user;
      const { title, content } = req.body;
      if (!title) {
        return res.status(400).json({ message: '제목을 입력해주세요.' });
      }

      if (!content) {
        return res.status(400).json({ message: '내용을 입력해주세요.' });
      }

      const createdProduct = await this.productsServide.createProduct(userId, userName, title, content);

      return res.status(200).json({ data: createdProduct });
    } catch (error) {
      next(error);
    }
  };

  // 상품 목록 조회
  getProductAll = async (req, res, next) => {
    try {
      const { sort } = req.query;

      const gotProducts = await this.productsServide.getProductsAll(sort);

      return res.status(200).json({ data: gotProducts });
    } catch (error) {
      next(error);
    }
  };

  // 상품 상세 조회
  getProductOne = async (req, res, next) => {
    try {
      const { id } = req.params;

      const gotProduct = await this.productsServide.getProductOne(id);

      if (!product) {
        return res.status(404).json({ message: '상품 조회에 실패했습니다.' });
      }

      return res.status(200).json({ data: gotProduct });
    } catch (error) {
      next(error);
    }
  };

  // 상품 수정
  updateProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, content, status } = req.body;
      const { userId: userId, name: userName } = res.locals.user;

      if (!title && !content && !status) {
        return res.status(400).json({ message: '수정한 정보가 없습니다.' });
      }

      if (status !== 'FOR_SALE' || status !== 'SOLD_OUT') {
        return res.status(400).json({
          message: '상품의 판매상태가 올바르지 않습니다. (FOR_SALE or SOLD_OUT)'
        });
      }

      const updatedProduct = await ProductsService.updateProduct(id, title, content, status, userId, userName);

      if (!updatedProduct) {
        return res.status(404).json({ message: '상품 조회에 실패했습니다.' });
      }

      // 제대로 기능 수행 못할것같음
      // if (updatedProduct.userId !== userId) {
      //   return res.status(403).json({ message: '작성자만 수정할 수 있습니다.' });
      // }

      return res.status(200).json({ data: updatedProduct });
    } catch (error) {
      next(error);
    }
  };

  // 상품 삭제
  deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId, userName } = res.locals.user;

      const deletedProduct = await ProductsService.deleteProduct(id, userId, userName);

      if (!product) {
        return res.status(404).json({ message: '상품 조회에 실패했습니다.' });
      }

      // 제대로 기능 수행 못할것같음
      // if (product.userId !== userId) {
      //   return res.status(403).json({ message: '작성자만 삭제할 수 있습니다.' });
      // }

      return res.status(200).json({ data: deletedProduct });
    } catch (error) {
      next(error);
    }
  };
}
