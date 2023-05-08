import { User } from '@prisma/client';
import { UserInfo } from '../services/AuthService';
/**
 * A response mock for the `getUserInfo()` method of the `AuthService`.
 *
 * @see {@link UserInfo}
 *
 * @param baseUser User object to be used as base
 * @returns User information in the shape of UserInfo.
 */
export const userResponseMock = (baseUser: User) =>
  ({
    email: baseUser.email,
  } as UserInfo);
