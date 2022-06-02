const getFileDownloadUrl = (helloSignRequestId: string | undefined) => {
  if (!helloSignRequestId) {
    return null;
  }

  return `https://app.hellosign.com/home/manage?guid=${helloSignRequestId}`;
};

const getSignatureUrl = (helloSignRequestId: string | undefined) => {
  if (!helloSignRequestId) {
    return null;
  }

  return `https://app.hellosign.com/sign/${helloSignRequestId}`;
};

export { getFileDownloadUrl, getSignatureUrl };
