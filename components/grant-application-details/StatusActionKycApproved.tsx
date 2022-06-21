import { Button, Paper, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import StatusActionReload from '@/components/grant-application-details/StatusActionReload';
import useHellosignEmbedded from '@/modules/hellosign-embedded-react/useHellosignEmbedded';

function StatusActionKycApproved({ helloSignRequestUrl }: { helloSignRequestUrl: string | undefined }) {
  const { t } = useTranslation('grant');
  const clientId = process.env.NEXT_PUBLIC_HELLO_SIGN_APP_CLIENT_ID;
  const router = useRouter();
  const { open, hellosignClient, isLoading, error, setError } = useHellosignEmbedded(helloSignRequestUrl, clientId);
  const { grantRequestSlug } = router.query;

  hellosignClient?.on('sign', () => {
    router.push(`/grants/${grantRequestSlug}`);
  });

  if (error) {
    return <StatusActionReload action={() => setError(null)} />;
  }

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      <Text mb="sm">{t('details.status-actions.kyc-approved.message')}</Text>
      <Button color="violet" onClick={open} loading={isLoading} disabled={isLoading}>
        {t('details.status-actions.kyc-approved.button')}
      </Button>
    </Paper>
  );
}

export default StatusActionKycApproved;
