import React from "react";
import { useSelector } from "react-redux";
import useRouterChanged from "@hooks/useRouterChanged";
import { useGetSuggestsQuery } from "@store/search/search.api";
import Title from "@component/Title/Title";
import Catalog from "@component/Catalog/Catalog";
import { filterValue } from "@store/filter/filter.selector";
import Pagination from "@component/Pagination/Pagination";
import { useRedirect } from "@hooks/useRedirect";

const Index = () => {
  const [page, setPage] = React.useState(process.env.NEXT_PUBLIC_START_PAGE);
  const value = useSelector(filterValue);
  const { data, isLoading, isFetching } = useGetSuggestsQuery(
    { s: value, page },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useRedirect({ type: "auth" });
  useRouterChanged({ removeValue: true });

  console.log(data);

  const render = () => {
    return (
      <>
        {value.length ? (
          <>
            <Catalog
              data={data && data}
              isLoading={isLoading}
              isFetching={isFetching}
              isWatched
            />
            {data && (
              <>
                {data.totalItems > data.limit && (
                  <Pagination
                    totalPages={data.totalPages}
                    onChange={onClick}
                    currentPage={data.page}
                  />
                )}
              </>
            )}
          </>
        ) : null}
      </>
    );
  };

  const onClick = (index) => setPage(index);

  return (
    <>
      <Title name="Add new item" input />

      {render()}
    </>
  );
};

export default Index;
