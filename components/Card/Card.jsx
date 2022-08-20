import Image from "next/image";
import React from "react";

import CardImage from "./images/CardImage.webp";

import cn from "classnames";

/* Style */
import styles from "./Card.module.scss";
import Link from "next/link";
import Button from "../Button/Button";
import Rating from "../Rating/Rating";

const Card = ({ isSuggesting, isWatched, rating, poster, title }) => {
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
    <div className={styles.root}>
      <Link href="/">
        <a className={styles.link}>
          <div className={styles.head}>
            <Rating position x={8} y={10} index={100} value={rating} />
            <Image
              className={styles.img}
              src={poster ? poster : CardImage}
              alt="Image"
              placeholder="blur"
              blurDataURL={poster ? poster : CardImage}
              width={266}
              height={400}
              layout="intrinsic"
            />
            <span className={styles.name}>{title ? title : "Untitled"}</span>
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
  );
};

export default Card;
