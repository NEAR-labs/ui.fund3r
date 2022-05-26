import { useTranslation } from 'next-i18next';
import { z } from 'zod';
import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import GenericField from '@/components/auto-form/GenericField';
import createValidationUtilities from '@/utilities/createValidationUtilities';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AutoFormFields({ form, schema, fields, loading }: { form: UseFormReturnType<any>; schema: z.ZodObject<any>; fields: string[]; loading: boolean }) {
  const { t } = useTranslation('grant');

  const { validateFieldOnBlur, validateFieldOnInput } = createValidationUtilities(form);

  return (
    <>
      {fields.map((field) => {
        // eslint-disable-next-line no-underscore-dangle
        const zodTypeDef = schema.shape[field]._def;

        return (
          <GenericField
            key={field}
            id={field}
            label={t(`form.${field}.label`)}
            placeholder={t(`form.${field}.placeholder`)}
            mt="sm"
            onBlur={validateFieldOnBlur}
            onInput={validateFieldOnInput}
            disabled={loading}
            variant="filled"
            zodTypeDef={zodTypeDef}
            {...form.getInputProps(field)}
          />
        );
      })}
    </>
  );
}

export default AutoFormFields;
