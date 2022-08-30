import Head from "next/head";
import Layout from "./../layout/Layout/Layout";
import "resize-observer-polyfill";
import { store } from "../store";

/* Style */
import "../styles/index.scss";
import { Provider } from "react-redux";

function App({ Component, pageProps }) {
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
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default App;
