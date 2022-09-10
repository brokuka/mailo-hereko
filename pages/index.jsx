import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useRouterChanged from "@hooks/useRouterChanged";
import { addData } from "@store/watched/watchedSlice";
import { setFilterType } from "@store/filter/filterSlice";
import {
  filterType,
  selectFilteredTypeLabels,
} from "@store/filter/filter.selector";
import { useGetWatchedQuery } from "@store/watched/watched.api";
import { selectFilterdData } from "@store/filter/filter.selector";
import Title from "@component/Title/Title";
import Catalog from "@component/Catalog/Catalog";
import Pagination from "@component/Pagination/Pagination";
import Filter from "@component/Filter/Filter";

const Home = () => {
  const dispatch = useDispatch();
  const type = useSelector(filterType);
  const labels = useSelector(selectFilteredTypeLabels);
  const filteredData = useSelector(selectFilterdData);
  const { data, isLoading, isFetching } = useGetWatchedQuery({
    limit: process.env.NEXT_PUBLIC_ITEMS_LIMIT,
  });
  useRouterChanged({ removeValue: true });

  const render = () => {
    return (
      <>
        <Filter />
        <Catalog
          filtered={data && filteredData}
          isSuggesting={false}
          isWatched
          isLoading={isLoading}
          isFetching={isFetching}
          showCount
        />
        {data && data.totalItems > data.limit && (
          <Pagination
            totalPages={data.totalPages}
            onChange={onClick}
            currentPage={data.page}
          />
        )}
      </>
    );
  };

  const onClick = (index) => setPage(index);

  React.useEffect(() => {
    if (type !== "all") {
      dispatch(setFilterType("all"));
    }

    dispatch(addData(data && data.results));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch]);

  return (
    <>
      <Title
        name={process.env.NEXT_PUBLIC_APPLICATION_NAME}
        input
        main
        withState={false}
      >
        List of movies and TV shows 😉
      </Title>
      {render()}
    </>
  );
};

export default Home;
