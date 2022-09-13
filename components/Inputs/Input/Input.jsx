import React from "react";
import { chooseIcon } from "./../../Icon/Icon";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "react-use";
import { setFilterValue } from "@store/filter/filterSlice";
import { filterValue } from "@store/filter/filter.selector";
import useRouterChanged from "@hooks/useRouterChanged";
import { setEmail, setPassword } from "@store/auth/authSlice";
import { mergeRefs } from "react-merge-refs";

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
    store = true,
    onChange,
    value,
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

  const storeValue = useSelector(filterValue);
  const [val, setVal] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);

  const [, cancel] = useDebounce(
    () => {
      if (store) {
        switch (type) {
          case "password":
            return dispatch(setPassword(val));
          case "email":
            return dispatch(setEmail(val));
        }
        return dispatch(setFilterValue(val));
      }
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

    store && setVal(storeValue);
  }, [storeValue, store]);

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
          value={value ? value : val.length ? val : ""}
          onChange={(e) =>
            onChange ? onChange(e.target.value) : setVal(e.target.value)
          }
          type={showPass ? "text" : type}
          ref={mergeRefs([inputRef, ref])}
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
