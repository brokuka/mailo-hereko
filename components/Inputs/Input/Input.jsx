import React from "react";
import { chooseIcon } from "./../../Icon/Icon";
import cn from "classnames";

/* Style */
import styles from "./Input.module.scss";

const Input = (
  {
    icon = "",
    iconPos = "left",
    type = "text",
    label,
    placeholder,
    className,
    maxWidth,
    ...props
  },
  ref
) => {
  const iconBoth = iconPos === "both";
  const leftIcon = iconBoth || iconPos === "left";
  const rightIcon = iconBoth || iconPos === "right";

  const inputRef = React.useRef(null);
  const labelRef = React.useRef(null);

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
  }, []);

  return (
    <div className={styles.wrapper} style={{ maxWidth }}>
      {leftIcon && chooseIcon(icon, undefined, [styles.icon, styles.icon_left])}
      {rightIcon &&
        chooseIcon(icon, undefined, [styles.icon, styles.icon_right])}

      <label className={styles.label}>
        <input
          className={cn(styles.root, className)}
          placeholder={placeholder}
          type={type}
          ref={(e) => {
            inputRef.current = e;
            ref = e;
          }}
          {...props}
        />

        <span className={styles.label_text} ref={labelRef}>
          {label}
        </span>
      </label>
    </div>
  );
};

export default React.forwardRef(Input);
