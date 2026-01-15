import { ROLES, type Role } from '../../data/roles';
import Badge from '../Badge';

import classes from './styles.module.css';

const Filters = () => {
  const handleClick = (role: Role) => () => {
    console.log(`Filter by role: ${role}`);
  };

  return (
    <div className={classes.filters}>
      <span className={classes.label}>Filter by:</span>
      {ROLES.map((role) => (
        <Badge onClick={handleClick(role)} key={role} role={role} tag='button' type='button' />
      ))}
    </div>
  );
};

export default Filters;
