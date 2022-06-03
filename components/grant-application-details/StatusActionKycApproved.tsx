import { Button, Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import { getSignatureUrl } from '@/services/helloSignService';

function StatusActionKycApproved({ helloSignRequestId }: { helloSignRequestId: string | undefined }) {
  const { t } = useTranslation('grant');

  const signatureUrl = getSignatureUrl(helloSignRequestId);

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      <Text mb="sm">{t('details.status-actions.kyc-approved.message')}</Text>
      <Button color="violet" component="a" href={signatureUrl || '#'}>
        {t('details.status-actions.kyc-approved.button')}
      </Button>
    </Paper>
  );
}

export default StatusActionKycApproved;
