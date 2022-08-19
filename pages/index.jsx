import Title from "../components/Title/Title";
import Layout from "../layout/Layout/Layout";
import Input from "../components/Inputs/Input/Input";
import Header from "../components/Header/Header";
import Catalog from "../components/Catalog/Catalog";

import axios from "axios";

export default function Home({ data }) {
  return (
    <Layout>
      <Title name="MaileHereko" input main>
        List of movies and TV Shows, I, Pramod Poudel have watched till date.
        Explore what I have watched and also feel free to make a suggestion. 😉
      </Title>
      <Catalog data={data} />
    </Layout>
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
