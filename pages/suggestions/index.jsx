import React from "react";
import Head from "next/head";
import { useGetPageResultsQuery } from "@store/suggestions/suggestions.api";
import Title from "@component/Title/Title";
import Catalog from "@component/Catalog/Catalog";
import Pagination from "@component/Pagination/Pagination";
import { useRedirect } from "@hooks/useRedirect";

const Index = () => {
  const [page, setPage] = React.useState(process.env.NEXT_PUBLIC_START_PAGE);
  const { data, isLoading, isFetching } = useGetPageResultsQuery(
    { page },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  useRedirect({ type: "auth" });

  console.log(data);

  const render = () => {
    return (
      <>
        <Catalog
          data={data && data}
          isWatched={true}
          isLoading={isLoading}
          isFetching={isFetching}
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
    );
  };

  const onClick = (index) => setPage(index);

  return (
    <>
      <Head>
        <title>{`Suggestions - ${process.env.NEXT_PUBLIC_APPLICATION_NAME}`}</title>
      </Head>
      <Title name="Suggestions" withState={false} />
      {render()}
    </>
  );
};

export default Index;
