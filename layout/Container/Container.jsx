import React from "react";

/* Style */
import styles from "./Container.module.scss";

const Container = ({ children, className }) => {
  return <div className={styles.root}>{children}</div>;
};

export default Container;
