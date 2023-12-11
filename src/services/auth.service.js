import { UsersRepository } from '../repositories/users.repository.js';
import { ErrorHandler } from '../middlewares/error-handler.middleware.js';
import { hashSync, compareSync } from 'bcrypt';
import security from '../../config/config.js';
import pkg from 'jsonwebtoken';
const { saltORrounds, token_secretKey, token_expiresIn } = security;
const { sign } = pkg;

export class AuthService {
  usersRepository = new UsersRepository();

  signup = async (email, name, password, confirmPassword) => {
    if (!email) throw new ErrorHandler(400, '이메일을 입력해주세요.');

    if (!name) throw new ErrorHandler(400, '이름을 입력해주세요.');

    if (!password) throw new ErrorHandler(400, '비밀번호를 입력해주세요.');

    if (!confirmPassword) throw new ErrorHandler(400, '비밀번호 확인을 입력해주세요.');

    if (password.length < 6) throw new ErrorHandler(400, '비밀번호는 최소 6자입니다.');

    if (password !== confirmPassword) throw new ErrorHandler(404, '입력한 비밀번호가 서로 일치하지 않습니다.');

    let emailValidationRegex = new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}');
    const isValidEmail = emailValidationRegex.test(email);
    if (!isValidEmail) throw new ErrorHandler(400, '올바른 이메일 형식이 아닙니다.');

    const ExistingUser = await Users.findOne({ where: { email } });
    if (ExistingUser) throw new ErrorHandler(400, '이미 가입된 이메일입니다.');

    const hashedPassword = hashSync(password, saltORrounds);
    const signedupUser = await this.usersRepository.signup(email, name, hashedPassword);

    return {
      id: signedupUser.id,
      email: signedupUser.email,
      name: signedupUser.name,
      // password: signedupUser.password,
      createdAt: signedupUser.createdAt,
      updatedAt: signedupUser.updatedAt
    };
  };

  signin = async (email, password) => {
    if (!email) throw new ErrorHandler(400, '이메일을 입력해주세요.');

    if (!password) throw new ErrorHandler(400, '비밀번호를 입력해주세요.');

    const signedinUser = await this.usersRepository.signin(email, password);

    const hashedPassword = signedinUser?.password ?? '';
    const passwordsMatched = compareSync(password, hashedPassword);

    if (!signedinUser || !passwordsMatched)
      throw new ErrorHandler(400, '가입되지 않은 이메일 또는 틀린 비밀번호입니다.');

    const token = sign({ userId: signedinUser.id }, token_secretKey, { expiresIn: token_expiresIn });

    return token;
  };
}
