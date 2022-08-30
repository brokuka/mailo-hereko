import React from "react";
import axios from "axios";
import Catalog from "../../components/Catalog/Catalog";
import Title from "../../components/Title/Title";
import { useDispatch } from "react-redux";
import { addData } from "../../store/watched/watchedSlice";

const Index = ({ data, media_type }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(addData(data));
  }, [data, dispatch]);

  return (
    <>
      <Title name={media_type} input sub />
      <Catalog isWatched />
    </>
  );
};

export default Index;

export const getServerSideProps = async ({ params }) => {
  const { data } = await axios.get(
    `${
      process.env.NEXT_PUBLIC_API
    }/watched/?media_type=${params.media_type.slice(0, -1)}`
  );

  return {
    props: {
      data: data.results,
      media_type:
        params.media_type === "movies" ? params.media_type : "TV Shows",
    },
  };
};
