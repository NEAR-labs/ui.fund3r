import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import { z } from 'zod';

import AutoFormFields from '@/components/auto-form/AutoFormFields';
import VIDEO_REQUIRED_USD_GRANT_TRESHOLD from '@/config/grants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FormEditFieldsQuestions({ form, schema, loading }: { form: UseFormReturnType<any>; schema: z.ZodObject<any>; loading: boolean }) {
  const fields = [
    'whatAndWhy',
    'competitionDifference',
    'openSourceState',
    'opensourceComponentUse',
    'impactOnEcosystem',
    'excitementNear',
    'successMesurement',
    'projectRaisingRound',
  ];

  // to replace by an utility function
  const { fundingAmount, milestones } = form.values;

  const initialBudget = fundingAmount || 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalMilestones = milestones?.reduce((acc: any, milestone: any) => acc + (milestone.budget || 0), 0);
  const totalFundingAmount = (totalMilestones || 0) + initialBudget;

  return (
    <>
      <AutoFormFields form={form} schema={schema} fields={fields} loading={loading} translationNamespace="grant" />
      {totalFundingAmount >= VIDEO_REQUIRED_USD_GRANT_TRESHOLD && (
        <AutoFormFields form={form} schema={schema} fields={['attachment']} loading={loading} translationNamespace="grant" />
      )}
    </>
  );
}

export default FormEditFieldsQuestions;
