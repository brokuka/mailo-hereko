import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useRouterChanged from "@hooks/useRouterChanged";
import { addData } from "@store/watched/watchedSlice";
import { setFilterType } from "@store/filter/filterSlice";
import { selectFilterdData } from "@store/filter/filter.selector";
import Catalog from "@component/Catalog/Catalog";
import Title from "@component/Title/Title";
import Pagination from "@component/Pagination/Pagination";

const Index = ({ data, media_type }) => {
  const dispatch = useDispatch();
  const filteredData = useSelector(selectFilterdData);
  const checkMediaType = media_type === "movies" ? media_type : "TV Shows";

  useRouterChanged({ removeValue: true });

  React.useEffect(() => {
    dispatch(addData(data.results));
    dispatch(setFilterType(media_type.slice(0, -1)));
  }, [data, dispatch, media_type]);

  const render = () => {
    return (
      <>
        <Catalog
          filtered={data && filteredData}
          isSuggesting={false}
          isWatched
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
  try {
    const { data } = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API
      }/watched/?media_type=${params.media_type.slice(0, -1)}`
    );

    return {
      props: {
        data,
        media_type: params.media_type,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }

  /*   try {
    const lastLetter = params.media_type.slice(-1);

    const { data } =
      lastLetter === "s" &&
      (await axios.get(
        `${
          process.env.NEXT_PUBLIC_API
        }/watched/?media_type=${params.media_type.slice(0, -1)}`
      ));

    return {
      props: {
        data: data,
        media_type: params.media_type,
      },
    };
  } catch (error) {
    return { notFound: true };
  } */
};
