import "../styles/normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from '../components/Layout'
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Exchange Rate Reminder</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};
export default App;
