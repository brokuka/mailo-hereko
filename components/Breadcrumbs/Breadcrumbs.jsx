import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

/* Style */
import styles from "./Breadcrumbs.module.scss";

const Breadcrumbs = () => {
  const router = useRouter().query;

  console.log(router);

  const checkAndRender = () => {
    switch (router.media_type) {
      case "movie":
        return (
          <Link href="/movies">
            <a className={styles.link}>Movies</a>
          </Link>
        );
      case "tv":
        return (
          <Link href="/tvs">
            <a className={styles.link}>TV Shows</a>
          </Link>
        );
    }
  };

  return (
    <div className={styles.root}>
      <Link href="/">
        <a className={styles.link}>
          {process.env.NEXT_PUBLIC_APPLICATION_NAME}
        </a>
      </Link>

      {checkAndRender()}
    </div>
  );
};

export default Breadcrumbs;
