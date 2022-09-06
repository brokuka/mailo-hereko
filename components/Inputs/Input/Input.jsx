import React from "react";
import { chooseIcon } from "./../../Icon/Icon";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "react-use";
import { setFilterValue } from "@store/filter/filterSlice";
import { filterValue } from "@store/filter/filter.selector";
import useRouterChanged from "@hooks/useRouterChanged";

/* Style */
import styles from "./Input.module.scss";
import Button from "@component/Button/Button";

const Input = (
  {
    icon = "",
    iconPos = "left",
    type = "text",
    label,
    placeholder = " ",
    className,
    maxWidth,
    withState = true,
    ...props
  },
  ref
) => {
  const dispatch = useDispatch();

  const iconBoth = iconPos === "both";
  const leftIcon = iconBoth || iconPos === "left";
  const rightIcon = iconBoth || iconPos === "right";

  useRouterChanged({ removeValue: true });

  const inputRef = React.useRef(null);
  const labelRef = React.useRef(null);

  const value = useSelector(filterValue);
  const [val, setVal] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);

  const [, cancel] = useDebounce(
    () => {
      !withState && dispatch(setFilterValue(val));
    },
    500,
    [val]
  );

  const getRefPropValue = (el, prop) => {
    return +getComputedStyle(el).getPropertyValue(prop).replace(/\D+/g, "");
  };

  React.useEffect(() => {
    const paddingLeft = getRefPropValue(inputRef.current, "padding-left");
    const paddingRight = getRefPropValue(inputRef.current, "padding-right");
    const borderWidth = getRefPropValue(inputRef.current, "border-width");
    const sum = paddingLeft + paddingRight + borderWidth;

    labelRef.current.style.width = `calc(100% - ${sum}px)`;
    labelRef.current.style.left = `${paddingLeft}px`;

    setVal(value);
  }, [value]);

  const typePassword = () => {
    return (
      type === "password" && (
        <Button style={type} onClick={() => setShowPass((state) => !state)}>
          {!showPass
            ? chooseIcon({
                icon: "showPass",
                className: [styles.icon],
              })
            : chooseIcon({
                icon: "hidePass",
                className: [styles.icon],
              })}
        </Button>
      )
    );
  };

  return (
    <div className={styles.wrapper} style={{ maxWidth }}>
      {leftIcon &&
        chooseIcon({ icon, className: [styles.icon, styles.icon_left] })}
      {rightIcon &&
        chooseIcon({ icon, className: [styles.icon, styles.icon_right] })}

      <label className={styles.label}>
        <input
          className={cn(styles.root, className)}
          placeholder={placeholder}
          value={val.length ? val : ""}
          onChange={(e) => setVal(e.target.value)}
          type={showPass ? "text" : type}
          ref={(e) => {
            inputRef.current = e;
            e = ref;
          }}
          {...props}
        />

        <span className={styles.label_text} ref={labelRef}>
          {label}
        </span>
      </label>

      {typePassword()}
    </div>
  );
};

export default React.forwardRef(Input);
