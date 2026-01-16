import { useEffect, useMemo, useState } from "react";
import { filterUsers, searchUsers, type User } from "../data/users";
import { useFilters } from "./useFilters";

export const useUsers = () => {
  const { role, search } = useFilters();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [loadedUsers, setLoadedUsers] = useState<User[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    setError(null);

    searchUsers(search, { signal: abortController.signal })
      .then((users) => {
        setLoadedUsers(users);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [search]);

  const filteredUsers = useMemo(() => filterUsers(loadedUsers, role), [loadedUsers, role]);

  return {
    users: filteredUsers,
    loading,
    error,
  };
};
