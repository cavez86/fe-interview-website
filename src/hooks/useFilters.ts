import { useContext } from 'react';
import DataContext from '../data/DataProvider';

export const useFilters = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useFilters must be used within a DataProvider');
  }
  const { filters, setSearch, setRoleFilter } = context;
  return { filters, setSearch, setRoleFilter };
};
