import { useContext } from 'react';

import GrantContext from '@/contexts/GrantContext';

const STATUS = {
  EDIT: 'EDIT',
  OFFCHAIN_SUBMITTED: 'OFFCHAIN_SUBMITTED',
  FULLY_SUBMITTED: 'FULLY_SUBMITTED',
};

const useGrantStatus = () => {
  const context = useContext(GrantContext);

  if (context === undefined) {
    throw new Error(`useGrantStatus must be used within a GrantProvider`);
  }

  const { grant } = context;

  if (grant && grant.dateSubmission && grant.isNearProposalValid) {
    return STATUS.FULLY_SUBMITTED;
  }

  if (grant && grant.dateSubmission && !grant.isNearProposalValid) {
    return STATUS.OFFCHAIN_SUBMITTED;
  }

  return STATUS.EDIT;
};

export { STATUS, useGrantStatus };
