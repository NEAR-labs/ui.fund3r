import axios from 'axios';
import type NearApiSignatureInterface from 'types/NearApiSignatureInterface';

const API_HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

const downloadFile = (apiSignature: NearApiSignatureInterface | undefined, grantId: number | undefined) => {
  if (!apiSignature || !grantId) {
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

// eslint-disable-next-line import/prefer-default-export
export { downloadFile };
