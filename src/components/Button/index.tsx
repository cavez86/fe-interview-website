import type { JSX } from "react";
import classes from "./styles.module.css";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  label: string;
};

const Button = ({ label, type = "button", className, ...props }: ButtonProps) => {
  return (
    <button type={type} className={`${classes.button} ${className ?? ""}`} {...props}>
      {label}
    </button>
  );
};

export default Button;
