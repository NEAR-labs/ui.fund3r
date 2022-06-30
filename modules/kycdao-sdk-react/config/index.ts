import type { SdkConfiguration } from '@kycdao/kycdao-sdk';
import { BlockchainNetworks, KycDaoEnvironments, VerificationTypes } from '@kycdao/kycdao-sdk';

const getConfig = (networkId = 'testnet'): SdkConfiguration => {
  const configMap = new Map([
    [
      'testnet',
      {
        baseUrl: 'https://staging.kycdao.xyz/api/frontend',
        enabledBlockchainNetworks: [BlockchainNetworks.NearTestnet],
        enabledVerificationTypes: [VerificationTypes.KYC],
        environment: KycDaoEnvironments.test,
      },
    ],
  ]);

  const config = configMap.get(networkId);

  if (!config) {
    throw new Error(`No config for networkId: ${networkId}`);
  }

  return config;
};

export default getConfig;
