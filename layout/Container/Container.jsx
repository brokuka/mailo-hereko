import React from "react";
// import cn from "classnames";
// import { useMedia } from "react-use";

/* Style */
import styles from "./Container.module.scss";

const Container = ({ children, className }) => {
  /*   const isMobile = useMedia(`(min-width: ${styles.mobileW}px)`, null);
  const isTablet = useMedia(`(min-width: ${styles.tabletW}px)`, null);
  const isSmDesktop = useMedia(`(min-width: ${styles.smDesktopW}px)`, null);
  const isDesktop = useMedia(`(min-width: ${styles.containerW}px)`, null); */

  return (
    <div
      /*       className={cn(styles.root, {
        [styles.mobile]: !isTablet && isMobile,
        [styles.tablet]: !isSmDesktop && isTablet,
        [styles.smDesktop]: !isDesktop && isSmDesktop,
        [styles.desktop]: isDesktop,
      })} */
      className={styles.root}
    >
      {children}
    </div>
  );
};

export default Container;
