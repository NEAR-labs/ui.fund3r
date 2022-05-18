import { Container, Center, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import NearConnectButton from '@/components/common/NearConnectButton';
import styles from '@/styles/Login.module.css';
import { APP_NAME } from '@/constants';
import signInOptions from '@/config/near';

function LoginContent() {
  const { t } = useTranslation('login');

  return (
    <Container>
      <Center className={styles.container}>
        <Text align="center">
          <h1>{t('headline')}</h1>
          <p>{t('description')}</p>
          <NearConnectButton signInOptions={signInOptions} appName={APP_NAME}>
            {t('call_to_action')}
          </NearConnectButton>
        </Text>
      </Center>
    </Container>
  );
}

export default LoginContent;
