import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { appWithTranslation } from 'next-i18next';
import { NearProvider } from '@/modules/near-api-react/providers/NearProvider';
import { getConfig } from '@/config/near';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  const nearNetworkEnv = process.env.NEAR_NETWORK_ENV;

  return (
    <>
      <Head>
        <title>Fund3r</title>
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
        <NearProvider config={getConfig(nearNetworkEnv)}>
          <Component {...pageProps} />
        </NearProvider>
      </MantineProvider>
    </>
  );
};

export default appWithTranslation(App);
