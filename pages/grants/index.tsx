import Head from 'next/head';
import { Container } from '@mantine/core';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

function Login() {
  const { t } = useTranslation('login');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <Container>Grants</Container>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Login;
