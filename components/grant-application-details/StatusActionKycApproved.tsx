import { Button, Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import StatusActionReload from '@/components/grant-application-details/StatusActionReload';
import useHellosignEmbedded from '@/modules/hellosign-embedded-react/useHellosignEmbedded';

function StatusActionKycApproved({
  helloSignRequestUrl,
  isGrantLoading,
  refetchGrant,
}: {
  helloSignRequestUrl: string | undefined;
  isGrantLoading: boolean;
  refetchGrant: unknown;
}) {
  const { t } = useTranslation('grant');
  const clientId = process.env.NEXT_PUBLIC_HELLO_SIGN_APP_CLIENT_ID;
  const { open, hellosignClient, isLoading, error, setError } = useHellosignEmbedded(helloSignRequestUrl, clientId);

  hellosignClient?.on('sign', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    refetchGrant();
  });

  const reloadAction = () => {
    setError(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    refetchGrant();
  };

  if (error) {
    return <StatusActionReload action={reloadAction} isGrantLoading={isGrantLoading} />;
  }

  const loading = isLoading || isGrantLoading;

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      <Text mb="sm">{t('details.status-actions.kyc-approved.message')}</Text>
      <Button color="violet" onClick={open} loading={loading} disabled={loading}>
        {t('details.status-actions.kyc-approved.button')}
      </Button>
    </Paper>
  );
}

export default StatusActionKycApproved;
