import React from "react";
import cn from "classnames";

/* Style */
import styles from "./Spinner.module.scss";

const Spinner = ({
  variant = "primary",
  size = "25px",
  placeholder = "Loading...",
}) => {
  const customStyles = {
    width: size,
    height: size,
  };

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.primary]: variant === "primary",
        [styles.secondary]: variant === "secondary",
        [styles.tertary]: variant === "tertary",
        [styles.grey]: variant === "grey",
        [styles.success]: variant === "success",
        [styles.error]: variant === "error",
        [styles.warning]: variant === "warning",
        [styles.white]: variant === "white",
        [styles.black]: variant === "black",
      })}
      tabIndex="-1"
    >
      <div className={cn(styles.root)} style={customStyles}>
        <span className="visually-hidden">Loading...</span>
      </div>
      {placeholder && <span className={styles.placeholder}>{placeholder}</span>}
    </div>
  );
};

export default Spinner;
