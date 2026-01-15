import { createContext, type ReactNode, useMemo, useState } from 'react';
import type { Role } from '../data/roles';

export type FiltersState = {
  search: string | null;
  role: Role | null;
  setSearch: (search: string | null) => void;
  setRoleFilter: (role: Role | null) => void;
};

const FiltersContext = createContext<FiltersState | null>(null);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string | null>(null);
  const [role, setRoleFilter] = useState<Role | null>(null);

  const contextValue = useMemo<FiltersState>(
    () => ({
      search,
      role,
      setSearch,
      setRoleFilter,
    }),
    [search, role],
  );

  return <FiltersContext value={contextValue}>{children}</FiltersContext>;
};

export default FiltersContext;
