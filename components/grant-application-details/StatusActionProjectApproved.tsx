import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { Button, Paper, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import useOnceCall from '@/hooks/useOnceCall';
import { useKycDao } from '@/modules/kycdao-sdk-react';

// eslint-disable-next-line max-lines-per-function
function StatusActionProjectApproved({ email, country }: { email: string | undefined; country: string | undefined }) {
  const { t } = useTranslation('grant');
  const [isLoading, setIsLoading] = useState(false);
  const [isKycCompleted, setIsKycCompleted] = useState(false);
  const [isKycValid, setIsKycValid] = useState(false);
  const router = useRouter();
  const kycDao = useKycDao();

  const { startKyc, grantRequestSlug } = router.query;

  const runKycModal = useCallback(async () => {
    if (!country || !email) {
      return;
    }

    setIsLoading(true);

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
          setIsLoading(false);
        },
        onComplete: async () => {
          setIsKycCompleted(true);
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
        },
      },
    };

    await kycDao.registerOrLogin();
    kycDao.startVerification(verificationData, options);
  }, [country, email, kycDao]);

  const startKycAction = () => {
    console.log('Click on button');
    setIsLoading(true);

    router.push(`/grants/${grantRequestSlug}?startKyc=true`).then(() => {
      kycDao.connectWallet('Near');
    });
  };

  const { isLoading: validationLoading, refetch: startFetchValidation } = useQuery(
    ['validate-kyc', isKycCompleted],
    () => {
      return kycDao.checkVerificationStatus();
    },
    {
      refetchOnWindowFocus: true,
      refetchInterval: 1000,
      enabled: isKycCompleted,
      onSuccess: (data) => {
        console.log('Validation data', data);
        if (data.KYC === true) {
          setIsKycValid(true);
        }
      },
    },
  );

  useOnceCall(() => {
    console.log('this should trigger once only');
    runKycModal();
    startFetchValidation(); // temporary for testing TO REMOVE
    router.push(`/grants/${grantRequestSlug}`);
  }, !!startKyc && kycDao.walletConnected);

  const waitingForValidation = isKycCompleted && !isKycValid;

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      <Text mb="sm">{t('details.status-actions.approved.message')}</Text>
      <Button color="violet" onClick={startKycAction} loading={isLoading || validationLoading} disabled={isLoading || validationLoading}>
        {t('details.status-actions.approved.button')}
      </Button>
      {waitingForValidation && <div>Waiting for KYC validation</div>}
      {isKycValid && <div>KYC validated</div>}
    </Paper>
  );
}

export default StatusActionProjectApproved;
