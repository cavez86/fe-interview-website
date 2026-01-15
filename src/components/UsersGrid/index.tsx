import { useUsers } from '../../hooks/useUsers';

const UsersGrid = () => {
  const users = useUsers();
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          {user.name} - {user.role}
        </div>
      ))}
    </div>
  );
};

export default UsersGrid;
