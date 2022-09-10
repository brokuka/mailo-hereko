import React from "react";
import Dashboard from "@component/Dashboard/Dashboard";
import Head from "next/head";

const Index = () => {
  return (
    <>
      <Head>
        <title>{`Dashboard - ${process.env.NEXT_PUBLIC_APPLICATION_NAME}`}</title>
      </Head>
      <Dashboard />
    </>
  );
};

export default Index;
