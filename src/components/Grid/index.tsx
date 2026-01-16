import { useMemo } from "react";
import { filterUsers } from "../../data/users";
import { useFilters } from "../../hooks/useFilters";
import { useUsers } from "../../hooks/useUsers";
import Button from "../Button";
import Card from "../Card";
import classes from "./styles.module.css";

const Grid = () => {
  const { search, role, setSearch, setRoleFilter } = useFilters();
  const { users, loading, error } = useUsers();

  const resetFilters = () => {
    setSearch(null);
    setRoleFilter(null);
  };

  const filteredUsers = useMemo(() => filterUsers(users, role), [users, role]);

  if (loading) {
    return <p className={classes.message}>Loading users...</p>;
  }

  if (error) {
    return (
      <div className={classes.message}>
        <p>Error loading users: {error.message}</p>
        <Button label="Retry" className={classes.button} onClick={resetFilters} />
      </div>
    );
  }

  if (search?.length && !filteredUsers.length) {
    return (
      <div className={classes.message}>
        <p>
          No users found for "{search}" {role && `with role "${role}"`}
        </p>
        <Button label="Clear filters" className={classes.button} onClick={resetFilters} />
      </div>
    );
  }

  return (
    <div className={classes.grid}>
      {filteredUsers.map((user) => (
        <Card key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Grid;
