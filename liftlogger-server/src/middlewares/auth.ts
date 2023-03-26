import { auth } from 'express-oauth2-jwt-bearer';

/**
 * Middleware that will return a 401 if a valid Access token JWT bearer token is not provided in the request.
 */
export const shouldBeAuthenticated = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_URL,
  tokenSigningAlg: 'RS256',
});
