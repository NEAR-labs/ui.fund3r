import Head from 'next/head';
import { Container, Button, Center, Text } from '@mantine/core';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import styles from '@/styles/Login.module.css';

function Login() {
  const { t } = useTranslation('login');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <Container>
        <Center className={styles.container}>
          <Text align="center">
            <h1>{t('headline')}</h1>
            <p>{t('description')}</p>
            <Button color="violet">{t('call_to_action')}</Button>
          </Text>
        </Center>
      </Container>
    </>
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
