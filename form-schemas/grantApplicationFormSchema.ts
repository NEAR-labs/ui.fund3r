import { TFunction } from 'next-i18next';
import { z } from 'zod';

const createSchema = (t: TFunction) => {
  return z.object({
    projectName: z.string().min(3, { message: t('form.projectName.error') }),
    grantType: z.enum(['equity', 'non-equity']),
    grantCategory: z.enum(['technology', 'health', 'education', 'social', 'other']),
    projectUrl: z.string().url({ message: t('form.projectUrl.error') }),
    githubUrl: z.string().url({ message: t('form.githubUrl.error') }),
    projectStatus: z.enum(['pre-alpha', 'alpha', 'beta', 'live']),
    projectLaunchDate: z.date({ required_error: t('form.projectLaunchDate.error') }),
    projectDescription: z.string().min(10, { message: t('form.projectDescription.error') }),
    fundingAmount: z.number().min(1, { message: t('form.fundingAmount.error') }),
    // put later the milestones here
    whatAndWhy: z.string().min(10, { message: t('form.whatAndWhy.error') }),
    competitionDifference: z.string().min(10, { message: t('form.competitionDifference.error') }),
    isOpenSource: z.boolean(),
    opensourceComponentUse: z.string().min(10, { message: t('form.opensourceComponentUse.error') }),
    impactOnEcosystem: z.string().min(10, { message: t('form.impactOnEcosystem.error') }),
    excitementNear: z.string().min(10, { message: t('form.excitementNear.error') }),
    successMesurement: z.string().min(10, { message: t('form.successMesurement.error') }),
    isProjectCurrentlyRaising: z.boolean(),

    firstname: z.string().min(3, { message: t('form.firstname.error') }),
    lastname: z.string().min(3, { message: t('form.lastname.error') }),
    dateOfBirth: z.date({ required_error: t('form.dateOfBirth.error') }),
    email: z.string().email({ message: t('form.email.error') }),
    linkedin: z.string().url({ message: t('form.linkedin.error') }),
    twitter: z.string().url({ message: t('form.twitter.error') }),
    workingAloneOrTeam: z.enum(['working-alone', 'working-with-team']),
    hasPreviouslyReceivedFundingTokensGrantsFromNear: z.boolean(),

    addressCountry: z.string().min(3, { message: t('form.addressCountry.error') }),
    addressCity: z.string().min(3, { message: t('form.addressCity.error') }),
    addressStreet: z.string().min(3, { message: t('form.addressStreet.error') }),
    addressZip: z.string().min(3, { message: t('form.addressZip.error') }),

    howHeardGrants: z.string().min(3, { message: t('form.howHeardGrants.error') }),
    referral: z.string().min(3, { message: t('form.referral.error') }),
    teamReferral: z.string().min(3, { message: t('form.teamReferral.error') }),
    comments: z.string().min(3, { message: t('form.comments.error') }),
  });
};

export default createSchema;
