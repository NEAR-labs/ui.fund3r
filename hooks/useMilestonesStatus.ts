import { useContext } from 'react';

import GrantContext from '@/contexts/GrantContext';

const MILESTONE_STATUS = {
  ERROR: 'ERROR',
};

const useMilestonesStatus = () => {
  const context = useContext(GrantContext);

  if (context === undefined) {
    throw new Error(`useGrantStatus must be used within a GrantProvider`);
  }

  const { grant } = context;

  const milestones = grant?.milestones;

  if (!milestones) {
    return {
      error: MILESTONE_STATUS.ERROR,
    };
  }

  const currentMilestone = 0;

  return {
    currentMilestone,
    milestones,
  };
};

export { MILESTONE_STATUS, useMilestonesStatus };
