import React, { forwardRef } from "react";
import cn from "classnames";
import Spinner from "@component/Spinner/Spinner";
import { chooseIcon } from "@component/Icon/Icon";

/* Style */
import styles from "./Button.module.scss";

const Button = (
  {
    icon,
    iconPos = "left",
    iconClass,
    children,
    className,
    style = "default",
    type = "button",
    asyncData,
    spinner,
    spinnerVariant,
    placeholder,
    ...props
  },
  ref
) => {
  const iconBoth = iconPos === "both";
  const leftIcon = iconBoth || iconPos === "left";
  const rightIcon = iconBoth || iconPos === "right";

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (asyncData) {
      return setLoading(true);
    }

    return setLoading(false);
  }, [asyncData]);

  return (
    <>
      {loading && spinner ? (
        <>
          <Spinner variant={spinnerVariant} placeholder={placeholder} />
        </>
      ) : (
        <button
          className={cn(styles.root, className, {
            [styles.default]: style === "default",
            [styles.password]: style === "password",
          })}
          ref={ref}
          type={type}
          {...props}
        >
          <>
            {leftIcon &&
              chooseIcon({
                icon,
                size: 24,
                className: [styles.icon, styles.icon_left],
              })}
            {rightIcon &&
              chooseIcon({
                icon,
                className: [styles.icon, styles.icon_right],
              })}
            {children && <span>{children}</span>}
          </>
        </button>
      )}
    </>
  );
};

export default forwardRef(Button);
