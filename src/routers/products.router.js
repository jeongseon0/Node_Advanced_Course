import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import authMiddleware from '../middlewares/need-signin.middleware.js';

const productsRouter = Router();
const productsController = new ProductsController();

// 상품 작성
productsRouter.post('', authMiddleware, productsController.createProduct);
// 상품 목록 조회
productsRouter.get('', productsController.getProductAll);
// 상품 상세 조회
productsRouter.get('/:productId', productsController.getProductOne);
// 상품 수정
productsRouter.put('/:productId', authMiddleware, productsController.updateProduct);
// 상품 삭제
productsRouter.delete('/:productId', authMiddleware, productsController.deleteProduct);

export default productsRouter;
