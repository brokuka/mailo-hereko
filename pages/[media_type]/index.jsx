import React from "react";
import { useSelector } from "react-redux";
import useRouterChanged from "@hooks/useRouterChanged";
import { useRedirect } from "@hooks/useRedirect";
import { useGetWatchedQuery } from "@store/watched/watched.api";
import { filterValue } from "@store/filter/filter.selector";
import Catalog from "@component/Catalog/Catalog";
import Title from "@component/Title/Title";
import Pagination from "@component/Pagination/Pagination";

const Index = ({ media_type }) => {
  const value = useSelector(filterValue);
  const [page, setPage] = React.useState(process.env.NEXT_PUBLIC_START_PAGE);
  const checkMediaType = media_type === "movies" ? media_type : "TV Shows";
  const { data, isLoading, isFetching } = useGetWatchedQuery({
    page,
    media_type: media_type.slice(0, -1),
    s: value,
  });

  useRedirect({ type: "nonAuth" });
  useRouterChanged({ removeValue: true });

  const render = () => {
    return (
      <>
        <Catalog
          data={data && data}
          isSuggesting={false}
          isWatched
          isLoading={isLoading}
          isFetching={isFetching}
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
      <Title name={checkMediaType} input sub withState={false} />
      {render()}
    </>
  );
};

export default Index;

export const getServerSideProps = async ({ params }) => {
  if (params.media_type === "movies" || params.media_type === "tvs") {
    return {
      props: {
        media_type: params.media_type,
      },
    };
  }

  return { notFound: true };
};
