import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import createValidationUtilities from '@/utilities/createValidationUtilities';
import { TextInput, ActionIcon, Button, Title, Group, NumberInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useTranslation } from 'next-i18next';
import { Trash } from 'tabler-icons-react';

function FormEditFieldsMilestones({ form, loading }: { form: UseFormReturnType<any>; loading: boolean }) {
  const { t } = useTranslation('grant');
  const { validateFieldOnBlur, validateFieldOnInput } = createValidationUtilities(form);

  const milestonesFields = form.values.milestones.map((item, index) => (
    <div key={index}>
      <Group mt="md">
        <Title order={3}>
          {t('form.milestoneTitle')} {index + 1}
        </Title>
        <ActionIcon color="red" variant="hover" onClick={() => form.removeListItem('milestones', index)}>
          <Trash size={16} />
        </ActionIcon>
      </Group>
      <NumberInput
        id={`milestones.${index}.budget`}
        required
        sx={{ flex: 1 }}
        {...form.getListInputProps('milestones', index, 'budget')}
        onBlur={validateFieldOnBlur}
        onInput={validateFieldOnInput}
        label={t('form.budget.label')}
        placeholder={t('form.budget.placeholder')}
        variant="filled"
        mt="sm"
      />
      <DatePicker
        id={`milestones.${index}.deliveryDate`}
        required
        sx={{ flex: 1 }}
        {...form.getListInputProps('milestones', index, 'deliveryDate')}
        onBlur={validateFieldOnBlur}
        onInput={validateFieldOnInput}
        label={t('form.deliveryDate.label')}
        placeholder={t('form.deliveryDate.placeholder')}
        variant="filled"
        mt="sm"
      />
      <TextInput
        id={`milestones.${index}.description`}
        required
        sx={{ flex: 1 }}
        {...form.getListInputProps('milestones', index, 'description')}
        onBlur={validateFieldOnBlur}
        onInput={validateFieldOnInput}
        label={t('form.milestoneDescription.label')}
        placeholder={t('form.milestoneDescription.placeholder')}
        variant="filled"
        mt="sm"
        mb="xl"
      />
    </div>
  ));

  const addMilestone = () => {
    form.addListItem('milestones', { budget: null, deliveryDate: null, description: '' });
  };

  return (
    <>
      {milestonesFields}
      <Button color="violet" disabled={loading} onClick={addMilestone} variant="light">
        {t('form.addMilestone')}
      </Button>
    </>
  );
}

export default FormEditFieldsMilestones;
