import React, { forwardRef } from "react";
import cn from "classnames";

import LogoIcon from "./icons/logo.svg";
import LikeIcon from "./icons/like.svg";
import WatchedIcon from "./icons/already-watched.svg";
import AddIcon from "./icons/add.svg";
import BurgerIcon from "./icons/burger.svg";
import CloseIcon from "./icons/close.svg";

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

  const choosedIcon = (...classes) => {
    switch (icon) {
      case "logo":
        return <LogoIcon className={cn(...classes)} />;
      case "like":
        return <LikeIcon className={cn(...classes)} />;
      case "watched":
        return <WatchedIcon className={cn(...classes)} />;
      case "add":
        return <AddIcon className={cn(...classes)} />;
      case "burger":
        return <BurgerIcon className={cn(...classes)} />;
      case "close":
        return <CloseIcon className={cn(...classes)} />;
    }
  };

  return (
    <>
      {loading && spinner ? (
        <>
          <Spinner variant={spinnerVariant} placeholder={placeholder} />
        </>
      ) : (
        <button
          className={cn(styles.root, className, {
            [styles.default]:
              type === "default" && type !== "card" && type !== "burger",
          })}
          ref={ref}
          {...props}
        >
          <>
            {leftIcon && choosedIcon(styles.icon, styles.icon_left)}
            {rightIcon && choosedIcon(styles.icon, styles.icon_right)}
            {children && <span>{children}</span>}
          </>
        </button>
      )}
    </>
  );
};

export default forwardRef(Button);
