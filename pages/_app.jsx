import Head from "next/head";
import Layout from "./../layout/Layout/Layout";
import "resize-observer-polyfill";

/* Style */
import "../styles/index.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MaileHereko - best of best!</title>
        <meta
          name="description"
          content="MaileHereko is web-application where you can find list of movies and tv shows"
        />
        <meta
          property="og:title"
          content="MaileHereko - best of best!"
          key="title"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
