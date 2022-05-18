import type NearApiSignatureInterface from '@/types/NearApiSignatureInterface';
import { useEffect, useState } from 'react';
import { useSigner } from '@/modules/near-api-react/hooks/useSigner';
import { useWallet } from '@/modules/near-api-react/hooks/useWallet';

export const useAccountSignature = () => {
  const [apiSignature, setApiSignature] = useState<NearApiSignatureInterface>();
  const { signStringMessage } = useSigner();
  const wallet = useWallet();

  useEffect(() => {
    const accountId = wallet && wallet.isSignedIn() && wallet.getAccountId();

    if (accountId) {
      signStringMessage(accountId).then((signature) => {
        setApiSignature({
          signature,
          accountId,
        });
      });
    }
  }, [wallet]);

  return apiSignature;
};
