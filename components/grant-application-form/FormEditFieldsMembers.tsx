import { Title } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

import AutoFormFields from '@/components/auto-form/AutoFormFields';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FormEditFieldsMembers({ form, schema, loading }: { form: UseFormReturnType<any>; schema: z.ZodObject<any>; loading: boolean }) {
  const { t } = useTranslation('grant');

  const fields = ['firstname', 'lastname', 'dateOfBirth', 'email', 'github', 'twitter', 'workingAloneOrTeam', 'hasPreviouslyReceivedFundingTokensGrantsFromNear'];

  return (
    <>
      <Title order={2} mt={48} mb={24}>
        {t('form.memmberDetailsTitle')}
      </Title>
      <AutoFormFields form={form} schema={schema} fields={fields} loading={loading} translationNamespace="grant" />
      {form.values.hasPreviouslyReceivedFundingTokensGrantsFromNear && (
        <AutoFormFields form={form} schema={schema} fields={['aboutTokensReceivedFromNear']} loading={loading} translationNamespace="grant" />
      )}
    </>
  );
}

export default FormEditFieldsMembers;
