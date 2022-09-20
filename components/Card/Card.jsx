import Image from "next/image";
import Link from "next/link";
import React from "react";
import cn from "classnames";
import { usePostSuggestMutation } from "@store/search/search.api";
import Button from "@component/Button/Button";
import Rating from "@component/Rating/Rating";
import Placeholder from "@component/Placeholder/Placeholder";

/* Style */
import styles from "./Card.module.scss";

const Card = ({
  isSuggesting = false,
  isWatched = false,
  id,
  rating,
  poster,
  title,
  is_watched,
  media_type,
  isLoading,
  isFetching,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({
    status: null,
    message: null,
  });
  const [state, setState] = React.useState(false);
  const [suggestTrigger] = usePostSuggestMutation();
  const isFetched = media_type ? true : false;

  const handleError = (error) => {
    if (error.status >= 500) {
      return setError({
        status: 500,
        message: "Server is not available yet",
      });
    }

    return setError({
      status: error.status,
      message: "Already on watched list",
    });
  };

  const req = async (type) => {
    switch (type) {
      case "auth":
        await suggestTrigger({ id, media_type, url: "watched" })
          .unwrap()
          .catch((error) => handleError(error))
          .finally(() => setLoading(false));
        break;

      case "nonAuth":
        await suggestTrigger({ id, media_type })
          .unwrap()
          .catch((error) => handleError(error))
          .finally(() => setLoading(false));
        break;
    }
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
    return isFetched && (!isFetching || isLoading) ? (
      <Link href={checkMediaType()}>
        <a
          className={cn(styles.link, {
            [styles.full]: !isWatched && !isSuggesting,
          })}
        >
          <div className={styles.head}>
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
            <span className={styles.name}>
              {title
                ? title.length >= 45
                  ? `${title.substring(0, 45)}...`
                  : title
                : "Untitled"}
            </span>
          </div>
        </a>
      </Link>
    ) : (
      <Placeholder type="fetching" />
    );
  };

  const renderButtons = ({
    spinner = true,
    spinnerColor = "white",
    icon,
    status,
    classTerms,
    placeholders,
  }) => {
    if (!isWatched && !isSuggesting) return;
    const getIcon = () => {
      if (error.status) return icon[3];
      if (state) return icon[1];
      if (is_watched) return icon[2];

      return icon[0];
    };

    const getPlaceholder = () => {
      if (error.message) return error.message;
      if (state) return placeholders[1];
      if (is_watched) return placeholders[2];

      return placeholders[0];
    };

    return (
      <div className={styles.body}>
        <Button
          className={cn(classTerms)}
          onClick={() => onClick(status)}
          icon={getIcon()}
          asyncData={loading}
          spinner={spinner}
          spinnerVariant={spinnerColor}
          style="card"
        >
          {getPlaceholder()}
        </Button>
      </div>
    );
  };

  const onClick = (status) => {
    switch (status) {
      case "auth": {
        setLoading(true);
        setState(true);
        return req("auth");
      }

      case "nonAuth": {
        setLoading(true);
        setState(true);
        return req("nonAuth");
      }
    }
  };

  return (
    <div className={styles.root}>
      {checkFetching()}

      {isSuggesting && !is_watched
        ? renderButtons({
            icon: ["like", "checked", "watched", "close"],
            classTerms: {
              [styles.suggest]: isSuggesting && !state,
              [styles.suggested]: !error.status && state,
              [styles.error]: state && error.status,
            },
            placeholders: ["Suggest this", "Suggested"],
            status: "nonAuth",
          })
        : renderButtons({
            icon: ["plus", "checked", "watched", "close"],
            classTerms: {
              [styles.suggest]: !state && !is_watched && isWatched,
              [styles.watched]: !error.status && (state || is_watched),
              [styles.error]: state && error.status,
            },
            placeholders: [
              "Add to my list",
              "Added to list",
              "Already watched",
            ],
            status: "auth",
          })}
    </div>
  );
};

export default Card;
