import type { AppProps } from "next/app";
import Head from "next/head";

import { ApolloProvider } from "@apollo/client";

import { createApolloClient } from "@org/apollo";

import { AppProvider } from "$core/contexts/app";
import { ProcessProvider } from "$core/contexts/process";
import "$styles/global.scss";

const client = createApolloClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AutoPraeAksorn</title>
        <meta
          content="My personal stack for production app"
          name="description"
        />
      </Head>

      <ApolloProvider client={client}>
        <AppProvider>
          <ProcessProvider>
            <Component {...pageProps} />
          </ProcessProvider>
        </AppProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
