import { useFilters } from '../../hooks/useFilters';
import { useUsers } from '../../hooks/useUsers';
import Button from '../Button';
import UserCard from '../UserCard';

import classes from './styles.module.css';

const UsersGrid = () => {
  const { search, role, setSearch, setRoleFilter } = useFilters();
  const users = useUsers();

  const resetFilters = () => {
    setSearch(null);
    setRoleFilter(null);
  };

  if (search?.length && !users.length) {
    return (
      <div className={classes.noResults}>
        <p>
          No users found for "{search}" {role && `with role "${role}"`}
        </p>
        <Button label='Clear filters' className={classes.button} onClick={resetFilters} />
      </div>
    );
  }

  return (
    <div className={classes.grid}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersGrid;
