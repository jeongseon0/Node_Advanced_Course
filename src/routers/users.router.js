import { Router } from 'express';
import authMiddleWare from '../middlewares/need-signin.middleware.js';

const usersRouter = Router();

// 내 정보 조회
usersRouter.get('/me', authMiddleWare, (req, res) => {
  try {
    const me = res.locals.user;

    res.status(200).json({ message: '내 정보 조회에 성공했습니다.', data: me });
  } catch (error) {
    res.status(500).json({ message: '예상치 못한 오류가 발생하였습니다.' });
  }
});

export default usersRouter;
