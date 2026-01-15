import { useContext } from 'react';
import DataContext from '../data/DataProvider';

export const useUsers = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useUsers must be used within a DataProvider');
  }
  const { users } = context;
  return users;
};
