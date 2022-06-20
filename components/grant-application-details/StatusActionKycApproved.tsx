import { Button, Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import useHellosignEmbedded from '@/modules/hellosign-embedded-react/useHellosignEmbedded';

function StatusActionKycApproved({ helloSignRequestUrl }: { helloSignRequestUrl: string | undefined }) {
  const { t } = useTranslation('grant');
  const clientId = process.env.NEXT_PUBLIC_HELLO_SIGN_APP_CLIENT_ID;

  const { open } = useHellosignEmbedded(helloSignRequestUrl, clientId);

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      <Text mb="sm">{t('details.status-actions.kyc-approved.message')}</Text>
      <Button color="violet" onClick={open}>
        {t('details.status-actions.kyc-approved.button')}
      </Button>
    </Paper>
  );
}

export default StatusActionKycApproved;
