import { User, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class UserController {
  /**
   * Fetches a single user from DB.
   *
   * @param email User email.
   * @returns An User object if their email was found in DB.
   */
  static async get(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  }

  /**
   * Inserts a new User into the DB.
   *
   * @param user User to be inserted.
   * @returns Newly created user row.
   */
  static async create(user: User) {
    return await prisma.user.create({
      data: user,
    });
  }
}
