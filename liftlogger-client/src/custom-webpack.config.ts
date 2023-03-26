import { EnvironmentPlugin } from 'webpack';

module.exports = {
  plugins: [
    new EnvironmentPlugin([
      'SERVER_URL',
      'AUTH0_CLIENT_ID',
      'AUTH0_DOMAIN',
      'AUTH0_AUDIENCE',
      'AUTH0_CALLBACK_URL',
    ]),
  ],
};
