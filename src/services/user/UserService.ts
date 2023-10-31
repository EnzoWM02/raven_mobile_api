import { User } from "@prisma/client";
import { Prisma } from "prisma/client";
import crypto from "crypto";

export default class UserService {
  async createUser({ name, email, password }: User) {
    await Prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    const token = crypto.randomBytes(16).toString("hex");

    return token;
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
    });
    return user;
  }

  async findUserByEmailAndPassword({email, password}: User) {
    const user = await Prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });
    return user;
  }

  async deleteUserById(id: number) {
    await Prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
