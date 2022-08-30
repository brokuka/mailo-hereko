import React from "react";
import Card from "./../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { selectFilterdData } from "../../store/filter/filter.selector";
import Filter from "../Filter/Filter";
import { watchedData } from "../../store/watched/watchedSlice";

/* Style */
import styles from "./Catalog.module.scss";
import { setFilterValue } from "../../store/filter/filterSlice";

const Catalog = ({ isWatched, filter }) => {
  const dispatch = useDispatch();
  const filtered = useSelector(selectFilterdData);
  const data = useSelector(watchedData);

  React.useEffect(() => {
    dispatch(setFilterValue(""));
  }, [dispatch]);

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
