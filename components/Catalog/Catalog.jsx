import React from "react";
import Card from "./../Card/Card";
import { useSelector } from "react-redux";
import { selectFilterdData } from "../../store/filter/filter.selector";
import Filter from "../Filter/Filter";
import { watchedData } from "../../store/watched/watchedSlice";

/* Style */
import styles from "./Catalog.module.scss";

const Catalog = ({ isWatched, filter }) => {
  const filtered = useSelector(selectFilterdData);
  const data = useSelector(watchedData);

  const renderCards = () => {
    if (data.length) {
      return filtered.map(({ id, ...props }) => (
        <Card isWatched={isWatched} key={id} id={id} {...props} />
      ));
    }

    return Array.from(Array(12), (_, i) => <Card key={i} />);
  };

  return (
    <>
      {filter && <Filter />}

      <div className={styles.root}>{renderCards()}</div>
    </>
  );
};

export default Catalog;
