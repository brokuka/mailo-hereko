import Button from "@component/Button/Button";
import Icon from "@component/Icon/Icon";
import Input from "@component/Inputs/Input/Input";
import Image from "next/image";
import React from "react";
import img from "./images/Saly.png";

/* Style */
import styles from "./LoginForm.module.scss";

const LoginForm = ({ error }) => {
  const emailInput = React.useRef();
  const kek = React.useRef();

  React.useEffect(() => {
    emailInput.current.focus();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <Image src={img} alt="Login" quality={100} placeholder="blur" />
      </div>

      <div className={styles.form}>
        <h1 className={styles.title}>Login</h1>
        {error && <span className={styles.error}>{error}</span>}
        <div className={styles.group}>
          <Input
            icon="email"
            type="email"
            label="Email"
            ref={emailInput}
            autoComplete="true"
          />
          <Input
            icon="password"
            type="password"
            label="Password"
            ref={kek}
            autoComplete="true"
          />
        </div>
        <Button className={styles.button} type="submit">
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
