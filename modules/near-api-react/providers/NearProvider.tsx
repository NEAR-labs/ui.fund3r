import type { Near } from 'near-api-js';
import { useState, useEffect, useMemo } from 'react';
import { connect, WalletConnection } from 'near-api-js';
import NearContext from '../context/NearContext';
import { getConfig } from '../config';

const NearProvider = ({ children, networkId = 'tesnet' }: { children: JSX.Element; networkId: string }) => {
  const [near, setNear] = useState<Near | null>(null);
  const [wallet, setWallet] = useState<WalletConnection | null>(null);

  useEffect(() => {
    async function connectNear() {
      const config = getConfig(networkId);
      const nearConnection = await connect(config);
      setNear(nearConnection);
      setWallet(new WalletConnection(nearConnection, 'fund3r-wallet'));
    }
    connectNear().catch(console.error);
  }, [networkId]);

  const isConnected = Boolean(near && wallet);

  const contextValue = useMemo(() => ({ near, wallet, networkId }), [near, wallet, networkId]);

  return <NearContext.Provider value={contextValue}>{isConnected && children}</NearContext.Provider>;
};

export default NearProvider;
