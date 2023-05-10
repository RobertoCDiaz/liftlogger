import { NextFunction, Request, Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { AuthService } from '../services/AuthService';

/**
 * Middleware that will return a 401 if a valid Access token JWT bearer token is not provided in the request.
 */
export const shouldBeAuthenticated = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_URL,
  tokenSigningAlg: 'RS256',
});

/**
 * Checks if the request comes from an authenticated user. If so, it fetches the user email
 * and adds it to the `Request` object.
 */
export async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_URL,
    tokenSigningAlg: 'RS256',
  })(req, res, async () => {
    if (!req.auth) {
      res.send('Unauthorized');
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth?.token);

    req.user_email = email;

    next();
  });
}
