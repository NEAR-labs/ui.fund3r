import { Alert, Button, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { AlertCircle } from 'tabler-icons-react';

import useDaoContract from '@/hooks/useDaoContract';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';

function GrantApplicationProposalSubmission({ data }: { data: GrantApplicationInterface | undefined | null }) {
  const { t } = useTranslation('grant');
  const router = useRouter();
  const { errorCode } = router.query;

  const { isNearLoading, submitProposal } = useDaoContract();

  const submitGrantProposal = () => {
    submitProposal(data, 0);
  };

  return (
    <>
      <Title mb="xl">{t('blockchain.title')}</Title>
      {errorCode && (
        <Alert icon={<AlertCircle size={16} />} title={t('error.tx_error.title')} color="orange" mb="xl">
          {t('error.tx_error.description')}
        </Alert>
      )}
      <Text mb="xl">{t('blockchain.description')}</Text>
      <Button type="submit" color="violet" disabled={isNearLoading} loading={isNearLoading} onClick={submitGrantProposal}>
        {t('blockchain.button')}
      </Button>
    </>
  );
}

export default GrantApplicationProposalSubmission;
