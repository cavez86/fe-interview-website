import type { User } from '../../data/users';
import Badge from '../Badge';
import Button from '../Button';
import classes from './styles.module.css';

type UserCardProps = {
  user: User;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className={classes.card}>
      <Badge tag='span' role={user.role} className={classes.badge} />
      <div>
        <div className={classes.name}>{user.name}</div>
        <div className={classes.title}>{user.title}</div>
      </div>

      <div>
        <div className={classes.label}>Team:</div>
        <div className={classes.team}>{user.team}</div>
      </div>

      <div>
        <div className={classes.label}>Contact information:</div>
        <div className={classes.email}>{user.email}</div>
      </div>

      <Button label='View details' className={classes.button} />
    </div>
  );
};

export default UserCard;
