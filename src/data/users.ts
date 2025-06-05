// src/data/users.ts

export interface User {
  username: string;
  password: string;
  role: 'admin' | 'viewer';
}

export const hardcodedUsers: User[] = [
  {
    username: 'user1',
    password: 'user1',
    role: 'admin',
  },
  {
    username: 'user2',
    password: 'user2',
    role: 'viewer',
  },
];
