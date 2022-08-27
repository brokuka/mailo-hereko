import React, { forwardRef } from "react";
import cn from "classnames";
import Spinner from "../Spinner/Spinner";
import { chooseIcon } from "../Icon/Icon";

/* Style */
import styles from "./Button.module.scss";
import Spinner from "../Spinner/Spinner";

const Button = (
  {
    icon,
    iconPos = "left",
    children,
    className,
    type = "default",
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
            [styles.default]: type === "default" && type !== "card",
          })}
          ref={ref}
          {...props}
        >
          <>
            {leftIcon &&
              chooseIcon(icon, undefined, [styles.icon, styles.icon_left])}
            {rightIcon &&
              chooseIcon(icon, undefined, [styles.icon, styles.icon_right])}
            {children && <span>{children}</span>}
          </>
        </button>
      )}
    </>
  );
};

export default forwardRef(Button);
