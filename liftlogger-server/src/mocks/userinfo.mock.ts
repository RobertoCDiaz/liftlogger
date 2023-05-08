import { UserInfo } from '../services/AuthService';

/**
 * A response mock for the `getUserInfo()` method of the `AuthService`.
 *
 * @see {@link UserInfo}
 */
export const userResponseMock = {
  email: 'testing@test.com',
} as UserInfo;
