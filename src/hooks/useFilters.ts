import { useContext } from 'react';
import FiltersContext from '../providers/FiltersProvider';

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within a DataProvider');
  }

  const { role, search, setSearch, setRoleFilter } = context;

  return { search, setSearch, roleFilter: role, setRoleFilter };
};
