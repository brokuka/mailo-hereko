import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addData } from "@store/watched/watchedSlice";
import Catalog from "@component/Catalog/Catalog";
import Title from "@component/Title/Title";
import useRouterChanged from "@hooks/useRouterChanged";
import { setFilterType, setFilterValue } from "@store/filter/filterSlice";

const Index = ({ data, media_type }) => {
  const dispatch = useDispatch();
  const checkMediaType = media_type === "movies" ? media_type : "TV Shows";

  useRouterChanged({ removeValue: true });

  React.useEffect(() => {
    dispatch(addData(data));
    dispatch(setFilterType(media_type.slice(0, -1)));
    // dispatch(setFilterValue(""));
  }, [data, dispatch, media_type]);

  return (
    <>
      <Title name={checkMediaType} input sub withState={false} />
      <Catalog isWatched />
    </>
  );
};

export default Index;

export const getServerSideProps = async ({ params }) => {
  try {
    const lastLetter = params.media_type.slice(-1);

    const { data } =
      lastLetter === "s" &&
      (await axios.get(
        `${
          process.env.NEXT_PUBLIC_API
        }/watched/?media_type=${params.media_type.slice(0, -1)}`
      ));

    console.log(params);

    return {
      props: {
        data: data.results,
        media_type: params.media_type,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
