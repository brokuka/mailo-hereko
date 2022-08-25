import React from "react";
import Icon from "../Icon/Icon";
import cn from "classnames";

/* Style */
import styles from "./Placeholder.module.scss";

const Placeholder = ({ type, iconSize = 160 }) => {
  return (
    <div
      className={cn(styles.root, {
        [styles.backdrop]: type === "backdrop",
        [styles.poster]: type === "poster",
      })}
    >
      <Icon icon="logoPlaceholder" size={iconSize} />
    </div>
  );
};

export default Placeholder;
