import Button from "@component/Button/Button";
import Icon from "@component/Icon/Icon";
import Input from "@component/Inputs/Input/Input";
import Image from "next/image";
import React from "react";
import img from "./images/Saly.png";

/* Style */
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <Image src={img} alt="Login" quality={100} />
      </div>

      <div className={styles.form}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.group}>
          <Input icon="email" type="email" label="Email" />
          <Input icon="password" type="password" label="Password" />
        </div>
        <Button className={styles.btn}>Login</Button>
      </div>
    </div>
  );
};

export default LoginForm;
