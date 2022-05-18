import type AttachmentInterface from './AttachmentInterface';

export default interface MilestoneInterface {
  plan: {
    budget: number;
    deliveryDate: Date;
    description: string;
  };
  submission: {
    submissionDate: Date;
    githubUrl: string;
    attachment: AttachmentInterface;
  };
  status: {
    submissionDate: Date;
    reviewDate: Date;
    payoutDate: Date;
  };
  reviewComment: string;
}
