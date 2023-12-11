import { ILogin } from 'controller/login/LoginController';
import UserService from 'services/user/UserService';
import HttpError from 'utils/HttpError';
import crypto from 'crypto';

import { Prisma } from 'prisma/client';
import LoginTokenService from 'services/loginToken/LoginTokenService';

export default class LoginService {
  userService = new UserService();
  loginTokenService = new LoginTokenService();

  async handleLogin({ email, password }: ILogin) {
    const user = await this.userService.findUserByEmailAndPassword({ email, password });
    if (!user) {
      throw new HttpError('User not found', 404);
    }
    
    if (user.loginToken) {
      await this.loginTokenService.delete(user.loginToken.id);
    }

    const token = await this.generateUserToken();
    const persistedToken = await Prisma.loginToken.create({
      data: {
        token,
        user: {
          connect: {
            id: user.id
          }
        }
      }
    })
    
    return persistedToken;
  }

  async generateUserToken(): Promise<string> {
    const token = crypto.randomBytes(16).toString('hex');

    const tokenExists = await Prisma.loginToken.findUnique({
      where: {
        token: token,
      },
    });

    if (tokenExists) {
      return this.generateUserToken();
    }

    return token;
  }
}
