import { useMemo } from 'react';
import { allUsers, filterUsers } from '../data/users';
import { useFilters } from './useFilters';

export const useUsers = () => {
  const { roleFilter, search } = useFilters();

  const filteredUsers = useMemo(() => filterUsers(allUsers, search, roleFilter), [search, roleFilter]);

  return filteredUsers;
};
