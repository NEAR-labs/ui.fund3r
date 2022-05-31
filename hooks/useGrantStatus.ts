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
    return STATUS.FULLY_SUBMITTED;
  }

  if (grantAgreementSigned) {
    return STATUS.AGREEMENT_SIGNED;
  }

  if (grantKycDenied) {
    return STATUS.KYC_DENIED;
  }

  if (grantKycCompleted) {
    return STATUS.KYC_COMPLETED;
  }

  if (grantApproved) {
    return STATUS.APPROVED;
  }

  if (grantDenied) {
    return STATUS.DENIED;
  }

  if (grantInterviewCompleted) {
    return STATUS.INTERVIEW_COMPLETED;
  }

  if (grantInterviewScheduled) {
    return STATUS.INTERVIEW_SCHEDULED;
  }

  if (grantEvaluated) {
    return STATUS.EVALUATED;
  }

  if (grantFullySubmitted) {
    return STATUS.FULLY_SUBMITTED;
  }

  if (grantOnlySubmittedOffChain) {
    return STATUS.OFFCHAIN_SUBMITTED;
  }

  return STATUS.EDIT;
};

export { STATUS, useGrantStatus };
