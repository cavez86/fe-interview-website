import { ROLES, type Role } from '../../data/roles';
import { useFilters } from '../../hooks/useFilters';
import Badge from '../Badge';

import classes from './styles.module.css';

const Filters = () => {
  const { search, role: roleFilter, setRoleFilter } = useFilters();

  const handleClick = (role: Role) => () => {
    setRoleFilter(role === roleFilter ? null : role);
  };

  if (!search?.length) {
    return null;
  }

  return (
    <div className={classes.filters}>
      <span className={classes.label}>Filter by:</span>
      {ROLES.map((role) => (
        <Badge
          onClick={handleClick(role)}
          key={role}
          role={role}
          className={role === roleFilter ? classes.active : ''}
          tag='button'
          type='button'
        />
      ))}
    </div>
  );
};

export default Filters;
