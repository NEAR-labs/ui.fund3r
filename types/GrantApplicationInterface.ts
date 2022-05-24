import type MilestoneInterface from './MilestoneInterface';

enum GrantTypes {
  Equity = 'equity',
  NonEquity = 'non-equity',
}

enum OpenSourceStates {
  FullyOpenSource = 'fully-open-source',
  PartiallyOpenSource = 'partially-open-source',
  ClosedSource = 'closed-source',
}

enum GrantCategories {
  ChannelBrandPartnership = 'channel-brand-partnership',
  Daos = 'daos',
  GamingMetaverse = 'gaming-metaverse',
  InfrastructureWallets = 'infrastructure-wallets',
  InstitutionalFinancial = 'institutional-financial',
  Nfts = 'nfts',
  SocialImpact = 'social-impact',
  Other = 'other',
}

enum ProjectStatus {
  Mvp = 'mvp',
  PreAlpha = 'pre-alpha',
  Alpha = 'alpha',
  Beta = 'beta',
  Live = 'live',
}

export default interface GrantApplicationInterface {
  id: number | undefined;
  nearId: string;

  // Member related
  firstname?: string;
  lastname?: string;
  dateOfBirth?: Date;
  email?: string;
  github?: string;
  twitter?: string;
  workingAloneOrTeam?: string; // replace with enums
  hasPreviouslyReceivedFundingTokensGrantsFromNear?: boolean;

  // Project related
  projectName?: string;
  grantType?: GrantTypes;
  grantCategory?: GrantCategories;
  projectUrl?: string;
  githubUrl?: string;
  projectStatus?: ProjectStatus;
  projectLaunchDate?: string;
  projectDescription?: string;
  currency?: string; // enum maybe
  fundingAmount?: number;
  nearFundingAmount?: string;
  whatAndWhy?: string;
  competitionDifference?: string;
  openSourceState?: OpenSourceStates;
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
