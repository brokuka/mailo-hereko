import Image from "next/image";
import React from "react";

import CardImage from "./images/CardImage.webp";

import cn from "classnames";

/* Style */
import styles from "./Card.module.scss";
import Link from "next/link";
import Button from "../Button/Button";

const Card = ({ arr, isSuggesting, isWatched }) => {
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

  const renderButtons = (
    state,
    spinner = true,
    spinnerColor,
    type = "card",
    icon,
    status,
    classTerms,
    placeholders
  ) => {
    return (
      <Button
        className={cn(classTerms)}
        onClick={() => onClick(status)}
        icon={state ? icon[0] : icon[1]}
        asyncData={loading}
        spinner={spinner}
        spinnerVariant={spinnerColor}
        type={type}
      >
        {state ? placeholders[0] : placeholders[1]}
      </Button>
    );
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
                layout="intrinsic"
              />
              <span className={styles.name}>Black Widow</span>
            </div>
          </a>
        </Link>

        {!isWatched && (
          <div className={styles.body}>
            {isSuggesting
              ? renderButtons(
                  suggest,
                  undefined,
                  "white",
                  undefined,
                  ["checked", "like"],
                  "nonauth",
                  {
                    [styles.suggest]: !suggest,
                    [styles.suggested]: suggest,
                  },
                  ["Suggested", "Suggest this"]
                )
              : renderButtons(
                  watched,
                  undefined,
                  undefined,
                  undefined,
                  ["watched", "plus"],
                  "auth",
                  {
                    [styles.suggest]: suggest,
                    [styles.watched]: !suggest,
                  },
                  ["Already watched", "Add to my list"]
                )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
