import { keyStores } from 'near-api-js';

/**
 * Function that returns a NEAR connection configuration object based on the given networkId.
 *
 * @param  {string} networkId='testnet'
 * @return {object}
 */
export const getConfig = (networkId = 'testnet') => {
  return {
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    networkId,
    nodeUrl: `https://rpc.${networkId}.near.org`,
    walletUrl: `https://wallet.${networkId}.near.org`,
    helperUrl: `https://helper.${networkId}.near.org`,
    explorerUrl: `https://explorer.${networkId}.near.org`,
  };
};
