import { createContext, type ReactNode, useCallback, useMemo } from "react";
import { searchUsers, type User } from "../data/users";
import { useFetch } from "../hooks/useFetch";
import { useFilters } from "../hooks/useFilters";

export type UsersState = {
  users: User[];
  loading: boolean;
  error: Error | null;
};

const UsersContext = createContext<UsersState | null>(null);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const { search } = useFilters();

  const fetchFn = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      return searchUsers(search, { signal });
    },
    [search],
  );

  const { data, loading, error } = useFetch<User[]>(fetchFn);

  const contextValue = useMemo<UsersState>(
    () => ({
      users: data || [],
      loading,
      error,
    }),
    [data, loading, error],
  );

  return <UsersContext value={contextValue}>{children}</UsersContext>;
};

export default UsersContext;
