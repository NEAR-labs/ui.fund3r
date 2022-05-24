import type MilestoneInterface from './MilestoneInterface';

export default interface GrantApplicationInterface {
  id: number | undefined;
  nearId: string;

  // Member related
  firstname?: string;
  lastname?: string;
  dateOfBirth?: Date;
  email?: string;
  linkedin?: string;
  twitter?: string;
  hasPreviouslyReceivedFundingTokensGrantsFromNear?: boolean;

  // Project related
  projectName?: string;
  grantType?: string; // enum maybe?
  grantCategory?: string; // enum maybe?
  projectUrl?: string;
  githubUrl?: string;
  project_status?: string;
  projectLaunchDate?: string;
  projectDescription?: string;
  currency?: string; // enum maybe
  fundingAmount?: number;
  nearFundingAmount?: string;
  whatAndWhy?: string;
  competitionDifference?: string;
  isOpenSource?: boolean;
  opensourceComponentUse?: string;
  impactOnEcosystem?: string;
  excitementNear?: string;
  successMesurement?: string;
  isProjectCurrentlyRaising?: boolean;

  // Address
  addressCountry?: string;
  addressCity?: string;
  addressStreet?: string;
  addressZip?: string;

  // About
  howHeardGrants?: string;
  referral?: string;
  teamReferral?: string;
  comments?: string;

  // Status and date
  dateLastDraftSaving?: Date;
  dateSubmission?: Date;
  proposalNearTransactionHash?: string;
  isNearProposalValid?: boolean;
  dateEvaluation?: Date;
  dateInterviewSchedule?: Date;
  dateInterview?: Date;
  dateInterviewCompletionConfirmation?: Date;
  dateDenial?: Date;
  dateApproval?: Date;
  dateKycCompletion?: Date;
  dateAgreementSignature?: Date;
  dateInvoiceSent?: Date;
  dateOnboardingCompletion?: Date;

  // Links
  interviewUrl?: string;
  kycUrl?: string;
  agreementUrl?: string;
  invoiceUrl?: string;

  // reviews
  reviewProject?: string;
  reviewMemberDetail?: string;
  reviewAttachments?: string;

  milestones?: [MilestoneInterface];
  created_at?: Date;
  updated_at?: Date;
}
