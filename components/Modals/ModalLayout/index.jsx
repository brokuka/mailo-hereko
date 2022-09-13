import React from "react";
import Button from "@component/Button/Button";
import Icon from "@component/Icon/Icon";
import { mergeRefs } from "react-merge-refs";
import FocusTrap from "focus-trap-react";

/* Style */
import styles from "./index.module.scss";

const Index = (
  { state, setState, icon, title, text, children, iconSize },
  ref
) => {
  const rootRef = React.useRef(null);
  const closeAttrs = ["style", "class"];

  const onClose = () => {
    const body = document.querySelector("body");
    setState(false);
    dettachEvents();

    closeAttrs.forEach((attr) => body.removeAttribute(attr));
  };

  const onEscape = (e) => {
    if (e.key !== "Escape") return;
    console.log(e.key);

    onClose();
  };

  const onClickRoot = (e) => {
    if (e.target === rootRef.current) {
      onClose();
    }
  };

  function dettachEvents() {
    window.removeEventListener("keydown", onEscape);
  }

  function attachEvents() {
    window.addEventListener("keydown", onEscape);
  }

  const padding = React.useMemo(() => {
    return window.innerWidth - document.documentElement.clientWidth;
  }, []);

  React.useEffect(() => {
    const body = document.querySelector("body");
    attachEvents();

    body.classList.add("no-scroll");
    body.style.paddingRight = `${padding}px`;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FocusTrap>
      <div
        className={styles.root}
        ref={mergeRefs([ref, rootRef])}
        onClick={onClickRoot}
      >
        <div className={styles.content}>
          <Button
            icon="close"
            onClick={onClose}
            style="modal"
            className={styles.button}
          />
          {icon && (
            <div className={styles.icon}>
              <Icon icon={icon} className={styles.icon} size={iconSize} />
            </div>
          )}
          <h4 className={styles.title}>{title}</h4>
          {text ? <p className={styles.text}>{text}</p> : children}
        </div>
      </div>
    </FocusTrap>
  );
};

export default React.forwardRef(Index);
