import express from 'express';

/**
 * Mocks an Express request that has no `auth` property.
 * I.e. comes from an unauthenticated user.
 */
export const noAuthRequestMock = {} as express.Request;

/**
 * Mocks an Express request that has an `auth` property.
 * I.e. comes from an authenticated user.
 */
export function authRequestMock(): express.Request {
  const mock = {
    auth: { token: 'M0CK3dt0k3N' },
  };

  return JSON.parse(JSON.stringify(mock));
}

/**
 * A mocked Request object that already has an user_email.
 * I.e. successfully passed the authentication middleware.
 */
export const emailRequestMock = {
  user_email: 'testing@test.com',
} as express.Request;
