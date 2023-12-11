import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import authMiddleware from '../middlewares/need-signin.middleware.js';

const usersRouter = Router();
const usersController = new UsersController();

// 내 정보 조회
usersRouter.get('/me', authMiddleware, usersController.getMyInfo);

export default usersRouter;
