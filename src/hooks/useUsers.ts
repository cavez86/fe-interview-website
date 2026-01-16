import { useMemo } from 'react';
import { allUsers, filterUsers } from '../data/users';
import { useFilters } from './useFilters';

export const useUsers = () => {
  const { role, search } = useFilters();

  const filteredUsers = useMemo(() => filterUsers(allUsers, search, role), [search, role]);

  return filteredUsers;
};
