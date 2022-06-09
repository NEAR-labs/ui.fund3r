import { Button, Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import { useKycDao } from '@/modules/kycdao-sdk-react';

function StatusActionProjectApproved({ email, country }: { email: string | undefined; country: string | undefined }) {
  const { t } = useTranslation('grant');

  const kycDao = useKycDao();

  // we need to handle redirect after the connexion / maybe with a custom hook

  const startKyc = () => {
    if (!country || !email) {
      return;
    }

    kycDao.connectWallet('Near');
    kycDao.registerOrLogin(); // this will make kycDao.loggedIn to be true

    const verificationData = {
      email,
      isEmailConfirmed: true,
      taxResidency: country,
      isLegalEntity: false,
      verificationType: 'KYC',
      termsAccepted: true,
    };

    const options = {
      personaOptions: {
        onCancel: () => {
          console.log('Canceled');
        },
        onComplete: async () => {
          console.log('Completed');
        },
        onError: (error: Error) => {
          console.log('Error', error);
        },
      },
    };

    kycDao.startVerification(verificationData, options);
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
