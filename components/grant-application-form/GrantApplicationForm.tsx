/* eslint-disable max-lines-per-function */
import type GrantApplicationInterface from '@/types/GrantApplicationInterface';
import type { FocusEvent } from 'react';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Textarea, Group } from '@mantine/core';
import { useEffect } from 'react';
import { saveGrantApplicationAsDraft, submitGrantApplication } from '@/services/apiService';
import { useQuery } from 'react-query';
import useAccountSignature from '@/hooks/useAccountSignature';
import useSigner from '@/modules/near-api-react/hooks/useSigner';
import useWallet from '@/modules/near-api-react/hooks/useWallet';

function GrantApplicationForm({ data }: { data: GrantApplicationInterface | undefined | null }) {
  const { t } = useTranslation('grant');

  const apiSignature = useAccountSignature();
  const { signStringMessage } = useSigner();
  const wallet = useWallet();

  const accountId = wallet && wallet.isSignedIn() && wallet.getAccountId();

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

  const grantId = data?.id;
  const grantData = { ...form.values, id: grantId, nearId: accountId };

  const {
    data: savedFormResponse,
    refetch: saveForm,
    isLoading: isSavingLoading,
    isError: isSavingError,
    isSuccess: isSavingSuccess,
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
    },
  );

  const {
    data: submitFormResponse,
    refetch: submitForm,
    isLoading: isSubmitingLoading,
    isError: isSubmitingError,
    isSuccess: isSubmitingSuccess,
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

  const validateFieldOnBlur = (e: FocusEvent) => {
    form.validateField(e.target.id);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateFieldOnInput = (e: any) => {
    if (form.errors[e.target.id]) {
      form.validateField(e.target.id);
    }
  };

  const saveDraft = () => {
    saveForm();
  };

  const submit = () => {
    submitForm();
  };

  const submitApplicationHandler = (e: any) => {
    e.preventDefault();
    form.validate();

    if (Object.keys(form.errors).length === 0) {
      submit();
    }
  };

  const loading = isSavingLoading || isSubmitingLoading;

  return (
    <div>
      <div>
        <h1>{t('form.title')}</h1>
        {/* eslint-disable-next-line react/no-danger */}
        <p dangerouslySetInnerHTML={{ __html: t('form.description') }} />
      </div>
      <form onSubmit={form.onSubmit(() => saveDraft())}>
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
            disabled={loading}
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
            {...form.getInputProps('fundingAmount')}
          />
        </div>
        <Group position="right" mt="xl">
          <Button type="submit" color="violet" variant="light" loading={isSavingLoading}>
            {t('form.save')}
          </Button>
          <Button type="submit" color="violet" onClick={submitApplicationHandler} disabled={loading} loading={isSubmitingLoading}>
            {t('form.submit')}
          </Button>
        </Group>
      </form>
    </div>
  );
}

export default GrantApplicationForm;
