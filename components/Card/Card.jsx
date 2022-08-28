import Image from "next/image";
import Link from "next/link";
import React from "react";
import cn from "classnames";
import Button from "../Button/Button";
import Rating from "../Rating/Rating";
import Placeholder from "../Placeholder/Placeholder";

/* Style */
import styles from "./Card.module.scss";

const Card = ({
  isSuggesting,
  isWatched,
  id,
  rating,
  poster,
  title,
  media_type,
}) => {
  const [suggest, setSuggested] = React.useState(false);
  const [watched, setWatched] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const imgSpanRef = React.useRef(null);

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
      isFetched && (
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
      )
    );
  };

  const checkMediaType = () => {
    switch (media_type) {
      case "movie":
        return `/movie/${id}`;
      case "tv":
        return `tv/${id}`;
      default:
        return "/";
    }
  };

  const isFetched = media_type ? true : false;

  const checkFetching = () => {
    return isFetched ? (
      <Link href={checkMediaType()}>
        <a className={styles.link}>
          <div className={styles.head} ref={imgSpanRef}>
            {isFetched && (
              <Rating position x={8} y={10} index={100} value={rating} />
            )}
            <div className={styles.image}>
              {isFetched &&
                (poster ? (
                  <Image
                    className={styles.img}
                    src={poster}
                    alt="Image"
                    placeholder="blur"
                    blurDataURL={poster}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <Placeholder type="posterCard" />
                ))}
            </div>
            {isFetched && (
              <span className={styles.name}>{title ? title : "Untitled"}</span>
            )}
          </div>
        </a>
      </Link>
    ) : (
      <Placeholder type="fetching" />
    );
  };

  return (
    <div className={styles.root}>
      {checkFetching()}

      {isFetched && !isWatched && (
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
