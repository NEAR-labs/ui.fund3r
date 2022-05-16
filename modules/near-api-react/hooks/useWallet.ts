import { useContext } from 'react';
import { NearContext } from '../context/NearContext';

/**
 * Get the NEAR wallet connection object from the context.
 */
export const useWallet = () => {
  const { wallet } = useContext(NearContext);
  return wallet;
};
