import type GrantApplicationInterface from '@/types/GrantApplicationInterface';
import { createContext } from 'react';

interface GrantContextInterface {
  grant: GrantApplicationInterface | null;
  setGrant: (grant: GrantApplicationInterface | null) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const GrantContext = createContext<GrantContextInterface>({ grant: null, setGrant: () => {} });

export default GrantContext;
