export class UsersController {
  getMyInfo = async (req, res) => {
    try {
      const me = res.locals.user;

      res.status(200).json({ message: '내 정보 조회에 성공했습니다.', data: me });
    } catch (error) {
      next(error);
    }
  };
}
//
