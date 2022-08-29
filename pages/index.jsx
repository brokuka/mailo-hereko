import Title from "../components/Title/Title";
import Catalog from "../components/Catalog/Catalog";
import axios from "axios";
import { wrapper } from "../store";
import { addData } from "../store/watched/watchedSlice";

export default function Home() {
  return (
    <>
      <Title name={process.env.NEXT_PUBLIC_APPLICATION_NAME} input main>
        List of movies and TV shows 😉
      </Title>
      <Catalog />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/watched`);

    /*   return {
    props: {
      data: data.results,
    },
  }; */
    store.dispatch(addData(data.results));
  }
);
