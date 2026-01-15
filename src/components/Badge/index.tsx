import type { JSX } from 'react';
import type { Role } from '../../data/roles';
import classes from './styles.module.css';

export type BadgeProps = {
  role: Role;
  className?: string;
} & (
  | {
      tag: 'span';
    }
  | {
      tag: 'button';
      type?: JSX.IntrinsicElements['button']['type'];
      onClick?: () => void;
    }
);

const Badge = ({ role, tag, className, ...props }: BadgeProps) => {
  const Tag = tag;
  return (
    <Tag className={`${classes.badge} ${classes[role.toLowerCase()]} ${className ?? ''}`} {...props}>
      {role}
    </Tag>
  );
};

export default Badge;
