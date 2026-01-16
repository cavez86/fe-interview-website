import type { User } from '../../data/users';
import { useModal } from '../../hooks/useModal';
import Badge from '../Badge';
import Button from '../Button';
import classes from './styles.module.css';

type CardProps = {
  user: User;
  mode?: 'compact' | 'detailed';
};

const Card = ({ user, mode = 'compact' }: CardProps) => {
  const { openModal } = useModal();
  const handleClick = () => {
    openModal(user);
  };

  return (
    <div className={`${classes.card} ${classes[mode]}`}>
      <Badge tag='span' role={user.role} className={classes.badge} />
      <div>
        <div className={classes.name}>{user.name}</div>
        <div className={classes.title}>{user.title}</div>
      </div>

      <div>
        <div className={classes.label}>Team:</div>
        <div className={classes.text}>{user.team}</div>
      </div>

      <div>
        <div className={classes.label}>Contact information:</div>
        <div className={`${classes.email} ${classes.text}`}>{user.email}</div>
      </div>

      {mode === 'detailed' && (
        <div>
          <div className={classes.label}>Other details:</div>
          <div className={classes.text}>{user.details}</div>
        </div>
      )}

      {mode === 'compact' && <Button label='View details' className={classes.button} onClick={handleClick} />}
    </div>
  );
};

export default Card;
