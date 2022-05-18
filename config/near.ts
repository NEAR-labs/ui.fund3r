import { CONTRACT_ID, HOST } from '@/constants';

const signInOptions = {
  contractId: CONTRACT_ID,
  methodNames: [],
  successUrl: `${HOST}/grants`,
  failureUrl: `${HOST}/login?error=connect`,
};

export default signInOptions;
