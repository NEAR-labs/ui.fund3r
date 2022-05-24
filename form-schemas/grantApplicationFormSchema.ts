import { TFunction } from 'next-i18next';
import { z } from 'zod';

const createSchema = (t: TFunction) => {
  return z.object({
    projectName: z.string().min(3, { message: t('form.projectName.error') }),
    projectDescription: z.string().min(10, { message: t('form.projectDescription.error') }),
    fundingAmount: z.number().min(1, { message: t('form.fundingAmount.error') }),
  });
};

export default createSchema;
