const getFileDownloadUrl = (helloSignSignatureRequestId: string | undefined) => {
  if (!helloSignSignatureRequestId) {
    return null;
  }

  return `https://app.hellosign.com/home/manage?guid=${helloSignSignatureRequestId}`;
};

// eslint-disable-next-line import/prefer-default-export
export { getFileDownloadUrl };
