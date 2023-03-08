/**
 * Enviroment variables for this Angular application.
 */
export const environment = {
  production: false,
  serverUrl: process.env['SERVER_URL'] || 'http://localhost:3001/',
  auth0ClientId: process.env['AUTH0_CLIENT_ID'] || '',
  auth0Domain: process.env['AUTH0_DOMAIN'] || '',
  auth0Audience: process.env['AUTH0_AUDIENCE'] || '',
  auth0CallbackUrl: process.env['AUTH0_CALLBACK_URL'] || ''
};
