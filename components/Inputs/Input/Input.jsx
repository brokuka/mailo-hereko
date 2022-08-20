import React from "react";
import cn from "classnames";
import { chooseIcon } from "../../Icon/Icon";

/* Style */
import styles from "./Input.module.scss";

const Input = (
  {
    icon,
    iconPos = "left",
    id,
    label,
    placeholder,
    className,
    value,
    ...props
  },
  ref
) => {
  const iconBoth = iconPos === "both";
  const leftIcon = iconBoth || iconPos === "left";
  const rightIcon = iconBoth || iconPos === "right";

  return (
    <div className={styles.wrapper}>
      {leftIcon && chooseIcon(icon, undefined, [styles.icon, styles.icon_left])}
      {rightIcon &&
        chooseIcon(icon, undefined, [styles.icon, styles.icon_right])}

      <input
        className={cn(styles.root, className)}
        id={id}
        placeholder={placeholder}
        type="text"
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
