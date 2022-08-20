import Title from "../components/Title/Title";
import Layout from "../layout/Layout/Layout";
import Catalog from "../components/Catalog/Catalog";

import axios from "axios";

export default function Home({ data }) {
  return (
    <Layout>
      <Title name="MaileHereko" input main>
        List of movies and TV shows 😉
        {/*         <br />
        Developed with ❤ by
        <br />- Front-end: <a href="https://github.com/brokuka">@brokuka</a>
        <br />- Back-end:{" "}
        <a href="https://github.com/v-zdorovcev">@v-zdorovcev</a> */}
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
