import type { FocusEvent, FormEvent } from 'react';
import { NumberInput, TextInput, Textarea } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { UseFormReturnType } from '../../node_modules/@mantine/form/lib/use-form';

// eslint-disable-next-line max-lines-per-function
function AutoFormFields({ form, loading }: { form: UseFormReturnType<any>; loading: boolean }) {
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
      <TextInput
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
      />
    </>
  );
}

export default AutoFormFields;
