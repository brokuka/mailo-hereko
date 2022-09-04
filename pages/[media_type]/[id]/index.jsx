import React from "react";
import axios from "axios";
import Head from "next/head";
import Overview from "@component/Overview/Overview";

const Index = ({ data }) => {
  console.log(data);

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
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/${params.media_type}/${params.id}`
    );

    return {
      props: {
        data: data,
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
};

export const getStaticPaths = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/search?limit=${
      process.env.PREVIEW_ENV ? 10 : 1000
    }`
  );

  return {
    paths: data.results.map((obj) => {
      return {
        params: {
          media_type: obj.media_type,
          id: obj.id,
        },
      };
    }),
    fallback: "blocking",
  };
};

export default Index;
