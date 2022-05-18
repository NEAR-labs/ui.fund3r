import type { Near } from 'near-api-js';
import { useState, useEffect } from 'react';
import { connect, WalletConnection } from 'near-api-js';
import { NearContext } from '../context/NearContext';
import { getConfig } from '../config';

export const NearProvider = ({ children, networkId = 'tesnet' }: { children: JSX.Element; networkId: string }) => {
  const [near, setNear] = useState<Near | null>(null);
  const [wallet, setWallet] = useState<WalletConnection | null>(null);

  useEffect(() => {
    async function connectNear() {
      const config = getConfig(networkId);
      const near = await connect(config);
      setNear(near);
      setWallet(new WalletConnection(near, 'fund3r-wallet'));
    }
    connectNear().catch(console.error);
  }, []);

  const isConnected = Boolean(near && wallet);

  return <NearContext.Provider value={{ near, wallet, networkId }}>{isConnected && children}</NearContext.Provider>;
};
