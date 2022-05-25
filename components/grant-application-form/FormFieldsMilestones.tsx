import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import createValidationUtilities from '@/utilities/createValidationUtilities';
import { TextInput, ActionIcon, Button } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { Trash } from 'tabler-icons-react';

function FormFieldsMilestones({ form, loading }: { form: UseFormReturnType<any>; loading: boolean }) {
  const { t } = useTranslation('grant');
  const { validateFieldOnBlur, validateFieldOnInput } = createValidationUtilities(form);

  const milestonesFields = form.values.milestones.map((item, index) => (
    <div key={index}>
      <TextInput
        id={`milestones.${index}.budget`}
        required
        sx={{ flex: 1 }}
        {...form.getListInputProps('milestones', index, 'budget')}
        onBlur={validateFieldOnBlur}
        onInput={validateFieldOnInput}
      />
      <TextInput
        id={`milestones.${index}.deliveryDate`}
        required
        sx={{ flex: 1 }}
        {...form.getListInputProps('milestones', index, 'deliveryDate')}
        onBlur={validateFieldOnBlur}
        onInput={validateFieldOnInput}
      />
      <TextInput
        id={`milestones.${index}.description`}
        required
        sx={{ flex: 1 }}
        {...form.getListInputProps('milestones', index, 'description')}
        onBlur={validateFieldOnBlur}
        onInput={validateFieldOnInput}
      />
      <ActionIcon color="red" variant="hover" onClick={() => form.removeListItem('milestones', index)}>
        <Trash size={16} />
      </ActionIcon>
    </div>
  ));

  const addMilestone = () => {
    form.addListItem('milestones', { budget: null, deliveryDate: null, description: '' });
  };

  return (
    <>
      {milestonesFields}
      <Button color="violet" disabled={loading} onClick={addMilestone}>
        {t('form.addMilestone')}
      </Button>
    </>
  );
}

export default FormFieldsMilestones;
