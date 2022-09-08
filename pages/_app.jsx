import Head from "next/head";
import "resize-observer-polyfill";
import { Provider } from "react-redux";
import { store } from "@store/index";
import Layout from "@layout/Layout/Layout";

/* Style */
import "../styles/index.scss";

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
