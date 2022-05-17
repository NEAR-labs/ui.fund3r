import Head from 'next/head';
import { Container, Center, Text } from '@mantine/core';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import NearConnectButton from '@/components/common/NearConnectButton';
import { useRouter } from 'next/router';
import DefaultLayout from '@/layouts/default';

import styles from '@/styles/Login.module.css';

function Login() {
  const { t } = useTranslation('login');

  const contractId = process.env.NEXT_PUBLIC_NEAR_DAO_CONTRACT_ID;
  const appName = process.env.NEXT_PUBLIC_APP_NAME;
  const host = process.env.NEXT_PUBLIC_HOST_URL;

  const signInOptions = {
    contractId,
    methodNames: [],
    successUrl: host + '/grants',
    failureUrl: host + '/login?error=connect',
  };

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t('title')}</title>
        </Head>
        <Container>
          <Center className={styles.container}>
            <Text align="center">
              <h1>{t('headline')}</h1>
              <p>{t('description')}</p>
              <NearConnectButton signInOptions={signInOptions} appName={appName}>
                {t('call_to_action')}
              </NearConnectButton>
            </Text>
          </Center>
        </Container>
      </>
    </DefaultLayout>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'login'])),
    },
  };
}

export default Login;
