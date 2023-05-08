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
export const authRequestMock = {
  auth: { token: 'M0CK3dt0k3N' },
} as express.Request;
