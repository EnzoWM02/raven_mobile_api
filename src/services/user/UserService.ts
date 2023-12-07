import { User } from '@prisma/client';
import { Prisma } from 'prisma/client';
import { ILogin } from 'controller/login/LoginController';
import { CreateAccountRequest } from 'controller/login/RegisterAccountController';
import { UserRequest } from 'controller/user/UserController';

export default class UserService {
  async createUser({user, userProfile}: UserRequest['body']) {
    return await Prisma.user.create({
      data: {
        ...user,
        userProfile: {
          create: {
            ...userProfile,
          },
        },
      },
    });
  }

  async createInitialUser(initialUser: CreateAccountRequest['body']) {
    const birthDate = new Date(initialUser.birthDate);
    const user = await Prisma.user.create({
      data: {
        ...initialUser,
        birthDate,
        userProfile: {
          create: {},
        },
      },
    });
    return user;
  }

  async findAllUsers() {
    const users = await Prisma.user.findMany();
    return users;
  }

  async findUserById(id: number) {
    const user = await Prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        userProfile: true,
      }
    });
    return user;
  }

  async findUserByEmailAndPassword({ email, password }: User | ILogin) {
    const user = await Prisma.user.findUnique({
      where: {
        email,
        password,
      },
      include: {
        loginToken: true,
      },
    });
    return user;
  }

  async updateUser({user, userProfile}: UserRequest['body'], id: number) {
    const updatedUser = await Prisma.user.update({
      where: {
        id,
      },
      data: {
        ...user,
        userProfile: {
          update: {
            where: {
              id: userProfile.id,
            },
            data: {
              ...userProfile,
            }
          }
        }
      },
    });
    return updatedUser;
  }

  async deleteUserById(id: number) {
    await Prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
