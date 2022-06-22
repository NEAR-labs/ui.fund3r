import { Button, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import useAccountSignature from '@/hooks/useAccountSignature';
import { downloadFile } from '@/services/helloSignService';

function DetailsAgreements({ grantId }: { grantId: number | undefined }) {
  const { t } = useTranslation('grant');
  const apiSignature = useAccountSignature();

  return (
    <>
      <Title order={3} mb="lg" mt="xl">
        {t('details.agreements.title')}
      </Title>
      <Button variant="light" color="gray" onClick={() => downloadFile(apiSignature, grantId)}>
        {t('details.agreements.filename')}
      </Button>
    </>
  );
}

export default DetailsAgreements;
