import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import { z } from 'zod';

import AutoFormFields from '@/components/auto-form/AutoFormFields';
import budgetCalculator from '@/utilities/budgetCalculator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FormEditFieldsQuestions({ form, schema, loading }: { form: UseFormReturnType<any>; schema: z.ZodObject<any>; loading: boolean }) {
  const totalBudget = budgetCalculator(form.values.fundingAmount, form.values.milestones);

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

  return (
    <>
      <AutoFormFields form={form} schema={schema} fields={fields} loading={loading} translationNamespace="grant" />
      {/* Make conditional rendering here {totalBudget} */}
    </>
  );
}

export default FormEditFieldsQuestions;
