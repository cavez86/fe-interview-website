import type { JSX } from "react";
import type { Role } from "../../data/roles";
import classes from "./styles.module.css";

export type BadgeProps = {
  role: Role;
} & (
  | {
      tag: "span";
      className?: string;
    }
  | ({
      tag: "button";
    } & JSX.IntrinsicElements["button"])
);

const Badge = ({ role, tag, className, ...props }: BadgeProps) => {
  const Tag = tag;
  return (
    <Tag
      className={`${classes.badge} ${classes[role.toLowerCase()]} ${className ?? ""}`}
      aria-label={role}
      {...props}
    >
      {role}
    </Tag>
  );
};

export default Badge;
