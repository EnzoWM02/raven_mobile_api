import { Prisma } from 'prisma/client';

export default class LoginTokenService {
  async delete(id: number) {
    await Prisma.loginToken.delete({
      where: {
        id,
      },
    });
  }

  async findByTokenAndUserId(token: string, userId: number){
    const loginToken = await Prisma.loginToken.findUnique({
      where: {
        userId,
        token
      }
    })

    return loginToken;
  }
}
