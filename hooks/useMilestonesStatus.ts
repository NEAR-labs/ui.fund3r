import { useContext } from 'react';

import GrantContext from '@/contexts/GrantContext';

const MILESTONE_STATUS = {
  ERROR: 'ERROR',
  STARTED: 'STARTED',
  PARTLY_SUBMITTED: 'PARTLY_SUBMITTED',
  REJECTED: 'REJECTED',
  SUBMIT: 'SUBMIT',
  REVIEW: 'REVIEW',
  PAYOUT: 'PAYOUT',
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

  let currentMilestone = 0;

  /* eslint-disable no-param-reassign */
  const milestonesStatus = milestones.map((milestone, index) => {
    milestone.status = MILESTONE_STATUS.STARTED;
    milestone.step = 0;
    milestone.pendingStep = 0;

    if (milestone.dateSubmission) {
      milestone.status = MILESTONE_STATUS.PARTLY_SUBMITTED;
      milestone.pendingStep = 0;
    }

    if (milestone.dateSubmission && milestone.isNearProposalValid) {
      milestone.status = MILESTONE_STATUS.SUBMIT;
      milestone.pendingStep = 1;
    }

    if (milestone.dateRejection) {
      milestone.status = MILESTONE_STATUS.REJECTED;
      milestone.pendingStep = 0;
    }

    if (milestone.dateValidation) {
      milestone.status = MILESTONE_STATUS.REVIEW;
      currentMilestone = Math.min(milestones.length - 1, index + 1);
    }

    return milestone;
  });
  /* eslint-enable no-param-reassign */

  return {
    currentMilestone,
    milestonesStatus,
  };
};

export { MILESTONE_STATUS, useMilestonesStatus };
