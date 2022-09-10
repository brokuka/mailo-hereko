import React from "react";
import Dashboard from "@component/Dashboard/Dashboard";
import Head from "next/head";
import { useRedirect } from "@hooks/useRedirect";

const Index = () => {
  useRedirect({ type: "auth" });

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
