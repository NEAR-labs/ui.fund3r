import { TFunction } from 'next-i18next';
import { z } from 'zod';

// eslint-disable-next-line max-lines-per-function
const createSchema = (t: TFunction) => {
  return z.object({
    projectName: z.string().min(1, { message: t('form.projectName.error') }),
    grantType: z.enum(['equity', 'non-equity']),
    grantCategory: z.enum(['channel-brand-partnership', 'daos', 'gaming-metaverse', 'infrastructure-wallets', 'institutional-financial', 'nfts', 'social-impact', 'other']),
    projectUrl: z.string().url({ message: t('form.projectUrl.error') }),
    githubUrl: z.string().url({ message: t('form.githubUrl.error') }),
    projectStatus: z.enum(['mvp', 'pre-alpha', 'alpha', 'beta', 'live']),
    projectLaunchDate: z.date({ required_error: t('form.projectLaunchDate.error') }),
    projectDescription: z
      .string()
      .min(1, { message: t('form.projectDescription.error') })
      .max(100, { message: t('form.projectDescription.error') }),
    fundingAmount: z.number().min(1, { message: t('form.fundingAmount.error') }),
    // put later the milestones here
    whatAndWhy: z
      .string()
      .min(1, { message: t('form.whatAndWhy.error') })
      .max(100, { message: t('form.whatAndWhy.error') }),
    competitionDifference: z
      .string()
      .min(1, { message: t('form.competitionDifference.error') })
      .max(100, { message: t('form.competitionDifference.error') }),
    openSourceState: z.enum(['fully-open-source', 'partially-open-source', 'closed-source']),
    opensourceComponentUse: z.string().min(1, { message: t('form.opensourceComponentUse.error') }),
    impactOnEcosystem: z.string().min(1, { message: t('form.impactOnEcosystem.error') }),
    excitementNear: z.string().min(1, { message: t('form.excitementNear.error') }),
    successMesurement: z.string().min(1, { message: t('form.successMesurement.error') }),
    isProjectCurrentlyRaising: z.boolean(),

    firstname: z.string().min(1, { message: t('form.firstname.error') }),
    lastname: z.string().min(1, { message: t('form.lastname.error') }),
    dateOfBirth: z.date({ required_error: t('form.dateOfBirth.error') }),
    email: z.string().email({ message: t('form.email.error') }),
    github: z.union([z.string().url({ message: t('form.github.error') }), z.string().optional()]),
    twitter: z.union([z.string().url({ message: t('form.twitter.error') }), z.string().optional()]),
    workingAloneOrTeam: z.enum(['working-alone', 'working-with-team']),
    hasPreviouslyReceivedFundingTokensGrantsFromNear: z.boolean(),

    addressCountry: z.string().min(1, { message: t('form.addressCountry.error') }),
    addressCity: z.string().min(1, { message: t('form.addressCity.error') }),
    addressStreet: z.string().min(1, { message: t('form.addressStreet.error') }),
    addressZip: z.string().min(1, { message: t('form.addressZip.error') }),

    howHeardGrants: z.string().min(1, { message: t('form.howHeardGrants.error') }),
    referral: z.string().optional(),
    teamReferral: z.string().optional(), // to update with an enum
    comments: z.union([z.string().max(1000, { message: t('form.comments.error') }), z.string().optional()]),
  });
};

export default createSchema;
