import { useUsers } from '../../hooks/useUsers';
import UserCard from '../UserCard';

const UsersGrid = () => {
  const users = useUsers();
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersGrid;
