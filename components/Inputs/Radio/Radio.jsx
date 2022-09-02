import React from "react";
import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { filterType } from "store/filter/filter.selector";
import { setFilterType } from "store/filter/filterSlice";

/* Style */
import styles from "./Radio.module.scss";

const Radio = ({ value, label, filter }, ref) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(value);

  const type = useSelector(filterType);

  const onKeyDown = (e) => {
    if (
      e.key !== " " &&
      e.key !== "Tab" &&
      e.key !== "Shift" &&
      e.key !== "Enter" &&
      e.type !== "click"
    ) {
      return;
    }

    if (e.key === " " || e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      filter &&
        value !== type &&
        dispatch(setFilterType(e.target.firstChild.value));
    }
  };

  return (
    <label
      className={cn(styles.root, { [styles.active]: value === type })}
      onKeyDown={(e) => onKeyDown(e)}
      onClick={(e) => onKeyDown(e)}
      tabIndex={0}
    >
      <input
        className={cn(styles.input, "visually-hidden")}
        type="radio"
        value={value}
        onChange={(e) => onClick(e)}
        checked={type === value || state === value}
        ref={ref}
        disabled
      />
      {label}
    </label>
  );
};

export default React.forwardRef(Radio);
