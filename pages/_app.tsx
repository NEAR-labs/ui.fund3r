import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { appWithTranslation } from 'next-i18next';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import NearProvider from '@/modules/near-api-react/providers/NearProvider';
import { useState } from 'react';
import { CookiesProvider } from 'react-cookie';

// if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_MOCK_API) {
if (process.env.NEXT_PUBLIC_MOCK_API) {
  /* eslint-disable */
  const { setupWorker } = require('../__tests__/mocks');
  /* eslint-enable */
  setupWorker();
}

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  const [queryClient] = useState(() => new QueryClient());
  const nearNetworkEnv = process.env.NEXT_PUBLIC_NEAR_NETWORK_ENV || 'testnet';

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
        <NearProvider networkId={nearNetworkEnv}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <CookiesProvider>
                <Component {...pageProps} />
              </CookiesProvider>
            </Hydrate>
          </QueryClientProvider>
        </NearProvider>
      </MantineProvider>
    </>
  );
};

export default appWithTranslation(App);
