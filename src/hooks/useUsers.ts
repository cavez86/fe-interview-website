import { useMemo } from 'react';
import { type User, users } from '../data/users';
import { useFilters } from './useFilters';

export const useUsers = () => {
  const { roleFilter, search } = useFilters();

  const filteredUsers = useMemo<User[]>(
    () =>
      users.filter((user) => {
        const matchesSearch = !!search && user.name.toLowerCase().includes(search.toLowerCase());
        const matchesRole = !roleFilter || user.role === roleFilter;
        return matchesSearch && matchesRole;
      }),
    [search, roleFilter],
  );

  return filteredUsers;
};
