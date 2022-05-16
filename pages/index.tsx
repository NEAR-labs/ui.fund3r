import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Container, SimpleGrid, Button, Center } from '@mantine/core';

const Home: NextPage = () => {
  const { t } = useTranslation('home');

  return (
    <Container>
      <SimpleGrid cols={2}>
        <Center>
          <div>
            <h1>{t('hero.headline')}</h1>
            <p>{t('hero.description')}</p>
            <Link href="/grants" passHref>
              <Button component="a" color="dark" radius="xl" size="md">
                {t('hero.call_to_action')}
              </Button>
            </Link>
          </div>
        </Center>
        <div>
          <Image src="/images/illustration.png" alt="Illustration" width={400} height={400} />
        </div>
      </SimpleGrid>
    </Container>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['home'])),
    },
  };
}

export default Home;
