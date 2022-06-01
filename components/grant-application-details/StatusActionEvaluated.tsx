import { PopupButton, useCalendlyEventListener } from 'react-calendly';
import { useQuery } from 'react-query';
import { Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import { submitCalendlyUrl } from '@/services/apiService';

function StatusActionEvaluated({
  id,
  email,
  firstname,
  lastname,
}: {
  id: number | undefined;
  email: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
}) {
  const { t } = useTranslation('grant');

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  useCalendlyEventListener({
    onEventScheduled: (e) => console.log(e.data),
  });

  const prefilledData = {
    email,
    name: `${firstname} ${lastname}`,
  };

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      <Text mb="sm">{t('details.status-actions.evaluated.message')}</Text>
      {typeof window !== 'undefined' && calendlyUrl && (
        <PopupButton url={calendlyUrl} rootElement={document.getElementById('__next') as HTMLElement} text={t('details.status-actions.evaluated.button')} prefill={prefilledData} />
      )}
    </Paper>
  );
}

export default StatusActionEvaluated;
