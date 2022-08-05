import React from "react";
import LogoIcon from "./icons/logo.svg";

/* Style */
import styles from "./Input.module.scss";
import cn from "classnames";

const Input = (
  { icon = "", type, id, label, placeholder, className, ...props },
  ref
) => {
  const iconBoth = icon === "both";
  const leftIcon = iconBoth || icon === "left";
  const rightIcon = iconBoth || icon === "right";

  return (
    <div className={styles.wrapper}>
      {leftIcon && <LogoIcon className={cn(styles.icon, styles.icon_left)} />}
      {rightIcon && <LogoIcon className={cn(styles.icon, styles.icon_right)} />}

      <input
        className={cn(styles.root, className)}
        id={id}
        placeholder={placeholder}
        type={type}
        ref={ref}
        {...props}
      />

      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default React.forwardRef(Input);
