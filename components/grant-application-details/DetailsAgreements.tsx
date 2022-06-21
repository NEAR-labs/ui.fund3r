import { Button, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import { getFileDownloadUrl } from '@/services/helloSignService';

function DetailsAgreements({ helloSignSignatureRequestId }: { helloSignSignatureRequestId: string }) {
  const { t } = useTranslation('grant');

  const fileDownloadUrl = getFileDownloadUrl(helloSignSignatureRequestId) || '';

  return (
    <>
      <Title order={3} mb="lg" mt="xl">
        {t('details.agreements.title')}
      </Title>
      <Button variant="light" color="gray" component="a" target="_blank" href={fileDownloadUrl}>
        {t('details.agreements.filename')}
      </Button>
    </>
  );
}

export default DetailsAgreements;
