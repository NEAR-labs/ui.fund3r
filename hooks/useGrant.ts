/* eslint-disable max-lines-per-function */
import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import GrantContext from '@/contexts/GrantContext';
import useAccountSignature from '@/hooks/useAccountSignature';
import { getGrantApplication, validateNearTransactionHash } from '@/services/apiService';

const useGrant = (grantId: any, transactionHashes: string | string[] | undefined) => {
  const context = useContext(GrantContext);

  if (context === undefined) {
    throw new Error(`useGrant must be used within a GrantProvider`);
  }

  const { grant, setGrant } = context;
  const apiSignature = useAccountSignature();

  const { isLoading: isGrantLoading } = useQuery(['grant', apiSignature, grantId], () => getGrantApplication(apiSignature, grantId), {
    refetchOnWindowFocus: false,
    onSuccess: (updatedGrantData) => {
      setGrant(updatedGrantData);
      console.log(grant);
    },
  });

  const { isLoading: isValidatingTransactionHash, refetch: validateTransactionHash } = useQuery(
    ['validate-transaction-hash', apiSignature, grantId],
    () => {
      return validateNearTransactionHash(apiSignature, { grantId, proposalNearTransactionHash: transactionHashes });
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (updatedGrantData) => {
        setGrant(updatedGrantData);
      },
    },
  );

  useEffect(() => {
    if (transactionHashes) {
      setTimeout(() => {
        validateTransactionHash();
      }, 1);
    }
  }, [transactionHashes, validateTransactionHash]);

  const isLoading = isGrantLoading || isValidatingTransactionHash;

  return {
    grant,
    setGrant,
    isLoading,
  };
};

export default useGrant;
