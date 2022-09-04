import React from "react";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import Icon from "@component/Icon/Icon";
import Button from "@component/Button/Button";

/* Style */
import styles from "./Drawer.module.scss";

const Drawer = ({ state, children, onClose }) => {
  const nodeRef = React.useRef();

  React.useEffect(() => {
    const body = document.body;

    if (!state) return body.removeAttribute("class");

    body.classList.add("no-scroll");
  }, [state]);

  return (
    <CSSTransition
      in={state}
      timeout={300}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enter_active,
        exit: styles.exit,
        exitActive: styles.exit_active,
      }}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div className={styles.root} ref={nodeRef}>
        <div className={styles.head}>
          <Link href="/">
            <a className={styles.logo}>
              <Icon icon="logoColored" size={40} />
            </a>
          </Link>

          <Button icon="close" onClick={onClose} />
        </div>

        {children}
      </div>
    </CSSTransition>
  );
};

export default Drawer;
