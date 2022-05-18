import { useTranslation } from 'next-i18next';
import { Container, SimpleGrid, Button, Center } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

function HomeHero() {
  const { t } = useTranslation('home');

  return (
    <Container>
      <SimpleGrid cols={2} className={styles.hero}>
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
        <Center>
          <div>
            <Image src="/images/illustration.png" alt="Illustration" width={400} height={400} />
          </div>
        </Center>
      </SimpleGrid>
    </Container>
  );
}

export default HomeHero;
