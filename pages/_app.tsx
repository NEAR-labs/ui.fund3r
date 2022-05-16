import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { appWithTranslation } from 'next-i18next';
import { NearProvider } from '@/modules/near-api-react/providers/NearProvider';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  const nearNetworkEnv = process.env.NEAR_NETWORK_ENV;

  return (
    <>
      <Head>
        <title>FUND3R</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <NearProvider network={nearNetworkEnv}>
          <Component {...pageProps} />
        </NearProvider>
      </MantineProvider>
    </>
  );
};

export default appWithTranslation(App);
