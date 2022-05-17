export default interface GrantApplicationInterface {
  account: {
    near_id: string;
    firstname: string;
    lastname: string;
    dateOfBirth: Date;
    email: string;
    linkedin: string;
    twitter: string;
    hasPreviouslyReceivedFundingTokensGrantsFromNear: boolean;
  };
  applicationProjectDetail: {
    projectName: string;
    grantType: string; // enum maybe?
    grantCategory: string; // enum maybe?
    projectUrl: string;
    githubUrl: string;
    project_status: string;
    projectLaunchDate: string;
    projectDescription: string;
    currency: string; // enum maybe
    fundingAmount: number;
    whatAndWhy: string;
    competitionDifference: string;
    isOpenSource: boolean;
    opensourceComponentUse: string;
    impactOnEcosystem: string;
    excitementNear: string;
    successMesurement: string;
    isProjectCurrentlyRaising: boolean;
  };
  address: {
    country: string;
    city: string;
    street: string;
    zip: string;
  };
  about: {
    howHeardGrants: string;
    referral: string;
    teamReferral: string;
    comments: string;
  };
  status: {
    isDraft: boolean;
    submissionDate: Date;
    evaluationDate: Date;
    interviewScheduleDate: Date;
    interviewDate: Date;
    interviewCompletionConfirmationDate: Date;
    denialDate: Date;
    approvalDate: Date;
    kycCompletionDate: Date;
    agreementSignatureDate: Date;
    invoiceSentDate: Date;
    onboardingCompletionDate: Date;
  };
  urls: {
    interviewUrl: string;
    kycUrl: string;
    agreementUrl: string;
    invoiceUrl: string;
  };
  reviewComment: {
    project: string;
    memberDetail: string;
    attachments: string;
  };
}
