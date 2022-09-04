import { useSelector } from "react-redux";
import { useMedia } from "react-use";
import Link from "next/link";
import React from "react";
import { filterType } from "@store/filter/filter.selector";
import Button from "@component/Button/Button";
import Title from "@component/Title/Title";
import Icon from "@component/Icon/Icon";

/* Style */
import styles from "./Error.module.scss";

const Error = ({ type = "notFound" }) => {
  const filter = useSelector(filterType);
  const isTablet = useMedia("(max-width: 767.99px)", null);

  const checkType = () => {
    switch (type) {
      case "notFound":
        return (
          <>
            {!isTablet && <Icon icon="404" width={400} height={320} />}

            <Title type="h1" name="Lost your way?">
              {
                "Oops! This is awkward. You are looking for something that doesn't actually exist."
              }
            </Title>

            <Link href="/">
              <a>
                <Button>Go Home</Button>
              </a>
            </Link>
          </>
        );
      case "search":
        return (
          <>
            <Title type="h2" name="Sorry, No results found">
              {filter !== "all" ? (
                <>
                  There are no{" "}
                  <span className={styles.highlighted}>
                    {filter === "movie" ? "movies" : "TV shows"}
                  </span>{" "}
                  matching your search terms. You can suggest me manually
                </>
              ) : (
                <>
                  There are no{" "}
                  <span className={styles.highlighted}>Movies</span> or{" "}
                  <span className={styles.highlighted}>TV shows</span> matching
                  your search terms. You can suggest me manually
                </>
              )}
            </Title>

            <Link href="/suggest">
              <a>
                <Button>Suggest Manually</Button>
              </a>
            </Link>
          </>
        );
    }
  };

  return <div className={styles.root}>{checkType()}</div>;
};

export default Error;
