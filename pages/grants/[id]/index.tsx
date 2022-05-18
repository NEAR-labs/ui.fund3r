import Head from 'next/head';
import { Container } from '@mantine/core';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import DefaultLayout from '@/layouts/default';

function GrantApplication() {
  const { t } = useTranslation('grant');

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t('title')}</title>
        </Head>
        <Container>Hello</Container>
      </>
    </DefaultLayout>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'grant'])),
    },
  };
}

export default GrantApplication;
