/* eslint-disable max-lines-per-function */
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';
import type SputnikContractInterface from '@/types/SputnikContractInterface';
import type { MouseEvent, FocusEvent, FormEvent } from 'react';
import { useTranslation } from 'next-i18next';
import { useForm, zodResolver, formList } from '@mantine/form';
import { Button, Group, Alert, Title, Text, Divider, TextInput, ActionIcon } from '@mantine/core';
import { useEffect, useState } from 'react';
import { saveGrantApplicationAsDraft, submitGrantApplication } from '@/services/apiService';
import { useQuery } from 'react-query';
import useAccountSignature from '@/hooks/useAccountSignature';
import useSigner from '@/modules/near-api-react/hooks/useSigner';
import useWallet from '@/modules/near-api-react/hooks/useWallet';
import useContract from '@/modules/near-api-react/hooks/useContract';
import { CONTRACT_ID } from '@/constants';
import { createPayoutProposal } from '@/services/sputnikContractService';
import { getNearUsdConvertRate } from '@/services/currencyConverter';
import createSchema from '@/form-schemas/grantApplicationFormSchema';
import { AlertCircle, Trash } from 'tabler-icons-react';
import AutoFormFields from '@/components/auto-form/AutoFormFields';

function GrantApplicationForm({ data, setData }: { data: GrantApplicationInterface | undefined | null; setData: (data: GrantApplicationInterface) => void }) {
  const { t } = useTranslation('grant');

  const apiSignature = useAccountSignature();
  const { signStringMessage } = useSigner();
  const wallet = useWallet();

  const [isNearLoading, setIsNearLoading] = useState(false);

  const contract: SputnikContractInterface | null | undefined = useContract({
    contractId: CONTRACT_ID,
    contractMethods: {
      changeMethods: ['add_proposal'],
      viewMethods: ['get_policy'],
    },
  });

  const accountId = wallet && wallet.isSignedIn() && wallet.getAccountId();

  const schema = createSchema(t);

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      ...data,
      milestones: formList([{ budget: 0, deliveryDate: '', description: 'This is a test' }]),
    },
  });

  const grantId = data?.id;
  const grantData = { ...form.values, id: grantId, nearId: accountId };

  const { data: usdNearConvertRate } = useQuery(['convertUsdToNear'], () => getNearUsdConvertRate(), {
    refetchOnWindowFocus: false,
  });

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
        setIsNearLoading(true);
        if (contract && responseData) {
          await createPayoutProposal(contract, responseData, 0);
        }
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
      };

      form.setValues(mergedValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const saveDraft = () => {
    saveForm();
  };

  const submit = () => {
    submitForm();
  };

  const saveDraftHandler = (e: MouseEvent) => {
    e.preventDefault();
    saveDraft();
  };

  const loading = isSavingLoading || isSubmitingLoading || isNearLoading;
  const lastSavedDate = data?.dateLastDraftSaving;
  const error = isSavingError || isSubmitingError;

  // THIS PART SHOULD MOVE TO MILESTONE FORM
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
    form.addListItem('milestones', { budget: 0, deliveryDate: '', description: 'This is a test' });
  };
  // END MILESTONE

  return (
    <div>
      <div>
        <Title order={1} mt={32} mb={24}>
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
      <form onSubmit={form.onSubmit(() => submit())}>
        <div>
          <Title order={2} mt={48} mb={24}>
            {t('form.applicationProjectDetailTitle')}
          </Title>
          <AutoFormFields
            form={form}
            schema={schema}
            fields={['projectName', 'grantType', 'grantCategory', 'projectUrl', 'githubUrl', 'projectStatus', 'projectLaunchDate', 'projectDescription', 'fundingAmount']}
            loading={loading}
          />
          <Divider mt={32} mb={32} />
          {milestonesFields}
          <Button color="violet" disabled={loading} onClick={addMilestone}>
            {t('form.addMilestone')}
          </Button>
          <Divider mt={32} mb={32} />
          <AutoFormFields
            form={form}
            schema={schema}
            fields={[
              'whatAndWhy',
              'competitionDifference',
              'openSourceState',
              'opensourceComponentUse',
              'impactOnEcosystem',
              'excitementNear',
              'successMesurement',
              'projectRaisingRound',
            ]}
            loading={loading}
          />
          <Title order={2} mt={48} mb={24}>
            {t('form.memmberDetailsTitle')}
          </Title>
          <AutoFormFields
            form={form}
            schema={schema}
            fields={['firstname', 'lastname', 'dateOfBirth', 'email', 'github', 'twitter', 'workingAloneOrTeam', 'hasPreviouslyReceivedFundingTokensGrantsFromNear']}
            loading={loading}
          />
          <Title order={2} mt={48} mb={24}>
            {t('form.addressDetailsTitle')}
          </Title>
          <AutoFormFields form={form} schema={schema} fields={['addressCountry', 'addressCity', 'addressStreet', 'addressZip']} loading={loading} />
          <Divider mt={32} mb={32} />
          <AutoFormFields form={form} schema={schema} fields={['howHeardGrants', 'referral', 'teamReferral', 'comments']} loading={loading} />
          <Divider mt={32} mb={32} />
          <div>1 NEAR = {usdNearConvertRate} USD</div>
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

export default GrantApplicationForm;
