import React, { forwardRef } from "react";
import cn from "classnames";

import LogoIcon from "./icons/logo.svg";

/* Style */
import styles from "./Button.module.scss";

const Button = ({ icon = "", children, className, ...props }, ref) => {
  const iconBoth = icon === "both";
  const leftIcon = iconBoth || icon === "left";
  const rightIcon = iconBoth || icon === "right";

  return (
    <div className={styles.wrapper}>
      <button className={cn(styles.root, className)} ref={ref} {...props}>
        {leftIcon && <LogoIcon className={cn(styles.icon, styles.icon_left)} />}
        {rightIcon && (
          <LogoIcon className={cn(styles.icon, styles.icon_right)} />
        )}
        <span>{children}</span>
      </button>
    </div>
  );
};

export default forwardRef(Button);
