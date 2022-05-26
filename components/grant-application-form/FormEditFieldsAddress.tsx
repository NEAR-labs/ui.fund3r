import { Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import AutoFormFields from '@/components/auto-form/AutoFormFields';
import { z } from 'zod';
import type { UseFormReturnType } from '@mantine/form/lib/use-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FormEditFieldsAddress({ form, schema, loading }: { form: UseFormReturnType<any>; schema: z.ZodObject<any>; loading: boolean }) {
  const { t } = useTranslation('grant');

  const fields = ['addressCountry', 'addressCity', 'addressStreet', 'addressZip'];

  return (
    <>
      <Title order={2} mt={48} mb={24}>
        {t('form.addressDetailsTitle')}
      </Title>
      <AutoFormFields form={form} schema={schema} fields={fields} loading={loading} />
    </>
  );
}

export default FormEditFieldsAddress;
