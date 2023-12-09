import { prisma } from '../utils/prisma/index.js';
export class ProductsRepository {
  createProduct = async (userId, userName, title, content) => {
    const createdProduct = await prisma.product.create({ data: { userId, userName, title, content } });

    return createdProduct;
  };

  getProductsAll = async (upperCaseSort) => {
    const products = await prisma.product.findMany({
      select: ['id', 'title', 'content', 'userId', 'status', [col('user.name'), 'userName'], 'createdAt', 'updatedAt'],
      order: ['createdAt', upperCaseSort],
      include: { model: Users, as: 'user', attributes: [] }
    });

    return products;
  };

  getProductOne = async (id) => {
    const product = await prisma.product.findFirst({
      select: ['id', 'title', 'content', 'userId', 'status', [col('user.name'), 'userName'], 'createdAt', 'updatedAt'],
      include: { model: Users, as: 'user', attributes: [] }
    });

    return product;
  };
  updateProduct = async (id, title, content, status) => {
    const updatedProduct = await prisma.product.update({ where: { id } }, { data: { title, content, status } });

    return updatedProduct;
  };
  deleteProduct = async (id) => {
    const deletedProduct = await prisma.product.delete({ where: { id } });

    return deletedProduct;
  };
}
