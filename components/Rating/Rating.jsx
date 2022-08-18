import React from "react";
import cn from "classnames";

/* Style */
import styles from "./Rating.module.scss";
import Icon from "../Icon/Icon";

const Rating = ({ type, position, x, y, index, value }) => {
  let customStyles = {
    position: position && "absolute",
    top: y,
    left: x,
    zIndex: index,
  };

  return (
    <div className={styles.root} style={customStyles}>
      <Icon icon="star" size={16} />
      {value}
    </div>
  );
};

export default Rating;
