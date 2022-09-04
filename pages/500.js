import Head from "next/head";
import React from "react";
import Error from "@component/Error/Error";

const Index = () => {
  return (
    <>
      <Head>
        <title>
          Not found page - {process.env.NEXT_PUBLIC_APPLICATION_NAME}
        </title>
      </Head>
      <Error type="notFound" />
    </>
  );
};

export default Index;
