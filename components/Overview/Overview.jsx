import Image from "next/image";
import React from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Rating from "../Rating/Rating";

/* Style */
import styles from "./Overview.module.scss";

import placeholder from "./images/placeholder.jpg";

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
      <>
        <div className={styles.info}>
          <span className={styles.info_title}>Type:</span>
          <span>{media_type}</span>
        </div>

        <div className={styles.info}>
          <span className={styles.info_title}>Release Date:</span>
          <time dateTime={release_date}>{release_date}</time>
        </div>
      </>
    );
  };

  const renderTv = () => {
    return (
      <>
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
        </div>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.full}>
        <div className={styles.gradient}>Gradient</div>
        <Image
          className={styles.full_img}
          src={poster ? poster : placeholder}
          placeholder="blur"
          blurDataURL={poster && poster}
          alt="Image"
          width={1200}
          height={480}
          objectFit={poster ? "cover" : "contain"}
        />
        <div className={styles.title}>
          <Breadcrumbs />
          <h1>{title ? title : "Untitled"}</h1>
        </div>
      </div>

      <div className={styles.card}>
        <Image
          className={styles.image}
          src={poster ? poster : placeholder}
          alt="Card"
          width={480}
          height={720}
          placeholder="blur"
          blurDataURL={poster && poster}
          objectFit={poster ? "cover" : "contain"}
          layout="intrinsic"
        />

        <div className={styles.description}>
          {description && <p className={styles.text}>{description}</p>}

          <Rating value={rating} />

          {checkAndRender()}

          <div className={styles.info}>
            <span className={styles.info_title}>
              {media_type === "movie" ? "Run time" : "Episode run time"}
            </span>

            <span className={styles.runtime}>
              {runtime > 0 || episode_run_time > 0
                ? media_type === "movie"
                  ? runtime
                  : episode_run_time
                : "0"}
            </span>
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
      </div>
    </div>
  );
};

export default Overview;
