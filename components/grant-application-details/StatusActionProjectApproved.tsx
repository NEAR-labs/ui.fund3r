import { Button, Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

// import { useKycDao } from '@/modules/kycdao-sdk-react';

function StatusActionProjectApproved() {
  const { t } = useTranslation('grant');

  //   const { registerOrLogin } = useKycDao();

  const startKyc = () => {
    // registerOrLogin();
  };

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      <Text mb="sm">{t('details.status-actions.approved.message')}</Text>
      <Button color="violet" onClick={startKyc}>
        {t('details.status-actions.approved.button')}
      </Button>
    </Paper>
  );
}

export default StatusActionProjectApproved;
