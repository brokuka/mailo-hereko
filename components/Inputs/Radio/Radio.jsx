import React from "react";
import cn from "classnames";

/* Style */
import styles from "./Radio.module.scss";

const Radio = ({ Ref, id, value, label, state, onChange, style }) => {
  return (
    <div className={cn(styles.root, { [styles.active]: value === state })}>
      <input
        className={cn(styles.input, "visually-hidden")}
        type="radio"
        value={value}
        onChange={(e) => onChange(e.target)}
        checked={value === state}
        id={id}
        style={style}
        ref={Ref}
      />

      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Radio;
