import { createContext, type ReactNode, useMemo, useState } from 'react';
import type { Role } from './roles';
import { type User, users } from './users';

export type AppState = {
  users: User[];
  filters: {
    search: string | null;
    role: Role | null;
  };
  setSearch: (search: string | null) => void;
  setRoleFilter: (role: Role | null) => void;
};

const DataContext = createContext<AppState | null>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string | null>(null);
  const [role, setRoleFilter] = useState<Role | null>(null);

  const filteredUsers = useMemo<User[]>(
    () =>
      users.filter((user) => {
        const matchesSearch = !search || user.name.toLowerCase().includes(search.toLowerCase());
        const matchesRole = !role || user.role === role;
        return matchesSearch && matchesRole;
      }),
    [search, role],
  );

  const contextValue = useMemo<AppState>(
    () => ({
      users: filteredUsers,
      filters: {
        search,
        role,
      },
      setSearch,
      setRoleFilter,
    }),
    [search, role, filteredUsers],
  );

  return <DataContext value={contextValue}>{children}</DataContext>;
};

export default DataContext;
