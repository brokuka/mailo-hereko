import React from "react";
import cn from "classnames";

/* Style */
import styles from "./Radio.module.scss";

const Radio = ({ Ref, value, label, state, onChange }) => {
  const onClick = (e) => {
    if (
      e.type === "mousedown" ||
      (e.type === "keydown" &&
        (e.key === " " || e.key === "Space" || e.key === "Enter"))
    ) {
      e.preventDefault();
      onChange(e.target.firstElementChild);
    }
  };

  return (
    <label
      className={cn(styles.root, { [styles.active]: value === state })}
      onKeyDown={(e) => onClick(e)}
      onClick={(e) => onClick(e)}
      tabIndex={0}
    >
      <input
        className={cn(styles.input, "visually-hidden")}
        type="radio"
        value={value}
        onChange={(e) => onChange(e.target)}
        checked={state === value}
        ref={Ref}
        tabIndex={-1}
      />
      {label}
    </label>
  );
};

export default Radio;
