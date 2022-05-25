import { TFunction } from 'next-i18next';
import { z } from 'zod';
import { GrantTypes, GrantCategories, ProjectStatus, OpenSourceStates, WorkingTypes } from '@/types/GrantApplicationInterface';

// eslint-disable-next-line max-lines-per-function
const createSchema = (t: TFunction) => {
  return z.object({
    projectName: z.string().min(1, { message: t('form.projectName.error') }),
    grantType: z.nativeEnum(GrantTypes, {
      errorMap: () => {
        return { message: t('form.grantType.error') };
      },
    }),
    grantCategory: z.nativeEnum(GrantCategories, {
      errorMap: () => {
        return { message: t('form.grantCategory.error') };
      },
    }),
    projectUrl: z.string({ required_error: t('form.projectUrl.error') }).url({ message: t('form.projectUrl.error') }),
    githubUrl: z.string({ required_error: t('form.githubUrl.error') }).url({ message: t('form.githubUrl.error') }),
    projectStatus: z.nativeEnum(ProjectStatus, {
      errorMap: () => {
        return { message: t('form.projectStatus.error') };
      },
    }),
    projectLaunchDate: z.date({ required_error: t('form.projectLaunchDate.error'), invalid_type_error: t('form.projectLaunchDate.error') }),
    projectDescription: z
      .string({ required_error: t('form.projectDescription.error') })
      .min(1, { message: t('form.projectDescription.error') })
      .max(100, { message: t('form.projectDescription.error') }),
    fundingAmount: z
      .number({ invalid_type_error: t('form.fundingAmount.error'), required_error: t('form.fundingAmount.error') })
      .min(1, { message: t('form.fundingAmount.error') }),
    // put later the milestones here
    whatAndWhy: z
      .string({ required_error: t('form.whatAndWhy.error') })
      .min(1, { message: t('form.whatAndWhy.error') })
      .max(100, { message: t('form.whatAndWhy.error') }),
    competitionDifference: z
      .string({ required_error: t('form.competitionDifference.error') })
      .min(1, { message: t('form.competitionDifference.error') })
      .max(100, { message: t('form.competitionDifference.error') }),
    openSourceState: z.nativeEnum(OpenSourceStates, {
      errorMap: () => {
        return { message: t('form.openSourceState.error') };
      },
    }),
    opensourceComponentUse: z.string({ required_error: t('form.opensourceComponentUse.error') }).min(1, { message: t('form.opensourceComponentUse.error') }),
    impactOnEcosystem: z
      .string({ required_error: t('form.impactOnEcosystem.error') })
      .min(1, { message: t('form.impactOnEcosystem.error') })
      .max(1000, { message: t('form.impactOnEcosystem.error') }),
    excitementNear: z
      .string({ required_error: t('form.excitementNear.error') })
      .min(1, { message: t('form.excitementNear.error') })
      .max(1000, { message: t('form.excitementNear.error') }),
    successMesurement: z.string({ required_error: t('form.successMesurement.error') }).min(1, { message: t('form.successMesurement.error') }),
    isProjectCurrentlyRaising: z.boolean(),

    firstname: z.string({ required_error: t('form.firstname.error') }).min(1, { message: t('form.firstname.error') }),
    lastname: z.string({ required_error: t('form.lastname.error') }).min(1, { message: t('form.lastname.error') }),
    dateOfBirth: z.date({ required_error: t('form.dateOfBirth.error'), invalid_type_error: t('form.dateOfBirth.error') }),
    email: z.string({ required_error: t('form.email.error') }).email({ message: t('form.email.error') }),
    github: z.union([z.string().url({ message: t('form.github.error') }), z.string().nullable()]),
    twitter: z.union([z.string().url({ message: t('form.twitter.error') }), z.string().nullable()]),
    workingAloneOrTeam: z.nativeEnum(WorkingTypes, {
      errorMap: () => {
        return { message: t('form.workingAloneOrTeam.error') };
      },
    }),
    hasPreviouslyReceivedFundingTokensGrantsFromNear: z.boolean(),

    addressCountry: z.string({ required_error: t('form.addressCountry.error') }).min(1, { message: t('form.addressCountry.error') }),
    addressCity: z.string({ required_error: t('form.addressCity.error') }).min(1, { message: t('form.addressCity.error') }),
    addressStreet: z.string({ required_error: t('form.addressStreet.error') }).min(1, { message: t('form.addressStreet.error') }),
    addressZip: z.string({ required_error: t('form.addressZip.error') }).min(1, { message: t('form.addressZip.error') }),

    howHeardGrants: z.string({ required_error: t('form.howHeardGrants.error') }).min(1, { message: t('form.howHeardGrants.error') }),
    referral: z.string().optional(),
    teamReferral: z.string().optional(), // to update with an enum
    comments: z.union([z.string().max(1000, { message: t('form.comments.error') }), z.string().optional()]),
  });
};

export default createSchema;
