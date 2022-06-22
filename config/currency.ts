export const DEFAULT_CURRENCY = 'USD';

export const getTokenId = (networkId = 'testnet') => {
  const tokenConfig = new Map([['testnet', 'usdn.testnet']]);

  return tokenConfig.get(networkId);
};
