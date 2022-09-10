import React from "react";
import { useSelector } from "react-redux";
import {
  filterType,
  selectFilteredTypeLabels,
} from "@store/filter/filter.selector";
import Card from "@component/Card/Card";
import Error from "@component/Error/Error";

/* Style */
import styles from "./Catalog.module.scss";

const Catalog = ({
  data,
  isSuggesting,
  isWatched,
  showCount,
  filtered,
  isLoading,
  isFetching,
}) => {
  const filter = useSelector(filterType);
  const labels = useSelector(selectFilteredTypeLabels);

  const renderCards = () => {
    if (filtered) {
      return filtered.map(({ id, ...props }) => (
        <Card
          isSuggesting={isSuggesting}
          isWatched={isWatched}
          key={id}
          isLoading={isLoading}
          isFetching={isFetching}
          id={id}
          {...props}
        />
      ));
    }

    if (data) {
      return data.results.map(({ id, ...props }) => (
        <Card
          isSuggesting={isSuggesting}
          isWatched={isWatched}
          key={id}
          id={id}
          {...props}
        />
      ));
    }

    return (
      isLoading &&
      isFetching &&
      Array.from(Array(8), (_, i) => <Card key={i} />)
    );
  };

  return (
    <>
      {(filtered && filtered.length) || (data && data.results.length) ? (
        <div className={styles.root}>
          {showCount && (
            <div className={styles.filter}>
              <h3 className={styles.type} data-count={data.totalItems}>
                {labels.map(
                  (label, index) =>
                    label.toLowerCase().includes(filter) && label
                )}
              </h3>
            </div>
          )}

          <div className={styles.grid}>{renderCards()}</div>
        </div>
      ) : (
        <>
          {isFetching || isLoading ? (
            <div className={styles.grid}>{renderCards()}</div>
          ) : (
            <Error type="search" />
          )}
        </>
      )}
    </>
  );
};

export default Catalog;
