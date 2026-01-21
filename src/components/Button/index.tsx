import type { JSX } from "react";
import classes from "./styles.module.css";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  label: string;
};

const Button = ({
  label,
  type = "button",
  className,
  "aria-label": ariaLabel,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      aria-label={ariaLabel ?? label}
      className={`${classes.button} ${className ?? ""}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
