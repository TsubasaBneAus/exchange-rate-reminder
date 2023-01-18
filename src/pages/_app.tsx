import "../styles/normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from '../components/Layout'
import { SessionProvider } from "next-auth/react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};
export default App;
