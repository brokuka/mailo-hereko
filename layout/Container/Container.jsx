import React from "react";
import cn from "classnames";
import { useMedia } from "react-use";

/* Style */
import styles from "./Container.module.scss";

const Container = ({ children, className }) => {
  console.log(styles);

  const isMobile = useMedia(`(min-width: ${styles.mobileW}px)`, null);
  const isTablet = useMedia(`(min-width: ${styles.tabletW}px)`, null);
  const isSmDesktop = useMedia(`(min-width: ${styles.smDesktopW}px)`, null);
  const isDesktop = useMedia(`(min-width: ${styles.containerW}px)`, null);

  return (
    <div
      className={cn(styles.root, {
        [styles.mobile]: isMobile,
        [styles.tablet]: isTablet,
        [styles.smDesktop]: isSmDesktop,
        [styles.desktop]: isDesktop,
      })}
    >
      {children}
    </div>
  );
};

export default Container;
