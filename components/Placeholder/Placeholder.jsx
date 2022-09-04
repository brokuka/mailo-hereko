import React from "react";
import cn from "classnames";
import Icon from "@component/Icon/Icon";

/* Style */
import styles from "./Placeholder.module.scss";

const Placeholder = ({ type, iconSize = 160 }) => {
  return (
    <>
      {type === "fetching" ? (
        <div className={styles.fetching}>
          <div className={styles.header}>
            <div className={styles.rating}></div>
          </div>

          <div className={styles.title}></div>

          <div className={styles.button}>
            <div className={styles.circle}></div>
            <div className={styles.line}></div>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Placeholder;
