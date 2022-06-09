import { Button, Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

function StatusActionProjectApproved() {
  const { t } = useTranslation('grant');

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      <Text mb="sm">{t('details.status-actions.approved.message')}</Text>
      <Button color="violet">{t('details.status-actions.approved.button')}</Button>
    </Paper>
  );
}

export default StatusActionProjectApproved;
