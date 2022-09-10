import React from "react";
import useRouterChanged from "@hooks/useRouterChanged";
import Catalog from "@component/Catalog/Catalog";
import Title from "@component/Title/Title";
import Pagination from "@component/Pagination/Pagination";
import { useGetWatchedQuery } from "@store/watched/watched.api";
import { useRedirect } from "@hooks/useRedirect";

const Index = ({ media_type }) => {
  const [page, setPage] = React.useState(process.env.NEXT_PUBLIC_START_PAGE);
  const checkMediaType = media_type === "movies" ? media_type : "TV Shows";
  const { data, isLoading, isFetching } = useGetWatchedQuery({
    page,
    media_type: media_type.slice(0, -1),
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
