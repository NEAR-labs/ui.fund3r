import { STATUS, useGrantStatus } from '@/hooks/useGrantStatus';
import { Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

function DetailsStatusActions() {
  const { t } = useTranslation('grant');
  const status = useGrantStatus();

  const { FULLY_SUBMITTED } = STATUS;

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
