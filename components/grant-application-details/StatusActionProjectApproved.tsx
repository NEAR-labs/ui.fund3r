import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Button, Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import { useKycDao } from '@/modules/kycdao-sdk-react';

// eslint-disable-next-line max-lines-per-function
function StatusActionProjectApproved({ email, country }: { email: string | undefined; country: string | undefined }) {
  const { t } = useTranslation('grant');
  const [isLoading, setIsLoading] = useState(false);
  const [isKycCompleted, setIsKycCompleted] = useState(false);
  const [isKycValid, setIsKycValid] = useState(false);
  const kycDao = useKycDao();

  const runKycModal = useCallback(async () => {
    if (!country || !email || !kycDao) {
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
    const { KYC } = await kycDao.checkVerificationStatus();

    if (!KYC) {
      kycDao.startVerification(verificationData, options);
    }
  }, [country, email, kycDao]);

  useEffect(() => {
    const startKycAction = () => {
      if (!isKycValid && kycDao?.connectedWallet) {
        setIsLoading(true);
        runKycModal();
      }
    };

    startKycAction();
  }, [isKycValid, kycDao?.connectedWallet, runKycModal]);

  const mintSbt = async () => {
    if (!kycDao) {
      return;
    }

    setIsLoading(true);
    await kycDao.startMinting({
      disclaimerAccepted: true,
    });
    setIsLoading(false);
  };

  const { isLoading: validationLoading } = useQuery(
    ['validate-kyc'],
    () => {
      return kycDao && kycDao.checkVerificationStatus();
    },
    {
      refetchOnWindowFocus: true,
      refetchInterval: 2000,
      enabled: kycDao ? kycDao.walletConnected : false,
      onSuccess: (data) => {
        if (data?.KYC === true) {
          setIsKycValid(true);
        }
      },
    },
  );

  const connect = async () => {
    if (!kycDao) {
      return;
    }

    setIsLoading(true);
    await kycDao.connectWallet('Near');
    setIsLoading(false);
  };

  const waitingForValidation = isKycCompleted && !isKycValid;
  const isLoadingOrWaitingForValidation = isLoading || validationLoading || waitingForValidation;

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
          <Button color="violet" onClick={connect} loading={isLoadingOrWaitingForValidation} disabled={isLoadingOrWaitingForValidation}>
            {t('details.status-actions.approved.button')}
          </Button>
        </>
      )}
    </Paper>
  );
}

export default StatusActionProjectApproved;
