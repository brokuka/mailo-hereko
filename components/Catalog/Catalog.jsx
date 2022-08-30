import React from "react";
import Card from "./../Card/Card";
import { useSelector } from "react-redux";
import { watchedData } from "../../store/watched/watchedSlice";
import { selectFilterdData } from "../../store/filter/filter.selector";
import Filter from "../Filter/Filter";

/* Style */
import styles from "./Catalog.module.scss";

const Catalog = ({ isWatched }) => {
  const filtered = useSelector(selectFilterdData);

  const renderCards = () => {
    if (!watchedData.length) {
      return Array.from(Array(12), (_, i) => <Card noData key={i} />);
    }

    return filtered.map(({ id, ...props }) => (
      <Card isWatched={isWatched} key={id} id={id} {...props} />
    ));
  };

  return (
    <>
      <Filter />

      <div className={styles.root}>{renderCards()}</div>
    </>
  );
};

export default Catalog;
