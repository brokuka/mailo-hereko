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
  media_type,
  onChange,
  className,
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

    /*     try {
      switch (type) {
        case "auth":
          return onChange({ id, media_type, url: "watched" });
        case "nonAuth":
          return onChange({ id, media_type, url: "watched" });
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    } */
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
    return !isFetching || !isLoading ? (
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

    return (
      <div className={styles.body}>
        <Button
          className={cn(classTerms)}
          onClick={() => onClick(status)}
          icon={error.status ? icon[3] : state ? icon[1] : icon[0]}
          asyncData={loading}
          spinner={spinner}
          spinnerVariant={spinnerColor}
          style="card"
        >
          {error.status
            ? error.message
            : state
            ? placeholders[1]
            : placeholders[0]}
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
    <div
      className={cn(styles.root, {
        [styles.max]: isWatched || isSuggesting,
      })}
    >
      {checkFetching()}

      {isSuggesting
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
            icon: ["plus", "checked", "", "close"],
            classTerms: {
              [styles.suggest]: isWatched && !state,
              [styles.watched]: !error.status && state,
              [styles.error]: state && error.status,
            },
            placeholders: ["Add to my list", "Added to list"],
            status: "auth",
          })}
    </div>
  );
};

// const Card = (
//   {
//     isSuggesting = true,
//     isWatched = false,
//     id,
//     rating,
//     poster,
//     title,
//     media_type,
//     onChange,
//     className,
//     isLoading,
//     isFetching,
//   },
//   ref
// ) => {
//   const [suggest, setSuggested] = React.useState(false);
//   const [watched, setWatched] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);
//   const [loadedData, setLoadedData] = React.useState(false);
//   const [error, setError] = React.useState({
//     status: null,
//     message: null,
//   });
//   /*   const [suggestTriggerNonAuth] = usePostSuggestMutation();
//   const [suggestTriggerAuth] = usePostWatchedMutation(); */
//   const imgSpanRef = React.useRef(null);
//   const dispatch = useDispatch();

//   const isFetched = media_type ? true : false;

//   const req = async ({ type }) => {
//     try {
//       switch (type) {
//         case "auth":
//           /*           await suggestTriggerNonAuth({
//             id,
//             media_type,
//             url: "watched",
//           }).unwrap(); */
//           return await onChange({ id, media_type, url: "watched" });

//         case "nonAuth":
//           /* await suggestTriggerNonAuth({ id, media_type }).unwrap(); */
//           return await onChange({ id, media_type });
//       }
//     } catch (error) {
//       if (error.status >= 500) {
//         return setError({
//           status: 500,
//           message: "Server is not available yet",
//         });
//       }

//       setError({
//         status: error.status,
//         message: "Already on watched list",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   React.useEffect(() => {
//     if (isFetched) {
//       setLoadedData(true);
//     }
//   }, [isFetched]);

//   const onClick = (status) => {
//     switch (status) {
//       case "auth":
//         if (watched) return;

//         setLoading(true);
//         setWatched(true);
//         setSuggested(true);
//         req({ type: "auth" });

//         break;
//       case "nonAuth":
//         if (suggest) return;

//         setLoading(true);
//         setSuggested(true);
//         req({ type: "nonAuth" });

//         break;
//     }
//   };

//   const renderButtons = (
//     state,
//     spinner = true,
//     spinnerColor,
//     type = "card",
//     icon,
//     status,
//     classTerms,
//     placeholders
//   ) => {
//     return (
//       isFetched && (
//         <Button
//           className={cn(classTerms)}
//           onClick={() => onClick(status)}
//           icon={error.status ? icon[3] : state ? icon[1] : icon[0]}
//           asyncData={loading}
//           spinner={spinner}
//           spinnerVariant={spinnerColor}
//           style={type}
//         >
//           {error.status
//             ? error.message
//             : state
//             ? placeholders[1]
//             : placeholders[0]}
//         </Button>
//       )
//     );
//   };

//   const checkMediaType = () => {
//     switch (media_type) {
//       case "movie":
//         return `/movie/${id}`;
//       case "tv":
//         return `tv/${id}`;
//       default:
//         return "/";
//     }
//   };

//   const checkFetching = () => {
//     //  return isFetched && loadedData && (!isFetching || !isLoading);
//     return !isFetching || !isLoading ? (
//       <Link href={checkMediaType()}>
//         <a className={styles.link}>
//           <div className={styles.head} ref={imgSpanRef}>
//             <Rating position x={8} y={10} index={100} value={rating} />

//             <div className={styles.image}>
//               {poster ? (
//                 <Image
//                   src={poster}
//                   alt="Image"
//                   placeholder="blur"
//                   blurDataURL={poster}
//                   layout="fill"
//                   objectFit="cover"
//                 />
//               ) : (
//                 <Placeholder type="posterCard" />
//               )}
//             </div>
//             {isFetched && (
//               <span className={styles.name}>
//                 {title
//                   ? title.length >= 45
//                     ? `${title.substring(0, 45)}...`
//                     : title
//                   : "Untitled"}
//               </span>
//             )}
//           </div>
//         </a>
//       </Link>
//     ) : (
//       <Placeholder type="fetching" />
//     );
//   };

//   return (
//     <div className={cn(styles.root, className)} ref={ref}>
//       {checkFetching()}

//       {isFetched && !isWatched && (
//         <div className={styles.body}>
//           {isSuggesting
//             ? renderButtons(
//                 suggest,
//                 undefined,
//                 "white",
//                 undefined,
//                 ["like", "checked", "watched", "close"],
//                 "nonAuth",
//                 {
//                   [styles.suggest]: !suggest,
//                   [styles.suggested]: !error.status && suggest,
//                   [styles.error]: suggest && error.status,
//                 },
//                 ["Suggest this", "Suggested"]
//               )
//             : renderButtons(
//                 watched,
//                 undefined,
//                 undefined,
//                 undefined,
//                 ["plus", "checked", "", "close"],
//                 "auth",
//                 {
//                   [styles.suggest]: !suggest,
//                   [styles.watched]: !error.status && watched,
//                   [styles.error]: error.status,
//                 },
//                 ["Add to my list", "Added to list"]
//               )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default React.forwardRef(Card);
export default Card;
