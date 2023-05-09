import { User, PrismaClient } from '@prisma/client';
import { UserCreationParams } from '../models/UserModel';

export default class UserController {
  constructor(private prisma: PrismaClient) {}

  /**
   * Fetches a single user from DB.
   *
   * @param email User email.
   * @returns An User object if their email was found in DB.
   */
  async get(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
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
  async create(user: UserCreationParams): Promise<User> {
    return await this.prisma.user.create({
      data: user,
    });
  }
}
