import type { Role } from './roles';

export type User = {
  id: number;
  name: string;
  role: Role;
  title: string;
  team: string;
  email: string;
  details: string;
};

export const users: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'ADMIN',
    title: 'Senior Developer',
    team: 'Frontend',
    email: 'alice.johnson@example.com',
    details: 'Alice has over 10 years of experience in web development.',
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'EDITOR',
    title: 'Content Manager',
    team: 'Marketing',
    email: 'bob.smith@example.com',
    details: 'Bob is responsible for overseeing content creation and strategy.',
  },
];
