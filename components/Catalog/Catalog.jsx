import React from "react";
import { useSelector } from "react-redux";
import {
  filterType,
  selectFilteredTypeLabels,
} from "@store/filter/filter.selector";
import Card from "@component/Card/Card";
import Error from "@component/Error/Error";
// import { usePostSuggestMutation } from "@store/search/search.api";

/* Style */
import styles from "./Catalog.module.scss";

const Catalog = ({
  data,
  isSuggesting,
  isWatched,
  showCount,
  isLoading,
  isFetching,
}) => {
  const filter = useSelector(filterType);
  const labels = useSelector(selectFilteredTypeLabels);
  /*   const [suggestTriggerNonAuth] = usePostSuggestMutation();

  const onClick = async (type) => {
    console.log(type);
    await suggestTriggerNonAuth(type);
  }; */

  const renderCards = () => {
    if (data) {
      return data.results.map(({ id, ...props }) => (
        <Card
          isSuggesting={isSuggesting}
          isWatched={isWatched}
          key={id}
          id={id}
          //   onChange={onClick}
          {...props}
        />
      ));
    }

    return Array.from(Array(8), (_, i) => <Card key={i} />);
  };

  return (
    <>
      {data && data.results.length ? (
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
