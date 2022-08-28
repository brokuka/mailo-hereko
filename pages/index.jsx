import Title from "../components/Title/Title";
import Catalog from "../components/Catalog/Catalog";

import axios from "axios";

export default function Home({ data }) {
  return (
    <>
      <Title name={process.env.NEXT_PUBLIC_APPLICATION_NAME} input main>
        List of movies and TV shows 😉
      </Title>
      <Catalog data={data} />
    </>
  );
}

export const getStaticProps = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/watched`);

  return {
    props: {
      data: data.results,
    },
  };
};
