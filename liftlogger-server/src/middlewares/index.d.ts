import { Request } from 'express';

export {};

declare global {
  namespace Express {
    export interface Request {
      /**
       * A custom property for Liftlogger that stores the user email for every request.
       */
      user_email: string;
    }
  }
}
