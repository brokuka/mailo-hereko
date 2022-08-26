import React from "react";
import cn from "classnames";

/* Style */
import styles from "./Title.module.scss";
import Input from "../Inputs/Input/Input";

const Title = ({ type = "h1", name, children, input, sub, main = false }) => {
  const checkType =
    type === "h1" ||
    type === "h2" ||
    type === "h3" ||
    type === "h4" ||
    type === "h5" ||
    type === "h6";

  if (!checkType) return console.error("Invalid type of component <Title/>");

  const renderTitle = () => {
    let customClass = cn({
      [styles.h1]: type === "h1",
      [styles.h2]: type === "h2",
      [styles.h3]: type === "h3",
      [styles.h4]: type === "h4",
      [styles.h5]: type === "h5",
      [styles.h6]: type === "h6",
    });

    switch (type) {
      case "h1":
        return <h1 className={customClass}>{name}</h1>;
      case "h2":
        return <h2 className={customClass}>{name}</h2>;
      case "h3":
        return <h3 className={customClass}>{name}</h3>;
      case "h4":
        return <h4 className={customClass}>{name}</h4>;
      case "h5":
        return <h5 className={customClass}>{name}</h5>;
      case "h6":
        return <h6 className={customClass}>{name}</h6>;
    }
  };

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.main]: main,
      })}
    >
      <div className={styles.information}>
        <div className={styles.root}>
          {sub && <span className={styles.subtitle}>MaileHereko</span>}
          {renderTitle()}
        </div>
        <div className={styles.description}>{children}</div>
      </div>
      {input && (
        <Input
          icon="search"
          placeholder="eg. Capitan Marvel"
          label="Search Movies or TV Shows"
<<<<<<< HEAD
=======
          maxWidth={344}
>>>>>>> main
        />
      )}
    </div>
  );
};

export default Title;
