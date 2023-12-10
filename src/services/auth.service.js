import { UsersRepository } from '../repositories/users.repository.js';
import { ErrorHandler } from '../middlewares/error-handler.middleware.js';
import { hashSync, compareSync } from 'bcrypt';
import { saltORrounds, token_secretKey, token_expiresIn } from './config/config.js';
import { sign } from 'jsonwebtoken';
export class AuthService {
  usersRepository = new UsersRepository();

  signup = async (email, name, password, confirmPassword) => {
    if (!email) return res.status(400).json({ message: '이메일을 입력해주세요.' });

    if (!name) return res.status(400).json({ message: '이름을 입력해주세요.' });

    if (!password) return res.status(400).json({ message: '비밀번호를 입력해주세요.' });

    if (!confirmPassword) return res.status(400).json({ message: '비밀번호를 다시 한 번 입력해주세요.' });

    if (password.length < 6) return res.status(400).json({ message: '비밀번호는 최소 6자 입니다.' });

    if (password !== confirmPassword)
      return res.status(404).json({ message: '입력한 비밀번호가 서로 일치하지 않습니다.' });

    let emailValidationRegex = new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}');
    const isValidEmail = emailValidationRegex.test(email);
    if (!isValidEmail) return res.status(400).json({ message: '올바른 이메일 형식이 아닙니다.' });

    const ExistingUser = await Users.findOne({ where: { email } });
    if (ExistingUser) return res.status(400).json({ message: '이미 가입된 이메일입니다.' });

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
    if (!email) return res.status(400).json({ message: '이메일을 입력해주세요.' });

    if (!password) return res.status(400).json({ message: '비밀번호를 입력해주세요.' });

    const signedinUser = await this.usersRepository.signin(email, password);

    const hashedPassword = signedinUser?.password ?? '';
    const passwordsMatched = compareSync(password, hashedPassword);

    if (!signedinUser || !passwordsMatched) {
      return res.status(401).json({ message: '가입되지 않은 이메일 또는 일치하지 않는 비밀번호입니다.' });
    }

    const token = sign({ userId: signedinUser.id }, token_secretKey, { expiresIn: token_expiresIn });

    return token;
  };
}
