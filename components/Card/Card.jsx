import Image from "next/image";
import React from "react";

import CardImage from "./images/CardImage.webp";

import cn from "classnames";

/* Style */
import styles from "./Card.module.scss";
import Link from "next/link";
import Button from "../Button/Button";

const Card = ({ arr, isSuggesting, isWatched, type = "card" }) => {
  //   const { title, img, rating } = arr;
  const [suggest, setSuggested] = React.useState(false);
  const [watched, setWatched] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onClick = (type) => {
    switch (type) {
      case "auth":
        setLoading(true);
        asyncDataModeling(5000, [setLoading, setWatched]);
        break;
      case "nonauth":
        if (suggest) return;
        setLoading(true);
        asyncDataModeling(5000, [setLoading, setSuggested]);
        break;
    }
  };

  const asyncDataModeling = (ms, [...callBack]) => {
    setTimeout(() => {
      callBack.forEach((cb) => cb((currentState) => !currentState));
    }, ms);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.root}>
        <Link href="/">
          <a>
            <div className={styles.head}>
              <Image
                className={styles.img}
                src={CardImage}
                alt="Image"
                placeholder="blur"
                style={{ objectFit: "contain", objectPosition: "center" }}
                layout="intrinsic"
                lo
              />
              <span className={styles.name}>Black Widow</span>
            </div>
          </a>
        </Link>

        {!isWatched && (
          <div className={styles.body}>
            {isSuggesting ? (
              <Button
                className={cn(styles.option, {
                  [styles.suggest]: !suggest,
                  [styles.suggested]: suggest,
                })}
                onClick={() => onClick("nonauth")}
                icon={suggest ? "add" : "like"}
                asyncData={loading}
                spinner
                spinnerVariant="white"
                type={type}
              >
                {suggest ? "Suggested" : "Suggest this"}
              </Button>
            ) : (
              <Button
                className={cn(styles.option, {
                  [styles.suggest]: suggest,
                  [styles.watched]: !suggest,
                })}
                onClick={() => onClick("auth")}
                icon={watched ? "watched" : "add"}
                asyncData={loading}
                spinner
                type={type}
              >
                {watched ? "Already watched" : "Add to my list"}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
