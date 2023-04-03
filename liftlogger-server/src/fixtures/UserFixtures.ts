import { User } from '@prisma/client';

export const usersFixture: User[] = [
  {
    email: 'testing@test.com',
  },
  {
    email: 'second@test.com',
  },
  {
    email: 'another@test.com',
  },
];
