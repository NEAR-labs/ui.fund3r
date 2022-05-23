import { useState } from 'react';
import { Button } from '@mantine/core';
import type GrantApplicationInterface from '@/types/GrantApplicationInterface';
import useContract from '@/modules/near-api-react/hooks/useContract';
import { createPayoutProposal } from '@/services/sputnikContractService';
import { CONTRACT_ID } from '@/constants';
import { useTranslation } from 'next-i18next';

function GrantApplicationProposalSubmission({ data }: { data: GrantApplicationInterface | undefined | null }) {
  const { t } = useTranslation('grant');

  const contract = useContract({
    contractId: CONTRACT_ID,
    contractMethods: {
      changeMethods: ['add_proposal'],
      viewMethods: ['get_policy'],
    },
  });

  const [isNearLoading, setIsNearLoading] = useState(false);

  const submitProposal = () => {
    setIsNearLoading(true);
    createPayoutProposal(contract, data, 0);
  };

  return (
    <>
      <p>Click here to resubmit the application on chain</p>
      <Button type="submit" color="violet" disabled={isNearLoading} loading={isNearLoading} onClick={submitProposal}>
        {t('form.submit')}
      </Button>
    </>
  );
}

export default GrantApplicationProposalSubmission;
