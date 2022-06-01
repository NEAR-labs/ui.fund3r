import { useContext } from 'react';

import GrantContext from '@/contexts/GrantContext';

const STATUS = {
  EDIT: 'EDIT',
  OFFCHAIN_SUBMITTED: 'OFFCHAIN_SUBMITTED',
  FULLY_SUBMITTED: 'FULLY_SUBMITTED',
  EVALUATED: 'EVALUATED',
  INTERVIEW_SCHEDULED: 'INTERVIEW_SCHEDULED',
  INTERVIEW_COMPLETED: 'INTERVIEW_COMPLETED',
  DENIED: 'DENIED',
  APPROVED: 'APPROVED',
  KYC_COMPLETED: 'KYC_COMPLETED',
  KYC_APPROVED: 'KYC_APPROVED',
  KYC_DENIED: 'KYC_DENIED',
  AGREEMENT_SIGNED: 'AGREEMENT_SIGNED',
  FIRST_PAYMENT_SENT: 'FIRST_PAYMENT_SENT',
};

const useGrantStatus = () => {
  const context = useContext(GrantContext);

  if (context === undefined) {
    throw new Error(`useGrantStatus must be used within a GrantProvider`);
  }

  const { grant } = context;

  const grantOnlySubmittedOffChain = grant && grant.dateSubmission && !grant.isNearProposalValid;
  const grantFullySubmitted = grant && grant.dateSubmission && grant.isNearProposalValid;
  const grantEvaluated = grantFullySubmitted && grant.dateEvaluation;
  const grantInterviewScheduled = grantEvaluated && grant.dateInterviewScheduled;
  const grantInterviewCompleted = grantInterviewScheduled && grant.dateInterviewCompletionConfirmation;
  const grantDenied = grantFullySubmitted && grant.dateDenial;
  const grantApproved = grantFullySubmitted && grant.dateApproval;
  const grantKycCompleted = grantApproved && grant.dateKycCompletion;
  const grantKycApproved = grantKycCompleted && grant.dateKycApproved;
  const grantKycDenied = grantKycCompleted && grant.dateKycDenied;
  const grantAgreementSigned = grantKycApproved && grant.dateAgreementSignature;
  const grantFirstPaymentSent = grantAgreementSigned && grant.dateFirstPaymentSent;

  if (grantFirstPaymentSent) {
    return { status: STATUS.FULLY_SUBMITTED, step: 6 };
  }

  if (grantAgreementSigned) {
    return { status: STATUS.AGREEMENT_SIGNED, step: 5 };
  }

  if (grantKycDenied) {
    return { status: STATUS.KYC_DENIED, step: 4 };
  }

  if (grantKycCompleted) {
    return { status: STATUS.KYC_COMPLETED, step: 4 };
  }

  if (grantApproved) {
    return { status: STATUS.APPROVED, step: 2 };
  }

  if (grantDenied) {
    return { status: STATUS.DENIED, step: 1, pendingStep: 2 };
  }

  if (grantInterviewCompleted) {
    return { status: STATUS.INTERVIEW_COMPLETED, step: 1, pendingStep: 2 };
  }

  if (grantInterviewScheduled) {
    return { status: STATUS.INTERVIEW_SCHEDULED, step: 1 };
  }

  if (grantEvaluated) {
    return { status: STATUS.EVALUATED, step: 1 };
  }

  if (grantFullySubmitted) {
    return { status: STATUS.FULLY_SUBMITTED, step: 0 };
  }

  if (grantOnlySubmittedOffChain) {
    return { status: STATUS.OFFCHAIN_SUBMITTED, step: 0 };
  }

  return { status: STATUS.EDIT, step: 0 };
};

export { STATUS, useGrantStatus };
