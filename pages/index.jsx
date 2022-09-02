import Title from "../components/Title/Title";
import Catalog from "../components/Catalog/Catalog";
import axios from "axios";
import { addData } from "../store/watched/watchedSlice";
import { useDispatch } from "react-redux";
import React from "react";
import { setFilterValue } from "../store/filter/filterSlice";

export default function Home({ data }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(addData(data));
  }, [data, dispatch]);

  return (
    <>
      <Title name={process.env.NEXT_PUBLIC_APPLICATION_NAME} input main>
        List of movies and TV shows 😉
      </Title>
      <Catalog isWatched filter />
    </>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/watched`);

  return {
    props: {
      data: data.results,
    },
  };
};
