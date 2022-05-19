/* eslint-disable max-lines-per-function */
import type GrantApplicationInterface from '@/types/GrantApplicationInterface';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Textarea, Group } from '@mantine/core';

function GrantApplicationForm({ data }: { data: GrantApplicationInterface | undefined | null }) {
  const { t } = useTranslation('grant');

  const schema = z.object({
    projectName: z.string().min(2, { message: t('form.applicationProjectDetail.projectName.error') }),
    projectDescription: z.string().min(2, { message: t('form.applicationProjectDetail.projectDescription.error') }),
    fundingAmount: z.number().min(1, { message: t('form.applicationProjectDetail.fundingAmount.error') }),
  });

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      projectName: '',
      projectDescription: '',
      fundingAmount: 0,
    },
  });

  return (
    <div>
      <div>
        <h1>{t('form.title')}</h1>
        <p>{t('form.description')}</p>
      </div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <div>
          <h2>{t('form.applicationProjectDetail.title')}</h2>
          <TextInput
            required
            label={t('form.applicationProjectDetail.projectName.label')}
            placeholder={t('form.applicationProjectDetail.projectName.placeholder')}
            mt="sm"
            {...form.getInputProps('projectName')}
          />
          <Textarea
            required
            label={t('form.applicationProjectDetail.projectDescription.label')}
            placeholder={t('form.applicationProjectDetail.projectDescription.placeholder')}
            mt="sm"
            {...form.getInputProps('projectDescription')}
          />
          <NumberInput
            required
            label={t('form.applicationProjectDetail.fundingAmount.label')}
            placeholder={t('form.applicationProjectDetail.fundingAmount.placeholder')}
            mt="sm"
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
