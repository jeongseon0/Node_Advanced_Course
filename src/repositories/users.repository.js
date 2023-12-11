import { prisma } from '../utils/prisma/index.js';

export class UsersRepository {
  signup = async (email, name, password) => {
    const signedupUser = await prisma.user.create({ data: { email, name, password } });

    return signedupUser;
  };

  signin = async (email, password) => {
    const signedinUser = await prisma.user.findUnique({ where: { email } });

    return signedinUser;
  };

  myInfo = async (me) => {
    const getMyInfo = await prisma.user.findUnique({ where: { id } });

    return getMyInfo;
  };
}
