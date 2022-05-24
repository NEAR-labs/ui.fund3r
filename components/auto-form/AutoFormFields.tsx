import type { FocusEvent, FormEvent } from 'react';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';
import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import GenericField from '@/components/auto-form/GenericField';

// eslint-disable-next-line max-lines-per-function
function AutoFormFields({ form, schema, fields, loading }: { form: UseFormReturnType<any>; schema: z.ZodObject<any>; fields: string[]; loading: boolean }) {
  const { t } = useTranslation('grant');

  const validateFieldOnBlur = (e: FocusEvent) => {
    form.validateField(e.target.id);
  };

  const validateFieldOnInput = (e: FormEvent) => {
    const element = e.target as HTMLInputElement;
    const { id } = element;

    if (form.errors[id]) {
      form.validateField(id);
    }
  };

  return (
    <>
      {fields.map((field) => {
        // eslint-disable-next-line no-underscore-dangle
        const zodType = schema.shape[field]._def.typeName;

        return (
          <GenericField
            key={field}
            required
            id={field}
            label={t(`form.${field}.label`)}
            placeholder={t(`form.${field}.placeholder`)}
            mt="sm"
            onBlur={validateFieldOnBlur}
            onInput={validateFieldOnInput}
            disabled={loading}
            variant="filled"
            zodType={zodType}
            {...form.getInputProps(field)}
          />
        );
      })}

      {/* <TextInput
        required
        id="projectName"
        label={t('form.projectName.label')}
        placeholder={t('form.projectName.placeholder')}
        mt="sm"
        onBlur={validateFieldOnBlur}
        onInput={validateFieldOnInput}
        disabled={loading}
        variant="filled"
        {...form.getInputProps('projectName')}
      />
      <Textarea
        required
        id="projectDescription"
        label={t('form.projectDescription.label')}
        placeholder={t('form.projectDescription.placeholder')}
        mt="sm"
        onBlur={validateFieldOnBlur}
        onInput={validateFieldOnInput}
        disabled={loading}
        variant="filled"
        {...form.getInputProps('projectDescription')}
      />
      <NumberInput
        required
        id="fundingAmount"
        label={t('form.fundingAmount.label')}
        placeholder={t('form.fundingAmount.placeholder')}
        mt="sm"
        onBlur={validateFieldOnBlur}
        onInput={validateFieldOnInput}
        disabled={loading}
        rightSection={<span>USD</span>}
        rightSectionWidth={50}
        variant="filled"
        {...form.getInputProps('fundingAmount')}
      /> */}
    </>
  );
}

export default AutoFormFields;
