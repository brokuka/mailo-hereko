import React from "react";
import cn from "classnames";

/* Style */
import styles from "./Container.module.scss";

const Container = ({ children, className }) => {
  return <div className={cn(styles.root, className)}>{children}</div>;
};

export default Container;
