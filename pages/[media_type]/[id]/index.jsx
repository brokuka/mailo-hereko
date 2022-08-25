import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../../layout/Layout/Layout";
import Overview from "../../../components/Overview/Overview";

const Index = ({ data }) => {
  const router = useRouter().query;
  console.log(data);

  return (
    <Layout>
      <Overview {...data} />
    </Layout>
  );
};

export const getStaticProps = async ({ params }) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/${params.media_type}/${params.id}`
  );

  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/watched`);

  return {
    paths: data.results.map((obj) => {
      return {
        params: {
          media_type: obj.media_type,
          id: obj.id.toString(),
        },
      };
    }),
    fallback: false,
  };
};

export default Index;
