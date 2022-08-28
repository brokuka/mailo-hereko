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
        [styles.poster_card]: type === "posterCard",
      })}
    >
      <Icon icon="logoPlaceholder" size={iconSize} />
      {type === "posterCard" && <span>Image not found</span>}
    </div>
  );
};

export default Placeholder;
