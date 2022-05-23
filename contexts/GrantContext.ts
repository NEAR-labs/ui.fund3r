import type GrantApplicationInterface from '@/types/GrantApplicationInterface';
import { createContext } from 'react';

interface GrantContextInterface {
  grant: GrantApplicationInterface | null;
  setGrant: (grant: GrantApplicationInterface | null) => void;
}

const GrantContext = createContext<GrantContextInterface>({ grant: null, setGrant: () => null });

export default GrantContext;
