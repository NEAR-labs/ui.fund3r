import type MilestoneInterface from './MilestoneInterface';

export enum GrantTypes {
  Equity = 'equity',
  NonEquity = 'non-equity',
}

export enum GrantCategories {
  ChannelBrandPartnership = 'channel-brand-partnership',
  Daos = 'daos',
  GamingMetaverse = 'gaming-metaverse',
  InfrastructureWallets = 'infrastructure-wallets',
  InstitutionalFinancial = 'institutional-financial',
  Nfts = 'nfts',
  SocialImpact = 'social-impact',
  Other = 'other',
}

export enum ProjectStatus {
  Mvp = 'mvp',
  PreAlpha = 'pre-alpha',
  Alpha = 'alpha',
  Beta = 'beta',
  Live = 'live',
}

export enum OpenSourceStates {
  FullyOpenSource = 'fully-open-source',
  PartiallyOpenSource = 'partially-open-source',
  ClosedSource = 'closed-source',
}

export enum WorkingTypes {
  WorkingAlone = 'working-alone',
  WorkingWithTeam = 'working-with-team',
}

export enum RaisingRoundStatus {
  Raising = 'raising',
  NotRaising = 'not-raising',
}

export interface GrantApplicationInterface {
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
  currency?: string;
  fundingAmount?: number;
  nearFundingAmount?: string;
  whatAndWhy?: string;
  competitionDifference?: string;
  openSourceState?: OpenSourceStates;
  opensourceComponentUse?: string;
  impactOnEcosystem?: string;
  excitementNear?: string;
  successMesurement?: string;
  projectRaisingRound?: RaisingRoundStatus;

  // Address
  addressCountry?: string;
  addressCity?: string;
  addressStreet?: string;
  addressZip?: string;

  // About
  howHeardGrants?: string;
  referral?: string;
  teamReferral?: string; // update with enum eventually
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
