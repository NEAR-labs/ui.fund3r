import { useContext } from 'react';

import GrantContext from '@/contexts/GrantContext';

const MILESTONE_STATUS = {
  ERROR: 'ERROR',
  STARTED: 'STARTED',
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

    // if (milestone.dateSubmissionOnChain) {
    //   milestone.status = MILESTONE_STATUS.SUBMIT;
    //   milestone.pendingStep = 1;
    // }

    if (milestone.dateSubmission) {
      milestone.status = MILESTONE_STATUS.SUBMIT;
      milestone.pendingStep = 1;
    }

    if (milestone.dataRejection) {
      milestone.status = MILESTONE_STATUS.SUBMIT;
    }

    if (milestone.dateValidation) {
      milestone.status = MILESTONE_STATUS.REVIEW;
    }

    if (milestone.datePayout) {
      milestone.status = MILESTONE_STATUS.PAYOUT;
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
