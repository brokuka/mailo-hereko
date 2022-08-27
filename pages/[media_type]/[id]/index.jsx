import React from "react";
import axios from "axios";
import Head from "next/head";
import Overview from "../../../components/Overview/Overview";

const Index = ({ data }) => {
  return (
    <>
      <Head>
        <title>{`${data.title} - ${process.env.NEXT_PUBLIC_APPLICATION_NAME}`}</title>
        {data.description && (
          <meta name="description" content={data.description} />
        )}
        <meta
          property="og:title"
          content={`${data.title} - ${process.env.NEXT_PUBLIC_APPLICATION_NAME}`}
          key="title"
        />
      </Head>
      <Overview {...data} />
    </>
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
