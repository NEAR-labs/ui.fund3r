import { useContext } from 'react';
import { NearContext } from '../context/NearContext';

/**
 * Get the NEAR connection object from the context.
 */
export const useNear = () => {
  const { near } = useContext(NearContext);
  return near;
};
