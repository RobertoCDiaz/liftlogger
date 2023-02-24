import { User, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class UserController {
  static async get(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  }

  static async create(user: User) {
    return await prisma.user.create({
      data: user,
    });
  }
}
