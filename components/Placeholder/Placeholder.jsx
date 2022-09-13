import React from "react";
import cn from "classnames";
import Icon from "@component/Icon/Icon";

/* Style */
import styles from "./Placeholder.module.scss";

const Placeholder = ({ type, iconSize = 160, filter }) => {
  const getPlaceholderByType = () => {
    switch (type) {
      case "fetching":
        return (
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
        );

      case "filterType":
        return <div className={styles.filter_type}></div>;

      default:
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
    }
  };

  return <>{getPlaceholderByType()}</>;
};

export default Placeholder;
