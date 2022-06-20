const getFileDownloadUrl = (helloSignRequestId: string | undefined) => {
  if (!helloSignRequestId) {
    return null;
  }

  return `https://app.hellosign.com/home/manage?guid=${helloSignRequestId}`;
};

// eslint-disable-next-line import/prefer-default-export
export { getFileDownloadUrl };
