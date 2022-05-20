import type NearApiSignatureInterface from 'types/NearApiSignatureInterface';
import type GrantApplicationInterface from '@/types/GrantApplicationInterface';
import axios from 'axios';

const API_HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

const getAllGrantApplicationsOfUser = async (signature: NearApiSignatureInterface | undefined): Promise<GrantApplicationInterface[] | null> => {
  if (!signature) {
    return null;
  }

  const { data } = await axios.get(`${API_HOST}/grants`, {
    headers: {
      'X-NEAR-ACCOUNT-ID': signature.accountId,
      'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
    },
  });

  return data;
};

const getGrantApplication = async (
  signature: NearApiSignatureInterface | undefined,
  grantId: number | string[] | string | undefined,
): Promise<GrantApplicationInterface | null> => {
  if (!signature) {
    return null;
  }

  const { data } = await axios.get(`${API_HOST}/grants/${grantId}`, {
    headers: {
      'X-NEAR-ACCOUNT-ID': signature.accountId,
      'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
    },
  });

  return data;
};

const saveGrantApplicationAsDraft = async (
  signature: NearApiSignatureInterface | undefined,
  {
    grantId,
    grantData,
    signStringMessage,
  }: {
    grantId: number | undefined;
    grantData: GrantApplicationInterface;
    // eslint-disable-next-line @typescript-eslint/ban-types
    signStringMessage: Function;
  },
): Promise<GrantApplicationInterface | null> => {
  if (!signature) {
    return null;
  }

  const stringifiedGrantData = JSON.stringify(grantData);
  // todo: the following should be replaced by a hash function, issue #34
  const hash = stringifiedGrantData.slice(0, 10);
  const signedHash = signStringMessage(hash);

  const { data } = await axios.put(
    `${API_HOST}/grants/${grantId}/draft`,
    {
      grantData,
      hash,
      signedHash,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return data;
};

const submitGrantApplication = async (
  signature: NearApiSignatureInterface | undefined,
  {
    grantId,
    grantData,
    signStringMessage,
  }: {
    grantId: number | undefined;
    grantData: GrantApplicationInterface;
    // eslint-disable-next-line @typescript-eslint/ban-types
    signStringMessage: Function;
  },
): Promise<GrantApplicationInterface | null> => {
  if (!signature) {
    return null;
  }

  await saveGrantApplicationAsDraft(signature, {
    grantId,
    grantData,
    signStringMessage,
  });

  const stringifiedGrantData = JSON.stringify(grantData);
  // todo: the following should be replaced by a hash function, issue #34
  const hash = stringifiedGrantData.slice(0, 10);
  const signedHash = signStringMessage(hash);

  const { data } = await axios.put(
    `${API_HOST}/grants/${grantId}/submit`,
    {
      hash,
      signedHash,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return data;
};

// const submitMilestoneData = async (signature: NearApiSignatureInterface | undefined, data: any) => {};

// const submitMilestoneAttachment = async (signature: NearApiSignatureInterface | undefined, data: any) => {};

// const submitGrantAttachment = async (signature: NearApiSignatureInterface | undefined, data: any) => {};

export {
  getAllGrantApplicationsOfUser,
  getGrantApplication,
  saveGrantApplicationAsDraft,
  submitGrantApplication,
  // submitMilestoneData,
  // submitMilestoneAttachment,
  // submitGrantAttachment,
};
