import { allUsers } from "./mockedUsers";
import type { Role } from "./roles";

export type User = {
  id: number;
  name: string;
  role: Role;
  title: string;
  team: string;
  email: string;
  details: string;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const searchUsers = async (
  search: string | null,
  options?: { signal?: AbortSignal; forceFail?: boolean },
): Promise<User[]> => {
  console.log(`Searching users with term: "${search}"`);
  options?.signal?.throwIfAborted();

  const fails = options?.forceFail ?? Math.random() < 0.1;
  if (fails) {
    throw new Error("Failed to fetch users");
  }

  options?.signal?.throwIfAborted();
  await wait(500);
  return allUsers.filter(
    (user) => !search || user.name.toLowerCase().includes(search.toLowerCase()),
  );
};

export const filterUsers = (users: User[], role: Role | null): User[] =>
  users.filter((user) => !role || user.role === role);
