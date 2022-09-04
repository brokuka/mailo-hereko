import React from "react";
import { useSelector } from "react-redux";
import { selectFilterdData } from "@store/filter/filter.selector";
import { watchedData } from "@store/watched/watchedSlice";
import Card from "@component/Card/Card";
import Filter from "@component/Filter/Filter";
import Error from "@component/Error/Error";

/* Style */
import styles from "./Catalog.module.scss";

const Catalog = ({ data: dynamicData, isWatched, filter, search }) => {
  const filtered = useSelector(selectFilterdData);
  const data = useSelector(watchedData);

  const renderCards = () => {
    if (!search && !dynamicData) {
      return (
        data &&
        filtered.map(({ id, ...props }) => (
          <Card isWatched={isWatched} key={id} id={id} {...props} />
        ))
      );
    }

    if (search) {
      return (
        dynamicData &&
        dynamicData.map(({ id, ...props }) => (
          <Card
            isSuggesting
            isWatched={isWatched}
            key={id}
            id={id}
            {...props}
          />
        ))
      );
    }

    return Array.from(Array(12), (_, i) => <Card key={i} />);
  };

  return (
    <>
      {filter && <Filter />}
      {(dynamicData && dynamicData.length) || (data && filtered.length) ? (
        <div className={styles.root}>{renderCards()}</div>
      ) : (
        <Error type="search" />
      )}
    </>
  );
};

export default React.memo(Catalog);
