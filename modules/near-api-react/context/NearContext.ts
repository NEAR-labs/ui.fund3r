import { createContext } from 'react';
import type { Near, WalletConnection } from 'near-api-js';

interface NearContextInterface {
  near: Near | null;
  wallet?: WalletConnection | null;
}

export const NearContext = createContext<NearContextInterface>({ near: null, wallet: null });
