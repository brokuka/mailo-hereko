import React from "react";
import { useSelector } from "react-redux";
import useRouterChanged from "@hooks/useRouterChanged";
import { filterType, filterValue } from "@store/filter/filter.selector";
import { useGetWatchedQuery } from "@store/watched/watched.api";

import Title from "@component/Title/Title";
import Catalog from "@component/Catalog/Catalog";
import Pagination from "@component/Pagination/Pagination";
import Filter from "@component/Filter/Filter";

const Home = () => {
  const type = useSelector(filterType);
  const value = useSelector(filterValue);

  const [page, setPage] = React.useState(process.env.NEXT_PUBLIC_START_PAGE);
  const { data, isLoading, isFetching } = useGetWatchedQuery(
    {
      s: value,
      limit: process.env.NEXT_PUBLIC_ITEMS_LIMIT,
      media_type: type === "all" ? undefined : type,
      page,
    },
    { refetchOnMountOrArgChange: true }
  );

  useRouterChanged({ removeValue: true });

  React.useEffect(() => {
    setPage(process.env.NEXT_PUBLIC_START_PAGE);
  }, [type]);

  const render = () => {
    return (
      <>
        <Filter />
        <Catalog
          data={data && data}
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
