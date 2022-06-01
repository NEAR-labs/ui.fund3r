import { PopupButton, useCalendlyEventListener } from 'react-calendly';
import { Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

function StatusActionEvaluated() {
  const { t } = useTranslation('grant');

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      <Text mb="sm">{t('details.status-actions.evaluated.message')}</Text>
      {typeof window !== 'undefined' && calendlyUrl && (
        <PopupButton url={calendlyUrl} rootElement={document.getElementById('__next') as HTMLElement} text={t('details.status-actions.evaluated.button')} />
      )}
    </Paper>
  );
}

export default StatusActionEvaluated;
