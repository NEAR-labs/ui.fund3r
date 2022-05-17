import { useNear } from './useNear';
import { useWallet } from './useWallet';
import { useNetworkId } from './useNetworkId';

/**
 * Get the signer in order to sign transactions or messages
 */
export const useSigner = () => {
  const near = useNear();
  const wallet = useWallet();
  const networkId = useNetworkId();

  const signer = near?.connection.signer;
  const accountId = wallet && wallet.isSignedIn() && wallet.getAccountId();

  const signObjectMessage = async (message: any) => {
    const stringMessage = JSON.stringify(message);

    return await signStringMessage(stringMessage);
  };

  const signStringMessage = async (stringMessage: string) => {
    const byteMessage = Buffer.from(stringMessage);
    const signature = await signer?.signMessage(byteMessage, accountId, networkId);
    const signedMessage = signature?.signature;

    return signedMessage;
  };

  return { signer, signObjectMessage, signStringMessage };
};
