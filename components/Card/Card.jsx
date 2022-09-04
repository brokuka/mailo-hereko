import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import React from "react";
import cn from "classnames";
import Button from "@component/Button/Button";
import Rating from "@component/Rating/Rating";
import Placeholder from "@component/Placeholder/Placeholder";

/* Style */
import styles from "./Card.module.scss";

const Card = (
  { isSuggesting, isWatched, id, rating, poster, title, media_type, className },
  ref
) => {
  const [suggest, setSuggested] = React.useState(false);
  const [watched, setWatched] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadedData, setLoadedData] = React.useState(false);
  const [error, setError] = React.useState({
    status: null,
    message: null,
  });
  const imgSpanRef = React.useRef(null);

  const isFetched = media_type ? true : false;

  React.useEffect(() => {
    if (isFetched) {
      setLoadedData(true);
    }
  }, [isFetched]);

  const onClick = (status) => {
    switch (status) {
      case "auth":
        setLoading(true);
        asyncDataModeling(5000, [setLoading, setWatched]);
        break;
      case "nonauth":
        if (suggest) return;
        setLoading(true);
        asyncDataModeling(5000, [setLoading, setSuggested, setWatched]);
        axios
          .post(`${process.env.NEXT_PUBLIC_API}/suggest`, {
            id,
            media_type,
          })
          .catch(({ response }) => {
            if (response.status >= 500) {
              return setError({
                status: 500,
                message: "Server is not available yet",
              });
            }

            setError({
              status: response.status,
              message: "Already suggested",
            });
          });
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
          icon={error.status ? icon[3] : state ? icon[1] : icon[0]}
          asyncData={loading}
          spinner={spinner}
          spinnerVariant={spinnerColor}
          type={type}
        >
          {error.status
            ? error.message
            : state
            ? placeholders[0]
            : placeholders[1]}
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

  const checkFetching = () => {
    return isFetched && loadedData ? (
      <Link href={checkMediaType()}>
        <a className={styles.link}>
          <div className={styles.head} ref={imgSpanRef}>
            <Rating position x={8} y={10} index={100} value={rating} />

            <div className={styles.image}>
              {poster ? (
                <Image
                  src={poster}
                  alt="Image"
                  placeholder="blur"
                  blurDataURL={poster}
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <Placeholder type="posterCard" />
              )}
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
    <div className={cn(styles.root, className)} ref={ref}>
      {checkFetching()}

      {isFetched && !isWatched && (
        <div className={styles.body}>
          {isSuggesting
            ? renderButtons(
                suggest,
                undefined,
                "white",
                undefined,
                ["like", "checked", "watched", "close"],
                "nonauth",
                {
                  [styles.suggest]: !suggest,
                  [styles.suggested]: !error.status && suggest,
                  [styles.error]: suggest && error.status,
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

export default React.forwardRef(Card);
