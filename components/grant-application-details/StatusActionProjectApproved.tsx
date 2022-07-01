import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Button, Paper, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { useKycDao } from '@/modules/kycdao-sdk-react';

// eslint-disable-next-line max-lines-per-function
function StatusActionProjectApproved({ email, country }: { email: string | undefined; country: string | undefined }) {
  const { t } = useTranslation('grant');
  const [isLoading, setIsLoading] = useState(false);
  const [isKycCompleted, setIsKycCompleted] = useState(false);
  const [isKycValid, setIsKycValid] = useState(false);
  // const [isTokenMinted, setIsTokenMinted] = useState(false);
  const router = useRouter();
  const kycDao = useKycDao();

  const { startKyc, grantRequestSlug } = router.query;

  const runKycModal = useCallback(async () => {
    if (!country || !email) {
      return;
    }

    setIsLoading(true);

    const { VerificationTypes } = await import('@kycdao/kycdao-sdk');

    const verificationData = {
      email,
      isEmailConfirmed: true,
      taxResidency: country,
      isLegalEntity: false,
      verificationType: VerificationTypes.KYC,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, email]);

  const startKycAction = () => {
    if (!isKycValid) {
      setIsLoading(true);

      router.push(`/grants/${grantRequestSlug}?startKyc=true`).then(() => {
        kycDao.connectWallet('Near');
      });
    }
  };

  const mintSbt = () => {
    // eslint-disable-next-line no-alert
    alert('Coming soon');
  };

  const { isLoading: validationLoading, refetch: startFetchValidation } = useQuery(
    ['validate-kyc'],
    () => {
      return kycDao.checkVerificationStatus();
    },
    {
      refetchOnWindowFocus: true,
      refetchInterval: 2000,
      enabled: kycDao.walletConnected,
      onSuccess: (data) => {
        if (data.KYC === true) {
          setIsKycValid(true);
        }
      },
    },
  );

  useEffect(() => {
    if (!!startKyc && kycDao.walletConnected) {
      runKycModal();
      router.push(`/grants/${grantRequestSlug}`);
    }
  }, [grantRequestSlug, kycDao.walletConnected, router, runKycModal, startFetchValidation, startKyc]);

  const waitingForValidation = isKycCompleted && !isKycValid;
  const isLoadingOrWaitingForValidation = isLoading || validationLoading || waitingForValidation;

  // watch isTokenMinted and redirect to the next page by reloading grant

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      {isKycValid ? (
        <>
          <Text mb="sm">{t('details.status-actions.approved.nft-message')}</Text>
          <Button color="violet" onClick={mintSbt} loading={isLoadingOrWaitingForValidation} disabled={isLoadingOrWaitingForValidation}>
            {t('details.status-actions.approved.nft-button')}
          </Button>
        </>
      ) : (
        <>
          <Text mb="sm">{t('details.status-actions.approved.message')}</Text>
          <Button color="violet" onClick={startKycAction} loading={isLoadingOrWaitingForValidation} disabled={isLoadingOrWaitingForValidation}>
            {t('details.status-actions.approved.button')}
          </Button>
        </>
      )}
    </Paper>
  );
}

export default StatusActionProjectApproved;
