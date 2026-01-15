import type { JSX } from 'react';
import classes from './styles.module.css';

export type ButtonProps = {
  label: string;
  type?: JSX.IntrinsicElements['button']['type'];
  onClick?: () => void;
  className?: string;
};

const Button = ({ label, type = 'button', onClick, className }: ButtonProps) => {
  return (
    <button type={type} className={`${classes.button} ${className ?? ''}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
