import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addData } from "@store/watched/watchedSlice";
import Title from "@component/Title/Title";
import Catalog from "@component/Catalog/Catalog";
import useRouterChanged from "@hooks/useRouterChanged";

export default function Home({ data }) {
  const dispatch = useDispatch();

  useRouterChanged({ removeValue: true });

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
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/watched?limit=10`
  );

  return {
    props: {
      data: data.results,
    },
  };
};
