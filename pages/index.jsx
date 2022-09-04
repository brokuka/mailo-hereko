import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "@store/watched/watchedSlice";
import Title from "@component/Title/Title";
import Catalog from "@component/Catalog/Catalog";
import useRouterChanged from "@hooks/useRouterChanged";
import { filterType } from "@store/filter/filter.selector";
import { setFilterType } from "@store/filter/filterSlice";

export default function Home({ data }) {
  const dispatch = useDispatch();
  const type = useSelector(filterType);

  useRouterChanged({ removeValue: true });

  React.useEffect(() => {
    if (type !== "all") {
      dispatch(setFilterType("all"));
    }

    dispatch(addData(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
