import { useUsers } from '../../hooks/useUsers';
import UserCard from '../UserCard';

import classes from './styles.module.css';

const UsersGrid = () => {
  const users = useUsers();
  return (
    <div className={classes.grid}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersGrid;
