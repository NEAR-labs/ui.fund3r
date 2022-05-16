import { useState, useEffect } from 'react';
import { connect, Near, WalletConnection } from 'near-api-js';
import { NearContext } from '../context/NearContext';
import { getConfig } from '../config';

export const NearProvider = ({ children, network }: { children: JSX.Element; network: string | undefined }) => {
  const [near, setNear] = useState<Near | null>(null);
  const [wallet, setWallet] = useState<WalletConnection | null>(null);

  useEffect(() => {
    async function connectNear() {
      const config = getConfig(network);
      const near = await connect(config);
      setNear(near);
      setWallet(new WalletConnection(near, 'fund3r-wallet'));
    }
    connectNear().catch(console.error);
  }, []);

  const isConnected = Boolean(near && wallet);

  return <NearContext.Provider value={{ near, wallet }}>{isConnected && children}</NearContext.Provider>;
};
