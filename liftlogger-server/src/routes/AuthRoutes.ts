import { Body, Controller, Middlewares, Post, Route } from 'tsoa';
import UserController from '../controllers/UsersController';
import { shouldBeAuthenticated } from '../middlewares/auth';
import { UserCreationParams } from '../models/UserModel';
import PrismaUtils from '../utils/PrismaUtils';

@Route('auth')
export class AuthRoutes extends Controller {
  userController: UserController = new UserController(PrismaUtils.getPrismaInstance());

  /**
   * Tries to create a new user. If the user email passed through the body
   * is not in DB, then it will create a new user from that. Otherwise, it will
   * do nothing.
   *
   * @param user User information to create a new user in DB.
   * @returns Whether a new user was successfully created or not.
   */
  @Post('createUser')
  @Middlewares([shouldBeAuthenticated])
  public async createUser(@Body() user: UserCreationParams): Promise<boolean> {
    const userExists = (await this.userController.get(user.email)) !== null;

    if (userExists) {
      return false;
    }

    await this.userController.create(user);

    return true;
  }
}
