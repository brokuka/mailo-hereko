import Head from "next/head";
import App from "next/app";

/* Style */
import "../styles/index.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MaileHereko - best of best!</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
