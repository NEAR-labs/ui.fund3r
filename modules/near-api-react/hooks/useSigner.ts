import { useNear } from './useNear';
import { useWallet } from './useWallet';
import { useNetworkId } from './useNetworkId';
import { useCallback } from 'react';

/**
 * Get the signer in order to sign transactions or messages
 */
const useSigner = () => {
  const near = useNear();
  const wallet = useWallet();
  const networkId = useNetworkId();

  const signer = near?.connection.signer;
  const accountId = wallet && wallet.isSignedIn() && wallet.getAccountId();

  const signStringMessage = useCallback(
    async (stringMessage: string) => {
      if (!signer) {
        return false;
      }

      const byteMessage = Buffer.from(stringMessage);
      const signature = await signer.signMessage(byteMessage, accountId, networkId);
      const signedMessage = signature?.signature;

      return signedMessage;
    },
    [signer, accountId, networkId],
  );

  const signObjectMessage = async (message: any) => {
    const stringMessage = JSON.stringify(message);
    const signedMessage = await signStringMessage(stringMessage);
    return signedMessage;
  };

  return { signer, signObjectMessage, signStringMessage };
};

export default useSigner;
