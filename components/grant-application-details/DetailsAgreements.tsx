import { Button, Title } from '@mantine/core';
import axios from 'axios';
import { useTranslation } from 'next-i18next';

import useAccountSignature from '@/hooks/useAccountSignature';

// import { getFileDownloadUrl } from '@/services/helloSignService';

function DetailsAgreements({ grantId }: { grantId: number | undefined }) {
  const { t } = useTranslation('grant');

  const API_HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const apiSignature = useAccountSignature();

  const downloadFile = () => {
    if (!apiSignature) {
      return;
    }

    axios({
      url: `${API_HOST}/api/v1/grants/${grantId}/agreement`,
      method: 'GET',
      responseType: 'blob',
      headers: {
        'X-NEAR-ACCOUNT-ID': apiSignature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(apiSignature.signature),
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'agreement.zip');
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <>
      <Title order={3} mb="lg" mt="xl">
        {t('details.agreements.title')}
      </Title>
      <Button variant="light" color="gray" onClick={downloadFile}>
        {t('details.agreements.filename')}
      </Button>
    </>
  );
}

export default DetailsAgreements;
