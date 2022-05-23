import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Alert } from '@mantine/core';
import type GrantApplicationInterface from '@/types/GrantApplicationInterface';
import type SputnikContractInterface from '@/types/SputnikContractInterface';
import useContract from '@/modules/near-api-react/hooks/useContract';
import { createPayoutProposal } from '@/services/sputnikContractService';
import { CONTRACT_ID } from '@/constants';
import { useTranslation } from 'next-i18next';
import { AlertCircle } from 'tabler-icons-react';

function GrantApplicationProposalSubmission({ data }: { data: GrantApplicationInterface | undefined | null }) {
  const { t } = useTranslation('grant');
  const router = useRouter();
  const { errorCode } = router.query;

  const contract: SputnikContractInterface | undefined | null = useContract({
    contractId: CONTRACT_ID,
    contractMethods: {
      changeMethods: ['add_proposal'],
      viewMethods: ['get_policy'],
    },
  });

  const [isNearLoading, setIsNearLoading] = useState(false);

  const submitProposal = () => {
    setIsNearLoading(true);
    if (contract && data) {
      createPayoutProposal(contract, data, 0);
    }
  };

  return (
    <>
      {errorCode && (
        <Alert icon={<AlertCircle size={16} />} title={t('error.tx_error.title')} color="orange" mt={16}>
          {t('error.tx_error.description')}
        </Alert>
      )}
      <p>Click here to resubmit the application on chain</p>
      <Button type="submit" color="violet" disabled={isNearLoading} loading={isNearLoading} onClick={submitProposal}>
        {t('form.submit')}
      </Button>
    </>
  );
}

export default GrantApplicationProposalSubmission;
