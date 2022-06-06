import type { SyntheticEvent } from 'react';
import { useQuery } from 'react-query';
import { Button, Group, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslation } from 'next-i18next';

import AutoFormFields from '@/components/auto-form/AutoFormFields';
import createSchema from '@/form-schemas/milestoneSubmissionFormSchema';
import useAccountSignature from '@/hooks/useAccountSignature';
import useDaoContract from '@/hooks/useDaoContract';
import useSigner from '@/modules/near-api-react/hooks/useSigner';
import { submitMilestoneData } from '@/services/apiService';

function MilestoneForm({ grantId, milestoneId }: { grantId: number; milestoneId: number }) {
  const { t } = useTranslation('milestone');
  const apiSignature = useAccountSignature();
  const { signObjectMessage } = useSigner();
  const { isNearLoading, submitProposal } = useDaoContract();

  const schema = createSchema(t);

  // The following is required to avoid warnings
  const defaultData = {
    attachment: '',
    githubUrl: '',
    comments: '',
  };

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      ...defaultData,
    },
  });

  const milestoneNumber = milestoneId + 1;

  const {
    refetch: submitForm,
    isLoading: isSubmitingLoading,
    // isError: isSubmitingError,
  } = useQuery(
    ['submitMilestoneData', apiSignature, grantId, milestoneId, form.values, signObjectMessage],
    () =>
      submitMilestoneData(apiSignature, {
        grantId,
        milestoneId,
        milestoneData: form.values,
        signObjectMessage,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: false,
      onSuccess: async (responseData) => {
        submitProposal(responseData, milestoneNumber);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        form.setErrors(error?.response?.data?.errors);
      },
    },
  );

  const loading = isSubmitingLoading || isNearLoading;
  // const error = isSubmitingError;

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <div>
      <Title>{t('form.title', { number: milestoneNumber })}</Title>
      <form onSubmit={submit}>
        <AutoFormFields form={form} schema={schema} fields={['attachment', 'githubUrl', 'comments']} loading={loading} translationNamespace="milestone" />
        <Group position="right" mt="xl">
          <Button type="submit" color="violet" disabled={loading} loading={isSubmitingLoading || isNearLoading}>
            {t('form.submit')}
          </Button>
        </Group>
      </form>
    </div>
  );
}

export default MilestoneForm;
