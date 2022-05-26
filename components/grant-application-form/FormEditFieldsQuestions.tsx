import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import { z } from 'zod';

import AutoFormFields from '@/components/auto-form/AutoFormFields';

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

  return <AutoFormFields form={form} schema={schema} fields={fields} loading={loading} />;
}

export default FormEditFieldsQuestions;
