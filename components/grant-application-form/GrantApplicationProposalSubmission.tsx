import { useRouter } from 'next/router';
import { Button, Alert, Text } from '@mantine/core';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';
import { useTranslation } from 'next-i18next';
import { AlertCircle } from 'tabler-icons-react';
import useDaoContract from '@/hooks/useDaoContract';

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
      {errorCode && (
        <Alert icon={<AlertCircle size={16} />} title={t('error.tx_error.title')} color="orange" mt={16}>
          {t('error.tx_error.description')}
        </Alert>
      )}
      <Text>Click here to resubmit the application on chain</Text>
      <Button type="submit" color="violet" disabled={isNearLoading} loading={isNearLoading} onClick={submitGrantProposal}>
        {t('form.submit')}
      </Button>
    </>
  );
}

export default GrantApplicationProposalSubmission;
