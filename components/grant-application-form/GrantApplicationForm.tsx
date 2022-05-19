/* eslint-disable max-lines-per-function */
import type GrantApplicationInterface from '@/types/GrantApplicationInterface';
import type { FocusEvent, FormEvent } from 'react';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Textarea, Group } from '@mantine/core';
import { useEffect } from 'react';

function GrantApplicationForm({ data }: { data: GrantApplicationInterface | undefined | null }) {
  const { t } = useTranslation('grant');

  const schema = z.object({
    projectName: z.string().min(3, { message: t('form.projectName.error') }),
    projectDescription: z.string().min(10, { message: t('form.projectDescription.error') }),
    fundingAmount: z.number().min(1, { message: t('form.fundingAmount.error') }),
  });

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      projectName: '',
      projectDescription: '',
      fundingAmount: 0,
      ...data,
    },
  });

  useEffect(() => {
    if (data) {
      const mergedValues = {
        ...form.values,
        ...data,
      };

      form.setValues(mergedValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const validateFieldOnBlur = (e: FocusEvent) => {
    form.validateField(e.target.id);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateFieldOnInput = (e: any) => {
    if (form.errors[e.target.id]) {
      form.validateField(e.target.id);
    }
  };

  return (
    <div>
      <div>
        <h1>{t('form.title')}</h1>
        {/* eslint-disable-next-line react/no-danger */}
        <p dangerouslySetInnerHTML={{ __html: t('form.description') }} />
      </div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <div>
          <h2>{t('form.applicationProjectDetailTitle')}</h2>
          <TextInput
            required
            id="projectName"
            label={t('form.projectName.label')}
            placeholder={t('form.projectName.placeholder')}
            mt="sm"
            onBlur={validateFieldOnBlur}
            onInput={validateFieldOnInput}
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
            {...form.getInputProps('fundingAmount')}
          />
        </div>
        <Group position="right" mt="xl">
          <Button type="submit" color="violet" variant="light">
            {t('form.save')}
          </Button>
          <Button type="submit" color="violet">
            {t('form.submit')}
          </Button>
        </Group>
      </form>
    </div>
  );
}

export default GrantApplicationForm;
