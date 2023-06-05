import { User } from '@prisma/client';

export function getUsersFixture(): User[] {
  return JSON.parse(JSON.stringify(usersFixture));
}

const usersFixture: User[] = [
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
