import Image from "next/image";
import React from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Rating from "../Rating/Rating";
import Placeholder from "../Placeholder/Placeholder";

/* Style */
import styles from "./Overview.module.scss";

const Overview = ({
  genres,
  media_type,
  rating,
  release_date,
  poster,
  title,
  runtime,
  description,
  status,
  first_air_date,
  last_air_date,
  number_of_seasons,
  number_of_episodes,
  episode_run_time,
  backdrop_path,
}) => {
  const checkAndRender = () => {
    switch (media_type) {
      case "movie":
        return renderMovie();
      case "tv":
        return renderTv();
    }
  };

  const renderMovie = () => {
    return (
      <div className={styles.movie}>
        <div className={styles.info}>
          <span className={styles.info_title}>Type:</span>
          <span>{media_type}</span>
        </div>

        <div className={styles.info}>
          <span className={styles.info_title}>Release Date:</span>
          <time dateTime={release_date}>{release_date}</time>
        </div>

        <div className={styles.info}>
          <span className={styles.info_title}>Run time</span>
          <span className={styles.runtime}>{runtime}</span>
        </div>

        <div className={styles.info}>
          <span className={styles.info_title}>Genres</span>
          <span>
            {genres.length
              ? genres.map(({ name }) =>
                  genres[0].name === name ? name : `, ${name}`
                )
              : "Unknown"}
          </span>
        </div>
      </div>
    );
  };

  const renderTv = () => {
    return (
      <div className={styles.tv}>
        <div className={styles.info}>
          <span className={styles.info_title}>Type</span>
          <span>TV Show</span>
        </div>

        <div className={styles.info}>
          <span className={styles.info_title}>Status</span>
          <span>{status}</span>
        </div>

        <div className={styles.info}>
          <span className={styles.info_title}>First air date</span>
          <time dateTime={first_air_date}>
            {first_air_date ? first_air_date : 0}
          </time>
        </div>

        <div className={styles.info}>
          <span className={styles.info_title}>Last air date</span>
          <time dateTime={last_air_date}>
            {last_air_date ? last_air_date : 0}
          </time>
        </div>

        <div className={styles.info}>
          <span className={styles.info_title}>No. of Seasons</span>
          <span>{number_of_seasons}</span>
        </div>

        <div className={styles.info}>
          <span className={styles.info_title}>No. of episodes</span>
          <span>{number_of_episodes}</span>
        </div>

        <div className={styles.info}>
          <span className={styles.info_title}>Episode run time</span>
          <span className={styles.runtime}>{episode_run_time}</span>
        </div>

        <div className={styles.info}>
          <span className={styles.info_title}>Genres</span>
          <span>
            {genres.length
              ? genres.map(({ name }) =>
                  genres[0].name === name ? name : `, ${name}`
                )
              : "Unknown"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.full}>
        <div className={styles.gradient}>Gradient</div>
        {backdrop_path ? (
          <Image
            src={backdrop_path}
            placeholder="blur"
            blurDataURL={backdrop_path}
            alt="Image"
            objectFit="cover"
            layout="fill"
          />
        ) : (
          <Placeholder type="backdrop" />
        )}
        <div className={styles.title}>
          <Breadcrumbs />
          <h1>{title ? title : "Untitled"}</h1>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.image}>
          {poster ? (
            <Image
              src={poster}
              placeholder="blur"
              blurDataURL={poster}
              alt="Image"
              objectFit="cover"
              layout="fill"
            />
          ) : (
            <Placeholder type="poster" />
          )}
        </div>

        <div className={styles.description}>
          {description && <p className={styles.text}>{description}</p>}

          <Rating value={rating} />

          {checkAndRender()}
        </div>
      </div>
    </div>
  );
};

export default Overview;
