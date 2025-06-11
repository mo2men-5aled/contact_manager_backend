// src/data/users.ts

export interface User {
  username: string;
  password: string;
}

export const hardcodedUsers: User[] = [
  {
    username: 'user1',
    password: 'user1',
  },
  {
    username: 'user2',
    password: 'user2',
  },
];
