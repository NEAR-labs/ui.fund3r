/* eslint-disable max-lines-per-function */
import type { MouseEvent, SyntheticEvent } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Alert, Button, Divider, Group, Text, Title } from '@mantine/core';
import { formList, useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useTranslation } from 'next-i18next';
import { AlertCircle } from 'tabler-icons-react';

import FormEditFieldsAddress from '@/components/grant-application-form/FormEditFieldsAddress';
import FormEditFieldsMembers from '@/components/grant-application-form/FormEditFieldsMembers';
import FormEditFieldsMilestones from '@/components/grant-application-form/FormEditFieldsMilestones';
import FormEditFieldsNear from '@/components/grant-application-form/FormEditFieldsNear';
import FormEditFieldsProject from '@/components/grant-application-form/FormEditFieldsProject';
import FormEditFieldsQuestions from '@/components/grant-application-form/FormEditFieldsQuestions';
import createSchema from '@/form-schemas/grantApplicationFormSchema';
import useAccountSignature from '@/hooks/useAccountSignature';
import useDaoContract from '@/hooks/useDaoContract';
import useSigner from '@/modules/near-api-react/hooks/useSigner';
import useWallet from '@/modules/near-api-react/hooks/useWallet';
import { saveGrantApplicationAsDraft, submitGrantApplication } from '@/services/apiService';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';
import parseMilestonesDates from '@/utilities/parseMilestonesDates';

function FormEdit({ data, setData }: { data: GrantApplicationInterface | undefined | null; setData: (data: GrantApplicationInterface) => void }) {
  const { t } = useTranslation('grant');

  const apiSignature = useAccountSignature();
  const { signStringMessage } = useSigner();
  const wallet = useWallet();
  const { isNearLoading, submitProposal } = useDaoContract();

  const accountId = wallet && wallet.isSignedIn() && wallet.getAccountId();

  const schema = createSchema(t);

  // The following is required to avoid warnings
  const defaultData = {
    projectName: '',
    projectUrl: '',
    githubUrl: '',
    projectDescription: '',
    whatAndWhy: '',
    competitionDifference: '',
    opensourceComponentUse: '',
    impactOnEcosystem: '',
    excitementNear: '',
    successMesurement: '',
    firstname: '',
    lastname: '',
    email: '',
    github: '',
    twitter: '',
    hasPreviouslyReceivedFundingTokensGrantsFromNear: false,
    addressCountry: '',
    addressCity: '',
    addressStreet: '',
    addressZip: '',
    howHeardGrants: '',
    referral: '',
    teamReferral: '',
    comments: '',
  };

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      ...defaultData,
      ...data,
      milestones: formList<{ budget?: number | null; deliveryDate?: Date | null; description?: string | null }>([]),
    },
  });

  const grantId = data?.id;
  const grantData = { ...form.values, id: grantId, nearId: accountId };

  const {
    refetch: saveForm,
    isLoading: isSavingLoading,
    isError: isSavingError,
  } = useQuery(
    ['saveForm', apiSignature, grantId, grantData, signStringMessage],
    () =>
      saveGrantApplicationAsDraft(apiSignature, {
        grantId,
        grantData,
        signStringMessage,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (responseData) => {
        setData({
          ...grantData,
          ...responseData,
          projectLaunchDate: responseData?.projectLaunchDate ? new Date(responseData.projectLaunchDate) : undefined,
          dateOfBirth: responseData?.dateOfBirth ? new Date(responseData.dateOfBirth) : undefined,
          milestones: formList(responseData?.milestones ? parseMilestonesDates(responseData.milestones) : []),
        });
      },
    },
  );

  const {
    refetch: submitForm,
    isLoading: isSubmitingLoading,
    isError: isSubmitingError,
  } = useQuery(
    ['submitForm', apiSignature, grantId, grantData, signStringMessage],
    () =>
      submitGrantApplication(apiSignature, {
        grantId,
        grantData,
        signStringMessage,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: false,
      onSuccess: async (responseData) => {
        submitProposal(responseData, 0);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        form.setErrors(error?.response?.data?.errors);
      },
    },
  );

  useEffect(() => {
    if (data) {
      const mergedValues = {
        ...form.values,
        ...data,
        projectLaunchDate: data?.projectLaunchDate ? new Date(data.projectLaunchDate) : undefined,
        dateOfBirth: data?.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        milestones: formList<{ budget?: number | null; deliveryDate?: Date | null; description?: string | null }>(data?.milestones ? parseMilestonesDates(data.milestones) : []),
      };

      form.setValues(mergedValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const saveDraft = () => {
    saveForm();
  };

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    const validation = form.validate();

    if (validation.hasErrors) {
      showNotification({
        color: 'red',
        message: t('error.form.message'),
      });

      return;
    }

    submitForm();
  };

  const saveDraftHandler = (e: MouseEvent) => {
    e.preventDefault();
    saveDraft();
  };

  const loading = isSavingLoading || isSubmitingLoading || isNearLoading;
  const lastSavedDate = data?.dateLastDraftSaving;
  const error = isSavingError || isSubmitingError;

  return (
    <div>
      <div>
        <Title order={1} mb={24}>
          {t('form.title')}
        </Title>
        {/* eslint-disable-next-line react/no-danger */}
        <p dangerouslySetInnerHTML={{ __html: t('form.description') }} />
      </div>
      {error && (
        <Alert icon={<AlertCircle size={16} />} title={t('error.generic.title')} color="orange" mt={16}>
          {t('error.generic.description')}
        </Alert>
      )}
      <form onSubmit={submit}>
        <div>
          <FormEditFieldsProject form={form} schema={schema} loading={loading} />
          <Divider mt={32} mb={32} />
          <FormEditFieldsMilestones form={form} loading={loading} />
          <Divider mt={32} mb={32} />
          <FormEditFieldsQuestions form={form} schema={schema} loading={loading} />
          <FormEditFieldsMembers form={form} schema={schema} loading={loading} />
          <FormEditFieldsAddress form={form} schema={schema} loading={loading} />
          <Divider mt={32} mb={32} />
          <FormEditFieldsNear form={form} schema={schema} loading={loading} />
          <Divider mt={32} mb={32} />
        </div>
        <Text>{lastSavedDate && t('form.draft_date') + lastSavedDate.toLocaleString()}</Text>
        <Group position="right" mt="xl">
          <Button color="violet" onClick={saveDraftHandler} variant="light" loading={isSavingLoading}>
            {t('form.save')}
          </Button>
          <Button type="submit" color="violet" disabled={loading} loading={isSubmitingLoading || isNearLoading}>
            {t('form.submit')}
          </Button>
        </Group>
      </form>
    </div>
  );
}

export default FormEdit;
