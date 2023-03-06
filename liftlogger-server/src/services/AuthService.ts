/**
 * Basic user information fetched from a `/userinfo` request.
 *
 * @see {@link getUserInfo} to see the `/userinfo` request.
 */
export type UserInfo = {
  /**
   * User's nickname inside the application.
   */
  nickname: string;

  /**
   * Fullname of the user.
   */
  name: string;

  /**
   * Email of the user.
   */
  email: string;

  /**
   * Auth method for this user.
   */
  sub: string;

  /**
   * URL to the user's profile picture.
   */
  pictureUrl: string;
}

/**
 * Collection of functions to help in User Auth.
 */
export class AuthService {

  /**
   * Fetches user information for a given access token.
   *
   * @param accessToken Provided Access Token.
   * @returns Information on the access token's owner.
   */
  async getUserInfo(accessToken: string): Promise<UserInfo> {

    const headers = new Headers();

    headers.set('Authorization', `Bearer ${accessToken}`);

    return await (await fetch(process.env.AUTH0_ISSUER_URL + '/userinfo', { headers })).json()
  }
}
