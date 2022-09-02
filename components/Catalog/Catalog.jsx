import React from "react";
import Card from "./../Card/Card";
import { useSelector } from "react-redux";
import { selectFilterdData } from "../../store/filter/filter.selector";
import Filter from "../Filter/Filter";
import { watchedData } from "../../store/watched/watchedSlice";
import { useWhyDidYouUpdate } from "ahooks";
import { useGetResultsByFilterQuery } from "store/search/search.api";
import { setFilterType, setFilterValue } from "store/filter/filterSlice";
import { filterValue } from "store/filter/filter.selector";

/* Style */
import styles from "./Catalog.module.scss";

const Catalog = ({ data: dynamicData, isWatched, filter, search }) => {
  useWhyDidYouUpdate("Catalog", { isWatched, filter });
  console.log("Catalog render");
  const filtered = useSelector(selectFilterdData);
  const data = useSelector(watchedData);
  //   const value = useSelector(filterValue);

  const renderCards = () => {
    if (!search && !dynamicData && data) {
      return filtered.map(({ id, ...props }) => (
        <Card isWatched={isWatched} key={id} id={id} {...props} />
      ));
    }

    if (search && dynamicData) {
      return dynamicData.map(({ id, ...props }) => (
        <Card isSuggesting isWatched={isWatched} key={id} id={id} {...props} />
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
