// import type AttachmentInterface from './AttachmentInterface';

export default interface MilestoneInterface {
  // plan
  budget?: number;
  deliveryDate?: Date;
  description?: string;

  // submission
  githubUrl?: string;
  attachment?: string; // to replace with AttachmentInterface;
  comments?: string;

  // status
  reviewMilestone?: string | null;
  dateSubmission?: Date | null;
  dateSubmissionOnChain?: Date | null;
  dateRejection?: Date | null;
  dateValidation?: Date | null;

  // computed
  status?: string | null;
  step?: number | null;
  pendingStep?: number | null;
}
