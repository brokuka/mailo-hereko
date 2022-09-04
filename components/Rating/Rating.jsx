import React from "react";

/* Style */
import styles from "./Rating.module.scss";
import Icon from "../Icon/Icon";

const Rating = ({ position, x, y, index, value }) => {
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
