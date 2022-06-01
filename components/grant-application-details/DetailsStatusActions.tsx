import { Button, Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import { STATUS, useGrantStatus } from '@/hooks/useGrantStatus';

// eslint-disable-next-line max-lines-per-function
function DetailsStatusActions() {
  const { t } = useTranslation('grant');
  const { status } = useGrantStatus();

  const { FULLY_SUBMITTED, EVALUATED, INTERVIEW_SCHEDULED, INTERVIEW_COMPLETED, DENIED, APPROVED, KYC_COMPLETED, KYC_DENIED } = STATUS;

  if (status === KYC_DENIED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text mb="sm">{t('details.status-actions.kyc-denied.message')}</Text>
        <Button color="violet">{t('details.status-actions.kyc-denied.button')}</Button>
      </Paper>
    );
  }

  if (status === KYC_COMPLETED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text mb="sm">{t('details.status-actions.kyc-completed.title')}</Text>
        <Text>{t('details.status-actions.kyc-completed.description')}</Text>
      </Paper>
    );
  }

  if (status === APPROVED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text mb="sm">{t('details.status-actions.approved.message')}</Text>
        <Button color="violet">{t('details.status-actions.approved.button')}</Button>
      </Paper>
    );
  }

  if (status === DENIED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text mb="sm">{t('details.status-actions.denied.message')}</Text>
      </Paper>
    );
  }

  if (status === INTERVIEW_COMPLETED) {
    return (
      <>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.status-actions.interview-completed.title')}</Text>
        </Paper>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.status-actions.interview-completed.message')}</Text>
        </Paper>
      </>
    );
  }

  if (status === INTERVIEW_SCHEDULED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text mb="sm">{t('details.status-actions.interview-scheduled.title')}</Text>
      </Paper>
    );
  }

  if (status === EVALUATED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text mb="sm">{t('details.status-actions.evaluated.message')}</Text>
        <Button color="violet">{t('details.status-actions.evaluated.button')}</Button>
      </Paper>
    );
  }

  if (status === FULLY_SUBMITTED) {
    return (
      <>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.status-actions.submitted.message')}</Text>
        </Paper>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.status-actions.submitted.description')}</Text>
        </Paper>
      </>
    );
  }
  return null;
}

export default DetailsStatusActions;
