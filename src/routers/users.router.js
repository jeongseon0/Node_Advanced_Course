import { Router } from 'express';
import { UserController } from '../controllers/users.controller.js';
import { authMiddleware } from '../middlewares/need-signin.middleware.js';

const usersRouter = Router();
const usersController = new UserController();

// 내 정보 조회
usersRouter.get('/me', authMiddleware, usersController);

export default usersRouter;
