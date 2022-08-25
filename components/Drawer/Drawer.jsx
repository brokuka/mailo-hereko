import React from "react";
import Link from "next/link";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { CSSTransition } from "react-transition-group";

/* Style */
import styles from "./Drawer.module.scss";

const Drawer = ({ state, children, onClose }) => {
  const nodeRef = React.useRef();

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
